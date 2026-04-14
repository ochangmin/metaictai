'use client';

import { useState } from 'react';

interface Node {
    id: string;
    label: string;
    type: string;
    x: number;
    y: number;
    cost: number;
    efficiency: number;
}

interface Edge {
    from: string;
    to: string;
    flow: number;
}

const defaultNodes: Node[] = [
    { id: 'raw', label: '원자재 조달', type: 'source', x: 50, y: 50, cost: 100, efficiency: 85 },
    { id: 'factory1', label: '제조 공장 A', type: 'process', x: 200, y: 30, cost: 250, efficiency: 78 },
    { id: 'factory2', label: '제조 공장 B', type: 'process', x: 200, y: 80, cost: 180, efficiency: 82 },
    { id: 'warehouse', label: '물류 센터', type: 'storage', x: 350, y: 50, cost: 80, efficiency: 90 },
    { id: 'retail', label: '유통/판매', type: 'output', x: 500, y: 50, cost: 60, efficiency: 95 },
];

const defaultEdges: Edge[] = [
    { from: 'raw', to: 'factory1', flow: 60 },
    { from: 'raw', to: 'factory2', flow: 40 },
    { from: 'factory1', to: 'warehouse', flow: 55 },
    { from: 'factory2', to: 'warehouse', flow: 38 },
    { from: 'warehouse', to: 'retail', flow: 88 },
];

