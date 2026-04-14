
import React, { useState } from 'react';
import HeroSolarSystem from '../components/HeroSolarSystem';
import { CertifiedTech } from '../types';
import XIcon from '../components/icons/XIcon';

const TechStatusIcons: React.FC<{ types: string[] }> = ({ types }) => (
    <div className="flex space-x-3 mt-4">
        {types.includes('snowflake') && (
            <div className="group/icon relative">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400 fill-current animate-pulse group-hover/icon:text-blue-200 transition-colors drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]">
                    <path d="M12 2L14.5 9H21.5L16 13.5L18.5 20.5L13 16L7.5 20.5L10 13.5L4.5 9H11.5L14 2Z" />
                </svg>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">SNOWFLAKE</span>
            </div>
        )}
        {types.includes('databricks') && (
            <div className="group/icon relative">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-500 fill-current animate-pulse group-hover/icon:text-red-300 transition-colors drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" style={{ animationDelay: '500ms' }}>
                    <path d="M12 2L2 7L12 12L22 7L12 2Z M2 17L12 22L22 17 M2 12L12 17L22 12" />
                </svg>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-600 text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">DATABRICKS</span>
            </div>
        )}
        {types.includes('airflow') && (
            <div className="group/icon relative">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-cyan-400 fill-current animate-pulse group-hover/icon:text-cyan-200 transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" style={{ animationDelay: '1000ms' }}>
                    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
                </svg>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-cyan-600 text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">AIRFLOW</span>
            </div>
        )}
    </div>
);

