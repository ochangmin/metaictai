
import React from 'react';
import { ServiceModel } from '../types';
import IconRenderer from '../components/IconRenderer';

const PageBanner: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="relative pt-60 pb-32 text-center text-white overflow-hidden">
    <div className="absolute inset-0 -z-10">
       <div className="absolute inset-0 bg-black/70"></div>
       <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover opacity-20" alt="AI circuit board"/>
    </div>
    <div className="container mx-auto px-6">
      <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 uppercase text-cosmic">
        {title}
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto uppercase tracking-widest">
        {subtitle}
      </p>
    </div>
  </div>
);

interface ServicesPageProps {
    aiModels: ServiceModel[];
}

const ServicesPage: React.FC<ServicesPageProps> = ({ aiModels }) => {
  return (
    <div className="animate-fade-in pb-40">
      <PageBanner title="Services" subtitle="Our Core AI Model Architecture" />

      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiModels.map((model, index) => (
                <div key={model.id} 
                     className="bg-gray-900/30 border border-gray-500/30 rounded-lg overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-orange-500/70 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 group">
                    <div className="p-3 border-b border-gray-500/30 flex items-center justify-between bg-black/30">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 group-hover:bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 group-hover:bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500 group-hover:bg-green-400"></div>
                        </div>
                        <p className="text-xs text-gray-400 font-mono">{model.path}</p>
                    </div>
                    <div className="p-8 text-center flex flex-col items-center h-full">
                        <div className="mb-6 text-gray-400 group-hover:text-orange-400 transition-colors duration-300 w-16 h-16">
                            <IconRenderer iconName={model.icon} className="w-full h-full" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{model.title}</h3>
                        <p className="text-gray-400 text-sm flex-grow">{model.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
