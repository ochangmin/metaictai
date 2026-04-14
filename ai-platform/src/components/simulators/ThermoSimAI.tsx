'use client';
import { useState } from 'react';
const cycles = ['카르노 (Carnot)', '랭킨 (Rankine)', '오토 (Otto)', '디젤 (Diesel)'];
export default function ThermoSimAI() {
    const [cycle, setCycle] = useState(0); const [tHot, setTHot] = useState(600); const [tCold, setTCold] = useState(300);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { efficiency: number; work: number; heatIn: number; heatOut: number; cop: number; pvPoints: { p: number; v: number }[] }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const eff = (1 - tCold / tHot) * (cycle === 0 ? 1 : cycle === 1 ? 0.85 : cycle === 2 ? 0.7 : 0.75) * 100;
            setResult({
                efficiency: eff, work: eff * 10 + Math.random() * 50, heatIn: 1000 + Math.random() * 500, heatOut: 1000 * (1 - eff / 100) + Math.random() * 100, cop: tCold / (tHot - tCold) + Math.random() * 0.5,
                pvPoints: cycle === 0 ? [{ p: 80, v: 20 }, { p: 80, v: 60 }, { p: 20, v: 80 }, { p: 20, v: 20 }] : cycle === 2 ? [{ p: 20, v: 80 }, { p: 90, v: 20 }, { p: 50, v: 40 }, { p: 20, v: 70 }] : [{ p: 20, v: 80 }, { p: 70, v: 30 }, { p: 90, v: 30 }, { p: 20, v: 70 }]
            }); setLoading(false);
        }, 1500);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">열역학 사이클</h3>
            <div className="pill-row">{cycles.map((c, i) => (<button key={i} className={`pill ${cycle === i ? 'active' : ''}`} onClick={() => { setCycle(i); setResult(null); }}>{c}</button>))}</div>
            <div className="sg"><div className="sh"><span>고온원</span><span className="sv">{tHot}K</span></div><input type="range" className="slider hot" min={400} max={1200} step={10} value={tHot} onChange={e => { setTHot(parseInt(e.target.value)); setResult(null); }} /></div>
            <div className="sg"><div className="sh"><span>저온원</span><span className="sv cold">{tCold}K</span></div><input type="range" className="slider cold" min={200} max={400} step={10} value={tCold} onChange={e => { setTCold(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={tCold >= tHot || loading}>{loading ? '계산 중...' : '🌡️ 열역학 시뮬레이션 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>열역학 사이클을 계산 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">효율</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.efficiency.toFixed(1)}%</span></div>
                    <div className="sc"><span className="sl">일</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.work.toFixed(0)} kJ</span></div>
                    <div className="sc"><span className="sl">열 입력</span><span className="sv2" style={{ color: 'var(--accent-rose)' }}>{result.heatIn.toFixed(0)} kJ</span></div>
                    <div className="sc"><span className="sl">COP</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.cop.toFixed(2)}</span></div>
                </div>
                <div className="sb"><h4>📈 P-V 다이어그램</h4><svg viewBox="0 0 120 120" className="pv-svg">
                    <line x1="10" y1="110" x2="110" y2="110" stroke="var(--text-tertiary)" strokeWidth="0.5" /><line x1="10" y1="10" x2="10" y2="110" stroke="var(--text-tertiary)" strokeWidth="0.5" />
                    <text x="60" y="118" fill="var(--text-tertiary)" fontSize="6" textAnchor="middle">V</text><text x="5" y="60" fill="var(--text-tertiary)" fontSize="6" textAnchor="middle" transform="rotate(-90,5,60)">P</text>
                    <polygon points={result.pvPoints.map(p => `${10 + p.v},${110 - p.p}`).join(' ')} fill="rgba(0,229,255,0.1)" stroke="var(--accent-cyan)" strokeWidth="1.5" />
                    {result.pvPoints.map((p, i) => (<circle key={i} cx={10 + p.v} cy={110 - p.p} r="2.5" fill="var(--accent-cyan)" />))}
                </svg></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .pill-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:var(--space-sm)}.pill{padding:6px 12px;font-size:11px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-rose-dim);border-color:var(--accent-rose);color:var(--accent-rose)}
        .sg{margin-bottom:var(--space-md)}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-rose)}.sv.cold{color:var(--accent-cyan)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-rose);cursor:pointer}.slider.cold::-webkit-slider-thumb{background:var(--accent-cyan)}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-rose);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:16px;font-weight:700}
        .sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}.pv-svg{width:200px;height:200px;display:block;margin:0 auto;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:8px}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