const TaskCard: React.FC<{ 
    title: string; 
    path: string; 
    steps: string[]; 
    techs: string[];
    isMain?: boolean;
    colorScheme?: 'orange' | 'blue' | 'purple';
}> = ({ title, path, steps, techs, isMain, colorScheme = 'orange' }) => {
    const schemeClasses = {
        orange: 'group-hover:text-orange-400 text-orange-600',
        blue: 'group-hover:text-blue-400 text-blue-600',
        purple: 'group-hover:text-purple-400 text-purple-600'
    };

    return (
        <div className="flex flex-col space-y-4">
            <h3 className={`font-black text-xl tracking-tighter uppercase transition-colors duration-500 ${isMain ? 'animate-logo-breath' : 'text-white'}`}>
                {title}
            </h3>
            <div className={`relative bg-black/40 border p-6 rounded-sm backdrop-blur-md group transition-all duration-700 overflow-hidden animate-tech-border ${isMain ? 'ring-2 ring-white/10' : 'border-white/5 hover:border-white/20'}`}>
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#fff,transparent)] group-hover:scale-150 transition-transform duration-1000"></div>
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <p className="font-mono text-[10px] text-gray-500 group-hover:text-gray-300 transition-colors uppercase tracking-widest">{path}</p>
                    <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] animate-pulse ${schemeClasses[colorScheme]}`}></div>
                </div>
                
                <TechStatusIcons types={techs} />
                
                <div className="mt-8 space-y-4 relative z-10">
                    {steps.map((step, i) => (
                        <div key={i} className="flex items-start space-x-3">
                            <div className={`w-1.5 h-1.5 mt-1.5 rounded-full flex-shrink-0 transition-colors duration-500 ${isMain ? 'bg-orange-500' : 'bg-white/20 group-hover:bg-white/40'}`}></div>
                            <p className="text-gray-400 group-hover:text-gray-200 text-sm font-light leading-relaxed transition-colors duration-500">{step}</p>
                        </div>
                    ))}
                </div>

                <div className={`absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 transition-colors duration-500 ${isMain ? 'border-orange-500' : 'border-white/5 group-hover:border-white/30'}`}></div>
            </div>
        </div>
    );
};

interface ProjectModalProps {
    tech: CertifiedTech;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ tech, onClose }) => {
    const isCorset = tech.id === 'tech_visionary_fashion';
    const isMtd = tech.id === 'tech_mtd_platform';
    const isSonic = tech.id === 'tech_metamusic';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
            <div className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 text-gray-500 hover:text-white transition-colors bg-black/50 rounded-full">
                    <XIcon />
                </button>

                <div className="w-full md:w-1/2 h-[300px] md:h-auto overflow-hidden relative bg-black flex items-center justify-center">
                    <img src={tech.imageUrl} alt={tech.title} className="w-full h-full object-cover grayscale-[0.2]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                </div>

                <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                    <p className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 animate-pulse">Project Overview</p>
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-tight">
                        {tech.title}
                    </h2>
                    
                    <div className="space-y-8 mb-12">
                        <div>
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-l-2 border-orange-500 pl-4">Description</h3>
                            <p className="text-gray-300 text-lg leading-relaxed font-light">{tech.description}</p>
                        </div>

                        {tech.features && (
                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-l-2 border-orange-500 pl-4">Core Features</h3>
                                <ul className="space-y-3">
                                    {tech.features.map((f, i) => (
                                        <li key={i} className="flex items-start space-x-3 text-sm text-gray-400">
                                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-orange-600 flex-shrink-0"></span>
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col space-y-6">
                        {isCorset && (
                             <button 
                                onClick={() => window.open("https://metacorset2026.vercel.app/", "_blank", "noopener,noreferrer")}
                                className="w-full py-4 bg-orange-600 text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-orange-500 transition-all duration-300 rounded-sm shadow-[0_0_30px_rgba(234,88,12,0.3)] select-none cursor-pointer outline-none"
                             >
                                Launch Platform
                             </button>
                        )}
                        {isMtd && (
                             <button 
                                onClick={() => window.open("https://mtdp-tau.vercel.app/", "_blank", "noopener,noreferrer")}
                                className="w-full py-4 bg-cyan-600 text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-cyan-500 transition-all duration-300 rounded-sm shadow-[0_0_30px_rgba(34,211,238,0.3)] select-none cursor-pointer outline-none"
                             >
                                Launch Platform
                             </button>
                        )}
                        {isSonic && (
                             <button 
                                onClick={() => window.open("https://mata-sonic.vercel.app/", "_blank", "noopener,noreferrer")}
                                className="w-full py-4 bg-fuchsia-600 text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-fuchsia-500 transition-all duration-300 rounded-sm shadow-[0_0_30px_rgba(162,28,175,0.3)] select-none cursor-pointer outline-none"
                             >
                                Launch Platform
                             </button>
                        )}
                        <div className="flex flex-wrap gap-2 pt-8 border-t border-white/5">
                            {tech.tags.map((tag, i) => (
                                <span key={i} className="text-[10px] font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5 uppercase">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface TechnologyPageProps {
  certifiedTechs: CertifiedTech[];
}

const TechnologyPage: React.FC<TechnologyPageProps> = ({ certifiedTechs }) => {
  const [selectedTech, setSelectedTech] = useState<CertifiedTech | null>(null);

  return (
    <div className="animate-fade-in pb-40 bg-[#050505]">
      {/* Hero Section */}
      <section className="relative pt-48 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-40">
           <HeroSolarSystem />
        </div>
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="text-left">
                    <h1 className="text-sm tracking-[0.5em] text-orange-500 font-black uppercase mb-4 animate-pulse">Project Portfolio</h1>
                    <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                        <span className="block">Project &</span>
                        <span className="text-cosmic">Tech Stack</span>
                    </h2>
                </div>
                <div className="bg-white/[0.02] border border-white/10 px-8 py-6 rounded-sm backdrop-blur-xl group hover:border-orange-500/50 transition-all duration-500">
                    <div className="flex items-center space-x-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] mb-1">Portfolio</span>
                            <span className="text-xs font-mono text-green-400 animate-pulse">Case Archive v4.2</span>
                        </div>
                        <div className="w-px h-10 bg-white/10"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] mb-1">AI Uptime</span>
                            <span className="text-sm font-black text-white group-hover:text-orange-500 transition-colors">99.998%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Dev Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <TaskCard 
                    title="Update Vision dbt Model"
                    path="models/marts/vision_core.sql"
                    techs={['snowflake', 'databricks']}
                    colorScheme="orange"
                    steps={[
                        'marts/vision_core.sql to join with META_IMAGE_METADATA',
                        'Add new fields: accuracy_score, inference_time with proper type casting',
                        'Update model materialization to incremental with unique_key=\'frame_id\'',
                        'Finalize and publish the model'
                    ]}
                    isMain
                />
                <TaskCard 
                    title="Add Data Quality Tests"
                    path="models/marts/schema.yml"
                    techs={['snowflake']}
                    colorScheme="blue"
                    steps={[
                        'Create models/marts/schema.yml tests:',
                        'Custom test for confidence_interval >= 0.85',
                        'accepted_values test for model_version: [\'v1\', \'v2\', \'pro\']',
                        'Implement alerting for failed assertions'
                    ]}
                />
                <TaskCard 
                    title="Create Airflow DAG for Vision"
                    path="dag/vision_pipeline.py"
                    techs={['airflow', 'databricks']}
                    colorScheme="purple"
                    steps={[
                        'Verify DAG runs successfully with multi-threading',
                        'Make a PR for updated DAG after successful staging run',
                        'Configure dynamic task mapping for parallel inference',
                        'Set up failure callback to Slack/Teams'
                    ]}
                />
            </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-32 bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
        <div className="container mx-auto px-6">
          <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="text-left">
              <h3 className="text-sm tracking-[0.5em] text-orange-500 font-black uppercase mb-4 animate-pulse">Project Showcase</h3>
              <h4 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Selected <span className="text-cosmic">Works</span></h4>
            </div>
            <div className="hidden md:block text-right">
                <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Authorized Projects / v4.0.2</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {certifiedTechs.map((tech) => (
              <div 
                key={tech.id} 
                onClick={() => setSelectedTech(tech)}
                className={`group relative bg-black/40 border rounded-sm overflow-hidden flex flex-col md:flex-row transition-all duration-700 transform hover:-translate-y-2 cursor-pointer border-white/5 hover:border-orange-500/40 hover:shadow-[0_0_50px_rgba(234,88,12,0.15)]`}
              >
                <div className="w-full md:w-2/5 aspect-square flex-shrink-0 overflow-hidden relative bg-black flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                  <img src={tech.imageUrl} alt={tech.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-1000" />
                  <div className="absolute top-4 left-4 z-20 px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse
                    ${tech.id === 'tech_visionary_fashion' ? 'bg-lime-500 text-black' : 
                      tech.id === 'tech_mtd_platform' ? 'bg-blue-500 text-white' : 
                      tech.id === 'tech_metamusic' ? 'bg-fuchsia-500 text-white' : 'bg-orange-500 text-white'}">
                    {tech.id.split('_')[1].toUpperCase()}
                  </div>
                </div>

                <div className="p-10 md:p-12 md:w-3/5 flex-grow flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/5 select-none">{tech.id}</div>
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h5 className="text-xl md:text-2xl font-black uppercase tracking-tighter transition-all duration-500 text-white group-hover:text-orange-400 truncate">
                                {tech.title}
                            </h5>
                        </div>
                        <p className="text-gray-500 group-hover:text-gray-200 text-sm leading-relaxed mb-8 font-light transition-colors duration-500 line-clamp-4">{tech.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {tech.tags.map((tag, i) => (
                            <span key={i} className="font-mono text-[9px] px-2 py-1 border border-white/5 group-hover:border-white/20 transition-all text-gray-600 group-hover:text-white">#{tag}</span>
                        ))}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Access Section */}
      <section className="py-24 bg-black relative border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h3 className="text-sm tracking-[0.5em] text-orange-500 font-black uppercase mb-4">Platform Ecosystem</h3>
            <h4 className="text-4xl font-black text-white uppercase tracking-tighter">Direct Platform <span className="text-cosmic">Access</span></h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button 
              onClick={() => window.open("https://mtdp-tau.vercel.app/", "_blank", "noopener,noreferrer")}
              className="group relative h-64 rounded-sm overflow-hidden border border-white/5 hover:border-cyan-500/50 transition-all duration-700 hover:shadow-[0_0_50px_rgba(34,211,238,0.2)] text-left outline-none"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-blue-900/20 to-black/80 z-0"></div>
              <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                <div>
                  <h5 className="text-3xl font-black italic tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.6)] transition-all duration-500">MTD PLATFORM</h5>
                  <p className="text-xs text-gray-400 mt-2 font-mono tracking-widest uppercase">Healthcare Data Hub</p>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 group-hover:translate-x-2 transition-transform">
                  <span>Explore Now</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </button>

            <button 
              onClick={() => window.open("https://mata-sonic.vercel.app/", "_blank", "noopener,noreferrer")}
              className="group relative h-64 rounded-sm overflow-hidden border border-white/5 hover:border-fuchsia-500/50 transition-all duration-700 hover:shadow-[0_0_50px_rgba(217,70,239,0.2)] text-left outline-none"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/40 via-rose-900/20 to-black/80 z-0"></div>
              <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                <div>
                  <h5 className="text-3xl font-black italic tracking-tighter bg-gradient-to-r from-fuchsia-500 to-rose-500 bg-clip-text text-transparent group-hover:drop-shadow-[0_0_15px_rgba(217,70,239,0.6)] transition-all duration-500">SONIC IDENTITY</h5>
                  <p className="text-xs text-gray-400 mt-2 font-mono tracking-widest uppercase">AI Music Synth Node</p>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-400 group-hover:translate-x-2 transition-transform">
                  <span>Explore Now</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {selectedTech && <ProjectModal tech={selectedTech} onClose={() => setSelectedTech(null)} />}

      <section className="py-40 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-950/20 z-0"></div>
          <div className="container mx-auto px-6 relative z-10">
              <p className="text-orange-500 text-[10px] font-black tracking-[0.5em] uppercase mb-6 animate-pulse">Join the Innovation</p>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-12">Ready to evolve <br /> your <span className="animate-logo-breath">Business?</span></h2>
              <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-orange-600 hover:text-white transition-all duration-500 transform hover:scale-105 rounded-sm">Start Consultation</button>
          </div>
      </section>
    </div>
  );
};

export default TechnologyPage;
