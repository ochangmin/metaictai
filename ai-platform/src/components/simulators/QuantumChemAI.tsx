'use client';

import { useState, useRef, useEffect } from 'react';

interface Atom {
    symbol: string;
    color: string;
    x: number;
    y: number;
    z: number;
    radius: number;
}

interface Bond {
    from: number;
    to: number;
}

const molecules: Record<string, { name: string; atoms: Atom[]; bonds: Bond[] }> = {
    water: {
        name: 'H₂O (물)',
        atoms: [
            { symbol: 'O', color: '#ff5252', x: 150, y: 130, z: 0, radius: 22 },
            { symbol: 'H', color: '#ffffff', x: 100, y: 180, z: 10, radius: 14 },
            { symbol: 'H', color: '#ffffff', x: 200, y: 180, z: -10, radius: 14 },
        ],
        bonds: [{ from: 0, to: 1 }, { from: 0, to: 2 }],
    },
    caffeine: {
        name: 'C₈H₁₀N₄O₂ (카페인)',
        atoms: [
            { symbol: 'C', color: '#555', x: 120, y: 100, z: 0, radius: 18 },
            { symbol: 'C', color: '#555', x: 160, y: 70, z: 5, radius: 18 },
            { symbol: 'N', color: '#448aff', x: 200, y: 100, z: -5, radius: 17 },
            { symbol: 'C', color: '#555', x: 200, y: 150, z: 0, radius: 18 },
            { symbol: 'N', color: '#448aff', x: 160, y: 180, z: 5, radius: 17 },
            { symbol: 'C', color: '#555', x: 120, y: 150, z: -5, radius: 18 },
            { symbol: 'O', color: '#ff5252', x: 80, y: 80, z: 10, radius: 16 },
            { symbol: 'O', color: '#ff5252', x: 240, y: 160, z: -10, radius: 16 },
            { symbol: 'C', color: '#555', x: 250, y: 80, z: 5, radius: 18 },
            { symbol: 'N', color: '#448aff', x: 280, y: 120, z: 0, radius: 17 },
        ],
        bonds: [
            { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 },
            { from: 3, to: 4 }, { from: 4, to: 5 }, { from: 5, to: 0 },
            { from: 0, to: 6 }, { from: 3, to: 7 }, { from: 2, to: 8 },
            { from: 8, to: 9 },
        ],
    },
    methane: {
        name: 'CH₄ (메탄)',
        atoms: [
            { symbol: 'C', color: '#555', x: 150, y: 140, z: 0, radius: 20 },
            { symbol: 'H', color: '#ffffff', x: 110, y: 100, z: 15, radius: 13 },
            { symbol: 'H', color: '#ffffff', x: 190, y: 100, z: -15, radius: 13 },
            { symbol: 'H', color: '#ffffff', x: 110, y: 180, z: -10, radius: 13 },
            { symbol: 'H', color: '#ffffff', x: 190, y: 180, z: 10, radius: 13 },
        ],
        bonds: [{ from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 0, to: 4 }],
    },
};

