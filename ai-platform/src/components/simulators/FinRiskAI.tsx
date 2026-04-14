'use client';
import { useState } from 'react';
const assets = ['주식', '채권', '부동산', '원자재', '암호화폐'];
export default function FinRiskAI() {
    const [alloc, setAlloc] = useState([30, 25, 20, 15, 10]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { var95: number; sharpe: number; maxDD: number; expectedReturn: number; montecarlo: number[] }>(null);
    const update = (i: number, v: number) => { const n = [...alloc]; n[i] = v; setAlloc(n); setResult(null); };
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const risk = alloc[4] * 0.5 + alloc[0] * 0.2 + alloc[3] * 0.3; const ret = alloc[0] * 0.1 + alloc[1] * 0.04 + alloc[2] * 0.06 + alloc[3] * 0.08 + alloc[4] * 0.15;
            setResult({
                var95: risk * 0.5 + Math.random() * 3, sharpe: (ret - 2) / (risk * 0.3 + 1) + Math.random() * 0.3, maxDD: risk * 0.8 + Math.random() * 5, expectedReturn: ret + Math.random() * 2,
                montecarlo: Array.from({ length: 40 }, (_, i) => { let v = 100; for (let j = 0; j <= i; j++) v += v * (ret / 1000 - risk / 2000 + (Math.random() - 0.5) * risk / 500); return v; })
            }); setLoading(false);
        }, 2000);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">포트폴리오 구성</h3>
            {assets.map((a, i) => (<div key={a} className="sg"><div className="sh"><span>{a}</span><span className="sv">{alloc[i]}%</span></div><input type="range" className="slider" min={0} max={100} value={alloc[i]} onChange={e => update(i, parseInt(e.target.value))} /></div>))}
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '시뮬레이션 중...' : '💰 리스크 분석 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>몬테카를로 시뮬레이션을 실행 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">VaR (95%)</span><span className="sv2" style={{ color: 'var(--accent-rose)' }}>{result.var95.toFixed(1)}%</span></div>
                    <div className="sc"><span className="sl">샤프 비율</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.sharpe.toFixed(2)}</span></div>
                    <div className="sc"><span className="sl">최대 낙폭</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.maxDD.toFixed(1)}%</span></div>
                    <div className="sc"><span className="sl">기대 수익률</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.expectedReturn.toFixed(1)}%</span></div>
                </div>
                <div className="sb"><h4>📈 몬테카를로 시뮬레이션</h4><svg viewBox="0 0 400 100" className="mc-svg">
                    <polyline fill="none" stroke="var(--accent-amber)" strokeWidth="1.5" points={result.montecarlo.map((v, i) => `${(i / 39) * 390 + 5},${95 - (v - 80) * 2}`).join(' ')} />
                    <line x1="5" y1={95 - 20 * 2} x2="395" y2={95 - 20 * 2} stroke="var(--text-tertiary)" strokeDasharray="4" strokeWidth="0.5" /></svg></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .sg{margin-bottom:var(--space-sm)}.sh{display:flex;justify-content:space-between;margin-bottom:4px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-amber)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:var(--accent-amber);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-amber);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:16px;font-weight:700}
        .sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}.mc-svg{width:100%;height:100px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:4px}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
