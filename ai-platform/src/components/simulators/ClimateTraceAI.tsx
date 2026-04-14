'use client';

import { useState } from 'react';

const regions = [
    { name: '북극', emoji: '🧊', lat: 85 },
    { name: '아마존', emoji: '🌳', lat: -3 },
    { name: '사하라', emoji: '🏜️', lat: 23 },
    { name: '동아시아', emoji: '🌏', lat: 35 },
];

export default function ClimateTraceAI() {
    const [region, setRegion] = useState(0);
    const [year, setYear] = useState(2025);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        tempChange: number;
        co2Level: number;
        seaLevel: number;
        iceArea: number;
        heatmap: number[][];
        yearlyData: { year: number; temp: number; co2: number }[];
    }>(null);

    const simulate = () => {
        setLoading(true);
        setTimeout(() => {
            const factor = (year - 2000) / 50;
            const r = region;
            setResult({
                tempChange: 0.8 + factor * (r === 0 ? 3.5 : r === 1 ? 1.8 : r === 2 ? 2.2 : 1.5) + Math.random() * 0.3,
                co2Level: 380 + factor * 80 + Math.random() * 10,
                seaLevel: factor * (r === 0 ? 45 : 25) + Math.random() * 5,
                iceArea: Math.max(0, 100 - factor * (r === 0 ? 60 : 20) + Math.random() * 5),
                heatmap: Array.from({ length: 8 }, () =>
                    Array.from({ length: 12 }, () => Math.random() * (0.5 + factor * 2))
                ),
                yearlyData: Array.from({ length: 10 }, (_, i) => ({
                    year: year - 9 + i,
                    temp: 0.5 + ((year - 9 + i - 2000) / 50) * 2 + Math.random() * 0.3,
                    co2: 370 + ((year - 9 + i - 2000) / 50) * 80,
                })),
            });
            setLoading(false);
        }, 1800);
    };

    const getHeatColor = (v: number) => {
        if (v < 0.5) return 'rgba(0,230,118,0.3)';
        if (v < 1) return 'rgba(255,215,64,0.4)';
        if (v < 1.5) return 'rgba(255,152,0,0.5)';
        if (v < 2) return 'rgba(255,82,82,0.6)';
        return 'rgba(213,0,0,0.7)';
    };

    return (
        <div className="climate-sim">
            <div className="climate-controls">
                <h3 className="panel-title">지역 & 시간 설정</h3>
                <div className="region-select">
                    {regions.map((r, i) => (
                        <button
                            key={r.name}
                            className={`region-btn ${region === i ? 'active' : ''}`}
                            onClick={() => { setRegion(i); setResult(null); }}
                        >
                            <span>{r.emoji}</span>
                            <span>{r.name}</span>
                        </button>
                    ))}
                </div>
                <div className="slider-group">
                    <div className="slider-header">
                        <span className="slider-label">예측 연도</span>
                        <span className="slider-value">{year}년</span>
                    </div>
                    <input type="range" min={2005} max={2080} value={year}
                        onChange={e => { setYear(parseInt(e.target.value)); setResult(null); }}
                        className="slider"
                    />
                </div>
                <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>
                    {loading ? '시뮬레이션 중...' : '🌍 기후 시뮬레이션 실행'}
                </button>
            </div>

            {loading && (
                <div className="loading-state">
                    <div className="loader" />
                    <p>기후 데이터를 분석 중입니다...</p>
                </div>
            )}

            {result && !loading && (
                <div className="climate-results">
                    <div className="climate-stats">
                        {[
                            { label: '온도 변화', value: `+${result.tempChange.toFixed(1)}°C`, color: 'var(--accent-rose)' },
                            { label: 'CO₂ 농도', value: `${result.co2Level.toFixed(0)} ppm`, color: 'var(--accent-amber)' },
                            { label: '해수면 상승', value: `+${result.seaLevel.toFixed(1)} cm`, color: 'var(--accent-cyan)' },
                            { label: '빙하 잔존율', value: `${result.iceArea.toFixed(1)}%`, color: 'var(--accent-emerald)' },
                        ].map(s => (
                            <div key={s.label} className="climate-stat-card">
                                <span className="cs-label">{s.label}</span>
                                <span className="cs-value" style={{ color: s.color }}>{s.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Heatmap */}
                    <div className="heatmap-section">
                        <h4>🗺️ 지역 온도 변화 히트맵</h4>
                        <div className="heatmap-grid">
                            {result.heatmap.map((row, ri) =>
                                row.map((v, ci) => (
                                    <div
                                        key={`${ri}-${ci}`}
                                        className="heatmap-cell"
                                        style={{ background: getHeatColor(v) }}
                                        title={`+${v.toFixed(2)}°C`}
                                    />
                                ))
                            )}
                        </div>
                        <div className="heatmap-legend">
                            <span>0°C</span>
                            <div className="legend-gradient" />
                            <span>+2°C+</span>
                        </div>
                    </div>

                    {/* Trend Chart */}
                    <div className="trend-section">
                        <h4>📈 연도별 추이</h4>
                        <div className="trend-chart">
                            <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="trend-svg">
                                <polyline fill="none" stroke="var(--accent-rose)" strokeWidth="2"
                                    points={result.yearlyData.map((d, i) => `${(i / 9) * 380 + 10},${110 - (d.temp / 4) * 90}`).join(' ')}
                                />
                                <polyline fill="rgba(255,82,82,0.1)" stroke="none"
                                    points={`10,110 ${result.yearlyData.map((d, i) => `${(i / 9) * 380 + 10},${110 - (d.temp / 4) * 90}`).join(' ')} 390,110`}
                                />
                                {result.yearlyData.map((d, i) => (
                                    <circle key={i} cx={(i / 9) * 380 + 10} cy={110 - (d.temp / 4) * 90} r="3" fill="var(--accent-rose)" />
                                ))}
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .climate-sim { display: flex; flex-direction: column; gap: var(--space-xl); }
        .panel-title { font-size: 16px; font-weight: 700; margin-bottom: var(--space-md); }
        .region-select { display: flex; gap: var(--space-sm); margin-bottom: var(--space-lg); flex-wrap: wrap; }
        .region-btn {
          flex: 1; min-width: 100px;
          padding: var(--space-md);
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all var(--transition-fast);
          font-family: inherit; color: inherit;
        }
        .region-btn:hover { border-color: var(--border-medium); }
        .region-btn.active { border-color: var(--accent-emerald); background: var(--accent-emerald-dim); color: var(--accent-emerald); }
        .region-btn span:first-child { font-size: 24px; }
        .slider-group { margin-bottom: var(--space-md); }
        .slider-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .slider-label { font-size: 13px; font-weight: 500; }
        .slider-value { font-size: 13px; font-weight: 700; font-family: var(--font-mono); color: var(--accent-cyan); }
        .slider { width: 100%; height: 6px; -webkit-appearance: none; appearance: none; background: var(--bg-glass-strong); border-radius: 3px; outline: none; }
        .slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: var(--accent-emerald); cursor: pointer; }
        .run-btn { width: 100%; padding: 14px; }

        .loading-state { text-align: center; padding: var(--space-2xl); }
        .loader { width: 40px; height: 40px; border: 3px solid var(--border-subtle); border-top-color: var(--accent-emerald); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto var(--space-md); }

        .climate-results { animation: fadeInUp 0.5s ease-out; }
        .climate-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-md); margin-bottom: var(--space-xl); }
        .climate-stat-card { background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-md); text-align: center; }
        .cs-label { display: block; font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .cs-value { font-size: 20px; font-weight: 700; }

        .heatmap-section { margin-bottom: var(--space-xl); }
        .heatmap-section h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
        .heatmap-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 2px;
          padding: var(--space-md);
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .heatmap-cell { aspect-ratio: 1; border-radius: 2px; transition: all var(--transition-fast); }
        .heatmap-cell:hover { transform: scale(1.3); z-index: 1; }
        .heatmap-legend { display: flex; align-items: center; gap: var(--space-sm); margin-top: var(--space-sm); font-size: 11px; color: var(--text-tertiary); }
        .legend-gradient { flex:1; height: 8px; border-radius: 4px; background: linear-gradient(to right, rgba(0,230,118,0.3), rgba(255,215,64,0.5), rgba(255,82,82,0.7), rgba(213,0,0,0.8)); }

        .trend-section h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
        .trend-chart { background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-md); height: 160px; }
        .trend-svg { width: 100%; height: 100%; }

        @media (max-width: 640px) { .climate-stats { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
        </div>
    );
}
