
import React, { useState, useRef, useMemo } from 'react';
import { HistoryItem, ServiceModel, CertifiedTech, HomepageService, MainVisual, GlobalSettings, Employee, Page, LogEntry, VisitorStats, ResourceItem } from '../types';
import Logo from '../components/Logo';

const resizeImage = (base64Str: string, maxWidth: number = 800): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
      }
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
  });
};

interface AdminPageProps {
  setCurrentPage: (page: Page) => void;
  historyData: HistoryItem[]; setHistoryData: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
  aiModels: ServiceModel[]; setAiModels: React.Dispatch<React.SetStateAction<ServiceModel[]>>;
  certifiedTechs: CertifiedTech[]; setCertifiedTechs: React.Dispatch<React.SetStateAction<CertifiedTech[]>>;
  homepageServices: HomepageService[]; setHomepageServices: React.Dispatch<React.SetStateAction<HomepageService[]>>;
  mainVisuals: MainVisual[]; setMainVisuals: React.Dispatch<React.SetStateAction<MainVisual[]>>;
  settings: GlobalSettings; setSettings: React.Dispatch<React.SetStateAction<GlobalSettings>>;
  employees: Employee[]; setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  resources: ResourceItem[]; setResources: React.Dispatch<React.SetStateAction<ResourceItem[]>>;
  logs: LogEntry[];
  visitorStats: VisitorStats;
  addLog: (action: LogEntry['action'], target: string, details: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({
  setCurrentPage,
  historyData, setHistoryData,
  aiModels, setAiModels,
  certifiedTechs, setCertifiedTechs,
  homepageServices, setHomepageServices,
  mainVisuals, setMainVisuals,
  settings, setSettings,
  employees, setEmployees,
  resources, setResources,
  logs, visitorStats, addLog
}) => {
  