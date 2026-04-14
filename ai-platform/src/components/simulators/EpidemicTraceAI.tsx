'use client';
import { useState } from 'react';
export default function EpidemicTraceAI() {
    const [model, setModel] = useState<'SIR' | 'SEIR'>('SIR'); const [r0, setR0] = useState(2.5); const [days, setDays] = useState(180);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { peak: number; peakDay: number; totalInfected: number; curve: { s: number; i: number; r: number; e?: number }[] }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const beta = r0 / 14; const gamma = 1 / 14; const sigma = 1 / 5;
            const curve: { s: number; i: number; r: number; e?: number }[] = [];
            let S = 0.99, I = 0.01, R = 0, E = 0;
            for (let d = 0; d < days; d++) {
                if (model === 'SEIR') { const dS = -beta * S * I; const dE = beta * S * I - sigma * E; const dI = sigma * E - gamma * I; const dR = gamma * I; S += dS; E = Math.max(0, E + dE); I = Math.max(0, I + dI); R += dR; curve.push({ s: S * 100, e: E * 100, i: I * 100, r: R * 100 }); }
                else { const dS = -beta * S * I; const dI = beta * S * I - gamma * I; const dR = gamma * I; S += dS; I = Math.max(0, I + dI); R += dR; curve.push({ s: S * 100, i: I * 100, r: R * 100 }); }
            }
            const peakI = Math.max(...curve.map(c => c.i)); setResult({ peak: peakI, peakDay: curve.findIndex(c => c.i === peakI), totalInfected: curve[curve.length - 1].r, curve }); setLoading(false);
        }, 1500);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">역학 모델 설정</h3>
            <div className="pill-row">{(['SIR', 'SEIR'] as const).map(m => (<button key={m} className={`pill ${model === m ? 'active' : ''}`} onClick={() => { setModel(m); setResult(null); }}>🦠 {m} 모델</button>))}</div>
            <div className="sg"><div className="sh"><span>기초감염재생산수 (R₀)</span><span className="sv">{r0.toFixed(1)}</span></div><input type="range" className="slider" min={0.5} max={6} step={0.1} value={r0} onChange={e => { setR0(parseFloat(e.target.value)); setResult(null); }} /></div>
            <div className="sg"><div className="sh"><span>시뮬레이션 기간</span><span className="sv">{days}일</span></div><input type="range" className="slider" min={30} max={365} step={10} value={days} onChange={e => { setDays(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '시뮬레이션 중...' : '🦠 전염병 시뮬레이션 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>감염 확산을 시뮬레이션 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">감염 피크</span><span className="sv2" style={{ color: 'var(--accent-rose)' }}>{result.peak.toFixed(1)}%</span></div>
                    <div className="sc"><span className="sl">피크 시점</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.peakDay}일</span></div>
                    <div className="sc"><span className="sl">총 감염률</span><span className="sv2" style={{ color: 'var(--accent-purple)' }}>{result.totalInfected.toFixed(1)}%</span></div>
                </div>
                <div className="sb"><h4>📈 감염 곡선</h4><svg viewBox="0 0 400 120" className="curve-svg">
                    {[{ key: 's', color: 'var(--accent-cyan)', label: 'S' }, { key: 'i', color: 'var(--accent-rose)', label: 'I' }, { key: 'r', color: 'var(--accent-emerald)', label: 'R' }].map(line => (
                        <polyline key={line.key} fill="none" stroke={line.color} strokeWidth="1.5" points={result.curve.map((c, i) => `${(i / (result.curve.length - 1)) * 390 + 5},${115 - (c as any)[line.key] * 1.1}`).join(' ')} />))}
                    <text x="380" y="12" fill="var(--accent-cyan)" fontSize="8">S</text><text x="380" y="60" fill="var(--accent-rose)" fontSize="8">I</text><text x="380" y="108" fill="var(--accent-emerald)" fontSize="8">R</text>
                </svg></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .pill-row{display:flex;gap:6px;margin-bottom:var(--space-sm)}.pill{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-rose-dim);border-color:var(--accent-rose);color:var(--accent-rose)}
        .sg{margin-bottom:var(--space-md)}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-rose)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-rose);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-rose);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:18px;font-weight:700}
        .sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}.curve-svg{width:100%;height:120px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:4px}
      `}</style>
        </div>
    );
}
