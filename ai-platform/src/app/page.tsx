'use client';

import Link from 'next/link';
import { simulators } from '@/data/simulators';
import { platforms } from '@/data/platforms';

export default function HomePage() {
  const featured = simulators.slice(0, 6);

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="grid-overlay" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot" />
            <span>R&D AI Platform — Now Live</span>
          </div>

          <h1 className="hero-title">
            차세대 연구를 위한<br />
            <span className="text-gradient">데이터 기반 R&D 중심</span>
          </h1>

          <p className="hero-desc">
            50개 기초과학 시뮬레이터와 10개 데이터 기반 R&D 플랫폼으로<br />
            차세대 농업과 환경 연구 역량을 강화합니다.
          </p>

          <div className="hero-actions">
            <Link href="/ai-platform" className="btn btn-primary btn-lg">
              🚀 R&D 플랫폼 →
            </Link>
            <Link href="/simulators" className="btn btn-secondary btn-lg">
              🧪 시뮬레이터
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">50+</span>
              <span className="stat-label">기초과학 시뮬레이터</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">10</span>
              <span className="stat-label">R&D 플랫폼</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">3</span>
              <span className="stat-label">데이터 파이프라인</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Platform Preview ── */}
      <section className="section">
        <div className="page-container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="badge badge-purple">AI PLATFORM — NEW</span>
            <h2 style={{ marginTop: '12px' }}>데이터 기반 AI 플랫폼</h2>
            <p style={{ margin: '0 auto' }}>
              API로 수집하고, 데이터를 입력하고, AI로 분석합니다. 농업·환경 실무 AI를 경험하세요.
            </p>
          </div>

          {/* Data Pipeline */}
          <div className="pipeline-row">
            <div className="pl-card"><span className="pl-emoji">🔗</span><h4>API 연동</h4><p>기상·대기질·IoT 센서 데이터를 실시간으로 수집합니다.</p></div>
            <span className="pl-arrow">→</span>
            <div className="pl-card"><span className="pl-emoji">📝</span><h4>데이터 입력</h4><p>토양·수질·경영 데이터를 직접 입력하여 AI 분석에 활용합니다.</p></div>
            <span className="pl-arrow">→</span>
            <div className="pl-card"><span className="pl-emoji">📊</span><h4>AI 분석</h4><p>생육 추세, 탄소 배출, 생태 다양성을 AI가 분석합니다.</p></div>
          </div>

          <div className="sim-grid">
            {platforms.slice(0, 6).map((p, i) => (
              <Link key={p.id} href={`/ai-platform/${p.id}`} className="sim-card glass-card" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="sim-card-icon" style={{ background: p.gradient }}><span>{p.icon}</span></div>
                <div className="sim-card-body">
                  <div className="sim-card-category">{p.domain} · {p.dataTypeKo}</div>
                  <h3>{p.nameKo}</h3>
                  <p>{p.description}</p>
                  <div className="sim-card-tags">{p.tags.map(tag => (<span key={tag} className="sim-tag">{tag}</span>))}</div>
                </div>
                <div className="sim-card-arrow">→</div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/ai-platform" className="btn btn-primary">R&D 플랫폼 전체 보기 →</Link>
          </div>
        </div>
      </section>

      {/* ── Basic Science Simulators ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="page-container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="badge badge-cyan">BASIC SCIENCE</span>
            <h2 style={{ marginTop: '12px' }}>기초과학 R&D 시뮬레이터</h2>
            <p style={{ margin: '0 auto' }}>바이오, 재료공학, 경제학, 의료 등 50개 AI 시뮬레이터를 브라우저에서 직접 체험하세요.</p>
          </div>
          <div className="sim-grid">
            {featured.map((sim, i) => (
              <Link key={sim.id} href={`/simulators/${sim.id}`} className="sim-card glass-card" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="sim-card-icon" style={{ background: sim.gradient }}><span>{sim.icon}</span></div>
                <div className="sim-card-body">
                  <div className="sim-card-category">{sim.category}</div>
                  <h3>{sim.nameKo}</h3>
                  <p>{sim.description}</p>
                  <div className="sim-card-tags">{sim.tags.map(tag => (<span key={tag} className="sim-tag">{tag}</span>))}</div>
                </div>
                <div className="sim-card-arrow">→</div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/simulators" className="btn btn-secondary">기초과학 시뮬레이터 전체 보기 →</Link>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="section features-section">
        <div className="page-container">
          <div className="section-head text-center">
            <span className="badge badge-purple">PLATFORM FEATURES</span>
            <h2 style={{ marginTop: '12px' }}>왜 Meta R&D 플랫폼인가?</h2>
          </div>

          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="feature-icon">🔗</div>
              <h3>실시간 API 연동</h3>
              <p>기상청, 에어코리아, IoT 센서 등 외부 데이터를 실시간으로 수집·분석합니다.</p>
            </div>
            <div className="feature-card glass-card">
              <div className="feature-icon">📝</div>
              <h3>현장 데이터 입력</h3>
              <p>토양·수질·경영 데이터를 직접 입력하면 AI가 즉시 분석 결과를 제공합니다.</p>
            </div>
            <div className="feature-card glass-card">
              <div className="feature-icon">📊</div>
              <h3>AI 데이터 분석</h3>
              <p>생육 추세, 탄소 배출, 생태 다양성 데이터를 AI가 자동 분석합니다.</p>
            </div>
            <div className="feature-card glass-card">
              <div className="feature-icon">🧪</div>
              <h3>기초과학 시뮬레이터</h3>
              <p>50개 분야의 R&D AI를 브라우저에서 직접 실행하고 결과를 확인합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="cta-section">
        <div className="cta-bg">
          <div className="orb orb-cta-1" />
          <div className="orb orb-cta-2" />
        </div>
        <div className="page-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2>지금 바로 시작하세요</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '12px', marginBottom: '32px' }}>
            무료로 AI 시뮬레이터를 체험하고 연구 커뮤니티에 참여하세요.
          </p>
          <Link href="/simulators" className="btn btn-primary btn-lg">
            무료로 시작하기 →
          </Link>
        </div>
      </section>

      <style jsx>{`
        /* ── Hero ── */
        .hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.4;
        }
        .orb-1 {
          width: 600px; height: 600px;
          background: #7c4dff;
          top: -200px; left: -100px;
          animation: pulse-glow 6s ease-in-out infinite;
        }
        .orb-2 {
          width: 500px; height: 500px;
          background: #00e5ff;
          bottom: -150px; right: -100px;
          animation: pulse-glow 8s ease-in-out infinite 2s;
        }
        .orb-3 {
          width: 350px; height: 350px;
          background: #00e676;
          top: 50%; left: 60%;
          animation: pulse-glow 7s ease-in-out infinite 1s;
        }
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: var(--space-2xl);
          animation: fadeInUp 0.8s ease-out;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,229,255,0.08);
          border: 1px solid rgba(0,229,255,0.2);
          padding: 6px 16px;
          border-radius: var(--radius-full);
          font-size: 13px;
          font-weight: 600;
          color: var(--accent-cyan);
          margin-bottom: var(--space-xl);
        }
        .pulse-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--accent-cyan);
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .hero-title {
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1.1;
          margin-bottom: var(--space-lg);
        }
        .hero-desc {
          font-size: clamp(15px, 2vw, 18px);
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: var(--space-2xl);
        }
        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-md);
          margin-bottom: var(--space-3xl);
        }
        .btn-lg {
          padding: 14px 32px;
          font-size: 15px;
          border-radius: var(--radius-md);
        }
        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-xl);
        }
        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .stat-value {
          font-size: 28px;
          font-weight: 800;
          background: var(--gradient-cyan);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-label {
          font-size: 13px;
          color: var(--text-tertiary);
          margin-top: 4px;
        }
        .stat-divider {
          width: 1px;
          height: 40px;
          background: var(--border-subtle);
        }

        /* ── Section ── */
        .section {
          padding: var(--space-4xl) 0;
        }

        /* ── Simulator Grid ── */
        .sim-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
        }
        .sim-card {
          display: flex;
          flex-direction: column;
          padding: var(--space-lg);
          animation: fadeInUp 0.6s ease-out both;
          position: relative;
        }
        .sim-card-icon {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-bottom: var(--space-md);
          flex-shrink: 0;
        }
        .sim-card-body {
          flex: 1;
        }
        .sim-card-category {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-tertiary);
          margin-bottom: 6px;
        }
        .sim-card h3 {
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .sim-card p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-md);
        }
        .sim-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .sim-tag {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          background: rgba(255,255,255,0.05);
          color: var(--text-tertiary);
        }
        .sim-card-arrow {
          position: absolute;
          top: var(--space-lg);
          right: var(--space-lg);
          font-size: 18px;
          color: var(--text-tertiary);
          opacity: 0;
          transform: translateX(-4px);
          transition: all var(--transition-fast);
        }
        .sim-card:hover .sim-card-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Features ── */
        .features-section {
          background: var(--bg-secondary);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-lg);
        }
        .feature-card {
          padding: var(--space-xl);
          text-align: center;
        }
        .feature-icon {
          font-size: 36px;
          margin-bottom: var(--space-md);
        }
        .feature-card h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .feature-card p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ── CTA ── */
        .cta-section {
          position: relative;
          padding: var(--space-4xl) 0;
          overflow: hidden;
        }
        .cta-bg {
          position: absolute;
          inset: 0;
        }
        .orb-cta-1 {
          width: 400px; height: 400px;
          background: #7c4dff;
          top: -100px; left: 30%;
          filter: blur(120px);
          opacity: 0.25;
        }
        .orb-cta-2 {
          width: 300px; height: 300px;
          background: #00e5ff;
          bottom: -80px; right: 20%;
          filter: blur(100px);
          opacity: 0.2;
        }
        .cta-section h2 {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -1px;
        }

        /* ── Pipeline Row ── */
        .pipeline-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-md);
          margin-bottom: var(--space-2xl);
          flex-wrap: wrap;
        }
        .pl-card {
          flex: 1;
          min-width: 200px;
          max-width: 280px;
          padding: var(--space-lg);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          text-align: center;
        }
        .pl-card h4 { font-size: 15px; font-weight: 700; margin: 8px 0 6px; }
        .pl-card p { font-size: 12px; color: var(--text-secondary); line-height: 1.5; }
        .pl-emoji { font-size: 32px; }
        .pl-arrow { font-size: 20px; color: var(--text-tertiary); }

        @media (max-width: 900px) {
          .sim-grid { grid-template-columns: repeat(2, 1fr); }
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .sim-grid { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
          .hero-actions { flex-direction: column; }
          .hero-stats { flex-wrap: wrap; }
        }
      `}</style>
    </>
  );
}
