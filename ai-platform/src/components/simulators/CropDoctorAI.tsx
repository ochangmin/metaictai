'use client';
import { useState } from 'react';
const symptoms = ['🍂 잎 황변 (Chlorosis)', '🟤 갈변/반점 (Leaf Spot)', '🪱 구멍/식흔 (Insect Damage)', '📉 생장 저하 (Stunting)', '⚪ 흰가루 (Powdery Mildew)', '🔴 적변/괴사 (Necrosis)'];
const crops = ['🌾 벼', '🥬 배추', '🍅 토마토', '🌽 옥수수', '🍓 딸기', '🥒 오이'];
export default function CropDoctorAI() {
    const [crop, setCrop] = useState(0); const [symptom, setSymptom] = useState(0); const [severity, setSeverity] = useState(3);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { diagnosis: { disease: string; probability: number; cause: string }[]; treatment: { method: string; timing: string; detail: string }[]; prevention: string[]; riskLevel: string; spreadRisk: number; economicLoss: number }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const diagMap = [
                [{ disease: '철분 결핍', probability: 75, cause: '토양 pH 높음으로 철 흡수 장애' }, { disease: '질소 결핍', probability: 60, cause: '기비량 부족 또는 질소 유실' }, { disease: '마그네슘 결핍', probability: 35, cause: '산성 토양에서 Mg 용탈' }],
                [{ disease: '잿빛곰팡이병', probability: 82, cause: 'Botrytis cinerea 균 감염' }, { disease: '탄저병', probability: 65, cause: 'Colletotrichum 감염' }, { disease: '세균성 점무늬병', probability: 40, cause: '세균 전파 (고온다습)' }],
                [{ disease: '담배거세미나방', probability: 78, cause: '야행성 해충 유충 가해' }, { disease: '배추좀나방', probability: 62, cause: '십자화과 전문 해충' }, { disease: '진딧물', probability: 55, cause: '즙액 흡즙 및 바이러스 매개' }],
                [{ disease: '모자이크바이러스', probability: 70, cause: '진딧물 매개 바이러스 감염' }, { disease: '뿌리혹병', probability: 55, cause: '토양 전염성 곰팡이' }, { disease: '양분 경합', probability: 40, cause: '과밀 식재로 영양 경합' }],
                [{ disease: '흰가루병', probability: 88, cause: 'Erysiphe 속 곰팡이 감염' }, { disease: '노균병', probability: 45, cause: '습도 높은 환경에서 발생' }],
                [{ disease: '역병', probability: 72, cause: 'Phytophthora 감염 (토양)' }, { disease: '시들음병', probability: 58, cause: 'Fusarium 균 감염' }, { disease: '세균성 궤양병', probability: 35, cause: '세균성 병원체' }],
            ];
            const treatments = symptom < 2 ?
                [{ method: '약제 방제', timing: '즉시 (발견 3일 이내)', detail: `${symptom === 0 ? '킬레이트 철 엽면시비 500배액' : '만코제브 수화제 500배액'} 7일 간격 2~3회 살포` }, { method: '환경 관리', timing: '지속', detail: '환기 개선, 이슬 맺힘 방지, 토양 배수 확인' }]
                : symptom === 2 ? [{ method: '생물학적 방제', timing: '즉시', detail: 'BT(바실러스 튜링겐시스) 제제 살포 또는 천적 방사' }, { method: '물리적 방제', timing: '야간', detail: '페로몬 트랩 설치, 수확 후 잔재물 제거' }]
                    : [{ method: '종합 방제', timing: '7일 이내', detail: '저항성 품종 교체 및 토양 소독 실시' }, { method: '영양 관리', timing: '즉시', detail: '균형 시비 및 미량원소 보충' }];
            setResult({
                diagnosis: diagMap[symptom] || diagMap[0], treatment: treatments,
                prevention: ['저항성 품종 재배', '적정 재식 밀도 유지', '윤작 체계 도입', '예방적 약제 처리 (발생 전)'],
                riskLevel: severity > 3 ? '높음' : severity > 2 ? '보통' : '낮음',
                spreadRisk: severity * 15 + Math.random() * 20, economicLoss: severity * 8 + Math.random() * 10,
            }); setLoading(false);
        }, 2000);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">🩺 작물 진단</h3>
            <div className="form-section"><span className="fl">작물 선택</span><div className="pill-row">{crops.map((c, i) => (<button key={i} className={`pill ${crop === i ? 'active' : ''}`} onClick={() => { setCrop(i); setResult(null); }}>{c}</button>))}</div></div>
            <div className="form-section"><span className="fl">증상 선택</span><div className="symptom-grid">{symptoms.map((s, i) => (<button key={i} className={`symp-btn ${symptom === i ? 'active' : ''}`} onClick={() => { setSymptom(i); setResult(null); }}>{s}</button>))}</div></div>
            <div className="sg"><div className="sh"><span>심각도</span><span className="sv">{'⭐'.repeat(severity)} ({['', '경미', '약간', '보통', '심각', '매우 심각'][severity]})</span></div><input type="range" className="slider" min={1} max={5} value={severity} onChange={e => { setSeverity(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '진단 중...' : '🩺 AI 병해충 진단 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>증상을 분석하고 진단 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className={`risk-badge risk-${result.riskLevel === '높음' ? 'high' : result.riskLevel === '보통' ? 'mid' : 'low'}`}>위험도: {result.riskLevel} | 전파 위험: {result.spreadRisk.toFixed(0)}% | 예상 손실: {result.economicLoss.toFixed(0)}%</div>
                <div className="sb"><h4>🔬 진단 결과</h4>{result.diagnosis.map((d, i) => (
                    <div key={i} className="diag-item"><div className="diag-head"><span className="diag-name">{d.disease}</span><span className="diag-prob" style={{ color: d.probability > 70 ? 'var(--accent-rose)' : 'var(--accent-amber)' }}>{d.probability}%</span></div><span className="diag-cause">원인: {d.cause}</span></div>))}</div>
                <div className="sb"><h4>💊 치료 방안</h4>{result.treatment.map((t, i) => (
                    <div key={i} className="treat-item"><div className="treat-head"><span className="treat-method">{t.method}</span><span className="treat-time">{t.timing}</span></div><span className="treat-detail">{t.detail}</span></div>))}</div>
                <div className="sb"><h4>🛡️ 예방 대책</h4><div className="prev-list">{result.prevention.map((p, i) => (<div key={i} className="prev-item"><span className="prev-n">{i + 1}</span><span>{p}</span></div>))}</div></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .form-section{margin-bottom:var(--space-sm)}.fl{font-size:13px;font-weight:500;display:block;margin-bottom:8px}
        .pill-row{display:flex;flex-wrap:wrap;gap:6px}.pill{padding:6px 12px;font-size:11px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-emerald-dim);border-color:var(--accent-emerald);color:var(--accent-emerald)}
        .symptom-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}.symp-btn{padding:8px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);font-size:11px;cursor:pointer;transition:all var(--transition-fast);font-family:inherit;color:inherit;text-align:left}.symp-btn:hover{border-color:var(--border-medium)}.symp-btn.active{border-color:var(--accent-rose);background:var(--accent-rose-dim);color:var(--accent-rose)}
        .sg{margin:var(--space-sm) 0}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:600;font-size:12px;color:var(--accent-amber)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-rose);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-rose);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}
        .risk-badge{padding:var(--space-md);border-radius:var(--radius-md);font-size:14px;font-weight:600;text-align:center;margin-bottom:var(--space-xl)}.risk-high{background:var(--accent-rose-dim);border:1px solid rgba(255,82,82,.3);color:var(--accent-rose)}.risk-mid{background:var(--accent-amber-dim);border:1px solid rgba(255,196,0,.3);color:var(--accent-amber)}.risk-low{background:var(--accent-emerald-dim);border:1px solid rgba(0,230,118,.3);color:var(--accent-emerald)}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .diag-item{padding:12px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:6px}
        .diag-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}.diag-name{font-weight:700;font-size:14px}.diag-prob{font-family:var(--font-mono);font-size:16px;font-weight:800}.diag-cause{font-size:12px;color:var(--text-tertiary)}
        .treat-item{padding:12px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:6px;border-left:3px solid var(--accent-emerald)}
        .treat-head{display:flex;justify-content:space-between;margin-bottom:4px}.treat-method{font-weight:700;font-size:13px;color:var(--accent-emerald)}.treat-time{font-size:11px;color:var(--accent-amber);font-weight:600}.treat-detail{font-size:12px;color:var(--text-secondary);line-height:1.6}
        .prev-list{display:flex;flex-direction:column;gap:6px}.prev-item{display:flex;align-items:center;gap:var(--space-sm);padding:8px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);font-size:13px}
        .prev-n{width:22px;height:22px;border-radius:50%;background:var(--accent-cyan-dim);color:var(--accent-cyan);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0}
        @media(max-width:640px){.symptom-grid{grid-template-columns:1fr}}
      `}</style>
        </div>
    );
}
