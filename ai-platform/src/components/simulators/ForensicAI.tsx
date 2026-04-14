'use client';
import { useState } from 'react';
export default function ForensicAI() {
    const [evidenceType, setEvidenceType] = useState<'image' | 'document' | 'network'>('image');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { integrity: number; tampering: string; metadata: { key: string; value: string }[]; timeline: { time: string; event: string }[] }>(null);
    const analyze = () => {
        setLoading(true); setTimeout(() => {
            setResult({
                integrity: 85 + Math.random() * 14, tampering: Math.random() > 0.7 ? '변조 의심' : '원본 확인',
                metadata: evidenceType === 'image' ? [{ key: 'EXIF 버전', value: '2.31' }, { key: '촬영 일시', value: '2026-03-15 14:32:11' }, { key: '해상도', value: '4032 × 3024' }, { key: 'GPS', value: '37.5665°N, 126.9780°E' }]
                    : evidenceType === 'document' ? [{ key: '작성자', value: 'admin@corp.com' }, { key: '생성일', value: '2026-01-10' }, { key: '수정 횟수', value: '7' }, { key: '해시', value: 'SHA-256: a3f2...' }]
                        : [{ key: '소스 IP', value: '192.168.1.105' }, { key: '대상 IP', value: '10.0.0.1' }, { key: '프로토콜', value: 'HTTPS' }, { key: '패킷 수', value: '2,847' }],
                timeline: [{ time: '14:30:00', event: '파일 생성' }, { time: '14:32:11', event: '최초 접근' }, { time: '15:10:44', event: '내용 수정' }, { time: '16:05:22', event: '외부 전송' }]
            }); setLoading(false);
        }, 1800);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">증거 유형</h3>
            <div className="pill-row">{(['image', 'document', 'network'] as const).map(t => (<button key={t} className={`pill ${evidenceType === t ? 'active' : ''}`} onClick={() => { setEvidenceType(t); setResult(null); }}>{t === 'image' ? '🖼️ 이미지' : t === 'document' ? '📄 문서' : '🌐 네트워크'}</button>))}</div>
            <button className="btn btn-primary run-btn" onClick={analyze} disabled={loading}>{loading ? '분석 중...' : '🔍 포렌식 분석 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>디지털 증거를 분석 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">무결성</span><span className="sv2" style={{ color: 'var(--accent-emerald)' }}>{result.integrity.toFixed(1)}%</span></div>
                    <div className="sc"><span className="sl">변조 여부</span><span className={`sv2 ${result.tampering === '원본 확인' ? 'safe' : 'warn'}`}>{result.tampering}</span></div>
                </div>
                <div className="sb"><h4>📋 메타데이터</h4>{result.metadata.map(m => (<div key={m.key} className="meta-row"><span className="mk">{m.key}</span><span className="mv">{m.value}</span></div>))}</div>
                <div className="sb"><h4>🕐 타임라인</h4><div className="timeline">{result.timeline.map((t, i) => (<div key={i} className="tl-item"><span className="tl-dot" /><span className="tl-time">{t.time}</span><span className="tl-event">{t.event}</span></div>))}</div></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .pill-row{display:flex;gap:6px;margin-bottom:var(--space-sm)}.pill{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-rose-dim);border-color:var(--accent-rose);color:var(--accent-rose)}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-rose);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:18px;font-weight:700}.safe{color:var(--accent-emerald)}.warn{color:var(--accent-rose)}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .meta-row{display:flex;justify-content:space-between;padding:8px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:4px;font-size:13px}
        .mk{font-weight:600;color:var(--text-tertiary)}.mv{font-family:var(--font-mono);color:var(--text-secondary)}
        .timeline{border-left:2px solid var(--border-medium);padding-left:var(--space-md);margin-left:8px}.tl-item{display:flex;align-items:center;gap:var(--space-sm);margin-bottom:12px;position:relative}
        .tl-dot{width:10px;height:10px;border-radius:50%;background:var(--accent-rose);position:absolute;left:calc(-1 * var(--space-md) - 6px)}.tl-time{font-family:var(--font-mono);font-size:12px;color:var(--accent-cyan);min-width:70px}.tl-event{font-size:13px;color:var(--text-secondary)}
      `}</style>
        </div>
    );
}
