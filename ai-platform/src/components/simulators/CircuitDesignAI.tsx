'use client';
import { useState } from 'react';
const components = ['저항기', '커패시터', 'LED', '트랜지스터', '인덕터'];
export default function CircuitDesignAI() {
    const [selected, setSelected] = useState([0, 1, 2]); const [voltage, setVoltage] = useState(5);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { totalResistance: number; current: number; power: number; components: { name: string; value: string; status: string }[] }>(null);
    const toggle = (i: number) => { setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]); setResult(null); };
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const r = selected.length * 100 + Math.random() * 200;
            setResult({
                totalResistance: r, current: (voltage / r) * 1000, power: voltage * (voltage / r) * 1000,
                components: selected.map(i => ({
                    name: components[i], value: i === 0 ? `${(100 + Math.random() * 400).toFixed(0)}Ω` : i === 1 ? `${(10 + Math.random() * 90).toFixed(0)}µF` : i === 2 ? '2.0V' : i === 3 ? 'β=100' : `${(1 + Math.random() * 9).toFixed(1)}mH`,
                    status: Math.random() > 0.1 ? '정상' : '과열 주의'
                }))
            });
            setLoading(false);
        }, 1500);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">회로 구성</h3>
            <div className="comp-grid">{components.map((c, i) => (<button key={i} className={`comp-btn ${selected.includes(i) ? 'active' : ''}`} onClick={() => toggle(i)}>🔌 {c}</button>))}</div>
            <div className="sg"><div className="sh"><span>공급 전압</span><span className="sv">{voltage}V</span></div><input type="range" className="slider" min={1} max={24} step={0.5} value={voltage} onChange={e => { setVoltage(parseFloat(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={selected.length === 0 || loading}>{loading ? '시뮬레이션 중...' : '🔌 회로 시뮬레이션 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>회로를 시뮬레이션 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">총 저항</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.totalResistance.toFixed(0)}Ω</span></div>
                    <div className="sc"><span className="sl">전류</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.current.toFixed(1)}mA</span></div>
                    <div className="sc"><span className="sl">소비 전력</span><span className="sv2" style={{ color: 'var(--accent-rose)' }}>{result.power.toFixed(1)}mW</span></div>
                </div>
                <div className="sb"><h4>📋 부품 상태</h4>{result.components.map((c, i) => (<div key={i} className="comp-item"><span className="ci-name">{c.name}</span><span className="ci-val">{c.value}</span><span className={`ci-status ${c.status === '정상' ? 'ok' : 'warn'}`}>{c.status}</span></div>))}</div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .comp-grid{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:var(--space-sm)}.comp-btn{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.comp-btn:hover{border-color:var(--border-medium)}.comp-btn.active{background:var(--accent-amber-dim);border-color:var(--accent-amber);color:var(--accent-amber)}
        .sg{margin-bottom:var(--space-sm)}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-amber)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-amber);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-amber);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:18px;font-weight:700}
        .sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .comp-item{display:flex;align-items:center;gap:var(--space-md);padding:10px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:6px;font-size:13px}
        .ci-name{font-weight:600;min-width:80px}.ci-val{font-family:var(--font-mono);color:var(--text-secondary);flex:1}.ci-status{padding:3px 8px;border-radius:var(--radius-full);font-size:10px;font-weight:600}.ok{background:var(--accent-emerald-dim);color:var(--accent-emerald)}.warn{background:var(--accent-amber-dim);color:var(--accent-amber)}
      `}</style>
        </div>
    );
}
