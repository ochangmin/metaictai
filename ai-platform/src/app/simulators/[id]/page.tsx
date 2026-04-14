'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { simulators } from '@/data/simulators';
import dynamic from 'next/dynamic';
import DataPanel from '@/components/DataPanel';

// Original 10
const BioSimAI = dynamic(() => import('@/components/simulators/BioSimAI'));
const MaterialGenAI = dynamic(() => import('@/components/simulators/MaterialGenAI'));
const EconoCastAI = dynamic(() => import('@/components/simulators/EconoCastAI'));
const MediVisionAI = dynamic(() => import('@/components/simulators/MediVisionAI'));
const CodeArchitectAI = dynamic(() => import('@/components/simulators/CodeArchitectAI'));
const ClimateTraceAI = dynamic(() => import('@/components/simulators/ClimateTraceAI'));
const OptiFactoryAI = dynamic(() => import('@/components/simulators/OptiFactoryAI'));
const AstroMapAI = dynamic(() => import('@/components/simulators/AstroMapAI'));
const NeuroNetExplainer = dynamic(() => import('@/components/simulators/NeuroNetExplainer'));
const QuantumChemAI = dynamic(() => import('@/components/simulators/QuantumChemAI'));

// New 30
const SpeechForgeAI = dynamic(() => import('@/components/simulators/SpeechForgeAI'));
const LinguaNetAI = dynamic(() => import('@/components/simulators/LinguaNetAI'));
const StyleTransferAI = dynamic(() => import('@/components/simulators/StyleTransferAI'));
const CryptoShieldAI = dynamic(() => import('@/components/simulators/CryptoShieldAI'));
const DrugDiscoverAI = dynamic(() => import('@/components/simulators/DrugDiscoverAI'));
const OceanFlowAI = dynamic(() => import('@/components/simulators/OceanFlowAI'));
const StructurAI = dynamic(() => import('@/components/simulators/StructurAI'));
const AudioGenAI = dynamic(() => import('@/components/simulators/AudioGenAI'));
const SignalProcAI = dynamic(() => import('@/components/simulators/SignalProcAI'));
const MathSolverAI = dynamic(() => import('@/components/simulators/MathSolverAI'));
const AutoDriveAI = dynamic(() => import('@/components/simulators/AutoDriveAI'));
const EnergyGridAI = dynamic(() => import('@/components/simulators/EnergyGridAI'));
const LogicReasonAI = dynamic(() => import('@/components/simulators/LogicReasonAI'));
const AgriSenseAI = dynamic(() => import('@/components/simulators/AgriSenseAI'));
const AnomalyDetectAI = dynamic(() => import('@/components/simulators/AnomalyDetectAI'));
const PharmaKineticsAI = dynamic(() => import('@/components/simulators/PharmaKineticsAI'));
const GalaxyMapAI = dynamic(() => import('@/components/simulators/GalaxyMapAI'));
const TextileSimAI = dynamic(() => import('@/components/simulators/TextileSimAI'));
const UrbanPlanAI = dynamic(() => import('@/components/simulators/UrbanPlanAI'));
const GameTheoryAI = dynamic(() => import('@/components/simulators/GameTheoryAI'));
const CircuitDesignAI = dynamic(() => import('@/components/simulators/CircuitDesignAI'));
const ThermoSimAI = dynamic(() => import('@/components/simulators/ThermoSimAI'));
const ElectroMagAI = dynamic(() => import('@/components/simulators/ElectroMagAI'));
const EpidemicTraceAI = dynamic(() => import('@/components/simulators/EpidemicTraceAI'));
const LogiChainAI = dynamic(() => import('@/components/simulators/LogiChainAI'));
const EmotionAI = dynamic(() => import('@/components/simulators/EmotionAI'));
const ForensicAI = dynamic(() => import('@/components/simulators/ForensicAI'));
const FinRiskAI = dynamic(() => import('@/components/simulators/FinRiskAI'));
const ChemReactAI = dynamic(() => import('@/components/simulators/ChemReactAI'));
const NetworkTopoAI = dynamic(() => import('@/components/simulators/NetworkTopoAI'));

// Domestic R&D AI Simulators
const SemiConAI = dynamic(() => import('@/components/simulators/SemiConAI'));
const BatterySimAI = dynamic(() => import('@/components/simulators/BatterySimAI'));
const KCultureAI = dynamic(() => import('@/components/simulators/KCultureAI'));
const DemoGraphAI = dynamic(() => import('@/components/simulators/DemoGraphAI'));
const ShipBuildAI = dynamic(() => import('@/components/simulators/ShipBuildAI'));

// Agriculture & Crop Growth AI (10)
const SoilAnalyzerAI = dynamic(() => import('@/components/simulators/SoilAnalyzerAI'));
const CropDoctorAI = dynamic(() => import('@/components/simulators/CropDoctorAI'));
const IrrigationOptimizerAI = dynamic(() => import('@/components/simulators/IrrigationOptimizerAI'));
const GreenHouseControlAI = dynamic(() => import('@/components/simulators/GreenHouseControlAI'));
const FertilizerPlannerAI = dynamic(() => import('@/components/simulators/FertilizerPlannerAI'));
const PestPredictorAI = dynamic(() => import('@/components/simulators/PestPredictorAI'));
const HarvestSchedulerAI = dynamic(() => import('@/components/simulators/HarvestSchedulerAI'));
const LivestockMonitorAI = dynamic(() => import('@/components/simulators/LivestockMonitorAI'));
const SeedSelectorAI = dynamic(() => import('@/components/simulators/SeedSelectorAI'));
const WeatherCropImpactAI = dynamic(() => import('@/components/simulators/WeatherCropImpactAI'));

