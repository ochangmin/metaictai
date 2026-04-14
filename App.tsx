
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import TechnologyPage from './pages/TechnologyPage';
import ResourcePage from './pages/ResourcePage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import Chatbot from './components/Chatbot';
import { Page, HistoryItem, ServiceModel, CertifiedTech, HomepageService, MainVisual, GlobalSettings, Employee, LogEntry, VisitorStats, ResourceItem } from './types';

import { 
  initialHistoryData, 
  initialAiModels, 
  initialCertifiedTechs, 
  initialHomepageServices,
  initialEmployees,
  initialResourceData
} from './data/content';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const loadInitialData = <T,>(key: string, defaultValue: T): T => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return defaultValue; }
    }
    return defaultValue;
  };

  const [historyData, setHistoryData] = useState<HistoryItem[]>(() => loadInitialData('ict_history', initialHistoryData));
  const [aiModels, setAiModels] = useState<ServiceModel[]>(() => loadInitialData('ict_models', initialAiModels));
  const [certifiedTechs, setCertifiedTechs] = useState<CertifiedTech[]>(() => loadInitialData('ict_techs', initialCertifiedTechs));
  const [homepageServices, setHomepageServices] = useState<HomepageService[]>(() => loadInitialData('ict_services', initialHomepageServices));
  const [employees, setEmployees] = useState<Employee[]>(() => loadInitialData('ict_employees', initialEmployees));
  const [resources, setResources] = useState<ResourceItem[]>(() => loadInitialData('ict_resources', initialResourceData));
  const [mainVisuals, setMainVisuals] = useState<MainVisual[]>(() => loadInitialData('ict_main_visuals', [
    { id: 'mv_1', title: 'Cosmic AI Innovation', imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80', category: 'Hero' }
  ]));
  
  const [settings, setSettings] = useState<GlobalSettings>(() => loadInitialData('ict_settings', { 
    bgMusicUrl: 'https://cdn.pixabay.com/audio/2022/03/24/audio_3469e35492.mp3', 
    isMusicAutoPlay: true 
  }));

  const [logs, setLogs] = useState<LogEntry[]>(() => loadInitialData('ict_logs', []));
  const [visitorStats, setVisitorStats] = useState<VisitorStats>(() => loadInitialData('ict_stats', {
    totalViews: 0,
    todayViews: 0,
    pageViews: { home: 0, about: 0, services: 0, technology: 0, resource: 0, contact: 0, privacy: 0, terms: 0 },
    lastUpdate: new Date().toISOString()
  }));

  const addLog = (action: LogEntry['action'], target: string, details: string) => {
    const newLog: LogEntry = {
      id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleString(),
      action,
      target,
      details
    };
    setLogs(prev => [newLog, ...prev].slice(0, 100));
  };

  useEffect(() => {
    const playMusic = () => {
      if (settings.isMusicAutoPlay && audioRef.current && isMuted) {
        audioRef.current.play().then(() => {
          setIsMuted(false);
          if (audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current.volume = 0.4;
          }
        }).catch(err => console.debug("Interaction required for audio", err));
      }
    };

    const handleInteraction = () => {
      playMusic();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    if (settings.isMusicAutoPlay) {
      window.addEventListener('click', handleInteraction);
      window.addEventListener('scroll', handleInteraction);
      window.addEventListener('touchstart', handleInteraction);
    }
    
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [settings.bgMusicUrl, settings.isMusicAutoPlay, isMuted]);

  useEffect(() => {
    if (currentPage !== 'admin') {
      setVisitorStats(prev => {
        const isNewDay = new Date().toLocaleDateString() !== new Date(prev.lastUpdate).toLocaleDateString();
        return {
          ...prev,
          totalViews: prev.totalViews + 1,
          todayViews: isNewDay ? 1 : prev.todayViews + 1,
          pageViews: {
            ...prev.pageViews,
            [currentPage]: (prev.pageViews[currentPage] || 0) + 1
          },
          lastUpdate: new Date().toISOString()
        };
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    localStorage.setItem('ict_history', JSON.stringify(historyData));
    localStorage.setItem('ict_models', JSON.stringify(aiModels));
    localStorage.setItem('ict_techs', JSON.stringify(certifiedTechs));
    localStorage.setItem('ict_services', JSON.stringify(homepageServices));
    localStorage.setItem('ict_main_visuals', JSON.stringify(mainVisuals));
    localStorage.setItem('ict_settings', JSON.stringify(settings));
    localStorage.setItem('ict_employees', JSON.stringify(employees));
    localStorage.setItem('ict_resources', JSON.stringify(resources));
    localStorage.setItem('ict_logs', JSON.stringify(logs));
    localStorage.setItem('ict_stats', JSON.stringify(visitorStats));
  }, [historyData, aiModels, certifiedTechs, homepageServices, mainVisuals, settings, employees, resources, logs, currentPage]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(e => console.log("Play failed", e));
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  // Define allData in the component scope so it's accessible to Chatbot
  const allData = useMemo(() => ({ 
    history: historyData, 
    models: aiModels, 
    techs: certifiedTechs, 
    services: homepageServices, 
    employees: employees,
    resources: resources 
  }), [historyData, aiModels, certifiedTechs, homepageServices, employees, resources]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} services={homepageServices} mainVisuals={mainVisuals} isMuted={isMuted} toggleMute={toggleMute} allData={allData} />;
      case 'about': return <AboutPage historyData={historyData} employees={employees} />;
      case 'services': return <ServicesPage aiModels={aiModels} />;
      case 'technology': return <TechnologyPage certifiedTechs={certifiedTechs} />;
      case 'resource': return <ResourcePage resources={resources} />;
      case 'contact': return <ContactPage />;
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      case 'admin':
        return <AdminPage 
          setCurrentPage={setCurrentPage}
          historyData={historyData} setHistoryData={setHistoryData}
          aiModels={aiModels} setAiModels={setAiModels}
          certifiedTechs={certifiedTechs} setCertifiedTechs={setCertifiedTechs}
          homepageServices={homepageServices} setHomepageServices={setHomepageServices}
          mainVisuals={mainVisuals} setMainVisuals={setMainVisuals}
          settings={settings} setSettings={setSettings}
          employees={employees} setEmployees={setEmployees}
          resources={resources} setResources={setResources}
          logs={logs} visitorStats={visitorStats} addLog={addLog}
        />;
      default: return <HomePage setCurrentPage={setCurrentPage} services={homepageServices} mainVisuals={mainVisuals} isMuted={isMuted} toggleMute={toggleMute} allData={allData} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative transition-colors duration-1000">
       {settings.bgMusicUrl && (
         <audio 
           ref={audioRef} 
           src={settings.bgMusicUrl} 
           loop 
           autoPlay={settings.isMusicAutoPlay}
           muted={isMuted}
           playsInline
         />
       )}
       {currentPage !== 'admin' && (
         <Header 
           currentPage={currentPage} 
           setCurrentPage={setCurrentPage} 
           isScrolled={isScrolled} 
           hasMusic={!!settings.bgMusicUrl} 
           isMuted={isMuted} 
           toggleMute={toggleMute} 
         />
       )}
      <main className="flex-grow">{renderPage()}</main>
      {/* Use allData from the component scope here */}
      {currentPage !== 'admin' && <Chatbot knowledgeBase={allData} />}
      {currentPage !== 'admin' && <Footer setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default App;
