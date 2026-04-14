
import type React from 'react';

export type Page = 'home' | 'about' | 'services' | 'technology' | 'resource' | 'contact' | 'admin' | 'privacy' | 'terms';

export interface HomepageService {
    icon: string;
    title: string;
    description: string;
}

export interface HistoryItem {
    id: string;
    year: string;
    title: string;
    details: string[];
}

export interface Employee {
    id: string;
    name: string;
    role: string;
    idLabel: string;
    imageUrl: string | null;
    description: string;
}

export interface ServiceModel {
    id: string;
    icon: string;
    title: string;
    description: string;
    path: string;
}

export interface CertifiedTech {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    features?: string[];
}

export interface ResourceItem {
    id: string;
    title: string;
    description: string;
    category: 'Whitepaper' | 'Manual' | 'Technical' | 'Legal';
    date: string;
    fileUrl: string;
    thumbnailUrl: string | null;
}

export interface MainVisual {
    id: string;
    title: string;
    imageUrl: string;
    category: string;
}

export interface GlobalSettings {
    bgMusicUrl: string | null;
    isMusicAutoPlay: boolean;
}

export interface LogEntry {
    id: string;
    timestamp: string;
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'DEPLOY';
    target: string;
    details: string;
}

export interface VisitorStats {
    totalViews: number;
    todayViews: number;
    pageViews: Record<string, number>;
    lastUpdate: string;
}
