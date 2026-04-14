'use client';

import { useState } from 'react';

const sampleCode = `function processData(data) {
  var result = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i] != null && data[i] != undefined) {
      var item = data[i];
      if (item.type == 'active') {
        var processed = {
          id: item.id,
          name: item.name,
          value: item.value * 1.1
        };
        result.push(processed);
      }
    }
  }
  return result;
}`;

const refactoredCode = `const processData = (data: DataItem[]): ProcessedItem[] =>
  data
    .filter((item): item is DataItem =>
      item != null && item.type === 'active'
    )
    .map(({ id, name, value }) => ({
      id,
      name,
      value: value * 1.1,
    }));`;

export default function CodeArchitectAI() {
    const [code, setCode] = useState(sampleCode);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [result, setResult] = useState<null | {
        score: number;
        issues: { type: string; msg: string; severity: string }[];
        metrics: { before: number; after: number; label: string }[];
    }>(null);

    const analyze = () => {
        setLoading(true);
        setStep(0);
        const steps = ['AST 분석 중...', '패턴 매칭 중...', '리팩토링 적용 중...', '성능 분석 중...'];
        let s = 0;
        const interval = setInterval(() => {
            s++;
            setStep(s);
            if (s >= steps.length) {
                clearInterval(interval);
                setResult({
                    score: 92,
                    issues: [
                        { type: '타입 안전성', msg: 'var → const/let + TypeScript 타입 적용', severity: '개선' },
                        { type: '가독성', msg: '중첩 if문 → 함수형 체이닝으로 플랫화', severity: '개선' },
                        { type: '성능', msg: '불필요한 null 체크 → 옵셔널 체이닝 적용', severity: '최적화' },
                        { type: '표현력', msg: 'for 루프 → filter().map() 함수형 변환', severity: '개선' },
                    ],
                    metrics: [
                        { label: '코드 줄 수', before: 16, after: 9 },
                        { label: '복잡도(CC)', before: 8, after: 2 },
                        { label: '가독성 점수', before: 45, after: 92 },
                        { label: '유지보수성', before: 38, after: 88 },
                    ],
                });
                setLoading(false);
            }
        }, 600);
    };

    const stepLabels = ['AST 분석 중...', '패턴 매칭 중...', '리팩토링 적용 중...', '성능 분석 중...'];

    return (
        <div className="code-sim">
            <div className="code-input-section">
                <h3 className="panel-title">소스 코드 입력</h3>
                <textarea
                    className="input-field code-textarea"
                    value={code}
                    onChange={e => { setCode(e.target.value); setResult(null); }}
                    rows={14}
                    spellCheck={false}
                />
                <button className="btn btn-primary run-btn" onClick={analyze} disabled={!code.trim() || loading}>
                    {loading ? '분석 중...' : '🤖 코드 분석 & 리팩토링 실행'}
                </button>
            </div>

            {loading && (
                <div className="loading-state">
                    <div className="steps-progress">
                        {stepLabels.map((label, i) => (
                            <div key={i} className={`step-item ${i < step ? 'done' : i === step ? 'active' : ''}`}>
                                <div className="step-dot">{i < step ? '✓' : i === step ? '⟳' : ''}</div>
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {result && !loading && (
                <div className="code-results">
                    <div className="score-header">
                        <h3>📊 분석 결과</h3>
                        <div className="score-circle">
                            <span className="score-value">{result.score}</span>
                            <span className="score-label">점</span>
                        </div>
                    </div>

                    {/* Before / After */}
                    <div className="diff-view">
                        <div className="diff-panel">
                            <div className="diff-title before">Before</div>
                            <pre className="diff-code">{sampleCode}</pre>
                        </div>
                        <div className="diff-panel">
                            <div className="diff-title after">After</div>
                            <pre className="diff-code">{refactoredCode}</pre>
                        </div>
                    </div>

                    {/* Issues */}
                    <div className="issues-section">
                        <h4>🔧 개선 사항</h4>
                        {result.issues.map((issue, i) => (
                            <div key={i} className="issue-item">
                                <span className={`issue-badge ${issue.severity === '최적화' ? 'opt' : 'imp'}`}>{issue.severity}</span>
                                <span className="issue-type">{issue.type}</span>
                                <span className="issue-msg">{issue.msg}</span>
                            </div>
                        ))}
                    </div>

                    {/* Metrics */}
                    <div className="metrics-section">
                        <h4>📈 성능 지표 비교</h4>
                        <div className="metrics-grid">
                            {result.metrics.map(m => (
                                <div key={m.label} className="metric-card">
                                    <span className="metric-label">{m.label}</span>
                                    <div className="metric-compare">
                                        <span className="metric-before">{m.before}</span>
                                        <span className="metric-arrow">→</span>
                                        <span className="metric-after">{m.after}</span>
                                    </div>
                                    <div className="metric-bar-row">
                                        <div className="metric-bar">
                                            <div className="mbar-before" style={{ width: `${(m.before / Math.max(m.before, m.after)) * 100}%` }} />
                                        </div>
                                        <div className="metric-bar">
                                            <div className="mbar-after" style={{ width: `${(m.after / Math.max(m.before, m.after)) * 100}%` }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .code-sim { display: flex; flex-direction: column; gap: var(--space-xl); }
        .panel-title { font-size: 16px; font-weight: 700; margin-bottom: var(--space-md); }
        .code-textarea { font-family: var(--font-mono); font-size: 13px; resize: vertical; line-height: 1.6; tab-size: 2; }
        .run-btn { width: 100%; margin-top: var(--space-sm); padding: 14px; }

        .loading-state { padding: var(--space-xl); }
        .steps-progress { display: flex; flex-direction: column; gap: var(--space-sm); }
        .step-item { display: flex; align-items: center; gap: var(--space-sm); padding: 10px var(--space-md); border-radius: var(--radius-sm); font-size: 14px; color: var(--text-tertiary); transition: all var(--transition-fast); }
        .step-item.active { color: var(--accent-cyan); background: var(--accent-cyan-dim); }
        .step-item.done { color: var(--accent-emerald); }
        .step-dot { width: 24px; height: 24px; border-radius: 50%; background: var(--bg-glass-strong); display: flex; align-items: center; justify-content: center; font-size: 12px; }
        .step-item.active .step-dot { background: var(--accent-cyan-dim); animation: spin 1s linear infinite; }
        .step-item.done .step-dot { background: var(--accent-emerald-dim); }

        .code-results { animation: fadeInUp 0.5s ease-out; }
        .score-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl); }
        .score-header h3 { font-size: 18px; font-weight: 700; }
        .score-circle { display: flex; align-items: baseline; gap: 4px; }
        .score-value { font-size: 36px; font-weight: 800; color: var(--accent-emerald); }
        .score-label { font-size: 14px; color: var(--text-tertiary); }

        .diff-view { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-bottom: var(--space-xl); }
        .diff-panel { background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; }
        .diff-title { padding: 8px var(--space-md); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        .diff-title.before { background: rgba(255,82,82,0.1); color: var(--accent-rose); }
        .diff-title.after { background: rgba(0,230,118,0.1); color: var(--accent-emerald); }
        .diff-code { padding: var(--space-md); font-family: var(--font-mono); font-size: 12px; line-height: 1.6; overflow-x: auto; white-space: pre; color: var(--text-secondary); }

        .issues-section { margin-bottom: var(--space-xl); }
        .issues-section h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
        .issue-item { display: flex; align-items: center; gap: var(--space-sm); padding: 10px var(--space-md); background: var(--bg-glass); border-radius: var(--radius-sm); margin-bottom: 6px; font-size: 13px; }
        .issue-badge { padding: 3px 8px; border-radius: var(--radius-full); font-size: 10px; font-weight: 700; flex-shrink: 0; }
        .issue-badge.imp { background: var(--accent-cyan-dim); color: var(--accent-cyan); }
        .issue-badge.opt { background: var(--accent-emerald-dim); color: var(--accent-emerald); }
        .issue-type { font-weight: 600; flex-shrink: 0; }
        .issue-msg { color: var(--text-secondary); }

        .metrics-section h4 { font-size: 14px; font-weight: 600; margin-bottom: var(--space-md); }
        .metrics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-md); }
        .metric-card { background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-md); }
        .metric-label { font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; }
        .metric-compare { display: flex; align-items: center; gap: 8px; margin: 8px 0; }
        .metric-before { font-size: 18px; font-weight: 700; color: var(--accent-rose); }
        .metric-arrow { color: var(--text-tertiary); }
        .metric-after { font-size: 18px; font-weight: 700; color: var(--accent-emerald); }
        .metric-bar-row { display: flex; flex-direction: column; gap: 4px; }
        .metric-bar { height: 4px; background: var(--bg-glass-strong); border-radius: 2px; overflow: hidden; }
        .mbar-before { height: 100%; background: var(--accent-rose); border-radius: 2px; transition: width 1s ease-out; }
        .mbar-after { height: 100%; background: var(--accent-emerald); border-radius: 2px; transition: width 1s ease-out; }

        @media (max-width: 640px) { .diff-view { grid-template-columns: 1fr; } .metrics-grid { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
}
