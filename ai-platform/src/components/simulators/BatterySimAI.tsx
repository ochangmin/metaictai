'use client';
import { useState } from 'react';

const batteryTypes = ['NCM (니켈·코발트·망간)', 'LFP (리튬인산철)', 'NCA (니켈·코발트·알루미늄)', '전고체 배터리(분석중)'];
const usagePatterns = ['가혹 환경 (고속 충방전)', '표준 환경 (도심 주행)', '저온 환경 (-10°C 이하)', '고온 환경 (40°C 이상)'];

export default function BatterySimAI() {
    const [battery, setBattery] = useState(0);
    const [pattern, setPattern] = useState(1);
    const [cycles, setCycles] = useState(500);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        soh: number;
        thermalRisk: number;
        degradationFactors: { name: string; impact: number }[];
        recommendation: string;
    }>(null);

    const simulate = () => {
        setLoading(true);
        setTimeout(() => {
            // NCM: Base SOH drop 0.02 per cycle, LFP: 0.015, NCA: 0.022, Solid: 0.005
            const cycleImpacts = [0.03, 0.015, 0.035, 0.005];
            const envMultipliers = [1.5, 1.0, 1.3, 1.8]; // Fast, Std, Cold, Hot

            const drop = (cycles * cycleImpacts[battery] * envMultipliers[pattern]) + (Math.random() * 2);
            let soh = Math.max(0, 100 - drop);

            // Thermal runaway risk
            let risk = (100 - soh) * 0.4 + (pattern === 3 ? 30 : 0) + (pattern === 0 ? 20 : 0);
            if (battery === 1) risk *= 0.3; // LFP is safer
            if (battery === 3) risk *= 0.1; // Solid is very safe

            setResult({
                soh,
                thermalRisk: Math.min(100, risk),
                degradationFactors: [
                    { name: 'SEI 피막 두께 증가 방해', impact: 40 },
                    { name: pattern === 2 ? '리튬 플레이팅(Lithium Plating) 가속' : '양극재 구조 붕괴', impact: 35 },
                    { name: '전해액 고갈(Electrolyte Depletion)', impact: 25 },
                ],
                recommendation: soh < 70 ? '모듈 교체 권장: SoH 70% 미만으로 전압 강하가 급격합니다.' :
                    pattern === 0 ? '충전 스케줄링 필요: 고속 충전 시 80% 구간에서 완속으로 전환하세요.' :
                        '배터리 온도 및 BMS 시스템 정상 범위 내 있습니다.'
            });
            setLoading(false);
        }, 1800);
    };

    return (
        <div className="sim-ui">
            <h3 className="panel-title">🔋 2차전지 열화 및 열 폭주 시뮬레이션</h3>

            <div className="form-section">
                <span className="fl">배터리 소재 (Material)</span>
                <div className="pill-row">
                    {batteryTypes.map((b, i) => (
                        <button key={i} className={`pill ${battery === i ? 'active' : ''}`} onClick={() => { setBattery(i); setResult(null); }}>
                            {b}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-section">
                <span className="fl">운용 환경 패턴 (Pattern)</span>
                <div className="pill-row">
                    {usagePatterns.map((p, i) => (
                        <button key={i} className={`pill ${pattern === i ? 'active' : ''}`} onClick={() => { setPattern(i); setResult(null); }}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className="sg">
                <div className="sh">
                    <span>예상 충방전 사이클 (Cycles)</span>
                    <span className="sv">{cycles} 회</span>
                </div>
                <input
                    type="range"
                    className="slider"
                    min="100"
                    max="3000"
                    step="100"
                    value={cycles}
                    onChange={(e) => { setCycles(parseInt(e.target.value)); setResult(null); }}
                />
            </div>

            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>
                {loading ? 'AI 분석 중...' : '🔋 배터리 수명(SoH) 및 리스크 분석 실행'}
            </button>

            {loading && (
                <div className="ld">
                    <div className="loader" />
                    <p>사이클별 열화 그래프를 시뮬레이션 중입니다...</p>
                </div>
            )}

            {result && !loading && (
                <div className="results">
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <span className="metric-label">배터리 건강 상태 (SoH)</span>
                            <div className="soh-bar">
                                <div className="soh-fill" style={{ width: `${result.soh}%`, background: result.soh > 80 ? 'var(--accent-emerald)' : result.soh > 60 ? 'var(--accent-amber)' : 'var(--accent-rose)' }}></div>
                            </div>
                            <span className="metric-val" style={{ color: result.soh > 80 ? 'var(--accent-emerald)' : result.soh > 60 ? 'var(--accent-amber)' : 'var(--accent-rose)' }}>
                                {result.soh.toFixed(1)}%
                            </span>
                        </div>
                        <div className="metric-card">
                            <span className="metric-label">열 폭주 위험도 (Risk)</span>
                            <div className="risk-indicator">
                                <span className="risk-val" style={{ color: result.thermalRisk > 50 ? 'var(--accent-rose)' : result.thermalRisk > 20 ? 'var(--accent-amber)' : 'var(--accent-emerald)' }}>
                                    {result.thermalRisk.toFixed(1)}%
                                </span>
                                {result.thermalRisk > 50 && <span className="alert-badge">🔥 경고</span>}
                            </div>
                        </div>
                    </div>

                    <div className="sb">
                        <h4>🔍 주요 열화 요인 분석</h4>
                        <div className="factors-list">
                            {result.degradationFactors.map((f, i) => (
                                <div key={i} className="factor-item">
                                    <span className="factor-name">{f.name}</span>
                                    <div className="factor-track">
                                        <div className="factor-fill" style={{ width: `${f.impact}%` }}></div>
                                    </div>
                                    <span className="factor-pct">{f.impact}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="alert-box">
                        <span className="alert-icon">💡</span>
                        <div className="alert-text">
                            <strong>BMS 권장 사항</strong>
                            <p>{result.recommendation}</p>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .sim-ui { display: flex; flex-direction: column; gap: var(--space-lg); }
                .panel-title { font-size: 16px; font-weight: 700; color: var(--accent-rose); }
                .form-section { margin-bottom: var(--space-sm); }
                .fl { font-size: 13px; font-weight: 500; display: block; margin-bottom: 8px; }
                .pill-row { display: flex; flex-wrap: wrap; gap: 6px; }
                .pill { padding: 6px 12px; font-size: 11px; border-radius: var(--radius-full); background: var(--bg-glass); border: 1px solid var(--border-subtle); color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast); }
                .pill:hover { border-color: var(--border-medium); }
                .pill.active { background: rgba(255, 82, 82, 0.1); border-color: var(--accent-rose); color: var(--accent-rose); font-weight: 600; }
                .sg { margin: var(--space-sm) 0; }
                .sh { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px; }
                .sv { font-weight: 600; font-size: 12px; color: var(--accent-rose); }
                .slider { width: 100%; height: 6px; -webkit-appearance: none; background: var(--bg-glass-strong); border-radius: 3px; outline: none; }
                .slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: var(--accent-rose); cursor: pointer; }
                .run-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, rgba(255, 82, 82, 0.2), transparent); border-color: var(--accent-rose); color: var(--accent-rose); }
                .ld { text-align: center; padding: var(--space-2xl); }
                .loader { width: 40px; height: 40px; border: 3px solid var(--border-subtle); border-top-color: var(--accent-rose); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto var(--space-md); }
                .results { animation: fadeInUp 0.5s ease-out; }
                
                .metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-bottom: var(--space-xl); }
                .metric-card { background: var(--bg-glass); padding: var(--space-lg); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 8px; border: 1px solid var(--border-subtle); }
                .metric-label { font-size: 12px; color: var(--text-secondary); font-weight: 600; }
                .soh-bar { width: 100%; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; }
                .soh-fill { height: 100%; transition: width 1s ease-out; }
                .metric-val { font-size: 24px; font-weight: 800; font-family: var(--font-mono); }
                .risk-indicator { display: flex; align-items: center; justify-content: space-between; }
                .risk-val { font-size: 24px; font-weight: 800; font-family: var(--font-mono); }
                .alert-badge { background: rgba(255,82,82,0.1); color: var(--accent-rose); font-size: 11px; padding: 4px 8px; border-radius: 12px; font-weight: 700; border: 1px solid rgba(255,82,82,0.3); animation: pulse 2s infinite; }
                
                .sb h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
                .factors-list { display: flex; flex-direction: column; gap: 12px; }
                .factor-item { display: flex; align-items: center; gap: 12px; }
                .factor-name { flex: 1; font-size: 12px; color: var(--text-secondary); min-width: 150px; }
                .factor-track { flex: 2; height: 6px; background: var(--bg-glass-strong); border-radius: 3px; overflow: hidden; }
                .factor-fill { height: 100%; background: var(--accent-amber); transition: width 1s ease-out; }
                .factor-pct { width: 30px; font-size: 11px; font-family: var(--font-mono); color: var(--text-tertiary); text-align: right; }
                
                .alert-box { display: flex; gap: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-medium); padding: 16px; border-radius: var(--radius-md); margin-top: var(--space-xl); }
                .alert-icon { font-size: 20px; }
                .alert-text { display: flex; flex-direction: column; gap: 4px; }
                .alert-text strong { font-size: 13px; color: var(--text-primary); }
                .alert-text p { font-size: 13px; color: var(--text-secondary); margin: 0; line-height: 1.5; }
                
                @media (max-width: 600px) { .metrics-grid { grid-template-columns: 1fr; } .factor-item { flex-direction: column; align-items: stretch; gap: 4px; } .factor-name { margin-bottom: 2px; } }
            `}</style>
        </div>
    );
}
