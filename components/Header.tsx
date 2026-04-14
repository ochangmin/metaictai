
import React, { useState } from 'react';
import { Page } from '../types';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';
import Logo from './Logo';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isScrolled: boolean;
  hasMusic?: boolean;
  isMuted?: boolean;
  toggleMute?: () => void;
}

const NavLink: React.FC<{ page: Page; currentPage: Page; setCurrentPage: (page: Page) => void; children: React.ReactNode; onClick?: () => void; }> = ({ page, currentPage, setCurrentPage, children, onClick }) => (
  <button
    onClick={() => {
      setCurrentPage(page);
      if (onClick) onClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
    className={`px-4 xl:px-6 py-2 text-sm xl:text-base font-black tracking-widest uppercase transition-all duration-300 ${
      currentPage === page 
        ? 'text-orange-500' 
        : 'text-gray-400 hover:bg-gradient-to-r hover:from-orange-600 hover:via-orange-400 hover:to-white hover:bg-clip-text hover:text-transparent'
    }`}
  >
    {children}
  </button>
);

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, isScrolled, hasMusic, isMuted, toggleMute }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { page: Page; label: string }[] = [
    { page: 'about', label: '회사소개' },
    { page: 'services', label: 'AI 솔루션' },
    { page: 'technology', label: '프로젝트소개' },
    { page: 'resource', label: '자료실' },
    { page: 'contact', label: '문의하기' },
  ];

  const handleLogoClick = () => {
    setCurrentPage('home');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled || isMobileMenuOpen ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button onClick={handleLogoClick} className="flex items-center group outline-none">
          <Logo className="transition-transform duration-300 group-hover:scale-105" />
        </button>
        
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map(item => (
            <NavLink key={item.page} page={item.page} currentPage={currentPage} setCurrentPage={setCurrentPage}>
              {item.label}
            </NavLink>
          ))}
          
          {hasMusic && (
            <button 
              onClick={toggleMute}
              className="ml-4 p-2 text-white/50 hover:text-orange-500 transition-colors"
              title={isMuted ? "음악 켜기" : "음악 끄기"}
            >
              {isMuted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
              ) : (
                <svg className="w-5 h-5 animate-pulse text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
              )}
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center space-x-4">
          {hasMusic && (
             <button onClick={toggleMute} className="text-white/50">{isMuted ? "🔇" : "🔊"}</button>
          )}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none p-2 relative z-50">
            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/98 h-screen z-40 flex flex-col items-center justify-center animate-fade-in">
          <nav className="flex flex-col items-center space-y-12 w-full px-6">
            {navItems.map((item, index) => (
              <button
                key={item.page}
                onClick={() => {
                  setCurrentPage(item.page);
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ animationDelay: `${index * 150}ms` }}
                className={`animate-mobile-menu-item text-4xl md:text-5xl font-black tracking-tighter uppercase transition-all duration-500 transform hover:scale-110 active:scale-95 opacity-0 ${
                  currentPage === item.page 
                    ? 'bg-gradient-to-r from-orange-400 to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(234,88,12,0.5)]' 
                    : 'bg-gradient-to-r from-orange-800 via-orange-600 to-gray-400 bg-clip-text text-transparent hover:from-orange-500 hover:to-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="mt-16 w-12 h-px bg-white/10 animate-fade-in" style={{ animationDelay: '800ms' }}></div>
            
            <button 
                onClick={handleLogoClick}
                className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.5em] hover:text-orange-500 transition-colors duration-500 animate-fade-in"
                style={{ animationDelay: '1000ms' }}
            >
                Back to Ground
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
