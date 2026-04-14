'use client';
import { useState } from 'react';
export default function ElectroMagAI() {
    const [charges, setCharges] = useState<{ x: number; y: number; q: number }[]>([{ x: 120, y: 100, q: 1 }, { x: 280, y: 100, q: -1 }]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { fieldLines: { x1: number; y1: number; x2: number; y2: number }[]; potential: number; force: number; eField: number }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
            charges.forEach(c => { for (let a = 0; a < 8; a++) { const angle = (a / 8) * Math.PI * 2; const len = 30 + Math.random() * 40; lines.push({ x1: c.x, y1: c.y, x2: c.x + Math.cos(angle) * len * c.q, y2: c.y + Math.sin(angle) * len * c.q }); } });
            const dx = charges[1].x - charges[0].x; const dy = charges[1].y - charges[0].y; const dist = Math.sqrt(dx * dx + dy * dy);
            setResult({ fieldLines: lines, potential: 8.99e9 * charges[0].q * charges[1].q / dist * 0.001, force: 8.99e9 * Math.abs(charges[0].q * charges[1].q) / (dist * dist) * 0.001, eField: 8.99e9 * 1 / (dist * dist) * 0.01 }); setLoading(false);
        }, 1200);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">전하 배치 (클릭으로 전하 극성 전환)</h3>
            <div className="field-view"><svg viewBox="0 0 400 200" className="fs">
                {result && result.fieldLines.map((l, i) => (<line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="var(--accent-cyan)" strokeWidth="0.8" opacity="0.4" />))}
                {charges.map((c, i) => (<g key={i} onClick={() => { const nc = [...charges]; nc[i] = { ...c, q: c.q * -1 }; setCharges(nc); setResult(null); }} style={{ cursor: 'pointer' }}>
                    <circle cx={c.x} cy={c.y} r="18" fill={c.q > 0 ? 'rgba(255,82,82,0.3)' : 'rgba(0,229,255,0.3)'} stroke={c.q > 0 ? 'var(--accent-rose)' : 'var(--accent-cyan)'} strokeWidth="2" />
                    <text x={c.x} y={c.y + 5} fill="var(--text-primary)" fontSize="16" textAnchor="middle" fontWeight="700">{c.q > 0 ? '+' : '−'}</text></g>))}
            </svg></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '계산 중...' : '🧲 전자기장 시뮬레이션 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>전자기장을 계산 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">전기장 세기</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.eField.toFixed(2)} N/C</span></div>
                    <div className="sc"><span className="sl">쿨롱 힘</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.force.toFixed(3)} N</span></div>
                    <div className="sc"><span className="sl">전위</span><span className="sv2" style={{ color: 'var(--accent-purple)' }}>{result.potential.toFixed(2)} V</span></div>
                </div></div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .field-view{border:1px solid var(--border-subtle);border-radius:var(--radius-md);overflow:hidden;background:radial-gradient(circle at 50% 50%,rgba(0,229,255,0.02),transparent)}.fs{width:100%;display:block}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-cyan);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:16px;font-weight:700}
      `}</style>
        </div>
    );
}
