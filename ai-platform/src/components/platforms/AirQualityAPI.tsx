'use client';
import { useState } from 'react';

export default function AirQualityAPI({ onResult }: any) {
    const [stationId, setStationId] = useState('수도권 1권역');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const fetchData = () => {
        setLoading(true);
        setTimeout(() => {
            const result = { pm10: '38 ㎍/㎥ (좋음)', pm25: '15 ㎍/㎥ (좋음)', o3: '0.04 ppm', no2: '0.02 ppm', status: '농작물 대기 환경 안전' };
            setData(result);
            if (onResult) onResult({ endpoint: '/keco/air', stationId }, result);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="legacy-module">
            <h3>🌍 에어코리아 대기질 API 연동</h3>
            <div className="form-group mt-lg">
                <label>관측소 권역 선택</label>
                <select className="item-input" value={stationId} onChange={e => setStationId(e.target.value)}>
                    <option>수도권 1권역</option><option>충청권 농업지대</option><option>전북·전남 평야지대</option>
                </select>
            </div>
            <button className="btn btn-primary run-btn" onClick={fetchData} disabled={loading}>{loading ? '수집 중...' : '대기질 데이터 수집'}</button>
            {data && (
                <div className="results-panel mt-lg">
                    <h4>✅ 대기질 분석 결과</h4>
                    <ul><li>미세먼지(PM10): {data.pm10}</li><li>초미세먼지(PM2.5): {data.pm25}</li><li>오존(O3): {data.o3}</li><li className="status-text">{data.status}</li></ul>
                </div>
            )}
            <style jsx>{`.legacy-module{color:var(--text-primary)} h3{font-size:20px;font-weight:800;margin-bottom:8px} .form-group{margin-bottom:16px} label{display:block;font-size:12px;margin-bottom:6px;color:var(--text-tertiary)} .item-input{width:100%;max-width:320px;padding:10px 14px;border:1px solid var(--border-subtle);background:var(--bg-glass);border-radius:var(--radius-sm);color:#fff;font-family:inherit} .run-btn{margin-top:8px;width:100%;max-width:320px;padding:12px} .results-panel{background:rgba(0,0,0,0.2);border:1px solid var(--accent-cyan);padding:20px;border-radius:var(--radius-md);max-width:400px} .results-panel h4{font-size:14px;color:var(--accent-cyan);margin-bottom:12px} .results-panel ul{list-style:none;padding:0;margin:0} .results-panel li{margin-bottom:8px;font-size:13px} .status-text{margin-top:12px!important;color:var(--accent-emerald)!important;font-weight:600} .mt-lg{margin-top:24px}`}</style>
        </div>
    );
}
