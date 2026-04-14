'use client';
import { useState } from 'react';
const genres = ['Lo-Fi', 'Ambient', 'Electronic', 'Classical', 'Jazz'];
export default function AudioGenAI() {
    const [genre, setGenre] = useState(0);
    const [tempo, setTempo] = useState(120);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { waveform: number[]; spectrum: number[]; bpm: number; key: string; duration: number; measures: { beat: number; vol: number }[] }>(null);
    const generate = () => {
        setLoading(true); setTimeout(() => {
            setResult({
                waveform: Array.from({ length: 80 }, (_, i) => Math.sin(i * (0.2 + genre * 0.05)) * (0.3 + Math.random() * 0.7)),
                spectrum: Array.from({ length: 32 }, () => Math.random()), bpm: tempo, key: ['C Major', 'A Minor', 'D Major', 'E Minor', 'G Major'][genre],
                duration: 15 + Math.random() * 10, measures: Array.from({ length: 16 }, (_, i) => ({ beat: i + 1, vol: 0.3 + Math.random() * 0.7 }))
            });
            setLoading(false);
        }, 2000);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">음악 설정</h3>
            <div className="genre-row">{genres.map((g, i) => (<button key={i} className={`pill ${genre === i ? 'active' : ''}`} onClick={() => { setGenre(i); setResult(null); }}>🎵 {g}</button>))}</div>
            <div className="slider-group"><div className="slider-header"><span>템포</span><span className="sv">{tempo} BPM</span></div><input type="range" className="slider" min={60} max={200} step={5} value={tempo} onChange={e => { setTempo(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={generate} disabled={loading}>{loading ? '생성 중...' : '🎵 음악 패턴 생성'}</button>
            {loading && <div className="ld"><div className="loader" /><p>AI가 음악 패턴을 생성 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row">
                    <div className="sc"><span className="sl">BPM</span><span className="sv2" style={{ color: 'var(--accent-purple)' }}>{result.bpm}</span></div>
                    <div className="sc"><span className="sl">조성</span><span className="sv2" style={{ color: 'var(--accent-cyan)', fontSize: '16px' }}>{result.key}</span></div>
                    <div className="sc"><span className="sl">길이</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.duration.toFixed(1)}s</span></div>
                </div>
                <div className="sb"><h4>🔊 파형</h4><div className="wave">{result.waveform.map((v, i) => (<div key={i} className="wbar" style={{ height: `${Math.abs(v) * 50 + 2}px`, background: v > 0 ? 'var(--accent-purple)' : 'var(--accent-cyan)' }} />))}</div></div>
                <div className="sb"><h4>📊 주파수 스펙트럼</h4><div className="spectrum">{result.spectrum.map((v, i) => (<div key={i} className="sbar" style={{ height: `${v * 60 + 4}px` }} />))}</div></div>
                <div className="sb"><h4>🥁 비트 패턴</h4><div className="beats">{result.measures.map((m, i) => (<div key={i} className="beat-cell" style={{ opacity: 0.3 + m.vol * 0.7 }}>{i % 4 === 0 ? '🔴' : '⚪'}</div>))}</div></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .genre-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:var(--space-sm)}
        .pill{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-purple-dim);border-color:var(--accent-purple);color:var(--accent-purple)}
        .slider-group{margin:var(--space-sm) 0}.slider-header{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-purple)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-purple);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-purple);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:20px;font-weight:700}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .wave{display:flex;align-items:center;gap:1px;height:60px;padding:var(--space-sm);background:var(--bg-glass);border-radius:var(--radius-sm)}.wbar{width:4px;min-width:2px;border-radius:1px}
        .spectrum{display:flex;align-items:flex-end;gap:3px;height:70px;padding:var(--space-sm);background:var(--bg-glass);border-radius:var(--radius-sm)}.sbar{flex:1;background:var(--gradient-purple);border-radius:2px 2px 0 0;min-width:4px}
        .beats{display:flex;gap:4px;padding:var(--space-sm);background:var(--bg-glass);border-radius:var(--radius-sm);flex-wrap:wrap}.beat-cell{width:36px;height:36px;border-radius:var(--radius-sm);background:var(--bg-glass-strong);display:flex;align-items:center;justify-content:center;font-size:14px}
      `}</style>
        </div>
    );
}
