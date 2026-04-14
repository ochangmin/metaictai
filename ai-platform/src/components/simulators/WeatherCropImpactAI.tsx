'use client';
import { useState } from 'react';

export default function WeatherCropImpactAI() {
    const [region, setRegion] = useState('');
    const [date, setDate] = useState('');
    const [stage, setStage] = useState<'idle' | 'collecting' | 'done'>('idle');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [result, setResult] = useState<any>(null);

    const handleSearch = (v: string) => {
        setRegion(v);
        if (v.trim().length > 0) {
            setSuggestions(
                ['서울특별시', '제주특별자치도', '전라남도 나주시', '경상북도 안동시', '강원도 춘천시', '경기도 수원시 영통구']
                    .filter(s => s.includes(v))
            );
        } else {
            setSuggestions([]);
        }
    };

    const confirmRegion = (s: string) => {
        setRegion(s);
        setSuggestions([]);
    };

    const collectData = () => {
        if (!region || !date) return alert('조회대상지역과 기준일자를 모두 입력해주세요.');
        setStage('collecting');
        setResult(null);
        setTimeout(() => {
            setResult({
                targetRegion: region,
                targetDate: date,
                weather: {
                    temp: (15 + Math.random() * 15).toFixed(1),
                    humidity: (40 + Math.random() * 40).toFixed(0),
                    windSpeed: (1 + Math.random() * 5).toFixed(1),
                },
                crop: {
                    index: (70 + Math.random() * 25).toFixed(0),
                    soilMoisture: (20 + Math.random() * 60).toFixed(1),
                    status: Math.random() > 0.5 ? '양호' : '주의',
                },
                hourly: [
                    { time: '09:00', condition: '☀️ 맑음', precip: 0 },
                    { time: '12:00', condition: '⛅ 구름조금', precip: 10 },
                    { time: '15:00', condition: '☁️ 흐림', precip: 30 },
                    { time: '18:00', condition: '🌧️ 비', precip: 80 }
                ]
            });
            setStage('done');
        }, 2200);
    };

    return (
        <div className="sim-ui">
            <div className="panel-header">
                <h3>🌍 기상청 OpenAPI 작황 데이터 수집기</h3>
                <p>기준일자와 조회대상지역을 선택해 실시간 API 기반 농작물 기상 영향을 수집합니다.</p>
            </div>

            <div className="api-form glass-card">
                <div className="form-row">
                    <div className="input-group">
                        <label>📍 조회대상지역 검색</label>
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="지역명 입력 (예: 제주, 안동)"
                                value={region}
                                onChange={e => handleSearch(e.target.value)}
                            />
                            {suggestions.length > 0 && (
                                <ul className="suggestions">
                                    {suggestions.map(s => (
                                        <li key={s} onClick={() => confirmRegion(s)}>{s}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="input-group">
                        <label>📅 기준일자 선택</label>
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className="btn btn-primary api-btn"
                    onClick={collectData}
                    disabled={stage === 'collecting'}
                >
                    {stage === 'collecting' ? '데이터 수집 중 (Connecting to API...)' : '📡 데이터 수집 실행'}
                </button>
            </div>

            {stage === 'collecting' && (
                <div className="loading-state glass-card">
                    <div className="loader" />
                    <p>기상청 작황 API에서 <strong>{region}</strong>의 {date} 데이터를 수집하고 있습니다...</p>
                </div>
            )}

            {stage === 'done' && result && (
                <div className="api-results">
                    <h4>✅ 수집 완료: {result.targetRegion} ({result.targetDate})</h4>
                    <div className="data-grid">
                        <div className="data-card">
                            <span>🌡️ 평균 기온</span>
                            <strong>{result.weather.temp}°C</strong>
                        </div>
                        <div className="data-card">
                            <span>💧 상대 습도</span>
                            <strong>{result.weather.humidity}%</strong>
                        </div>
                        <div className="data-card">
                            <span>🌱 토양 수분</span>
                            <strong>{result.crop.soilMoisture}%</strong>
                        </div>
                        <div className="data-card">
                            <span>🌾 작황 지수</span>
                            <strong style={{ color: result.crop.status === '양호' ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                                {result.crop.index}점 ({result.crop.status})
                            </strong>
                        </div>
                    </div>

                    <div className="hourly-forecast">
                        <h5>시간대별 기상 및 강수 확률</h5>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>시간</th>
                                    <th>기상 상태</th>
                                    <th>강수 확률</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.hourly.map((h: any, i: number) => (
                                    <tr key={i}>
                                        <td>{h.time}</td>
                                        <td>{h.condition}</td>
                                        <td>
                                            <div className="progress-bg"><div className="progress-fill" style={{ width: `${h.precip}%`, background: h.precip > 50 ? 'var(--accent-cyan)' : 'var(--text-tertiary)' }} /></div>
                                            <span style={{ fontSize: '12px' }}>{h.precip}%</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <style jsx>{`
        .sim-ui { display: flex; flex-direction: column; gap: var(--space-xl); animation: fadeIn 0.5s; }
        .panel-header h3 { font-size: 20px; font-weight: 800; margin-bottom: 8px; color: var(--accent-cyan); }
        .panel-header p { font-size: 14px; color: var(--text-secondary); }
        .api-form { padding: var(--space-xl); border: 1px solid var(--border-medium); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); margin-bottom: var(--space-xl); }
        .input-group label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: var(--text-secondary); }
        .input-group input { width: 100%; padding: 12px 16px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); color: #fff; border-radius: var(--radius-sm); font-size: 14px; transition: border 0.3s; }
        .input-group input:focus { outline: none; border-color: var(--accent-cyan); box-shadow: 0 0 0 2px rgba(0,229,255,0.2); }
        
        .search-box { position: relative; }
        .suggestions { position: absolute; top: 100%; left: 0; right: 0; background: var(--bg-primary); border: 1px solid var(--border-medium); border-top: none; border-radius: 0 0 var(--radius-sm) var(--radius-sm); max-height: 200px; overflow-y: auto; z-index: 10; list-style: none; padding: 0; margin: 0; box-shadow: var(--shadow-lg); }
        .suggestions li { padding: 12px 16px; font-size: 13px; cursor: pointer; border-bottom: 1px solid var(--border-subtle); }
        .suggestions li:hover { background: rgba(0,229,255,0.1); color: var(--accent-cyan); }
        
        .api-btn { width: 100%; padding: 16px; font-size: 15px; font-weight: 700; letter-spacing: 0.5px; }
        
        .loading-state { padding: 40px; text-align: center; border: 1px solid var(--accent-cyan); background: rgba(0,229,255,0.05); border-radius: var(--radius-md); }
        .loader { width: 40px; height: 40px; border: 4px solid var(--border-subtle); border-top-color: var(--accent-cyan); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px; }
        
        .api-results { animation: fadeInUp 0.5s ease-out; }
        .api-results h4 { font-size: 18px; margin-bottom: var(--space-lg); border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; }
        .data-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-md); margin-bottom: var(--space-2xl); }
        .data-card { background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); padding: var(--space-lg); border-radius: var(--radius-md); text-align: center; display: flex; flex-direction: column; gap: 8px; }
        .data-card span { font-size: 12px; color: var(--text-tertiary); font-weight: 500; }
        .data-card strong { font-size: 24px; font-weight: 800; font-family: var(--font-mono); color: #fff; }
        
        .hourly-forecast h5 { font-size: 15px; margin-bottom: var(--space-md); color: var(--text-secondary); }
        .data-table { width: 100%; border-collapse: collapse; background: rgba(0,0,0,0.2); border-radius: var(--radius-md); overflow: hidden; }
        .data-table th, .data-table td { padding: 12px 16px; text-align: left; font-size: 13px; border-bottom: 1px solid var(--border-subtle); }
        .data-table th { background: rgba(255,255,255,0.05); font-weight: 600; color: var(--text-secondary); }
        .data-table td:last-child { display: flex; align-items: center; gap: 12px; }
        
        .progress-bg { flex: 1; height: 6px; background: var(--bg-glass-strong); border-radius: 3px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 3px; transition: width 1s ease-out; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } .data-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
        </div>
    );
}
