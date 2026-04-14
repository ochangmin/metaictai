'use client';

import { useState } from 'react';

const sequences = [
    { name: 'SARS-CoV-2 Spike (S1)', seq: 'MFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFT...' },
    { name: 'Insulin (Human)', seq: 'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSH...' },
    { name: 'GFP (Green Fluorescent)', seq: 'MSKGEELFTGVVPILVELDGDVNGHKFSVSGEG...' },
];

interface FoldResult {
    confidence: number;
    structure: string;
    helixPct: number;
    sheetPct: number;
    coilPct: number;
    residues: { type: string; energy: number }[];
}

export default function BioSimAI() {
    const [input, setInput] = useState('');
    const [selectedPreset, setSelectedPreset] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<FoldResult | null>(null);

    const simulate = () => {
        setLoading(true);
        setTimeout(() => {
            const h = 20 + Math.random() * 40;
            const s = 10 + Math.random() * 30;
            setResult({
                confidence: 85 + Math.random() * 12,
                structure: ['α/β Sandwich', 'β-Barrel', 'α-Helical Bundle', 'TIM Barrel'][Math.floor(Math.random() * 4)],
                helixPct: h,
                sheetPct: s,
                coilPct: 100 - h - s,
                residues: Array.from({ length: 40 }, (_, i) => ({
                    type: ['H', 'S', 'C'][Math.floor(Math.random() * 3)],
                    energy: -5 + Math.random() * 10,
                })),
            });
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="bio-sim">
            <div className="sim-panel">
                <h3 className="panel-title">입력 시퀀스</h3>
                <div className="presets">
                    {sequences.map(s => (
                        <button
                            key={s.name}
                            className={`preset-btn ${selectedPreset === s.name ? 'active' : ''}`}
                            onClick={() => { setSelectedPreset(s.name); setInput(s.seq); setResult(null); }}
                        >
                            {s.name}
                        </button>
                    ))}
                </div>
                <textarea
                    className="input-field seq-input"
                    placeholder="유전자 시퀀스를 입력하거나 프리셋을 선택하세요..."
                    value={input}
                    onChange={e => { setInput(e.target.value); setResult(null); }}
                    rows={4}
                    spellCheck={false}
                />
                <button className="btn btn-primary run-btn" onClick={simulate} disabled={!input || loading}>
                    {loading ? '분석 중...' : '🧬 단백질 접힘 예측 실행'}
                </button>
            </div>

            {loading && (
                <div className="loading-state">
                    <div className="loader" />
                    <p>AI 모델이 시퀀스를 분석 중입니다...</p>
                    <div className="loading-bar"><div className="loading-bar-fill" /></div>
                </div>
            )}

            {result && !loading && (
                <div className="result-area">
                    <div className="result-header">
                        <h3>📊 분석 결과</h3>
                        <span className="confidence-badge">
                            신뢰도: {result.confidence.toFixed(1)}%
                        </span>
                    </div>

                    <div className="result-grid">
                        <div className="result-card">
                            <span className="rc-label">예측 구조</span>
                            <span className="rc-value">{result.structure}</span>
                        </div>
                        <div className="result-card">
                            <span className="rc-label">α-Helix</span>
                            <span className="rc-value" style={{ color: 'var(--accent-rose)' }}>{result.helixPct.toFixed(1)}%</span>
                        </div>
                        <div className="result-card">
                            <span className="rc-label">β-Sheet</span>
                            <span className="rc-value" style={{ color: 'var(--accent-cyan)' }}>{result.sheetPct.toFixed(1)}%</span>
                        </div>
                        <div className="result-card">
                            <span className="rc-label">Random Coil</span>
                            <span className="rc-value" style={{ color: 'var(--accent-amber)' }}>{result.coilPct.toFixed(1)}%</span>
                        </div>
                    </div>

                    {/* Visual structure */}
                    <div className="structure-viz">
                        <h4>구조 시각화</h4>
                        <div className="residue-strip">
                            {result.residues.map((r, i) => (
                                <div
                                    key={i}
                                    className="residue"
                                    style={{
                                        background: r.type === 'H' ? 'var(--accent-rose)' : r.type === 'S' ? 'var(--accent-cyan)' : 'var(--accent-amber)',
                                        height: `${20 + Math.abs(r.energy) * 4}px`,
                                        animationDelay: `${i * 30}ms`,
                                    }}
                                    title={`Residue ${i + 1}: ${r.type === 'H' ? 'Helix' : r.type === 'S' ? 'Sheet' : 'Coil'} (E: ${r.energy.toFixed(2)})`}
                                />
                            ))}
                        </div>
                        <div className="legend">
                            <span><span className="dot" style={{ background: 'var(--accent-rose)' }} /> Helix</span>
                            <span><span className="dot" style={{ background: 'var(--accent-cyan)' }} /> Sheet</span>
                            <span><span className="dot" style={{ background: 'var(--accent-amber)' }} /> Coil</span>
                        </div>
                    </div>

                    {/* Energy plot */}
                    <div className="energy-plot">
                        <h4>잔기별 에너지 프로파일</h4>
                        <div className="energy-chart">
                            <div className="energy-zero-line" />
                            {result.residues.map((r, i) => (
                                <div
                                    key={i}
                                    className="energy-bar"
                                    style={{
                                        height: `${Math.abs(r.energy) * 8}px`,
                                        background: r.energy < 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                                        marginTop: r.energy < 0 ? 'auto' : '0',
                                        animationDelay: `${i * 20}ms`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .bio-sim { display: flex; flex-direction: column; gap: var(--space-xl); }
        .panel-title { font-size: 16px; font-weight: 700; margin-bottom: var(--space-md); }
        .presets { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: var(--space-md); }
        .preset-btn {
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 500;
          border-radius: var(--radius-full);
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          cursor: pointer;
          font-family: var(--font-mono);
        }
        .preset-btn:hover { border-color: var(--border-medium); color: var(--text-primary); }
        .preset-btn.active { background: var(--accent-emerald-dim); border-color: var(--accent-emerald); color: var(--accent-emerald); }
        .seq-input { font-family: var(--font-mono); font-size: 13px; resize: none; }
        .run-btn { width: 100%; margin-top: var(--space-sm); padding: 14px; }

        .loading-state { text-align: center; padding: var(--space-2xl); }
        .loader {
          width: 40px; height: 40px;
          border: 3px solid var(--border-subtle);
          border-top-color: var(--accent-emerald);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto var(--space-md);
        }
        .loading-state p { color: var(--text-secondary); font-size: 14px; margin-bottom: var(--space-md); }
        .loading-bar { height: 4px; background: var(--bg-glass-strong); border-radius: 2px; overflow: hidden; max-width: 300px; margin: 0 auto; }
        .loading-bar-fill { height: 100%; width: 100%; background: var(--gradient-emerald); animation: shimmer 2s infinite; background-size: 200% 100%; }

        .result-area { animation: fadeInUp 0.5s ease-out; }
        .result-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg); }
        .result-header h3 { font-size: 18px; font-weight: 700; }
        .confidence-badge {
          padding: 6px 14px;
          border-radius: var(--radius-full);
          background: var(--accent-emerald-dim);
          color: var(--accent-emerald);
          font-size: 13px;
          font-weight: 700;
        }

        .result-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-md); margin-bottom: var(--space-xl); }
        .result-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          text-align: center;
        }
        .rc-label { display: block; font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .rc-value { font-size: 18px; font-weight: 700; }

        .structure-viz { margin-bottom: var(--space-xl); }
        .structure-viz h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
        .residue-strip {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 80px;
          padding: var(--space-sm);
          background: var(--bg-glass);
          border-radius: var(--radius-sm);
          overflow-x: auto;
        }
        .residue {
          width: 8px;
          min-width: 8px;
          border-radius: 2px;
          animation: fadeInUp 0.3s ease-out both;
          transition: transform var(--transition-fast);
        }
        .residue:hover { transform: scaleY(1.3); }
        .legend { display: flex; gap: var(--space-lg); margin-top: var(--space-sm); }
        .legend span { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-tertiary); }
        .dot { width: 8px; height: 8px; border-radius: 50%; }

        .energy-plot h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
        .energy-chart {
          display: flex;
          align-items: center;
          gap: 2px;
          height: 80px;
          padding: var(--space-sm);
          background: var(--bg-glass);
          border-radius: var(--radius-sm);
          position: relative;
          overflow-x: auto;
        }
        .energy-zero-line {
          position: absolute;
          left: 0; right: 0;
          top: 50%;
          height: 1px;
          background: var(--border-subtle);
        }
        .energy-bar {
          width: 6px;
          min-width: 6px;
          border-radius: 2px;
          animation: fadeIn 0.3s ease-out both;
        }

        @media (max-width: 640px) {
          .result-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
        </div>
    );
}
