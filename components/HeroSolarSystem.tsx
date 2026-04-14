
import React from 'react';

const HeroSolarSystem: React.FC = () => {
  const asteroidCount = 60; // 성능 및 모바일 가독성을 위해 개수 최적화
  const beltRadius = 420;
  const asteroids = Array.from({ length: asteroidCount }).map((_, i) => {
      const angle = (i / asteroidCount) * 360 + (Math.random() - 0.5) * 15;
      const distance = beltRadius / 2 + (Math.random() - 0.5) * 30;
      const size = Math.random() * 2 + 1;
      return (
          <div
              key={i}
              className="asteroid"
              style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: `rotate(${angle}deg) translateX(${distance}px)`,
              }}
          ></div>
      );
  });

  return (
    <div className="hero-solar-system-container scale-[0.6] sm:scale-[0.8] md:scale-90 lg:scale-100 transition-transform duration-1000">
      <div className="hero-solar-system">
        {/* Central Sun */}
        <div className="hero-sun"></div>
        
        {/* Inner Planet - Mercury type */}
        <div className="hero-orbit" style={{ '--orbit-size': '220px', '--duration': '22s' } as React.CSSProperties}>
          <div className="hero-planet" style={{ 
              '--planet-size': '14px', 
              '--planet-color': '#fde68a',
              '--planet-dark-color': '#b45309',
              '--glow-color': 'rgba(253, 230, 138, 0.4)'
          } as React.CSSProperties}></div>
        </div>
        
        {/* Middle Planet - Earth type */}
        <div className="hero-orbit" style={{ '--orbit-size': '380px', '--duration': '35s' } as React.CSSProperties}>
          <div className="hero-planet" style={{ 
              '--planet-size': '24px', 
              '--planet-color': '#67e8f9',
              '--planet-dark-color': '#0369a1',
              '--glow-color': 'rgba(103, 232, 249, 0.4)'
          } as React.CSSProperties}></div>
        </div>

        {/* Asteroid Belt */}
        <div className="asteroid-belt-orbit">
          {asteroids}
        </div>

        {/* Outer Planet - Mars type */}
        <div className="hero-orbit" style={{ '--orbit-size': '580px', '--duration': '60s' } as React.CSSProperties}>
          <div className="hero-planet" style={{ 
              '--planet-size': '20px', 
              '--planet-color': '#fb923c',
              '--planet-dark-color': '#7c2d12',
              '--glow-color': 'rgba(251, 146, 60, 0.4)'
          } as React.CSSProperties}>
              {/* Moon for outer planet */}
              <div className="hero-moon-orbit" style={{ '--orbit-size': '60px', '--duration': '10s' } as React.CSSProperties}>
                  <div className="hero-planet" style={{ 
                      '--planet-size': '8px',
                      '--planet-color': '#cbd5e1',
                      '--planet-dark-color': '#475569',
                      '--glow-color': 'rgba(203, 213, 225, 0.3)'
                  } as React.CSSProperties}></div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSolarSystem;
