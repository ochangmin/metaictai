'use client';
import { useState } from 'react';
export default function UrbanPlanAI() {
    const [population, setPopulation] = useState(500000); const [greenRatio, setGreenRatio] = useState(30); const [density, setDensity] = useState<'low' | 'mid' | 'high'>('mid');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { livability: number; traffic: number; airQuality: number; zones: { name: string; area: number; emoji: string }[]; suggestions: string[] }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const dm = density === 'low' ? 0.8 : density === 'mid' ? 1 : 1.3;
            setResult({
                livability: 60 + greenRatio * 0.5 - (population / 100000) * 2 + Math.random() * 10,
                traffic: density === 'high' ? 30 + Math.random() * 15 : density === 'mid' ? 55 + Math.random() * 15 : 75 + Math.random() * 10,
                airQuality: 50 + greenRatio * 0.8 - population / 50000 + Math.random() * 10,
                zones: [{ name: '주거 구역', area: 40 * dm, emoji: '🏠' }, { name: '상업 구역', area: 25 * dm, emoji: '🏢' }, { name: '녹지/공원', area: greenRatio, emoji: '🌳' }, { name: '산업 구역', area: 15 * dm, emoji: '🏭' }, { name: '교통 인프라', area: 20 * dm, emoji: '🚇' }],
                suggestions: ['대중교통 확충으로 교통 혼잡 해소', '녹지 비율 확대를 통한 도시 열섬 효과 완화', '스마트 그리드 기반 에너지 효율화']
            }); setLoading(false);
        }, 1800);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">도시 매개변수</h3>
            <div className="sg"><div className="sh"><span>인구</span><span className="sv">{(population / 10000).toFixed(0)}만명</span></div><input type="range" className="slider" min={100000} max={5000000} step={50000} value={population} onChange={e => { setPopulation(parseInt(e.target.value)); setResult(null); }} /></div>
            <div className="sg"><div className="sh"><span>녹지 비율</span><span className="sv">{greenRatio}%</span></div><input type="range" className="slider" min={5} max={50} value={greenRatio} onChange={e => { setGreenRatio(parseInt(e.target.value)); setResult(null); }} /></div>
            <div className="density-row"><span className="fl">인구 밀도</span><div className="pill-row">{(['low', 'mid', 'high'] as const).map(d => (<button key={d} className={`pill ${density === d ? 'active' : ''}`} onClick={() => { setDensity(d); setResult(null); }}>{d === 'low' ? '🏡 저밀도' : d === 'mid' ? '🏙️ 중밀도' : '🌆 고밀도'}</button>))}</div></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '분석 중...' : '🏙️ 도시 설계 분석'}</button>
            {loading && <div className="ld"><div className="loader" /><p>도시 데이터를 분석 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">거주 적합도</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.livability.toFixed(0)}</span></div>
                    <div className="sc"><span className="sl">교통 원활도</span><span className="sv2" style={{ color: result.traffic > 60 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>{result.traffic.toFixed(0)}%</span></div>
                    <div className="sc"><span className="sl">대기질 지수</span><span className="sv2" style={{ color: result.airQuality > 70 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>{result.airQuality.toFixed(0)}</span></div>
                </div>
                <div className="sb"><h4>🗺️ 구역 배분</h4><div className="zone-bars">{result.zones.map(z => (<div key={z.name} className="zone-item"><span>{z.emoji} {z.name}</span><div className="zone-bar"><div className="zone-fill" style={{ width: `${z.area}%` }} /></div><span className="zone-pct">{z.area.toFixed(0)}%</span></div>))}</div></div>
                <div className="sb"><h4>💡 개선 제안</h4>{result.suggestions.map((s, i) => (<div key={i} className="sug"><span className="sug-n">{i + 1}</span><span>{s}</span></div>))}</div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .sg{margin-bottom:var(--space-md)}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-cyan)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-cyan);cursor:pointer}
        .density-row{margin-bottom:var(--space-md)}.fl{font-size:13px;font-weight:500;display:block;margin-bottom:8px}
        .pill-row{display:flex;gap:6px}.pill{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-cyan-dim);border-color:var(--accent-cyan);color:var(--accent-cyan)}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-cyan);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:20px;font-weight:700}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .zone-item{display:flex;align-items:center;gap:var(--space-sm);padding:8px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:6px;font-size:13px}
        .zone-bar{flex:1;height:6px;background:var(--bg-glass-strong);border-radius:3px;overflow:hidden}.zone-fill{height:100%;background:var(--accent-cyan);border-radius:3px;transition:width 1s ease-out}
        .zone-pct{font-family:var(--font-mono);font-size:12px;color:var(--text-tertiary);min-width:35px;text-align:right}
        .sug{display:flex;align-items:center;gap:var(--space-sm);padding:8px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:6px;font-size:13px;color:var(--text-secondary)}
        .sug-n{width:22px;height:22px;border-radius:50%;background:var(--accent-cyan-dim);color:var(--accent-cyan);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0}
      `}</style>
        </div>
    );
}
