
import React from 'react';
import Logo from '../components/Logo';

const PrivacySection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-12 border-l border-white/10 pl-8 relative">
        <div className="absolute left-[-1px] top-0 w-[2px] h-8 bg-orange-500"></div>
        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6">{title}</h3>
        <div className="text-gray-400 text-sm leading-relaxed space-y-4 font-light">
            {children}
        </div>
    </div>
);

const PrivacyPage: React.FC = () => {
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
                        Privacy <span className="text-cosmic">Policy</span>
                    </h1>
                    <p className="text-gray-500 font-light text-lg">개인정보 처리 방침</p>
                </div>

                {/* Content Body - Markdown Style */}
                <div className="bg-white/[0.02] border border-white/5 rounded-sm p-10 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 pointer-events-none opacity-[0.03]">
                        <Logo className="scale-[3] origin-top-right" />
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-gray-400 mb-16 text-sm leading-relaxed border-b border-white/5 pb-10">
                            (주)메타아이씨티(이하 '회사'라고 합니다)는 고객님의 개인정보를 중요시하며, "개인정보보호법" 등 관련 법령을 준수하고 있습니다. 
                            회사는 개인정보 처리방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 
                            개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
                        </p>

                        <PrivacySection title="1. 수집하는 개인정보의 항목">
                            <p>회사는 서비스 문의, 상담 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>필수항목: 이름(성함/기업명), 이메일 주소, 문의 내용</li>
                                <li>서비스 이용 과정이나 사업 처리 과정에서 IP Address, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록 등이 자동 생성되어 수집될 수 있습니다.</li>
                            </ul>
                        </PrivacySection>

                        <PrivacySection title="2. 개인정보의 수집 및 이용목적">
                            <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>고객 문의에 대한 답변 및 비즈니스 협업 상담</li>
                                <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 콘텐츠 제공</li>
                                <li>신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 전달 및 참여기회 제공</li>
                            </ul>
                        </PrivacySection>

                        <PrivacySection title="3. 개인정보의 보유 및 이용기간">
                            <p>원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                                <li>방문에 관한 기록: 3개월 (통신비밀보호법)</li>
                                <li>기타 고객의 동의를 받은 경우: 동의를 받은 기간까지</li>
                            </ul>
                        </PrivacySection>

                        <PrivacySection title="4. 개인정보의 파기절차 및 방법">
                            <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>파기절차: 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.</li>
                                <li>파기방법: 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
                            </ul>
                        </PrivacySection>

                        <PrivacySection title="5. 개인정보 보호책임자">
                            <p>회사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보 보호책임자를 지정하고 있습니다.</p>
                            <div className="bg-white/5 p-6 rounded-sm mt-4 border border-white/10">
                                <p className="font-bold text-white mb-2">개인정보 보호책임자</p>
                                <ul className="space-y-1">
                                    <li>성명: 오창민 (CHANG MIN - OH)</li>
                                    <li>직위: CTO / 기술이사</li>
                                    <li>이메일: ocm@metaict.kr</li>
                                </ul>
                            </div>
                        </PrivacySection>

                        <PrivacySection title="6. 고지의 의무">
                            <p>현 개인정보처리방침 내용 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일전부터 홈페이지의 '공지사항'을 통해 고지할 것입니다.</p>
                        </PrivacySection>
                    </div>
                </div>

                <div className="mt-20 flex flex-col items-center">
                    <p className="text-gray-600 text-[10px] font-mono uppercase tracking-[0.5em] mb-8">End of Document</p>
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

export default PrivacyPage;
