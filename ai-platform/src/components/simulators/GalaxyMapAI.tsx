'use client';
import { useState, useEffect } from 'react';
export default function GalaxyMapAI() {
    const [region, setRegion] = useState<'milkyway' | 'andromeda' | 'cluster'>('milkyway');
    const [loading, setLoading] = useState(false);
    const [stars, setStars] = useState<{ x: number; y: number; r: number; color: string; brightness: number }[]>([]);
    const [result, setResult] = useState<null | { starCount: number; avgMagnitude: number; spectralTypes: { type: string; count: number; color: string }[]; distance: string }>(null);
    useEffect(() => { setStars(Array.from({ length: 120 }, () => ({ x: Math.random() * 400, y: Math.random() * 250, r: 0.5 + Math.random() * 2.5, color: ['#fff', '#adf', '#fda', '#faa', '#aaf'][Math.floor(Math.random() * 5)], brightness: 0.3 + Math.random() * 0.7 }))); }, []);
    const analyze = () => {
        setLoading(true); setTimeout(() => {
            setResult({
                starCount: region === 'milkyway' ? 200 + Math.floor(Math.random() * 100) : region === 'andromeda' ? 1000 + Math.floor(Math.random() * 500) : 50000 + Math.floor(Math.random() * 20000),
                avgMagnitude: 4.5 + Math.random() * 2, distance: region === 'milkyway' ? '26,000 광년' : region === 'andromeda' ? '2.537M 광년' : '55M 광년',
                spectralTypes: [{ type: 'O형 (청색)', count: 5 + Math.floor(Math.random() * 10), color: '#88f' }, { type: 'G형 (황색)', count: 30 + Math.floor(Math.random() * 20), color: '#ff8' }, { type: 'M형 (적색)', count: 60 + Math.floor(Math.random() * 30), color: '#f88' }, { type: 'K형 (주황)', count: 20 + Math.floor(Math.random() * 15), color: '#fa8' }]
            }); setLoading(false);
        }, 2000);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">관측 대상</h3>
            <div className="pill-row">{(['milkyway', 'andromeda', 'cluster'] as const).map(r => (<button key={r} className={`pill ${region === r ? 'active' : ''}`} onClick={() => { setRegion(r); setResult(null); }}>{r === 'milkyway' ? '🌌 은하수' : r === 'andromeda' ? '🌀 안드로메다' : '✨ 은하단'}</button>))}</div>
            <div className="star-field"><svg viewBox="0 0 400 250" className="star-svg"><rect width="400" height="250" fill="var(--bg-primary)" rx="8" />
                {stars.map((s, i) => (<circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.color} opacity={s.brightness}><animate attributeName="opacity" values={`${s.brightness};${s.brightness * 0.4};${s.brightness}`} dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" /></circle>))}
            </svg></div>
            <button className="btn btn-primary run-btn" onClick={analyze} disabled={loading}>{loading ? '관측 중...' : '🔭 천체 분석 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>천체 데이터를 분석 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">관측 항성 수</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.starCount.toLocaleString()}</span></div>
                    <div className="sc"><span className="sl">평균 등급</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.avgMagnitude.toFixed(1)}</span></div>
                    <div className="sc"><span className="sl">거리</span><span className="sv2" style={{ color: 'var(--accent-purple)', fontSize: '14px' }}>{result.distance}</span></div>
                </div>
                <div className="sb"><h4>🌟 스펙트럼 분류</h4>{result.spectralTypes.map(t => (<div key={t.type} className="spec-item"><span className="spec-dot" style={{ background: t.color }} /><span className="spec-type">{t.type}</span><div className="spec-bar"><div className="spec-fill" style={{ width: `${(t.count / 100) * 100}%`, background: t.color }} /></div><span className="spec-cnt">{t.count}</span></div>))}</div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .pill-row{display:flex;gap:6px;margin-bottom:var(--space-sm)}.pill{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-purple-dim);border-color:var(--accent-purple);color:var(--accent-purple)}
        .star-field{border:1px solid var(--border-subtle);border-radius:var(--radius-md);overflow:hidden}.star-svg{width:100%;display:block}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-purple);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:18px;font-weight:700}
        .sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .spec-item{display:flex;align-items:center;gap:var(--space-sm);padding:8px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:6px}
        .spec-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}.spec-type{font-size:12px;font-weight:600;min-width:100px}
        .spec-bar{flex:1;height:6px;background:var(--bg-glass-strong);border-radius:3px;overflow:hidden}.spec-fill{height:100%;border-radius:3px;transition:width 1s ease-out}
        .spec-cnt{font-family:var(--font-mono);font-size:12px;color:var(--text-tertiary);min-width:30px;text-align:right}
      `}</style>
        </div>
    );
}
