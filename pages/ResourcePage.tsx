
import React, { useState } from 'react';
import { ResourceItem } from '../types';
import XIcon from '../components/icons/XIcon';

const PageBanner: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="relative pt-60 pb-32 text-center text-white overflow-hidden bg-[#050505]">
    <div className="absolute inset-0 -z-10">
       <div className="absolute inset-0 bg-black/80 z-10"></div>
       <img 
         src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80" 
         className="w-full h-full object-cover opacity-20 scale-110 blur-sm" 
         alt="Archive Background"
       />
    </div>
    <div className="container mx-auto px-6 relative z-20">
      <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 uppercase text-cosmic">
        {title}
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto uppercase tracking-[0.4em]">
        {subtitle}
      </p>
    </div>
  </div>
);

interface ResourceModalProps {
    resource: ResourceItem;
    onClose: () => void;
}

const ResourceModal: React.FC<ResourceModalProps> = ({ resource, onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
            <div className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 text-gray-500 hover:text-white transition-colors bg-black/50 rounded-full">
                    <XIcon />
                </button>

                <div className="w-full md:w-1/2 h-[300px] md:h-auto overflow-hidden relative bg-black flex items-center justify-center border-r border-white/5">
                    <img 
                        src={resource.thumbnailUrl || 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=800&q=80'} 
                        alt={resource.title} 
                        className="w-full h-full object-cover grayscale-[0.2]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                </div>

                <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                    <div className="mb-6">
                        <span className="bg-orange-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-sm shadow-lg mb-4 inline-block">
                            {resource.category}
                        </span>
                        <p className="text-gray-500 text-[10px] font-mono tracking-[0.4em] uppercase mb-2">Released on {resource.date}</p>
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
                            {resource.title}
                        </h2>
                    </div>
                    
                    <div className="space-y-8 mb-10">
                        <div>
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 border-l-2 border-orange-500 pl-4">Resource Summary</h3>
                            <p className="text-gray-300 text-base leading-relaxed font-light">{resource.description}</p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <a 
                            href={resource.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 bg-orange-600 text-white text-center font-black text-xs uppercase tracking-[0.3em] hover:bg-orange-500 transition-all duration-300 rounded-sm shadow-[0_0_30px_rgba(234,88,12,0.3)]"
                        >
                            Download Full Document
                        </a>
                        <p className="text-[9px] text-gray-600 font-mono text-center uppercase tracking-widest italic">
                            Authorized Access Only / Meta ICT Co., Ltd.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ResourcePageProps {
  resources: ResourceItem[];
}

const ResourcePage: React.FC<ResourcePageProps> = ({ resources }) => {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  const categories = ['All', 'Whitepaper', 'Manual', 'Technical', 'Legal'];

  const filteredResources = resources.filter(res => {
    const matchFilter = filter === 'All' || res.category === filter;
    const matchSearch = res.title.toLowerCase().includes(search.toLowerCase()) || 
                        res.description.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="animate-fade-in pb-40 bg-[#050505] min-h-screen font-sans">
      <PageBanner title="Archive" subtitle="Knowledge Vault & Intelligence" />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
             <div className="flex flex-wrap justify-center gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                      filter === cat ? 'bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.3)]' : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
             <div className="relative w-full md:w-96">
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search materials..."
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-sm text-sm font-light text-white outline-none focus:border-orange-500/50 transition-colors"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
          </div>

          <div className="overflow-x-auto bg-white/[0.02] border border-white/5 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <th className="p-6 border-b border-white/5 w-20">No.</th>
                  <th className="p-6 border-b border-white/5 w-32">Category</th>
                  <th className="p-6 border-b border-white/5">Title</th>
                  <th className="p-6 border-b border-white/5 w-32">Release Date</th>
                  <th className="p-6 border-b border-white/5 w-40 text-center">Access</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.length > 0 ? filteredResources.map((res, index) => (
                  <tr 
                    key={res.id} 
                    onClick={() => setSelectedResource(res)}
                    className="group border-b border-white/5 hover:bg-white/[0.03] transition-all cursor-pointer"
                  >
                    <td className="p-6 text-xs font-mono text-gray-600 group-hover:text-white transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="p-6">
                      <span className="text-[9px] font-black uppercase tracking-widest text-orange-500 border border-orange-500/30 px-2 py-0.5 rounded-sm">
                        {res.category}
                      </span>
                    </td>
                    <td className="p-6">
                      <h3 className="text-base font-bold text-white group-hover:text-orange-500 transition-colors uppercase tracking-tight">
                        {res.title}
                      </h3>
                      <p className="text-[10px] text-gray-500 truncate max-w-md group-hover:text-gray-400">
                        {res.description}
                      </p>
                    </td>
                    <td className="p-6 text-xs font-mono text-gray-500 group-hover:text-gray-300">
                      {res.date}
                    </td>
                    <td className="p-6 text-center">
                       <button className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-orange-500 border border-white/10 group-hover:border-orange-500/50 px-4 py-2 transition-all">
                          Open File
                       </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="py-40 text-center">
                       <p className="text-gray-600 font-mono text-xs uppercase tracking-widest animate-pulse">No materials found in this matrix.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {selectedResource && (
          <ResourceModal 
            resource={selectedResource} 
            onClose={() => setSelectedResource(null)} 
          />
      )}

      <section className="py-24 border-t border-white/5 text-center">
         <div className="container mx-auto px-6">
            <h4 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] mb-6">Need Specific Documentation?</h4>
            <p className="text-2xl text-white font-light mb-12">원하시는 자료를 찾을 수 없나요? <br className="md:hidden" /> 고객센터로 직접 요청하십시오.</p>
            <button 
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="px-10 py-4 bg-white/5 border border-white/10 hover:border-orange-500 text-white text-[10px] font-black uppercase tracking-widest transition-all"
            >
               Request Custom Data
            </button>
         </div>
      </section>
    </div>
  );
};

export default ResourcePage;
