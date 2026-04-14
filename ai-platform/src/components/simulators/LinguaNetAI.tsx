'use client';
import { useState } from 'react';

export default function LinguaNetAI() {
    const [text, setText] = useState('인공지능 기술이 빠르게 발전하면서 다양한 산업에 혁신적인 변화를 가져오고 있습니다. 특히 자연어 처리 분야에서의 발전은 눈부십니다.');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { sentiment: { positive: number; negative: number; neutral: number }; keywords: { word: string; score: number }[]; summary: string; entities: { text: string; type: string }[]; language: string }>(null);

    const analyze = () => {
        setLoading(true);
        setTimeout(() => {
            setResult({
                sentiment: { positive: 72 + Math.random() * 10, negative: 5 + Math.random() * 5, neutral: 15 + Math.random() * 10 },
                keywords: [
                    { word: '인공지능', score: 0.95 }, { word: '자연어 처리', score: 0.88 }, { word: '혁신', score: 0.82 },
                    { word: '산업', score: 0.71 }, { word: '기술', score: 0.68 }, { word: '발전', score: 0.65 },
                ],
                summary: 'AI 기술의 급속한 발전이 산업 전반에 혁신을 가져오며, 특히 NLP 분야에서 괄목할 만한 성과를 보이고 있음.',
                entities: [{ text: '인공지능', type: '기술' }, { text: '자연어 처리', type: '분야' }],
                language: '한국어 (ko)',
            });
            setLoading(false);
        }, 1600);
    };

    return (
        <div className="sim-ui">
            <h3 className="panel-title">텍스트 분석</h3>
            <textarea className="input-field" value={text} onChange={e => { setText(e.target.value); setResult(null); }} rows={4} placeholder="분석할 텍스트를 입력하세요..." />
            <button className="btn btn-primary run-btn" onClick={analyze} disabled={!text.trim() || loading}>{loading ? '분석 중...' : '📝 NLP 분석 실행'}</button>
            {loading && <div className="loading-state"><div className="loader" /><p>자연어를 분석 중입니다...</p></div>}
            {result && !loading && (
                <div className="results">
                    <div className="stat-row">
                        <div className="stat-card"><span className="s-label">긍정</span><span className="s-val" style={{ color: 'var(--accent-emerald)' }}>{result.sentiment.positive.toFixed(1)}%</span></div>
                        <div className="stat-card"><span className="s-label">부정</span><span className="s-val" style={{ color: 'var(--accent-rose)' }}>{result.sentiment.negative.toFixed(1)}%</span></div>
                        <div className="stat-card"><span className="s-label">중립</span><span className="s-val" style={{ color: 'var(--accent-amber)' }}>{result.sentiment.neutral.toFixed(1)}%</span></div>
                        <div className="stat-card"><span className="s-label">언어</span><span className="s-val" style={{ color: 'var(--accent-cyan)', fontSize: '16px' }}>{result.language}</span></div>
                    </div>
                    <div className="section-box">
                        <h4>🔑 키워드 추출</h4>
                        <div className="keyword-list">{result.keywords.map(k => (
                            <div key={k.word} className="keyword-item"><span className="kw-word">{k.word}</span><div className="kw-bar"><div className="kw-fill" style={{ width: `${k.score * 100}%` }} /></div><span className="kw-score">{(k.score * 100).toFixed(0)}%</span></div>
                        ))}</div>
                    </div>
                    <div className="section-box">
                        <h4>📋 요약</h4>
                        <p className="summary-text">{result.summary}</p>
                    </div>
                    <div className="section-box">
                        <h4>🏷️ 개체명 인식 (NER)</h4>
                        <div className="ner-tags">{result.entities.map((e, i) => (<span key={i} className="ner-tag"><span className="ner-type">{e.type}</span> {e.text}</span>))}</div>
                    </div>
                </div>
            )}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}.run-btn{width:100%;padding:14px}
        .loading-state{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-purple);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .stat-card{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .s-label{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.s-val{font-size:20px;font-weight:700}
        .section-box{margin-bottom:var(--space-xl)}.section-box h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .keyword-list{display:flex;flex-direction:column;gap:8px}.keyword-item{display:flex;align-items:center;gap:var(--space-md);padding:8px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm)}
        .kw-word{font-size:13px;font-weight:600;min-width:100px}.kw-bar{flex:1;height:6px;background:var(--bg-glass-strong);border-radius:3px;overflow:hidden}.kw-fill{height:100%;background:var(--accent-purple);border-radius:3px;transition:width 1s ease-out}.kw-score{font-size:12px;font-family:var(--font-mono);color:var(--text-tertiary);min-width:40px;text-align:right}
        .summary-text{font-size:14px;color:var(--text-secondary);line-height:1.7;background:var(--bg-glass);padding:var(--space-md);border-radius:var(--radius-sm);border-left:3px solid var(--accent-purple)}
        .ner-tags{display:flex;flex-wrap:wrap;gap:8px}.ner-tag{padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-full);font-size:13px}.ner-type{font-size:10px;font-weight:700;color:var(--accent-cyan);margin-right:4px}
        @media(max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>
        </div>
    );
}
