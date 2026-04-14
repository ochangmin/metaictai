'use client';
import { useState } from 'react';
const styles = ['반 고흐 (별이 빛나는 밤)', '클로드 모네 (수련)', '에드바르 뭉크 (절규)', '피카소 (큐비즘)', '우키요에 (가쓰시카 호쿠사이)'];
const images = ['🏔️ 산 풍경', '🌆 도시 야경', '🌸 꽃밭', '🐱 고양이'];
export default function StyleTransferAI() {
    const [img, setImg] = useState(0);
    const [style, setStyle] = useState(0);
    const [intensity, setIntensity] = useState(70);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { contentLoss: number; styleLoss: number; totalLoss: number; iterations: number; palette: string[] }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            setResult({
                contentLoss: 0.05 + Math.random() * 0.1, styleLoss: 0.02 + Math.random() * 0.08, totalLoss: 0.08 + Math.random() * 0.15, iterations: 800 + Math.floor(Math.random() * 400),
                palette: Array.from({ length: 6 }, () => `hsl(${Math.floor(Math.random() * 360)},${50 + Math.floor(Math.random() * 40)}%,${30 + Math.floor(Math.random() * 40)}%)`)
            });
            setLoading(false);
        }, 2000);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">이미지 & 스타일 선택</h3>
            <div className="select-row">{images.map((im, i) => (<button key={i} className={`opt-btn ${img === i ? 'active' : ''}`} onClick={() => { setImg(i); setResult(null); }}>{im}</button>))}</div>
            <h4 className="sub-title">화풍 선택</h4>
            <div className="select-row">{styles.map((s, i) => (<button key={i} className={`opt-btn style-btn ${style === i ? 'active' : ''}`} onClick={() => { setStyle(i); setResult(null); }}>{s}</button>))}</div>
            <div className="slider-group"><div className="slider-header"><span>스타일 강도</span><span className="slider-value">{intensity}%</span></div>
                <input type="range" className="slider" min={10} max={100} value={intensity} onChange={e => { setIntensity(parseInt(e.target.value)); setResult(null); }} /></div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '변환 중...' : '🎨 스타일 변환 실행'}</button>
            {loading && <div className="loading-state"><div className="loader" /><p>신경 스타일 변환을 수행 중입니다...</p></div>}
            {result && !loading && (
                <div className="results">
                    <div className="preview-grid"><div className="preview-box"><span className="preview-label">원본</span><div className="preview-img"><span className="big-emoji">{images[img].split(' ')[0]}</span></div></div>
                        <div className="preview-arrow">→</div>
                        <div className="preview-box"><span className="preview-label">변환 결과</span><div className="preview-img styled" style={{ background: `linear-gradient(135deg, ${result.palette[0]}, ${result.palette[1]}, ${result.palette[2]})` }}><span className="big-emoji" style={{ filter: 'saturate(1.5) contrast(1.2)' }}>{images[img].split(' ')[0]}</span></div></div></div>
                    <div className="stat-row">
                        <div className="stat-card"><span className="s-label">콘텐츠 손실</span><span className="s-val" style={{ color: 'var(--accent-cyan)' }}>{result.contentLoss.toFixed(4)}</span></div>
                        <div className="stat-card"><span className="s-label">스타일 손실</span><span className="s-val" style={{ color: 'var(--accent-purple)' }}>{result.styleLoss.toFixed(4)}</span></div>
                        <div className="stat-card"><span className="s-label">반복 횟수</span><span className="s-val" style={{ color: 'var(--accent-amber)' }}>{result.iterations}</span></div>
                    </div>
                    <div className="section-box"><h4>🎨 추출된 색상 팔레트</h4><div className="palette-row">{result.palette.map((c, i) => (<div key={i} className="palette-swatch" style={{ background: c }}><span>{c}</span></div>))}</div></div>
                </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}.sub-title{font-size:14px;font-weight:600;margin-top:var(--space-sm)}
        .select-row{display:flex;flex-wrap:wrap;gap:8px;margin:var(--space-sm) 0}.opt-btn{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}
        .opt-btn:hover{border-color:var(--border-medium)}.opt-btn.active{background:var(--accent-amber-dim);border-color:var(--accent-amber);color:var(--accent-amber)}
        .style-btn{border-radius:var(--radius-sm);font-size:11px}
        .slider-group{margin-top:var(--space-sm)}.slider-header{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}.slider-value{font-weight:700;font-family:var(--font-mono);color:var(--accent-amber)}
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-amber);cursor:pointer}
        .run-btn{width:100%;padding:14px}.loading-state{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-amber);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}
        .preview-grid{display:flex;align-items:center;justify-content:center;gap:var(--space-xl);margin-bottom:var(--space-xl);flex-wrap:wrap}
        .preview-box{text-align:center}.preview-label{font-size:12px;font-weight:600;color:var(--text-tertiary);display:block;margin-bottom:8px}
        .preview-img{width:180px;height:180px;border-radius:var(--radius-md);background:var(--bg-glass);border:1px solid var(--border-subtle);display:flex;align-items:center;justify-content:center}
        .big-emoji{font-size:64px}.preview-arrow{font-size:24px;color:var(--text-tertiary)}
        .stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}.stat-card{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .s-label{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.s-val{font-size:18px;font-weight:700}
        .section-box{margin-bottom:var(--space-lg)}.section-box h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .palette-row{display:flex;gap:8px;flex-wrap:wrap}.palette-swatch{width:80px;height:50px;border-radius:var(--radius-sm);display:flex;align-items:flex-end;justify-content:center;padding:4px}
        .palette-swatch span{font-size:8px;color:rgba(255,255,255,.7);font-family:var(--font-mono)}
      `}</style>
        </div>
    );
}
