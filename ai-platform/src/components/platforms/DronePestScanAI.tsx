'use client';
import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';

const Drone = ({ position }: { position: [number, number, number] }) => {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 5) * 0.2;
        }
    });

    return (
        <group position={position} ref={meshRef}>
            <mesh castShadow>
                <boxGeometry args={[1, 0.2, 1]} />
                <meshStandardMaterial color="#424242" />
            </mesh>
            {/* Rotors */}
            <mesh position={[0.5, 0.2, 0.5]}>
                <cylinderGeometry args={[0.3, 0.3, 0.05, 8]} />
                <meshStandardMaterial color="#757575" />
            </mesh>
            <mesh position={[-0.5, 0.2, -0.5]}>
                <cylinderGeometry args={[0.3, 0.3, 0.05, 8]} />
                <meshStandardMaterial color="#757575" />
            </mesh>
            <mesh position={[0.5, 0.2, -0.5]}>
                <cylinderGeometry args={[0.3, 0.3, 0.05, 8]} />
                <meshStandardMaterial color="#757575" />
            </mesh>
            <mesh position={[-0.5, 0.2, 0.5]}>
                <cylinderGeometry args={[0.3, 0.3, 0.05, 8]} />
                <meshStandardMaterial color="#757575" />
            </mesh>
        </group>
    );
};