export default function OptiFactoryAI() {
    const [nodes] = useState(defaultNodes);
    const [loading, setLoading] = useState(false);
    const [optimized, setOptimized] = useState(false);
    const [result, setResult] = useState<null | {
        totalCostBefore: number;
        totalCostAfter: number;
        efficiencyBefore: number;
        efficiencyAfter: number;
        throughput: number;
        bottleneck: string;
        suggestions: string[];
    }>(null);

    const optimize = () => {
        setLoading(true);
        setTimeout(() => {
            setResult({
                totalCostBefore: 670,
                totalCostAfter: 520,
                efficiencyBefore: 78,
                efficiencyAfter: 93,
                throughput: 94.5,
                bottleneck: '제조 공장 A',
                suggestions: [
                    '공장 A의 라인 2를 공장 B로 이전하면 병목 해소 가능',
                    '원자재 조달 경로를 이중화하여 리스크 분산 권장',
                    '물류 센터 자동화 투자 시 ROI 18개월 내 달성 예상',
                    '공장 A-B 간 부품 공유 전략 도입 추천',
                ],
            });
            setOptimized(true);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="opti-sim">
            <h3 className="panel-title">공급망 네트워크</h3>

            {/* Node-based visualization */}
            <div className="network-view">
                <svg viewBox="0 0 560 120" className="network-svg">
                    {defaultEdges.map((e, i) => {
                        const from = defaultNodes.find(n => n.id === e.from)!;
                        const to = defaultNodes.find(n => n.id === e.to)!;
                        return (
                            <g key={i}>
                                <line
                                    x1={from.x + 40} y1={from.y}
                                    x2={to.x - 10} y2={to.y}
                                    stroke={optimized ? 'var(--accent-emerald)' : 'var(--border-medium)'}
                                    strokeWidth="2"
                                    strokeDasharray={optimized ? '0' : '4'}
                                />
                                <text
                                    x={(from.x + 40 + to.x - 10) / 2}
                                    y={(from.y + to.y) / 2 - 6}
                                    fill="var(--text-tertiary)"
                                    fontSize="9" textAnchor="middle"
                                >
                                    {e.flow}%
                                </text>
                            </g>
                        );
                    })}
                    {nodes.map(node => (
                        <g key={node.id}>
                            <rect
                                x={node.x - 10} y={node.y - 16}
                                width="80" height="32" rx="8"
                                fill={node.type === 'source' ? 'var(--accent-cyan-dim)' :
                                    node.type === 'output' ? 'var(--accent-emerald-dim)' :
                                        node.type === 'storage' ? 'var(--accent-amber-dim)' : 'var(--accent-purple-dim)'}
                                stroke={node.type === 'source' ? 'var(--accent-cyan)' :
                                    node.type === 'output' ? 'var(--accent-emerald)' :
                                        node.type === 'storage' ? 'var(--accent-amber)' : 'var(--accent-purple)'}
                                strokeWidth="1"
                            />
                            <text x={node.x + 30} y={node.y + 4} fill="var(--text-primary)" fontSize="9" textAnchor="middle" fontWeight="600">
                                {node.label}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>

            {/* Node Details */}
            <div className="node-grid">
                {nodes.map(node => (
                    <div key={node.id} className="node-card">
                        <span className="node-type">{node.type === 'source' ? '📦' : node.type === 'process' ? '🏭' : node.type === 'storage' ? '🏗️' : '🛒'}</span>
                        <span className="node-label">{node.label}</span>
                        <div className="node-stats">
                            <span>비용: ₩{node.cost}M</span>
                            <span>효율: {node.efficiency}%</span>
                        </div>
                    </div>
                ))}
            </div>

            <button className="btn btn-primary run-btn" onClick={optimize} disabled={loading}>
                {loading ? '최적화 중...' : '🏭 공급망 최적화 실행'}
            </button>

            {loading && (
                <div className="loading-state">
                    <div className="loader" />
                    <p>AI가 공급망 최적화 전략을 분석 중입니다...</p>
                </div>
            )}

            {result && !loading && (
                <div className="opti-results">
                    <h3>📊 최적화 결과</h3>
                    <div className="opti-stats">
                        <div className="opti-stat-card">
                            <span className="os-label">총 비용</span>
                            <div className="os-compare">
                                <span className="os-before">₩{result.totalCostBefore}M</span>
                                <span>→</span>
                                <span className="os-after">₩{result.totalCostAfter}M</span>
                            </div>
                            <span className="os-savings">-{((1 - result.totalCostAfter / result.totalCostBefore) * 100).toFixed(1)}% 절감</span>
                        </div>
                        <div className="opti-stat-card">
                            <span className="os-label">전체 효율</span>
                            <div className="os-compare">
                                <span className="os-before">{result.efficiencyBefore}%</span>
                                <span>→</span>
                                <span className="os-after">{result.efficiencyAfter}%</span>
                            </div>
                            <span className="os-savings">+{result.efficiencyAfter - result.efficiencyBefore}% 향상</span>
                        </div>
                        <div className="opti-stat-card">
                            <span className="os-label">처리량</span>
                            <span className="os-big">{result.throughput}%</span>
                        </div>
                        <div className="opti-stat-card">
                            <span className="os-label">병목 지점</span>
                            <span className="os-bottleneck">{result.bottleneck}</span>
                        </div>
                    </div>

                    <div className="suggestions">
                        <h4>💡 개선 제안</h4>
                        {result.suggestions.map((s, i) => (
                            <div key={i} className="suggestion-item">
                                <span className="sug-num">{i + 1}</span>
                                <span>{s}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
        .opti-sim { display: flex; flex-direction: column; gap: var(--space-xl); }
        .panel-title { font-size: 16px; font-weight: 700; }
        .network-view { background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-lg); overflow-x: auto; }
        .network-svg { width: 100%; min-width: 500px; height: auto; }

        .node-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: var(--space-sm); }
        .node-card { background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: var(--space-md); text-align: center; }
        .node-type { font-size: 20px; display: block; margin-bottom: 4px; }
        .node-label { font-size: 12px; font-weight: 600; display: block; margin-bottom: 6px; }
        .node-stats { font-size: 10px; color: var(--text-tertiary); display: flex; flex-direction: column; gap: 2px; }

        .run-btn { width: 100%; padding: 14px; }
        .loading-state { text-align: center; padding: var(--space-2xl); }
        .loader { width: 40px; height: 40px; border: 3px solid var(--border-subtle); border-top-color: var(--accent-amber); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto var(--space-md); }

        .opti-results { animation: fadeInUp 0.5s ease-out; }
        .opti-results h3 { font-size: 18px; font-weight: 700; margin-bottom: var(--space-lg); }
        .opti-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-md); margin-bottom: var(--space-xl); }
        .opti-stat-card { background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-md); text-align: center; }
        .os-label { display: block; font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .os-compare { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 14px; margin-bottom: 4px; }
        .os-before { color: var(--accent-rose); font-weight: 600; }
        .os-after { color: var(--accent-emerald); font-weight: 700; }
        .os-savings { font-size: 12px; font-weight: 700; color: var(--accent-emerald); }
        .os-big { font-size: 24px; font-weight: 800; color: var(--accent-cyan); }
        .os-bottleneck { font-size: 14px; font-weight: 600; color: var(--accent-amber); }

        .suggestions h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
        .suggestion-item { display: flex; align-items: flex-start; gap: var(--space-sm); padding: 10px var(--space-md); background: var(--bg-glass); border-radius: var(--radius-sm); margin-bottom: 6px; font-size: 13px; color: var(--text-secondary); line-height: 1.5; }
        .sug-num { width: 22px; height: 22px; border-radius: 50%; background: var(--accent-cyan-dim); color: var(--accent-cyan); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }

        @media (max-width: 640px) { .opti-stats { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
        </div>
    );
}
