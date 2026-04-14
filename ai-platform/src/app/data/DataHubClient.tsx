'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { simulators as simulatorData } from '@/data/simulators';
import { platforms as platformData } from '@/data/platforms';

const allModules = [...simulatorData, ...platformData];

interface RecordItem {
    id: number; moduleId: string; moduleType: string; title: string;
    inputData: string; outputData: string; memo: string; createdAt: string; updatedAt: string;
}

export default function DataHubClient({ session }: { session: any }) {
    const [records, setRecords] = useState<RecordItem[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 20;

    const [filterModule, setFilterModule] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchRecords = useCallback(async () => {
        let url = `/api/records?page=${page}&limit=${limit}`;
        if (filterModule !== 'all') {
            const mData = allModules.find(m => m.id === filterModule);
            if (mData) {
                const type = simulatorData.some((s: any) => s.id === filterModule) ? 'simulator' : 'platform';
                url += `&moduleId=${filterModule}&moduleType=${type}`;
            }
        }
        if (searchQuery) {
            url += `&search=${encodeURIComponent(searchQuery)}`;
        }

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('데이터 불러오기 실패');
            const data = await res.json();
            setRecords(data.records || []);
            setTotal(data.total || 0);
        } catch (error) {
            console.error(error);
            setRecords([]);
            setTotal(0);
        }
    }, [page, filterModule, searchQuery]);

    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchRecords();
    };

    return (
        <div className="data-hub-page">
            <section className="dh-hero">
                <div className="page-container">
                    <h1>
                        담당자 전용<br />
                        <span className="text-gradient">데이터 관리 대시보드</span>
                    </h1>
                    <p className="dh-desc">
                        <strong>{session.user?.name}</strong> 님이 저장하신 분석 기록과 환경 데이터를 열람 및 관리합니다.
                    </p>
                    <div className="dh-stats">
                        <div className="dh-stat"><span className="dh-val">{total}</span><span className="dh-label">전체 기록</span></div>
                    </div>
                </div>
            </section>

            <section className="dh-content">
                <div className="page-container">
                    <div className="dh-toolbar glass-card">
                        <div className="dh-filters">
                            <select value={filterModule} onChange={e => { setFilterModule(e.target.value); setPage(1); }} className="dh-select">
                                <option value="all">모든 모듈 결과</option>
                                <optgroup label="🌱 AI 기반 측정 플랫폼">
                                    {platformData.map((m: any) => <option key={m.id} value={m.id}>{m.title || m.nameKo}</option>)}
                                </optgroup>
                                <optgroup label="🧪 기초과학 시뮬레이터">
                                    {simulatorData.map((m: any) => <option key={m.id} value={m.id}>{m.title}</option>)}
                                </optgroup>
                            </select>
                        </div>
                        <form onSubmit={handleSearch} className="dh-search">
                            <input type="text" placeholder="제목으로 검색..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="dh-input" />
                            <button type="submit" className="btn btn-primary">검색</button>
                        </form>
                    </div>

                    <div className="records-grid">
                        {records.length === 0 ? (
                            <div className="empty-state glass-card">
                                <h3>데이터가 없습니다</h3>
                                <p>해당하는 저장 기록이 없거나 아직 시뮬레이션을 실행하지 않았습니다.</p>
                                <Link href="/ai-platform" className="btn btn-primary">🚀 R&D 플랫폼</Link>
                            </div>
                        ) : (
                            records.map(record => {
                                const detail = allModules.find(m => m.id === record.moduleId);
                                return (
                                    <div key={record.id} className="record-card glass-card">
                                        <div className="rc-header">
                                            <span className={`badge ${record.moduleType === 'simulator' ? 'badge-blue' : 'badge-emerald'}`}>
                                                {record.moduleType === 'simulator' ? '시뮬레이터' : 'AI 플랫폼'}
                                            </span>
                                            <span className="rc-date">{new Date(record.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="rc-title">{record.title}</h3>
                                        <div className="rc-meta">
                                            <span className="rc-module">{(detail as any)?.title || (detail as any)?.nameKo || record.moduleId}</span>
                                        </div>
                                        {record.memo && <p className="rc-memo">"{record.memo}"</p>}
                                        <div className="rc-actions">
                                            <Link href={`/${record.moduleType === 'simulator' ? 'simulators' : 'ai-platform'}/${record.moduleId}`} className="btn btn-secondary btn-sm">
                                                해당 모듈 열기 →
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </section>

            <style jsx>{`
                .dh-hero { padding: 60px 0 40px; background: url('/bg-grid.svg') center/cover; border-bottom: 1px solid var(--border-subtle); }
                .dh-hero h1 { font-size: 32px; font-weight: 800; margin-bottom: 16px; }
                .dh-desc { color: var(--text-secondary); font-size: 16px; margin-bottom: 30px; }
                .text-gradient { background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan)); -webkit-background-clip: text; color: transparent; }
                
                .dh-stats { display: flex; gap: 20px; }
                .dh-stat { background: var(--bg-glass); border: 1px solid var(--border-subtle); padding: 16px 24px; border-radius: var(--radius-lg); min-width: 120px; }
                .dh-val { display: block; font-size: 28px; font-weight: 800; color: var(--text-primary); }
                .dh-label { font-size: 13px; color: var(--text-tertiary); font-weight: 600; }
                
                .dh-content { padding: 40px 0; }
                .dh-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 20px; border-radius: var(--radius-lg); margin-bottom: 30px; flex-wrap: wrap; }
                .dh-select { padding: 10px 14px; background: var(--bg-glass-strong); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); font-family: inherit; font-size: 14px; width: 250px; }
                .dh-select:focus { outline: none; border-color: var(--accent-cyan); }
                .dh-search { display: flex; gap: 10px; flex: 1; min-width: 300px; justify-content: flex-end; }
                .dh-input { padding: 10px 14px; background: var(--bg-glass-strong); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); width: 100%; max-width: 300px; font-family: inherit; font-size: 14px; }
                .dh-input:focus { outline: none; border-color: var(--accent-cyan); }
                
                .records-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
                .record-card { padding: 24px; border-radius: var(--radius-lg); display: flex; flex-direction: column; gap: 12px; transition: transform 0.2s ease; }
                .record-card:hover { transform: translateY(-4px); }
                .rc-header { display: flex; justify-content: space-between; align-items: center; }
                .rc-date { font-size: 12px; color: var(--text-tertiary); }
                .rc-title { font-size: 18px; font-weight: 700; margin: 4px 0 0 0; }
                .rc-meta { font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 8px; }
                .rc-module { font-weight: 600; }
                .rc-memo { font-size: 13px; color: var(--text-tertiary); font-style: italic; background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--border-subtle); }
                .rc-actions { margin-top: auto; padding-top: 16px; display: flex; justify-content: flex-end; }
                
                .empty-state { grid-column: 1 / -1; padding: 60px 20px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; border: 1.5px dashed var(--border-subtle); }
                .empty-state h3 { font-size: 20px; font-weight: 700; }
                .empty-state p { color: var(--text-secondary); }
                
                @media(max-width: 768px) {
                    .dh-toolbar { flex-direction: column; align-items: stretch; }
                    .dh-search { justify-content: stretch; min-width: auto; }
                    .dh-input, .dh-select { max-width: none; width: 100%; }
                }
            `}</style>
        </div>
    );
}
