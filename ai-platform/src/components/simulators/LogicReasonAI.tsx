'use client';
import { useState } from 'react';
const propositions = ['P → Q, P ∴ Q', '¬(P ∧ Q) ≡ (¬P ∨ ¬Q)', 'P ∨ Q, ¬P ∴ Q', '(P → Q) ∧ (Q → R) ∴ P → R'];
export default function LogicReasonAI() {
    const [sel, setSel] = useState(0);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { valid: boolean; truthTable: { P: boolean; Q: boolean; R?: boolean; result: boolean }[]; rule: string; steps: string[] }>(null);
    const analyze = () => {
        setLoading(true); setTimeout(() => {
            const tables = [
                [{ P: true, Q: true, result: true }, { P: true, Q: false, result: false }, { P: false, Q: true, result: true }, { P: false, Q: false, result: true }],
                [{ P: true, Q: true, result: true }, { P: true, Q: false, result: true }, { P: false, Q: true, result: true }, { P: false, Q: false, result: true }],
                [{ P: true, Q: true, result: true }, { P: true, Q: false, result: true }, { P: false, Q: true, result: true }, { P: false, Q: false, result: false }],
                [{ P: true, Q: true, R: true, result: true }, { P: true, Q: true, R: false, result: false }, { P: false, Q: true, R: true, result: true }, { P: false, Q: false, R: true, result: true }],
            ];
            const rules = ['긍정논법 (Modus Ponens)', '드모르간 법칙', '선언적 삼단논법', '가언적 삼단논법'];
            const allSteps = [['전제: P → Q', '전제: P', '결론: Q (Modus Ponens)'], ['¬(P ∧ Q)', '≡ (¬P ∨ ¬Q)', '드모르간 법칙에 의해 동치'], ['전제: P ∨ Q', '전제: ¬P', '결론: Q'], ['P → Q, Q → R', '이행성에 의해', '∴ P → R']];
            setResult({ valid: true, truthTable: tables[sel] as any, rule: rules[sel], steps: allSteps[sel] }); setLoading(false);
        }, 1200);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">논리 명제 선택</h3>
            <div className="prop-list">{propositions.map((p, i) => (<button key={i} className={`prop-btn ${sel === i ? 'active' : ''}`} onClick={() => { setSel(i); setResult(null); }}><code>{p}</code></button>))}</div>
            <button className="btn btn-primary run-btn" onClick={analyze} disabled={loading}>{loading ? '추론 중...' : '🧩 논리 추론 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>논리를 추론하고 있습니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row"><div className="sc"><span className="sl">유효성</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.valid ? '✅ 유효' : '❌ 무효'}</span></div><div className="sc"><span className="sl">적용 규칙</span><span className="sv2" style={{ color: 'var(--accent-purple)', fontSize: '14px' }}>{result.rule}</span></div></div>
                <div className="sb"><h4>📊 진리표</h4><div className="tt"><div className="tt-header">{Object.keys(result.truthTable[0]).map(k => (<span key={k}>{k === 'result' ? '결과' : k}</span>))}</div>
                    {result.truthTable.map((row, i) => (<div key={i} className="tt-row">{Object.values(row).map((v, j) => (<span key={j} className={typeof v === 'boolean' ? (v ? 'true' : 'false') : ''}>{typeof v === 'boolean' ? (v ? 'T' : 'F') : String(v)}</span>))}</div>))}</div></div>
                <div className="sb"><h4>📝 추론 과정</h4><div className="steps">{result.steps.map((s, i) => (<div key={i} className="step"><span className="sn">{i + 1}</span><span>{s}</span></div>))}</div></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .prop-list{display:flex;flex-direction:column;gap:6px}.prop-btn{padding:10px var(--space-md);background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);text-align:left;cursor:pointer;transition:all var(--transition-fast);font-family:inherit;color:inherit}
        .prop-btn:hover{border-color:var(--border-medium)}.prop-btn.active{border-color:var(--accent-purple);background:var(--accent-purple-dim)}.prop-btn code{font-family:var(--font-mono);font-size:13px}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-purple);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:18px;font-weight:700}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .tt{border:1px solid var(--border-subtle);border-radius:var(--radius-md);overflow:hidden}.tt-header,.tt-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(60px,1fr));gap:1px;padding:8px var(--space-md);font-size:13px;font-family:var(--font-mono);text-align:center}
        .tt-header{background:var(--bg-glass);font-weight:700;color:var(--text-tertiary);font-size:11px}.tt-row{border-top:1px solid var(--border-subtle)}.true{color:var(--accent-emerald);font-weight:700}.false{color:var(--accent-rose);font-weight:700}
        .steps{display:flex;flex-direction:column;gap:6px}.step{display:flex;align-items:center;gap:var(--space-sm);padding:8px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);font-size:13px;font-family:var(--font-mono)}
        .sn{width:22px;height:22px;border-radius:50%;background:var(--accent-purple-dim);color:var(--accent-purple);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0}
      `}</style>
        </div>
    );
}
