'use client';
import { useState } from 'react';

export default function BiodiversityAnalysis({ onResult }: any) {
    const [habitatArea, setHabitatArea] = useState(1.5);
    const [speciesCount, setSpeciesCount] = useState(12);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const analyze = () => {
        setLoading(true);
        setTimeout(() => {
            const shannonIndex = (Math.log(speciesCount) * (habitatArea / 2)).toFixed(2);
            const isHigh = parseFloat(shannonIndex) > 1.8;
            const result = { index: shannonIndex, level: isHigh ? '우수 (생태적 건강성 보장)' : '보통 (폴리네이터 및 유익충 서식지 확보 필요)' };
            setData(result);
            if (onResult) onResult({ habitatArea, speciesCount }, result);
            setLoading(false);
        }, 1400);
    };

    return (
        <div className="legacy-module">
            <h3>🦋 농장 생태 다양성 지수 분석</h3>
            <div className="form-grid mt-lg">
                <label>생물 서식 면적 (ha)</label><input type="number" step="0.1" className="item-input" value={habitatArea} onChange={e => setHabitatArea(Number(e.target.value))} />
                <label>관측된 유익종 수</label><input type="number" className="item-input" value={speciesCount} onChange={e => setSpeciesCount(Number(e.target.value))} />
            </div>
            <button className="btn btn-primary run-btn mt-lg" onClick={analyze} disabled={loading}>{loading ? '다양성 지수 연산 중...' : '생태 다양성 지수 평가'}</button>
            {data && (
                <div className="results-panel mt-lg">
                    <h4>🌍 생물 다양성 진단 결과</h4>
                    <ul><li>위버-섀넌 다양성 지수: <strong>{data.index}</strong></li><li style={{ color: data.index > 1.8 ? 'var(--accent-emerald)' : 'var(--accent-amber)', marginTop: '8px', fontWeight: 600 }}>지수 평가: {data.level}</li></ul>
                </div>
            )}
            <style jsx>{`.legacy-module{color:var(--text-primary)} h3{font-size:20px;font-weight:800;margin-bottom:8px} .form-grid{display:grid;grid-template-columns:140px 1fr;gap:16px;align-items:center;max-width:400px} label{font-size:13px;color:var(--text-secondary)} .item-input{padding:10px;border:1px solid var(--border-subtle);background:var(--bg-glass);border-radius:var(--radius-sm);color:#fff;font-family:inherit;width:100%} .run-btn{width:100%;max-width:400px;padding:12px} .results-panel{background:rgba(0,0,0,0.2);border:1px solid var(--accent-cyan);padding:20px;border-radius:var(--radius-md);max-width:400px; animation: fadeInUp .3s ease;} .results-panel h4{margin-top:0;font-size:14px;color:var(--accent-cyan);margin-bottom:12px} .results-panel ul{list-style:none;padding:0;margin:0} .results-panel li{margin-bottom:8px;font-size:13px} .mt-lg{margin-top:24px}`}</style>
        </div>
    );
}
