
import React from 'react';

const PartnerText: React.FC<{ children: React.ReactNode; gradient: string }> = ({ children, gradient }) => (
  <span className={`font-black tracking-tighter text-2xl animate-partner-breath bg-gradient-to-r ${gradient} bg-clip-text text-transparent opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`}>
    {children}
  </span>
);

const SeoulText = () => <PartnerText gradient="from-blue-900 via-blue-600 to-blue-400">서울특별시</PartnerText>;
const BusanText = () => <PartnerText gradient="from-cyan-700 via-indigo-700 to-blue-800">부산광역시</PartnerText>;
const GangwonText = () => <PartnerText gradient="from-emerald-800 via-teal-600 to-lime-600">강원특별자치도</PartnerText>;
const DaejeonText = () => <PartnerText gradient="from-orange-800 via-red-700 to-yellow-600">대전광역시</PartnerText>;
const SejongText = () => <PartnerText gradient="from-rose-800 via-red-800 to-orange-600">세종특별자치시</PartnerText>;
const GovText = () => <PartnerText gradient="from-gray-700 via-gray-500 to-slate-400 uppercase">Public Partners</PartnerText>;

const OracleText = () => <PartnerText gradient="from-red-600 to-red-900">ORACLE</PartnerText>;
const RedHatText = () => <PartnerText gradient="from-red-500 to-black">Red Hat</PartnerText>;
const UbuntuText = () => <PartnerText gradient="from-orange-600 to-purple-900">ubuntu</PartnerText>;
const MSText = () => <PartnerText gradient="from-blue-500 via-red-500 to-green-500">Microsoft</PartnerText>;
const AWSText = () => <PartnerText gradient="from-orange-400 to-gray-800">AWS</PartnerText>;
const GCPText = () => <PartnerText gradient="from-blue-400 via-red-400 to-yellow-400">Google Cloud</PartnerText>;
const NvidiaText = () => <PartnerText gradient="from-green-500 to-black">NVIDIA</PartnerText>;
const DellText = () => <PartnerText gradient="from-blue-600 to-blue-400">DELL</PartnerText>;
const VmwareText = () => <PartnerText gradient="from-blue-500 to-gray-400">VMware</PartnerText>;

const partnerLogos = [
  { name: 'Seoul', Component: SeoulText, url: 'https://www.seoul.go.kr' },
  { name: 'Busan', Component: BusanText, url: 'https://www.busan.go.kr' },
  { name: 'Gangwon', Component: GangwonText, url: 'https://www.state.gw.kr' },
  { name: 'Daejeon', Component: DaejeonText, url: 'https://www.daejeon.go.kr' },
  { name: 'Sejong', Component: SejongText, url: 'https://www.sejong.go.kr' },
  { name: 'Gov', Component: GovText, url: 'https://www.gov.kr' },
  { name: 'Oracle', Component: OracleText, url: 'https://www.oracle.com' },
  { name: 'RedHat', Component: RedHatText, url: 'https://www.redhat.com' },
  { name: 'Ubuntu', Component: UbuntuText, url: 'https://ubuntu.com' },
  { name: 'MS', Component: MSText, url: 'https://www.microsoft.com' },
  { name: 'AWS', Component: AWSText, url: 'https://aws.amazon.com' },
  { name: 'GCP', Component: GCPText, url: 'https://cloud.google.com' },
  { name: 'Nvidia', Component: NvidiaText, url: 'https://www.nvidia.com' },
  { name: 'Dell', Component: DellText, url: 'https://www.dell.com' },
  { name: 'Vmware', Component: VmwareText, url: 'https://www.vmware.com' },
];

const TechPartners: React.FC = () => {
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <div className="w-full overflow-hidden py-12 bg-black/40 border-y border-white/5">
      <div className="animate-marquee">
        {duplicatedLogos.map(({ name, Component, url }, index) => (
          <a 
            key={`${name}-${index}`} 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center justify-center px-16 md:px-24 h-24 border-r border-white/10 group cursor-pointer transition-colors hover:bg-white/[0.02]"
          >
            <div className="transform transition-all duration-700 group-hover:scale-110">
              <Component />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TechPartners;
