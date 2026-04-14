'use client';
import { useState } from 'react';
const soilTypes = ['사질토 (Sandy)', '양토 (Loam)', '점토 (Clay)', '이탄토 (Peat)'];
export default function SoilAnalyzerAI() {
    const [soilType, setSoilType] = useState(0);
    const [depth, setDepth] = useState(30);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        ph: number; nitrogen: number; phosphorus: number; potassium: number; organic: number; cec: number;
        moisture: number; texture: { sand: number; silt: number; clay: number };
        suitability: { crop: string; score: number }[];
        amendments: { item: string; amount: string; reason: string }[];
        healthScore: number;
    }>(null);

    const analyze = () => {
        setLoading(true); setTimeout(() => {
            const base = [[6.5, 40, 25, 180, 2.5, 8], [6.8, 60, 40, 220, 4.2, 15], [7.2, 45, 35, 200, 3.5, 25], [5.5, 80, 50, 150, 12, 35]][soilType];
            const vary = () => Math.random() * 0.3 - 0.15;
            const tex = soilType === 0 ? { sand: 70, silt: 20, clay: 10 } : soilType === 1 ? { sand: 40, silt: 40, clay: 20 } : soilType === 2 ? { sand: 20, silt: 30, clay: 50 } : { sand: 30, silt: 35, clay: 35 };
            setResult({
                ph: base[0] + vary() + depth * 0.005, nitrogen: base[1] * (1 + vary()), phosphorus: base[2] * (1 + vary()), potassium: base[3] * (1 + vary()),
                organic: base[4] * (1 + vary()), cec: base[5] * (1 + vary()), moisture: 20 + soilType * 8 + Math.random() * 10 - depth * 0.1,
                texture: tex,
                suitability: [
                    { crop: '🌾 벼', score: soilType === 2 ? 92 : soilType === 1 ? 85 : 60 + Math.random() * 10 },
                    { crop: '🥬 배추', score: soilType === 1 ? 95 : 70 + Math.random() * 15 },
                    { crop: '🌽 옥수수', score: soilType === 1 ? 90 : soilType === 0 ? 80 : 65 + Math.random() * 10 },
                    { crop: '🥔 감자', score: soilType === 0 ? 88 : 72 + Math.random() * 12 },
                    { crop: '🍓 딸기', score: soilType === 1 ? 93 : 68 + Math.random() * 15 },
                    { crop: '🍅 토마토', score: soilType === 1 ? 91 : 70 + Math.random() * 12 },
                ].sort((a, b) => b.score - a.score),
                amendments: soilType === 0 ? [{ item: '유기질 퇴비', amount: '3~5 ton/ha', reason: '보수력 및 유기물 함량 개선' }, { item: '벤토나이트', amount: '2 ton/ha', reason: '점토 함량 증가로 보비력 향상' }]
                    : soilType === 2 ? [{ item: '모래/펄라이트', amount: '5 ton/ha', reason: '배수성 개선' }, { item: '석회', amount: '1 ton/ha', reason: 'pH 조정' }]
                        : soilType === 3 ? [{ item: '석회', amount: '2 ton/ha', reason: '산성 토양 교정' }, { item: '인산 비료', amount: '30 kg/ha', reason: '인산 고정 방지' }]
                            : [{ item: '유기질 퇴비', amount: '2 ton/ha', reason: '지력 유지' }],
                healthScore: soilType === 1 ? 85 + Math.random() * 10 : soilType === 3 ? 65 + Math.random() * 15 : 70 + Math.random() * 15,
            }); setLoading(false);
        }, 2000);
    };

    return (
        <div className="sim-ui">
            <h3 className="panel-title">🧪 토양 분석 설정</h3>
            <div className="soil-grid">{soilTypes.map((s, i) => (<button key={i} className={`opt-btn ${soilType === i ? 'active' : ''}`} onClick={() => { setSoilType(i); setResult(null); }}>🟤 {s}</button>))}</div>
            <div className="sg"><div className="sh"><span>채취 깊이</span><span className="sv">{depth}cm</span></div><input type="range" className="slider" min={10} max={100} step={5} value={depth} onChange={e => { setDepth(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={analyze} disabled={loading}>{loading ? '분석 중...' : '🧪 토양 정밀 분석 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>토양 샘플을 분석 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="health-bar"><span>토양 건강도</span><div className="hb-track"><div className="hb-fill" style={{ width: `${result.healthScore}%`, background: result.healthScore > 80 ? 'var(--accent-emerald)' : result.healthScore > 60 ? 'var(--accent-amber)' : 'var(--accent-rose)' }} /></div><span className="hb-val">{result.healthScore.toFixed(0)}점</span></div>

                <div className="stat-row">
                    <div className="sc"><span className="sl">pH</span><span className="sv2" style={{ color: result.ph > 6 && result.ph < 7.5 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>{result.ph.toFixed(1)}</span></div>
                    <div className="sc"><span className="sl">질소 (N)</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.nitrogen.toFixed(0)} mg/kg</span></div>
                    <div className="sc"><span className="sl">인산 (P)</span><span className="sv2" style={{ color: 'var(--accent-purple)' }}>{result.phosphorus.toFixed(0)} mg/kg</span></div>
                    <div className="sc"><span className="sl">칼리 (K)</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.potassium.toFixed(0)} mg/kg</span></div>
                    <div className="sc"><span className="sl">유기물</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.organic.toFixed(1)}%</span></div>
                    <div className="sc"><span className="sl">CEC</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.cec.toFixed(1)} cmol/kg</span></div>
                </div>

                <div className="section-row">
                    <div className="sb"><h4>🌾 적합 작물 순위</h4>{result.suitability.slice(0, 5).map(s => (
                        <div key={s.crop} className="crop-item"><span className="ci-name">{s.crop}</span><div className="ci-bar"><div className="ci-fill" style={{ width: `${s.score}%` }} /></div><span className="ci-score">{s.score.toFixed(0)}점</span></div>))}</div>
                    <div className="sb"><h4>🔧 개량 권장사항</h4>{result.amendments.map((a, i) => (
                        <div key={i} className="amend-item"><div className="amend-head"><span className="amend-name">{a.item}</span><span className="amend-amt">{a.amount}</span></div><span className="amend-reason">{a.reason}</span></div>))}</div>
                </div>

                <div className="sb"><h4>📊 토성 삼각도</h4><div className="texture-row">
                    {[{ l: '모래', v: result.texture.sand, c: 'var(--accent-amber)' }, { l: '미사', v: result.texture.silt, c: 'var(--accent-cyan)' }, { l: '점토', v: result.texture.clay, c: 'var(--accent-rose)' }].map(t => (
                        <div key={t.l} className="tex-item"><span className="tex-label">{t.l}</span><div className="tex-bar"><div className="tex-fill" style={{ width: `${t.v}%`, background: t.c }} /></div><span className="tex-pct">{t.v}%</span></div>
                    ))}</div>
                </div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .soil-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-sm)}.opt-btn{padding:var(--space-md);background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);font-size:12px;cursor:pointer;transition:all var(--transition-fast);font-family:inherit;color:inherit;text-align:center}.opt-btn:hover{border-color:var(--border-medium)}.opt-btn.active{border-color:var(--accent-emerald);background:var(--accent-emerald-dim)}
        .sg{margin:var(--space-sm) 0}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-emerald)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-emerald);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-emerald);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}
        .health-bar{display:flex;align-items:center;gap:var(--space-md);padding:var(--space-lg);background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);margin-bottom:var(--space-xl);font-size:14px;font-weight:600}
        .hb-track{flex:1;height:10px;background:var(--bg-glass-strong);border-radius:5px;overflow:hidden}.hb-fill{height:100%;border-radius:5px;transition:width 1s ease-out}.hb-val{font-family:var(--font-mono);font-size:16px;font-weight:800}
        .stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:16px;font-weight:700}
        .section-row{display:grid;grid-template-columns:1fr 1fr;gap:var(--space-xl);margin-bottom:var(--space-xl)}
        .sb{margin-bottom:var(--space-lg)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .crop-item{display:flex;align-items:center;gap:var(--space-sm);margin-bottom:6px;font-size:13px}
        .ci-name{min-width:70px;font-weight:600}.ci-bar{flex:1;height:8px;background:var(--bg-glass-strong);border-radius:4px;overflow:hidden}.ci-fill{height:100%;background:var(--accent-emerald);border-radius:4px;transition:width 1s ease-out}.ci-score{font-family:var(--font-mono);font-size:12px;color:var(--text-tertiary);min-width:35px;text-align:right}
        .amend-item{padding:10px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:6px}
        .amend-head{display:flex;justify-content:space-between;margin-bottom:4px}.amend-name{font-weight:600;font-size:13px}.amend-amt{font-family:var(--font-mono);font-size:12px;color:var(--accent-amber)}.amend-reason{font-size:12px;color:var(--text-tertiary)}
        .texture-row{display:flex;flex-direction:column;gap:8px;padding:var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm)}
        .tex-item{display:flex;align-items:center;gap:var(--space-sm);font-size:13px}.tex-label{min-width:40px;font-weight:600}.tex-bar{flex:1;height:8px;background:var(--bg-glass-strong);border-radius:4px;overflow:hidden}.tex-fill{height:100%;border-radius:4px;transition:width 1s ease-out}.tex-pct{font-family:var(--font-mono);font-size:12px;min-width:35px;text-align:right}
        @media(max-width:768px){.stat-row{grid-template-columns:repeat(2,1fr)}.section-row{grid-template-columns:1fr}}
      `}</style>
        </div>
    );
}
