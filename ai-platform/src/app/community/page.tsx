'use client';

import { useState } from 'react';

interface Post {
    id: number;
    author: string;
    avatar: string;
    role: string;
    time: string;
    content: string;
    tags: string[];
    likes: number;
    comments: number;
    simulator?: string;
}

const mockPosts: Post[] = [
    {
        id: 1,
        author: '김수연',
        avatar: '👩‍🔬',
        role: '생명과학 연구원',
        time: '2시간 전',
        content: 'BioSim AI로 코로나 스파이크 단백질 변이체의 접힘 패턴을 시뮬레이션해봤습니다. 기존 연구와 90% 이상 일치하는 결과가 나왔네요. 특히 S1 서브유닛의 RBD 영역 변화가 인상적이었습니다.',
        tags: ['단백질 접힘', 'COVID-19'],
        likes: 24,
        comments: 8,
        simulator: 'BioSim AI',
    },
    {
        id: 2,
        author: 'Park Joon',
        avatar: '👨‍💻',
        role: 'AI 엔지니어',
        time: '5시간 전',
        content: 'NeuroNet Explainer에서 ResNet-50의 활성화 경로를 시각화해봤는데, skip connection을 통한 gradient flow를 직관적으로 이해할 수 있었습니다. XAI 교육 자료로 활용하면 좋을 것 같아요.',
        tags: ['XAI', '딥러닝', 'ResNet'],
        likes: 31,
        comments: 12,
        simulator: 'NeuroNet Explainer',
    },
    {
        id: 3,
        author: '이은지',
        avatar: '👩‍🏫',
        role: '환경과학 교수',
        time: '1일 전',
        content: 'ClimateTrace AI로 지난 20년간의 북극 해빙 변화를 시뮬레이션했습니다. 2030년까지의 추세를 예측하니 정말 충격적인 결과가 나왔어요. 학생들에게 보여주니 환경 문제의 심각성을 체감한다고 하더군요.',
        tags: ['기후변화', '북극해빙'],
        likes: 45,
        comments: 19,
        simulator: 'ClimateTrace AI',
    },
    {
        id: 4,
        author: 'David Choi',
        avatar: '🧑‍🔬',
        role: '재료공학 박사과정',
        time: '1일 전',
        content: 'MaterialGen AI에서 그래핀-구리 복합소재의 열전도율을 시뮬레이션했더니, 실험실 데이터와 매우 유사한 결과가 나왔습니다. 이제 실험 전 사전 검증 단계에서 적극 활용하고 있습니다.',
        tags: ['신소재', '그래핀', '열전도'],
        likes: 18,
        comments: 6,
        simulator: 'MaterialGen AI',
    },
    {
        id: 5,
        author: '정하윤',
        avatar: '👨‍💼',
        role: '경제 애널리스트',
        time: '2일 전',
        content: 'EconoCast AI로 금리 인상 시나리오별 GDP 영향을 분석해봤습니다. 3가지 시나리오를 동시 비교할 수 있어서 보고서 작성에 큰 도움이 되었어요. 인터랙티브 차트 기능이 특히 좋습니다.',
        tags: ['경제예측', '금리', 'GDP'],
        likes: 37,
        comments: 14,
        simulator: 'EconoCast AI',
    },
];

