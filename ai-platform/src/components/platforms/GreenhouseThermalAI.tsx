'use client';
import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Edges } from '@react-three/drei';
import * as THREE from 'three';

// Data grid for temperature visualization inside the greenhouse
const ThermalGrid = ({ heater, fan, extTemp }: { heater: number, fan: number, extTemp: number }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    // 10x5x10 grid = 500 points
    const gridSize = [10, 5, 10];
    const count = gridSize[0] * gridSize[1] * gridSize[2];

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const colors = useMemo(() => new Float32Array(count * 3), [count]);
    const colorObj = useMemo(() => new THREE.Color(), []);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Simulate thermal layers:
        // Heat rises. Fan mixes. Ext temp cools edges.
        let i = 0;
        const time = state.clock.elapsedTime;

        for (let x = 0; x < gridSize[0]; x++) {
            for (let y = 0; y < gridSize[1]; y++) {
                for (let z = 0; z < gridSize[2]; z++) {

                    // Base temperature calculation
                    let temp = extTemp;

                    // Heater adds heat from bottom (y=0) spreading upwards
                    const heatInfluence = (heater / 100) * 30; // Max +30c from heater
                    const heightFactor = 1 - (y / gridSize[1]); // More heat at bottom where heaters usually are, rising up

                    // Fan mixes heat (reduces stratification but cools overall if extTemp is low)
                    const fanMixing = (fan / 100);

                    // Abstract dynamic temp
                    const dynamicFlow = Math.sin(x * 0.5 + time + y) * Math.cos(z * 0.5 - time) * 2 * fanMixing;

                    temp += (heatInfluence * heightFactor) * (1 - fanMixing * 0.3) + dynamicFlow;

                    // Edges are closer to extTemp
                    if (x === 0 || x === gridSize[0] - 1 || z === 0 || z === gridSize[2] - 1 || y === gridSize[1] - 1) {
                        temp -= (temp - extTemp) * 0.2; // 20% closer to ext temp
                    }

                    // Map temp to color (0c = Blue, 15c = Green, 30c = Yellow, 45c = Red)
                    let t = temp / 45; // Normalize roughly 0~45
                    t = Math.max(0, Math.min(1, t));

                    // Color stops: Blue(0) -> Green(0.33) -> Yellow(0.66) -> Red(1.0)
                    if (t < 0.33) colorObj.lerpColors(new THREE.Color('#2196f3'), new THREE.Color('#4caf50'), t / 0.33);
                    else if (t < 0.66) colorObj.lerpColors(new THREE.Color('#4caf50'), new THREE.Color('#ffeb3b'), (t - 0.33) / 0.33);
                    else colorObj.lerpColors(new THREE.Color('#ffeb3b'), new THREE.Color('#f44336'), (t - 0.66) / 0.34);

                    colorObj.toArray(colors, i * 3);

                    // Position the box
                    dummy.position.set(
                        (x - gridSize[0] / 2) * 2 + 1,
                        y * 1.5 + 0.5,
                        (z - gridSize[2] / 2) * 2 + 1
                    );

                    // Scale it down to be a small node
                    dummy.scale.set(0.6, 0.6, 0.6);
                    dummy.updateMatrix();
                    meshRef.current.setMatrixAt(i, dummy.matrix);
                    i++;
                }
            }
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow>
            <boxGeometry args={[1, 1, 1]}>
                <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
            </boxGeometry>
            <meshStandardMaterial vertexColors transparent opacity={0.8} />
        </instancedMesh>
    );
};

