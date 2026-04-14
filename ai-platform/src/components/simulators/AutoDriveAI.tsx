'use client';
import { useState } from 'react';
export default function AutoDriveAI() {
    const [scenario, setScenario] = useState<'city' | 'highway' | 'rain'>('city');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { obstacles: { type: string; dist: number; action: string }[]; path: { x: number; y: number }[]; speed: number; safetyScore: number; reactionTime: number }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            setResult({
                obstacles: [{ type: '🚶 보행자', dist: 15 + Math.random() * 10, action: '감속 정지' }, { type: '🚗 전방 차량', dist: 30 + Math.random() * 20, action: '차간 거리 유지' }, { type: '🚧 공사 구간', dist: 80 + Math.random() * 40, action: '차선 변경' }],
                path: Array.from({ length: 20 }, (_, i) => ({ x: i * 25 + 10, y: 50 + Math.sin(i * 0.4) * 20 + Math.random() * 5 })),
                speed: scenario === 'highway' ? 80 + Math.random() * 20 : 30 + Math.random() * 20, safetyScore: 85 + Math.random() * 13, reactionTime: 0.1 + Math.random() * 0.15
            });
            setLoading(false);
        }, 2000);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">주행 시나리오</h3>
            <div className="pill-row">{(['city', 'highway', 'rain'] as const).map(s => (<button key={s} className={`pill ${scenario === s ? 'active' : ''}`} onClick={() => { setScenario(s); setResult(null); }}>{s === 'city' ? '🏙️ 도심' : s === 'highway' ? '🛣️ 고속도로' : '🌧️ 우천'}</button>))}</div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '시뮬레이션 중...' : '🚗 자율주행 시뮬레이션 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>자율주행 경로를 계획 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">안전 점수</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.safetyScore.toFixed(1)}%</span></div>
                    <div className="sc"><span className="sl">주행 속도</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.speed.toFixed(0)} km/h</span></div>
                    <div className="sc"><span className="sl">반응 시간</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.reactionTime.toFixed(2)}s</span></div>
                </div>
                <div className="sb"><h4>🗺️ 경로 계획</h4><svg viewBox="0 0 520 120" className="path-svg">
                    <rect x="0" y="30" width="520" height="60" fill="var(--bg-glass)" rx="4" />
                    {[45, 60, 75].map(y => (<line key={y} x1="0" y1={y} x2="520" y2={y} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="8" />))}
                    <polyline fill="none" stroke="var(--accent-emerald)" strokeWidth="2" points={result.path.map(p => `${p.x},${p.y}`).join(' ')} />
                    <circle cx={result.path[result.path.length - 1].x} cy={result.path[result.path.length - 1].y} r="6" fill="var(--accent-emerald)" />
                    <text x="10" y="25" fill="var(--text-tertiary)" fontSize="10">경로 시각화</text>
                </svg></div>
                <div className="sb"><h4>⚠️ 장애물 탐지</h4>{result.obstacles.map((o, i) => (<div key={i} className="obs-item"><span className="obs-icon">{o.type}</span><span className="obs-dist">{o.dist.toFixed(0)}m</span><span className="obs-action">{o.action}</span></div>))}</div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .pill-row{display:flex;gap:6px}.pill{padding:8px 16px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-emerald-dim);border-color:var(--accent-emerald);color:var(--accent-emerald)}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-emerald);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:20px;font-weight:700}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .path-svg{width:100%;background:var(--bg-secondary);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:4px}
        .obs-item{display:flex;align-items:center;gap:var(--space-md);padding:10px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:6px;font-size:13px}
        .obs-dist{font-family:var(--font-mono);color:var(--accent-amber);font-weight:600;min-width:40px}.obs-action{color:var(--text-secondary);margin-left:auto}
      `}</style>
        </div>
    );
}