const simComponents: Record<string, React.ComponentType> = {
  biosim: BioSimAI,
  materialgen: MaterialGenAI,
  econocast: EconoCastAI,
  medivision: MediVisionAI,
  codearchitect: CodeArchitectAI,
  climatetrace: ClimateTraceAI,
  optifactory: OptiFactoryAI,
  astromap: AstroMapAI,
  neuronet: NeuroNetExplainer,
  quantumchem: QuantumChemAI,
  speechforge: SpeechForgeAI,
  linguanet: LinguaNetAI,
  styletransfer: StyleTransferAI,
  cryptoshield: CryptoShieldAI,
  drugdiscover: DrugDiscoverAI,
  oceanflow: OceanFlowAI,
  structurai: StructurAI,
  audiogen: AudioGenAI,
  signalproc: SignalProcAI,
  mathsolver: MathSolverAI,
  autodrive: AutoDriveAI,
  energygrid: EnergyGridAI,
  logicreason: LogicReasonAI,
  agrisense: AgriSenseAI,
  anomalydetect: AnomalyDetectAI,
  pharmakinetics: PharmaKineticsAI,
  galaxymap: GalaxyMapAI,
  textilesim: TextileSimAI,
  urbanplan: UrbanPlanAI,
  gametheory: GameTheoryAI,
  circuitdesign: CircuitDesignAI,
  thermosim: ThermoSimAI,
  electromagn: ElectroMagAI,
  epidemictrace: EpidemicTraceAI,
  logichain: LogiChainAI,
  emotionai: EmotionAI,
  forensicai: ForensicAI,
  finrisk: FinRiskAI,
  chemreact: ChemReactAI,
  networktopo: NetworkTopoAI,
  // Domestic R&D
  semicon: SemiConAI,
  batterysim: BatterySimAI,
  kculture: KCultureAI,
  demograph: DemoGraphAI,
  shipbuild: ShipBuildAI,
  // Agriculture & Crop Growth
  soilanalyzer: SoilAnalyzerAI,
  cropdoctor: CropDoctorAI,
  irrigationoptimizer: IrrigationOptimizerAI,
  greenhousecontrol: GreenHouseControlAI,
  fertilizerplanner: FertilizerPlannerAI,
  pestpredictor: PestPredictorAI,
  harvestscheduler: HarvestSchedulerAI,
  livestockmonitor: LivestockMonitorAI,
  seedselector: SeedSelectorAI,
  weathercropimpact: WeatherCropImpactAI,
};

export default function SimulatorDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const sim = simulators.find(s => s.id === id);
  const SimComponent = simComponents[id];

  if (!sim || !SimComponent) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>시뮬레이터를 찾을 수 없습니다</h2>
        <Link href="/simulators" className="btn btn-secondary" style={{ marginTop: '20px', display: 'inline-flex' }}>
          ← 시뮬레이터 허브로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="sim-detail-page">
      <div className="sim-detail-header">
        <div className="page-container">
          <Link href="/simulators" className="back-link">← 시뮬레이터 허브</Link>
          <div className="sim-detail-title-row">
            <div className="sim-detail-icon" style={{ background: sim.gradient }}>
              <span>{sim.icon}</span>
            </div>
            <div>
              <h1>{sim.nameKo}</h1>
              <p className="sim-detail-name">{sim.name}</p>
            </div>
            <div className="sim-detail-badges">
              <span className="badge badge-cyan">{sim.category}</span>
              {sim.tags.map(tag => (
                <span key={tag} className="sim-tag">{tag}</span>
              ))}
            </div>
          </div>
          <p className="sim-detail-desc">{sim.description}</p>
        </div>
      </div>
      <div className="page-container">
        <div className="sim-workspace glass-card">
          <SimComponent />
          <DataPanel moduleId={id} moduleType="simulator" />
        </div>
      </div>

      <style jsx>{`
        .sim-detail-page { padding-bottom: var(--space-4xl); }
        .sim-detail-header { background: var(--bg-secondary); border-bottom: 1px solid var(--border-subtle); padding: var(--space-xl) 0 var(--space-2xl); }
        .back-link { display: inline-flex; align-items: center; font-size: 13px; color: var(--text-tertiary); margin-bottom: var(--space-lg); transition: color var(--transition-fast); }
        .back-link:hover { color: var(--accent-cyan); }
        .sim-detail-title-row { display: flex; align-items: center; gap: var(--space-md); flex-wrap: wrap; margin-bottom: var(--space-sm); }
        .sim-detail-icon { width: 56px; height: 56px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 28px; flex-shrink: 0; }
        .sim-detail-title-row h1 { font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
        .sim-detail-name { font-size: 13px; font-family: var(--font-mono); color: var(--text-tertiary); }
        .sim-detail-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-left: auto; }
        .sim-tag { font-size: 11px; padding: 3px 8px; border-radius: var(--radius-full); background: rgba(255,255,255,0.05); color: var(--text-tertiary); }
        .sim-detail-desc { font-size: 15px; color: var(--text-secondary); line-height: 1.6; max-width: 700px; }
        .sim-workspace { margin-top: var(--space-xl); padding: var(--space-xl); min-height: 500px; }
        @media (max-width: 768px) { .sim-detail-badges { margin-left: 0; } }
      `}</style>
    </div>
  );
}
