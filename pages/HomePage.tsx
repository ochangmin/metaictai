
import React from 'react';
import { Page, HomepageService, MainVisual } from '../types';
import ArrowRightIcon from '../components/icons/ArrowRightIcon';
import TechPartners from '../components/TechPartners';
import HeroSolarSystem from '../components/HeroSolarSystem';
import IconRenderer from '../components/IconRenderer';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
  services: HomepageService[];
  mainVisuals: MainVisual[];
  isMuted: boolean;
  toggleMute: () => void;
  allData: any;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage, services, mainVisuals, isMuted, toggleMute, allData }) => {
  const heroVisual = mainVisuals.find(v => v.category === 'Hero') || mainVisuals[0];

  return (
    <div className="animate-fade-in relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Dynamic Background Image from CMS */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          {heroVisual && (
             <img 
               src={heroVisual.imageUrl} 
               className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-105" 
               alt="Hero Background"
             />
          )}
        </div>

        {/* Background Visual (Solar System) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-1/2 h-full z-10 pointer-events-none opacity-60 md:opacity-100">
           <HeroSolarSystem />
        </div>

        <div className="container mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-2/3 text-left">
            <h1 className="text-6xl md:text-9xl font-black leading-[0.9] tracking-tighter mb-6 uppercase">
              <span className="block text-white">Advanced</span>
              <span className="text-cosmic">AI Systems</span>
            </h1>
            <div className="max-w-xl">
               <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 leading-relaxed border-l-4 border-orange-500 pl-6">
                메타아이씨티는 우주의 질서처럼 정교한 <br /> 
                <span className="text-white font-medium">인공지능 재료</span>로 새로운 비즈니스의 지평을 엽니다.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setCurrentPage('services')}
                  className="group relative inline-flex items-center px-8 py-4 font-bold text-white transition-all duration-300 bg-transparent border-2 border-white/30 hover:border-orange-500 rounded-sm overflow-hidden"
                >
                  <span className="absolute inset-0 w-0 h-full bg-orange-600 transition-all duration-300 ease-out group-hover:w-full -z-10"></span>
                  VIEW MORE
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Particle overlay */}
        <div className="absolute bottom-10 left-10 text-xs tracking-widest text-gray-500 vertical-text hidden md:block uppercase">
          Technology & Science / Meta ICT Co.
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div className="text-left">
              <h2 className="text-sm tracking-[0.4em] text-orange-500 font-bold uppercase mb-4">Our Intelligence</h2>
              <h3 className="text-4xl md:text-6xl font-black text-white uppercase">Core Technology</h3>
            </div>
            <p className="text-gray-400 max-w-md text-right hidden md:block">
              우리는 데이터를 단순한 정보가 아닌 비즈니스를 움직이는 핵심 소자로 취급합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group relative bg-white/[0.03] border border-white/10 p-10 transition-all duration-500 hover:bg-white/[0.08] hover:border-orange-500/50">
                <div className="text-white mb-10 group-hover:text-orange-500 transition-colors transform group-hover:scale-110 duration-500">
                  <IconRenderer iconName={service.icon} className="w-12 h-12" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-white group-hover:translate-x-2 transition-transform">{service.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">{service.description}</p>
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:border-orange-500 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Technology Ecosystem Section */}
      <section className="py-24 border-y border-white/5 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm tracking-[0.4em] text-orange-500 font-bold uppercase mb-4">Technology Ecosystem</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase">Powered by the Best</h3>
          </div>
          <TechPartners />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
