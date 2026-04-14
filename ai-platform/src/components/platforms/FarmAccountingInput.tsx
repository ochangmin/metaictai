'use client';
import { useState } from 'react';

export default function FarmAccountingInput({ onResult }: any) {
    const [revenue, setRevenue] = useState(50000000);
    const [expense, setExpense] = useState(32000000);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const analyze = () => {
        setLoading(true);
        setTimeout(() => {
            const profit = revenue - expense;
            const margin = ((profit / revenue) * 100).toFixed(1);
            const result = { profit: profit.toLocaleString() + ' 원', margin: margin + '%', advice: margin > '20' ? '수익률 우수' : '비용 절감 필요 (비료 및 연료비 진단 권장)' };
            setData(result);
            if (onResult) onResult({ revenue, expense }, result);
            setLoading(false);
        }, 800);
    };

    return (
        <div className="legacy-module">
            <h3>💰 영농 회계 처리장 및 수익 계산</h3>
            <div className="form-grid mt-lg">
                <label>분기 매출 (원)</label><input type="number" className="item-input" value={revenue} onChange={e => setRevenue(Number(e.target.value))} />
                <label>경영비 지출 (원)</label><input type="number" className="item-input" value={expense} onChange={e => setExpense(Number(e.target.value))} />
            </div>
            <button className="btn btn-primary run-btn mt-lg" onClick={analyze} disabled={loading}>{loading ? '정산 중...' : '수익 및 경영 건전성 분석'}</button>
            {data && (
                <div className="results-panel mt-lg">
                    <h4>💡 경영 분석</h4>
                    <ul><li>순수익: {data.profit}</li><li>영업 이익률: {data.margin}</li><li style={{ color: 'var(--accent-purple)' }}>진단: {data.advice}</li></ul>
                </div>
            )}
            <style jsx>{`.legacy-module{color:var(--text-primary)} h3{font-size:20px;font-weight:800;margin-bottom:8px} .form-grid{display:grid;grid-template-columns:120px 1fr;gap:16px;align-items:center;max-width:400px} label{font-size:13px;color:var(--text-secondary)} .item-input{padding:10px;border:1px solid var(--border-subtle);background:var(--bg-glass);border-radius:var(--radius-sm);color:#fff;font-family:inherit;width:100%} .run-btn{width:100%;max-width:400px;padding:12px} .results-panel{background:rgba(0,0,0,0.2);border:1px solid var(--accent-purple);padding:20px;border-radius:var(--radius-md);max-width:400px; animation: fadeInUp .3s ease;} .results-panel h4{margin-top:0;font-size:14px;color:var(--accent-purple);margin-bottom:12px} .results-panel ul{list-style:none;padding:0;margin:0} .results-panel li{margin-bottom:8px;font-size:13px} .mt-lg{margin-top:24px}`}</style>
        </div>
    );
}
