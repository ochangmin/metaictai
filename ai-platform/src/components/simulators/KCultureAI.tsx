'use client';
import { useState } from 'react';

const genres = ['K-Pop (아이돌 그룹)', 'K-Drama (로맨스/스릴러)', 'K-Movie (액션/오컬트)', 'K-Webtoon (판타지)'];
const castingTiers = ['글로벌 탑 티어 (A+급)', '국내 인지도 높음 (A급)', '라이징 스타 (B급)', '신인/인디 (C급)'];
const targetRegions = ['북미 (미국/캐나다)', '일본 (Japan)', '동남아시아 (SEA)', '유럽 (Europe)', '라틴 아메리카 (LATAM)'];

export default function KCultureAI() {
    const [genre, setGenre] = useState(0);
    const [casting, setCasting] = useState(1);
    const [region, setRegion] = useState(0);
    const [budget, setBudget] = useState(50);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        successProbability: number;
        viralPotential: number;
        roiEstimate: number;
        strategy: string[];
    }>(null);

    const simulate = () => {
        setLoading(true);
        setTimeout(() => {
            let success = 50 + (budget * 0.2);
            if (casting === 0) success += 25;
            if (casting === 1) success += 15;
            if (casting === 2) success += 5;

            // Region and Genre match modifiers
            if (region === 0 && genre === 0) success += 10;
            if (region === 1 && genre === 0) success += 15;
            if (region === 2 && genre === 1) success += 15;
            if (region === 3 && genre === 2) success += 10;
            if (region === 4 && genre === 0) success += 8;

            success = Math.min(99.9, success + (Math.random() * 5));
            const viral = Math.min(100, success * (1 + (Math.random() * 0.4)));
            const roi = (success * 1.5) * (budget / 50) * (casting === 0 ? 1.2 : 1.0);

            setResult({
                successProbability: success,
                viralPotential: viral,
                roiEstimate: roi,
                strategy: [
                    region === 0 ? '틱톡/쇼츠 기반의 댄스 챌린지 선행 캠페인 필수' :
                        region === 1 ? '현지 팬미팅 및 굿즈(MD) 연계 오프라인 프로모션' :
                            '해당 지역 인플루언서와의 유튜브 콜라보레이션',

                    casting === 3 ? '초기 마케팅 예산을 바이럴 및 SNS 광고에 집중 배분' :
                        '기존 팬덤을 활용한 프리오더 및 얼리버드 마케팅',

                    genre === 0 ? '뮤직비디오 세계관 티저를 영어 자막과 함께 다국어 동시 배포' :
                        '현지 OTT 플랫폼과의 독점 스트리밍 파트너십 구축'
                ]
            });
            setLoading(false);
        }, 1800);
    };

    return (
        <div className="sim-ui">
            <h3 className="panel-title">🎬 K-콘텐츠 흥행 예측 및 글로벌 전략</h3>

            <div className="form-section">
                <span className="fl">콘텐츠 장르 (Genre)</span>
                <div className="pill-row">
                    {genres.map((g, i) => (
                        <button key={i} className={`pill ${genre === i ? 'active' : ''}`} onClick={() => { setGenre(i); setResult(null); }}>
                            {g}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-section">
                <span className="fl">캐스팅/IP 파워 (Casting/IP)</span>
                <div className="pill-row">
                    {castingTiers.map((c, i) => (
                        <button key={i} className={`pill ${casting === i ? 'active' : ''}`} onClick={() => { setCasting(i); setResult(null); }}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-section">
                <span className="fl">주요 타겟 국가 (Target Region)</span>
                <div className="pill-row">
                    {targetRegions.map((r, i) => (
                        <button key={i} className={`pill ${region === i ? 'active' : ''}`} onClick={() => { setRegion(i); setResult(null); }}>
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <div className="sg">
                <div className="sh">
                    <span>초기 마케팅 예산 (Marketing Budget)</span>
                    <span className="sv">{budget} 억원</span>
                </div>
                <input
                    type="range"
                    className="slider"
                    min="10"
                    max="200"
                    step="10"
                    value={budget}
                    onChange={(e) => { setBudget(parseInt(e.target.value)); setResult(null); }}
                />
            </div>

            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>
                {loading ? '글로벌 소셜 데이터 분석 중...' : '🎬 빅데이터 흥행 예측 실행'}
            </button>

            {loading && (
                <div className="ld">
                    <div className="loader" />
                    <p>유튜브, X(트위터), 틱톡의 한류 트렌드 모델과 매칭 중입니다...</p>
                </div>
            )}

            {result && !loading && (
                <div className="results">
                    <div className="chart-container">
                        <div className="circular-chart">
                            <svg viewBox="0 0 36 36" className="circular-view">
                                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className="circle-val" strokeDasharray={`${result.successProbability}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <text x="18" y="20.35" className="percentage">{result.successProbability.toFixed(1)}%</text>
                            </svg>
                            <span className="chart-label">흥행 성공 확률</span>
                        </div>

                        <div className="stats-box">
                            <div className="stat-item">
                                <span className="stat-title">바이럴 포텐셜 (Viral)</span>
                                <span className="stat-val viral-val">{result.viralPotential.toFixed(1)} 점</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-title">예상 ROI (Return on Investment)</span>
                                <span className="stat-val roi-val">{result.roiEstimate.toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="sb">
                        <h4>🎯 맞춤형 글로벌 마케팅 전략</h4>
                        <ul className="strategy-list">
                            {result.strategy.map((s, i) => (
                                <li key={i}>
                                    <span className="strategy-icon">🚀</span>
                                    <span>{s}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <style jsx>{`
                .sim-ui { display: flex; flex-direction: column; gap: var(--space-lg); }
                .panel-title { font-size: 16px; font-weight: 700; color: var(--accent-purple); }
                .form-section { margin-bottom: var(--space-sm); }
                .fl { font-size: 13px; font-weight: 500; display: block; margin-bottom: 8px; }
                .pill-row { display: flex; flex-wrap: wrap; gap: 6px; }
                .pill { padding: 6px 12px; font-size: 11px; border-radius: var(--radius-full); background: var(--bg-glass); border: 1px solid var(--border-subtle); color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast); }
                .pill:hover { border-color: var(--border-medium); }
                .pill.active { background: rgba(171, 71, 188, 0.1); border-color: var(--accent-purple); color: var(--accent-purple); font-weight: 600; }
                .sg { margin: var(--space-sm) 0; }
                .sh { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px; }
                .sv { font-weight: 600; font-size: 12px; color: var(--accent-purple); }
                .slider { width: 100%; height: 6px; -webkit-appearance: none; background: var(--bg-glass-strong); border-radius: 3px; outline: none; }
                .slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: var(--accent-purple); cursor: pointer; }
                .run-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, rgba(171, 71, 188, 0.2), transparent); border-color: var(--accent-purple); color: var(--accent-purple); }
                .ld { text-align: center; padding: var(--space-2xl); }
                .loader { width: 40px; height: 40px; border: 3px solid var(--border-subtle); border-top-color: var(--accent-purple); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto var(--space-md); }
                .results { animation: fadeInUp 0.5s ease-out; }
                
                .chart-container { display: flex; align-items: center; gap: var(--space-xl); background: var(--bg-glass); padding: var(--space-xl); border-radius: var(--radius-md); margin-bottom: var(--space-xl); border: 1px solid var(--border-subtle); }
                .circular-chart { display: flex; flex-direction: column; align-items: center; gap: 8px; width: 120px; }
                .circular-view { display: block; margin: 0 auto; max-width: 100%; max-height: 250px; }
                .circle-bg { fill: none; stroke: var(--bg-glass-strong); stroke-width: 3.8; }
                .circle-val { fill: none; stroke: var(--accent-purple); stroke-width: 2.8; stroke-linecap: round; animation: progress 1.5s ease-out forwards; }
                .percentage { fill: var(--text-primary); font-family: var(--font-mono); font-size: 8px; text-anchor: middle; font-weight: 800; }
                .chart-label { font-size: 12px; font-weight: 600; color: var(--text-secondary); text-align: center; }
                
                .stats-box { display: flex; flex-direction: column; gap: 16px; flex: 1; }
                .stat-item { display: flex; flex-direction: column; gap: 4px; }
                .stat-title { font-size: 12px; color: var(--text-tertiary); }
                .stat-val { font-size: 24px; font-weight: 800; font-family: var(--font-mono); }
                .viral-val { color: var(--accent-rose); }
                .roi-val { color: var(--accent-emerald); }
                
                .sb h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px; }
                .strategy-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; }
                .strategy-list li { display: flex; gap: 12px; font-size: 13px; color: var(--text-secondary); background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; align-items: flex-start; line-height: 1.5; }
                .strategy-icon { font-size: 16px; }
                
                @keyframes progress { 0% { stroke-dasharray: 0 100; } }
                @media (max-width: 600px) { .chart-container { flex-direction: column; text-align: center; } .stats-box { width: 100%; align-items: center; } }
            `}</style>
        </div>
    );
}
