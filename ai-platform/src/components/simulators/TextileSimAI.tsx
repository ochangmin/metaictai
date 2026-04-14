'use client';
import { useState } from 'react';
const fibers = ['면 (Cotton)', '폴리에스터', '나일론', '울 (Wool)', '실크'];
export default function TextileSimAI() {
    const [f1, setF1] = useState(0); const [f2, setF2] = useState(1); const [ratio, setRatio] = useState(60);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { tensile: number; breathability: number; stretch: number; durability: number; moisture: number; grade: string; radar: number[] }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const r1 = ratio / 100, r2 = 1 - r1;
            const props = [[60, 85, 10, 70, 80], [90, 40, 15, 95, 30], [85, 30, 40, 90, 25], [50, 70, 20, 60, 70], [40, 60, 5, 30, 90]];
            const p = props[f1].map((v, i) => v * r1 + props[f2][i] * r2);
            setResult({
                tensile: p[0], breathability: p[1], stretch: p[2], durability: p[3], moisture: p[4],
                grade: p.reduce((a, b) => a + b, 0) / 5 > 65 ? 'A' : p.reduce((a, b) => a + b, 0) / 5 > 45 ? 'B' : 'C', radar: p
            }); setLoading(false);
        }, 1500);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">섬유 혼방 설정</h3>
            <div className="fiber-row"><div className="fiber-sel"><span className="fl">주요 섬유</span><div className="pill-row">{fibers.map((f, i) => (<button key={i} className={`pill ${f1 === i ? 'active' : ''}`} onClick={() => { setF1(i); setResult(null); }}>{f}</button>))}</div></div>
                <div className="fiber-sel"><span className="fl">보조 섬유</span><div className="pill-row">{fibers.map((f, i) => (<button key={i} className={`pill ${f2 === i ? 'active' : ''}`} onClick={() => { setF2(i); setResult(null); }}>{f}</button>))}</div></div></div>
            <div className="sg"><div className="sh"><span>혼방 비율</span><span className="sv">{ratio}% : {100 - ratio}%</span></div><input type="range" className="slider" min={10} max={90} value={ratio} onChange={e => { setRatio(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '분석 중...' : '🧵 직물 시뮬레이션 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>직물 물성을 분석 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="grade-box"><span>종합 등급</span><span className={`grade g-${result.grade}`}>{result.grade}</span></div>
                <div className="stat-row">
                    {[{ l: '인장 강도', v: result.tensile, c: 'var(--accent-rose)' }, { l: '통기성', v: result.breathability, c: 'var(--accent-cyan)' }, { l: '신축성', v: result.stretch, c: 'var(--accent-purple)' }, { l: '내구성', v: result.durability, c: 'var(--accent-amber)' }, { l: '흡습성', v: result.moisture, c: 'var(--accent-emerald)' }].map(s => (
                        <div key={s.l} className="sc"><span className="sl">{s.l}</span><span className="sv2" style={{ color: s.c }}>{s.v.toFixed(0)}%</span></div>))}
                </div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .fiber-row{display:flex;flex-direction:column;gap:var(--space-md)}.fiber-sel{}.fl{font-size:13px;font-weight:500;display:block;margin-bottom:6px}
        .pill-row{display:flex;flex-wrap:wrap;gap:6px}.pill{padding:6px 12px;font-size:11px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-amber-dim);border-color:var(--accent-amber);color:var(--accent-amber)}
        .sg{margin:var(--space-sm) 0}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-amber)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-amber);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-amber);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}
        .grade-box{display:flex;align-items:center;justify-content:center;gap:var(--space-md);padding:var(--space-lg);background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);margin-bottom:var(--space-xl);font-size:14px}
        .grade{font-size:32px;font-weight:800}.g-A{color:var(--accent-emerald)}.g-B{color:var(--accent-amber)}.g-C{color:var(--accent-rose)}
        .stat-row{display:grid;grid-template-columns:repeat(5,1fr);gap:var(--space-md)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:10px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:18px;font-weight:700}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(3,1fr)}}
      `}</style>
        </div>
    );
}
