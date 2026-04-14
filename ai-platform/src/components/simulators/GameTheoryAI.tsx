'use client';
import { useState } from 'react';
const scenarios = [{ name: '죄수의 딜레마', p1: '협력/배신', p2: '협력/배신' }, { name: '치킨 게임', p1: '직진/회피', p2: '직진/회피' }, { name: '사슴 사냥', p1: '사슴/토끼', p2: '사슴/토끼' }];
export default function GameTheoryAI() {
    const [sc, setSc] = useState(0); const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { matrix: number[][]; nash: string; dominant: string; explanation: string; iterations: { round: number; p1: string; p2: string; p1pay: number; p2pay: number }[] }>(null);
    const simulate = () => {
        setLoading(true); setTimeout(() => {
            const mats = [[[3, 3], [0, 5], [5, 0], [1, 1]], [[0, 0], [2, 7], [7, 2], [6, 6]], [[4, 4], [0, 3], [3, 0], [2, 2]]];
            const labels = [['협력', '배신'], ['직진', '회피'], ['사슴', '토끼']];
            setResult({
                matrix: mats[sc], nash: sc === 0 ? '(배신, 배신)' : sc === 1 ? '(회피, 회피)' : '(사슴, 사슴) 및 (토끼, 토끼)',
                dominant: sc === 0 ? '배신' : '없음', explanation: sc === 0 ? '개인적 합리성이 집단적 최적과 충돌하는 대표적 사례입니다.' : sc === 1 ? '양측 모두 양보할 인센티브가 있으나, 먼저 양보하는 쪽이 유리합니다.' : '높은 보상을 위해 협력이 필요하지만, 리스크 회피 시 저보상 균형에 수렴합니다.',
                iterations: Array.from({ length: 5 }, (_, i) => {
                    const p1 = Math.random() > 0.5 ? labels[sc][0] : labels[sc][1]; const p2 = Math.random() > 0.5 ? labels[sc][0] : labels[sc][1]; const idx = (p1 === labels[sc][0] ? 0 : 1) * 2 + (p2 === labels[sc][0] ? 0 : 1);
                    return { round: i + 1, p1, p2, p1pay: mats[sc][idx][0], p2pay: mats[sc][idx][1] };
                })
            }); setLoading(false);
        }, 1500);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">게임 시나리오</h3>
            <div className="pill-row">{scenarios.map((s, i) => (<button key={i} className={`pill ${sc === i ? 'active' : ''}`} onClick={() => { setSc(i); setResult(null); }}>🎮 {s.name}</button>))}</div>
            <button className="btn btn-primary run-btn" onClick={simulate} disabled={loading}>{loading ? '분석 중...' : '🎮 게임 시뮬레이션 실행'}</button>
            {loading && <div className="ld"><div className="loader" /><p>전략적 균형을 분석 중입니다...</p></div>}
            {result && !loading && (<div className="results">
                <div className="stat-row"><div className="sc"><span className="sl">내쉬 균형</span><span className="sv2" style={{ color: 'var(--accent-purple)', fontSize: '14px' }}>{result.nash}</span></div>
                    <div className="sc"><span className="sl">우월 전략</span><span className="sv2" style={{ color: 'var(--accent-cyan)', fontSize: '14px' }}>{result.dominant}</span></div></div>
                <div className="sb"><h4>📊 보수 행렬</h4><div className="matrix"><div className="mrow header"><span></span><span>P2: {scenarios[sc].p2.split('/')[0]}</span><span>P2: {scenarios[sc].p2.split('/')[1]}</span></div>
                    {[0, 1].map(r => (<div key={r} className="mrow"><span className="mlabel">P1: {scenarios[sc].p1.split('/')[r]}</span>{[0, 1].map(c => (<span key={c} className="mcell">({result.matrix[r * 2 + c][0]}, {result.matrix[r * 2 + c][1]})</span>))}</div>))}</div></div>
                <div className="sb"><h4>🔄 반복 시뮬레이션</h4><div className="iter-table"><div className="iter-header"><span>라운드</span><span>P1</span><span>P2</span><span>P1 보수</span><span>P2 보수</span></div>
                    {result.iterations.map(it => (<div key={it.round} className="iter-row"><span>{it.round}</span><span>{it.p1}</span><span>{it.p2}</span><span className="pay">{it.p1pay}</span><span className="pay">{it.p2pay}</span></div>))}</div></div>
                <div className="explain-box"><h4>💡 해석</h4><p>{result.explanation}</p></div>
            </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .pill-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:var(--space-sm)}.pill{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:inherit}.pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-purple-dim);border-color:var(--accent-purple);color:var(--accent-purple)}
        .run-btn{width:100%;padding:14px}.ld{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-purple);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .sc{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .sl{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.sv2{font-size:18px;font-weight:700}
        .sb{margin-bottom:var(--space-xl)}.sb h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .matrix{border:1px solid var(--border-subtle);border-radius:var(--radius-md);overflow:hidden}.mrow{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px}.mrow.header{background:var(--bg-glass);font-size:11px;font-weight:700;color:var(--text-tertiary);padding:8px}
        .mrow:not(.header){border-top:1px solid var(--border-subtle)}.mlabel{background:var(--bg-glass);font-size:11px;font-weight:600;padding:10px;color:var(--text-tertiary)}
        .mcell{padding:10px;text-align:center;font-family:var(--font-mono);font-size:13px;font-weight:600;color:var(--accent-cyan)}
        .mrow span{padding:8px;text-align:center}
        .iter-table{border:1px solid var(--border-subtle);border-radius:var(--radius-md);overflow:hidden}.iter-header,.iter-row{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;padding:8px var(--space-md);font-size:12px;text-align:center}
        .iter-header{background:var(--bg-glass);font-weight:700;color:var(--text-tertiary);font-size:10px;text-transform:uppercase}.iter-row{border-top:1px solid var(--border-subtle)}
        .pay{font-weight:700;color:var(--accent-amber)}
        .explain-box{background:var(--accent-purple-dim);border:1px solid rgba(179,136,255,.2);border-radius:var(--radius-md);padding:var(--space-lg)}.explain-box h4{font-size:13px;font-weight:700;margin-bottom:6px}.explain-box p{font-size:13px;color:var(--text-secondary);line-height:1.6}
      `}</style>
        </div>
    );
}
