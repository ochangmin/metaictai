
import React, { useState } from 'react';
import Logo from '../components/Logo';

const EditorLine: React.FC<{ line: number; children: React.ReactNode }> = ({ line, children }) => (
    <div className="flex group min-h-[1.5rem]">
        <div className="w-12 text-right pr-4 select-none text-gray-700 font-mono text-sm leading-6 border-r border-white/5 mr-4">
            {line}
        </div>
        <div className="flex-grow font-mono text-sm leading-6">
            {children}
        </div>
    </div>
);

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Deploying request:', formState);
    setIsSubmitted(true);
  };

  return (
    <div className="animate-fade-in bg-[#050505] min-h-screen pt-32 pb-40">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
            {/* Header / Tabs feel */}
            <div className="flex items-center space-x-px mb-px">
                <div className="bg-white/5 border-t-2 border-orange-500 px-6 py-2 flex items-center space-x-2 rounded-t-sm">
                    <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7L12 12L22 7L12 2Z"/></svg>
                    <span className="font-mono text-xs text-white">inquiry_request.py</span>
                </div>
                <div className="bg-black/20 px-6 py-2 flex items-center space-x-2 text-gray-600 hover:text-gray-400 transition-colors cursor-pointer">
                    <span className="font-mono text-xs">metaict_config.json</span>
                </div>
            </div>

            {/* Editor Body */}
            <div className="bg-white/[0.03] border border-white/10 rounded-b-sm p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 pointer-events-none">
                    <Logo isWatermark className="scale-150 origin-top-right" />
                </div>

                {isSubmitted ? (
                    <div className="py-20 text-center animate-pulse">
                        <h2 className="text-3xl font-black text-orange-500 uppercase tracking-widest mb-4">Request Deployed</h2>
                        <p className="text-gray-400 font-mono">Status: 200 OK - Our team will contact you shortly.</p>
                        <button 
                            onClick={() => setIsSubmitted(false)}
                            className="mt-12 font-mono text-xs text-gray-500 hover:text-white underline"
                        >
                            Send another request
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-1">
                        <EditorLine line={1}>
                            <span className="text-gray-500">{"# (주)메타아이씨티 - 비즈니스 협업 및 기술 문의"}</span>
                        </EditorLine>
                        <EditorLine line={2}>
                            <span className="text-blue-400">import</span> <span className="text-white">client_service</span>
                        </EditorLine>
                        <EditorLine line={3}></EditorLine>
                        <EditorLine line={4}>
                            <span className="text-blue-400">class</span> <span className="text-yellow-300">NewInquiry</span><span className="text-white">:</span>
                        </EditorLine>
                        <EditorLine line={5}>
                            <span className="ml-8 text-blue-400">def</span> <span className="text-green-400">__init__</span><span className="text-white">(self):</span>
                        </EditorLine>
                        
                        {/* Name Input */}
                        <EditorLine line={6}>
                            <span className="ml-16 text-white">self.name = </span>
                            <input 
                                type="text" 
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                required
                                placeholder="'귀하의 성함/기업명'"
                                className="bg-transparent border-b border-white/10 focus:border-orange-500 outline-none text-orange-300 px-1 w-64 placeholder:text-gray-700 transition-colors"
                            />
                        </EditorLine>

                        {/* Email Input */}
                        <EditorLine line={7}>
                            <span className="ml-16 text-white">self.email = </span>
                            <input 
                                type="email" 
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                required
                                placeholder="'contact@company.com'"
                                className="bg-transparent border-b border-white/10 focus:border-orange-500 outline-none text-orange-300 px-1 w-64 placeholder:text-gray-700 transition-colors"
                            />
                        </EditorLine>

                        <EditorLine line={8}></EditorLine>
                        <EditorLine line={9}>
                            <span className="ml-8 text-blue-400">def</span> <span className="text-green-400">submit_message</span><span className="text-white">(self):</span>
                        </EditorLine>
                        
                        {/* Message Input */}
                        <EditorLine line={10}>
                            <span className="ml-16 text-gray-500">{"\"\"\""}</span>
                        </EditorLine>
                        <EditorLine line={11}>
                            <div className="ml-16 w-full">
                                <textarea 
                                    name="message"
                                    rows={6}
                                    value={formState.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="프로젝트 세부 내용 혹은 궁금하신 점을 작성해주세요..."
                                    className="w-full bg-transparent border-none outline-none text-gray-300 resize-none placeholder:text-gray-700 transition-colors"
                                ></textarea>
                            </div>
                        </EditorLine>
                        <EditorLine line={17}>
                            <span className="ml-16 text-gray-500">{"\"\"\""}</span>
                        </EditorLine>
                        
                        <EditorLine line={18}></EditorLine>
                        <EditorLine line={19}>
                            <span className="text-blue-400">if</span> <span className="text-white">__name__ == </span><span className="text-orange-300">"__main__"</span><span className="text-white">:</span>
                        </EditorLine>
                        <EditorLine line={20}>
                            <div className="ml-8">
                                <button 
                                    type="submit"
                                    className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-2 rounded-sm font-bold transition-all transform active:scale-95 flex items-center space-x-2"
                                >
                                    <span>RUN INQUIRY</span>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                </button>
                            </div>
                        </EditorLine>
                    </form>
                )}
            </div>

            {/* Bottom info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                    { label: 'HQ Address', val: '대전광역시 유성구 하이클래스 빌딩 8층' },
                    { label: 'R&D Center', val: '세종특별자치시 보람동 대방디엠시티 201호' },
                    { label: 'Contact', val: 'ocm@metaict.kr / +82 42-XXX-XXXX' }
                ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-sm">
                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">{item.label}</p>
                        <p className="text-sm text-gray-300 font-light">{item.val}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
