'use client';
import { useState } from 'react';

const processTypes = ['에칭(Etching)', '증착(Deposition)', '노광(Lithography)', '이온주입(Implantation)', 'CMP'];
const defectTypes = ['파티클(Particle)', '패턴 불량', '스크래치', '두께 편차', '보이드(Void)'];

export default function SemiConAI() {
    const [process, setProcess] = useState(0);
    const [defect, setDefect] = useState(0);
    const [waferSize, setWaferSize] = useState(300);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        yieldRate: number;
        defectDensity: number;
        recommendations: { parameter: string; adjustment: string; impact: string }[];
        riskLevel: string;
    }>(null);

    const simulate = () => {
        setLoading(true);
        setTimeout(() => {
            const baseYield = 98 - (process * 1.5) - (defect * 2.2);
            const varYield = Math.random() * 3;
            const yieldRate = Math.max(0, Math.min(100, baseYield + varYield));

            setResult({
                yieldRate,
                defectDensity: (100 - yieldRate) * 0.15,
                recommendations: [
                    { parameter: '챔버 온도(Chamber Temp)', adjustment: `현재 온도에서 ${process === 0 ? '+2°C' : '-1.5°C'} 조정`, impact: '수율 1.2% 향상 예상' },
                    { parameter: '가스 유량(Gas Flow)', adjustment: `${process === 1 ? '증착 가스 5sccm 증가' : '반응 가스 최소화'}`, impact: '균일도 3% 개선' },
                    { parameter: 'RF 전력(RF Power)', adjustment: '플라즈마 안정화를 위해 10W 하향', impact: '파티클 발생률 20% 감소' }
                ],
                riskLevel: yieldRate > 95 ? '안정적(Stable)' : yieldRate > 90 ? '주의(Warning)' : '위험(Critical)'
            });
            setLoading(false);
        }, 1800);
    };

    return (
        <div className="sim-ui">
            <h3 className="panel-title">💻 반도체 공정 및 수율 시뮬레이션</h3>

            <div className="form-section">
                <span className="fl">대상 공정 (Process)</span>
                <div className="pill-row">
                    {processTypes.map((p, i) => (
                        <button key={i} className={`pill ${process === i ? 'active' : ''}`} onClick={() => { setProcess(i); setResult(null); }}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-section">
                <span className="fl">주요 결함 유형 예측 (Defect)</span>
                <div className="pill-row">
                    {defectTypes.map((d, i) => (
                        <button key={i} className={`pill ${defect === i ? 'active' : ''}`} onClick={() => { setDefect(i); setResult(null); }}>
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            <div className="sg">
                <div className="sh">
                    <span>웨이퍼 크기 (Wafer Size)</span>
                    <span className="sv">{waferSize} mm</span>
                </div>
                <input
                    type="range"
                    className="slider"
                    min="200"
                    max="450"
                    step="50"
                    value={waferSize}
                    onChange={(e) => { setWaferSize(parseInt(e.target.value)); setResult(null); }}
                />
            </div>

            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>
                {loading ? 'AI 분석 중...' : '💻 수율 분석 및 공정 최적화 실행'}
            </button>

            {loading && (
                <div className="ld">
                    <div className="loader" />
                    <p>웨이퍼 단층 데이터를 스캔하고 결함을 예측 중입니다...</p>
                </div>
            )}

            {result && !loading && (
                <div className="results">
                    <div className="wafer-display">
                        <div className="wafer-circle">
                            <div className="wafer-highlight" style={{ transform: `scale(${result.yieldRate / 100})` }}></div>
                        </div>
                        <div className="yield-stat">
                            <span className="yield-val" style={{ color: result.yieldRate > 95 ? 'var(--accent-blue)' : result.yieldRate > 90 ? 'var(--accent-amber)' : 'var(--accent-rose)' }}>
                                {result.yieldRate.toFixed(2)}%
                            </span>
                            <span className="yield-label">예상 수율 (Expected Yield)</span>
                        </div>
                    </div>

                    <div className="sb">
                        <h4>⚙️ 공정 최적화 제안</h4>
                        {result.recommendations.map((r, i) => (
                            <div key={i} className="rec-item">
                                <div className="rec-head">
                                    <span className="rec-param">{r.parameter}</span>
                                    <span className="rec-impact">💡 {r.impact}</span>
                                </div>
                                <span className="rec-adj">{r.adjustment}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
                .sim-ui { display: flex; flex-direction: column; gap: var(--space-lg); }
                .panel-title { font-size: 16px; font-weight: 700; color: var(--accent-blue); }
                .form-section { margin-bottom: var(--space-sm); }
                .fl { font-size: 13px; font-weight: 500; display: block; margin-bottom: 8px; }
                .pill-row { display: flex; flex-wrap: wrap; gap: 6px; }
                .pill { padding: 6px 12px; font-size: 11px; border-radius: var(--radius-full); background: var(--bg-glass); border: 1px solid var(--border-subtle); color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast); }
                .pill:hover { border-color: var(--border-medium); }
                .pill.active { background: rgba(68, 138, 255, 0.1); border-color: var(--accent-blue); color: var(--accent-blue); font-weight: 600; }
                .sg { margin: var(--space-sm) 0; }
                .sh { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px; }
                .sv { font-weight: 600; font-size: 12px; color: var(--accent-blue); }
                .slider { width: 100%; height: 6px; -webkit-appearance: none; background: var(--bg-glass-strong); border-radius: 3px; outline: none; }
                .slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: var(--accent-blue); cursor: pointer; }
                .run-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, rgba(68, 138, 255, 0.2), transparent); border-color: var(--accent-blue); color: var(--accent-blue); }
                .ld { text-align: center; padding: var(--space-2xl); }
                .loader { width: 40px; height: 40px; border: 3px solid var(--border-subtle); border-top-color: var(--accent-blue); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto var(--space-md); }
                .results { animation: fadeInUp 0.5s ease-out; }
                .wafer-display { display: flex; align-items: center; gap: var(--space-xl); background: var(--bg-glass); padding: var(--space-xl); border-radius: var(--radius-md); margin-bottom: var(--space-xl); }
                .wafer-circle { width: 80px; height: 80px; border-radius: 50%; background: var(--bg-glass-strong); position: relative; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 10px rgba(0,0,0,0.2); }
                .wafer-highlight { width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, var(--accent-blue), transparent); opacity: 0.5; transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1); }
                .yield-stat { display: flex; flex-direction: column; gap: 4px; }
                .yield-val { font-size: 32px; font-weight: 800; font-family: var(--font-mono); }
                .yield-label { font-size: 12px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 1px; }
                .sb h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
                .rec-item { padding: 12px var(--space-md); background: var(--bg-glass); border-radius: var(--radius-sm); margin-bottom: 8px; border-left: 3px solid var(--accent-blue); }
                .rec-head { display: flex; justify-content: space-between; margin-bottom: 6px; align-items: center; }
                .rec-param { font-weight: 700; font-size: 13px; color: var(--text-primary); }
                .rec-impact { font-size: 11px; font-weight: 600; color: var(--accent-emerald); background: rgba(0, 230, 118, 0.1); padding: 2px 8px; border-radius: 12px; }
                .rec-adj { font-size: 12px; color: var(--text-secondary); }
            `}</style>
        </div>
    );
}
