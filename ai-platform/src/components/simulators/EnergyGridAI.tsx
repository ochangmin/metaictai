'use client';
import { useState } from 'react';
export default function EnergyGridAI() {
    const [solar, setSolar] = useState(40);
    const [wind, setWind] = useState(30);
    const [hydro, setHydro] = useState(30);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { totalGen: number; efficiency: number; cost: number; co2Saved: number; hourly: number[]; stability: number }>(null);
    const optimize = () => {
        setLoading(true); setTimeout(() => {
            setResult({
                totalGen: solar * 5 + wind * 4.5 + hydro * 6 + Math.random() * 50, efficiency: 75 + (solar + wind + hydro) * 0.05 + Math.random() * 8,
                cost: 800 - solar * 1.5 - wind * 1.2 - hydro * 0.8 + Math.random() * 50, co2Saved: (solar + wind + hydro) * 2.5 + Math.random() * 100,
                hourly: Array.from({ length: 24 }, (_, i) => { const sunFactor = Math.max(0, Math.sin((i - 6) * Math.PI / 12)); return solar * sunFactor * 3 + wind * (0.5 + Math.random() * 0.5) * 2 + hydro * 2; }),
                stability: 80 + Math.min(solar, wind, hydro) * 0.3 + Math.random() * 10
            }); setLoading(false);
        }, 1800);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">에너지원 배분</h3>
            {[{ key: 'solar', label: '☀️ 태양광', val: solar, set: setSolar, color: 'var(--accent-amber)' },
            { key: 'wind', label: '💨 풍력', val: wind, set: setWind, color: 'var(--accent-cyan)' },
            { key: 'hydro', label: '💧 수력', val: hydro, set: setHydro, color: 'var(--accent-blue)' }].map(s => (
                <div key={s.key} className="sg"><div className="sh"><span>{s.label}</span><span className="sv" style={{ color: s.color }}>{s.val}%</span></div><input type="range" className="slider" min={0} max={100} value={s.val} onChange={e => { s.set(parseInt(e.target.value)); setResult(null); }} style={{ '--fill': s.color } as React.CSSProperties} /></div>))}
            <button className="btn btn-primary run-btn" onClick={optimize} disabled={loading}>{loading ? '최적화 중...' : '🔋 에너지 최적화 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>에너지 그리드를 최적화 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">총 발전량</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.totalGen.toFixed(0)} MW</span></div>
                    <div className="sc"><span className="sl">효율</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.efficiency.toFixed(1)}%</span></div>
                    <div className="sc"><span className="sl">비용</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>₩{result.cost.toFixed(0)}M</span></div>
                    <div className="sc"><span className="sl">CO₂ 절감</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.co2Saved.toFixed(0)}t</span></div>
                </div>
                <div className="sb"><h4>⚡ 시간대별 발전량</h4><div className="hourly">{result.hourly.map((v, i) => (<div key={i} className="hcol"><div className="hbar" style={{ height: `${(v / Math.max(...result.hourly)) * 60 + 4}px` }} /><span>{i}h</span></div>))}</div></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .sg{margin-bottom:var(--space-md)}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--fill,var(--accent-amber));cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-amber);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:18px;font-weight:700}
        .sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .hourly{display:flex;align-items:flex-end;gap:3px;height:90px;padding:var(--space-sm);background:var(--bg-glass);border-radius:var(--radius-sm)}
        .hcol{flex:1;display:flex;flex-direction:column;align-items:center}.hbar{width:100%;max-width:16px;background:var(--gradient-amber);border-radius:2px 2px 0 0;min-height:2px}
        .hcol span{font-size:8px;color:var(--text-tertiary);margin-top:3px}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
