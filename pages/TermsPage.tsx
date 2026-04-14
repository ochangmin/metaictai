
import React from 'react';
import Logo from '../components/Logo';

const TermsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-12 border-l border-white/10 pl-8 relative">
        <div className="absolute left-[-1px] top-0 w-[2px] h-8 bg-orange-500"></div>
        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6">{title}</h3>
        <div className="text-gray-400 text-sm leading-relaxed space-y-4 font-light">
            {children}
        </div>
    </div>
);

const TermsPage: React.FC = () => {
    const today = new Date().toLocaleDateString();

    return (
        <div className="animate-fade-in bg-[#050505] min-h-screen pt-48 pb-40">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="mb-20">
                    <div className="flex items-center space-x-4 mb-6">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] font-mono text-orange-500 uppercase tracking-widest">Legal Document</span>
                        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">v1.0 / Updated: {today}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                        Terms of <span className="text-cosmic">Service</span>
                    </h1>
                    <p className="text-gray-500 font-light text-lg">이용약관</p>
                </div>

                {/* Content Body */}
                <div className="bg-white/[0.02] border border-white/5 rounded-sm p-10 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 pointer-events-none opacity-[0.03]">
                        <Logo className="scale-[3] origin-top-right" />
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-gray-400 mb-16 text-sm leading-relaxed border-b border-white/5 pb-10">
                            본 약관은 (주)메타아이씨티(이하 '회사')가 운영하는 웹사이트 및 관련 서비스(이하 '서비스')의 이용조건 및 절차, 회사와 회원간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
                        </p>

                        <TermsSection title="제 1 조 (목적)">
                            <p>이 약관은 (주)메타아이씨티가 제공하는 인공지능 솔루션 정보 및 관련 제반 서비스의 이용과 관련하여 회사와 이용자 사이의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
                        </TermsSection>

                        <TermsSection title="제 2 조 (용어의 정의)">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>'서비스'라 함은 회사가 웹사이트를 통해 제공하는 모든 정보, 콘텐츠, AI 모델 설명 및 기술 문서를 의미합니다.</li>
                                <li>'이용자'라 함은 회사의 웹사이트에 접속하여 본 약관에 따라 서비스를 이용하는 고객을 말합니다.</li>
                                <li>'콘텐츠'라 함은 회사가 서비스상에 게시한 텍스트, 이미지, 소프트웨어, 동영상 등의 정보를 의미합니다.</li>
                            </ul>
                        </TermsSection>

                        <TermsSection title="제 3 조 (약관의 명시와 개정)">
                            <p>회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 이 약관을 개정할 수 있습니다.</p>
                        </TermsSection>

                        <TermsSection title="제 4 조 (서비스의 내용 및 변경)">
                            <p>회사는 이용자에게 다음과 같은 서비스를 제공합니다.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>AI 기술 및 솔루션(METACORSET 등)에 관한 정보 제공</li>
                                <li>회사 홍보 및 비즈니스 파트너십 안내</li>
                                <li>비즈니스 상담 및 기술 문의 서비스</li>
                                <li>기타 회사가 정하는 서비스</li>
                            </ul>
                        </TermsSection>

                        <TermsSection title="제 5 조 (지식재산권)">
                            <p>서비스에 게재된 모든 콘텐츠, 로고, 디자인, AI 알고리즘 설명 및 소프트웨어에 대한 지식재산권은 회사에 귀속됩니다. 이용자는 회사의 사전 승낙 없이 이를 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.</p>
                        </TermsSection>

                        <TermsSection title="제 6 조 (책임제한)">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
                                <li>회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
                                <li>웹사이트에 게시된 정보의 정확성이나 완벽성에 대해 회사는 보증하지 않으며, 이용자는 이를 참고용으로만 사용하여야 합니다.</li>
                            </ul>
                        </TermsSection>

                        <TermsSection title="제 7 조 (준거법 및 재판관할)">
                            <p>회사와 이용자 간에 발생한 서비스 이용에 관한 분쟁에 대하여는 대한민국 법을 적용하며, 본 분쟁으로 인한 소송은 회사의 본사 소재지를 관할하는 법원을 전용 관할 법원으로 합니다.</p>
                        </TermsSection>
                    </div>
                </div>

                <div className="mt-20 flex flex-col items-center">
                    <p className="text-gray-600 text-[10px] font-mono uppercase tracking-[0.5em] mb-8">End of Terms</p>
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="text-xs font-bold text-white/40 hover:text-orange-500 transition-colors uppercase tracking-widest"
                    >
                        Back to Top
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
