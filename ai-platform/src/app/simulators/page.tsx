'use client';

import Link from 'next/link';
import { useState } from 'react';
import { simulators } from '@/data/simulators';

export default function SimulatorsPage() {
    const [search, setSearch] = useState('');
    const [selectedCat, setSelectedCat] = useState('전체');

    const categories = ['전체', ...Array.from(new Set(simulators.map(s => s.category)))];

    const filtered = simulators.filter(s => {
        const matchSearch = s.nameKo.includes(search) || s.name.toLowerCase().includes(search.toLowerCase()) || s.description.includes(search);
        const matchCat = selectedCat === '전체' || s.category === selectedCat;
        return matchSearch && matchCat;
    });

    return (
        <div className="page-container">
            {/* Header */}
            <div className="hub-header">
                <div className="hub-header-text">
                    <span className="badge badge-cyan">R&D SIMULATORS</span>
                    <h1>AI 시뮬레이터 허브</h1>
                    <p>10가지 최첨단 AI 도구를 지금 바로 탐색하세요</p>
                </div>
            </div>

            {/* Filters */}
            <div className="hub-filters">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="시뮬레이터 검색..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="cat-pills">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`cat-pill ${selectedCat === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCat(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="sim-hub-grid">
                {filtered.map((sim, i) => (
                    <Link
                        key={sim.id}
                        href={`/simulators/${sim.id}`}
                        className="sim-hub-card glass-card"
                        style={{ animationDelay: `${i * 60}ms` }}
                    >
                        <div className="shc-header">
                            <div className="shc-icon" style={{ background: sim.gradient }}>
                                <span>{sim.icon}</span>
                            </div>
                            <span className="shc-category">{sim.category}</span>
                        </div>
                        <h3>{sim.nameKo}</h3>
                        <p className="shc-name">{sim.name}</p>
                        <p className="shc-desc">{sim.description}</p>
                        <div className="shc-tags">
                            {sim.tags.map(tag => (
                                <span key={tag} className="sim-tag">{tag}</span>
                            ))}
                        </div>
                        <div className="shc-footer">
                            <span className="shc-cta">시뮬레이터 실행 →</span>
                        </div>
                    </Link>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="no-results">
                    <span>🔍</span>
                    <p>검색 결과가 없습니다</p>
                </div>
            )}

            <style jsx>{`
        .hub-header {
          padding: var(--space-2xl) 0;
          text-align: center;
        }
        .hub-header h1 {
          font-size: 36px;
          font-weight: 900;
          letter-spacing: -1px;
          margin: 12px 0 8px;
        }
        .hub-header p {
          color: var(--text-secondary);
          font-size: 16px;
        }
        .hub-filters {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
          margin-bottom: var(--space-2xl);
          flex-wrap: wrap;
        }
        .search-box {
          position: relative;
          flex: 1;
          min-width: 240px;
        }
        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
        }
        .search-box .input-field {
          padding-left: 40px;
        }
        .cat-pills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .cat-pill {
          padding: 7px 14px;
          font-size: 13px;
          font-weight: 500;
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          transition: all var(--transition-fast);
        }
        .cat-pill:hover { color: var(--text-primary); border-color: var(--border-medium); }
        .cat-pill.active {
          color: var(--accent-cyan);
          background: var(--accent-cyan-dim);
          border-color: rgba(0,229,255,0.3);
        }

        .sim-hub-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-lg);
        }
        .sim-hub-card {
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          animation: fadeInUp 0.5s ease-out both;
        }
        .shc-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-md);
        }
        .shc-icon {
          width: 48px; height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }
        .shc-category {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-tertiary);
        }
        .sim-hub-card h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .shc-name {
          font-size: 12px;
          font-family: var(--font-mono);
          color: var(--text-tertiary);
          margin-bottom: var(--space-sm);
        }
        .shc-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          flex: 1;
          margin-bottom: var(--space-md);
        }
        .shc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: var(--space-md);
        }
        .sim-tag {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          background: rgba(255,255,255,0.05);
          color: var(--text-tertiary);
        }
        .shc-footer {
          border-top: 1px solid var(--border-subtle);
          padding-top: var(--space-md);
        }
        .shc-cta {
          font-size: 13px;
          font-weight: 600;
          color: var(--accent-cyan);
          transition: all var(--transition-fast);
        }
        .sim-hub-card:hover .shc-cta {
          letter-spacing: 0.5px;
        }
        .no-results {
          text-align: center;
          padding: var(--space-4xl);
          color: var(--text-tertiary);
        }
        .no-results span {
          font-size: 48px;
          display: block;
          margin-bottom: var(--space-md);
        }

        @media (max-width: 640px) {
          .hub-filters { flex-direction: column; }
          .sim-hub-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
}
