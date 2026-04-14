'use client';
import { useState } from 'react';
const crops = ['🌾 벼', '🥬 배추', '🌽 옥수수', '🍅 토마토', '🍓 딸기'];
export default function FertilizerPlannerAI() {
    const [crop, setCrop] = useState(0); const [area, setArea] = useState(3); const [soilN, setSoilN] = useState(40);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { plan: { period: string; type: string; amount: string; method: string }[]; totalCost: number; npk: { n: number; p: number; k: number }; organicRatio: number; expectedYield: number; efficiency: number }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const baseN = [120, 200, 150, 180, 160][crop] - soilN; const need = Math.max(30, baseN);
            setResult({
                plan: [
                    { period: '기비 (정식 7일 전)', type: '복합비료 (15-15-15)', amount: `${(need * 0.4 * area).toFixed(0)} kg`, method: '전면 살포 후 로터리' },
                    { period: '1차 추비 (정식 20일)', type: `요소 (46-0-0)`, amount: `${(need * 0.3 * area * 0.46).toFixed(0)} kg`, method: '측조 시비 (뿌리 근처)' },
                    { period: '2차 추비 (개화기)', type: '인산가리 (0-20-20)', amount: `${(need * 0.2 * area).toFixed(0)} kg`, method: '관비 (점적관수 혼합)' },
                    { period: '엽면시비 (수시)', type: '미량원소 복합제', amount: '500배 희석', method: '엽면 살포 (7일 간격)' },
                ],
                totalCost: need * area * 2.5 + Math.random() * 50, npk: { n: need, p: need * 0.6 + Math.random() * 20, k: need * 0.8 + Math.random() * 15 },
                organicRatio: 30 + Math.random() * 20, expectedYield: [6, 8, 7, 10, 5][crop] * area * (1 + soilN / 200) + Math.random() * area, efficiency: 75 + Math.random() * 15,
            }); setLoading(false);
        }, 1800);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">🌿 시비 계획</h3>
            <div className="form-section"><span className="fl">작물</span><div className="pill-row">{crops.map((c, i) => (<button key={i} className={`pill ${crop === i ? 'active' : ''}`} onClick={() => { setCrop(i); setResult(null); }}>{c}</button>))}</div></div>
            <div className="sg"><div className="sh"><span>면적</span><span className="sv">{area} ha</span></div><input type="range" className="slider" min={0.5} max={20} step={0.5} value={area} onChange={e => { setArea(parseFloat(e.target.value)); setResult(null); }} /></div>
            <div className="sg"><div className="sh"><span>토양 질소 (현재)</span><span className="sv">{soilN} mg/kg</span></div><input type="range" className="slider" min={10} max={120} value={soilN} onChange={e => { setSoilN(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '계산 중...' : '🌿 시비 계획 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>최적 시비량을 계산 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">질소 (N)</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.npk.n.toFixed(0)} kg/ha</span></div>
                    <div className="sc"><span className="sl">인산 (P₂O₅)</span><span className="sv2" style={{ color: 'var(--accent-purple)' }}>{result.npk.p.toFixed(0)} kg/ha</span></div>
                    <div className="sc"><span className="sl">칼리 (K₂O)</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.npk.k.toFixed(0)} kg/ha</span></div>
                    <div className="sc"><span className="sl">비료 효율</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.efficiency.toFixed(0)}%</span></div>
                </div>
                <div className="sb"><h4>📋 시비 일정표</h4><div className="plan-table">
                    <div className="plan-header"><span>시기</span><span>비종</span><span>시비량</span><span>방법</span></div>
                    {result.plan.map((p, i) => (<div key={i} className="plan-row"><span className="plan-period">{p.period}</span><span>{p.type}</span><span className="plan-amt">{p.amount}</span><span className="plan-method">{p.method}</span></div>))}
                </div></div>
                <div className="info-row">
                    <div className="info-card"><span>💰 총 비료비</span><span className="info-val">₩{result.totalCost.toFixed(0)}만</span></div>
                    <div className="info-card"><span>🌱 유기질 비율</span><span className="info-val">{result.organicRatio.toFixed(0)}%</span></div>
                    <div className="info-card"><span>📈 예상 수확량</span><span className="info-val">{result.expectedYield.toFixed(1)} ton</span></div>
                </div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .form-section{margin-bottom:var(--space-sm)}.fl{font-size:13px;font-weight:500;display:block;margin-bottom:8px}
        .pill-row{display:flex;flex-wrap:wrap;gap:6px}.pill{padding:6px 12px;font-size:11px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-emerald-dim);border-color:var(--accent-emerald);color:var(--accent-emerald)}
        .sg{margin-bottom:var(--space-md)}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-emerald)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-emerald);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-emerald);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:16px;font-weight:700}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .plan-table{border:1px solid var(--border-subtle);border-radius:var(--radius-md);overflow:hidden}.plan-header,.plan-row{display:grid;grid-template-columns:1.5fr 1.5fr 1fr 1.5fr;gap:var(--space-sm);padding:10px var(--space-md);font-size:12px}
        .plan-header{background:var(--bg-glass);font-weight:700;color:var(--text-tertiary);font-size:10px;text-transform:uppercase}.plan-row{border-top:1px solid var(--border-subtle)}
        .plan-period{font-weight:600;color:var(--accent-emerald)}.plan-amt{font-family:var(--font-mono);font-weight:600}.plan-method{color:var(--text-secondary);font-size:11px}
        .info-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md)}.info-card{padding:var(--space-md);background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);text-align:center;font-size:13px}
        .info-val{display:block;font-size:18px;font-weight:700;color:var(--accent-amber);margin-top:6px}
        @media(max-width:640px){.stat-row,.info-row{grid-template-columns:repeat(2,1fr)}.plan-header,.plan-row{grid-template-columns:1fr 1fr}.plan-header span:nth-child(3),.plan-header span:nth-child(4),.plan-row span:nth-child(3),.plan-row span:nth-child(4){display:none}}
      `}</style>
        </div>
    );
}
