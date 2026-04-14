'use client';
import { useState } from 'react';
const emotions = ['joy', 'sadness', 'anger', 'fear', 'surprise', 'disgust'];
const emojiMap: Record<string, string> = { joy: '😊', sadness: '😢', anger: '😠', fear: '😨', surprise: '😲', disgust: '🤢' };
const labelMap: Record<string, string> = { joy: '기쁨', sadness: '슬픔', anger: '분노', fear: '공포', surprise: '놀람', disgust: '혐오' };
export default function EmotionAI() {
    const [text, setText] = useState('오늘 정말 좋은 일이 있었어요! 프로젝트가 성공적으로 완료되었습니다.');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { scores: Record<string, number>; dominant: string; valence: number; arousal: number }>(null);
    const analyze = () => {
        setLoading(true); setTimeout(() => {
            const sc: Record<string, number> = {}; emotions.forEach(e => { sc[e] = Math.random() * 30; }); const dom = text.includes('좋') || text.includes('성공') ? 'joy' : text.includes('슬') ? 'sadness' : 'surprise';
            sc[dom] = 60 + Math.random() * 30; const total = Object.values(sc).reduce((a, b) => a + b); Object.keys(sc).forEach(k => { sc[k] = (sc[k] / total) * 100; });
            setResult({ scores: sc, dominant: dom, valence: dom === 'joy' || dom === 'surprise' ? 0.5 + Math.random() * 0.5 : -(Math.random() * 0.8), arousal: 0.3 + Math.random() * 0.6 }); setLoading(false);
        }, 1500);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">감정 분석 텍스트</h3>
            <textarea className="input-field" value={text} onChange={e => { setText(e.target.value); setResult(null); }} rows={3} placeholder="감정 분석할 텍스트를 입력하세요..." />
            <button className="btn btn-primary run-btn" onClick={analyze} disabled={!text.trim() || loading}>{loading ? '분석 중...' : '🎭 감정 분석 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>감정 상태를 분석 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="dominant-box"><span className="dom-emoji">{emojiMap[result.dominant]}</span><span className="dom-label">주요 감정: <strong>{labelMap[result.dominant]}</strong></span></div>
                <div className="emotion-bars">{emotions.map(e => (<div key={e} className="emo-item"><span className="emo-icon">{emojiMap[e]}</span><span className="emo-name">{labelMap[e]}</span><div className="emo-bar"><div className="emo-fill" style={{ width: `${result.scores[e]}%`, background: e === result.dominant ? 'var(--accent-purple)' : 'var(--accent-cyan)' }} /></div><span className="emo-pct">{result.scores[e].toFixed(1)}%</span></div>))}</div>
                <div className="stat-row"><div className="sc"><span className="sl">감정가 (Valence)</span><span className="sv2" style={{ color: result.valence > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>{result.valence > 0 ? '긍정' : '부정'} ({result.valence.toFixed(2)})</span></div>
                    <div className="sc"><span className="sl">각성도 (Arousal)</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.arousal.toFixed(2)}</span></div></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-purple);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}
        .dominant-box{display:flex;align-items:center;gap:var(--space-md);padding:var(--space-lg);background:var(--accent-purple-dim);border:1px solid rgba(179,136,255,.2);border-radius:var(--radius-md);margin-bottom:var(--space-xl)}.dom-emoji{font-size:40px}.dom-label{font-size:16px}
        .emotion-bars{margin-bottom:var(--space-xl)}.emo-item{display:flex;align-items:center;gap:var(--space-sm);padding:6px var(--space-md);margin-bottom:4px}.emo-icon{font-size:18px;flex-shrink:0}.emo-name{font-size:12px;font-weight:600;min-width:40px}
        .emo-bar{flex:1;height:8px;background:var(--bg-glass-strong);border-radius:4px;overflow:hidden}.emo-fill{height:100%;border-radius:4px;transition:width 1s ease-out}
        .emo-pct{font-family:var(--font-mono);font-size:12px;color:var(--text-tertiary);min-width:45px;text-align:right}
        .stat-row{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-md)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:16px;font-weight:700}
      `}</style>
        </div>
    );
}
