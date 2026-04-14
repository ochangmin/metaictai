'use client';
import { useState } from 'react';
const events = ['🌧️ 장마 (집중호우)', '🥵 폭염', '❄️ 한파/냉해', '🌪️ 태풍', '☀️ 가뭄'];
const crops = ['🌾 벼', '🥬 채소', '🍎 과수', '🌶️ 시설원예'];
export default function WeatherCropImpactAI() {
    const [event, setEvent] = useState(0); const [crop, setCrop] = useState(0); const [intensity, setIntensity] = useState(3);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { yieldLoss: number; qualityImpact: number; recoveryDays: number; economicDamage: number; timeline: { day: string; impact: string; action: string }[]; mitigations: { strategy: string; effectiveness: number; cost: string }[] }>(null);
    const assess = () => {
        setLoading(true); setTimeout(() => {
            const base = [[25, 30, 20, 35, 15], [30, 40, 35, 25, 20], [20, 25, 45, 40, 25], [15, 20, 30, 20, 10]][crop];
            const loss = base[event] * (intensity / 3) + Math.random() * 10;
            setResult({
                yieldLoss: Math.min(95, loss), qualityImpact: Math.min(90, loss * 0.8 + Math.random() * 10),
                recoveryDays: intensity * [7, 14, 21, 10, 30][event] + Math.floor(Math.random() * 10),
                economicDamage: loss * intensity * 50 + Math.random() * 200,
                timeline: [
                    { day: 'D-3', impact: '기상특보 발령', action: '사전 대비 조치 시작' },
                    {
                        day: 'D-Day', impact: event === 0 ? '침수 피해 발생' : event === 1 ? '고온 스트레스' : event === 2 ? '동해 발생' : event === 3 ? '물리적 피해' : '수분 스트레스',
                        action: event === 0 ? '배수로 점검 및 양수기 가동' : event === 1 ? '차광막/미스트 작동' : event === 2 ? '보온 자재 피복' : event === 3 ? '시설 보강' : '긴급 관수'
                    },
                    { day: 'D+3', impact: '2차 피해 (병해 증가)', action: '예방 약제 살포' },
                    { day: 'D+7', impact: '피해 조사 실시', action: '재해보험 청구 및 복구 계획' },
                ],
                mitigations: [
                    {
                        strategy: event === 0 ? '배수 시설 보강' : event === 1 ? '차광막 설치' : event === 2 ? '보온 피복' : event === 3 ? '방풍시설 보강' : '관수 시설 확충',
                        effectiveness: 70 + Math.random() * 20, cost: '₩500만/ha'
                    },
                    { strategy: '재해보험 가입', effectiveness: 60 + Math.random() * 15, cost: '₩50만/년' },
                    { strategy: '내재해성 품종 재배', effectiveness: 55 + Math.random() * 20, cost: '동일' },
                ],
            }); setLoading(false);
        }, 2000);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">🌦️ 기상 재해 영향 평가</h3>
            <div className="form-section"><span className="fl">기상 이벤트</span><div className="event-grid">{events.map((e, i) => (<button key={i} className={`evt-btn ${event === i ? 'active' : ''}`} onClick={() => { setEvent(i); setResult(null); }}>{e}</button>))}</div></div>
            <div className="form-section"><span className="fl">대상 작물</span><div className="pill-row">{crops.map((c, i) => (<button key={i} className={`pill ${crop === i ? 'active' : ''}`} onClick={() => { setCrop(i); setResult(null); }}>{c}</button>))}</div></div>
            <div className="sg"><div className="sh"><span>재해 강도</span><span className="sv">{'🔴'.repeat(intensity)} (레벨 {intensity})</span></div><input type="range" className="slider" min={1} max={5} value={intensity} onChange={e => { setIntensity(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={assess} disabled={loading}>{loading ? '평가 중...' : '🌦️ 재해 영향 평가 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>기상 재해가 작물에 미치는 영향을 분석 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">수확량 피해</span><span className="sv2" style={{ color: 'var(--accent-rose)' }}>-{result.yieldLoss.toFixed(0)}%</span></div>
                    <div className="sc"><span className="sl">품질 저하</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>-{result.qualityImpact.toFixed(0)}%</span></div>
                    <div className="sc"><span className="sl">회복 기간</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.recoveryDays}일</span></div>
                    <div className="sc"><span className="sl">경제적 피해</span><span className="sv2" style={{ color: 'var(--accent-rose)' }}>₩{result.economicDamage.toFixed(0)}만/ha</span></div>
                </div>
                <div className="sb"><h4>📅 재해 대응 타임라인</h4>{result.timeline.map((t, i) => (
                    <div key={i} className="tl-item"><span className={`tl-day ${t.day === 'D-Day' ? 'dday' : ''}`}>{t.day}</span><div className="tl-content"><span className="tl-impact">{t.impact}</span><span className="tl-action">→ {t.action}</span></div></div>))}</div>
                <div className="sb"><h4>🛡️ 피해 경감 전략</h4>{result.mitigations.map((m, i) => (
                    <div key={i} className="mit-item"><div className="mit-head"><span className="mit-name">{m.strategy}</span><span className="mit-cost">{m.cost}</span></div><div className="mit-bar"><div className="mit-fill" style={{ width: `${m.effectiveness}%` }} /></div><span className="mit-eff">효과: {m.effectiveness.toFixed(0)}%</span></div>))}</div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .form-section{margin-bottom:var(--space-sm)}.fl{font-size:13px;font-weight:500;display:block;margin-bottom:8px}
        .event-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.evt-btn{padding:10px 8px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);font-size:11px;cursor:pointer;transition:all var(--transition-fast);font-family:inherit;color:inherit;text-align:center}.evt-btn:hover{border-color:var(--border-medium)}.evt-btn.active{border-color:var(--accent-rose);background:var(--accent-rose-dim);color:var(--accent-rose)}
        .pill-row{display:flex;flex-wrap:wrap;gap:6px}.pill{padding:6px 12px;font-size:11px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-amber-dim);border-color:var(--accent-amber);color:var(--accent-amber)}
        .sg{margin:var(--space-sm) 0}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:600;font-size:12px;color:var(--accent-rose)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-rose);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-rose);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:10px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:16px;font-weight:700}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .tl-item{display:flex;gap:var(--space-md);padding:10px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:4px}
        .tl-day{font-family:var(--font-mono);font-weight:700;min-width:45px;font-size:12px;color:var(--text-tertiary)}.tl-day.dday{color:var(--accent-rose);font-size:14px}.tl-impact{font-weight:600;font-size:13px;display:block}.tl-action{font-size:12px;color:var(--accent-emerald);display:block;margin-top:2px}
        .mit-item{padding:12px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:6px}
        .mit-head{display:flex;justify-content:space-between;margin-bottom:6px}.mit-name{font-weight:600;font-size:13px}.mit-cost{font-family:var(--font-mono);font-size:12px;color:var(--accent-amber)}
        .mit-bar{height:6px;background:var(--bg-glass-strong);border-radius:3px;overflow:hidden;margin-bottom:4px}.mit-fill{height:100%;background:var(--accent-emerald);border-radius:3px;transition:width 1s ease-out}.mit-eff{font-size:12px;color:var(--text-tertiary)}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}.event-grid{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
