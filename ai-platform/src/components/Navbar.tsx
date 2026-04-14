'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  const links = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/simulators', label: '기초과학 시뮬레이터', icon: '🧪' },
    { href: '/ai-platform', label: 'R&D 플랫폼', icon: '🚀' },
    { href: '/data', label: '데이터 관리', icon: '📊' },
    { href: '/community', label: '커뮤니티', icon: '💬' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          <div className="brand-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#brand-grad)" />
              <path d="M8 14L14 8L20 14L14 20L8 14Z" fill="#0a0a0f" fillOpacity="0.6" />
              <path d="M14 10L18 14L14 18L10 14L14 10Z" fill="#fff" fillOpacity="0.9" />
              <defs>
                <linearGradient id="brand-grad" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#00e5ff" />
                  <stop offset="1" stopColor="#b388ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="brand-text">Meta<span className="brand-ai"> R&D</span></span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${link.href === '/' ? (pathname === '/' ? 'active' : '') : pathname.startsWith(link.href) ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="user-badge">{session.user?.name || '담당자'} 님</span>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>
                로그아웃
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary">로그인</Link>
          )}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--navbar-height);
          background: rgba(10,10,15,0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-subtle);
          z-index: 1000;
        }
        .navbar-inner {
          max-width: 1440px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--space-xl);
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }
        .brand-icon {
          display: flex;
          align-items: center;
        }
        .brand-text {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .brand-ai {
          background: var(--gradient-cyan);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }
        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.05);
        }
        .nav-link.active {
          color: var(--accent-cyan);
          background: var(--accent-cyan-dim);
        }
        .nav-icon {
          font-size: 16px;
        }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }
        .btn-sm {
          padding: 8px 16px;
          font-size: 13px;
        }
        .mobile-toggle {
          display: none;
          font-size: 20px;
          padding: 8px;
          color: var(--text-secondary);
        }
        @media (max-width: 768px) {
          .navbar-links {
            position: fixed;
            top: var(--navbar-height);
            left: 0;
            right: 0;
            flex-direction: column;
            background: rgba(10,10,15,0.95);
            backdrop-filter: blur(20px);
            padding: var(--space-md);
            border-bottom: 1px solid var(--border-subtle);
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: all var(--transition-base);
          }
          .navbar-links.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }
          .mobile-toggle { display: block; }
        }
      `}</style>
    </nav>
  );
}
