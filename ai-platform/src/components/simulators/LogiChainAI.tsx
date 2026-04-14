'use client';
import { useState } from 'react';
export default function LogiChainAI() {
    const [warehouses, setWarehouses] = useState(3); const [demand, setDemand] = useState(500);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { totalCost: number; deliveryTime: number; fillRate: number; routes: { from: string; to: string; cost: number; time: number }[] }>(null);
    const optimize = () => {
        setLoading(true); setTimeout(() => {
            setResult({
                totalCost: demand * (5 - warehouses * 0.5) + Math.random() * 200, deliveryTime: 48 - warehouses * 8 + Math.random() * 10, fillRate: 85 + warehouses * 3 + Math.random() * 5,
                routes: Array.from({ length: warehouses }, (_, i) => ({ from: `창고 ${String.fromCharCode(65 + i)}`, to: `구역 ${i + 1}`, cost: 100 + Math.random() * 200, time: 4 + Math.random() * 12 }))
            }); setLoading(false);
        }, 1500);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">물류 네트워크 설정</h3>
            <div className="sg"><div className="sh"><span>물류 거점 수</span><span className="sv">{warehouses}개</span></div><input type="range" className="slider" min={1} max={6} value={warehouses} onChange={e => { setWarehouses(parseInt(e.target.value)); setResult(null); }} /></div>
            <div className="sg"><div className="sh"><span>일일 수요량</span><span className="sv">{demand}건</span></div><input type="range" className="slider" min={100} max={2000} step={50} value={demand} onChange={e => { setDemand(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={optimize} disabled={loading}>{loading ? '최적화 중...' : '📦 물류 최적화 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>배송 경로를 최적화 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">총 비용</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>₩{result.totalCost.toFixed(0)}M</span></div>
                    <div className="sc"><span className="sl">평균 배송 시간</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.deliveryTime.toFixed(0)}h</span></div>
                    <div className="sc"><span className="sl">충족률</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.fillRate.toFixed(1)}%</span></div>
                </div>
                <div className="sb"><h4>🚚 배송 경로</h4>{result.routes.map((r, i) => (<div key={i} className="route"><span className="rf">{r.from}</span><span className="ra">→</span><span className="rt">{r.to}</span><span className="rc">₩{r.cost.toFixed(0)}M</span><span className="rd">{r.time.toFixed(1)}h</span></div>))}</div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .sg{margin-bottom:var(--space-md)}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-amber)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-amber);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-amber);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:18px;font-weight:700}
        .sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .route{display:flex;align-items:center;gap:var(--space-sm);padding:10px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:6px;font-size:13px}
        .rf{font-weight:600;color:var(--accent-cyan)}.ra{color:var(--text-tertiary)}.rt{font-weight:600}.rc{margin-left:auto;font-family:var(--font-mono);color:var(--accent-amber)}.rd{font-family:var(--font-mono);color:var(--text-tertiary)}
      `}</style>
        </div>
    );
}
