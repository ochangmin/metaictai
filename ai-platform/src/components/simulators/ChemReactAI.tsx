'use client';
import { useState } from 'react';
const reactions = ['2H₂ + O₂ → 2H₂O', 'CH₄ + 2O₂ → CO₂ + 2H₂O', 'N₂ + 3H₂ → 2NH₃', 'Fe + CuSO₄ → FeSO₄ + Cu'];
export default function ChemReactAI() {
    const [rxn, setRxn] = useState(0); const [temp, setTemp] = useState(300); const [catalyst, setCatalyst] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { rate: number; equilibrium: number; yield_: number; enthalpy: number; activation: number; curve: number[] }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const catFactor = catalyst ? 2 : 1; const base = [8, 5, 3, 6][rxn];
            setResult({
                rate: base * (temp / 300) * catFactor + Math.random() * 2, equilibrium: 0.5 + (temp / 1000) * 0.3 + Math.random() * 0.15,
                yield_: 60 + (temp / 100) * 3 * catFactor + Math.random() * 10, enthalpy: [-286, -890, -92, -15][rxn] + Math.random() * 10 - 5, activation: (80 - (catalyst ? 30 : 0)) + Math.random() * 10,
                curve: Array.from({ length: 30 }, (_, i) => (1 - Math.exp(-i * 0.1 * catFactor)) * (60 + temp / 20) + Math.random() * 5)
            }); setLoading(false);
        }, 1500);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">화학 반응 설정</h3>
            <div className="rxn-list">{reactions.map((r, i) => (<button key={i} className={`rxn-btn ${rxn === i ? 'active' : ''}`} onClick={() => { setRxn(i); setResult(null); }}><code>{r}</code></button>))}</div>
            <div className="sg"><div className="sh"><span>반응 온도</span><span className="sv">{temp}K</span></div><input type="range" className="slider" min={200} max={800} step={10} value={temp} onChange={e => { setTemp(parseInt(e.target.value)); setResult(null); }} /></div>
            <label className="cat-toggle"><input type="checkbox" checked={catalyst} onChange={e => { setCatalyst(e.target.checked); setResult(null); }} /><span>촉매 사용</span></label>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '시뮬레이션 중...' : '🧪 화학 반응 시뮬레이션'}</button>
            {loading && <div className="ld"><div className="loader" /><p>화학 반응을 시뮬레이션 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">반응 속도</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.rate.toFixed(2)} mol/s</span></div>
                    <div className="sc"><span className="sl">평형 상수</span><span className="sv2" style={{ color: 'var(--accent-purple)' }}>{result.equilibrium.toFixed(3)}</span></div>
                    <div className="sc"><span className="sl">수율</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.yield_.toFixed(1)}%</span></div>
                    <div className="sc"><span className="sl">엔탈피</span><span className="sv2" style={{ color: result.enthalpy < 0 ? 'var(--accent-cyan)' : 'var(--accent-rose)' }}>{result.enthalpy.toFixed(0)} kJ/mol</span></div>
                </div>
                <div className="sb"><h4>📈 수율 곡선</h4><svg viewBox="0 0 400 80" className="curve-svg">
                    <polyline fill="none" stroke="var(--accent-emerald)" strokeWidth="2" points={result.curve.map((v, i) => `${(i / 29) * 390 + 5},${75 - v * 0.8}`).join(' ')} /></svg></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .rxn-list{display:flex;flex-direction:column;gap:6px;margin-bottom:var(--space-sm)}.rxn-btn{padding:10px var(--space-md);background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);text-align:left;cursor:pointer;transition:all var(--transition-fast);font-family:inherit;color:inherit}.rxn-btn:hover{border-color:var(--border-medium)}.rxn-btn.active{border-color:var(--accent-emerald);background:var(--accent-emerald-dim)}.rxn-btn code{font-family:var(--font-mono);font-size:13px}
        .sg{margin-bottom:var(--space-sm)}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-emerald)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-emerald);cursor:pointer}
        .cat-toggle{display:flex;align-items:center;gap:8px;font-size:13px;cursor:pointer;margin-bottom:var(--space-sm)}.cat-toggle input{accent-color:var(--accent-emerald);width:16px;height:16px}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-emerald);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:16px;font-weight:700}
        .sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}.curve-svg{width:100%;height:80px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:4px}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
