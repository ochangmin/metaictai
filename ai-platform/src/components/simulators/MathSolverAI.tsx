'use client';
import { useState } from 'react';
const presets = [{ label: '이차방정식', eq: 'x² - 5x + 6 = 0' }, { label: '미분', eq: 'd/dx (3x³ + 2x)' }, { label: '적분', eq: '∫ 2x dx' }, { label: '행렬식', eq: 'det([[1,2],[3,4]])' }];
export default function MathSolverAI() {
    const [input, setInput] = useState('');
    const [sel, setSel] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { answer: string; steps: string[]; graphData: number[] }>(null);
    const solve = () => {
        setLoading(true); setTimeout(() => {
            const eq = sel >= 0 ? sel : 0;
            const answers = ['x = 2, x = 3', '9x² + 2', 'x² + C', '-2'];
            const allSteps = [
                ['x² - 5x + 6 = 0', '(x-2)(x-3) = 0', 'x = 2 또는 x = 3'],
                ['f(x) = 3x³ + 2x', "f'(x) = 9x² + 2", '멱의 법칙 적용: d/dx(xⁿ) = nxⁿ⁻¹'],
                ['∫ 2x dx', '2 · x²/2 + C', 'x² + C'],
                ['det([[1,2],[3,4]])', '= 1×4 - 2×3', '= 4 - 6 = -2']
            ];
            setResult({ answer: answers[eq], steps: allSteps[eq], graphData: Array.from({ length: 40 }, (_, i) => { const x = (i - 20) * 0.25; return eq === 0 ? x * x - 5 * x + 6 : eq === 1 ? 9 * x * x + 2 : x * x; }) });
            setLoading(false);
        }, 1500);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">수식 입력</h3>
            <div className="preset-row">{presets.map((p, i) => (<button key={i} className={`pill ${sel === i ? 'active' : ''}`} onClick={() => { setSel(i); setInput(p.eq); setResult(null); }}>{p.label}</button>))}</div>
            <input type="text" className="input-field" value={input} onChange={e => { setInput(e.target.value); setResult(null); }} placeholder="수식을 입력하세요..." style={{ fontFamily: 'var(--font-mono)' }} />
            <button className="btn btn-primary run-btn" onClick={solve} disabled={(!input.trim() && sel < 0) || loading}>{loading ? '계산 중...' : '🧮 풀이 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>수식을 분석하고 풀이를 생성 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="answer-box"><span className="ans-label">정답</span><span className="ans-value">{result.answer}</span></div>
                <div className="sb"><h4>📝 단계별 풀이</h4><div className="steps">{result.steps.map((s, i) => (<div key={i} className="step"><span className="step-num">{i + 1}</span><span className="step-content">{s}</span></div>))}</div></div>
                <div className="sb"><h4>📊 그래프</h4><svg viewBox="0 0 400 120" className="graph-svg">
                    <line x1="0" y1="60" x2="400" y2="60" stroke="var(--border-subtle)" strokeWidth="1" />
                    <line x1="200" y1="0" x2="200" y2="120" stroke="var(--border-subtle)" strokeWidth="1" />
                    <polyline fill="none" stroke="var(--accent-blue)" strokeWidth="2" points={result.graphData.map((v, i) => `${(i / 39) * 400},${60 - v * 3}`).join(' ')} />
                </svg></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:var(--space-sm)}.pill{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-blue-dim);border-color:var(--accent-blue);color:var(--accent-blue)}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-blue);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}
        .answer-box{background:var(--accent-cyan-dim);border:1px solid rgba(0,229,255,.2);border-radius:var(--radius-md);padding:var(--space-lg);text-align:center;margin-bottom:var(--space-xl)}
        .ans-label{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:8px}.ans-value{font-size:24px;font-weight:800;font-family:var(--font-mono);color:var(--accent-cyan)}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .steps{display:flex;flex-direction:column;gap:8px}.step{display:flex;align-items:center;gap:var(--space-sm);padding:10px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);font-size:14px;font-family:var(--font-mono)}
        .step-num{width:24px;height:24px;border-radius:50%;background:var(--accent-blue-dim);color:var(--accent-blue);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0}.step-content{color:var(--text-secondary)}
        .graph-svg{width:100%;height:120px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:4px}
      `}</style>
        </div>
    );
}
