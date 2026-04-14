'use client';
import { useState } from 'react';

export default function WaterQualityInput({ onResult }: any) {
    const [ec, setEc] = useState(1.2);
    const [turbidity, setTurbidity] = useState(5.0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const analyze = () => {
        setLoading(true);
        setTimeout(() => {
            const result = { quality: ec > 2.0 ? '염류 집적 경고' : '양호', action: '현재 1일 2회 관수 사이클 유지' };
            setData(result);
            if (onResult) onResult({ ec, turbidity }, result);
            setLoading(false);
        }, 900);
    };

    return (
        <div className="legacy-module">
            <h3>💧 관수 수질 분석 측정 기입부</h3>
            <div className="form-grid mt-lg">
                <label>전기전도도(EC)</label><input type="number" step="0.1" className="item-input" value={ec} onChange={e => setEc(Number(e.target.value))} />
                <label>탁도 (NTU)</label><input type="number" step="0.1" className="item-input" value={turbidity} onChange={e => setTurbidity(Number(e.target.value))} />
            </div>
            <button className="btn btn-primary run-btn mt-lg" onClick={analyze} disabled={loading}>{loading ? '관수 분석 중...' : '관수 품질 분석'}</button>
            {data && (
                <div className="results-panel mt-lg">
                    <h4>💧 분석 결과</h4>
                    <ul><li>수질 등급: {data.quality}</li><li>권장 조치: {data.action}</li></ul>
                </div>
            )}
            <style jsx>{`.legacy-module{color:var(--text-primary)} h3{font-size:20px;font-weight:800;margin-bottom:8px} .form-grid{display:grid;grid-template-columns:120px 1fr;gap:16px;align-items:center;max-width:400px} label{font-size:13px;color:var(--text-secondary)} .item-input{padding:10px;border:1px solid var(--border-subtle);background:var(--bg-glass);border-radius:var(--radius-sm);color:#fff;font-family:inherit} .run-btn{width:100%;max-width:400px;padding:12px} .results-panel{background:rgba(0,0,0,0.2);border:1px solid var(--accent-cyan);padding:20px;border-radius:var(--radius-md);max-width:400px; animation: fadeInUp .3s ease;} .results-panel h4{margin-top:0;font-size:14px;color:var(--accent-cyan);margin-bottom:12px} .results-panel ul{list-style:none;padding:0;margin:0} .results-panel li{margin-bottom:8px;font-size:13px} .mt-lg{margin-top:24px}`}</style>
        </div>
    );
}
