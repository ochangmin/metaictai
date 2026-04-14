'use client';
import { useState } from 'react';

// Mock observatory data
const ALL_STATIONS = [
    { id: 'S001', region: '서울', name: '종로구 측정소', pm10: 45, pm25: 22, status: '보통', no2: 0.021, o3: 0.045 },
    { id: 'S002', region: '서울', name: '강남구 대기관측소', pm10: 82, pm25: 41, status: '나쁨', no2: 0.038, o3: 0.051 },
    { id: 'S003', region: '제주', name: '서귀포시 측정소', pm10: 20, pm25: 8, status: '좋음', no2: 0.008, o3: 0.030 },
    { id: 'S004', region: '부산', name: '해운대구 측정망', pm10: 105, pm25: 55, status: '매우나쁨', no2: 0.042, o3: 0.060 },
    { id: 'S005', region: '대전', name: '유성구 연구단지', pm10: 35, pm25: 15, status: '좋음', no2: 0.015, o3: 0.032 },
    { id: 'S006', region: '경기', name: '수원시 영통구', pm10: 55, pm25: 28, status: '보통', no2: 0.025, o3: 0.040 }
];

export default function ClimateTraceAI() {
    const [search, setSearch] = useState('');
    const [stations, setStations] = useState(ALL_STATIONS);
    const [selected, setSelected] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = (v: string) => {
        setSearch(v);
        if (v.trim() === '') {
            setStations(ALL_STATIONS);
        } else {
            setStations(ALL_STATIONS.filter(s =>
                s.name.includes(v) || s.region.includes(v) || s.id.includes(v)
            ));
        }
    };

    const fetchStationData = (station: any) => {
        setLoading(true);
        setSelected(null);
        setTimeout(() => {
            setSelected(station);
            setLoading(false);
        }, 1500);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case '좋음': return '#00e676';
            case '보통': return '#ffea00';
            case '나쁨': return '#ff9100';
            case '매우나쁨': return '#ff1744';
            default: return '#fff';
        }
    };

    return (
        <div className="sim-ui">
            <div className="panel-header">
                <h3>🏭 대기질 모니터링 허브</h3>
                <p>관측소를 검색하고 클릭하여 초미세먼지, 오존 등 실시간 환경 데이터를 조회합니다.</p>
            </div>

            <div className="dashboard-layout">
                {/* Left Panel: Search & List */}
                <div className="side-panel glass-card">
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="관측소명 또는 지역 검색..."
                            value={search}
                            onChange={e => handleSearch(e.target.value)}
                        />
                    </div>
                    
                    <div className="station-list">
                        <div className="list-header">검색된 관측소 ({stations.length})</div>
                        {stations.map(st => (
                            <button
                                key={st.id}
                                className={`station-item ${selected?.id === st.id ? 'active' : ''}`}
                                onClick={() => fetchStationData(st)}
                            >
                                <div className="st-info">
                                    <strong>{st.name}</strong>
                                    <span>#{st.id} · {st.region}</span>
                                </div>
                                <div className="st-badge" style={{ backgroundColor: getStatusColor(st.status) + '20', color: getStatusColor(st.status) }}>
                                    {st.status}
                                </div>
                            </button>
                        ))}
                        {stations.length === 0 && <div className="empty-state">검색 결과가 없습니다.</div>}
                    </div>
                </div>

                {/* Right Panel: Detail View */}
                <div className="detail-panel glass-card">
                    {!loading && !selected && (
                        <div className="empty-detail">
                            <div className="empty-icon">📍</div>
                            <p>좌측 목록에서 관측소를 선택하시면<br/>상세 대기질 성분 데이터가 표시됩니다.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="loading-detail">
                            <div className="loader" />
                            <p>실시간 관측소 데이터를 불러오고 있습니다...</p>
                        </div>
                    )}

                    {selected && !loading && (
                        <div className="station-detail">
                            <div className="detail-header">
                                <div>
                                    <h2>{selected.name}</h2>
                                    <p>{selected.region} · 관측소 ID: {selected.id} · <span style={{ color: 'var(--accent-cyan)' }}>실시간 연동 중 (Live)</span></p>
                                </div>
                                <div className="status-hero" style={{ borderColor: getStatusColor(selected.status), boxShadow: \`0 0 20px \${getStatusColor(selected.status)}30\` }}>
                                    <span>종합대기</span>
                                    <strong style={{ color: getStatusColor(selected.status) }}>{selected.status}</strong>
                                </div>
                            </div>
                            
                            <h4 className="section-title">측정 항목</h4>
                            <div className="metrics-grid">
                                <div className="metric-card">
                                    <span>미세먼지 (PM10)</span>
                                    <div className="val">
                                        <strong>{selected.pm10}</strong> <small>㎍/㎥</small>
                                    </div>
                                    <div className="bar-bg"><div className="bar-fill" style={{ width: \`\${Math.min(100, selected.pm10)}%\`, background: getStatusColor(selected.status) }} /></div>
                                </div>
                                <div className="metric-card">
                                    <span>초미세먼지 (PM2.5)</span>
                                    <div className="val">
                                        <strong>{selected.pm25}</strong> <small>㎍/㎥</small>
                                    </div>
                                    <div className="bar-bg"><div className="bar-fill" style={{ width: \`\${Math.min(100, selected.pm25 * 2)}%\`, background: getStatusColor(selected.status) }} /></div>
                                </div>
                                <div className="metric-card">
                                    <span>이산화질소 (NO₂)</span>
                                    <div className="val">
                                        <strong>{selected.no2}</strong> <small>ppm</small>
                                    </div>
                                </div>
                                <div className="metric-card">
                                    <span>오존 (O₃)</span>
                                    <div className="val">
                                        <strong>{selected.o3}</strong> <small>ppm</small>
                                    </div>
                                </div>
                            </div>

                            <div className="action-row">
                                <button className="btn btn-secondary" onClick={() => alert('과거 이력 조회를 시작합니다.')}>📊 주간 이력 조회</button>
                                <button className="btn btn-primary" onClick={() => alert('정책 시뮬레이션을 생성합니다.')}>🌍 환경 정책 AI 시뮬레이션</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        .sim-ui { display: flex; flex-direction: column; gap: var(--space-xl); animation: fadeIn 0.5s; height: 100%; }
        .panel-header h3 { font-size: 20px; font-weight: 800; margin-bottom: 8px; color: var(--accent-emerald); }
        .panel-header p { font-size: 14px; color: var(--text-secondary); }
        
        .dashboard-layout { display: flex; gap: var(--space-xl); min-height: 500px; }
        
        .side-panel { width: 350px; display: flex; flex-direction: column; padding: var(--space-md); border: 1px solid var(--border-medium); }
        .search-box { position: relative; margin-bottom: var(--space-md); }
        .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 14px; color: var(--text-tertiary); }
        .search-box input { width: 100%; padding: 12px 14px 12px 40px; background: rgba(0,0,0,0.4); border: 1px solid var(--border-medium); border-radius: var(--radius-sm); color: #fff; font-size: 14px; transition: border 0.3s; }
        .search-box input:focus { outline: none; border-color: var(--accent-emerald); }
        
        .station-list { flex: 1; display: flex; flex-direction: column; overflow-y: auto; gap: 8px; padding-right: 4px; }
        .station-list::-webkit-scrollbar { width: 6px; }
        .station-list::-webkit-scrollbar-thumb { background: var(--border-medium); border-radius: 3px; }
        .list-header { font-size: 11px; font-weight: 600; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 8px; margin-bottom: 4px; }
        
        .station-item { display: flex; justify-content: space-between; align-items: center; padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); cursor: pointer; transition: all 0.2s; text-align: left; }
        .station-item:hover { background: rgba(255,255,255,0.08); border-color: var(--border-medium); }
        .station-item.active { background: rgba(0,230,118,0.1); border-color: var(--accent-emerald); }
        .st-info { display: flex; flex-direction: column; gap: 4px; }
        .st-info strong { font-size: 14px; color: #fff; font-weight: 600; }
        .st-info span { font-size: 12px; color: var(--text-tertiary); font-family: var(--font-mono); }
        .st-badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        .empty-state { text-align: center; padding: 40px 20px; color: var(--text-tertiary); font-size: 13px; }

        .detail-panel { flex: 1; padding: var(--space-2xl); border: 1px solid var(--border-medium); display: flex; flex-direction: column; background: rgba(0,0,0,0.2); }
        .empty-detail, .loading-detail { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; color: var(--text-tertiary); }
        .empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.5; }
        .loader { width: 40px; height: 40px; border: 4px solid var(--border-subtle); border-top-color: var(--accent-emerald); border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }

        .station-detail { animation: fadeInUp 0.4s ease-out; display: flex; flex-direction: column; height: 100%; }
        .detail-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-xl); margin-bottom: var(--space-xl); }
        .detail-header h2 { font-size: 26px; font-weight: 800; margin-bottom: 8px; color: #fff; }
        .detail-header p { font-size: 14px; color: var(--text-secondary); font-family: var(--font-mono); }
        .status-hero { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100px; height: 100px; border: 2px solid; border-radius: 50%; background: #000; }
        .status-hero span { font-size: 11px; color: var(--text-tertiary); margin-bottom: 4px; }
        .status-hero strong { font-size: 20px; font-weight: 800; }

        .section-title { font-size: 16px; font-weight: 600; margin-bottom: var(--space-md); color: #fff; }
        .metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-bottom: auto; }
        .metric-card { background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: var(--space-xl); border-radius: var(--radius-md); }
        .metric-card span { display: block; font-size: 13px; color: var(--text-secondary); margin-bottom: 12px; font-weight: 500; }
        .val { display: flex; align-items: baseline; gap: 4px; margin-bottom: 12px; }
        .val strong { font-size: 32px; font-weight: 800; font-family: var(--font-mono); color: #fff; }
        .val small { font-size: 14px; color: var(--text-tertiary); }
        .bar-bg { width: 100%; height: 6px; background: var(--bg-glass-strong); border-radius: 3px; overflow: hidden; }
        .bar-fill { height: 100%; border-radius: 3px; transition: width 1s ease-out; }

        .action-row { display: flex; justify-content: flex-end; gap: var(--space-md); margin-top: var(--space-2xl); padding-top: var(--space-xl); border-top: 1px solid var(--border-subtle); }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        @media (max-width: 900px) { .dashboard-layout { flex-direction: column; } .side-panel { width: 100%; max-height: 400px; } .metrics-grid { grid-template-columns: 1fr; } }
      `}</style>
        </div >
    );
}
