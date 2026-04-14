
'use client';
import { useState } from 'react';

const DATA_SET = [
    { id: 'T-955', name: '오토드라이브 AI 표준 모델', type: 'STANDARD' },
        { id: 'X-48', name: '고도화 시뮬레이션 베타', type: 'ADVANCED' },
        { id: 'E-470', name: '실시간 리전 데이터셋 연동', type: 'REALTIME' },
        { id: 'O-955', name: '히스토리컬 예측 가중치', type: 'HISTORICAL' }
];

export default function AutoDriveAI() {
    const [search, setSearch] = useState('');
    const [items, setItems] = useState(DATA_SET);
    const [selected, setSelected] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = (v: string) => {
        setSearch(v);
        if (v.trim() === '') {
            setItems(DATA_SET);
        } else {
            setItems(DATA_SET.filter(s => s.name.includes(v) || s.id.includes(v)));
        }
    };

    const runSim = (item: any) => {
        setLoading(true);
        setSelected(null);
        setTimeout(() => {
            setSelected({
                ...item,
                kpiAlpha: (Math.random() * 20 + 80).toFixed(1),
                kpiBeta: (Math.random() * 5 + 95).toFixed(1),
                latency: (Math.random() * 50 + 10).toFixed(0),
                energyCost: (Math.random() * 3 + 1).toFixed(2),
                status: '최적화 성공'
            });
            setLoading(false);
        }, 1600);
    };

    return (
        <div className="sim-ui">
            <div className="panel-header">
                <h3>🚗 오토드라이브 AI 허브</h3>
                <p>가상 도로 환경에서 자율주행 알고리즘의 경로 계획과 장애물 회피를 시뮬레이션합니다.</p>
            </div>

            <div className="dashboard-layout">
                {/* Left Panel */}
                <div className="side-panel glass-card">
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="분석 대상 모델 / 데이터셋 검색..."
                            value={search}
                            onChange={e => handleSearch(e.target.value)}
                        />
                    </div>
                    
                    <div className="station-list">
                        <div className="list-header">가용 오토드라이브 AI 리소스</div>
                        {items.map(st => (
                            <button
                                key={st.id}
                                className={`station-item ${selected?.id === st.id ? 'active' : ''}`}
                                onClick={() => runSim(st)}
                            >
                                <div className="st-info">
                                    <strong>{st.name}</strong>
                                    <span>#{st.id} · {st.type}</span>
                                </div>
                                <div className="st-badge" style={{ backgroundColor: 'rgba(0, 229, 255, 0.15)', color: 'var(--accent-cyan)' }}>
                                    대기중
                                </div>
                            </button>
                        ))}
                        {items.length === 0 && <div className="empty-state">검색 결과가 없습니다.</div>}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="detail-panel glass-card">
                    {!loading && !selected && (
                        <div className="empty-detail">
                            <div className="empty-icon">🚗</div>
                            <p>좌측 목록에서 데이터 또는 모델을 선택하시면<br/>실시간 클라우드 분석이 시작됩니다.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="loading-detail">
                            <div className="loader" />
                            <p>글로벌 클러스터의 컴퓨팅 자원을 할당받아 오토드라이브 AI 연산을 진행중입니다...</p>
                        </div>
                    )}

                    {selected && !loading && (
                        <div className="station-detail">
                            <div className="detail-header">
                                <div>
                                    <h2>{selected.name}</h2>
                                    <p>처리 대상: {selected.type} · 연결 ID: {selected.id} · <span style={{ color: 'var(--accent-emerald)' }}>Live Inference</span></p>
                                </div>
                                <div className="status-hero">
                                    <span>연산 상태</span>
                                    <strong style={{ color: 'var(--accent-emerald)' }}>{selected.status}</strong>
                                </div>
                            </div>
                            
                            <h4 className="section-title">주요 성능 지표 (KPI Metrics)</h4>
                            <div className="metrics-grid">
                                <div className="metric-card">
                                    <span>예측 정확도 (Accuracy)</span>
                                    <div className="val">
                                        <strong>{selected.kpiAlpha}</strong> <small>%</small>
                                    </div>
                                    <div className="bar-bg"><div className="bar-fill" style={{ width: `${selected.kpiAlpha}%`, background: 'var(--accent-cyan)' }} /></div>
                                </div>
                                <div className="metric-card">
                                    <span>파라미터 안정성</span>
                                    <div className="val">
                                        <strong>{selected.kpiBeta}</strong> <small>%</small>
                                    </div>
                                    <div className="bar-bg"><div className="bar-fill" style={{ width: `${selected.kpiBeta}%`, background: 'var(--accent-emerald)' }} /></div>
                                </div>
                                <div className="metric-card">
                                    <span>추론 지연시간</span>
                                    <div className="val">
                                        <strong>{selected.latency}</strong> <small>ms</small>
                                    </div>
                                    <div className="bar-bg"><div className="bar-fill" style={{ width: '30%', background: 'var(--accent-amber)' }} /></div>
                                </div>
                                <div className="metric-card">
                                    <span>연산 비용 지수</span>
                                    <div className="val">
                                        <strong>{selected.energyCost}</strong> <small>kW/h</small>
                                    </div>
                                    <div className="bar-bg"><div className="bar-fill" style={{ width: '45%', background: 'var(--accent-rose)' }} /></div>
                                </div>
                            </div>

                            <div className="action-row">
                                <button className="btn btn-secondary">📊 이력 데이터 비교</button>
                                <button className="btn btn-primary">🌐 세부 리포트 다운로드 및 공유</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .sim-ui { display: flex; flex-direction: column; gap: var(--space-xl); animation: fadeIn 0.5s; height: 100%; }
                .panel-header h3 { font-size: 20px; font-weight: 800; margin-bottom: 8px; color: var(--accent-cyan); display:flex; align-items:center; gap:8px;}
                .panel-header p { font-size: 14px; color: var(--text-secondary); line-height: 1.5; }
                
                .dashboard-layout { display: flex; gap: var(--space-xl); min-height: 520px; }
                
                .side-panel { width: 350px; display: flex; flex-direction: column; padding: var(--space-md); border: 1px solid var(--border-medium); }
                .search-box { position: relative; margin-bottom: var(--space-md); }
                .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 14px; color: var(--text-tertiary); }
                .search-box input { width: 100%; padding: 12px 14px 12px 40px; background: rgba(0,0,0,0.4); border: 1px solid var(--border-medium); border-radius: var(--radius-sm); color: #fff; font-size: 13px; transition: border 0.3s; }
                .search-box input:focus { outline: none; border-color: var(--accent-cyan); }
                
                .station-list { flex: 1; display: flex; flex-direction: column; overflow-y: auto; gap: 8px; padding-right: 4px; }
                .station-list::-webkit-scrollbar { width: 6px; }
                .station-list::-webkit-scrollbar-thumb { background: var(--border-medium); border-radius: 3px; }
                .list-header { font-size: 11px; font-weight: 600; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 8px; margin-bottom: 4px; }
                
                .station-item { display: flex; justify-content: space-between; align-items: center; padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); cursor: pointer; transition: all 0.2s; text-align: left; }
                .station-item:hover { background: rgba(255,255,255,0.08); border-color: var(--border-medium); }
                .station-item.active { background: rgba(0,229,255,0.1); border-color: var(--accent-cyan); }
                .st-info { display: flex; flex-direction: column; gap: 4px; }
                .st-info strong { font-size: 14px; color: #fff; font-weight: 600; }
                .st-info span { font-size: 11px; color: var(--text-tertiary); font-family: var(--font-mono); }
                .st-badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
                .empty-state { text-align: center; padding: 40px 20px; color: var(--text-tertiary); font-size: 13px; }

                .detail-panel { flex: 1; padding: var(--space-2xl); border: 1px solid var(--border-medium); display: flex; flex-direction: column; background: rgba(0,0,0,0.2); }
                .empty-detail, .loading-detail { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; color: var(--text-tertiary); }
                .empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.5; }
                .loader { width: 40px; height: 40px; border: 4px solid var(--border-subtle); border-top-color: var(--accent-cyan); border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }

                .station-detail { animation: fadeInUp 0.4s ease-out; display: flex; flex-direction: column; height: 100%; }
                .detail-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-xl); margin-bottom: var(--space-xl); }
                .detail-header h2 { font-size: 24px; font-weight: 800; margin-bottom: 8px; color: #fff; }
                .detail-header p { font-size: 13px; color: var(--text-tertiary); font-family: var(--font-mono); }
                .status-hero { display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 110px; height: 110px; border: 2px solid var(--accent-emerald); border-radius: 50%; background: #000; box-shadow: 0 0 20px rgba(0,230,118,0.2); }
                .status-hero span { font-size: 11px; color: var(--text-tertiary); margin-bottom: 4px; }
                .status-hero strong { font-size: 18px; font-weight: 800; }

                .section-title { font-size: 15px; font-weight: 600; margin-bottom: var(--space-lg); color: #fff; }
                .metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-bottom: auto; }
                .metric-card { background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: var(--space-lg); border-radius: var(--radius-md); }
                .metric-card span { display: block; font-size: 13px; color: var(--text-secondary); margin-bottom: 12px; font-weight: 500; }
                .val { display: flex; align-items: baseline; gap: 4px; margin-bottom: 12px; }
                .val strong { font-size: 30px; font-weight: 800; font-family: var(--font-mono); color: #fff; }
                .val small { font-size: 13px; color: var(--text-tertiary); }
                .bar-bg { width: 100%; height: 6px; background: var(--bg-glass-strong); border-radius: 3px; overflow: hidden; }
                .bar-fill { height: 100%; border-radius: 3px; transition: width 1s ease-out; }

                .action-row { display: flex; justify-content: flex-end; gap: var(--space-md); margin-top: var(--space-xl); padding-top: var(--space-lg); border-top: 1px solid var(--border-subtle); }
                
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                
                @media (max-width: 900px) { .dashboard-layout { flex-direction: column; } .side-panel { width: 100%; max-height: 300px; } .metrics-grid { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
}
