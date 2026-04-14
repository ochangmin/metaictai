'use client';

import { useState, useEffect, useRef } from 'react';

interface NNNode {
    id: string;
    layer: number;
    index: number;
    activation: number;
    bias: number;
}

interface NNEdge {
    from: string;
    to: string;
    weight: number;
    active: boolean;
}

export default function NeuroNetExplainer() {
    const [architecture, setArchitecture] = useState<'simple' | 'deep' | 'residual'>('simple');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        nodes: NNNode[];
        edges: NNEdge[];
        layers: number[];
        accuracy: number;
        loss: number;
        explanation: string;
        activePath: string[];
    }>(null);

    const buildNetwork = () => {
        setLoading(true);
        setTimeout(() => {
            const layers = architecture === 'simple' ? [3, 4, 4, 2] :
                architecture === 'deep' ? [4, 6, 6, 4, 3] :
                    [4, 5, 5, 5, 3];

            const nodes: NNNode[] = [];
            const edges: NNEdge[] = [];

            layers.forEach((count, layerIdx) => {
                for (let i = 0; i < count; i++) {
                    const activation = Math.random();
                    nodes.push({
                        id: `${layerIdx}-${i}`,
                        layer: layerIdx,
                        index: i,
                        activation,
                        bias: (Math.random() - 0.5) * 2,
                    });
                }
            });

            // Top path selection
            const topPath: string[] = [];
            layers.forEach((count, layerIdx) => {
                const maxIdx = Math.floor(Math.random() * count);
                topPath.push(`${layerIdx}-${maxIdx}`);
            });

            for (let l = 0; l < layers.length - 1; l++) {
                for (let i = 0; i < layers[l]; i++) {
                    for (let j = 0; j < layers[l + 1]; j++) {
                        const from = `${l}-${i}`;
                        const to = `${l + 1}-${j}`;
                        edges.push({
                            from, to,
                            weight: (Math.random() - 0.5) * 2,
                            active: topPath.includes(from) && topPath.includes(to),
                        });
                    }
                }
            }

            setResult({
                nodes, edges, layers,
                accuracy: 92 + Math.random() * 6,
                loss: 0.02 + Math.random() * 0.05,
                explanation: architecture === 'simple'
                    ? '입력층(3) → 은닉층(4×2) → 출력층(2) 구조. 노드 L1-2에서 가장 높은 활성화가 관찰되며, 이 경로가 최종 분류에 가장 큰 영향을 미칩니다.'
                    : architecture === 'deep'
                        ? '5개 레이어의 딥 네트워크. 깊은 구조로 인한 gradient 감쇄에 주의가 필요합니다. 주요 활성화 경로는 가운데 은닉층을 관통합니다.'
                        : 'Residual 구조로 skip connection을 통해 gradient 전파를 개선합니다. 잔차 연결 경로의 활성화 패턴이 두드러집니다.',
                activePath: topPath,
            });
            setLoading(false);
        }, 1500);
    };

    const getNodeX = (layer: number, totalLayers: number) => 60 + (layer / (totalLayers - 1)) * 480;
    const getNodeY = (index: number, layerSize: number) => {
        const spacing = Math.min(60, 280 / layerSize);
        const startY = 160 - (layerSize - 1) * spacing / 2;
        return startY + index * spacing;
    };

    return (
        <div className="neuro-sim">
            <h3 className="panel-title">네트워크 아키텍처 선택</h3>
            <div className="arch-select">
                {([
                    { key: 'simple', label: 'Simple MLP', desc: '3-4-4-2', emoji: '🔹' },
                    { key: 'deep', label: 'Deep Network', desc: '4-6-6-4-3', emoji: '🔷' },
                    { key: 'residual', label: 'Residual Net', desc: '4-5-5-5-3 + Skip', emoji: '💎' },
                ] as const).map(a => (
                    <button key={a.key} className={`arch-btn ${architecture === a.key ? 'active' : ''}`}
                        onClick={() => { setArchitecture(a.key); setResult(null); }}>
                        <span className="arch-emoji">{a.emoji}</span>
                        <span className="arch-label">{a.label}</span>
                        <span className="arch-desc">{a.desc}</span>
                    </button>
                ))}
            </div>

            <button className="btn btn-primary run-btn" onClick={buildNetwork} disabled={loading}>
                {loading ? '분석 중...' : '🧠 신경망 분석 실행'}
            </button>

            {loading && (
                <div className="loading-state">
                    <div className="loader" />
                    <p>신경망 구조를 분석 중입니다...</p>
                </div>
            )}

            {result && !loading && (
                <div className="neuro-results">
                    <div className="neuro-stats">
                        <div className="ns-card">
                            <span className="ns-label">정확도</span>
                            <span className="ns-value" style={{ color: 'var(--accent-emerald)' }}>{result.accuracy.toFixed(1)}%</span>
                        </div>
                        <div className="ns-card">
                            <span className="ns-label">손실값</span>
                            <span className="ns-value" style={{ color: 'var(--accent-amber)' }}>{result.loss.toFixed(4)}</span>
                        </div>
                        <div className="ns-card">
                            <span className="ns-label">레이어 수</span>
                            <span className="ns-value" style={{ color: 'var(--accent-purple)' }}>{result.layers.length}</span>
                        </div>
                        <div className="ns-card">
                            <span className="ns-label">총 파라미터</span>
                            <span className="ns-value" style={{ color: 'var(--accent-cyan)' }}>{result.edges.length}</span>
                        </div>
                    </div>

                    {/* Network Visualization */}
                    <div className="network-viz">
                        <h4>🔗 활성화 경로 시각화</h4>
                        <div className="network-canvas">
                            <svg viewBox="0 0 600 320" className="nn-svg">
                                {/* Edges */}
                                {result.edges.map((e, i) => {
                                    const fromNode = result.nodes.find(n => n.id === e.from)!;
                                    const toNode = result.nodes.find(n => n.id === e.to)!;
                                    return (
                                        <line key={i}
                                            x1={getNodeX(fromNode.layer, result.layers.length)}
                                            y1={getNodeY(fromNode.index, result.layers[fromNode.layer])}
                                            x2={getNodeX(toNode.layer, result.layers.length)}
                                            y2={getNodeY(toNode.index, result.layers[toNode.layer])}
                                            stroke={e.active ? 'var(--accent-cyan)' : 'var(--border-subtle)'}
                                            strokeWidth={e.active ? 2.5 : 0.5}
                                            opacity={e.active ? 0.9 : 0.3}
                                        />
                                    );
                                })}
                                {/* Nodes */}
                                {result.nodes.map(node => (
                                    <g key={node.id}>
                                        <circle
                                            cx={getNodeX(node.layer, result.layers.length)}
                                            cy={getNodeY(node.index, result.layers[node.layer])}
                                            r={10 + node.activation * 6}
                                            fill={result.activePath.includes(node.id)
                                                ? `rgba(0,229,255,${0.3 + node.activation * 0.5})`
                                                : `rgba(255,255,255,${0.05 + node.activation * 0.15})`}
                                            stroke={result.activePath.includes(node.id) ? 'var(--accent-cyan)' : 'var(--border-subtle)'}
                                            strokeWidth={result.activePath.includes(node.id) ? 2 : 1}
                                        />
                                        <text
                                            x={getNodeX(node.layer, result.layers.length)}
                                            y={getNodeY(node.index, result.layers[node.layer]) + 3}
                                            fill="var(--text-primary)"
                                            fontSize="8"
                                            textAnchor="middle"
                                            fontWeight="600"
                                        >
                                            {node.activation.toFixed(1)}
                                        </text>
                                    </g>
                                ))}
                                {/* Layer labels */}
                                {result.layers.map((_, i) => (
                                    <text key={i} x={getNodeX(i, result.layers.length)} y={300}
                                        fill="var(--text-tertiary)" fontSize="10" textAnchor="middle" fontWeight="500">
                                        {i === 0 ? 'Input' : i === result.layers.length - 1 ? 'Output' : `Hidden ${i}`}
                                    </text>
                                ))}
                            </svg>
                        </div>
                    </div>

                    {/* Explanation */}
                    <div className="explanation-box">
                        <h4>💡 해석 결과</h4>
                        <p>{result.explanation}</p>
                    </div>
                </div>
            )}

            <style jsx>{`
        .neuro-sim { display: flex; flex-direction: column; gap: var(--space-xl); }
        .panel-title { font-size: 16px; font-weight: 700; margin-bottom: var(--space-md); }
        .arch-select { display: flex; gap: var(--space-sm); margin-bottom: var(--space-md); flex-wrap: wrap; }
        .arch-btn {
          flex: 1; min-width: 140px;
          padding: var(--space-md);
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          cursor: pointer; transition: all var(--transition-fast);
          font-family: inherit; color: inherit;
        }
        .arch-btn:hover { border-color: var(--border-medium); }
        .arch-btn.active { border-color: var(--accent-purple); background: var(--accent-purple-dim); }
        .arch-emoji { font-size: 24px; }
        .arch-label { font-size: 13px; font-weight: 600; }
        .arch-desc { font-size: 11px; font-family: var(--font-mono); color: var(--text-tertiary); }
        .run-btn { width: 100%; padding: 14px; }

        .loading-state { text-align: center; padding: var(--space-2xl); }
        .loader { width: 40px; height: 40px; border: 3px solid var(--border-subtle); border-top-color: var(--accent-purple); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto var(--space-md); }

        .neuro-results { animation: fadeInUp 0.5s ease-out; }
        .neuro-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-md); margin-bottom: var(--space-xl); }
        .ns-card { background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-md); text-align: center; }
        .ns-label { display: block; font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .ns-value { font-size: 20px; font-weight: 700; }

        .network-viz { margin-bottom: var(--space-xl); }
        .network-viz h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
        .network-canvas { background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; }
        .nn-svg { width: 100%; min-width: 500px; height: auto; }

        .explanation-box { background: var(--accent-purple-dim); border: 1px solid rgba(179,136,255,0.2); border-radius: var(--radius-md); padding: var(--space-xl); }
        .explanation-box h4 { font-size: 13px; font-weight: 700; margin-bottom: 8px; }
        .explanation-box p { font-size: 14px; color: var(--text-secondary); line-height: 1.7; }

        @media (max-width: 640px) { .neuro-stats { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
        </div>
    );
}
