
import React from 'react';
import { HistoryItem, Employee } from '../types';

const PageBanner: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="relative pt-60 pb-32 text-center text-white overflow-hidden bg-black">
    <div className="absolute inset-0 -z-10">
       <div className="absolute inset-0 bg-black/70 z-10"></div>
       <img 
         src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" 
         className="w-full h-full object-cover opacity-40 mix-blend-screen scale-105 animate-slow-zoom" 
         alt="Corporate Vision"
       />
    </div>
    <div className="container mx-auto px-6 relative z-20">
      <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 uppercase text-cosmic inline-block">
        {title}
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto uppercase tracking-[0.3em]">
        {subtitle}
      </p>
    </div>
    <style>{`
      @keyframes slow-zoom {
        0% { transform: scale(1); }
        100% { transform: scale(1.1); }
      }
      .animate-slow-zoom { animation: slow-zoom 20s ease-in-out infinite alternate; }
    `}</style>
  </div>
);

interface MemberCardProps {
    role: string;
    name: string;
    image: string | null;
    idLabel: string;
    children: React.ReactNode;
}

const MemberCard: React.FC<MemberCardProps> = ({ role, name, image, idLabel, children }) => (
    <div className="flex flex-col lg:flex-row gap-20 items-center py-24 border-b border-white/5 last:border-b-0">
        <div className="w-full lg:w-2/5 relative group">
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-orange-500/40 z-20"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b border-r border-orange-500/40 z-20"></div>
            
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-white/10 bg-black z-10 shadow-[0_0_60px_rgba(255,255,255,0.05)]">
                {image ? (
                    <img 
                        src={image} 
                        alt={name} 
                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-white/[0.02]">
                        <svg className="w-16 h-16 text-white/5 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        <span className="text-[10px] font-mono text-white/10 tracking-widest uppercase">Member Image Missing</span>
                    </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/90 to-transparent z-20 text-left">
                    <h4 className="text-2xl font-black text-white tracking-tighter uppercase mb-1">{name}</h4>
                    <div className="flex items-center space-x-3">
                        <span className="text-orange-500 text-[10px] font-bold tracking-[0.4em] uppercase">{role}</span>
                        <div className="w-8 h-px bg-orange-500/30"></div>
                        <span className="text-gray-500 text-[8px] font-mono">{idLabel}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="w-full lg:w-3/5 space-y-6 text-left">
            {children}
        </div>
    </div>
);

interface AboutPageProps {
  historyData: HistoryItem[];
  employees: Employee[];
}

const AboutPage: React.FC<AboutPageProps> = ({ historyData, employees }) => {
  return (
    <div className="animate-fade-in pb-40 bg-[#050505] min-h-screen">
      <PageBanner title="About Us" subtitle="Innovation and Human Potential" />
      
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-24 text-center">
            <h2 className="text-sm tracking-[0.5em] text-orange-500 font-bold uppercase mb-6">Our Vision</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
              Bridging Intelligence <br /> <span className="text-cosmic">Beyond Boundaries</span>
            </h3>
          </div>
          
          {employees.map((emp) => (
            <MemberCard 
              key={emp.id}
              role={emp.role} 
              name={emp.name} 
              image={emp.imageUrl} 
              idLabel={emp.idLabel}
            >
                <div className="flex items-center space-x-2 mb-2">
                    <div className="w-10 h-0.5 bg-orange-500"></div>
                    <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">{emp.role} MESSAGE</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight tracking-tighter mb-6">
                    {emp.role.split(' / ')[0]} <span className="text-cosmic">{emp.name.split(' - ')[0]}</span>
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed font-light whitespace-pre-wrap border-l-2 border-white/5 pl-8 italic">
                    "{emp.description}"
                </p>
            </MemberCard>
          ))}
        </div>
      </section>

      {/* Corporate Philosophy Section - 이미지 디자인 완벽 재현 */}
      <section className="py-52 bg-[#050505] relative overflow-hidden border-y border-white/5">
        {/* 고정 배경 레이어: 이미지 로딩 안되도 구조가 잡히도록 absolute 유지 */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80" 
                className="w-full h-full object-cover mix-blend-screen" 
                alt="Technical Circuitry" 
            />
        </div>
        
        <div className="container mx-auto px-6 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-32">
                {[
                    { 
                        id: '01', 
                        title: 'TRUST', 
                        desc: '고객과의 신뢰를 기술의 근본으로 삼습니다.' 
                    },
                    { 
                        id: '02', 
                        title: 'INNOVATION', 
                        desc: '어제보다 나은 오늘의 AI 모델을 개발합니다.' 
                    },
                    { 
                        id: '03', 
                        title: 'IMPACT', 
                        desc: '현실의 비즈니스를 실제로 변화시키는 가치를 만듭니다.' 
                    }
                ].map((item) => (
                    <div key={item.id} className="relative group text-center flex flex-col items-center justify-center">
                        {/* 이미지와 동일한 배경 숫자 재현 */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[16rem] font-black text-white/[0.03] select-none tracking-tighter pointer-events-none font-mono group-hover:text-orange-500/[0.05] transition-colors duration-700">
                            {item.id}
                        </div>
                        
                        <div className="relative z-10 py-10">
                            <h4 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-[0.25em] mb-6 group-hover:text-orange-500 transition-colors duration-700">
                                {item.title}
                            </h4>
                            <p className="text-gray-400 text-xs md:text-sm lg:text-base font-normal leading-relaxed max-w-[300px] mx-auto group-hover:text-gray-200 transition-colors duration-700">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
                <div className="text-left">
                    <h2 className="text-sm tracking-[0.4em] text-orange-500 font-bold uppercase mb-4">Our History</h2>
                    <h3 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">Milestones</h3>
                </div>
                <p className="text-gray-500 text-right max-w-xs font-mono text-xs uppercase tracking-widest pb-2">
                    Chronicle of Innovation<br/>2024 - 2026 Roadmap
                </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-[26px] top-4 h-[calc(100%-40px)] w-px bg-white/5"></div>
                <div className="space-y-24">
                    {historyData.map((item) => (
                        <div key={item.id} className="relative pl-20 group text-left">
                            <div className="absolute left-0 top-1.5 flex items-center justify-center w-14 h-14 bg-black border border-white/10 rounded-full group-hover:border-orange-500 transition-colors duration-500 z-10">
                                <span className="text-[10px] font-black text-white/40 group-hover:text-orange-500 transition-colors">{item.year.substring(0,4)}</span>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-2">{item.year}</p>
                                    <h4 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter group-hover:text-cosmic transition-all duration-700">{item.title}</h4>
                                </div>
                                <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
                                    {item.details.map((detail, i) => (
                                        <li key={i} className="flex items-start space-x-3 text-gray-400">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-500/30 group-hover:bg-orange-500 flex-shrink-0"></div>
                                            <p className="text-sm font-light leading-relaxed">{detail}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
