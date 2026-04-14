'use client';
import { useState } from 'react';
const topos = ['스타', '링', '메시', '트리'];
export default function NetworkTopoAI() {
    const [topo, setTopo] = useState(0); const [nodes, setNodes] = useState(8);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { latency: number; bandwidth: number; reliability: number; failover: number; connections: number; nodePositions: { x: number; y: number }[] }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const pos = Array.from({ length: nodes }, (_, i) => {
                const angle = (i / nodes) * Math.PI * 2; return { x: 150 + Math.cos(angle) * 80, y: 100 + Math.sin(angle) * 70 };
            });
            setResult({
                latency: topo === 2 ? 2 + Math.random() * 3 : 5 + topo * 3 + Math.random() * 5, bandwidth: topo === 2 ? 900 + Math.random() * 100 : 500 + (3 - topo) * 100 + Math.random() * 100,
                reliability: topo === 2 ? 99.5 + Math.random() * 0.4 : 95 + (3 - topo) * 1 + Math.random() * 2, failover: topo === 2 ? 0.5 + Math.random() * 0.5 : 2 + topo + Math.random() * 2,
                connections: topo === 0 ? nodes - 1 : topo === 1 ? nodes : topo === 2 ? nodes * (nodes - 1) / 2 : nodes - 1, nodePositions: pos
            }); setLoading(false);
        }, 1400);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">네트워크 설정</h3>
            <div className="pill-row">{topos.map((t, i) => (<button key={i} className={`pill ${topo === i ? 'active' : ''}`} onClick={() => { setTopo(i); setResult(null); }}>🌐 {t}</button>))}</div>
            <div className="sg"><div className="sh"><span>노드 수</span><span className="sv">{nodes}</span></div><input type="range" className="slider" min={3} max={15} value={nodes} onChange={e => { setNodes(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '시뮬레이션 중...' : '🌐 네트워크 시뮬레이션 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>네트워크 토폴로지를 분석 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">지연 시간</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.latency.toFixed(1)} ms</span></div>
                    <div className="sc"><span className="sl">대역폭</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.bandwidth.toFixed(0)} Mbps</span></div>
                    <div className="sc"><span className="sl">신뢰성</span><span className="sv2" style={{ color: 'var(--accent-purple)' }}>{result.reliability.toFixed(2)}%</span></div>
                    <div className="sc"><span className="sl">장애 복구</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.failover.toFixed(1)}s</span></div>
                </div>
                <div className="sb"><h4>🔗 토폴로지 시각화 ({result.connections} 연결)</h4><svg viewBox="0 0 300 200" className="topo-svg">
                    {result.nodePositions.map((n1, i) => result.nodePositions.slice(i + 1).map((n2, j) => {
                        const shouldDraw = topo === 2 || (topo === 0 && i === 0) || (topo === 1 && j === 0) || (topo === 3 && (i === 0 || i <= Math.floor(Math.log2(j + i + 2))));
                        return shouldDraw ? <line key={`${i}-${j}`} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke="var(--accent-cyan)" strokeWidth="1" opacity="0.4" /> : null;
                    }))}
                    {result.nodePositions.map((n, i) => (<g key={i}><circle cx={n.x} cy={n.y} r="10" fill="var(--bg-glass)" stroke={i === 0 ? 'var(--accent-amber)' : 'var(--accent-cyan)'} strokeWidth="2" />
                        <text x={n.x} y={n.y + 4} fill="var(--text-primary)" fontSize="8" textAnchor="middle" fontWeight="600">{i + 1}</text></g>))}
                </svg></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .pill-row{display:flex;gap:6px;margin-bottom:var(--space-sm)}.pill{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-blue-dim);border-color:var(--accent-blue);color:var(--accent-blue)}
        .sg{margin-bottom:var(--space-sm)}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-blue)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-blue);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-blue);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:16px;font-weight:700}
        .sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}.topo-svg{width:100%;max-width:400px;margin:0 auto;display:block;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:8px}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
