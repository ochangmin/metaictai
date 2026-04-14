'use client';
import { useState } from 'react';
const crops = ['🌾 벼', '🥬 배추', '🍎 사과', '🍇 포도', '🌶️ 고추', '🧅 양파'];
export default function HarvestSchedulerAI() {
    const [crop, setCrop] = useState(0); const [plantDate, setPlantDate] = useState('2026-04-15'); const [area, setArea] = useState(3);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { harvestStart: string; harvestEnd: string; peakDate: string; growingDays: number; estimatedYield: number; tasks: { week: string; task: string; priority: string }[]; laborNeeded: number; maturityIndex: number }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const days = [120, 60, 180, 150, 90, 150][crop]; const yieldPerHa = [6.5, 8, 3, 2.5, 2, 6][crop];
            const start = new Date(plantDate); start.setDate(start.getDate() + days);
            const end = new Date(start); end.setDate(end.getDate() + 14);
            const peak = new Date(start); peak.setDate(peak.getDate() + 7);
            setResult({
                harvestStart: start.toLocaleDateString('ko-KR'), harvestEnd: end.toLocaleDateString('ko-KR'), peakDate: peak.toLocaleDateString('ko-KR'),
                growingDays: days, estimatedYield: yieldPerHa * area + Math.random() * area * 0.5, laborNeeded: Math.ceil(area * ([3, 4, 2, 3, 5, 3][crop])),
                maturityIndex: 85 + Math.random() * 12,
                tasks: [
                    { week: `D-21`, task: '수확 전 최종 약제 살포 (안전사용기준 확인)', priority: '높음' },
                    { week: `D-14`, task: '수확 장비 점검 및 인력 배치 계획', priority: '보통' },
                    { week: `D-7`, task: '성숙도 측정 (당도/경도 검사)', priority: '높음' },
                    { week: 'D-3', task: '출하처 사전 연락 및 포장재 준비', priority: '높음' },
                    { week: 'D-Day', task: '수확 실시 (오전 이슬 마른 후)', priority: '최상' },
                    { week: 'D+1', task: '선별 및 등급 분류, 저온 예냉', priority: '높음' },
                ],
            }); setLoading(false);
        }, 1800);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">📅 수확 일정 계획</h3>
            <div className="form-section"><span className="fl">작물</span><div className="pill-row">{crops.map((c, i) => (<button key={i} className={`pill ${crop === i ? 'active' : ''}`} onClick={() => { setCrop(i); setResult(null); }}>{c}</button>))}</div></div>
            <div className="form-section"><span className="fl">정식/파종일</span><input type="date" className="input-field" value={plantDate} onChange={e => { setPlantDate(e.target.value); setResult(null); }} /></div>
            <div className="sg"><div className="sh"><span>재배 면적</span><span className="sv">{area} ha</span></div><input type="range" className="slider" min={0.5} max={20} step={0.5} value={area} onChange={e => { setArea(parseFloat(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '계산 중...' : '📅 수확 일정 계획 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>생육 데이터를 기반으로 수확 일정을 계획 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="harvest-banner"><span className="hb-icon">🌾</span><div><span className="hb-label">최적 수확일</span><span className="hb-date">{result.peakDate}</span></div></div>
                <div className="stat-row">
                    <div className="sc"><span className="sl">수확 개시</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.harvestStart}</span></div>
                    <div className="sc"><span className="sl">수확 종료</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.harvestEnd}</span></div>
                    <div className="sc"><span className="sl">재배 기간</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.growingDays}일</span></div>
                    <div className="sc"><span className="sl">예상 수확량</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.estimatedYield.toFixed(1)} ton</span></div>
                    <div className="sc"><span className="sl">필요 인력</span><span className="sv2" style={{ color: 'var(--accent-purple)' }}>{result.laborNeeded}명</span></div>
                    <div className="sc"><span className="sl">성숙도</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.maturityIndex.toFixed(0)}%</span></div>
                </div>
                <div className="sb"><h4>📋 수확 작업 체크리스트</h4>{result.tasks.map((t, i) => (
                    <div key={i} className="task-item"><span className={`task-week ${t.week === 'D-Day' ? 'today' : ''}`}>{t.week}</span><span className="task-desc">{t.task}</span><span className={`task-pri pri-${t.priority}`}>{t.priority}</span></div>))}</div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .form-section{margin-bottom:var(--space-sm)}.fl{font-size:13px;font-weight:500;display:block;margin-bottom:8px}
        .pill-row{display:flex;flex-wrap:wrap;gap:6px}.pill{padding:6px 12px;font-size:11px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-amber-dim);border-color:var(--accent-amber);color:var(--accent-amber)}
        .sg{margin:var(--space-sm) 0}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-amber)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-amber);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-amber);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}
        .harvest-banner{display:flex;align-items:center;gap:var(--space-md);padding:var(--space-lg);background:var(--accent-emerald-dim);border:1px solid rgba(0,230,118,.2);border-radius:var(--radius-md);margin-bottom:var(--space-xl)}.hb-icon{font-size:36px}.hb-label{display:block;font-size:12px;color:var(--text-tertiary)}.hb-date{font-size:24px;font-weight:800;color:var(--accent-emerald)}
        .stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:10px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:14px;font-weight:700}
        .sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .task-item{display:flex;align-items:center;gap:var(--space-md);padding:10px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:4px;font-size:13px}
        .task-week{font-family:var(--font-mono);font-weight:700;min-width:45px;font-size:12px;color:var(--text-tertiary)}.task-week.today{color:var(--accent-rose);font-size:14px}.task-desc{flex:1;color:var(--text-secondary)}
        .task-pri{padding:3px 8px;border-radius:var(--radius-full);font-size:10px;font-weight:600;flex-shrink:0}.pri-최상{background:var(--accent-rose-dim);color:var(--accent-rose)}.pri-높음{background:var(--accent-amber-dim);color:var(--accent-amber)}.pri-보통{background:var(--accent-cyan-dim);color:var(--accent-cyan)}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
