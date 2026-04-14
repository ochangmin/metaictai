
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import Logo from './Logo';

interface ChatbotProps {
  knowledgeBase: any;
}

const Chatbot: React.FC<ChatbotProps> = ({ knowledgeBase }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: '안녕하세요! (주)메타아이씨티의 AI 컨시어지 META-Bot입니다. 당사의 AI 솔루션이나 기술력에 대해 무엇이든 물어보세요.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        당신은 (주)메타아이씨티(Meta ICT)의 공식 AI 상담사 'META-Bot'입니다. 
        당신의 임무는 아래 제공된 회사 데이터를 바탕으로 고객의 질문에 친절하고 전문적으로 답변하는 것입니다.
        
        [회사 지식 베이스]
        - AI 솔루션: ${JSON.stringify(knowledgeBase.models)}
        - 기술 구축 사례: ${JSON.stringify(knowledgeBase.techs)}
        - 회사 연혁: ${JSON.stringify(knowledgeBase.history)}
        - 홈페이지 주요 서비스: ${JSON.stringify(knowledgeBase.services)}
        - 주요 임직원: ${JSON.stringify(knowledgeBase.employees)}
        
        [답변 원칙]
        1. 모르는 내용은 지어내지 말고, "해당 내용은 현재 데이터베이스에서 확인이 어렵습니다. 상세 문의는 ocm@metaict.kr로 부탁드립니다"라고 안내하세요.
        2. 답변은 핵심 위주로 명확하게 하되, (주)메타아이씨티의 기술적 우수성을 강조하세요.
        3. 마크다운 형식을 사용하여 가독성 있게 답변하세요.
        4. 사용자가 특정 기술(예: METACORSET, 스마트팜 등)을 물어보면 해당 구축 사례의 상세 내용을 바탕으로 설명하세요.
        5. 한국어로 답변하세요.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const botText = response.text || '죄송합니다. 요청을 처리하는 중에 오류가 발생했습니다.';
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: '죄송합니다. 일시적인 연결 오류가 발생했습니다.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] font-sans">
      {/* Chat Button: 상하 부유 애니메이션(animate-floating) 적용 */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl animate-floating ${
          isOpen ? 'bg-orange-600 rotate-90' : 'bg-black border border-orange-500/50 hover:scale-110 active:scale-95'
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-20"></div>
            <svg className="w-6 h-6 md:w-8 md:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[calc(100vw-32px)] sm:w-[380px] md:w-[450px] h-[70vh] md:h-[600px] bg-[#0a0a0a]/95 border border-white/10 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
          {/* Window Header */}
          <div className="p-4 md:p-6 bg-gradient-to-r from-orange-600/20 to-transparent border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
               <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-xs font-black text-white">M</div>
               <div>
                  <h3 className="text-white font-bold text-sm tracking-widest uppercase">META-Bot</h3>
                  <div className="flex items-center space-x-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                     <span className="text-[10px] text-gray-500 font-mono">ACTIVE</span>
                  </div>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-orange-600 text-white rounded-tr-none' 
                  : 'bg-white/5 text-gray-300 border border-white/5 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex space-x-2">
                   <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                   <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                   <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-black/40 border-t border-white/5">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="질문을 입력하세요..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 md:py-4 pl-5 md:pl-6 pr-14 md:pr-16 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-600 font-light"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`absolute right-1.5 md:right-2 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
                  input.trim() ? 'bg-orange-600 text-white hover:scale-105 active:scale-90' : 'bg-white/5 text-gray-600'
                }`}
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
            <p className="mt-3 md:mt-4 text-center text-[8px] md:text-[9px] text-gray-700 font-mono tracking-widest uppercase">Powered by Gemini AI Engine</p>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ea580c; }
      `}</style>
    </div>
  );
};

export default Chatbot;
