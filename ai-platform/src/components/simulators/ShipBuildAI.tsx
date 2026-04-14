'use client';
import { useState } from 'react';

const shipTypes = ['컨테이너선 (Container)', 'LNG 운반선 (LNG Carrier)', '초대형 원유운반선 (VLCC)', '여객/크루즈선'];
const fuelTypes = ['기존 벙커C유 (HFO)', 'LNG И중연료 (Dual Fuel)', '암모니아 (Ammonia)', '메탄올 (Methanol)', '수소 연료전지 (Hydrogen)'];
const seaStates = ['잔잔한 바다 (Calm, Beaufort 2)', '일반 해상 (Moderate, Beaufort 4)', '거친 바다 (Rough, Beaufort 6)', '태풍권 (Typhoon, Beaufort 8+)'];

export default function ShipBuildAI() {
    const [shipType, setShipType] = useState(1);
    const [fuelType, setFuelType] = useState(2);
    const [seaState, setSeaState] = useState(1);
    const [speed, setSpeed] = useState(18);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        fuelConsumption: number;
        carbonEmissionDiff: number;
        hydroEfficiency: number;
        ciiRating: string;
    }>(null);

    const simulate = () => {
        setLoading(true);
        setTimeout(() => {
            // Speed penalty is exponential
            const speedFactor = Math.pow(speed / 15, 3);
            const seaFactor = [1.0, 1.15, 1.4, 1.8][seaState];
            const sizeFactor = [1.2, 1.5, 1.8, 1.0][shipType];

            // Baseline fuel usage tons/day
            const baseUsage = 40 * sizeFactor * speedFactor * seaFactor;

            // Emission reductions based on fuel
            // HFO: 0%, LNG: -25%, Ammonia: -85%, Methanol: -60%, Hydrogen: -99%
            const emissionsReductions = [0, -25, -85, -60, -99];
            const carbonDiff = emissionsReductions[fuelType];

            // Hydrodynamic efficiency (0-100)
            const hydro = Math.max(0, 100 - (seaFactor * 15) - (speed > 22 ? (speed - 22) * 5 : 0));

            // CII (Carbon Intensity Indicator) Rating: A-E
            let cii = 'C';
            if (carbonDiff <= -80) cii = 'A';
            else if (carbonDiff <= -50 || (fuelType === 1 && speed < 16)) cii = 'B';
            else if (carbonDiff === 0 && speed > 20) cii = 'E';
            else if (carbonDiff === 0 && speed > 16) cii = 'D';

            setResult({
                fuelConsumption: baseUsage,
                carbonEmissionDiff: carbonDiff,
                hydroEfficiency: hydro,
                ciiRating: cii
            });
            setLoading(false);
        }, 1800);
    };

    return (
        <div className="sim-ui">
            <h3 className="panel-title">🚢 조선·해양 유체역학 및 친환경 설계 시뮬레이션</h3>

            <div className="form-section">
                <span className="fl">선박 건조 유형 (Ship Type)</span>
                <div className="pill-row">
                    {shipTypes.map((s, i) => (
                        <button key={i} className={`pill ${shipType === i ? 'active' : ''}`} onClick={() => { setShipType(i); setResult(null); }}>
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-section">
                <span className="fl">추진 연료 시스템 (Eco-Fuel System)</span>
                <div className="pill-row">
                    {fuelTypes.map((f, i) => (
                        <button key={i} className={`pill ${fuelType === i ? 'active' : ''}`} onClick={() => { setFuelType(i); setResult(null); }}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-section">
                <span className="fl">해상 상태 (Sea State)</span>
                <div className="pill-row">
                    {seaStates.map((s, i) => (
                        <button key={i} className={`pill ${seaState === i ? 'active' : ''}`} onClick={() => { setSeaState(i); setResult(null); }}>
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="sg">
                <div className="sh">
                    <span>순항 속도 (Cruising Speed)</span>
                    <span className="sv">{speed} 노트 (Knots)</span>
                </div>
                <input
                    type="range"
                    className="slider"
                    min="10"
                    max="26"
                    step="1"
                    value={speed}
                    onChange={(e) => { setSpeed(parseInt(e.target.value)); setResult(null); }}
                />
            </div>

            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>
                {loading ? 'CFD(유체역학) 데이터 연산 중...' : '🚢 연비 최적화 및 탄소배출(CII) 시뮬레이션'}
            </button>

            {loading && (
                <div className="ld">
                    <div className="loader" />
                    <p>파랑 저항 및 선체 표면 마찰 계수를 계산하고 있습니다...</p>
                </div>
            )}

            {result && !loading && (
                <div className="results">
                    <div className="rating-banner">
                        <div className="banner-text">IMO CII (탄소집약도지수) 등급 예측</div>
                        <div className={`rating-badge grade-${result.ciiRating.toLowerCase()}`}>
                            {result.ciiRating} 등급
                        </div>
                    </div>

                    <div className="vessel-stats">
                        <div className="stat-card">
                            <span className="sc-label">일일 연료 소비량</span>
                            <span className="sc-val">{result.fuelConsumption.toFixed(1)} <span className="sc-unit">ton/day</span></span>
                            <div className="bar-bg"><div className="bar-fill" style={{ width: `${Math.min(100, result.fuelConsumption / 2)}%`, background: 'var(--accent-amber)' }}></div></div>
                        </div>
                        <div className="stat-card">
                            <span className="sc-label">탄소 배출량 (기존 HFO 대비)</span>
                            <span className="sc-val" style={{ color: result.carbonEmissionDiff < 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>{result.carbonEmissionDiff}%</span>
                            <div className="bar-bg"><div className="bar-fill" style={{ width: `${Math.abs(result.carbonEmissionDiff)}%`, background: result.carbonEmissionDiff < 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}></div></div>
                        </div>
                        <div className="stat-card">
                            <span className="sc-label">선형 유체역학 효율 (CFD)</span>
                            <span className="sc-val" style={{ color: 'var(--accent-cyan)' }}>{result.hydroEfficiency.toFixed(1)}%</span>
                            <div className="bar-bg"><div className="bar-fill" style={{ width: `${result.hydroEfficiency}%`, background: 'var(--accent-cyan)' }}></div></div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .sim-ui { display: flex; flex-direction: column; gap: var(--space-lg); }
                .panel-title { font-size: 16px; font-weight: 700; color: var(--accent-cyan); }
                .form-section { margin-bottom: var(--space-sm); }
                .fl { font-size: 13px; font-weight: 500; display: block; margin-bottom: 8px; }
                .pill-row { display: flex; flex-wrap: wrap; gap: 6px; }
                .pill { padding: 6px 12px; font-size: 11px; border-radius: var(--radius-full); background: var(--bg-glass); border: 1px solid var(--border-subtle); color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast); }
                .pill:hover { border-color: var(--border-medium); }
                .pill.active { background: rgba(0, 229, 255, 0.1); border-color: var(--accent-cyan); color: var(--accent-cyan); font-weight: 600; }
                .sg { margin: var(--space-sm) 0; }
                .sh { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px; }
                .sv { font-weight: 600; font-size: 12px; color: var(--accent-cyan); }
                .slider { width: 100%; height: 6px; -webkit-appearance: none; background: var(--bg-glass-strong); border-radius: 3px; outline: none; }
                .slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: var(--accent-cyan); cursor: pointer; }
                .run-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, rgba(0, 229, 255, 0.2), transparent); border-color: var(--accent-cyan); color: var(--accent-cyan); }
                .ld { text-align: center; padding: var(--space-2xl); }
                .loader { width: 40px; height: 40px; border: 3px solid var(--border-subtle); border-top-color: var(--accent-cyan); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto var(--space-md); }
                .results { animation: fadeInUp 0.5s ease-out; }
                
                .rating-banner { display: flex; align-items: center; justify-content: space-between; background: var(--bg-glass); border: 1px solid var(--border-subtle); padding: var(--space-lg); border-radius: var(--radius-md); margin-bottom: var(--space-xl); }
                .banner-text { font-size: 14px; font-weight: 600; color: var(--text-primary); }
                .rating-badge { padding: 8px 16px; border-radius: 20px; font-size: 18px; font-weight: 800; font-family: var(--font-mono); }
                .grade-a { background: rgba(0,230,118,0.2); color: #00e676; border: 1px solid #00e676; }
                .grade-b { background: rgba(139,195,74,0.2); color: #8bc34a; border: 1px solid #8bc34a; }
                .grade-c { background: rgba(255,235,59,0.2); color: #ffeb3b; border: 1px solid #ffeb3b; }
                .grade-d { background: rgba(255,152,0,0.2); color: #ff9800; border: 1px solid #ff9800; }
                .grade-e { background: rgba(255,82,82,0.2); color: #ff5252; border: 1px solid #ff5252; }
                
                .vessel-stats { display: flex; flex-direction: column; gap: var(--space-md); }
                .stat-card { display: flex; flex-direction: column; background: var(--bg-glass); padding: var(--space-md); border-radius: var(--radius-sm); border: 1px solid var(--border-medium); }
                .sc-label { font-size: 12px; color: var(--text-secondary); margin-bottom: 4px; }
                .sc-val { font-size: 20px; font-weight: 800; font-family: var(--font-mono); margin-bottom: 8px; }
                .sc-unit { font-size: 12px; font-weight: 500; color: var(--text-tertiary); }
                .bar-bg { width: 100%; height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; }
                .bar-fill { height: 100%; transition: width 1s ease-out; }
            `}</style>
        </div>
    );
}
