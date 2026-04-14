'use client';
import { useState } from 'react';
const cropCategories = ['🌾 식량작물', '🥬 엽채류', '🍎 과수', '🌶️ 과채류'];
export default function SeedSelectorAI() {
    const [category, setCategory] = useState(0); const [region, setRegion] = useState<'central' | 'south'>('central'); const [priority, setPriority] = useState<'yield' | 'disease' | 'quality'>('yield');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { varieties: { name: string; yield: number; diseaseRes: number; quality: number; growDays: number; note: string }[]; bestMatch: string }>(null);
    const recommend = () => {
        setLoading(true); setTimeout(() => {
            const varieties = category === 0 ? [
                { name: '삼광벼', yield: 88, diseaseRes: 82, quality: 90, growDays: 128, note: '밥맛 우수, 중부지방 적합' },
                { name: '신동진벼', yield: 92, diseaseRes: 75, quality: 85, growDays: 135, note: '다수확, 남부지방 추천' },
                { name: '추청벼', yield: 80, diseaseRes: 85, quality: 95, growDays: 130, note: '품질 최상, 프리미엄 쌀' },
                { name: '해들벼', yield: 85, diseaseRes: 90, quality: 82, growDays: 125, note: '내병성 강, 조생종' },
            ] : category === 1 ? [
                { name: 'CR배추 (내병계)', yield: 85, diseaseRes: 95, quality: 82, growDays: 65, note: '뿌리혹병 저항성' },
                { name: '노랑배추', yield: 78, diseaseRes: 80, quality: 90, growDays: 70, note: '기능성 품종' },
                { name: '불암플러스', yield: 90, diseaseRes: 88, quality: 85, growDays: 60, note: '다수확, 봄배추 적합' },
            ] : category === 2 ? [
                { name: '홍로', yield: 82, diseaseRes: 88, quality: 90, growDays: 170, note: '추석 출하용' },
                { name: '후지', yield: 88, diseaseRes: 75, quality: 95, growDays: 190, note: '저장성 우수' },
                { name: '감홍', yield: 75, diseaseRes: 85, quality: 92, growDays: 175, note: '고당도 품종' },
            ] : [
                { name: '녹광고추', yield: 90, diseaseRes: 85, quality: 82, growDays: 85, note: '매운맛, 가공용' },
                { name: '금탑고추', yield: 85, diseaseRes: 92, quality: 88, growDays: 90, note: 'TSWV 저항성' },
                { name: '대통토마토', yield: 92, diseaseRes: 80, quality: 85, growDays: 80, note: '생과용, 대과종' },
            ];
            const sorted = [...varieties].sort((a, b) => priority === 'yield' ? b.yield - a.yield : priority === 'disease' ? b.diseaseRes - a.diseaseRes : b.quality - a.quality);
            setResult({ varieties: sorted, bestMatch: sorted[0].name }); setLoading(false);
        }, 1500);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">🌱 품종 선택 가이드</h3>
            <div className="form-section"><span className="fl">작물 분류</span><div className="pill-row">{cropCategories.map((c, i) => (<button key={i} className={`pill ${category === i ? 'active' : ''}`} onClick={() => { setCategory(i); setResult(null); }}>{c}</button>))}</div></div>
            <div className="form-section"><span className="fl">재배 지역</span><div className="pill-row">{(['central', 'south'] as const).map(r => (<button key={r} className={`pill ${region === r ? 'active' : ''}`} onClick={() => { setRegion(r); setResult(null); }}>{r === 'central' ? '🏛️ 중부' : '🌴 남부'}</button>))}</div></div>
            <div className="form-section"><span className="fl">우선순위</span><div className="pill-row">{(['yield', 'disease', 'quality'] as const).map(p => (<button key={p} className={`pill ${priority === p ? 'active' : ''}`} onClick={() => { setPriority(p); setResult(null); }}>{p === 'yield' ? '📈 수확량' : p === 'disease' ? '🛡️ 내병성' : '⭐ 품질'}</button>))}</div></div>
            <button className="btn btn-primary run-btn" onClick={recommend} disabled={loading}>{loading ? '분석 중...' : '🌱 품종 추천 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>최적 품종을 분석 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="best-box"><span>🏆 추천 1순위:</span> <strong>{result.bestMatch}</strong></div>
                <div className="var-list">{result.varieties.map((v, i) => (
                    <div key={v.name} className={`var-card ${i === 0 ? 'best' : ''}`}>
                        <div className="var-header"><span className="var-rank">#{i + 1}</span><span className="var-name">{v.name}</span><span className="var-days">{v.growDays}일</span></div>
                        <div className="var-bars">
                            <div className="vb"><span>수확량</span><div className="vb-track"><div className="vb-fill y" style={{ width: `${v.yield}%` }} /></div><span>{v.yield}</span></div>
                            <div className="vb"><span>내병성</span><div className="vb-track"><div className="vb-fill d" style={{ width: `${v.diseaseRes}%` }} /></div><span>{v.diseaseRes}</span></div>
                            <div className="vb"><span>품질</span><div className="vb-track"><div className="vb-fill q" style={{ width: `${v.quality}%` }} /></div><span>{v.quality}</span></div>
                        </div>
                        <div className="var-note">📌 {v.note}</div>
                    </div>))}</div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .form-section{margin-bottom:var(--space-sm)}.fl{font-size:13px;font-weight:500;display:block;margin-bottom:8px}
        .pill-row{display:flex;flex-wrap:wrap;gap:6px}.pill{padding:6px 12px;font-size:11px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-emerald-dim);border-color:var(--accent-emerald);color:var(--accent-emerald)}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-emerald);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}
        .best-box{padding:var(--space-md);background:var(--accent-emerald-dim);border:1px solid rgba(0,230,118,.2);border-radius:var(--radius-md);font-size:14px;color:var(--accent-emerald);margin-bottom:var(--space-xl)}
        .var-list{display:flex;flex-direction:column;gap:var(--space-md)}.var-card{padding:var(--space-md);background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md)}.var-card.best{border-color:var(--accent-emerald);background:rgba(0,230,118,.03)}
        .var-header{display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md)}.var-rank{font-size:16px;font-weight:800;color:var(--text-tertiary)}.var-name{font-size:16px;font-weight:700;flex:1}.var-days{font-family:var(--font-mono);font-size:12px;color:var(--text-tertiary);padding:3px 8px;background:var(--bg-glass-strong);border-radius:var(--radius-full)}
        .var-bars{display:flex;flex-direction:column;gap:6px;margin-bottom:var(--space-sm)}.vb{display:flex;align-items:center;gap:var(--space-sm);font-size:11px}.vb span:first-child{min-width:45px;color:var(--text-tertiary);font-weight:500}.vb span:last-child{min-width:25px;text-align:right;font-family:var(--font-mono);font-weight:600}
        .vb-track{flex:1;height:6px;background:var(--bg-glass-strong);border-radius:3px;overflow:hidden}.vb-fill{height:100%;border-radius:3px;transition:width 1s ease-out}.y{background:var(--accent-emerald)}.d{background:var(--accent-cyan)}.q{background:var(--accent-amber)}
        .var-note{font-size:12px;color:var(--text-secondary);border-top:1px solid var(--border-subtle);padding-top:8px;margin-top:4px}
      `}</style>
        </div>
    );
}
