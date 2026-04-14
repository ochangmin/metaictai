'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';
import SunCalc from 'suncalc';

// 3D Tree Model (Abstract representation)
const OrchardTree = ({ position, scale = 1, color = '#2e7d32' }: { position: [number, number, number], scale?: number, color?: string }) => {
    return (
        <group position={position} scale={scale}>
            {/* Trunk */}
            <mesh position={[0, 0.5, 0]} castShadow>
                <cylinderGeometry args={[0.1, 0.15, 1, 8]} />
                <meshStandardMaterial color="#5d4037" />
            </mesh>
            {/* Leaves */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.8, 16, 16]} />
                <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
        </group>
    );
};

export default function OrchardSunlightAI() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState('12:00');
    const [latitude, setLatitude] = useState(37.8813); // 강원도 춘천시 대략적 위도
    const [longitude, setLongitude] = useState(127.7298);

    const [simulationResult, setSimulationResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // Parse current datetime
    const currentDateTime = useMemo(() => {
        return new Date(`${date}T${time}:00`);
    }, [date, time]);

    // Calculate sun position
    const sunPos = useMemo(() => {
        const pos = SunCalc.getPosition(currentDateTime, latitude, longitude);
        // spherical coordinates to cartesian for directional light
        const distance = 50;
        const phi = pos.altitude;
        const theta = pos.azimuth;

        const x = distance * Math.cos(phi) * Math.sin(theta);
        const y = distance * Math.sin(phi);
        const z = distance * Math.cos(phi) * Math.cos(theta);

        return new THREE.Vector3(-x, Math.max(y, -5), -z); // Prevent going too far below to look somewhat okay
    }, [currentDateTime, latitude, longitude]);

    // Generate orchard layout (Grid)
    const trees = useMemo(() => {
        const list = [];
        for (let x = -3; x <= 3; x += 1.5) {
            for (let z = -3; z <= 3; z += 1.5) {
                list.push({ id: `${x}-${z}`, position: [x * 2, 0, z * 2] as [number, number, number] });
            }
        }
        return list;
    }, []);

    const runSimulation = () => {
        setLoading(true);
        setTimeout(() => {
            // Dummy calculation based on altitude
            const alt = SunCalc.getPosition(currentDateTime, latitude, longitude).altitude;
            const lightIntensity = Math.max(0, Math.sin(alt)) * 1000; // Fake W/m2

            let analysis = "적정 수준";
            if (lightIntensity > 800) analysis = "강한 일사량 (일소피해 주의)";
            else if (lightIntensity < 200 && alt > 0) analysis = "보광 필요 (성장 지연 우려)";
            else if (alt <= 0) analysis = "일조 없음 (야간)";

            setSimulationResult({
                altitude: (alt * 180 / Math.PI).toFixed(2),
                azimuth: (SunCalc.getPosition(currentDateTime, latitude, longitude).azimuth * 180 / Math.PI).toFixed(2),
                estimatedLight: lightIntensity.toFixed(1),
                recommendation: analysis,
                dailyTotal: (Math.random() * 5 + 15).toFixed(1) // Fake MJ/m2
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="sim-ui">
            <h3 className="panel-title">☀️ 과수원 3D 일조량 추론</h3>

            <div className="layout-grid">
                <div className="controls-panel">
                    <div className="form-section">
                        <span className="fl">위치 (위도/경도)</span>
                        <div className="flex-row">
                            <input type="number" className="item-input" value={latitude} onChange={(e) => setLatitude(Number(e.target.value))} step={0.01} />
                            <input type="number" className="item-input" value={longitude} onChange={(e) => setLongitude(Number(e.target.value))} step={0.01} />
                        </div>
                    </div>

                    <div className="form-section">
                        <span className="fl">날짜 및 시간</span>
                        <input type="date" className="item-input" value={date} onChange={e => setDate(e.target.value)} />
                        <input type="time" className="item-input mt-sm" value={time} onChange={e => setTime(e.target.value)} />
                    </div>

                    <button className="btn btn-primary run-btn mt-md" onClick={runSimulation} disabled={loading}>
                        {loading ? '추론 중...' : '📊 3D 환경 일조량 분석'}
                    </button>

                    {simulationResult && (
                        <div className="results mt-md">
                            <h4 className="fl">분석 결과</h4>
                            <div className="stat-grid">
                                <div className="stat-box">
                                    <span className="sb-label">고도 / 방위각</span>
                                    <span className="sb-val">{simulationResult.altitude}° / {simulationResult.azimuth}°</span>
                                </div>
                                <div className="stat-box">
                                    <span className="sb-label">현재 추정 일사량</span>
                                    <span className="sb-val text-amber">{simulationResult.estimatedLight} W/m²</span>
                                </div>
                                <div className="stat-box">
                                    <span className="sb-label">일 누적 광량 예상</span>
                                    <span className="sb-val text-emerald">{simulationResult.dailyTotal} MJ/m²</span>
                                </div>
                            </div>
                            <div className="analysis-box mt-sm">
                                <strong>AI 진단: </strong> {simulationResult.recommendation}
                            </div>
                        </div>
                    )}
                </div>

                <div className="canvas-wrapper">
                    <Canvas shadows camera={{ position: [10, 8, 10], fov: 45 }}>
                        <color attach="background" args={['#87CEEB']} />

                        {/* Environment lighting */}
                        <ambientLight intensity={0.3} />
                        <directionalLight
                            castShadow
                            position={sunPos}
                            intensity={sunPos.y > 0 ? 1.5 : 0}
                            shadow-mapSize={[2048, 2048]}
                            shadow-camera-left={-20}
                            shadow-camera-right={20}
                            shadow-camera-top={20}
                            shadow-camera-bottom={-20}
                        />

                        {/* Sky simulation */}
                        {sunPos.y > -5 && (
                            <Sky distance={450000} sunPosition={sunPos} inclination={0} azimuth={0.25} />
                        )}

                        {/* Ground */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                            <planeGeometry args={[50, 50]} />
                            <meshStandardMaterial color="#81c784" roughness={1} metalness={0} />
                        </mesh>

                        {/* Trees */}
                        {trees.map((tree) => (
                            <OrchardTree key={tree.id} position={tree.position} />
                        ))}

                        <OrbitControls target={[0, 0, 0]} maxPolarAngle={Math.PI / 2 - 0.05} />
                    </Canvas>
                    <div className="canvas-overlay">과수원 3D 프리뷰 (마우스로 시점 조작)</div>
                </div>
            </div>

            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:18px;font-weight:800}
        .layout-grid { display: grid; grid-template-columns: 300px 1fr; gap: var(--space-lg); }
        .form-section{margin-bottom:var(--space-md)}.fl{font-size:13px;font-weight:600;display:block;margin-bottom:8px;color:var(--text-secondary)}
        .flex-row { display: flex; gap: var(--space-sm); }
        .mt-sm { margin-top: var(--space-sm); }
        .mt-md { margin-top: var(--space-md); }
        .item-input{width:100%;padding:10px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);font-family:inherit;font-size:13px;color:var(--text-primary);transition:all .2s ease;}
        .item-input:focus{border-color:var(--accent-cyan);outline:none;background:rgba(255,255,255,0.05);}
        .run-btn{width:100%;padding:14px;font-weight:700;}
        
        .canvas-wrapper { position: relative; border-radius: var(--radius-lg); overflow: hidden; height: 500px; border: 1px solid var(--border-subtle); background: #000; }
        .canvas-overlay { position: absolute; bottom: 16px; left: 16px; font-size: 11px; background: rgba(0,0,0,0.6); color: white; padding: 6px 12px; border-radius: var(--radius-full); pointer-events: none;}
        
        .results{animation:fadeInUp .4s ease-out; background: var(--bg-card); padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);}
        .stat-grid { display: grid; gap: var(--space-sm); margin-bottom: var(--space-md); }
        .stat-box { background: var(--bg-glass); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); }
        .sb-label { display: block; font-size: 11px; color: var(--text-tertiary); margin-bottom: 2px; }
        .sb-val { font-size: 15px; font-weight: 700; font-family: var(--font-mono); }
        .text-amber { color: var(--accent-amber); }
        .text-emerald { color: var(--accent-emerald); }
        .analysis-box { padding: 12px; background: var(--accent-amber-dim); color: var(--accent-amber); border-radius: var(--radius-sm); font-size: 13px; }

        @media(max-width: 900px){ .layout-grid { grid-template-columns: 1fr; } .canvas-wrapper { height: 400px; } }
      `}</style>
        </div>
    );
}
