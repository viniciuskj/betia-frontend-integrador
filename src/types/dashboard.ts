// Tipo da safra
export type Crop = {
  id: string;
  name: string;
  culture: string;
  location: string;
  area: string;
  plantingDate: string;
  status: string;
};

/* Status types */
export type StatusType = 'Normal' | 'Warning' | 'Critical';

// Status colors
export type StatusColor = 'green' | 'yellow' | 'red' | 'gray' | 'blue';

/* previsão climática types */
export type WeatherIcon = 'sun' | 'cloud' | 'cloudSun' | 'cloudRain';

interface DailyForecast {
  temperature: string;
  precipitation: string;
  condition: string;
  icon: WeatherIcon;
  min: string;
  max: string;
  humidity: string;
  wind: string;
}

interface SevenDayForecast {
  day: string; // 'Seg', 'Ter', etc
  date: string; // '01/05'
  icon: WeatherIcon;
  max: string;
  min: string;
  precipitation: string;
}

interface WeatherAlert {
  type: string;
  date: string;
  description: string;
  impact: string;
  icon: WeatherIcon;
}

export type CultureForecast = {
  [culture: string]: {
    today: DailyForecast;
    sevenDays: SevenDayForecast[];
    alerts: WeatherAlert[];
  };
};

/* Analises types relatorios completos e detalhados aqui é de folhas fotos etc..*/
export type Analysis = {
  id: number;
  title: string;
  date: string; // formato 'DD/MM/YYYY'
  culture: string;
  cropId: string;
  location: string;
  status: string; // nome da doença ou problema detectado
  statusColor: StatusColor;
  confidence: string; // exemplo: '87%'
  image: string;
};

export type Treatment = {
  date: string;
  action: string;
  result?: string;
};

/* Nova forma de analises aqui vai ser um único item que retorna ja a safra e todas as suas analises */
/* detalhes da doença */
type DiseaseDetails = {
  severity: string;
  affectedArea: string;
  diseaseStage: string;
  favorableConditions: string;
};

export type AnalysisDetails = {
  id: number;
  title: string;
  date: string;
  culture: string;
  cropId: string;
  location: string;
  status: string;
  statusColor: string;
  confidence: string;
  image: string;
  diseaseDetails?: DiseaseDetails;
  recommendations?: string[];
  diseaseIdentified?: string | null;
  diseaseProbability?: string;
  recommendedActions?: string[];
  affectedArea: string; // ex: '15%'
  aiNotes?: string;
  additionalImages?: { url: string; description: string }[];
  treatmentHistory?: Treatment[];
};

export type AnalysisItem = {
  id: string;
  date: string;
  title: string;
  location: string;
  type: string;
  status: string;
  statusColor: StatusColor;
  confidence: string;
  image?: string;
  details?: AnalysisDetails;
};

export type CropWithAnalyses = {
  id: string;
  name: string;
  analyses: AnalysisItem[];
};

/* diagnosticos types depois de enviar uma analise ela vai retornar um dianostico */
export interface Diagnostic {
  id: string;
  name: string;
  issue: string; // problema identificado
  status: StatusType;
  color: StatusColor;
  date: string;
}

/* Report types - Para a página de relatórios e relatorios que vai vir da API esses relatorios são o geral sobre uma safra especifica*/

/* analise de uma colheita crop */
export interface AnalysisCrop {
  id: string;
  cropId: string;
  date: string;
  status: StatusType;
  issue: string;
  confidence: string;
  recommendation: string;
  images: string[];
  detailedDescription: string;
  technicalRecommendations: string[];
}

/* na mesma sessão de relatorios ele tem uma parte que mostra os últimos 7 dias de previsão do tempo dessa safra e também o historico de últimas analises */

export interface AnalysisHistoryItem {
  id: string;
  cropId: string;
  date: string;
  type: string;
  status: StatusType;
}

/* analise de colheita */
interface AnalysisImage {
  src: string;
  title?: string;
  date?: string;
}

export interface AnalysisCropData {
  safraID: string;
  date: string;
  issue: string;
  status: StatusType;
  statusColor: StatusColor;
  confidence: string;
  recommendation: string;
  details: {
    description: string;
    recommendations: string[];
  };
  images: AnalysisImage[];
}

/*
  para o reports tab
*/
export interface CropMonitorData {
  crops: CropMonitor[];
}

export interface CropMonitor {
  id: string;
  name: string;
  culture: string;
  location: string;
  area: string;
  plantingDate: string;
  status: string;
  analyses: CropAnalysis[];
}

export interface CropAnalysis {
  id: string;
  safraID: string;
  date: string;
  issue: string;
  confidence: string;
  status: StatusType;
  statusColor: StatusColor;
  recommendation: string;
  images: AnalysisImage[];
  details: {
    description: string;
    recommendations: string[];
  };
}
