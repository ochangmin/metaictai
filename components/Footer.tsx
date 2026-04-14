
import React from 'react';
import { Page } from '../types';
import Logo from './Logo';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

const MemberName: React.FC<{ name: string; gradientClass: string; phoneNumber: string }> = ({ name, gradientClass, phoneNumber }) => (
  <a 
    href={`tel:${phoneNumber}`}
    className={`transition-all duration-300 hover:font-black hover:bg-gradient-to-r ${gradientClass} hover:bg-clip-text hover:text-transparent cursor-pointer inline-block`}
  >
    {name}
  </a>
);

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const handleCorsetRedirect = () => {
    window.open("https://metacorset2026.vercel.app/", "_blank", "noopener,noreferrer");
  };

  const handleMtdRedirect = () => {
    window.open("https://mtdp-tau.vercel.app/", "_blank", "noopener,noreferrer");
  };

  const handleSonicRedirect = () => {
    window.open("https://mata-sonic.vercel.app/", "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-gray-950/50 border-t border-gray-800 text-gray-400">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          <div className="group">
            <button 
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mb-4 flex justify-center md:justify-start outline-none transition-transform hover:scale-105"
            >
              <Logo />
            </button>
            <p className="mt-2 text-sm transition-colors duration-300 group-hover:text-white">AI로 미래를 선도하는 기업, (주)메타아이씨티</p>
            
            {/* 핵심 플랫폼 퀵 링크 섹션 */}
            <div className="mt-10 pt-6 border-t border-white/5 space-y-6">
               <div>
                  <h4 className="font-semibold text-white/50 text-[10px] uppercase tracking-[0.3em] mb-2 select-none">Featured Fashion AI</h4>
                  <button 
                    onClick={handleCorsetRedirect}
                    className="block w-full md:w-auto text-left text-2xl font-black italic tracking-tighter bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-500 select-none cursor-pointer outline-none focus:outline-none"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    METACORSET
                  </button>
               </div>

               <div>
                  <h4 className="font-semibold text-white/50 text-[10px] uppercase tracking-[0.3em] mb-2 select-none">Featured Health AI</h4>
                  <button 
                    onClick={handleMtdRedirect}
                    className="block w-full md:w-auto text-left text-2xl font-black italic tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.6)] transition-all duration-500 select-none cursor-pointer outline-none focus:outline-none"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    MTD PLATFORM
                  </button>
               </div>

               <div>
                  <h4 className="font-semibold text-white/50 text-[10px] uppercase tracking-[0.3em] mb-2 select-none">Featured Audio AI</h4>
                  <button 
                    onClick={handleSonicRedirect}
                    className="block w-full md:w-auto text-left text-2xl font-black italic tracking-tighter bg-gradient-to-r from-fuchsia-500 to-rose-500 bg-clip-text text-transparent hover:drop-shadow-[0_0_15px_rgba(217,70,239,0.6)] transition-all duration-500 select-none cursor-pointer outline-none focus:outline-none"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    SONIC IDENTITY
                  </button>
               </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2 inline-block">Key Members</h4>
            <ul className="space-y-2 text-sm">
              <li className="group">
                <span className="font-semibold text-gray-300 transition-colors duration-300 group-hover:text-orange-500">CEO :</span>{' '}
                <MemberName 
                  name="YU JEONG - LEE" 
                  gradientClass="hover:from-orange-600 hover:via-orange-400 hover:to-white" 
                  phoneNumber="01077284676"
                />
              </li>
              <li className="group">
                <span className="font-semibold text-gray-300 transition-colors duration-300 group-hover:text-orange-500">CTO :</span>{' '}
                <MemberName 
                  name="CHANG MIN - OH" 
                  gradientClass="hover:from-purple-500 hover:to-blue-500" 
                  phoneNumber="01077284676"
                />
              </li>
              <li className="group">
                <span className="font-semibold text-gray-300 transition-colors duration-300 group-hover:text-orange-500">TL :</span>{' '}
                <MemberName 
                  name="YOUNG HUN - GO" 
                  gradientClass="hover:from-blue-500 hover:to-green-500" 
                  phoneNumber="01094662760"
                />
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2 inline-block">Contact & Location</h4>
            <ul className="space-y-2 text-sm">
              <li className="group cursor-pointer">
                <span className="font-semibold text-gray-300 transition-colors duration-300 group-hover:text-orange-500">Email:</span> 
                <span className="ml-1 transition-colors duration-300 group-hover:text-white">ocm@metaict.kr</span>
              </li>
              <li className="pt-1 group cursor-pointer">
                <span className="font-semibold text-gray-300 transition-colors duration-300 group-hover:text-orange-500">Address:</span><br/>
                <span className="transition-colors duration-300 group-hover:text-white">대전광역시 유성구 반석동 하이클래스 빌딩 8층</span>
              </li>
              <li className="pt-1 group cursor-pointer">
                <span className="font-semibold text-gray-300 transition-colors duration-300 group-hover:text-orange-500">R&D:</span><br/>
                <span className="transition-colors duration-300 group-hover:text-white">세종특별자치시 보람동 대방디엠시티센트럴스카이아파트 201호</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setCurrentPage('privacy')} className="hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block">개인정보처리방침</button></li>
              <li><button onClick={() => setCurrentPage('terms')} className="hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block">이용약관</button></li>
              <li><button onClick={() => setCurrentPage('admin')} className="hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block font-bold">CMS CONTROLLER</button></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p className="cursor-default font-black uppercase tracking-wider inline-block animate-rainbow-flow select-none">
            &copy; {new Date().getFullYear()} META ICT Co., Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
