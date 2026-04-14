'use client';
import { useState, useEffect, useCallback } from 'react';

interface RecordItem {
    id: number;
    moduleId: string;
    moduleType: string;
    title: string;
    inputData: string;
    outputData: string;
    memo: string;
    createdAt: string;
    updatedAt: string;
}

interface DataPanelProps {
    moduleId: string;
    moduleType: 'simulator' | 'platform';
    currentInput?: unknown;
    currentOutput?: unknown;
}

export default function DataPanel({ moduleId, moduleType, currentInput, currentOutput }: DataPanelProps) {
    const [records, setRecords] = useState<RecordItem[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editMemo, setEditMemo] = useState('');
    const [saveTitle, setSaveTitle] = useState('');
    const [saveMemo, setSaveMemo] = useState('');
    const [detail, setDetail] = useState<RecordItem | null>(null);

    const fetchRecords = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/records?moduleId=${moduleId}&moduleType=${moduleType}&page=${page}&limit=10`);
            const data = await res.json();
            setRecords(data.records);
            setTotal(data.total);
        } catch { /* ignore */ }
        setLoading(false);
    }, [moduleId, moduleType, page]);

    useEffect(() => { if (open) fetchRecords(); }, [open, page, fetchRecords]);

    const handleSave = async () => {
        if (!saveTitle.trim()) return;
        setSaving(true);
        await fetch('/api/records', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                moduleId, moduleType, title: saveTitle,
                inputData: JSON.stringify(currentInput || {}),
                outputData: JSON.stringify(currentOutput || {}),
                memo: saveMemo,
            }),
        });
        setSaveTitle(''); setSaveMemo(''); setSaving(false);
        fetchRecords();
    };

    const handleDelete = async (id: number) => {
        if (!confirm('이 기록을 삭제하시겠습니까?')) return;
        await fetch(`/api/records/${id}`, { method: 'DELETE' });
        fetchRecords();
    };

    const handleUpdate = async (id: number) => {
        await fetch(`/api/records/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: editTitle, memo: editMemo }),
        });
        setEditingId(null);
        fetchRecords();
    };

    const startEdit = (r: RecordItem) => {
        setEditingId(r.id); setEditTitle(r.title); setEditMemo(r.memo);
    };

    const formatDate = (d: string) => {
        const date = new Date(d);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    return (
        <div className="dp">
            {/* Save Bar */}
            <div className="dp-save-bar">
                <div className="dp-save-left">
                    <span className="dp-icon">💾</span>
                    <input className="dp-input" placeholder="기록 제목" value={saveTitle} onChange={e => setSaveTitle(e.target.value)} />
                    <input className="dp-input dp-memo" placeholder="메모 (선택)" value={saveMemo} onChange={e => setSaveMemo(e.target.value)} />
                </div>
                <button className="dp-btn dp-save" onClick={handleSave} disabled={saving || !saveTitle.trim()}>
                    {saving ? '저장 중...' : '💾 결과 저장'}
                </button>
                <button className="dp-btn dp-toggle" onClick={() => setOpen(!open)}>
                    📋 내 기록 ({total}) {open ? '▲' : '▼'}
                </button>
            </div>

            {/* Records Panel */}
            {open && (
                <div className="dp-panel">
                    {loading ? <div className="dp-loading">로딩 중...</div> : records.length === 0 ? (
                        <div className="dp-empty">저장된 기록이 없습니다. 시뮬레이션 결과를 저장해 보세요.</div>
                    ) : (
                        <>
                            <table className="dp-table">
                                <thead><tr><th>#</th><th>제목</th><th>메모</th><th>저장일시</th><th>관리</th></tr></thead>
                                <tbody>{records.map(r => (
                                    <tr key={r.id}>
                                        <td className="dp-id">{r.id}</td>
                                        <td>{editingId === r.id ? <input className="dp-edit-input" value={editTitle} onChange={e => setEditTitle(e.target.value)} /> : <button className="dp-link" onClick={() => setDetail(r)}>{r.title}</button>}</td>
                                        <td>{editingId === r.id ? <input className="dp-edit-input" value={editMemo} onChange={e => setEditMemo(e.target.value)} /> : <span className="dp-memo-text">{r.memo || '—'}</span>}</td>
                                        <td className="dp-date">{formatDate(r.createdAt)}</td>
                                        <td className="dp-actions">
                                            {editingId === r.id ? (<><button className="dp-act-btn save" onClick={() => handleUpdate(r.id)}>✓</button><button className="dp-act-btn cancel" onClick={() => setEditingId(null)}>✕</button></>) : (<><button className="dp-act-btn edit" onClick={() => startEdit(r)}>✏️</button><button className="dp-act-btn del" onClick={() => handleDelete(r.id)}>🗑️</button></>)}
                                        </td>
                                    </tr>
                                ))}</tbody>
                            </table>
                            {total > 10 && (
                                <div className="dp-pager">
                                    <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← 이전</button>
                                    <span>{page} / {Math.ceil(total / 10)}</span>
                                    <button disabled={page >= Math.ceil(total / 10)} onClick={() => setPage(p => p + 1)}>다음 →</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Detail Modal */}
            {detail && (
                <div className="dp-overlay" onClick={() => setDetail(null)}>
                    <div className="dp-modal" onClick={e => e.stopPropagation()}>
                        <div className="dp-modal-header">
                            <h3>{detail.title}</h3>
                            <button className="dp-close" onClick={() => setDetail(null)}>✕</button>
                        </div>
                        <div className="dp-modal-body">
                            <div className="dp-section">
                                <h4>📥 입력 데이터</h4>
                                <pre className="dp-json">{JSON.stringify(JSON.parse(detail.inputData), null, 2)}</pre>
                            </div>
                            <div className="dp-section">
                                <h4>📤 출력 데이터</h4>
                                <pre className="dp-json">{JSON.stringify(JSON.parse(detail.outputData), null, 2)}</pre>
                            </div>
                            {detail.memo && <div className="dp-section"><h4>📝 메모</h4><p>{detail.memo}</p></div>}
                            <div className="dp-meta">생성: {formatDate(detail.createdAt)} | 수정: {formatDate(detail.updatedAt)}</div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .dp{margin-top:var(--space-xl);border-top:1px solid var(--border-subtle);padding-top:var(--space-lg)}
        .dp-save-bar{display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap}
        .dp-save-left{display:flex;align-items:center;gap:var(--space-sm);flex:1;min-width:250px}
        .dp-icon{font-size:18px}
        .dp-input{flex:1;padding:8px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);font-size:13px;color:var(--text-primary);font-family:inherit;min-width:120px}
        .dp-input:focus{border-color:var(--accent-cyan);outline:none}
        .dp-memo{max-width:200px}
        .dp-btn{padding:8px 16px;border-radius:var(--radius-sm);font-size:12px;font-weight:600;cursor:pointer;transition:all var(--transition-fast);font-family:inherit;white-space:nowrap;border:1px solid var(--border-subtle)}
        .dp-save{background:var(--accent-cyan-dim);color:var(--accent-cyan);border-color:rgba(0,229,255,.2)}.dp-save:hover:not(:disabled){background:rgba(0,229,255,.2)}.dp-save:disabled{opacity:.5;cursor:not-allowed}
        .dp-toggle{background:var(--bg-glass);color:var(--text-secondary)}.dp-toggle:hover{border-color:var(--border-medium)}
        .dp-panel{margin-top:var(--space-md);border:1px solid var(--border-subtle);border-radius:var(--radius-md);overflow:hidden;animation:fadeInUp .3s ease-out}
        .dp-loading,.dp-empty{padding:var(--space-xl);text-align:center;font-size:13px;color:var(--text-tertiary)}
        .dp-table{width:100%;border-collapse:collapse;font-size:12px}
        .dp-table th{padding:8px 12px;background:var(--bg-glass);text-align:left;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;font-size:10px;border-bottom:1px solid var(--border-subtle)}
        .dp-table td{padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.03)}
        .dp-table tr:hover{background:rgba(255,255,255,.02)}
        .dp-id{font-family:var(--font-mono);color:var(--text-tertiary);width:40px}
        .dp-link{background:none;border:none;color:var(--accent-cyan);cursor:pointer;font-family:inherit;font-size:12px;text-align:left;padding:0}.dp-link:hover{text-decoration:underline}
        .dp-memo-text{color:var(--text-tertiary);font-size:11px;max-width:120px;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .dp-date{font-family:var(--font-mono);color:var(--text-tertiary);font-size:11px;white-space:nowrap}
        .dp-actions{display:flex;gap:4px;white-space:nowrap}
        .dp-act-btn{padding:4px 8px;border:1px solid var(--border-subtle);border-radius:var(--radius-sm);cursor:pointer;font-size:12px;background:var(--bg-glass);transition:all var(--transition-fast)}
        .dp-act-btn.edit:hover{border-color:var(--accent-cyan)}.dp-act-btn.del:hover{border-color:var(--accent-rose)}
        .dp-act-btn.save{background:var(--accent-emerald-dim);border-color:rgba(0,230,118,.2);color:var(--accent-emerald)}
        .dp-act-btn.cancel{background:var(--accent-rose-dim);border-color:rgba(255,82,82,.2);color:var(--accent-rose)}
        .dp-edit-input{padding:4px 8px;background:var(--bg-glass);border:1px solid var(--accent-cyan);border-radius:var(--radius-sm);font-size:12px;color:var(--text-primary);font-family:inherit;width:100%}
        .dp-pager{display:flex;align-items:center;justify-content:center;gap:var(--space-md);padding:var(--space-md);font-size:12px;color:var(--text-tertiary)}
        .dp-pager button{padding:4px 12px;border:1px solid var(--border-subtle);border-radius:var(--radius-sm);background:var(--bg-glass);cursor:pointer;font-size:12px;color:var(--text-secondary);font-family:inherit}.dp-pager button:disabled{opacity:.4;cursor:not-allowed}
        .dp-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:2000;display:flex;align-items:center;justify-content:center;padding:var(--space-xl)}
        .dp-modal{background:var(--bg-primary);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);max-width:700px;width:100%;max-height:80vh;overflow-y:auto}
        .dp-modal-header{display:flex;justify-content:space-between;align-items:center;padding:var(--space-lg);border-bottom:1px solid var(--border-subtle)}
        .dp-modal-header h3{font-size:16px;font-weight:700}
        .dp-close{background:none;border:none;font-size:18px;cursor:pointer;color:var(--text-tertiary);padding:4px}
        .dp-modal-body{padding:var(--space-lg)}
        .dp-section{margin-bottom:var(--space-lg)}.dp-section h4{font-size:13px;font-weight:600;margin-bottom:var(--space-sm);color:var(--text-secondary)}
        .dp-json{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:var(--space-md);font-family:var(--font-mono);font-size:11px;color:var(--accent-emerald);overflow-x:auto;white-space:pre-wrap;max-height:250px;overflow-y:auto}
        .dp-meta{font-size:11px;color:var(--text-tertiary);margin-top:var(--space-md);font-family:var(--font-mono)}
        @media(max-width:640px){.dp-save-bar{flex-direction:column;align-items:stretch}.dp-save-left{flex-direction:column}.dp-memo{max-width:100%}}
      `}</style>
        </div>
    );
}
