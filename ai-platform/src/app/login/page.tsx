'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError('이메일 또는 비밀번호가 일치하지 않습니다.');
            setLoading(false);
        } else {
            router.push('/data');
            router.refresh();
        }
    };

    return (
        <div className="login-container">
            <div className="login-box glass-card">
                <div className="brand-logo text-center">
                    <div className="brand-icon">M</div>
                    <h2>Meta<span className="brand-ai"> R&D</span> 관리자 로그인</h2>
                    <p className="login-desc">시뮬레이션 및 데이터 관리 시스템에 접속합니다.</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-msg">{error}</div>}

                    <div className="form-group">
                        <label>이메일</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="admin@metaict.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
                        {loading ? '로그인 처리 중...' : '로그인'}
                    </button>
                </form>
            </div>

            <style jsx>{`
        .login-container { min-height: 80vh; display: flex; align-items: center; justify-content: center; background: url('/bg-grid.svg') center/cover; }
        .login-box { width: 100%; max-width: 400px; padding: 40px; border-radius: var(--radius-lg); background: var(--bg-glass-strong); backdrop-filter: blur(12px); border: 1px solid var(--border-subtle); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .brand-logo { margin-bottom: 30px; }
        .brand-icon { width: 48px; height: 48px; background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan)); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 12px; }
        h2 { font-size: 22px; font-weight: 700; }
        .brand-ai { background: linear-gradient(to right, var(--accent-purple), var(--accent-cyan)); -webkit-background-clip: text; color: transparent; }
        .login-desc { font-size: 13px; color: var(--text-secondary); margin-top: 8px; }
        
        .form-group { margin-bottom: 20px; text-align: left; }
        label { display: block; font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px; }
        .form-input { width: 100%; padding: 12px 14px; background: rgba(0,0,0,0.2); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); font-size: 14px; transition: all 0.2s ease; font-family: inherit; }
        .form-input:focus { outline: none; border-color: var(--accent-cyan); background: rgba(0,0,0,0.4); box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.1); }
        
        .login-btn { width: 100%; padding: 14px; font-size: 15px; font-weight: 700; margin-top: 10px; }
        .error-msg { background: rgba(244, 67, 54, 0.1); color: #f44336; padding: 10px; border-radius: var(--radius-sm); font-size: 13px; margin-bottom: 20px; border: 1px solid rgba(244, 67, 54, 0.2); text-align: center; }
      `}</style>
        </div>
    );
}
