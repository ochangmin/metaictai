'use client';
import { useState } from 'react';
const structures = ['고층 빌딩 (30층)', '교량 (현수교)', '돔 구조물', '댐 (아치형)'];
export default function StructurAI() {
    const [struct, setStruct] = useState(0);
    const [load, setLoad] = useState(500);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { maxStress: number; safetyFactor: number; deflection: number; weight: number; status: string; stressMap: number[][] }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const sf = 2.0 + Math.random() * 1.5 - (load / 2000);
            setResult({
                maxStress: load * 0.3 + Math.random() * 50, safetyFactor: Math.max(1.1, sf), deflection: load * 0.01 + Math.random() * 5, weight: 5000 + struct * 2000 + Math.random() * 1000, status: sf > 1.5 ? '안전' : sf > 1.2 ? '주의' : '위험',
                stressMap: Array.from({ length: 6 }, () => Array.from({ length: 10 }, () => Math.random()))
            }); setLoading(false);
        }, 1800);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">구조물 설정</h3>
            <div className="struct-grid">{structures.map((s, i) => (<button key={i} className={`opt-btn ${struct === i ? 'active' : ''}`} onClick={() => { setStruct(i); setResult(null); }}>🏗️ {s}</button>))}</div>
            <div className="slider-group"><div className="slider-header"><span>설계 하중</span><span className="sv">{load} kN</span></div><input type="range" className="slider" min={100} max={2000} step={50} value={load} onChange={e => { setLoad(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '분석 중...' : '🏗️ 구조 분석 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>구조 역학을 분석 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">최대 응력</span><span className="sv2" style={{ color: 'var(--accent-rose)' }}>{result.maxStress.toFixed(1)} MPa</span></div>
                    <div className="sc"><span className="sl">안전 계수</span><span className="sv2" style={{ color: result.safetyFactor > 1.5 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>{result.safetyFactor.toFixed(2)}</span></div>
                    <div className="sc"><span className="sl">처짐량</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.deflection.toFixed(2)} mm</span></div>
                    <div className="sc"><span className="sl">상태</span><span className={`status-badge ${result.status === '안전' ? 'safe' : result.status === '주의' ? 'warn' : 'danger'}`}>{result.status}</span></div>
                </div>
                <div className="sb"><h4>🗺️ 응력 분포도</h4><div className="smap">{result.stressMap.map((r, ri) => r.map((v, ci) => (<div key={`${ri}-${ci}`} className="scell" style={{ background: `rgba(255,${Math.floor(255 - v * 200)},${Math.floor(80 - v * 80)},${0.3 + v * 0.5})` }} />)))}</div></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .struct-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-sm)}.opt-btn{padding:var(--space-md);background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);font-size:12px;cursor:pointer;transition:all var(--transition-fast);font-family:inherit;color:inherit;text-align:center}.opt-btn:hover{border-color:var(--border-medium)}.opt-btn.active{border-color:var(--accent-amber);background:var(--accent-amber-dim)}
        .slider-group{margin:var(--space-sm) 0}.slider-header{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-amber)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-amber);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-amber);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:18px;font-weight:700}
        .status-badge{font-size:16px;font-weight:700;display:block;margin-top:4px}.safe{color:var(--accent-emerald)}.warn{color:var(--accent-amber)}.danger{color:var(--accent-rose)}
        .sb{margin-bottom:var(--space-lg)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .smap{display:grid;grid-template-columns:repeat(10,1fr);gap:2px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-sm)}.scell{aspect-ratio:1;border-radius:2px;transition:transform var(--transition-fast)}.scell:hover{transform:scale(1.3)}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