export default function QuantumChemAI() {
    const [selectedMol, setSelectedMol] = useState<'water' | 'caffeine' | 'methane'>('water');
    const [rotation, setRotation] = useState(0);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        totalEnergy: number;
        kineticEnergy: number;
        potentialEnergy: number;
        dipoleMoment: number;
        bondLengths: { bond: string; length: number }[];
        orbitalEnergies: number[];
    }>(null);

    const mol = molecules[selectedMol];

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(r => (r + 0.5) % 360);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const simulate = () => {
        setLoading(true);
        setTimeout(() => {
            const n = mol.atoms.length;
            setResult({
                totalEnergy: -(50 + n * 15 + Math.random() * 10),
                kineticEnergy: 10 + n * 3 + Math.random() * 5,
                potentialEnergy: -(60 + n * 18 + Math.random() * 8),
                dipoleMoment: selectedMol === 'water' ? 1.85 + Math.random() * 0.1 : selectedMol === 'caffeine' ? 3.6 + Math.random() * 0.3 : 0 + Math.random() * 0.05,
                bondLengths: mol.bonds.slice(0, 4).map(b => ({
                    bond: `${mol.atoms[b.from].symbol}-${mol.atoms[b.to].symbol}`,
                    length: 0.9 + Math.random() * 0.5,
                })),
                orbitalEnergies: Array.from({ length: Math.min(n, 6) }, () => -20 + Math.random() * 35),
            });
            setLoading(false);
        }, 2000);
    };

    // Simple rotation transform for pseudo-3D
    const getRotatedPos = (atom: Atom) => {
        const rad = (rotation * Math.PI) / 180;
        const x = atom.x * Math.cos(rad) - atom.z * Math.sin(rad) * 0.5;
        const z = atom.x * Math.sin(rad) + atom.z * Math.cos(rad);
        return { x: x + 50, y: atom.y, z, scale: 1 + z * 0.003 };
    };

    return (
        <div className="quantum-sim">
            <h3 className="panel-title">분자 선택</h3>
            <div className="mol-select">
                {(['water', 'caffeine', 'methane'] as const).map(key => (
                    <button key={key} className={`mol-btn ${selectedMol === key ? 'active' : ''}`}
                        onClick={() => { setSelectedMol(key); setResult(null); }}>
                        <span className="mol-emoji">⚛️</span>
                        <span className="mol-name">{molecules[key].name}</span>
                    </button>
                ))}
            </div>

            {/* 3D Viewer */}
            <div className="mol-viewer">
                <svg viewBox="0 0 350 300" className="mol-svg">
                    {/* Bonds */}
                    {mol.bonds.map((bond, i) => {
                        const from = getRotatedPos(mol.atoms[bond.from]);
                        const to = getRotatedPos(mol.atoms[bond.to]);
                        return (
                            <line key={i}
                                x1={from.x} y1={from.y}
                                x2={to.x} y2={to.y}
                                stroke="rgba(255,255,255,0.3)"
                                strokeWidth="3"
                            />
                        );
                    })}
                    {/* Atoms (sorted by z for depth) */}
                    {[...mol.atoms].map((atom, i) => {
                        const pos = getRotatedPos(atom);
                        return (
                            <g key={i}>
                                <circle
                                    cx={pos.x} cy={pos.y}
                                    r={atom.radius * pos.scale}
                                    fill={atom.color}
                                    opacity={0.6 + pos.scale * 0.3}
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth="1"
                                />
                                <text x={pos.x} y={pos.y + 4}
                                    fill="#fff" fontSize="11" textAnchor="middle" fontWeight="700">
                                    {atom.symbol}
                                </text>
                            </g>
                        );
                    })}
                </svg>
                <div className="viewer-hint">자동 회전 중 — 분자 구조를 관찰하세요</div>
            </div>

            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>
                {loading ? '계산 중...' : '⚛️ 양자 시뮬레이션 실행'}
            </button>

            {loading && (
                <div className="loading-state">
                    <div className="loader" />
                    <p>양자 에너지 상태를 계산 중입니다...</p>
                </div>
            )}

            {result && !loading && (
                <div className="quantum-results">
                    <div className="q-stats">
                        {[
                            { label: '총 에너지', value: `${result.totalEnergy.toFixed(2)} eV`, color: 'var(--accent-cyan)' },
                            { label: '운동 에너지', value: `${result.kineticEnergy.toFixed(2)} eV`, color: 'var(--accent-amber)' },
                            { label: '퍼텐셜 에너지', value: `${result.potentialEnergy.toFixed(2)} eV`, color: 'var(--accent-rose)' },
                            { label: '쌍극자 모멘트', value: `${result.dipoleMoment.toFixed(2)} D`, color: 'var(--accent-purple)' },
                        ].map(s => (
                            <div key={s.label} className="q-stat-card">
                                <span className="qs-label">{s.label}</span>
                                <span className="qs-value" style={{ color: s.color }}>{s.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Bond Lengths */}
                    <div className="bonds-section">
                        <h4>🔗 결합 길이</h4>
                        <div className="bonds-list">
                            {result.bondLengths.map((b, i) => (
                                <div key={i} className="bond-item">
                                    <span className="bond-name">{b.bond}</span>
                                    <div className="bond-bar">
                                        <div className="bond-fill" style={{ width: `${(b.length / 1.5) * 100}%` }} />
                                    </div>
                                    <span className="bond-val">{b.length.toFixed(3)} Å</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Orbital Energies */}
                    <div className="orbital-section">
                        <h4>🌀 오비탈 에너지 준위</h4>
                        <div className="orbital-chart">
                            {result.orbitalEnergies.sort((a, b) => a - b).map((e, i) => (
                                <div key={i} className="orbital-level">
                                    <span className="ol-label">E{i + 1}</span>
                                    <div className="ol-bar-container">
                                        <div className="ol-bar"
                                            style={{
                                                left: `${((e + 20) / 35) * 100}%`,
                                                background: e < 0 ? 'var(--accent-cyan)' : 'var(--accent-rose)',
                                            }}
                                        >
                                            <span className="ol-electrons">↑↓</span>
                                        </div>
                                    </div>
                                    <span className="ol-value">{e.toFixed(2)} eV</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .quantum-sim { display: flex; flex-direction: column; gap: var(--space-xl); }
        .panel-title { font-size: 16px; font-weight: 700; margin-bottom: var(--space-md); }
        .mol-select { display: flex; gap: var(--space-sm); margin-bottom: var(--space-md); flex-wrap: wrap; }
        .mol-btn {
          flex: 1; min-width: 130px;
          padding: var(--space-md);
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          cursor: pointer; transition: all var(--transition-fast);
          font-family: inherit; color: inherit;
        }
        .mol-btn:hover { border-color: var(--border-medium); }
        .mol-btn.active { border-color: var(--accent-cyan); background: var(--accent-cyan-dim); }
        .mol-emoji { font-size: 24px; }
        .mol-name { font-size: 13px; font-weight: 600; }

        .mol-viewer {
          background: radial-gradient(circle at center, rgba(0,229,255,0.03), transparent);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-lg);
        }
        .mol-svg { max-width: 350px; width: 100%; }
        .viewer-hint { font-size: 11px; color: var(--text-tertiary); margin-top: var(--space-sm); }

        .run-btn { width: 100%; padding: 14px; }
        .loading-state { text-align: center; padding: var(--space-2xl); }
        .loader { width: 40px; height: 40px; border: 3px solid var(--border-subtle); border-top-color: var(--accent-cyan); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto var(--space-md); }

        .quantum-results { animation: fadeInUp 0.5s ease-out; }
        .q-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-md); margin-bottom: var(--space-xl); }
        .q-stat-card { background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-md); text-align: center; }
        .qs-label { display: block; font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .qs-value { font-size: 18px; font-weight: 700; }

        .bonds-section { margin-bottom: var(--space-xl); }
        .bonds-section h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
        .bonds-list { display: flex; flex-direction: column; gap: 8px; }
        .bond-item { display: flex; align-items: center; gap: var(--space-md); padding: 8px var(--space-md); background: var(--bg-glass); border-radius: var(--radius-sm); }
        .bond-name { font-size: 13px; font-weight: 600; font-family: var(--font-mono); min-width: 60px; }
        .bond-bar { flex: 1; height: 6px; background: var(--bg-glass-strong); border-radius: 3px; overflow: hidden; }
        .bond-fill { height: 100%; background: var(--accent-cyan); border-radius: 3px; transition: width 1s ease-out; }
        .bond-val { font-size: 12px; font-family: var(--font-mono); color: var(--text-tertiary); min-width: 70px; text-align: right; }

        .orbital-section h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
        .orbital-chart { display: flex; flex-direction: column; gap: 8px; }
        .orbital-level { display: flex; align-items: center; gap: var(--space-sm); }
        .ol-label { font-size: 12px; font-family: var(--font-mono); color: var(--text-tertiary); min-width: 30px; }
        .ol-bar-container { flex: 1; height: 24px; background: var(--bg-glass); border-radius: 4px; position: relative; }
        .ol-bar {
          position: absolute;
          top: 2px; bottom: 2px;
          width: 32px;
          border-radius: 3px;
          display: flex; align-items: center; justify-content: center;
        }
        .ol-electrons { font-size: 10px; }
        .ol-value { font-size: 12px; font-family: var(--font-mono); color: var(--text-tertiary); min-width: 70px; text-align: right; }

        @media (max-width: 640px) { .q-stats { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
        </div>
    );
}
