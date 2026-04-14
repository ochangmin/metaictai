'use client';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">Meta<span className="accent"> R&D</span></span>
          <p className="footer-desc">
            차세대 R&D를 위한 데이터 플랫폼
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>플랫폼</h4>
            <a href="/simulators">AI 시뮬레이터</a>
            <a href="/community">커뮤니티</a>
          </div>
          <div className="footer-col">
            <h4>리소스</h4>
            <a href="#">문서</a>
            <a href="#">API 레퍼런스</a>
          </div>
          <div className="footer-col">
            <h4>회사</h4>
            <a href="#">소개</a>
            <a href="#">연락처</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Meta R&D. All rights reserved.</span>
      </div>

      <style jsx>{`
        .footer {
          border-top: 1px solid var(--border-subtle);
          background: var(--bg-secondary);
          padding: var(--space-3xl) 0 0;
        }
        .footer-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-xl);
          display: flex;
          justify-content: space-between;
          gap: var(--space-3xl);
          flex-wrap: wrap;
        }
        .footer-brand {
          max-width: 280px;
        }
        .footer-logo {
          font-size: 20px;
          font-weight: 800;
        }
        .accent {
          background: var(--gradient-cyan);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-desc {
          margin-top: var(--space-sm);
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .footer-links {
          display: flex;
          gap: var(--space-3xl);
        }
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .footer-col h4 {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-tertiary);
          margin-bottom: var(--space-xs);
        }
        .footer-col a {
          font-size: 14px;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }
        .footer-col a:hover {
          color: var(--accent-cyan);
        }
        .footer-bottom {
          max-width: 1400px;
          margin: var(--space-2xl) auto 0;
          padding: var(--space-lg) var(--space-xl);
          border-top: 1px solid var(--border-subtle);
          text-align: center;
          font-size: 13px;
          color: var(--text-tertiary);
        }
        @media (max-width: 640px) {
          .footer-inner { flex-direction: column; gap: var(--space-xl); }
          .footer-links { flex-direction: column; gap: var(--space-xl); }
        }
      `}</style>
    </footer>
  );
}
