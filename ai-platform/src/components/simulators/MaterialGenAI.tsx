'use client';

import { useState } from 'react';

export default function MaterialGenAI() {
    const [composition, setComposition] = useState({ carbon: 50, silicon: 30, titanium: 20 });
    const [temp, setTemp] = useState(500);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        tensile: number; hardness: number; density: number; melting: number;
        durability: number; conductivity: number; grade: string;
    }>(null);

    const simulate = () => {
        setLoading(true);
        setTimeout(() => {
            const t = composition.titanium;
            const c = composition.carbon;
            setResult({
                tensile: 400 + t * 8 + c * 2 + Math.random() * 50,
                hardness: 55 + t * 0.5 + Math.random() * 10,
                density: 4.2 + (composition.silicon * 0.02) + Math.random() * 0.5,
                melting: 1200 + t * 15 + Math.random() * 200,
                durability: 70 + t * 0.3 + c * 0.2 + Math.random() * 15,
                conductivity: 20 + composition.silicon * 0.8 + Math.random() * 10,
                grade: t > 30 ? 'A+' : t > 20 ? 'A' : 'B+',
            });
            setLoading(false);
        }, 1800);
    };

    const updateComp = (key: string, val: number) => {
        const rest = 100 - val;
        const others = Object.keys(composition).filter(k => k !== key);
        const total = others.reduce((s, k) => s + composition[k as keyof typeof composition], 0);
        const newComp = { ...composition, [key]: val };
        others.forEach(k => {
            newComp[k as keyof typeof composition] = total > 0 ? Math.round((composition[k as keyof typeof composition] / total) * rest) : Math.round(rest / others.length);
        });
        setComposition(newComp);
        setResult(null);
    };

    return (
        <div className="mat-sim">
            <div className="mat-controls">
                <h3 className="panel-title">화학 성분 조절</h3>
                {Object.entries(composition).map(([key, val]) => (
                    <div key={key} className="slider-group">
                        <div className="slider-header">
                            <span className="slider-label">{key === 'carbon' ? '탄소 (C)' : key === 'silicon' ? '실리콘 (Si)' : '티타늄 (Ti)'}</span>
                            <span className="slider-value">{val}%</span>
                        </div>
                        <input
                            type="range" min={0} max={80} value={val}
                            onChange={e => updateComp(key, parseInt(e.target.value))}
                            className="slider"
                            style={{ '--fill': key === 'carbon' ? 'var(--accent-cyan)' : key === 'silicon' ? 'var(--accent-purple)' : 'var(--accent-amber)' } as React.CSSProperties}
                        />
                    </div>
                ))}

                <div className="slider-group">
                    <div className="slider-header">
                        <span className="slider-label">소결 온도</span>
                        <span className="slider-value">{temp}°C</span>
                    </div>
                    <input type="range" min={200} max={1500} step={50} value={temp}
                        onChange={e => { setTemp(parseInt(e.target.value)); setResult(null); }}
                        className="slider" style={{ '--fill': 'var(--accent-rose)' } as React.CSSProperties}
                    />
                </div>

                <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>
                    {loading ? '시뮬레이션 중...' : '🔬 물성 시뮬레이션 실행'}
                </button>
            </div>

            {loading && (
                <div className="loading-state">
                    <div className="loader" />
                    <p>AI가 소재 물성을 계산 중입니다...</p>
                </div>
            )}

            {result && !loading && (
                <div className="mat-results">
                    <div className="mat-grade-row">
                        <h3>📊 물성 분석 결과</h3>
                        <span className="grade-badge">{result.grade}</span>
                    </div>
                    <div className="mat-grid">
                        {[
                            { label: '인장강도', value: `${result.tensile.toFixed(0)} MPa`, color: 'var(--accent-cyan)' },
                            { label: '경도', value: `${result.hardness.toFixed(1)} HRC`, color: 'var(--accent-purple)' },
                            { label: '밀도', value: `${result.density.toFixed(2)} g/cm³`, color: 'var(--accent-amber)' },
                            { label: '녹는점', value: `${result.melting.toFixed(0)}°C`, color: 'var(--accent-rose)' },
                            { label: '내구성', value: `${result.durability.toFixed(1)}%`, color: 'var(--accent-emerald)' },
                            { label: '전도율', value: `${result.conductivity.toFixed(1)} S/m`, color: 'var(--accent-blue)' },
                        ].map(item => (
                            <div key={item.label} className="mat-stat">
                                <span className="mat-stat-label">{item.label}</span>
                                <span className="mat-stat-value" style={{ color: item.color }}>{item.value}</span>
                                <div className="mat-stat-bar">
                                    <div className="mat-stat-bar-fill" style={{ width: `${Math.min(parseFloat(item.value) / 15, 100)}%`, background: item.color }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="radar-mock">
                        <h4>성능 레이더 차트</h4>
                        <div className="radar-chart">
                            <svg viewBox="0 0 200 200" className="radar-svg">
                                <polygon points="100,20 180,80 160,170 40,170 20,80" fill="none" stroke="var(--border-subtle)" strokeWidth="1" />
                                <polygon points="100,40 160,80 145,150 55,150 40,80" fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" />
                                <polygon points="100,60 140,85 130,135 70,135 60,85" fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" />
                                <polygon
                                    points={`100,${20 + (1 - result.tensile / 800) * 80} ${100 + (result.hardness / 100) * 80},80 ${100 + (result.durability / 100) * 60},${100 + (result.density / 8) * 70} ${100 - (result.conductivity / 50) * 60},${100 + (result.melting / 2000) * 70} ${100 - (result.hardness / 100) * 80},80`}
                                    fill="rgba(0,229,255,0.15)" stroke="var(--accent-cyan)" strokeWidth="2"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .mat-sim { display: flex; flex-direction: column; gap: var(--space-xl); }
        .panel-title { font-size: 16px; font-weight: 700; margin-bottom: var(--space-lg); }
        .slider-group { margin-bottom: var(--space-md); }
        .slider-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .slider-label { font-size: 13px; font-weight: 500; }
        .slider-value { font-size: 13px; font-weight: 700; font-family: var(--font-mono); color: var(--accent-cyan); }
        .slider {
          width: 100%;
          height: 6px;
          -webkit-appearance: none;
          appearance: none;
          background: var(--bg-glass-strong);
          border-radius: 3px;
          outline: none;
        }
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: var(--fill, var(--accent-cyan));
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0,229,255,0.3);
        }
        .run-btn { width: 100%; margin-top: var(--space-md); padding: 14px; }

        .loading-state { text-align: center; padding: var(--space-2xl); }
        .loader { width: 40px; height: 40px; border: 3px solid var(--border-subtle); border-top-color: var(--accent-cyan); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto var(--space-md); }

        .mat-results { animation: fadeInUp 0.5s ease-out; }
        .mat-grade-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg); }
        .mat-grade-row h3 { font-size: 18px; font-weight: 700; }
        .grade-badge {
          font-size: 18px; font-weight: 800;
          padding: 8px 20px;
          border-radius: var(--radius-full);
          background: var(--accent-cyan-dim);
          color: var(--accent-cyan);
        }
        .mat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md); margin-bottom: var(--space-xl); }
        .mat-stat {
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: var(--space-md);
        }
        .mat-stat-label { display: block; font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .mat-stat-value { font-size: 20px; font-weight: 700; display: block; margin-bottom: 8px; }
        .mat-stat-bar { height: 4px; background: var(--bg-glass-strong); border-radius: 2px; overflow: hidden; }
        .mat-stat-bar-fill { height: 100%; border-radius: 2px; transition: width 1s ease-out; }

        .radar-mock h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
        .radar-chart {
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: var(--space-lg);
          display: flex;
          justify-content: center;
        }
        .radar-svg { max-width: 280px; width: 100%; }

        @media (max-width: 640px) { .mat-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
        </div>
    );
}
