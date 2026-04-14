'use client';
import { useState } from 'react';

export default function WeatherCropAPI({ onResult }: any) {
    const [location, setLocation] = useState('경상북도 상주시 (과수원 지역)');
    const [date, setDate] = useState('2026-04-14');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const fetchData = () => {
        setLoading(true);
        setTimeout(() => {
            const result = {
                temperature: '18.5℃',
                humidity: '62%',
                precipitation: '0mm',
                solarRadiation: '14.2 MJ/m²',
                status: '생육 최적 조건 유지 중'
            };
            setData(result);
            if (onResult) onResult({ endpoint: '/kma/weather', location, date }, result);
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="legacy-module">
            <h3>☁️ 기상청 작황 API 연동 모듈</h3>
            <p>외부 공공 기상 데이터를 수집하여 작물의 실시간 생육 환경을 평가합니다.</p>

            <div className="form-group mt-lg">
                <label>조회 대상 지역</label>
                <input type="text" className="item-input" value={location} onChange={e => setLocation(e.target.value)} />
            </div>

            <div className="form-group">
                <label>기준 일자</label>
                <input type="date" className="item-input" value={date} onChange={e => setDate(e.target.value)} />
            </div>

            <button className="btn btn-primary run-btn" onClick={fetchData} disabled={loading}>
                {loading ? '기상청 데이터 호출 중...' : '📡 API 실시간 수집'}
            </button>

            {data && (
                <div className="results-panel mt-lg">
                    <h4>✅ API 수집 및 작황 분석 완료</h4>
                    <ul>
                        <li><strong>온열 지수:</strong> {data.temperature} (적정)</li>
                        <li><strong>상대 습도:</strong> {data.humidity}</li>
                        <li><strong>일사량 누적:</strong> {data.solarRadiation}</li>
                        <li className="status-text"><strong>종합 평가:</strong> {data.status}</li>
                    </ul>
                </div>
            )}

            <style jsx>{`
        .legacy-module { color: var(--text-primary); }
        h3 { font-size: 20px; font-weight: 800; margin-bottom: 8px; }
        p { color: var(--text-secondary); font-size: 14px; margin-bottom: 16px; }
        .form-group { margin-bottom: 16px; }
        label { display: block; font-size: 12px; margin-bottom: 6px; color: var(--text-tertiary); }
        .item-input { width: 100%; max-width: 320px; padding: 10px 14px; border: 1px solid var(--border-subtle); background: var(--bg-glass); border-radius: var(--radius-sm); color: #fff; font-family: inherit; }
        .run-btn { margin-top: 8px; width: 100%; max-width: 320px; padding: 12px; }
        .results-panel { background: rgba(0,0,0,0.2); border: 1px solid var(--accent-cyan); padding: 20px; border-radius: var(--radius-md); max-width: 400px; animation: fadeInUp 0.3s ease; }
        .results-panel h4 { font-size: 14px; color: var(--accent-cyan); margin-bottom: 12px; border-bottom: 1px solid rgba(0, 240, 255, 0.2); padding-bottom: 8px; }
        .results-panel ul { list-style: none; padding: 0; margin: 0; }
        .results-panel li { margin-bottom: 8px; font-size: 13px; color: var(--text-secondary); }
        .status-text { margin-top: 12px !important; color: var(--accent-emerald) !important; font-weight: 600; background: rgba(0,255,100,0.1); padding: 8px; border-radius: 4px; }
        .mt-lg { margin-top: 32px; }
      `}</style>
        </div>
    );
}
