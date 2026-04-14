'use client';
import { useState } from 'react';
const algos = ['AES-256', 'RSA-2048', 'SHA-3', 'ChaCha20-Poly1305'];
export default function CryptoShieldAI() {
    const [input, setInput] = useState('MetaICT 보안 데이터 분석 샘플 텍스트');
    const [algo, setAlgo] = useState(0);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { strength: number; entropy: number; bruteForceTime: string; vulnerabilities: { name: string; severity: string; desc: string }[]; hashPreview: string }>(null);
    const analyze = () => {
        setLoading(true); setTimeout(() => {
            const a = algo; setResult({
                strength: 85 + a * 3 + Math.random() * 8, entropy: 6.5 + a * 0.3 + Math.random() * 1,
                bruteForceTime: a >= 2 ? '10²⁵⁶ 년' : a === 1 ? '10⁷⁷ 년' : '10³⁴ 년',
                vulnerabilities: a === 0 ? [{ name: 'Padding Oracle', severity: '보통', desc: '패딩 오라클 공격에 대한 구현 수준 점검 필요' }] : a === 1 ? [{ name: 'Timing Attack', severity: '낮음', desc: '일정 시간 비교 함수 적용 여부 확인' }] : [],
                hashPreview: Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
            }); setLoading(false);
        }, 1500);
    };
    return (
        <div className="sim-ui">
            <h3 className="panel-title">암호화 분석</h3>
            <textarea className="input-field" value={input} onChange={e => { setInput(e.target.value); setResult(null); }} rows={2} placeholder="분석할 텍스트 입력..." />
            <div className="algo-select">{algos.map((a, i) => (<button key={i} className={`pill ${algo === i ? 'active' : ''}`} onClick={() => { setAlgo(i); setResult(null); }}>{a}</button>))}</div>
            <button className="btn btn-primary run-btn" onClick={analyze} disabled={!input.trim() || loading}>{loading ? '분석 중...' : '🔐 보안 분석 실행'}</button>
            {loading && <div className="loading-state"><div className="loader" /><p>암호화 강도를 분석 중입니다...</p></div>}
            {result && !loading && (
                <div className="results">
                    <div className="stat-row">
                        <div className="stat-card"><span className="s-label">보안 강도</span><span className="s-val" style={{ color: result.strength > 90 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>{result.strength.toFixed(1)}%</span></div>
                        <div className="stat-card"><span className="s-label">엔트로피</span><span className="s-val" style={{ color: 'var(--accent-cyan)' }}>{result.entropy.toFixed(2)}</span></div>
                        <div className="stat-card"><span className="s-label">무차별 대입</span><span className="s-val" style={{ color: 'var(--accent-purple)', fontSize: '16px' }}>{result.bruteForceTime}</span></div>
                    </div>
                    <div className="hash-box"><h4>🔑 해시 미리보기</h4><code className="hash-code">{result.hashPreview}</code></div>
                    {result.vulnerabilities.length > 0 && <div className="vuln-box"><h4>⚠️ 취약점 ({result.vulnerabilities.length})</h4>
                        {result.vulnerabilities.map((v, i) => (<div key={i} className="vuln-item"><span className={`vuln-sev ${v.severity === '보통' ? 'med' : 'low'}`}>{v.severity}</span><span className="vuln-name">{v.name}</span><span className="vuln-desc">{v.desc}</span></div>))}</div>}
                    {result.vulnerabilities.length === 0 && <div className="safe-box">✅ 알려진 취약점이 발견되지 않았습니다</div>}
                </div>)}
            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:16px;font-weight:700}
        .algo-select{display:flex;flex-wrap:wrap;gap:6px;margin:var(--space-sm) 0}
        .pill{padding:8px 16px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast);font-family:var(--font-mono)}
        .pill:hover{border-color:var(--border-medium)}.pill.active{background:var(--accent-rose-dim);border-color:var(--accent-rose);color:var(--accent-rose)}
        .run-btn{width:100%;padding:14px}.loading-state{text-align:center;padding:var(--space-2xl)}.loader{width:40px;height:40px;border:3px solid var(--border-subtle);border-top-color:var(--accent-rose);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto var(--space-md)}
        .results{animation:fadeInUp .5s ease-out}.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)}
        .stat-card{background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-md);text-align:center}
        .s-label{display:block;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.s-val{font-size:20px;font-weight:700}
        .hash-box{margin-bottom:var(--space-xl)}.hash-box h4{font-size:14px;font-weight:600;margin-bottom:var(--space-sm)}
        .hash-code{display:block;font-family:var(--font-mono);font-size:12px;padding:var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);color:var(--accent-cyan);word-break:break-all}
        .vuln-box{margin-bottom:var(--space-lg)}.vuln-box h4{font-size:14px;font-weight:600;margin-bottom:var(--space-md)}
        .vuln-item{display:flex;align-items:center;gap:var(--space-sm);padding:10px var(--space-md);background:var(--bg-glass);border-radius:var(--radius-sm);margin-bottom:6px;font-size:13px}
        .vuln-sev{padding:3px 8px;border-radius:var(--radius-full);font-size:10px;font-weight:700;flex-shrink:0}.vuln-sev.med{background:var(--accent-amber-dim);color:var(--accent-amber)}.vuln-sev.low{background:var(--accent-emerald-dim);color:var(--accent-emerald)}
        .vuln-name{font-weight:600;flex-shrink:0}.vuln-desc{color:var(--text-secondary)}
        .safe-box{padding:var(--space-md);background:var(--accent-emerald-dim);border:1px solid rgba(0,230,118,.2);border-radius:var(--radius-md);font-size:14px;color:var(--accent-emerald)}
      `}</style>
        </div>
    );
}
