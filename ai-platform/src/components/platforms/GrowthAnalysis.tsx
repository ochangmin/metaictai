'use client';
import { useState } from 'react';

export default function GrowthAnalysis({ onResult }: any) {
    const [cropType, setCropType] = useState('토마토');
    const [weeks, setWeeks] = useState(8);
    const [averageTemp, setAverageTemp] = useState(24);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const analyze = () => {
        setLoading(true);
        setTimeout(() => {
            const yieldEstimate = (weeks * 2.5 * (averageTemp / 22)).toFixed(1);
            const result = { expectedYield: yieldEstimate + ' kg/㎡', growthStage: weeks < 4 ? '영양 생장기' : '생식 생장기', analysis: '정상적인 생육 곡선 도달 (목표치 대비 95% 달성)' };
            setData(result);
            if (onResult) onResult({ cropType, weeks, averageTemp }, result);
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="legacy-module">
            <h3>📊 작물 생육 모델링 분석</h3>
            <div className="form-grid mt-lg">
                <label>작물 종류</label><input type="text" className="item-input" value={cropType} onChange={e => setCropType(e.target.value)} />
                <label>파종 후 주차(Week)</label><input type="number" className="item-input" value={weeks} onChange={e => setWeeks(Number(e.target.value))} />
                <label>평균 유지 온도(℃)</label><input type="number" className="item-input" value={averageTemp} onChange={e => setAverageTemp(Number(e.target.value))} />
            </div>
            <button className="btn btn-primary run-btn mt-lg" onClick={analyze} disabled={loading}>{loading ? '추론 모델 구동 중...' : '생육 모델 시뮬레이션 실행'}</button>
            {data && (
                <div className="results-panel mt-lg">
                    <h4>📈 생육 모델 결과</h4>
                    <ul><li>예상 수확량: <strong>{data.expectedYield}</strong></li><li>현재 생육 단계: {data.growthStage}</li><li style={{ color: 'var(--accent-purple)' }}>종합 평가: {data.analysis}</li></ul>
                </div>
            )}
            <style jsx>{`.legacy-module{color:var(--text-primary)} h3{font-size:20px;font-weight:800;margin-bottom:8px} .form-grid{display:grid;grid-template-columns:140px 1fr;gap:16px;align-items:center;max-width:400px} label{font-size:13px;color:var(--text-secondary)} .item-input{padding:10px;border:1px solid var(--border-subtle);background:var(--bg-glass);border-radius:var(--radius-sm);color:#fff;font-family:inherit;width:100%} .run-btn{width:100%;max-width:400px;padding:12px} .results-panel{background:rgba(0,0,0,0.2);border:1px solid var(--accent-purple);padding:20px;border-radius:var(--radius-md);max-width:400px; animation: fadeInUp .3s ease;} .results-panel h4{margin-top:0;font-size:14px;color:var(--accent-purple);margin-bottom:12px} .results-panel ul{list-style:none;padding:0;margin:0} .results-panel li{margin-bottom:8px;font-size:13px} .mt-lg{margin-top:24px}`}</style>
        </div>
    );
}