export default function GreenhouseThermalAI() {
    const [extTemp, setExtTemp] = useState(5);
    const [heater, setHeater] = useState(50);
    const [fan, setFan] = useState(20);

    const [simulationResult, setSimulationResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const runSimulation = () => {
        setLoading(true);
        setTimeout(() => {
            const avgTemp = extTemp + (heater * 0.25) - (fan * 0.1);
            const gradient = heater > 70 && fan < 30 ? "고도화 (상하층 온도차 극심)" : fan > 60 ? "균일 (층간 편차 감소)" : "일반적 대류";

            let analysis = "적정";
            if (avgTemp > 35) analysis = "위험: 냉각팬 최대 가동 필요 (고온 장애 우려)";
            else if (avgTemp < 10) analysis = "위험: 히터 가동률 증가 필요 (냉해 우려)";
            else if (heater > 70 && fan < 30) analysis = "경고: 에어 서큘레이터(팬) 가동 권장 (열 정체)";
            else analysis = "최적 환경 유지 중";

            setSimulationResult({
                avgTemp: avgTemp.toFixed(1),
                tempGradient: gradient,
                energyEff: (100 - (heater * 0.5 + fan * 0.5)).toFixed(1),
                recommendation: analysis
            });
            setLoading(false);
        }, 1800);
    };

    return (
        <div className="sim-ui">
            <h3 className="panel-title">🌡️ 스마트 온실 열환경 시뮬레이터</h3>

            <div className="layout-grid">
                <div className="controls-panel">
                    <div className="form-section">
                        <span className="fl">외부 온도 (℃)</span>
                        <input type="number" className="item-input" value={extTemp} onChange={e => setExtTemp(Number(e.target.value))} />
                    </div>

                    <div className="form-section">
                        <span className="fl">히터 가동률 (%)</span>
                        <div className="ig">
                            <input type="range" className="slider slider-red" min={0} max={100} value={heater} onChange={e => setHeater(Number(e.target.value))} />
                            <div className="slider-labels"><span>0%</span><span className="text-rose">{heater}%</span></div>
                        </div>
                    </div>

                    <div className="form-section">
                        <span className="fl">환기 팬 가동률 (%)</span>
                        <div className="ig">
                            <input type="range" className="slider slider-blue" min={0} max={100} value={fan} onChange={e => setFan(Number(e.target.value))} />
                            <div className="slider-labels"><span>0%</span><span className="text-cyan">{fan}%</span></div>
                        </div>
                    </div>

                    <button className="btn btn-primary run-btn mt-md" onClick={runSimulation} disabled={loading}>
                        {loading ? '열 유체 연산 중...' : '🔥 열 분포 추론 실행'}
                    </button>

                    {simulationResult && (
                        <div className="results mt-md">
                            <h4 className="fl">분석 결과</h4>
                            <div className="stat-grid">
                                <div className="stat-box">
                                    <span className="sb-label">온실 평균 내부 온도</span>
                                    <span className="sb-val" style={{ color: simulationResult.avgTemp > 30 ? 'var(--accent-rose)' : simulationResult.avgTemp < 15 ? 'var(--accent-cyan)' : 'var(--accent-emerald)' }}>
                                        {simulationResult.avgTemp} ℃
                                    </span>
                                </div>
                                <div className="stat-box">
                                    <span className="sb-label">온도 그라데이션</span>
                                    <span className="sb-val" style={{ fontSize: '12px' }}>{simulationResult.tempGradient}</span>
                                </div>
                            </div>
                            <div className="analysis-box mt-sm">
                                <strong>AI 제어 제안: </strong> {simulationResult.recommendation}
                            </div>
                        </div>
                    )}
                </div>

                <div className="canvas-wrapper">
                    <Canvas camera={{ position: [25, 15, 25], fov: 45 }}>
                        <color attach="background" args={['#1a1a1a']} />

                        <ambientLight intensity={1} />

                        {/* Greenhouse Structure (Transparent Grid) */}
                        <mesh position={[0, 4, 0]}>
                            <boxGeometry args={[22, 10, 22]} />
                            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
                            <Edges color="#4caf50" threshold={15} />
                        </mesh>

                        {/* Thermal Grid Nodes */}
                        <ThermalGrid heater={heater} fan={fan} extTemp={extTemp} />

                        <OrbitControls target={[0, 4, 0]} />
                    </Canvas>
                    <div className="canvas-overlay">입체 열분포(CFD) 프리뷰 (Color: 파랑=저온, 빨강=고온)</div>
                </div>
            </div>

            <style jsx>{`
        .sim-ui{display:flex;flex-direction:column;gap:var(--space-lg)}.panel-title{font-size:18px;font-weight:800}
        .layout-grid { display: grid; grid-template-columns: 320px 1fr; gap: var(--space-lg); }
        .form-section{margin-bottom:var(--space-md)}.fl{font-size:13px;font-weight:600;display:block;margin-bottom:8px;color:var(--text-secondary)}
        .mt-sm { margin-top: var(--space-sm); }
        .mt-md { margin-top: var(--space-md); }
        
        .item-input{width:100%;padding:10px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);font-family:inherit;font-size:13px;color:var(--text-primary);transition:all .2s ease;}
        .item-input:focus{border-color:var(--accent-cyan);outline:none;background:rgba(255,255,255,0.05);}
        
        .ig { margin-top: 8px; }
        .slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:var(--bg-glass-strong);border-radius:3px;outline:none}
        .slider.slider-red::-webkit-slider-thumb{background:var(--accent-rose)}
        .slider.slider-blue::-webkit-slider-thumb{background:var(--accent-cyan)}
        .slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;cursor:pointer}
        .slider-labels { display: flex; justify-content: space-between; font-size: 11px; color: var(--text-tertiary); margin-top: 4px; }
        .text-rose { color: var(--accent-rose); font-weight: 700; }
        .text-cyan { color: var(--accent-cyan); font-weight: 700; }
        
        .run-btn{width:100%;padding:14px;font-weight:700;}
        
        .canvas-wrapper { position: relative; border-radius: var(--radius-lg); overflow: hidden; height: 500px; border: 1px solid #333; background: #000; }
        .canvas-overlay { position: absolute; bottom: 16px; left: 16px; font-size: 11px; background: rgba(0,0,0,0.6); color: white; padding: 6px 12px; border-radius: var(--radius-full); pointer-events: none;}
        
        .results{animation:fadeInUp .4s ease-out; background: var(--bg-card); padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);}
        .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm); margin-bottom: var(--space-md); }
        .stat-box { background: var(--bg-glass); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: center; }
        .sb-label { display: block; font-size: 11px; color: var(--text-tertiary); margin-bottom: 2px; }
        .sb-val { font-size: 16px; font-weight: 700; font-family: var(--font-mono); }
        .analysis-box { padding: 12px; border-radius: var(--radius-sm); font-size: 13px; background: rgba(255,255,255,0.03); border-left: 3px solid var(--accent-emerald); }

        @media(max-width: 900px){ .layout-grid { grid-template-columns: 1fr; } .canvas-wrapper { height: 400px; } }
      `}</style>
        </div>
    );
}
