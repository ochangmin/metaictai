
import React from 'react';

const SolarSystemBackground: React.FC = () => (
  <div className="absolute inset-0 solar-system-bg overflow-hidden -z-10 opacity-70">
    <div className="sun"></div>
    <div className="orbit" style={{ '--orbit-radius': '80px', '--duration': '20s' } as React.CSSProperties}>
      <div className="planet" style={{ '--planet-size': '8px', backgroundColor: '#a8a29e' } as React.CSSProperties}></div>
    </div>
    <div className="orbit" style={{ '--orbit-radius': '140px', '--duration': '35s' } as React.CSSProperties}>
      <div className="planet" style={{ '--planet-size': '12px', backgroundColor: '#f97316' } as React.CSSProperties}></div>
    </div>
    <div className="orbit" style={{ '--orbit-radius': '220px', '--duration': '60s' } as React.CSSProperties}>
      <div className="planet" style={{ '--planet-size': '16px', backgroundColor: '#0ea5e9' } as React.CSSProperties}>
        <div className="orbit moon-orbit" style={{ '--orbit-radius': '25px', '--duration': '5s' } as React.CSSProperties}>
          <div className="planet moon" style={{ '--planet-size': '4px', backgroundColor: '#e2e8f0' } as React.CSSProperties}></div>
        </div>
      </div>
    </div>
    <div className="orbit" style={{ '--orbit-radius': '320px', '--duration': '100s' } as React.CSSProperties}>
      <div className="planet" style={{ '--planet-size': '10px', backgroundColor: '#ef4444' } as React.CSSProperties}></div>
    </div>
  </div>
);

export default SolarSystemBackground;
