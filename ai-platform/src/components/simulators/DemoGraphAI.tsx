'use client';
import { useState } from 'react';

const regions = ['수도권 (서울/경기)', '지방 대도시 (부산/대구 등)', '중소도시 (인구 50만 미만)', '인구감소지역 (지방 소멸 위기)'];
const policies = ['현상 유지 (정책 변화 없음)', '출산 지원금/복지 대폭 확대', '외국인 이민자 적극 수용', '수도권 분산 균형 발전 정책'];

export default function DemoGraphAI() {
    const [region, setRegion] = useState(0);
    const [policy, setPolicy] = useState(0);
    const [yearLine, setYearLine] = useState(2050);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        populationChange: number;
        avgAge: number;
        realEstateDemand: number;
        infrastructureStatus: string;
    }>(null);

    const simulate = () => {
        setLoading(true);
        setTimeout(() => {
            const yearsDiff = yearLine - 2024;
            let popChangeRatio = 0; // % change

            // Base region penalty
            if (region === 0) popChangeRatio = -0.5 * yearsDiff; // Capital shrinks slowly
            if (region === 1) popChangeRatio = -1.2 * yearsDiff;
            if (region === 2) popChangeRatio = -2.0 * yearsDiff;
            if (region === 3) popChangeRatio = -3.5 * yearsDiff; // Extinction risk

            // Policy buffers
            if (policy === 1) popChangeRatio += (yearsDiff * 0.4);
            if (policy === 2) {
                if (region < 2) popChangeRatio += (yearsDiff * 0.8);
                else popChangeRatio += (yearsDiff * 0.3);
            }
            if (policy === 3 && region > 0) popChangeRatio += (yearsDiff * 1.5);
            if (policy === 3 && region === 0) popChangeRatio -= (yearsDiff * 0.5);

            let newAge = 44 + (yearsDiff * 0.6);
            if (policy === 2) newAge -= (yearsDiff * 0.2); // Immigrants lower avg age

            const estateDemand = 100 + popChangeRatio; // Base 100

            setResult({
                populationChange: popChangeRatio,
                avgAge: newAge,
                realEstateDemand: Math.max(0, estateDemand),
                infrastructureStatus: popChangeRatio < -50 ? '빈집 증가 및 학교/병원 통폐합 심각' :
                    popChangeRatio < -20 ? '인프라 유지 비용(조세) 급증 경고' :
                        popChangeRatio > 10 ? '주택/교통 인프라 부족, 추가 건설 필요' :
                            '안정적이나 고령화 맞춤 시설 전환 필요'
            });
            setLoading(false);
        }, 1800);
    };

    return (
        <div className="sim-ui">
            <h3 className="panel-title">👨‍👩‍👧‍👦 인구 및 부동산 변동 시뮬레이션</h3>

            <div className="form-section">
                <span className="fl">분석 대상 지역 (Region)</span>
                <div className="pill-row">
                    {regions.map((r, i) => (
                        <button key={i} className={`pill ${region === i ? 'active' : ''}`} onClick={() => { setRegion(i); setResult(null); }}>
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-section">
                <span className="fl">적용 사회 정책 (Policy Scenario)</span>
                <div className="pill-row">
                    {policies.map((p, i) => (
                        <button key={i} className={`pill ${policy === i ? 'active' : ''}`} onClick={() => { setPolicy(i); setResult(null); }}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className="sg">
                <div className="sh">
                    <span>예측 타겟 연도 (Target Year)</span>
                    <span className="sv">{yearLine} 년</span>
                </div>
                <input
                    type="range"
                    className="slider"
                    min="2030"
                    max="2100"
                    step="5"
                    value={yearLine}
                    onChange={(e) => { setYearLine(parseInt(e.target.value)); setResult(null); }}
                />
            </div>

            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>
                {loading ? '인구통계 데이터 투영 중...' : '👨‍👩‍👧‍👦 미래 인구/부동산 지표 시뮬레이션'}
            </button>

            {loading && (
                <div className="ld">
                    <div className="loader" />
                    <p>출산율, 사망률, 이동 데이터를 결합하여 미래 사회를 렌더링합니다...</p>
                </div>
            )}

            {result && !loading && (
                <div className="results">
                    <div className="grid-2x2">
                        <div className="data-card">
                            <span className="dc-icon">📉</span>
                            <span className="dc-label">인구 증감 (현재 대비)</span>
                            <span className="dc-val" style={{ color: result.populationChange > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                                {result.populationChange > 0 ? '+' : ''}{result.populationChange.toFixed(1)}%
                            </span>
                        </div>
                        <div className="data-card">
                            <span className="dc-icon">👵</span>
                            <span className="dc-label">기대 평균 연령 (중위수)</span>
                            <span className="dc-val" style={{ color: result.avgAge > 60 ? 'var(--accent-amber)' : 'var(--text-primary)' }}>
                                {result.avgAge.toFixed(1)} 세
                            </span>
                        </div>
                        <div className="data-card">
                            <span className="dc-icon">🏢</span>
                            <span className="dc-label">부동산 수요 지수 (기준 100)</span>
                            <span className="dc-val" style={{ color: result.realEstateDemand < 70 ? 'var(--accent-rose)' : 'var(--accent-blue)' }}>
                                {result.realEstateDemand.toFixed(1)}
                            </span>
                        </div>
                        <div className="data-card status-card">
                            <span className="dc-icon">🏥</span>
                            <span className="dc-label">도시 인프라 진단</span>
                            <span className="dc-desc">{result.infrastructureStatus}</span>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .sim-ui { display: flex; flex-direction: column; gap: var(--space-lg); }
                .panel-title { font-size: 16px; font-weight: 700; color: var(--accent-amber); }
                .form-section { margin-bottom: var(--space-sm); }
                .fl { font-size: 13px; font-weight: 500; display: block; margin-bottom: 8px; }
                .pill-row { display: flex; flex-wrap: wrap; gap: 6px; }
                .pill { padding: 6px 12px; font-size: 11px; border-radius: var(--radius-full); background: var(--bg-glass); border: 1px solid var(--border-subtle); color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast); }
                .pill:hover { border-color: var(--border-medium); }
                .pill.active { background: rgba(255, 193, 7, 0.1); border-color: var(--accent-amber); color: var(--accent-amber); font-weight: 600; }
                .sg { margin: var(--space-sm) 0; }
                .sh { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px; }
                .sv { font-weight: 600; font-size: 12px; color: var(--accent-amber); }
                .slider { width: 100%; height: 6px; -webkit-appearance: none; background: var(--bg-glass-strong); border-radius: 3px; outline: none; }
                .slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: var(--accent-amber); cursor: pointer; }
                .run-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, rgba(255, 193, 7, 0.2), transparent); border-color: var(--accent-amber); color: var(--accent-amber); }
                .ld { text-align: center; padding: var(--space-2xl); }
                .loader { width: 40px; height: 40px; border: 3px solid var(--border-subtle); border-top-color: var(--accent-amber); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto var(--space-md); }
                .results { animation: fadeInUp 0.5s ease-out; }
                
                .grid-2x2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }
                .data-card { display: flex; flex-direction: column; background: var(--bg-glass); border: 1px solid var(--border-subtle); padding: var(--space-lg); border-radius: var(--radius-md); transition: transform var(--transition-fast); }
                .data-card:hover { transform: translateY(-2px); border-color: var(--border-medium); }
                .dc-icon { font-size: 24px; margin-bottom: 8px; }
                .dc-label { font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; font-weight: 600; }
                .dc-val { font-size: 28px; font-weight: 800; font-family: var(--font-mono); line-height: 1; }
                .status-card { grid-column: span 2; background: rgba(255,193,7,0.05); border-left: 4px solid var(--accent-amber); }
                .dc-desc { font-size: 14px; color: var(--text-primary); font-weight: 500; line-height: 1.5; }
                
                @media (max-width: 600px) { .grid-2x2 { grid-template-columns: 1fr; } .status-card { grid-column: span 1; } }
            `}</style>
        </div>
    );
}
