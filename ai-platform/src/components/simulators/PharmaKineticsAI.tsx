'use client';
import { useState } from 'react';
const drugs = ['아스피린 (경구)', '인슐린 (주사)', '항생제 (IV)', '패치 (경피)'];
export default function PharmaKineticsAI() {
    const [drug, setDrug] = useState(0); const [dose, setDose] = useState(100);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { cmax: number; tmax: number; halfLife: number; bioavail: number; curve: number[]; phases: { name: string; desc: string }[] }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const oral = drug === 0 || drug === 3; const bio = oral ? 0.5 + Math.random() * 0.3 : 0.85 + Math.random() * 0.14;
            setResult({
                cmax: dose * bio * 0.01 + Math.random() * 0.5, tmax: oral ? 1.5 + Math.random() : 0.3 + Math.random() * 0.3, halfLife: 2 + drug * 1.5 + Math.random() * 2, bioavail: bio * 100,
                curve: Array.from({ length: 30 }, (_, i) => { const t = i * 0.5; const ka = oral ? 1.2 : 5; const ke = 0.15 + drug * 0.03; return dose * bio * 0.01 * (Math.exp(-ke * t) - Math.exp(-ka * t)) * ka / (ka - ke); }),
                phases: [{ name: '흡수 (Absorption)', desc: `${oral ? '경구 투여 후 위장관 흡수' : '주사/투여 경로를 통한 직접 흡수'}` }, { name: '분포 (Distribution)', desc: '혈류를 통해 조직으로 분포' }, { name: '대사 (Metabolism)', desc: '간에서 CYP450 효소에 의한 대사' }, { name: '배설 (Excretion)', desc: '신장을 통한 체외 배출' }]
            });
            setLoading(false);
        }, 1800);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">약물 & 투여 설정</h3>
            <div className="drug-grid">{drugs.map((d, i) => (<button key={i} className={`pill ${drug === i ? 'active' : ''}`} onClick={() => { setDrug(i); setResult(null); }}>💊 {d}</button>))}</div>
            <div className="sg"><div className="sh"><span>투여량</span><span className="sv">{dose}mg</span></div><input type="range" className="slider" min={10} max={500} step={10} value={dose} onChange={e => { setDose(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '시뮬레이션 중...' : '💊 약동학 시뮬레이션 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>ADME 과정을 시뮬레이션 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">Cmax</span><span className="sv2" style={{ color: 'var(--accent-rose)' }}>{result.cmax.toFixed(2)} µg/mL</span></div>
                    <div className="sc"><span className="sl">Tmax</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.tmax.toFixed(1)} hr</span></div>
                    <div className="sc"><span className="sl">반감기</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.halfLife.toFixed(1)} hr</span></div>
                    <div className="sc"><span className="sl">생체이용률</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.bioavail.toFixed(1)}%</span></div>
                </div>
                <div className="sb"><h4>📈 혈중 농도 곡선</h4><svg viewBox="0 0 400 100" className="curve-svg">
                    <polyline fill="none" stroke="var(--accent-rose)" strokeWidth="2" points={result.curve.map((v, i) => `${(i / 29) * 390 + 5},${95 - Math.min(v, 5) * 18}`).join(' ')} /></svg></div>
                <div className="sb"><h4>🔄 ADME 과정</h4>{result.phases.map((p, i) => (<div key={i} className="phase-item"><span className="phase-num">{i + 1}</span><div><span className="phase-name">{p.name}</span><span className="phase-desc">{p.desc}</span></div></div>))}</div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .drug-grid{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:var(--space-sm)}.pill{padding:8px 12px;font-size:11px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-rose-dim);border-color:var(--accent-rose);color:var(--accent-rose)}
        .sg{margin-bottom:var(--space-sm)}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-rose)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-rose);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-rose);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:16px;font-weight:700}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .curve-svg{width:100%;height:100px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:4px}
        .phase-item{display:flex;align-items:flex-start;gap:var(--space-sm);padding:10px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:6px}
        .phase-num{width:22px;height:22px;border-radius:50%;background:var(--accent-rose-dim);color:var(--accent-rose);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:2px}
        .phase-name{font-weight:600;font-size:13px;display:block}.phase-desc{font-size:12px;color:var(--text-secondary)}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
