
import React from 'react';
import ConsultingIcon from './icons/ConsultingIcon';
import DataAnalysisIcon from './icons/DataAnalysisIcon';
import MachineLearningIcon from './icons/MachineLearningIcon';
import ChatbotIcon from './icons/ChatbotIcon';
import NlpIcon from './icons/NlpIcon';
import VisionIcon from './icons/VisionIcon';
import PredictiveIcon from './icons/PredictiveIcon';
import GenerativeAiIcon from './icons/GenerativeAiIcon';
import ReinforcementIcon from './icons/ReinforcementIcon';
import SpeechIcon from './icons/SpeechIcon';
import AnomalyIcon from './icons/AnomalyIcon';
import RecommenderIcon from './icons/RecommenderIcon';

interface IconRendererProps {
  iconName: string;
  className?: string;
}

const IconRenderer: React.FC<IconRendererProps> = ({ iconName, className }) => {
  const getIcon = () => {
    switch (iconName) {
      case 'consulting': return <ConsultingIcon />;
      case 'data-analysis': return <DataAnalysisIcon />;
      case 'machine-learning': return <MachineLearningIcon />;
      case 'chatbot': return <ChatbotIcon />;
      case 'nlp': return <NlpIcon />;
      case 'vision': return <VisionIcon />;
      case 'predictive': return <PredictiveIcon />;
      case 'generative-ai': return <GenerativeAiIcon />;
      case 'reinforcement': return <ReinforcementIcon />;
      case 'speech': return <SpeechIcon />;
      case 'anomaly': return <AnomalyIcon />;
      case 'recommender': return <RecommenderIcon />;
      default: return null;
    }
  };

  return <div className={className}>{getIcon()}</div>;
};

export default IconRenderer;
