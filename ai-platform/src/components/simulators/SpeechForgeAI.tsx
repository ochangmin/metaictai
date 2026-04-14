'use client';

import { useState } from 'react';

export default function SpeechForgeAI() {
    const [text, setText] = useState('안녕하세요, MetaICT AI 플랫폼에 오신 것을 환영합니다.');
    const [voice, setVoice] = useState<'female' | 'male' | 'child'>('female');
    const [speed, setSpeed] = useState(1.0);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { waveform: number[]; pitch: number[]; duration: number; quality: number; formants: { f1: number; f2: number; f3: number }[] }>(null);

    const synthesize = () => {
        setLoading(true);
        setTimeout(() => {
            const len = 60;
            setResult({
                waveform: Array.from({ length: len }, (_, i) => Math.sin(i * 0.3) * (0.5 + Math.random() * 0.5) * (voice === 'male' ? 0.8 : voice === 'child' ? 1.2 : 1)),
                pitch: Array.from({ length: len }, (_, i) => (voice === 'male' ? 120 : voice === 'child' ? 300 : 220) + Math.sin(i * 0.2) * 30 + Math.random() * 20),
                duration: text.length * 0.08 / speed,
                quality: 90 + Math.random() * 8,
                formants: Array.from({ length: 5 }, () => ({ f1: 300 + Math.random() * 400, f2: 1000 + Math.random() * 800, f3: 2200 + Math.random() * 600 })),
            });
            setLoading(false);
        }, 1800);
    };

    return (
        <div className="sim-ui">
            <h3 className="panel-title">텍스트 입력</h3>
            <textarea className="input-field" value={text} onChange={e => { setText(e.target.value); setResult(null); }} rows={3} placeholder="합성할 텍스트를 입력하세요..." />
            <div className="controls-row">
                <div className="control-group">
                    <span className="ctrl-label">음성</span>
                    <div className="pill-group">
                        {(['female', 'male', 'child'] as const).map(v => (
                            <button key={v} className={`pill ${voice === v ? 'active' : ''}`} onClick={() => { setVoice(v); setResult(null); }}>
                                {v === 'female' ? '👩 여성' : v === 'male' ? '👨 남성' : '👧 아동'}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="control-group">
                    <span className="ctrl-label">속도: {speed.toFixed(1)}x</span>
                    <input type="range" className="slider" min={0.5} max={2} step={0.1} value={speed} onChange={e => { setSpeed(parseFloat(e.target.value)); setResult(null); }} />
                </div>
            </div>
            <button className="btn btn-primary run-btn" onClick={synthesize} disabled={!text.trim() || loading}>{loading ? '합성 중...' : '🔊 음성 합성 실행'}</button>

            {loading && <div className="loading-state"><div className="loader" /><p>AI가 음성을 합성 중입니다...</p></div>}

            {result && !loading && (
                <div className="results">
                    <div className="stat-row">
                        <div className="stat-card"><span className="s-label">음질 점수</span><span className="s-val" style={{ color: 'var(--accent-emerald)' }}>{result.quality.toFixed(1)}%</span></div>
                        <div className="stat-card"><span className="s-label">예상 길이</span><span className="s-val" style={{ color: 'var(--accent-cyan)' }}>{result.duration.toFixed(1)}s</span></div>
                        <div className="stat-card"><span className="s-label">평균 피치</span><span className="s-val" style={{ color: 'var(--accent-purple)' }}>{(result.pitch.reduce((a, b) => a + b, 0) / result.pitch.length).toFixed(0)} Hz</span></div>
                    </div>
                    <div className="chart-box">
                        <h4>파형 (Waveform)</h4>
                        <div className="wave-chart">{result.waveform.map((v, i) => (<div key={i} className="wave-bar" style={{ height: `${Math.abs(v) * 40 + 2}px`, background: v > 0 ? 'var(--accent-cyan)' : 'var(--accent-purple)', marginTop: v > 0 ? 'auto' : '0' }} />))}</div>
                    </div>
                    <div className="chart-box">
                        <h4>피치 윤곽 (Pitch Contour)</h4>
                        <svg viewBox="0 0 400 80" className="line-svg">
                            <polyline fill="none" stroke="var(--accent-amber)" strokeWidth="2" points={result.pitch.map((v, i) => `${(i / (result.pitch.length - 1)) * 390 + 5},${75 - ((v - 100) / 300) * 70}`).join(' ')} />
                        </svg>
                    </div>
                </div>
            )}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}
        .panel-title{font-size:16px;font-weight:700}
        .controls-row{display:flex;gap:var(--space-lg);flex-wrap:wrap}
        .control-group{flex:1;min-width:200px}
        .ctrl-label{font-size:13px;font-weight:500;display:block;margin-bottom:8px}
        .pill-group{display:flex;gap:6px}
        .pill{padding:6px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}
        .pill:hover{border-color:var(--border-medium)}
        .pill.active{background:var(--accent-cyan-dim);border-color:var(--accent-cyan);color:var(--accent-cyan)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}
        .slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-cyan);cursor:pointer}
        .run-btn{width:100%;padding:14px}
        .loading-state{text-align:center;padding:var(--space-2xl)}
        .loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-cyan);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}
        .stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .stat-card{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .s-label{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}
        .s-val{font-size:20px;font-weight:700}
        .chart-box{margin-bottom:var(--space-lg)}
        .chart-box h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .wave-chart{display:flex;align-items:center;gap:2px;height:80px;padding:var(--space-sm);background:var(--bg-glass);border-radius:var(--radius-sm)}
        .wave-bar{width:5px;min-width:3px;border-radius:2px;transition:all var(--transition-fast)}
        .wave-bar:hover{opacity:.7}
        .line-svg{width:100%;height:80px;background:var(--bg-glass);border-radius:var(--radius-sm);padding:4px}
        @media(max-width:640px){.stat-row{grid-template-columns:1fr}}
      `}</style>
        </div>
    );
}
