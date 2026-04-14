'use client';

import { useState } from 'react';

export default function EconoCastAI() {
    const [params, setParams] = useState({ interestRate: 3.5, inflation: 2.5, unemployment: 4.0, oilPrice: 75 });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        gdpForecast: number[];
        cpiTrend: number[];
        employment: number[];
        quarters: string[];
        summary: string;
        riskLevel: string;
    }>(null);

    const simulate = () => {
        setLoading(true);
        setTimeout(() => {
            const base = 2.0 - params.interestRate * 0.15 + params.inflation * 0.1;
            setResult({
                gdpForecast: Array.from({ length: 8 }, (_, i) => base + Math.sin(i * 0.5) * 0.5 + Math.random() * 0.3),
                cpiTrend: Array.from({ length: 8 }, (_, i) => params.inflation + Math.cos(i * 0.4) * 0.3 + Math.random() * 0.2),
                employment: Array.from({ length: 8 }, (_, i) => 100 - params.unemployment + i * 0.2 + Math.random() * 0.5),
                quarters: ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', 'Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027'],
                summary: params.interestRate > 4 ? '고금리 환경에서 성장 둔화가 예상됩니다. 소비자 지출 감소와 기업 투자 위축에 주의가 필요합니다.' : '완화적 통화정책 기조 아래 안정적 성장이 예상됩니다. 다만 인플레이션 리스크 모니터링이 필요합니다.',
                riskLevel: params.interestRate > 4.5 ? '높음' : params.interestRate > 3 ? '보통' : '낮음',
            });
            setLoading(false);
        }, 2200);
    };

    const maxGdp = result ? Math.max(...result.gdpForecast) : 0;
    const minGdp = result ? Math.min(...result.gdpForecast) : 0;

    return (
        <div className="econ-sim">
            <div className="econ-controls">
                <h3 className="panel-title">경제 변수 설정</h3>
                {[
                    { key: 'interestRate', label: '기준금리 (%)', min: 0, max: 8, step: 0.25, color: 'var(--accent-cyan)' },
                    { key: 'inflation', label: '인플레이션 (%)', min: 0, max: 10, step: 0.5, color: 'var(--accent-rose)' },
                    { key: 'unemployment', label: '실업률 (%)', min: 1, max: 15, step: 0.5, color: 'var(--accent-amber)' },
                    { key: 'oilPrice', label: '유가 ($/배럴)', min: 30, max: 150, step: 5, color: 'var(--accent-emerald)' },
                ].map(s => (
                    <div key={s.key} className="slider-group">
                        <div className="slider-header">
                            <span className="slider-label">{s.label}</span>
                            <span className="slider-value" style={{ color: s.color }}>
                                {params[s.key as keyof typeof params]}
                            </span>
                        </div>
                        <input type="range" min={s.min} max={s.max} step={s.step}
                            value={params[s.key as keyof typeof params]}
                            onChange={e => { setParams({ ...params, [s.key]: parseFloat(e.target.value) }); setResult(null); }}
                            className="slider" style={{ '--fill': s.color } as React.CSSProperties}
                        />
                    </div>
                ))}
                <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>
                    {loading ? '분석 중...' : '📈 경제 예측 실행'}
                </button>
            </div>

            {loading && (
                <div className="loading-state">
                    <div className="loader" />
                    <p>거시경제 모델을 시뮬레이션 중입니다...</p>
                </div>
            )}

            {result && !loading && (
                <div className="econ-results">
                    <div className="econ-summary-card">
                        <div className="econ-summary-header">
                            <h3>📊 예측 요약</h3>
                            <span className={`risk-badge ${result.riskLevel === '높음' ? 'high' : result.riskLevel === '보통' ? 'med' : 'low'}`}>
                                리스크: {result.riskLevel}
                            </span>
                        </div>
                        <p>{result.summary}</p>
                    </div>

                    {/* GDP Chart */}
                    <div className="chart-section">
                        <h4>GDP 성장률 전망 (%)</h4>
                        <div className="bar-chart">
                            {result.gdpForecast.map((v, i) => (
                                <div key={i} className="bar-col">
                                    <div className="bar-wrapper">
                                        <div
                                            className="bar"
                                            style={{
                                                height: `${((v - minGdp + 0.5) / (maxGdp - minGdp + 1)) * 100}%`,
                                                background: v > 0 ? 'var(--accent-cyan)' : 'var(--accent-rose)',
                                                animationDelay: `${i * 100}ms`,
                                            }}
                                        />
                                    </div>
                                    <span className="bar-label">{result.quarters[i]}</span>
                                    <span className="bar-value">{v.toFixed(2)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CPI Trend */}
                    <div className="chart-section">
                        <h4>소비자물가지수(CPI) 추이</h4>
                        <div className="line-chart">
                            <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="line-svg">
                                <polyline
                                    fill="none"
                                    stroke="var(--accent-rose)"
                                    strokeWidth="2"
                                    points={result.cpiTrend.map((v, i) => `${(i / 7) * 380 + 10},${110 - (v / 5) * 90}`).join(' ')}
                                />
                                <polyline
                                    fill="rgba(255,82,82,0.1)"
                                    stroke="none"
                                    points={`10,110 ${result.cpiTrend.map((v, i) => `${(i / 7) * 380 + 10},${110 - (v / 5) * 90}`).join(' ')} 390,110`}
                                />
                                {result.cpiTrend.map((v, i) => (
                                    <circle key={i} cx={(i / 7) * 380 + 10} cy={110 - (v / 5) * 90} r="3" fill="var(--accent-rose)" />
                                ))}
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .econ-sim { display: flex; flex-direction: column; gap: var(--space-xl); }
        .panel-title { font-size: 16px; font-weight: 700; margin-bottom: var(--space-lg); }
        .slider-group { margin-bottom: var(--space-md); }
        .slider-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .slider-label { font-size: 13px; font-weight: 500; }
        .slider-value { font-size: 13px; font-weight: 700; font-family: var(--font-mono); }
        .slider { width: 100%; height: 6px; -webkit-appearance: none; appearance: none; background: var(--bg-glass-strong); border-radius: 3px; outline: none; }
        .slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: var(--fill, var(--accent-cyan)); cursor: pointer; }
        .run-btn { width: 100%; margin-top: var(--space-md); padding: 14px; }

        .loading-state { text-align: center; padding: var(--space-2xl); }
        .loader { width: 40px; height: 40px; border: 3px solid var(--border-subtle); border-top-color: var(--accent-amber); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto var(--space-md); }
        .loading-state p { color: var(--text-secondary); font-size: 14px; }

        .econ-results { animation: fadeInUp 0.5s ease-out; }
        .econ-summary-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: var(--space-xl);
          margin-bottom: var(--space-xl);
        }
        .econ-summary-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm); }
        .econ-summary-header h3 { font-size: 18px; font-weight: 700; }
        .econ-summary-card p { font-size: 14px; color: var(--text-secondary); line-height: 1.7; }
        .risk-badge { padding: 4px 12px; border-radius: var(--radius-full); font-size: 12px; font-weight: 700; }
        .risk-badge.high { background: var(--accent-rose-dim); color: var(--accent-rose); }
        .risk-badge.med { background: var(--accent-amber-dim); color: var(--accent-amber); }
        .risk-badge.low { background: var(--accent-emerald-dim); color: var(--accent-emerald); }

        .chart-section { margin-bottom: var(--space-xl); }
        .chart-section h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }

        .bar-chart { display: flex; gap: var(--space-sm); align-items: flex-end; height: 180px; padding: var(--space-md); background: var(--bg-glass); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); }
        .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; }
        .bar-wrapper { flex: 1; width: 100%; display: flex; align-items: flex-end; justify-content: center; }
        .bar { width: 70%; max-width: 40px; border-radius: 4px 4px 0 0; animation: fadeInUp 0.5s ease-out both; min-height: 4px; }
        .bar-label { font-size: 9px; color: var(--text-tertiary); margin-top: 6px; white-space: nowrap; }
        .bar-value { font-size: 10px; font-weight: 600; font-family: var(--font-mono); color: var(--accent-cyan); }

        .line-chart {
          background: var(--bg-glass); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md); padding: var(--space-md); height: 160px;
        }
        .line-svg { width: 100%; height: 100%; }
      `}</style>
        </div>
    );
}
