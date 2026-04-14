'use client';
import { useState } from 'react';
export default function AnomalyDetectAI() {
    const [dataType, setDataType] = useState<'server' | 'iot' | 'finance'>('server');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { timeSeries: { val: number; anomaly: boolean }[]; anomalyCount: number; accuracy: number; causes: { label: string; prob: number }[] }>(null);
    const detect = () => {
        setLoading(true); setTimeout(() => {
            const ts = Array.from({ length: 50 }, (_, i) => {
                const base = Math.sin(i * 0.3) * 30 + 50; const isAnomaly = Math.random() < 0.08;
                return { val: isAnomaly ? base + (Math.random() > 0.5 ? 40 : -35) : base + Math.random() * 10 - 5, anomaly: isAnomaly };
            });
            setResult({
                timeSeries: ts, anomalyCount: ts.filter(t => t.anomaly).length, accuracy: 94 + Math.random() * 5,
                causes: dataType === 'server' ? [{ label: 'CPU 과부하', prob: 0.72 }, { label: 'DDoS 공격', prob: 0.18 }, { label: '메모리 누수', prob: 0.1 }] :
                    dataType === 'iot' ? [{ label: '센서 오작동', prob: 0.65 }, { label: '배터리 저하', prob: 0.25 }, { label: '연결 불안정', prob: 0.1 }] :
                        [{ label: '시장 급변', prob: 0.55 }, { label: '이상 거래', prob: 0.35 }, { label: '시스템 오류', prob: 0.1 }]
            }); setLoading(false);
        }, 1800);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">데이터 소스</h3>
            <div className="pill-row">{(['server', 'iot', 'finance'] as const).map(t => (<button key={t} className={`pill ${dataType === t ? 'active' : ''}`} onClick={() => { setDataType(t); setResult(null); }}>{t === 'server' ? '🖥️ 서버 로그' : t === 'iot' ? '📡 IoT 센서' : '💹 금융 데이터'}</button>))}</div>
            <button className="btn btn-primary run-btn" onClick={detect} disabled={loading}>{loading ? '탐지 중...' : '🎯 이상 탐지 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>시계열 이상 패턴을 탐지 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">이상 탐지 수</span><span className="sv2" style={{ color: 'var(--accent-rose)' }}>{result.anomalyCount}</span></div>
                    <div className="sc"><span className="sl">탐지 정확도</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.accuracy.toFixed(1)}%</span></div>
                </div>
                <div className="sb"><h4>📈 시계열 + 이상 지점</h4><div className="ts-chart">{result.timeSeries.map((t, i) => (<div key={i} className={`ts-bar ${t.anomaly ? 'anomaly' : ''}`} style={{ height: `${t.val * 0.7 + 5}px` }} />))}</div></div>
                <div className="sb"><h4>🔍 원인 분석</h4>{result.causes.map(c => (<div key={c.label} className="cause-item"><span className="cause-label">{c.label}</span><div className="cause-bar"><div className="cause-fill" style={{ width: `${c.prob * 100}%` }} /></div><span className="cause-pct">{(c.prob * 100).toFixed(0)}%</span></div>))}</div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .pill-row{display:flex;gap:6px;margin-bottom:var(--space-sm)}.pill{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-rose-dim);border-color:var(--accent-rose);color:var(--accent-rose)}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-rose);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:24px;font-weight:700}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .ts-chart{display:flex;align-items:flex-end;gap:2px;height:80px;padding:var(--space-sm);background:var(--bg-glass);border-radius:var(--radius-sm)}
        .ts-bar{flex:1;min-width:4px;border-radius:1px;background:var(--accent-cyan);transition:all var(--transition-fast)}.ts-bar.anomaly{background:var(--accent-rose);box-shadow:0 0 6px var(--accent-rose)}
        .cause-item{display:flex;align-items:center;gap:var(--space-md);padding:8px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:6px;font-size:13px}
        .cause-label{min-width:100px;font-weight:600}.cause-bar{flex:1;height:6px;background:var(--bg-glass-strong);border-radius:3px;overflow:hidden}.cause-fill{height:100%;background:var(--accent-rose);border-radius:3px;transition:width 1s ease-out}
        .cause-pct{font-family:var(--font-mono);font-size:12px;color:var(--text-tertiary);min-width:40px;text-align:right}
      `}</style>
        </div>
    );
}
