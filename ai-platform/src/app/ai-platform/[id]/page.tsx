'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { platforms } from '@/data/platforms';
import dynamic from 'next/dynamic';
import DataPanel from '@/components/DataPanel';

// API-type platforms
const WeatherCropAPI = dynamic(() => import('@/components/platforms/WeatherCropAPI'));
const AirQualityAPI = dynamic(() => import('@/components/platforms/AirQualityAPI'));
const SmartFarmAPI = dynamic(() => import('@/components/platforms/SmartFarmAPI'));

// Input-type platforms
const SoilNutrientInput = dynamic(() => import('@/components/platforms/SoilNutrientInput'));
const WaterQualityInput = dynamic(() => import('@/components/platforms/WaterQualityInput'));
const PestReportInput = dynamic(() => import('@/components/platforms/PestReportInput'));
const FarmAccountingInput = dynamic(() => import('@/components/platforms/FarmAccountingInput'));

// Analysis-type platforms
const GrowthAnalysis = dynamic(() => import('@/components/platforms/GrowthAnalysis'));
const CarbonFootprintAnalysis = dynamic(() => import('@/components/platforms/CarbonFootprintAnalysis'));
const BiodiversityAnalysis = dynamic(() => import('@/components/platforms/BiodiversityAnalysis'));

// 3D Inference platforms
const OrchardSunlightAI = dynamic(() => import('@/components/platforms/OrchardSunlightAI'), { ssr: false });
const DronePestScanAI = dynamic(() => import('@/components/platforms/DronePestScanAI'), { ssr: false });
const GreenhouseThermalAI = dynamic(() => import('@/components/platforms/GreenhouseThermalAI'), { ssr: false });

const platformComponents: Record<string, React.ComponentType> = {
    'weather-crop-api': WeatherCropAPI,
    'air-quality-api': AirQualityAPI,
    'smart-farm-api': SmartFarmAPI,
    'soil-nutrient-input': SoilNutrientInput,
    'water-quality-input': WaterQualityInput,
    'pest-report-input': PestReportInput,
    'farm-accounting-input': FarmAccountingInput,
    'growth-analysis': GrowthAnalysis,
    'carbon-footprint-analysis': CarbonFootprintAnalysis,
    'biodiversity-analysis': BiodiversityAnalysis,
    'orchard-sunlight-ai': OrchardSunlightAI,
    'drone-pest-scan-ai': DronePestScanAI,
    'greenhouse-thermal-ai': GreenhouseThermalAI,
};

export default function PlatformDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const platform = platforms.find(p => p.id === id);
    const PlatformComponent = platformComponents[id] as any;

    const [currentInput, setCurrentInput] = useState<any>(null);
    const [currentOutput, setCurrentOutput] = useState<any>(null);

    const handleResult = (input: any, output: any) => {
        setCurrentInput(input);
        setCurrentOutput(output);
    };

    if (!platform || !PlatformComponent) {
        return (
            <div className="page-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
                <h2>AI 플랫폼을 찾을 수 없습니다</h2>
                <Link href="/ai-platform" className="btn btn-secondary" style={{ marginTop: '20px', display: 'inline-flex' }}>
                    ← AI 플랫폼으로 돌아가기
                </Link>
            </div>
        );
    }

    return (
        <div className="platform-detail">
            <div className="pd-header">
                <div className="page-container">
                    <Link href="/ai-platform" className="back-link">← AI 플랫폼</Link>
                    <div className="pd-title-row">
                        <div className="pd-icon" style={{ background: platform.gradient }}>
                            <span>{platform.icon}</span>
                        </div>
                        <div>
                            <h1>{platform.nameKo}</h1>
                            <p className="pd-name">{platform.name}</p>
                        </div>
                        <div className="pd-badges">
                            <span className={`badge badge-${platform.dataType}`}>{platform.dataTypeIcon} {platform.dataTypeKo}</span>
                            <span className="badge badge-emerald">{platform.domain}</span>
                            {platform.tags.map(tag => (
                                <span key={tag} className="pd-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <p className="pd-desc">{platform.description}</p>

                    {/* Data Pipeline Indicator */}
                    <div className="data-pipeline" style={{ marginTop: 'var(--space-lg)' }}>
                        <div className="pipeline-step" style={platform.dataType === 'api' ? { borderColor: 'var(--accent-cyan)', background: 'var(--accent-cyan-dim)' } : {}}>🔗 수집</div>
                        <span className="pipeline-arrow">→</span>
                        <div className="pipeline-step" style={platform.dataType === 'input' ? { borderColor: 'var(--accent-amber)', background: 'var(--accent-amber-dim)' } : {}}>📝 입력</div>
                        <span className="pipeline-arrow">→</span>
                        <div className="pipeline-step" style={platform.dataType === 'analysis' ? { borderColor: 'var(--accent-purple)', background: 'var(--accent-purple-dim)' } : {}}>📊 분석</div>
                        <span className="pipeline-arrow">→</span>
                        <div className="pipeline-step">💡 인사이트</div>
                    </div>
                </div>
            </div>
            <div className="page-container">
                <div className="pd-workspace glass-card">
                    <PlatformComponent onResult={handleResult} />
                    <DataPanel moduleId={id} moduleType="platform" currentInput={currentInput} currentOutput={currentOutput} />
                </div>
            </div>

            <style jsx>{`
        .platform-detail{padding-bottom:var(--space-4xl)}
        .pd-header{background:var(--bg-secondary);border-bottom:1px solid var(--border-subtle);padding:var(--space-xl) 0 var(--space-2xl)}
        .back-link{display:inline-flex;align-items:center;font-size:13px;color:var(--text-tertiary);margin-bottom:var(--space-lg);transition:color var(--transition-fast)}
        .back-link:hover{color:var(--accent-cyan)}
        .pd-title-row{display:flex;align-items:center;gap:var(--space-md);flex-wrap:wrap;margin-bottom:var(--space-sm)}
        .pd-icon{width:56px;height:56px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0}
        .pd-title-row h1{font-size:28px;font-weight:800;letter-spacing:-.5px}
        .pd-name{font-size:13px;font-family:var(--font-mono);color:var(--text-tertiary)}
        .pd-badges{display:flex;flex-wrap:wrap;gap:6px;margin-left:auto}
        .pd-tag{font-size:11px;padding:3px 8px;border-radius:var(--radius-full);background:rgba(255,255,255,.05);color:var(--text-tertiary)}
        .pd-desc{font-size:15px;color:var(--text-secondary);line-height:1.6;max-width:700px}
        .pd-workspace{margin-top:var(--space-xl);padding:var(--space-xl);min-height:500px}
        @media(max-width:768px){.pd-badges{margin-left:0}}
      `}</style>
        </div>
    );
}