export default function DronePestScanAI() {
    const [density, setDensity] = useState(50);
    const [dronePathPattern, setDronePathPattern] = useState<'grid' | 'spiral'>('grid');

    const [simulationResult, setSimulationResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // Generate mock heatmap zones
    const heatmapZones = useMemo(() => {
        const zones = [];
        const colorStops = ['#4caf50', '#ffeb3b', '#ff9800', '#f44336']; // Green -> Yellow -> Orange -> Red

        // Create random zones depending on density
        const numZones = Math.floor(density / 2);
        for (let i = 0; i < numZones; i++) {
            // Higher density increases chance of severe pests
            const severityRaw = Math.random() + (density / 100);
            const severityIdx = Math.min(3, Math.floor(severityRaw * 2));

            zones.push({
                id: i,
                position: [(Math.random() - 0.5) * 40, 0.1, (Math.random() - 0.5) * 40] as [number, number, number],
                scale: 2 + Math.random() * 4,
                severity: severityIdx,
                color: colorStops[severityIdx]
            });
        }
        return zones;
    }, [density]);

    // Generate flight path lines
    const flightPathPoints = useMemo(() => {
        const points: [number, number, number][] = [];
        if (dronePathPattern === 'grid') {
            for (let z = -20; z <= 20; z += 5) {
                if (z % 10 === 0) {
                    points.push([-20, 5, z], [20, 5, z]);
                } else {
                    points.push([20, 5, z], [-20, 5, z]);
                }
            }
        } else {
            // Spiral
            for (let angle = 0; angle < Math.PI * 10; angle += 0.5) {
                const radius = (angle / (Math.PI * 10)) * 20;
                points.push([Math.cos(angle) * radius, 5, Math.sin(angle) * radius]);
            }
        }
        return points;
    }, [dronePathPattern]);


    const runSimulation = () => {
        setLoading(true);
        setTimeout(() => {
            const redZones = heatmapZones.filter(z => z.severity === 3).length;
            const orangeZones = heatmapZones.filter(z => z.severity === 2).length;
            const totalAreaRisk = ((redZones * 3 + orangeZones * 1.5) / heatmapZones.length) * 100;

            let analysis = "안전";
            if (totalAreaRisk > 60) analysis = "심각: 전면 긴급 방제 필요!";
            else if (totalAreaRisk > 30) analysis = "주의: 부분적 방제 권장 (히트맵 적색/오렌지색 지역)";
            else analysis = "양호: 예방적 예찰 지속";

            setSimulationResult({
                redZones,
                orangeZones,
                riskScore: Math.min(100, totalAreaRisk).toFixed(0),
                recommendation: analysis,
                totalScanned: heatmapZones.length
            });
            setLoading(false);
        }, 1800);
    };

    return (
        <div className="sim-ui">
            <h3 className="panel-title">🚁 드론 예찰 기반 병해충 히트맵</h3>

            <div className="layout-grid">
                <div className="controls-panel">
                    <div className="form-section">
                        <span className="fl">작물 식재 밀도 (시뮬레이션 해상도)</span>
                        <div className="ig">
                            <input type="range" className="slider" min={10} max={100} value={density} onChange={e => setDensity(Number(e.target.value))} />
                            <div className="slider-labels"><span>저밀도</span><span>고밀도</span></div>
                        </div>
                    </div>

                    <div className="form-section">
                        <span className="fl">드론 예찰 경로 패턴</span>
                        <div className="pill-row">
                            {['grid', 'spiral'].map(c => (
                                <button key={c} className={`pill ${dronePathPattern === c ? 'active' : ''}`} onClick={() => setDronePathPattern(c as any)}>
                                    {c === 'grid' ? '그리드 (격자)' : '스파이럴 (나선형)'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="btn btn-primary run-btn mt-md" onClick={runSimulation} disabled={loading}>
                        {loading ? '드론 데이터 스캔 중...' : '🚁 병해충 발생 추론 실행'}
                    </button>

                    {simulationResult && (
                        <div className="results mt-md">
                            <h4 className="fl">분석 결과</h4>
                            <div className="stat-grid">
                                <div className="stat-box">
                                    <span className="sb-label">발견된 위험 구역 (적/황)</span>
                                    <span className="sb-val">{simulationResult.redZones + simulationResult.orangeZones} 곳</span>
                                </div>
                                <div className="stat-box">
                                    <span className="sb-label">전체 위험 점수</span>
                                    <span className="sb-val text-rose">{simulationResult.riskScore} / 100</span>
                                </div>
                            </div>
                            <div className="analysis-box mt-sm" style={{ background: simulationResult.riskScore > 60 ? 'var(--accent-rose-dim)' : 'var(--accent-emerald-dim)', color: simulationResult.riskScore > 60 ? 'var(--accent-rose)' : 'var(--accent-emerald)' }}>
                                <strong>AI 처방: </strong> {simulationResult.recommendation}
                            </div>
                        </div>
                    )}
                </div>

                <div className="canvas-wrapper">
                    <Canvas shadows camera={{ position: [0, 20, 30], fov: 45 }}>
                        <color attach="background" args={['#eceff1']} />

                        <ambientLight intensity={0.5} />
                        <directionalLight castShadow position={[10, 30, 10]} intensity={1.2} shadow-mapSize={[2048, 2048]} />

                        {/* Farm Ground */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                            <planeGeometry args={[60, 60]} />
                            <meshStandardMaterial color="#c5e1a5" roughness={0.9} />
                        </mesh>

                        {/* Grid Pattern on ground */}
                        <gridHelper args={[60, 30, '#81c784', '#aed581']} position={[0, 0.01, 0]} />

                        {/* Heatmap Zones */}
                        {heatmapZones.map(zone => (
                            <mesh key={zone.id} position={zone.position} rotation={[-Math.PI / 2, 0, 0]}>
                                <circleGeometry args={[zone.scale, 32]} />
                                <meshBasicMaterial color={zone.color} transparent opacity={0.6} depthWrite={false} />
                            </mesh>
                        ))}

                        {/* Flight Path */}
                        <Line points={flightPathPoints} color="#2196f3" lineWidth={2} dashed dashSize={0.5} gapSize={0.2} opacity={0.4} transparent />

                        {/* Drone */}
                        <Drone position={flightPathPoints[flightPathPoints.length - 1] || [0, 5, 0]} />

                        <OrbitControls target={[0, 0, 0]} />
                    </Canvas>
                    <div className="canvas-overlay">스마트팜 항공 3D 스캔 뷰 (해상도 및 경로 동적 반영)</div>
                </div>
            </div>

            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:18px;font-weight:800}
        .layout-grid { display: grid; grid-template-columns: 320px 1fr; gap: var(--space-lg); }
        .form-section{margin-bottom:var(--space-md)}.fl{font-size:13px;font-weight:600;display:block;margin-bottom:8px;color:var(--text-secondary)}
        .mt-sm { margin-top: var(--space-sm); }
        .mt-md { margin-top: var(--space-md); }
        
        .ig { margin-top: 8px; }
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}
        .slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent-emerald);cursor:pointer}
        .slider-labels { display: flex; justify-content: space-between; font-size: 11px; color: var(--text-tertiary); margin-top: 4px; }
        
        .pill-row{display:flex;flex-wrap:wrap;gap:6px}.pill{padding:8px 14px;font-size:12px;border-radius:var(--radius-full);background:var(--bg-glass);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;font-family:inherit;transition:all var(--transition-fast)}.pill.active{background:var(--accent-emerald-dim);border-color:var(--accent-emerald);color:var(--accent-emerald)}
        
        .run-btn{width:100%;padding:14px;font-weight:700;}
        
        .canvas-wrapper { position: relative; border-radius: var(--radius-lg); overflow: hidden; height: 500px; border: 1px solid var(--border-subtle); background: #000; }
        .canvas-overlay { position: absolute; bottom: 16px; left: 16px; font-size: 11px; background: rgba(0,0,0,0.5); color: white; padding: 6px 12px; border-radius: var(--radius-full); pointer-events: none;}
        
        .results{animation:fadeInUp .4s ease-out; background: var(--bg-card); padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);}
        .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm); margin-bottom: var(--space-md); }
        .stat-box { background: var(--bg-glass); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); }
        .sb-label { display: block; font-size: 11px; color: var(--text-tertiary); margin-bottom: 2px; }
        .sb-val { font-size: 16px; font-weight: 700; font-family: var(--font-mono); }
        .text-rose { color: var(--accent-rose); }
        .analysis-box { padding: 12px; border-radius: var(--radius-sm); font-size: 13px; }

        @media(max-width: 900px){ .layout-grid { grid-template-columns: 1fr; } .canvas-wrapper { height: 400px; } }
      `}</style>
        </div>
    );
}
