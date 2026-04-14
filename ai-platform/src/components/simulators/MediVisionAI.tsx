'use client';

import { useState } from 'react';

const mockImages = [
    { name: 'Chest X-Ray #1', type: 'X-Ray', emoji: '🫁' },
    { name: 'Brain MRI #1', type: 'MRI', emoji: '🧠' },
    { name: 'Retinal Scan #1', type: 'Fundus', emoji: '👁️' },
];

export default function MediVisionAI() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        findings: { label: string; confidence: number; severity: string; x: number; y: number; w: number; h: number }[];
        overallRisk: string;
        recommendation: string;
    }>(null);

    const analyze = () => {
        if (selectedImage === null) return;
        setLoading(true);
        setTimeout(() => {
            const type = mockImages[selectedImage].type;
            const findings = type === 'X-Ray' ? [
                { label: '폐 결절 의심', confidence: 87.3, severity: '주의', x: 35, y: 30, w: 15, h: 15 },
                { label: '흉수 가능성', confidence: 62.1, severity: '관찰', x: 20, y: 60, w: 30, h: 20 },
            ] : type === 'MRI' ? [
                { label: '신호 강도 이상', confidence: 91.5, severity: '주의', x: 40, y: 25, w: 20, h: 18 },
                { label: '미세 출혈 의심', confidence: 55.8, severity: '관찰', x: 55, y: 50, w: 12, h: 12 },
            ] : [
                { label: '미세혈관류 발견', confidence: 78.9, severity: '주의', x: 30, y: 35, w: 10, h: 10 },
                { label: '삼출물 의심', confidence: 68.4, severity: '관찰', x: 55, y: 45, w: 14, h: 14 },
                { label: '시신경 유두 부종', confidence: 45.2, severity: '관찰', x: 42, y: 42, w: 16, h: 16 },
            ];
            setResult({
                findings,
                overallRisk: findings.some(f => f.confidence > 80) ? '중간' : '낮음',
                recommendation: type === 'X-Ray'
                    ? 'CT 추가 검사를 권장합니다. 폐 결절의 정밀 분석이 필요합니다.'
                    : type === 'MRI'
                        ? '신경외과 전문의 상담을 권장합니다.'
                        : '안과 전문의의 정밀 검사를 권장합니다.',
            });
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="medi-sim">
            <h3 className="panel-title">의료 이미지 선택</h3>
            <div className="image-select">
                {mockImages.map((img, i) => (
                    <button
                        key={i}
                        className={`img-option ${selectedImage === i ? 'active' : ''}`}
                        onClick={() => { setSelectedImage(i); setResult(null); }}
                    >
                        <span className="img-emoji">{img.emoji}</span>
                        <span className="img-name">{img.name}</span>
                        <span className="img-type">{img.type}</span>
                    </button>
                ))}
            </div>

            <button className="btn btn-primary run-btn" onClick={analyze} disabled={selectedImage === null || loading}>
                {loading ? '분석 중...' : '🩺 AI 진단 분석 실행'}
            </button>

            {loading && (
                <div className="loading-state">
                    <div className="loader" />
                    <p>AI가 의료 이미지를 분석 중입니다...</p>
                </div>
            )}

            {result && !loading && (
                <div className="medi-results">
                    {/* Image with bounding boxes */}
                    <div className="image-viewer">
                        <div className="mock-image">
                            <span className="mock-bg-emoji">{mockImages[selectedImage!].emoji}</span>
                            {result.findings.map((f, i) => (
                                <div
                                    key={i}
                                    className={`bbox ${f.severity === '주의' ? 'warn' : 'info'}`}
                                    style={{ left: `${f.x}%`, top: `${f.y}%`, width: `${f.w}%`, height: `${f.h}%` }}
                                >
                                    <span className="bbox-label">{f.label} ({f.confidence.toFixed(1)}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Findings */}
                    <div className="findings-panel">
                        <div className="findings-header">
                            <h3>🔍 분석 결과</h3>
                            <span className={`risk-badge ${result.overallRisk === '중간' ? 'med' : 'low'}`}>
                                위험도: {result.overallRisk}
                            </span>
                        </div>
                        {result.findings.map((f, i) => (
                            <div key={i} className="finding-item">
                                <div className="finding-top">
                                    <span className={`severity-dot ${f.severity === '주의' ? 'warn' : 'info'}`} />
                                    <span className="finding-label">{f.label}</span>
                                    <span className="finding-severity">{f.severity}</span>
                                </div>
                                <div className="confidence-bar">
                                    <div className="confidence-fill" style={{ width: `${f.confidence}%`, background: f.confidence > 80 ? 'var(--accent-rose)' : 'var(--accent-amber)' }} />
                                </div>
                                <span className="finding-conf">{f.confidence.toFixed(1)}%</span>
                            </div>
                        ))}
                        <div className="recommendation">
                            <h4>💡 권장사항</h4>
                            <p>{result.recommendation}</p>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .medi-sim { display: flex; flex-direction: column; gap: var(--space-xl); }
        .panel-title { font-size: 16px; font-weight: 700; margin-bottom: var(--space-md); }
        .image-select { display: flex; gap: var(--space-md); margin-bottom: var(--space-md); flex-wrap: wrap; }
        .img-option {
          flex: 1; min-width: 140px;
          padding: var(--space-lg);
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          cursor: pointer; transition: all var(--transition-fast);
          font-family: inherit; color: inherit;
        }
        .img-option:hover { border-color: var(--border-medium); }
        .img-option.active { border-color: var(--accent-cyan); background: var(--accent-cyan-dim); }
        .img-emoji { font-size: 36px; }
        .img-name { font-size: 13px; font-weight: 600; }
        .img-type { font-size: 11px; color: var(--text-tertiary); }
        .run-btn { width: 100%; padding: 14px; }

        .loading-state { text-align: center; padding: var(--space-2xl); }
        .loader { width: 40px; height: 40px; border: 3px solid var(--border-subtle); border-top-color: var(--accent-rose); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto var(--space-md); }

        .medi-results { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); animation: fadeInUp 0.5s ease-out; }

        .image-viewer { }
        .mock-image {
          position: relative;
          width: 100%; padding-bottom: 100%;
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .mock-bg-emoji {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-size: 80px;
          opacity: 0.2;
        }
        .bbox {
          position: absolute;
          border: 2px solid;
          border-radius: 4px;
          animation: fadeIn 0.5s ease-out;
        }
        .bbox.warn { border-color: var(--accent-rose); background: rgba(255,82,82,0.1); }
        .bbox.info { border-color: var(--accent-amber); background: rgba(255,215,64,0.1); }
        .bbox-label {
          position: absolute;
          top: -20px; left: 0;
          font-size: 10px; font-weight: 600;
          padding: 2px 6px;
          border-radius: 3px;
          white-space: nowrap;
          background: rgba(0,0,0,0.8);
          color: var(--text-primary);
        }

        .findings-panel { }
        .findings-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg); }
        .findings-header h3 { font-size: 18px; font-weight: 700; }
        .risk-badge { padding: 4px 12px; border-radius: var(--radius-full); font-size: 12px; font-weight: 700; }
        .risk-badge.med { background: var(--accent-amber-dim); color: var(--accent-amber); }
        .risk-badge.low { background: var(--accent-emerald-dim); color: var(--accent-emerald); }

        .finding-item { margin-bottom: var(--space-md); padding: var(--space-md); background: var(--bg-glass); border-radius: var(--radius-sm); }
        .finding-top { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .severity-dot { width: 8px; height: 8px; border-radius: 50%; }
        .severity-dot.warn { background: var(--accent-rose); }
        .severity-dot.info { background: var(--accent-amber); }
        .finding-label { font-size: 14px; font-weight: 600; flex: 1; }
        .finding-severity { font-size: 11px; font-weight: 600; color: var(--text-tertiary); }
        .confidence-bar { height: 4px; background: var(--bg-glass-strong); border-radius: 2px; overflow: hidden; margin-bottom: 4px; }
        .confidence-fill { height: 100%; border-radius: 2px; transition: width 1s ease-out; }
        .finding-conf { font-size: 12px; font-family: var(--font-mono); color: var(--text-tertiary); }

        .recommendation { margin-top: var(--space-lg); padding: var(--space-md); background: var(--accent-cyan-dim); border: 1px solid rgba(0,229,255,0.2); border-radius: var(--radius-md); }
        .recommendation h4 { font-size: 13px; font-weight: 700; margin-bottom: 6px; }
        .recommendation p { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }

        @media (max-width: 768px) { .medi-results { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
}
