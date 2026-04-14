'use client';
import { useState } from 'react';

export default function CarbonFootprintAnalysis({ onResult }: any) {
    const [energyUsage, setEnergyUsage] = useState(450); // kWh
    const [fertilizer, setFertilizer] = useState(120); // kg
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const analyze = () => {
        setLoading(true);
        setTimeout(() => {
            // Dummy calc: 1kWh = 0.45kg CO2, 1kg fertilizer = 1.2kg CO2
            const elCo2 = energyUsage * 0.45;
            const frCo2 = fertilizer * 1.2;
            const total = elCo2 + frCo2;
            const result = {
                totalCo2: total.toFixed(1) + ' kg CO2-eq',
                breakdown: `에너지(${elCo2.toFixed(1)}), 비료(${frCo2.toFixed(1)})`,
                recommendation: total > 500 ? '탄소 배출량 위험 수준 (신재생 자원 도입 검토 필요)' : '저탄소 농법 목표치 달성'
            };
            setData(result);
            if (onResult) onResult({ energyUsage, fertilizer }, result);
            setLoading(false);
        }, 1300);
    };

    return (
        <div className="legacy-module">
            <h3>🌍 탄소 발자국 (저탄소) 추적 시뮬레이터</h3>
            <div className="form-grid mt-lg">
                <label>월간 전력 사용량(kWh)</label><input type="number" className="item-input" value={energyUsage} onChange={e => setEnergyUsage(Number(e.target.value))} />
                <label>합성 비료 사용량(kg)</label><input type="number" className="item-input" value={fertilizer} onChange={e => setFertilizer(Number(e.target.value))} />
            </div>
            <button className="btn btn-primary run-btn mt-lg" onClick={analyze} disabled={loading}>{loading ? 'LCA 분석 중...' : '농장 탄소 발자국 산출'}</button>
            {data && (
                <div className="results-panel mt-lg">
                    <h4>🌲 탄소 배출량 산출 결과</h4>
                    <ul>
                        <li>총 배출량: <strong style={{ color: 'var(--accent-rose)' }}>{data.totalCo2}</strong></li>
                        <li>항목별: {data.breakdown}</li>
                        <li style={{ color: 'var(--accent-emerald)', marginTop: '8px', fontWeight: 600 }}>{data.recommendation}</li>
                    </ul>
                </div>
            )}
            <style jsx>{`.legacy-module{color:var(--text-primary)} h3{font-size:20px;font-weight:800;margin-bottom:8px} .form-grid{display:grid;grid-template-columns:160px 1fr;gap:16px;align-items:center;max-width:420px} label{font-size:13px;color:var(--text-secondary)} .item-input{padding:10px;border:1px solid var(--border-subtle);background:var(--bg-glass);border-radius:var(--radius-sm);color:#fff;font-family:inherit;width:100%} .run-btn{width:100%;max-width:420px;padding:12px} .results-panel{background:rgba(0,0,0,0.2);border:1px solid var(--accent-emerald);padding:20px;border-radius:var(--radius-md);max-width:420px; animation: fadeInUp .3s ease;} .results-panel h4{margin-top:0;font-size:14px;color:var(--accent-emerald);margin-bottom:12px} .results-panel ul{list-style:none;padding:0;margin:0} .results-panel li{margin-bottom:8px;font-size:13px} .mt-lg{margin-top:24px}`}</style>
        </div>
    );
}
