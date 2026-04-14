'use client';
import { useState } from 'react';
const targets = ['ACE2 수용체', 'EGFR 키나제', 'BRAF V600E', 'PD-L1'];
export default function DrugDiscoverAI() {
    const [target, setTarget] = useState(0);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { candidates: { name: string; affinity: number; toxicity: string; oral: number; logP: number }[]; bestMatch: string }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            setResult({
                candidates: [
                    { name: 'Compound A-371', affinity: 8.2 + Math.random() * 1.5, toxicity: '낮음', oral: 75 + Math.random() * 15, logP: 2.1 + Math.random() },
                    { name: 'Compound B-842', affinity: 7.5 + Math.random() * 1.5, toxicity: '매우 낮음', oral: 82 + Math.random() * 10, logP: 1.8 + Math.random() },
                    { name: 'Compound C-159', affinity: 6.8 + Math.random() * 2, toxicity: '보통', oral: 60 + Math.random() * 20, logP: 3.2 + Math.random() },
                    { name: 'Compound D-463', affinity: 9.1 + Math.random(), toxicity: '낮음', oral: 70 + Math.random() * 15, logP: 2.5 + Math.random() },
                ], bestMatch: 'Compound D-463',
            }); setLoading(false);
        }, 2200);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">타겟 단백질 선택</h3>
            <div className="target-grid">{targets.map((t, i) => (<button key={i} className={`target-btn ${target === i ? 'active' : ''}`} onClick={() => { setTarget(i); setResult(null); }}><span className="t-emoji">🧫</span><span className="t-name">{t}</span></button>))}</div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '스크리닝 중...' : '🧫 약물 스크리닝 실행'}</button>
            {loading && <div className="loading-state"><div className="loader" /><p>AI가 후보 화합물을 스크리닝 중입니다...</p></div>}
            {result && !loading && (
                <div className="results">
                    <div className="best-match"><span>🏆 최적 후보:</span> <strong>{result.bestMatch}</strong></div>
                    <div className="cand-table">
                        <div className="cand-header"><span>화합물</span><span>결합 친화도</span><span>독성</span><span>경구 흡수율</span><span>LogP</span></div>
                        {result.candidates.map((c, i) => (
                            <div key={i} className={`cand-row ${c.name === result.bestMatch ? 'best' : ''}`}>
                                <span className="cand-name">{c.name}</span>
                                <span className="cand-val" style={{ color: 'var(--accent-cyan)' }}>{c.affinity.toFixed(1)} nM</span>
                                <span className={`tox-badge ${c.toxicity === '매우 낮음' ? 'vlow' : c.toxicity === '낮음' ? 'low' : 'med'}`}>{c.toxicity}</span>
                                <span className="cand-val">{c.oral.toFixed(0)}%</span>
                                <span className="cand-val">{c.logP.toFixed(2)}</span>
                            </div>))}
                    </div>
                </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .target-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-sm)}
        .target-btn{padding:var(--space-md);background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;transition:all var(--transition-fast);font-family:inherit;color:inherit}
        .target-btn:hover{border-color:var(--border-medium)}.target-btn.active{border-color:var(--accent-emerald);background:var(--accent-emerald-dim)}
        .t-emoji{font-size:24px}.t-name{font-size:13px;font-weight:600}
        .run-btn{width:100%;padding:14px}.loading-state{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-emerald);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}
        .best-match{padding:var(--space-md);background:var(--accent-emerald-dim);border:1px solid rgba(0,230,118,.2);border-radius:var(--radius-md);font-size:14px;color:var(--accent-emerald);margin-bottom:var(--space-xl)}
        .cand-table{border:1px solid var(--border-subtle);border-radius:var(--radius-md);overflow:hidden}
        .cand-header,.cand-row{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr 1fr;gap:var(--space-sm);padding:10px var(--space-md);font-size:12px}
        .cand-header{background:var(--bg-glass);font-weight:700;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;font-size:10px}
        .cand-row{border-top:1px solid var(--border-subtle)}.cand-row.best{background:rgba(0,230,118,.05)}
        .cand-name{font-weight:600;font-family:var(--font-mono);font-size:12px}.cand-val{font-family:var(--font-mono)}
        .tox-badge{padding:2px 8px;border-radius:var(--radius-full);font-size:10px;font-weight:600;text-align:center}
        .tox-badge.vlow{background:var(--accent-emerald-dim);color:var(--accent-emerald)}.tox-badge.low{background:var(--accent-cyan-dim);color:var(--accent-cyan)}.tox-badge.med{background:var(--accent-amber-dim);color:var(--accent-amber)}
        @media(max-width:640px){.cand-header,.cand-row{grid-template-columns:1.2fr 1fr 1fr;}.cand-header span:nth-child(4),.cand-header span:nth-child(5),.cand-row span:nth-child(4),.cand-row span:nth-child(5){display:none}}
      `}</style>
        </div>
    );
}
