'use client';

import { useState } from 'react';
import Link from 'next/link';
import { platforms } from '@/data/platforms';

type DomainFilter = 'all' | '농업' | '환경';
type DataTypeFilter = 'all' | 'api' | 'input' | 'analysis';

export default function AIPlatformPage() {
    const [domain, setDomain] = useState<DomainFilter>('all');
    const [dataType, setDataType] = useState<DataTypeFilter>('all');

    const filtered = platforms.filter(p => {
        if (domain !== 'all' && p.domain !== domain) return false;
        if (dataType !== 'all' && p.dataType !== dataType) return false;
        return true;
    });

    const stats = {
        total: platforms.length,
        api: platforms.filter(p => p.dataType === 'api').length,
        input: platforms.filter(p => p.dataType === 'input').length,
        analysis: platforms.filter(p => p.dataType === 'analysis').length,
    };

    return (
        <>
            {/* Hero */}
            <section className="platform-hero">
                <div className="platform-hero-bg">
                    <div className="orb orb-p1" />
                    <div className="orb orb-p2" />
                </div>
                <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="hero-badge-row">
                        <span className="badge badge-api">🔗 API 연동</span>
                        <span className="badge badge-input">📝 데이터 입력</span>
                        <span className="badge badge-analysis">📊 데이터 분석</span>
                    </div>
                    <h1 className="platform-title">
                        데이터 시대의 새로운 연구 툴,<br />
                        <span className="text-gradient">Meta R&D 플랫폼</span>
                    </h1>
                    <p className="platform-desc">
                        추론 가능한 데이터 입력과 실시간 시뮬레이션을 통해 농업 및 환경 분야의 최적의 의사결정을 돕는 10가지 차세대 분석 모듈을 경험하세요.
                    </p>

                    {/* Pipeline Visual */}
                    <div className="pipeline-visual">
                        <div className="pv-step"><span className="pv-icon pv-api">🔗</span><span>데이터 수집</span></div>
                        <span className="pv-arrow">→</span>
                        <div className="pv-step"><span className="pv-icon pv-input">📝</span><span>데이터 입력</span></div>
                        <span className="pv-arrow">→</span>
                        <div className="pv-step"><span className="pv-icon pv-analysis">🤖</span><span>AI 분석</span></div>
                        <span className="pv-arrow">→</span>
                        <div className="pv-step"><span className="pv-icon pv-result">📊</span><span>인사이트</span></div>
                    </div>

                    {/* Stats */}
                    <div className="platform-stats">
                        <div className="ps"><span className="ps-val">{stats.api}</span><span className="ps-label">API 연동</span></div>
                        <div className="ps-div" />
                        <div className="ps"><span className="ps-val">{stats.input}</span><span className="ps-label">데이터 입력</span></div>
                        <div className="ps-div" />
                        <div className="ps"><span className="ps-val">{stats.analysis}</span><span className="ps-label">데이터 분석</span></div>
                    </div>
                </div>
            </section>

            {/* Filters + Grid */}
            <section className="section">
                <div className="page-container">
                    <div className="filter-bar">
                        <div className="filter-section">
                            <span className="filter-label">분야</span>
                            <div className="filter-group">
                                {([['all', '전체'], ['농업', '🌾 농업'], ['환경', '🌍 환경']] as const).map(([val, label]) => (
                                    <button key={val} className={`filter-pill ${domain === val ? 'active-emerald' : ''}`} onClick={() => setDomain(val as DomainFilter)}>{label}</button>
                                ))}
                            </div>
                        </div>
                        <div className="filter-section">
                            <span className="filter-label">데이터 방식</span>
                            <div className="filter-group">
                                {([['all', '전체'], ['api', '🔗 API'], ['input', '📝 입력'], ['analysis', '📊 분석']] as const).map(([val, label]) => (
                                    <button key={val} className={`filter-pill ${dataType === val ? (val === 'api' ? 'active' : val === 'input' ? 'active-amber' : val === 'analysis' ? 'active-purple' : 'active') : ''}`} onClick={() => setDataType(val as DataTypeFilter)}>{label}</button>
                                ))}
                            </div>
                        </div>
                        <span className="filter-count">{filtered.length}개 모듈</span>
                    </div>

                    <div className="platform-grid">
                        {filtered.map((p, i) => (
                            <Link key={p.id} href={`/ai-platform/${p.id}`} className="platform-card glass-card" style={{ animationDelay: `${i * 60}ms` }}>
                                <div className="pc-top">
                                    <div className="pc-icon" style={{ background: p.gradient }}><span>{p.icon}</span></div>
                                    <div className="pc-badges">
                                        <span className={`badge badge-${p.dataType}`}>{p.dataTypeIcon} {p.dataTypeKo}</span>
                                        <span className="badge badge-emerald">{p.domain}</span>
                                    </div>
                                </div>
                                <h3>{p.nameKo}</h3>
                                <p className="pc-name">{p.name}</p>
                                <p className="pc-desc">{p.description}</p>
                                <div className="pc-tags">{p.tags.map(t => (<span key={t} className="sim-tag">{t}</span>))}</div>
                                <div className="pc-arrow">→</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx>{`
        .platform-hero{position:relative;padding:var(--space-4xl) 0 var(--space-3xl);overflow:hidden;text-align:center}
        .platform-hero-bg{position:absolute;inset:0}
        .orb{position:absolute;border-radius:50%;filter:blur(100px);opacity:.35}
        .orb-p1{width:500px;height:500px;background:#7c4dff;top:-150px;left:20%;animation:pulse-glow 7s ease-in-out infinite}
        .orb-p2{width:400px;height:400px;background:#00e5ff;bottom:-100px;right:25%;animation:pulse-glow 8s ease-in-out infinite 2s}
        .hero-badge-row{display:flex;justify-content:center;gap:8px;margin-bottom:var(--space-xl);flex-wrap:wrap}
        .platform-title{font-size:clamp(32px,5vw,60px);font-weight:900;letter-spacing:-2px;line-height:1.1;margin-bottom:var(--space-lg)}
        .platform-desc{font-size:clamp(14px,1.8vw,17px);color:var(--text-secondary);line-height:1.7;margin-bottom:var(--space-2xl)}

        .pipeline-visual{display:flex;align-items:center;justify-content:center;gap:var(--space-md);margin-bottom:var(--space-2xl);flex-wrap:wrap}
        .pv-step{display:flex;flex-direction:column;align-items:center;gap:6px;padding:var(--space-md) var(--space-lg);background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-md);min-width:90px;font-size:12px;font-weight:600}
        .pv-icon{font-size:24px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;border-radius:var(--radius-sm)}
        .pv-api{background:var(--accent-cyan-dim)}.pv-input{background:var(--accent-amber-dim)}.pv-analysis{background:var(--accent-purple-dim)}.pv-result{background:var(--accent-emerald-dim)}
        .pv-arrow{font-size:20px;color:var(--text-tertiary)}

        .platform-stats{display:flex;align-items:center;justify-content:center;gap:var(--space-xl)}
        .ps{display:flex;flex-direction:column;align-items:center}.ps-val{font-size:28px;font-weight:800;background:var(--gradient-cyan);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.ps-label{font-size:12px;color:var(--text-tertiary);margin-top:4px}
        .ps-div{width:1px;height:36px;background:var(--border-subtle)}

        .section{padding:0 0 var(--space-4xl)}
        .filter-bar{display:flex;align-items:center;gap:var(--space-xl);margin-bottom:var(--space-xl);flex-wrap:wrap}
        .filter-section{display:flex;align-items:center;gap:var(--space-sm)}.filter-label{font-size:12px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.5px}
        .filter-count{margin-left:auto;font-size:13px;color:var(--text-tertiary);font-family:var(--font-mono)}

        .platform-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-lg)}
        .platform-card{display:flex;flex-direction:column;padding:var(--space-xl);animation:fadeInUp .6s ease-out both;position:relative}
        .pc-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:var(--space-md)}
        .pc-icon{width:48px;height:48px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
        .pc-badges{display:flex;flex-wrap:wrap;gap:4px}
        .platform-card h3{font-size:18px;font-weight:700;margin-bottom:4px}
        .pc-name{font-size:12px;font-family:var(--font-mono);color:var(--text-tertiary);margin-bottom:var(--space-sm)}
        .pc-desc{font-size:13px;color:var(--text-secondary);line-height:1.6;margin-bottom:var(--space-md);flex:1}
        .pc-tags{display:flex;flex-wrap:wrap;gap:6px}
        .pc-arrow{position:absolute;top:var(--space-xl);right:var(--space-xl);font-size:18px;color:var(--text-tertiary);opacity:0;transform:translateX(-4px);transition:all var(--transition-fast)}
        .platform-card:hover .pc-arrow{opacity:1;transform:translateX(0)}

        @media(max-width:900px){.platform-grid{grid-template-columns:1fr}.pipeline-visual{gap:var(--space-sm)}.pv-step{padding:var(--space-sm);min-width:70px}}
        @media(max-width:640px){.filter-bar{flex-direction:column;align-items:flex-start}.filter-count{margin-left:0}}
      `}</style>
        </>
    );
}
