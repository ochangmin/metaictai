'use client';
import { useState } from 'react';
const methods = ['점적 관수', '스프링클러', '표면 관수', '지중 관수'];
export default function IrrigationOptimizerAI() {
    const [method, setMethod] = useState(0); const [area, setArea] = useState(5); const [cropType, setCropType] = useState<'rice' | 'vegetable' | 'fruit'>('vegetable');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { dailyWater: number; efficiency: number; savings: number; monthlyCost: number; schedule: { time: string; duration: string; zone: string }[]; weeklyForecast: { day: string; rain: number; irrigation: number }[]; soilMoisture: number[] }>(null);
    const optimize = () => {
        setLoading(true); setTimeout(() => {
            const eff = [92, 75, 50, 88][method]; const baseWater = cropType === 'rice' ? 12 : cropType === 'fruit' ? 6 : 4;
            setResult({
                dailyWater: baseWater * area * (100 / eff) + Math.random() * area, efficiency: eff + Math.random() * 5, savings: (eff - 50) * area * 0.5 + Math.random() * 10,
                monthlyCost: baseWater * area * 30 * 0.5 * (100 / eff) + Math.random() * 50,
                schedule: [{ time: '06:00', duration: '20분', zone: 'A구역 (남측)' }, { time: '18:00', duration: '15분', zone: 'B구역 (북측)' }, { time: '07:00', duration: '25분', zone: 'C구역 (동측)' }],
                weeklyForecast: ['월', '화', '수', '목', '금', '토', '일'].map(d => ({ day: d, rain: Math.random() * 15, irrigation: Math.max(0, baseWater - Math.random() * 8) })),
                soilMoisture: Array.from({ length: 24 }, (_, i) => 30 + Math.sin(i * 0.3) * 15 + Math.random() * 5),
            }); setLoading(false);
        }, 1800);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">💧 관수 설정</h3>
            <div className="form-section"><span className="fl">관수 방식</span><div className="pill-row">{methods.map((m, i) => (<button key={i} className={`pill ${method === i ? 'active' : ''}`} onClick={() => { setMethod(i); setResult(null); }}>💧 {m}</button>))}</div></div>
            <div className="form-section"><span className="fl">작물 유형</span><div className="pill-row">{(['rice', 'vegetable', 'fruit'] as const).map(c => (<button key={c} className={`pill ${cropType === c ? 'active' : ''}`} onClick={() => { setCropType(c); setResult(null); }}>{c === 'rice' ? '🌾 수도작' : c === 'vegetable' ? '🥬 채소류' : '🍎 과수류'}</button>))}</div></div>
            <div className="sg"><div className="sh"><span>관리 면적</span><span className="sv">{area} ha</span></div><input type="range" className="slider" min={0.5} max={50} step={0.5} value={area} onChange={e => { setArea(parseFloat(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={optimize} disabled={loading}>{loading ? '최적화 중...' : '💧 관수 최적화 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>관수 스케줄을 최적화 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">일 필요량</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.dailyWater.toFixed(1)} m³</span></div>
                    <div className="sc"><span className="sl">관수 효율</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.efficiency.toFixed(0)}%</span></div>
                    <div className="sc"><span className="sl">월 절감액</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>₩{result.savings.toFixed(0)}만</span></div>
                    <div className="sc"><span className="sl">월 비용</span><span className="sv2" style={{ color: 'var(--accent-rose)' }}>₩{result.monthlyCost.toFixed(0)}만</span></div>
                </div>
                <div className="sb"><h4>📅 최적 관수 스케줄</h4>{result.schedule.map((s, i) => (
                    <div key={i} className="sched-item"><span className="sched-time">{s.time}</span><span className="sched-dur">{s.duration}</span><span className="sched-zone">{s.zone}</span></div>))}</div>
                <div className="sb"><h4>🌧️ 주간 수분 예측</h4><div className="forecast">{result.weeklyForecast.map(f => (
                    <div key={f.day} className="fc-col"><div className="fc-bars"><div className="fc-rain" style={{ height: `${f.rain * 3 + 2}px` }} /><div className="fc-irr" style={{ height: `${f.irrigation * 5 + 2}px` }} /></div><span className="fc-day">{f.day}</span></div>))}</div>
                    <div className="legend"><span className="lg-rain">🔵 강우</span><span className="lg-irr">🟢 관수</span></div></div>
                <div className="sb"><h4>💦 24시간 토양 수분</h4><svg viewBox="0 0 400 60" className="moisture-svg">
                    <line x1="0" y1="30" x2="400" y2="30" stroke="var(--border-subtle)" strokeDasharray="4" strokeWidth="0.5" />
                    <polyline fill="none" stroke="var(--accent-cyan)" strokeWidth="2" points={result.soilMoisture.map((v, i) => `${(i / 23) * 390 + 5},${55 - v}`).join(' ')} /></svg></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .form-section{margin-bottom:var(--space-sm)}.fl{font-size:13px;font-weight:500;display:block;margin-bottom:8px}
        .pill-row{display:flex;flex-wrap:wrap;gap:6px}.pill{padding:6px 12px;font-size:11px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-cyan-dim);border-color:var(--accent-cyan);color:var(--accent-cyan)}
        .sg{margin:var(--space-sm) 0}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-cyan)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-cyan);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-cyan);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:16px;font-weight:700}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .sched-item{display:flex;align-items:center;gap:var(--space-md);padding:10px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:4px;font-size:13px}
        .sched-time{font-family:var(--font-mono);font-weight:700;color:var(--accent-cyan);min-width:50px}.sched-dur{font-weight:600;min-width:50px}.sched-zone{color:var(--text-secondary)}
        .forecast{display:flex;align-items:flex-end;gap:6px;height:70px;padding:var(--space-sm);background:var(--bg-glass);border-radius:var(--radius-sm)}.fc-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px}
        .fc-bars{display:flex;gap:2px;align-items:flex-end}.fc-rain{width:10px;background:var(--accent-blue);border-radius:2px 2px 0 0;opacity:.7}.fc-irr{width:10px;background:var(--accent-emerald);border-radius:2px 2px 0 0}
        .fc-day{font-size:10px;color:var(--text-tertiary)}.legend{display:flex;gap:var(--space-md);margin-top:6px;font-size:11px;color:var(--text-tertiary)}
        .moisture-svg{width:100%;height:60px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:4px}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
