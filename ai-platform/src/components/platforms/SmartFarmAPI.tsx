'use client';
import { useState } from 'react';

export default function SmartFarmAPI({ onResult }: any) {
    const [farmId, setFarmId] = useState('SF_001A');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const fetchData = () => {
        setLoading(true);
        setTimeout(() => {
            const result = { temp: '22.4℃', humidity: '70%', co2: '450 ppm', light: '15,000 lx', status: '컨트롤러 정상 가동 중' };
            setData(result);
            if (onResult) onResult({ endpoint: '/smartfarm/sensors', farmId }, result);
            setLoading(false);
        }, 1100);
    };

    return (
        <div className="legacy-module">
            <h3>📈 스마트팜 IoT 센서망 API 연동</h3>
            <div className="form-group mt-lg">
                <label>농장 고유 ID (센서 노드)</label>
                <input type="text" className="item-input" value={farmId} onChange={e => setFarmId(e.target.value)} />
            </div>
            <button className="btn btn-primary run-btn" onClick={fetchData} disabled={loading}>{loading ? '센서망 통신 중...' : 'IoT 센서 실시간 수집'}</button>
            {data && (
                <div className="results-panel mt-lg">
                    <h4>✅ 농장 내부 환경 수집 완료</h4>
                    <ul><li>내부 온도: {data.temp}</li><li>내부 습도: {data.humidity}</li><li>CO2 농도: {data.co2}</li><li>광량: {data.light}</li><li className="status-text">{data.status}</li></ul>
                </div>
            )}
            <style jsx>{`.legacy-module{color:var(--text-primary)} h3{font-size:20px;font-weight:800;margin-bottom:8px} .form-group{margin-bottom:16px} label{display:block;font-size:12px;margin-bottom:6px;color:var(--text-tertiary)} .item-input{width:100%;max-width:320px;padding:10px 14px;border:1px solid var(--border-subtle);background:var(--bg-glass);border-radius:var(--radius-sm);color:#fff;font-family:inherit} .run-btn{margin-top:8px;width:100%;max-width:320px;padding:12px} .results-panel{background:rgba(0,0,0,0.2);border:1px solid var(--accent-cyan);padding:20px;border-radius:var(--radius-md);max-width:400px} .results-panel h4{font-size:14px;color:var(--accent-cyan);margin-bottom:12px} .results-panel ul{list-style:none;padding:0;margin:0} .results-panel li{margin-bottom:8px;font-size:13px} .status-text{margin-top:12px!important;color:var(--accent-emerald)!important;font-weight:600} .mt-lg{margin-top:24px}`}</style>
        </div>
    );
}
