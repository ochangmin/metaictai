'use client';
import { useState } from 'react';

export default function PestReportInput({ onResult }: any) {
    const [crop, setCrop] = useState('사과');
    const [symptom, setSymptom] = useState('잎에 갈색 반점이 생김');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const analyze = () => {
        setLoading(true);
        setTimeout(() => {
            const result = { diagnosis: '갈색무늬병(탄저병) 의심', risk: '높음', treatment: '살균제(테부코나졸 등) 예방 시약 필요' };
            setData(result);
            if (onResult) onResult({ crop, symptom }, result);
            setLoading(false);
        }, 1100);
    };

    return (
        <div className="legacy-module">
            <h3>🐛 병해충 발생 현장 리포트 폼</h3>
            <div className="form-grid mt-lg">
                <label>대상 작물</label><input type="text" className="item-input" value={crop} onChange={e => setCrop(e.target.value)} />
                <label>주요 증상</label><textarea className="item-input" value={symptom} onChange={e => setSymptom(e.target.value)} rows={3} />
            </div>
            <button className="btn btn-primary run-btn mt-lg" onClick={analyze} disabled={loading}>{loading ? '현상 진단 중...' : '현상 기반 병해충 진단'}</button>
            {data && (
                <div className="results-panel mt-lg">
                    <h4>🚨 진단 결과 요약</h4>
                    <ul><li>의심 병해충: {data.diagnosis}</li><li style={{ color: 'var(--accent-rose)' }}>위험도: {data.risk}</li><li>처방 제안: {data.treatment}</li></ul>
                </div>
            )}
            <style jsx>{`.legacy-module{color:var(--text-primary)} h3{font-size:20px;font-weight:800;margin-bottom:8px} .form-grid{display:grid;grid-template-columns:100px 1fr;gap:16px;align-items:start;max-width:400px} label{font-size:13px;color:var(--text-secondary); margin-top:10px} .item-input{padding:10px;border:1px solid var(--border-subtle);background:var(--bg-glass);border-radius:var(--radius-sm);color:#fff;font-family:inherit;width:100%} .run-btn{width:100%;max-width:400px;padding:12px} .results-panel{background:rgba(0,0,0,0.2);border:1px solid var(--accent-rose);padding:20px;border-radius:var(--radius-md);max-width:400px; animation: fadeInUp .3s ease;} .results-panel h4{margin-top:0;font-size:14px;color:var(--accent-rose);margin-bottom:12px} .results-panel ul{list-style:none;padding:0;margin:0} .results-panel li{margin-bottom:8px;font-size:13px} .mt-lg{margin-top:24px}`}</style>
        </div>
    );
}
