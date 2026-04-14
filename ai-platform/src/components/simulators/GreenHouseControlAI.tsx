'use client';
import { useState } from 'react';
export default function GreenHouseControlAI() {
    const [crop, setCrop] = useState<'tomato' | 'strawberry' | 'paprika' | 'cucumber'>('tomato');
    const [season, setSeason] = useState<'spring' | 'summer' | 'fall' | 'winter'>('spring');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { targetTemp: number; targetHumidity: number; co2: number; light: number; ventilation: string; heating: string; energyCost: number; hourlyTemp: number[]; hourlyHumid: number[]; alerts: { type: string; msg: string }[] }>(null);
    const optimize = () => {
        setLoading(true); setTimeout(() => {
            const temps: Record<string, [number, number]> = { tomato: [22, 28], strawberry: [18, 25], paprika: [24, 30], cucumber: [20, 28] };
            const t = temps[crop]; const sBase = season === 'summer' ? 5 : season === 'winter' ? -8 : 0;
            setResult({
                targetTemp: (t[0] + t[1]) / 2, targetHumidity: crop === 'strawberry' ? 60 : 70, co2: 800 + Math.random() * 400, light: crop === 'tomato' ? 30000 : 20000 + Math.random() * 10000,
                ventilation: season === 'summer' ? '전량 환기 (측창+천창)' : '미세 환기 (천창 10%)', heating: season === 'winter' ? '온풍 난방 + 지중 가온' : '불필요',
                energyCost: season === 'winter' ? 350 + Math.random() * 100 : season === 'summer' ? 120 + Math.random() * 50 : 80 + Math.random() * 40,
                hourlyTemp: Array.from({ length: 24 }, (_, i) => (t[0] + t[1]) / 2 + Math.sin((i - 6) * Math.PI / 12) * 4 + sBase * 0.3 + Math.random() * 2),
                hourlyHumid: Array.from({ length: 24 }, (_, i) => 65 + Math.sin((i - 14) * Math.PI / 12) * 15 + Math.random() * 5),
                alerts: season === 'summer' ? [{ type: '⚠️', msg: '고온 주의: 차광막 작동 필요 (13~15시)' }, { type: '💧', msg: '미스트 분무 권장 (14시)' }] : season === 'winter' ? [{ type: '🌡️', msg: '야간 보온 커튼 점검 (18시)' }, { type: '⛽', msg: '난방유 잔량 확인' }] : [],
            }); setLoading(false);
        }, 1800);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">🏠 스마트 온실 제어</h3>
            <div className="form-section"><span className="fl">재배 작물</span><div className="pill-row">{(['tomato', 'strawberry', 'paprika', 'cucumber'] as const).map(c => (<button key={c} className={`pill ${crop === c ? 'active' : ''}`} onClick={() => { setCrop(c); setResult(null); }}>{c === 'tomato' ? '🍅 토마토' : c === 'strawberry' ? '🍓 딸기' : c === 'paprika' ? '🫑 파프리카' : '🥒 오이'}</button>))}</div></div>
            <div className="form-section"><span className="fl">계절</span><div className="pill-row">{(['spring', 'summer', 'fall', 'winter'] as const).map(s => (<button key={s} className={`pill ${season === s ? 'active' : ''}`} onClick={() => { setSeason(s); setResult(null); }}>{s === 'spring' ? '🌸 봄' : s === 'summer' ? '☀️ 여름' : s === 'fall' ? '🍂 가을' : '❄️ 겨울'}</button>))}</div></div>
            <button className="btn btn-primary run-btn" onClick={optimize} disabled={loading}>{loading ? '최적화 중...' : '🏠 온실 환경 최적화 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>온실 환경을 최적화 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                {result.alerts.length > 0 && <div className="alerts-box">{result.alerts.map((a, i) => (<div key={i} className="alert-item">{a.type} {a.msg}</div>))}</div>}
                <div className="stat-row">
                    <div className="sc"><span className="sl">목표 온도</span><span className="sv2" style={{ color: 'var(--accent-rose)' }}>{result.targetTemp.toFixed(0)}°C</span></div>
                    <div className="sc"><span className="sl">목표 습도</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.targetHumidity}%</span></div>
                    <div className="sc"><span className="sl">CO₂ 농도</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.co2.toFixed(0)} ppm</span></div>
                    <div className="sc"><span className="sl">광량</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{(result.light / 1000).toFixed(0)}k lux</span></div>
                </div>
                <div className="ctrl-row">
                    <div className="ctrl-card"><span className="ctrl-icon">🌬️</span><span className="ctrl-label">환기</span><span className="ctrl-val">{result.ventilation}</span></div>
                    <div className="ctrl-card"><span className="ctrl-icon">🔥</span><span className="ctrl-label">난방</span><span className="ctrl-val">{result.heating}</span></div>
                    <div className="ctrl-card"><span className="ctrl-icon">💰</span><span className="ctrl-label">일 에너지 비용</span><span className="ctrl-val">₩{result.energyCost.toFixed(0)}천</span></div>
                </div>
                <div className="sb"><h4>📊 24시간 온도/습도 추이</h4><svg viewBox="0 0 400 80" className="env-svg">
                    <polyline fill="none" stroke="var(--accent-rose)" strokeWidth="1.5" points={result.hourlyTemp.map((v, i) => `${(i / 23) * 390 + 5},${75 - (v - 10) * 2.5}`).join(' ')} />
                    <polyline fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeDasharray="4" points={result.hourlyHumid.map((v, i) => `${(i / 23) * 390 + 5},${75 - (v - 40) * 1.5}`).join(' ')} />
                    <text x="380" y="15" fill="var(--accent-rose)" fontSize="7">온도</text><text x="380" y="25" fill="var(--accent-cyan)" fontSize="7">습도</text>
                </svg></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .form-section{margin-bottom:var(--space-sm)}.fl{font-size:13px;font-weight:500;display:block;margin-bottom:8px}
        .pill-row{display:flex;flex-wrap:wrap;gap:6px}.pill{padding:6px 12px;font-size:11px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-emerald-dim);border-color:var(--accent-emerald);color:var(--accent-emerald)}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-emerald);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}
        .alerts-box{margin-bottom:var(--space-xl);display:flex;flex-direction:column;gap:4px}.alert-item{padding:10px var(--space-md);background:var(--accent-amber-dim);border:1px solid rgba(255,196,0,.2);border-radius:var(--radius-sm);font-size:13px;color:var(--accent-amber)}
        .stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:16px;font-weight:700}
        .ctrl-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .ctrl-card{padding:var(--space-md);background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);text-align:center}
        .ctrl-icon{font-size:24px;display:block;margin-bottom:6px}.ctrl-label{font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:4px}.ctrl-val{font-size:12px;font-weight:600;color:var(--text-secondary)}
        .sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}.env-svg{width:100%;height:80px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:4px}
        @media(max-width:640px){.stat-row,.ctrl-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
