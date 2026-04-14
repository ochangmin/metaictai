
import React from 'react';

interface LogoProps {
  className?: string;
  isWatermark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8", isWatermark = false }) => {
  if (isWatermark) {
    return (
      <div className={`flex items-center select-none pointer-events-none opacity-5 ${className}`}>
        <span className="font-black tracking-tighter text-8xl md:text-9xl uppercase text-white">
          METAICT
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center select-none ${className}`}>
      <span className="font-black tracking-tighter text-2xl md:text-3xl uppercase flex items-baseline">
        <span className="animate-logo-breath">
          METAICT
        </span>
      </span>
      {/* AI 기술력을 상징하는 시각적 포인트: 데이터 펄스 노드 */}
      <div className="ml-2 flex space-x-1 items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-pulse"></div>
        <div className="w-1 h-1 rounded-full bg-white/20"></div>
      </div>
    </div>
  );
};

export default Logo;
