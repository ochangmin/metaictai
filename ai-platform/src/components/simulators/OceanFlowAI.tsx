'use client';
import { useState } from 'react';
const oceans = ['태평양', '대서양', '인도양', '북극해'];
export default function OceanFlowAI() {
    const [ocean, setOcean] = useState(0);
    const [depth, setDepth] = useState(100);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { temp: number; salinity: number; currentSpeed: number; ph: number; heatmap: number[][]; depthProfile: { d: number; t: number }[] }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const base = ocean === 3 ? -1 : 15 + ocean * 3;
            setResult({
                temp: base + Math.random() * 5 - depth * 0.02, salinity: 33 + ocean * 0.5 + Math.random() * 2, currentSpeed: 0.3 + Math.random() * 1.5, ph: 7.9 + Math.random() * 0.3,
                heatmap: Array.from({ length: 8 }, () => Array.from({ length: 12 }, () => Math.random())),
                depthProfile: Array.from({ length: 8 }, (_, i) => ({ d: i * 500, t: base - i * 2.5 + Math.random() * 2 })),
            }); setLoading(false);
        }, 1800);
    };
    const getC = (v: number) => `rgba(0,${Math.floor(100 + v * 155)},${Math.floor(200 + v * 55)},${0.3 + v * 0.5})`;
    return (
        <div className="sim-ui">
            <h3 className="panel-title">해역 & 수심 설정</h3>
            <div className="ocean-select">{oceans.map((o, i) => (<button key={i} className={`pill ${ocean === i ? 'active' : ''}`} onClick={() => { setOcean(i); setResult(null); }}>🌊 {o}</button>))}</div>
            <div className="slider-group"><div className="slider-header"><span>수심</span><span className="slider-value">{depth}m</span></div><input type="range" className="slider" min={0} max={4000} step={100} value={depth} onChange={e => { setDepth(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '시뮬레이션 중...' : '🌊 해양 시뮬레이션 실행'}</button>
            {loading && <div className="loading-state"><div className="loader" /><p>해류 데이터를 시뮬레이션 중입니다...</p></div>}
            {result && !loading && (
                <div className="results">
                    <div className="stat-row">
                        <div className="stat-card"><span className="s-label">수온</span><span className="s-val" style={{ color: 'var(--accent-cyan)' }}>{result.temp.toFixed(1)}°C</span></div>
                        <div className="stat-card"><span className="s-label">염분</span><span className="s-val" style={{ color: 'var(--accent-amber)' }}>{result.salinity.toFixed(1)}‰</span></div>
                        <div className="stat-card"><span className="s-label">해류 속도</span><span className="s-val" style={{ color: 'var(--accent-emerald)' }}>{result.currentSpeed.toFixed(2)} m/s</span></div>
                        <div className="stat-card"><span className="s-label">pH</span><span className="s-val" style={{ color: 'var(--accent-purple)' }}>{result.ph.toFixed(2)}</span></div>
                    </div>
                    <div className="section-box"><h4>🗺️ 수온 분포 히트맵</h4><div className="heatmap">{result.heatmap.map((r, ri) => r.map((v, ci) => (<div key={`${ri}-${ci}`} className="hcell" style={{ background: getC(v) }} />)))}</div></div>
                    <div className="section-box"><h4>📊 수심별 온도 프로파일</h4><svg viewBox="0 0 400 120" className="chart-svg">
                        <polyline fill="none" stroke="var(--accent-cyan)" strokeWidth="2" points={result.depthProfile.map((d, i) => `${(i / 7) * 380 + 10},${110 - ((d.t + 5) / 30) * 100}`).join(' ')} />
                        {result.depthProfile.map((d, i) => (<circle key={i} cx={(i / 7) * 380 + 10} cy={110 - ((d.t + 5) / 30) * 100} r="3" fill="var(--accent-cyan)" />))}
                    </svg></div>
                </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .ocean-select{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:var(--space-sm)}
        .pill{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}
        .pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-cyan-dim);border-color:var(--accent-cyan);color:var(--accent-cyan)}
        .slider-group{margin-bottom:var(--space-sm)}.slider-header{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.slider-value{font-weight:700;font-family:var(--font-mono);color:var(--accent-cyan)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-cyan);cursor:pointer}
        .run-btn{width:100%;padding:14px}.loading-state{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-cyan);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .stat-card{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .s-label{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.s-val{font-size:18px;font-weight:700}
        .section-box{margin-bottom:var(--space-xl)}.section-box h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .heatmap{display:grid;grid-template-columns:repeat(12,1fr);gap:2px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-sm)}
        .hcell{aspect-ratio:1;border-radius:2px;transition:transform var(--transition-fast)}.hcell:hover{transform:scale(1.3);z-index:1}
        .chart-svg{width:100%;height:120px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-sm)}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
