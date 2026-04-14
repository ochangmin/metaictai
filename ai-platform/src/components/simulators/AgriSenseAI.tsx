'use client';
import { useState } from 'react';
const crops = ['🌾 벼', '🌽 옥수수', '🥔 감자', '🍎 사과'];
export default function AgriSenseAI() {
    const [crop, setCrop] = useState(0); const [temp, setTemp] = useState(25); const [rain, setRain] = useState(800);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { yield: number; quality: string; optimalHarvest: string; soilHealth: number; waterNeed: number; monthlyGrowth: number[] }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            setResult({
                yield: (5 + crop * 2 + Math.random() * 3) * (1 - Math.abs(temp - 22) * 0.02), quality: temp > 15 && temp < 30 && rain > 600 ? '우수' : rain < 400 ? '불량' : '보통',
                optimalHarvest: ['10월 중순', '9월 하순', '8월 상순', '10월 상순'][crop], soilHealth: 60 + Math.random() * 30, waterNeed: rain * 0.7 + Math.random() * 100,
                monthlyGrowth: Array.from({ length: 12 }, (_, i) => Math.max(0, Math.sin((i - 2) * Math.PI / 5) * 80 + Math.random() * 20))
            }); setLoading(false);
        }, 1600);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">작물 & 환경 설정</h3>
            <div className="crop-row">{crops.map((c, i) => (<button key={i} className={`pill ${crop === i ? 'active' : ''}`} onClick={() => { setCrop(i); setResult(null); }}>{c}</button>))}</div>
            <div className="sg"><div className="sh"><span>평균 기온</span><span className="sv">{temp}°C</span></div><input type="range" className="slider" min={-5} max={40} value={temp} onChange={e => { setTemp(parseInt(e.target.value)); setResult(null); }} /></div>
            <div className="sg"><div className="sh"><span>연 강수량</span><span className="sv">{rain}mm</span></div><input type="range" className="slider" min={200} max={2000} step={50} value={rain} onChange={e => { setRain(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '분석 중...' : '🌱 수확 예측 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>농업 데이터를 분석 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">예상 수확량</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.yield.toFixed(1)} t/ha</span></div>
                    <div className="sc"><span className="sl">품질 등급</span><span className={`sv2 q-${result.quality}`}>{result.quality}</span></div>
                    <div className="sc"><span className="sl">최적 수확 시기</span><span className="sv2" style={{ color: 'var(--accent-cyan)', fontSize: '14px' }}>{result.optimalHarvest}</span></div>
                    <div className="sc"><span className="sl">토양 건강도</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.soilHealth.toFixed(0)}%</span></div>
                </div>
                <div className="sb"><h4>📊 월별 생장 곡선</h4><div className="growth-chart">{result.monthlyGrowth.map((v, i) => (<div key={i} className="gcol"><div className="gbar" style={{ height: `${v * 0.6 + 2}px` }} /><span>{i + 1}월</span></div>))}</div></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .crop-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:var(--space-sm)}.pill{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-emerald-dim);border-color:var(--accent-emerald);color:var(--accent-emerald)}
        .sg{margin-bottom:var(--space-md)}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-emerald)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-emerald);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-emerald);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:18px;font-weight:700}
        .q-우수{color:var(--accent-emerald)}.q-보통{color:var(--accent-amber)}.q-불량{color:var(--accent-rose)}
        .sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .growth-chart{display:flex;align-items:flex-end;gap:4px;height:80px;padding:var(--space-sm);background:var(--bg-glass);border-radius:var(--radius-sm)}
        .gcol{flex:1;display:flex;flex-direction:column;align-items:center}.gbar{width:100%;max-width:20px;background:var(--gradient-emerald);border-radius:2px 2px 0 0;min-height:2px}.gcol span{font-size:8px;color:var(--text-tertiary);margin-top:2px}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
