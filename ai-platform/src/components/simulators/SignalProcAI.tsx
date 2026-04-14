'use client';
import { useState } from 'react';
export default function SignalProcAI() {
    const [signalType, setSignalType] = useState<'sine' | 'square' | 'noise'>('sine');
    const [freq, setFreq] = useState(440);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { timeDomain: number[]; freqDomain: number[]; snr: number; peakFreq: number; bandwidth: number }>(null);
    const analyze = () => {
        setLoading(true); setTimeout(() => {
            const gen = (n: number) => Array.from({ length: n }, (_, i) => signalType === 'sine' ? Math.sin(i * freq * 0.01) + Math.random() * 0.2 : signalType === 'square' ? (Math.sin(i * freq * 0.01) > 0 ? 0.8 : -0.8) + Math.random() * 0.1 : (Math.random() - 0.5) * 2);
            setResult({
                timeDomain: gen(80), freqDomain: Array.from({ length: 40 }, (_, i) => { const dist = Math.abs(i - freq / 25); return Math.exp(-dist * 0.3) * (0.5 + Math.random() * 0.5); }),
                snr: signalType === 'noise' ? 3 + Math.random() * 5 : 20 + Math.random() * 15, peakFreq: freq + Math.random() * 10 - 5, bandwidth: 50 + Math.random() * 100
            }); setLoading(false);
        }, 1500);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">신호 설정</h3>
            <div className="pill-row">{(['sine', 'square', 'noise'] as const).map(s => (<button key={s} className={`pill ${signalType === s ? 'active' : ''}`} onClick={() => { setSignalType(s); setResult(null); }}>{s === 'sine' ? '〰️ 사인파' : s === 'square' ? '⬜ 사각파' : '📡 노이즈'}</button>))}</div>
            <div className="sg"><div className="sh"><span>주파수</span><span className="sv">{freq} Hz</span></div><input type="range" className="slider" min={20} max={2000} step={20} value={freq} onChange={e => { setFreq(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={analyze} disabled={loading}>{loading ? '분석 중...' : '📡 신호 분석 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>FFT 분석 중...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row"><div className="sc"><span className="sl">SNR</span><span className="sv2" style={{ color: 'var(--accent-cyan)' }}>{result.snr.toFixed(1)} dB</span></div>
                    <div className="sc"><span className="sl">피크 주파수</span><span className="sv2" style={{ color: 'var(--accent-purple)' }}>{result.peakFreq.toFixed(0)} Hz</span></div>
                    <div className="sc"><span className="sl">대역폭</span><span className="sv2" style={{ color: 'var(--accent-amber)' }}>{result.bandwidth.toFixed(0)} Hz</span></div></div>
                <div className="sb"><h4>⏱️ 시간 영역</h4><div className="wave">{result.timeDomain.map((v, i) => (<div key={i} className="wb" style={{ height: `${Math.abs(v) * 30 + 1}px`, background: v > 0 ? 'var(--accent-cyan)' : 'var(--accent-purple)', marginTop: v > 0 ? 'auto' : '0' }} />))}</div></div>
                <div className="sb"><h4>📊 주파수 영역 (FFT)</h4><div className="spectrum">{result.freqDomain.map((v, i) => (<div key={i} className="fbar" style={{ height: `${v * 60 + 2}px` }} />))}</div></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .pill-row{display:flex;gap:6px;margin-bottom:var(--space-sm)}.pill{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-cyan-dim);border-color:var(--accent-cyan);color:var(--accent-cyan)}
        .sg{margin:var(--space-sm) 0}.sh{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.sv{font-weight:700;font-family:var(--font-mono);color:var(--accent-cyan)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-cyan);cursor:pointer}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-cyan);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:18px;font-weight:700}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .wave{display:flex;align-items:center;gap:1px;height:60px;padding:var(--space-sm);background:var(--bg-glass);border-radius:var(--radius-sm)}.wb{width:4px;min-width:2px;border-radius:1px}
        .spectrum{display:flex;align-items:flex-end;gap:3px;height:70px;padding:var(--space-sm);background:var(--bg-glass);border-radius:var(--radius-sm)}.fbar{flex:1;background:var(--gradient-cyan);border-radius:2px 2px 0 0;min-width:4px}
      `}</style>
        </div>
    );
}
