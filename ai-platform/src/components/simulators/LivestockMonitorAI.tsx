'use client';
import { useState } from 'react';
const livestock = ['🐄 한우', '🐷 돼지', '🐔 닭 (산란계)', '🐑 양'];
export default function LivestockMonitorAI() {
    const [type, setType] = useState(0); const [headCount, setHeadCount] = useState(50);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { avgWeight: number; feedPerDay: number; waterPerDay: number; healthScore: number; mortality: number; dailyCost: number; growth: number[]; alerts: { type: string; msg: string }[]; vaccineSchedule: { name: string; nextDate: string; status: string }[] }>(null);
    const monitor = () => {
        setLoading(true); setTimeout(() => {
            const weights = [650, 110, 2.2, 60][type]; const feed = [12, 3.5, 0.12, 2][type]; const water = [50, 12, 0.3, 8][type];
            setResult({
                avgWeight: weights + Math.random() * weights * 0.1, feedPerDay: feed * headCount, waterPerDay: water * headCount,
                healthScore: 85 + Math.random() * 12, mortality: 0.5 + Math.random() * 1.5, dailyCost: feed * headCount * 0.5 + Math.random() * headCount * 0.2,
                growth: Array.from({ length: 12 }, (_, i) => weights * (0.3 + (i / 12) * 0.7) + Math.random() * weights * 0.05),
                alerts: Math.random() > 0.5 ? [{ type: '⚠️', msg: `제${Math.floor(Math.random() * 5 + 1)}축사 환기 점검 필요` }, { type: '🌡️', msg: '기온 상승으로 급수량 증가 권장' }] : [{ type: '✅', msg: '현재 이상 징후 없음' }],
                vaccineSchedule: type === 0 ? [{ name: '구제역 백신', nextDate: '2026-05-15', status: '예정' }, { name: '브루셀라 검사', nextDate: '2026-04-20', status: '임박' }]
                    : type === 1 ? [{ name: '돼지열병 백신', nextDate: '2026-04-25', status: '예정' }, { name: '구제역 백신', nextDate: '2026-05-01', status: '예정' }]
                        : [{ name: 'AI(조류인플루엔자) 백신', nextDate: '2026-04-18', status: '임박' }, { name: '뉴캐슬병 백신', nextDate: '2026-05-10', status: '예정' }],
            }); setLoading(false);
        }, 1800);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">🐄 축산 모니터링</h3>
            <div className="form-section"><span className="fl">축종</span><div className="pill-row">{livestock.map((l, i) => (<button key={i} className={`pill ${type === i ? 'active' : ''}`} onClick={() => { setType(i); setResult(null); }}>{l}</button>))}</div></div>
            <div className="sg"><div className="sh"><span>사육 두수</span><span className="sv">{headCount}두</span></div><input type="range" className="slider" min={10} max={500} step={10} value={headCount} onChange={e => { setHeadCount(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={monitor} disabled={loading}>{loading ? '분석 중...' : '🐄 축산 AI 분석 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>축산 데이터를 분석 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                {result.alerts.map((a, i) => (<div key={i} className={`alert-item ${a.type === '✅' ? 'ok' : 'warn'}`}>{a.type} {a.msg}</div>))}
                <div className="stat-row">
                    <div className="sc"><span className="sl">평균 체중</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.avgWeight.toFixed(1)} kg</span></div>
                    <div className="sc"><span className="sl">일 사료량</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.feedPerDay.toFixed(0)} kg</span></div>
                    <div className="sc"><span className="sl">일 급수량</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.waterPerDay.toFixed(0)} L</span></div>
                    <div className="sc"><span className="sl">건강도</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.healthScore.toFixed(0)}점</span></div>
                    <div className="sc"><span className="sl">폐사율</span><span className="sv2" style={{ color: result.mortality > 1 ? 'var(--accent-rose)' : 'var(--accent-emerald)' }}>{result.mortality.toFixed(1)}%</span></div>
                    <div className="sc"><span className="sl">일 사료비</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>₩{result.dailyCost.toFixed(0)}만</span></div>
                </div>
                <div className="sb"><h4>📈 성장 곡선</h4><svg viewBox="0 0 400 80" className="growth-svg">
                    <polyline fill="none" stroke="var(--accent-emerald)" strokeWidth="2" points={result.growth.map((v, i) => `${(i / 11) * 390 + 5},${75 - (v / result.growth[11]) * 65}`).join(' ')} />
                    {result.growth.map((v, i) => (<circle key={i} cx={(i / 11) * 390 + 5} cy={75 - (v / result.growth[11]) * 65} r="2" fill="var(--accent-emerald)" />))}
                </svg></div>
                <div className="sb"><h4>💉 예방접종 일정</h4>{result.vaccineSchedule.map((v, i) => (
                    <div key={i} className="vac-item"><span className="vac-name">{v.name}</span><span className="vac-date">{v.nextDate}</span><span className={`vac-status ${v.status === '임박' ? 'urgent' : 'planned'}`}>{v.status}</span></div>))}</div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .form-section{margin-bottom:var(--space-sm)}.fl{font-size:13px;font-weight:500;display:block;margin-bottom:8px}
        .pill-row{display:flex;flex-wrap:wrap;gap:6px}.pill{padding:6px 12px;font-size:11px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-amber-dim);border-color:var(--accent-amber);color:var(--accent-amber)}
        .sg{margin:var(--space-sm) 0}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-amber)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-amber);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-amber);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}
        .alert-item{padding:10px var(--space-md);border-radius:var(--radius-sm);font-size:13px;margin-bottom:4px}.alert-item.warn{background:var(--accent-amber-dim);border:1px solid rgba(255,196,0,.2);color:var(--accent-amber)}.alert-item.ok{background:var(--accent-emerald-dim);border:1px solid rgba(0,230,118,.2);color:var(--accent-emerald)}
        .stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin:var(--space-xl) 0}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:10px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:16px;font-weight:700}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .growth-svg{width:100%;height:80px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:4px}
        .vac-item{display:flex;align-items:center;gap:var(--space-md);padding:10px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:4px;font-size:13px}
        .vac-name{font-weight:600;flex:1}.vac-date{font-family:var(--font-mono);font-size:12px;color:var(--text-tertiary)}.vac-status{padding:3px 8px;border-radius:var(--radius-full);font-size:10px;font-weight:600}.urgent{background:var(--accent-rose-dim);color:var(--accent-rose)}.planned{background:var(--accent-cyan-dim);color:var(--accent-cyan)}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