export default function CommunityPage() {
    const [posts, setPosts] = useState(mockPosts);
    const [newPost, setNewPost] = useState('');

    const handleLike = (id: number) => {
        setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    };

    return (
        <div className="page-container">
            <div className="community-layout">
                {/* Main Feed */}
                <div className="feed-main">
                    <div className="section-header">
                        <span className="badge badge-purple">COMMUNITY</span>
                        <h1 style={{ marginTop: '12px', fontSize: '32px' }}>연구자 커뮤니티</h1>
                        <p>AI 시뮬레이터 경험을 공유하고, 연구자들과 토론하세요.</p>
                    </div>

                    {/* Compose */}
                    <div className="compose glass-card">
                        <div className="compose-avatar">🧑‍💻</div>
                        <div className="compose-body">
                            <textarea
                                className="input-field"
                                placeholder="연구 결과나 인사이트를 공유하세요..."
                                value={newPost}
                                onChange={e => setNewPost(e.target.value)}
                                rows={3}
                            />
                            <div className="compose-actions">
                                <div className="compose-tools">
                                    <button className="btn btn-ghost btn-icon" title="이미지 첨부">📎</button>
                                    <button className="btn btn-ghost btn-icon" title="코드 블록">{'</>'}</button>
                                    <button className="btn btn-ghost btn-icon" title="시뮬레이터 결과 공유">📊</button>
                                </div>
                                <button className="btn btn-primary" disabled={!newPost.trim()}>게시하기</button>
                            </div>
                        </div>
                    </div>

                    {/* Posts */}
                    <div className="posts-list">
                        {posts.map((post, i) => (
                            <article key={post.id} className="post-card glass-card" style={{ animationDelay: `${i * 80}ms` }}>
                                <div className="post-header">
                                    <div className="post-avatar">{post.avatar}</div>
                                    <div className="post-meta">
                                        <span className="post-author">{post.author}</span>
                                        <span className="post-role">{post.role}</span>
                                    </div>
                                    <span className="post-time">{post.time}</span>
                                </div>
                                {post.simulator && (
                                    <div className="post-simulator">
                                        <span>🧪</span> <span>{post.simulator}</span>
                                    </div>
                                )}
                                <p className="post-content">{post.content}</p>
                                <div className="post-tags">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="sim-tag">#{tag}</span>
                                    ))}
                                </div>
                                <div className="post-actions">
                                    <button className="post-action" onClick={() => handleLike(post.id)}>
                                        ❤️ <span>{post.likes}</span>
                                    </button>
                                    <button className="post-action">
                                        💬 <span>{post.comments}</span>
                                    </button>
                                    <button className="post-action">
                                        🔗 <span>공유</span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="feed-sidebar">
                    <div className="sidebar-card glass-card">
                        <h3>🔥 인기 태그</h3>
                        <div className="popular-tags">
                            {['단백질 접힘', 'XAI', '기후변화', '경제예측', '신소재', '딥러닝', 'COVID-19', '양자화학'].map(tag => (
                                <span key={tag} className="sim-tag">#{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="sidebar-card glass-card">
                        <h3>👥 활발한 연구자</h3>
                        <div className="top-users">
                            {['👩‍🔬 김수연', '👨‍💻 Park Joon', '👩‍🏫 이은지', '🧑‍🔬 David Choi'].map(user => (
                                <div key={user} className="top-user">{user}</div>
                            ))}
                        </div>
                    </div>
                    <div className="sidebar-card glass-card">
                        <h3>📊 플랫폼 현황</h3>
                        <div className="platform-stats">
                            <div className="ps-item">
                                <span className="ps-value">1,247</span>
                                <span className="ps-label">커뮤니티 멤버</span>
                            </div>
                            <div className="ps-item">
                                <span className="ps-value">3,891</span>
                                <span className="ps-label">시뮬레이션 실행</span>
                            </div>
                            <div className="ps-item">
                                <span className="ps-value">582</span>
                                <span className="ps-label">게시글</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            <style jsx>{`
        .community-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: var(--space-xl);
          padding-top: var(--space-xl);
        }
        .feed-main {
          min-width: 0;
        }

        /* Compose */
        .compose {
          display: flex;
          gap: var(--space-md);
          padding: var(--space-xl);
          margin-bottom: var(--space-xl);
        }
        .compose-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--bg-glass-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .compose-body {
          flex: 1;
        }
        .compose-body .input-field {
          resize: none;
          min-height: 70px;
          margin-bottom: var(--space-sm);
        }
        .compose-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .compose-tools {
          display: flex;
          gap: 4px;
        }

        /* Posts */
        .posts-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .post-card {
          padding: var(--space-xl);
          animation: fadeInUp 0.5s ease-out both;
        }
        .post-header {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }
        .post-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: var(--bg-glass-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .post-meta {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .post-author {
          font-size: 14px;
          font-weight: 600;
        }
        .post-role {
          font-size: 12px;
          color: var(--text-tertiary);
        }
        .post-time {
          font-size: 12px;
          color: var(--text-tertiary);
        }
        .post-simulator {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--accent-cyan-dim);
          color: var(--accent-cyan);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
          margin-bottom: var(--space-sm);
        }
        .post-content {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-primary);
          margin-bottom: var(--space-md);
        }
        .post-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: var(--space-md);
        }
        .sim-tag {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          background: rgba(255,255,255,0.05);
          color: var(--text-tertiary);
        }
        .post-actions {
          display: flex;
          gap: var(--space-lg);
          border-top: 1px solid var(--border-subtle);
          padding-top: var(--space-md);
        }
        .post-action {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
        }
        .post-action:hover {
          color: var(--text-primary);
        }

        /* Sidebar */
        .feed-sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          position: sticky;
          top: calc(var(--navbar-height) + var(--space-xl));
          height: fit-content;
        }
        .sidebar-card {
          padding: var(--space-lg);
        }
        .sidebar-card h3 {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: var(--space-md);
        }
        .popular-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .top-users {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .top-user {
          font-size: 13px;
          padding: 6px 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .top-user:last-child { border-bottom: none; }
        .platform-stats {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .ps-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0;
        }
        .ps-value {
          font-size: 16px;
          font-weight: 700;
          color: var(--accent-cyan);
        }
        .ps-label {
          font-size: 12px;
          color: var(--text-tertiary);
        }

        @media (max-width: 900px) {
          .community-layout {
            grid-template-columns: 1fr;
          }
          .feed-sidebar {
            position: static;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .sidebar-card {
            flex: 1;
            min-width: 240px;
          }
        }
      `}</style>
        </div>
    );
}
