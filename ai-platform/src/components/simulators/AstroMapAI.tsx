'use client';

import { useState } from 'react';

const regions = [
    { name: '한반도 중부', emoji: '🇰🇷', desc: '서울/경기 도시 확장 분석' },
    { name: '나일 델타', emoji: '🇪🇬', desc: '농업 지대 변화 추적' },
    { name: '아마존 유역', emoji: '🇧🇷', desc: '삼림 벌채 모니터링' },
    { name: '캘리포니아', emoji: '🇺🇸', desc: '산불 피해 지역 분석' },
];

export default function AstroMapAI() {
    const [selectedRegion, setSelectedRegion] = useState(0);
    const [layer, setLayer] = useState<'urban' | 'vegetation' | 'water'>('urban');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        heatmap: number[][];
        stats: { label: string; value: string; change: string; color: string }[];
        timeline: { year: number; value: number }[];
    }>(null);

    const analyze = () => {
        setLoading(true);
        setTimeout(() => {
            const r = selectedRegion;
            setResult({
                heatmap: Array.from({ length: 10 }, () =>
                    Array.from({ length: 14 }, () => Math.random())
                ),
                stats: layer === 'urban' ? [
                    { label: '도시화율', value: `${(65 + r * 5 + Math.random() * 10).toFixed(1)}%`, change: '+12.3%', color: 'var(--accent-purple)' },
                    { label: '건물 밀도', value: `${(2400 + r * 300).toFixed(0)}/km²`, change: '+8.5%', color: 'var(--accent-cyan)' },
                    { label: '녹지 비율', value: `${(25 - r * 3 + Math.random() * 5).toFixed(1)}%`, change: '-4.2%', color: 'var(--accent-emerald)' },
                    { label: '변화 면적', value: `${(120 + r * 50).toFixed(0)} km²`, change: '+15.7%', color: 'var(--accent-amber)' },
                ] : layer === 'vegetation' ? [
                    { label: 'NDVI 평균', value: `${(0.4 + Math.random() * 0.3).toFixed(3)}`, change: r === 2 ? '-8.1%' : '+2.3%', color: 'var(--accent-emerald)' },
                    { label: '삼림 면적', value: `${(5000 - r * 500).toFixed(0)} km²`, change: r === 2 ? '-12%' : '-1.5%', color: 'var(--accent-emerald)' },
                    { label: '작물 구역', value: `${(800 + r * 200).toFixed(0)} km²`, change: '+3.2%', color: 'var(--accent-amber)' },
                    { label: '사막화 위험', value: r === 2 ? '높음' : '보통', change: '', color: 'var(--accent-rose)' },
                ] : [
                    { label: '수체 면적', value: `${(300 + r * 100).toFixed(0)} km²`, change: '-2.1%', color: 'var(--accent-cyan)' },
                    { label: '수질 지수', value: `${(72 + Math.random() * 15).toFixed(1)}`, change: '-1.8%', color: 'var(--accent-blue)' },
                    { label: '습지 면적', value: `${(150 + r * 30).toFixed(0)} km²`, change: '-5.3%', color: 'var(--accent-emerald)' },
                    { label: '홍수 위험', value: r === 1 ? '높음' : '낮음', change: '', color: 'var(--accent-amber)' },
                ],
                timeline: Array.from({ length: 8 }, (_, i) => ({
                    year: 2018 + i,
                    value: 50 + i * (layer === 'urban' ? 5 : layer === 'vegetation' ? -2 : -1) + Math.random() * 10,
                })),
            });
            setLoading(false);
        }, 2000);
    };

    const getColor = (v: number) => {
        if (layer === 'urban') return `rgba(179,136,255,${v * 0.7 + 0.1})`;
        if (layer === 'vegetation') return `rgba(0,230,118,${v * 0.7 + 0.1})`;
        return `rgba(0,229,255,${v * 0.7 + 0.1})`;
    };

    return (
        <div className="astro-sim">
            <div className="astro-controls">
                <h3 className="panel-title">위성 분석 설정</h3>
                <div className="region-grid">
                    {regions.map((r, i) => (
                        <button key={i} className={`region-opt ${selectedRegion === i ? 'active' : ''}`}
                            onClick={() => { setSelectedRegion(i); setResult(null); }}>
                            <span className="r-emoji">{r.emoji}</span>
                            <span className="r-name">{r.name}</span>
                            <span className="r-desc">{r.desc}</span>
                        </button>
                    ))}
                </div>

                <div className="layer-select">
                    <span className="layer-label">분석 레이어</span>
                    <div className="layer-pills">
                        {(['urban', 'vegetation', 'water'] as const).map(l => (
                            <button key={l} className={`layer-pill ${layer === l ? 'active' : ''}`}
                                onClick={() => { setLayer(l); setResult(null); }}>
                                {l === 'urban' ? '🏙️ 도시화' : l === 'vegetation' ? '🌿 식생' : '💧 수체'}
                            </button>
                        ))}
                    </div>
                </div>

                <button className="btn btn-primary run-btn" onClick={analyze} disabled={loading}>
                    {loading ? '분석 중...' : '🛰️ 위성 분석 실행'}
                </button>
            </div>

            {loading && (
                <div className="loading-state">
                    <div className="loader" />
                    <p>위성 영상을 분석 중입니다...</p>
                </div>
            )}

            {result && !loading && (
                <div className="astro-results">
                    <div className="astro-stats">
                        {result.stats.map(s => (
                            <div key={s.label} className="astro-stat">
                                <span className="as-label">{s.label}</span>
                                <span className="as-value" style={{ color: s.color }}>{s.value}</span>
                                {s.change && <span className={`as-change ${s.change.startsWith('-') ? 'neg' : 'pos'}`}>{s.change}</span>}
                            </div>
                        ))}
                    </div>

                    <div className="heatmap-section">
                        <h4>🗺️ 히트맵 분석</h4>
                        <div className="heatmap-grid">
                            {result.heatmap.map((row, ri) =>
                                row.map((v, ci) => (
                                    <div key={`${ri}-${ci}`} className="heat-cell"
                                        style={{ background: getColor(v) }}
                                        title={`값: ${(v * 100).toFixed(1)}%`}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    <div className="timeline-section">
                        <h4>📈 시계열 변화</h4>
                        <div className="timeline-chart">
                            <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="tl-svg">
                                <polyline fill="none"
                                    stroke={layer === 'urban' ? 'var(--accent-purple)' : layer === 'vegetation' ? 'var(--accent-emerald)' : 'var(--accent-cyan)'}
                                    strokeWidth="2"
                                    points={result.timeline.map((d, i) => `${(i / 7) * 380 + 10},${90 - (d.value / 100) * 80}`).join(' ')}
                                />
                                {result.timeline.map((d, i) => (
                                    <circle key={i} cx={(i / 7) * 380 + 10} cy={90 - (d.value / 100) * 80} r="3"
                                        fill={layer === 'urban' ? 'var(--accent-purple)' : layer === 'vegetation' ? 'var(--accent-emerald)' : 'var(--accent-cyan)'}
                                    />
                                ))}
                            </svg>
                            <div className="tl-labels">
                                {result.timeline.map(d => (
                                    <span key={d.year}>{d.year}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .astro-sim { display: flex; flex-direction: column; gap: var(--space-xl); }
        .panel-title { font-size: 16px; font-weight: 700; margin-bottom: var(--space-md); }
        .region-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-sm); margin-bottom: var(--space-lg); }
        .region-opt {
          padding: var(--space-md); background: var(--bg-glass); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md); display: flex; flex-direction: column; align-items: center; gap: 4px;
          cursor: pointer; transition: all var(--transition-fast); font-family: inherit; color: inherit;
        }
        .region-opt:hover { border-color: var(--border-medium); }
        .region-opt.active { border-color: var(--accent-cyan); background: var(--accent-cyan-dim); }
        .r-emoji { font-size: 24px; }
        .r-name { font-size: 13px; font-weight: 600; }
        .r-desc { font-size: 11px; color: var(--text-tertiary); }
        .layer-select { margin-bottom: var(--space-md); }
        .layer-label { font-size: 13px; font-weight: 500; display: block; margin-bottom: 8px; }
        .layer-pills { display: flex; gap: 6px; }
        .layer-pill {
          flex: 1; padding: 8px; font-size: 12px; text-align: center;
          background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);
          cursor: pointer; transition: all var(--transition-fast); font-family: inherit; color: var(--text-secondary);
        }
        .layer-pill:hover { border-color: var(--border-medium); color: var(--text-primary); }
        .layer-pill.active { border-color: var(--accent-cyan); background: var(--accent-cyan-dim); color: var(--accent-cyan); }
        .run-btn { width: 100%; padding: 14px; }

        .loading-state { text-align: center; padding: var(--space-2xl); }
        .loader { width: 40px; height: 40px; border: 3px solid var(--border-subtle); border-top-color: var(--accent-blue); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto var(--space-md); }

        .astro-results { animation: fadeInUp 0.5s ease-out; }
        .astro-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-md); margin-bottom: var(--space-xl); }
        .astro-stat { background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-md); text-align: center; }
        .as-label { display: block; font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .as-value { font-size: 18px; font-weight: 700; display: block; }
        .as-change { font-size: 11px; font-weight: 600; }
        .as-change.pos { color: var(--accent-emerald); }
        .as-change.neg { color: var(--accent-rose); }

        .heatmap-section { margin-bottom: var(--space-xl); }
        .heatmap-section h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
        .heatmap-grid { display: grid; grid-template-columns: repeat(14, 1fr); gap: 2px; background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-sm); }
        .heat-cell { aspect-ratio: 1; border-radius: 2px; transition: transform var(--transition-fast); }
        .heat-cell:hover { transform: scale(1.4); z-index: 1; }

        .timeline-section h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
        .timeline-chart { background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-md); }
        .tl-svg { width: 100%; height: 100px; }
        .tl-labels { display: flex; justify-content: space-between; padding: 0 10px; margin-top: 4px; }
        .tl-labels span { font-size: 10px; color: var(--text-tertiary); }

        @media (max-width: 640px) { .astro-stats { grid-template-columns: repeat(2, 1fr); } .region-grid { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
}
