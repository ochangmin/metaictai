'use client';
import { useState } from 'react';

export default function SoilNutrientInput({ onResult }: any) {
    const [ph, setPh] = useState(6.5);
    const [nitrogen, setNitrogen] = useState(120);
    const [phosphorus, setPhosphorus] = useState(30);
    const [potassium, setPotassium] = useState(45);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const analyze = () => {
        setLoading(true);
        setTimeout(() => {
            let analysis = '';
            if (ph < 6) analysis = '산성 토양 경고: 석회 시비 권장';
            else if (nitrogen < 100) analysis = '질소 부족 경고: 비료 추가 투입 필요';
            else analysis = '토양 양분 상태 양호 (현재 작물 재배에 적합)';

            const result = { evaluation: analysis, score: 85, recommendation: '주기적인 엽면 시비 추가 유지' };
            setData(result);
            if (onResult) onResult({ ph, nitrogen, phosphorus, potassium }, result);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="legacy-module">
            <h3>🌱 토양 양분 자체 진단 입력 데이터</h3>
            <div className="form-grid mt-lg">
                <label>토양 산도 (pH)</label><input type="number" step="0.1" className="item-input" value={ph} onChange={e => setPh(Number(e.target.value))} />
                <label>질소 (N) ppm</label><input type="number" className="item-input" value={nitrogen} onChange={e => setNitrogen(Number(e.target.value))} />
                <label>인산 (P) ppm</label><input type="number" className="item-input" value={phosphorus} onChange={e => setPhosphorus(Number(e.target.value))} />
                <label>칼륨 (K) ppm</label><input type="number" className="item-input" value={potassium} onChange={e => setPotassium(Number(e.target.value))} />
            </div>
            <button className="btn btn-primary run-btn mt-lg" onClick={analyze} disabled={loading}>{loading ? '분석 중...' : '토양 양분 진단 시작'}</button>
            {data && (
                <div className="results-panel mt-lg">
                    <h4>🧪 양분 진단 분석 결과</h4>
                    <ul><li className="status-text">{data.evaluation}</li><li>점수: {data.score} / 100</li><li>권장 조치: {data.recommendation}</li></ul>
                </div>
            )}
            <style jsx>{`.legacy-module{color:var(--text-primary)} h3{font-size:20px;font-weight:800;margin-bottom:8px} .form-grid{display:grid;grid-template-columns:120px 1fr;gap:16px;align-items:center;max-width:400px} label{font-size:13px;color:var(--text-secondary)} .item-input{padding:10px;border:1px solid var(--border-subtle);background:var(--bg-glass);border-radius:var(--radius-sm);color:#fff;font-family:inherit} .run-btn{width:100%;max-width:400px;padding:12px} .results-panel{background:rgba(0,0,0,0.2);border:1px solid var(--accent-cyan);padding:20px;border-radius:var(--radius-md);max-width:400px} .results-panel h4{font-size:14px;color:var(--accent-cyan);margin-bottom:12px} .results-panel ul{list-style:none;padding:0;margin:0} .results-panel li{margin-bottom:8px;font-size:13px} .status-text{color:var(--accent-emerald)!important;font-weight:600} .mt-lg{margin-top:24px}`}</style>
        </div>
    );
}
