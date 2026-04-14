'use client';
import { useState } from 'react';
export default function PestPredictorAI() {
    const [region, setRegion] = useState<'central' | 'south' | 'east' | 'jeju'>('central');
    const [month, setMonth] = useState(6); const [temp, setTemp] = useState(25); const [humidity, setHumidity] = useState(70);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { pests: { name: string; risk: number; peak: string; target: string; control: string }[]; overallRisk: number; weeklyRisk: number[]; advisory: string }>(null);
    const predict = () => {
        setLoading(true); setTimeout(() => {
            const humFactor = humidity > 80 ? 1.3 : humidity > 60 ? 1 : 0.7; const tFactor = temp > 28 ? 1.3 : temp > 20 ? 1 : 0.6;
            setResult({
                pests: [
                    { name: '🐛 혹명나방', risk: Math.min(99, 60 * tFactor * humFactor + Math.random() * 10), peak: '6~8월', target: '벼', control: '페니트로치온 유제 1000배액 살포' },
                    { name: '🦗 벼멸구', risk: Math.min(99, 55 * tFactor + Math.random() * 15), peak: '7~9월', target: '벼', control: '디노테퓨란 입제 3kg/10a 처리' },
                    { name: '🐌 달팽이', risk: Math.min(99, 40 * humFactor + Math.random() * 10), peak: '5~7월', target: '채소 전반', control: '메타알데히드 입제 산포' },
                    { name: '🪲 꽃매미', risk: Math.min(99, 35 * tFactor + Math.random() * 15), peak: '8~10월', target: '과수', control: '에토펜프록스 유제 방제' },
                    { name: '🕷️ 점박이응애', risk: Math.min(99, 50 * tFactor * (humidity < 50 ? 1.5 : 0.8) + Math.random() * 10), peak: '6~8월', target: '딸기/과채류', control: '밀베멕틴 유제 2000배액' },
                    { name: '🦟 총채벌레', risk: Math.min(99, 45 * tFactor + Math.random() * 10), peak: '5~9월', target: '고추/파프리카', control: '스피노사드 입상수화제' },
                ].sort((a, b) => b.risk - a.risk),
                overallRisk: 50 * tFactor * humFactor + Math.random() * 10,
                weeklyRisk: Array.from({ length: 7 }, () => 40 * tFactor * humFactor + Math.random() * 20),
                advisory: temp > 28 && humidity > 75 ? '⚠️ 고온 다습 환경으로 병해충 대발생 주의보 발령' : temp > 25 ? '📌 정기 예찰 강화 및 예방 방제 권장' : '✅ 현재 병해충 위험 수준 양호',
            }); setLoading(false);
        }, 2000);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">🐛 병해충 예측</h3>
            <div className="form-section"><span className="fl">지역</span><div className="pill-row">{(['central', 'south', 'east', 'jeju'] as const).map(r => (<button key={r} className={`pill ${region === r ? 'active' : ''}`} onClick={() => { setRegion(r); setResult(null); }}>{r === 'central' ? '🏛️ 중부' : r === 'south' ? '🌴 남부' : r === 'east' ? '⛰️ 동해' : '🏝️ 제주'}</button>))}</div></div>
            <div className="sg"><div className="sh"><span>월</span><span className="sv">{month}월</span></div><input type="range" className="slider" min={1} max={12} value={month} onChange={e => { setMonth(parseInt(e.target.value)); setResult(null); }} /></div>
            <div className="sg"><div className="sh"><span>평균 기온</span><span className="sv">{temp}°C</span></div><input type="range" className="slider" min={-5} max={38} value={temp} onChange={e => { setTemp(parseInt(e.target.value)); setResult(null); }} /></div>
            <div className="sg"><div className="sh"><span>평균 습도</span><span className="sv">{humidity}%</span></div><input type="range" className="slider" min={30} max={100} value={humidity} onChange={e => { setHumidity(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={predict} disabled={loading}>{loading ? '예측 중...' : '🐛 병해충 발생 예측 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>기상 데이터를 기반으로 병해충 발생을 예측 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="advisory-box">{result.advisory}</div>
                <div className="stat-row"><div className="sc"><span className="sl">종합 위험도</span><span className="sv2" style={{ color: result.overallRisk > 70 ? 'var(--accent-rose)' : result.overallRisk > 40 ? 'var(--accent-amber)' : 'var(--accent-emerald)' }}>{result.overallRisk.toFixed(0)}%</span></div></div>
                <div className="sb"><h4>🔮 주간 위험도 추이</h4><div className="weekly-chart">{result.weeklyRisk.map((v, i) => (<div key={i} className="wk-col"><div className="wk-bar" style={{ height: `${v * 0.6 + 4}px`, background: v > 70 ? 'var(--accent-rose)' : v > 40 ? 'var(--accent-amber)' : 'var(--accent-emerald)' }} /><span>D+{i + 1}</span></div>))}</div></div>
                <div className="sb"><h4>🐛 해충별 발생 위험</h4>{result.pests.map(p => (
                    <div key={p.name} className="pest-item"><div className="pest-head"><span className="pest-name">{p.name}</span><span className="pest-risk" style={{ color: p.risk > 70 ? 'var(--accent-rose)' : p.risk > 40 ? 'var(--accent-amber)' : 'var(--accent-emerald)' }}>{p.risk.toFixed(0)}%</span></div>
                        <div className="pest-bar"><div className="pest-fill" style={{ width: `${p.risk}%`, background: p.risk > 70 ? 'var(--accent-rose)' : p.risk > 40 ? 'var(--accent-amber)' : 'var(--accent-emerald)' }} /></div>
                        <div className="pest-info"><span>최성기: {p.peak}</span><span>대상: {p.target}</span></div><div className="pest-ctrl">💊 {p.control}</div></div>))}</div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .form-section{margin-bottom:var(--space-sm)}.fl{font-size:13px;font-weight:500;display:block;margin-bottom:8px}
        .pill-row{display:flex;flex-wrap:wrap;gap:6px}.pill{padding:6px 12px;font-size:11px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-rose-dim);border-color:var(--accent-rose);color:var(--accent-rose)}
        .sg{margin-bottom:var(--space-sm)}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-rose)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-rose);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-rose);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}
        .advisory-box{padding:var(--space-md);background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);font-size:14px;font-weight:600;margin-bottom:var(--space-xl);text-align:center}
        .stat-row{display:grid;grid-template-columns:1fr;gap:var(--space-md);margin-bottom:var(--space-xl)}.sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-lg);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:28px;font-weight:800}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .weekly-chart{display:flex;align-items:flex-end;gap:6px;height:60px;padding:var(--space-sm);background:var(--bg-glass);border-radius:var(--radius-sm)}.wk-col{flex:1;display:flex;flex-direction:column;align-items:center}.wk-bar{width:100%;max-width:30px;border-radius:3px 3px 0 0;min-height:4px}.wk-col span{font-size:10px;color:var(--text-tertiary);margin-top:4px}
        .pest-item{padding:12px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:8px}
        .pest-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}.pest-name{font-weight:700;font-size:14px}.pest-risk{font-size:18px;font-weight:800;font-family:var(--font-mono)}
        .pest-bar{height:6px;background:var(--bg-glass-strong);border-radius:3px;overflow:hidden;margin-bottom:6px}.pest-fill{height:100%;border-radius:3px;transition:width 1s ease-out}
        .pest-info{display:flex;gap:var(--space-md);font-size:11px;color:var(--text-tertiary);margin-bottom:4px}.pest-ctrl{font-size:12px;color:var(--accent-emerald);border-top:1px solid var(--border-subtle);padding-top:6px;margin-top:4px}
      `}</style>
        </div>
    );
}
