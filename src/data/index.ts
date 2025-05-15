import type {
  Crop,
  CultureForecast,
  Analysis,
  AnalysisDetails,
  Diagnostic,
  AnalysisCropData,
  CropWithAnalyses,
  CropMonitorData,
} from '../types';

/* plantações iniciais exemplo */
export const initialCrops: Crop[] = [
  {
    id: 'soja-2024',
    name: 'Soja Verão 2024',
    culture: 'Soja',
    location: 'Fazenda São João - MT',
    area: '15 ha',
    plantingDate: '14/01/2024',
    status: 'Em desenvolvimento',
  },
  {
    id: 'milho-safrinha',
    name: 'Milho Safrinha',
    culture: 'Milho',
    location: 'Área 2 - MT',
    area: '20 ha',
    plantingDate: '30/11/2023',
    status: 'Em desenvolvimento',
  },
  {
    id: 'algodao-2024',
    name: 'Algodão 2024',
    culture: 'Algodão',
    location: 'Fazenda Central - MT',
    area: '10 ha',
    plantingDate: '08/02/2024',
    status: 'Em desenvolvimento',
  },
];

/*
previsão pela cultura
temperatures por cultura exemplo 
*/
export const forecastByCultureData: CultureForecast = {
  'soja-2024': {
    today: {
      temperature: '32°C',
      condition: 'Ensolarado',
      icon: 'sun',
      min: '22°C',
      max: '32°C',
      humidity: '45%',
      wind: '12 km/h',
      precipitation: '120%',
    },
    sevenDays: [
      {
        day: 'Seg',
        date: '01/05',
        icon: 'sun',
        max: '32°C',
        min: '22°C',
        precipitation: '0%',
      },
      {
        day: 'Ter',
        date: '02/05',
        icon: 'cloudSun',
        max: '30°C',
        min: '21°C',
        precipitation: '10%',
      },
      {
        day: 'Qua',
        date: '03/05',
        icon: 'cloud',
        max: '28°C',
        min: '20°C',
        precipitation: '30%',
      },
      {
        day: 'Qui',
        date: '04/05',
        icon: 'cloudRain',
        max: '26°C',
        min: '19°C',
        precipitation: '80%',
      },
      {
        day: 'Sex',
        date: '05/05',
        icon: 'cloudRain',
        max: '25°C',
        min: '18°C',
        precipitation: '90%',
      },
      {
        day: 'Sáb',
        date: '06/05',
        icon: 'cloudSun',
        max: '27°C',
        min: '19°C',
        precipitation: '20%',
      },
      {
        day: 'Dom',
        date: '07/05',
        icon: 'sun',
        max: '29°C',
        min: '20°C',
        precipitation: '5%',
      },
    ],
    alerts: [
      {
        type: 'Chuva Intensa',
        date: '04/05/2024',
        description:
          'Previsão de chuvas intensas com possibilidade de alagamentos.',
        impact:
          'Pode afetar o desenvolvimento da soja. Verifique a drenagem da área.',
        icon: 'cloudRain',
      },
      {
        type: 'Seca',
        date: '15/05/2024 - 30/05/2024',
        description:
          'Período prolongado sem chuvas previsto para a segunda quinzena de maio.',
        impact:
          'Monitorar a umidade do solo para evitar estresse hídrico na cultura.',
        icon: 'sun',
      },
    ],
  },
  'milho-safrinha': {
    today: {
      temperature: '29°C',
      condition: 'Parcialmente Nublado',
      icon: 'cloudSun',
      min: '20°C',
      max: '29°C',
      humidity: '60%',
      wind: '15 km/h',
      precipitation: '2%',
    },
    sevenDays: [
      {
        day: 'Seg',
        date: '01/05',
        icon: 'cloudSun',
        max: '29°C',
        min: '20°C',
        precipitation: '15%',
      },
      {
        day: 'Ter',
        date: '02/05',
        icon: 'cloud',
        max: '27°C',
        min: '19°C',
        precipitation: '30%',
      },
      {
        day: 'Qua',
        date: '03/05',
        icon: 'cloudRain',
        max: '25°C',
        min: '18°C',
        precipitation: '70%',
      },
      {
        day: 'Qui',
        date: '04/05',
        icon: 'cloudRain',
        max: '24°C',
        min: '18°C',
        precipitation: '90%',
      },
      {
        day: 'Sex',
        date: '05/05',
        icon: 'cloudRain',
        max: '23°C',
        min: '17°C',
        precipitation: '85%',
      },
      {
        day: 'Sáb',
        date: '06/05',
        icon: 'cloud',
        max: '25°C',
        min: '18°C',
        precipitation: '40%',
      },
      {
        day: 'Dom',
        date: '07/05',
        icon: 'cloudSun',
        max: '27°C',
        min: '19°C',
        precipitation: '20%',
      },
    ],
    alerts: [
      {
        type: 'Chuva Intensa',
        date: '03/05/2024 - 05/05/2024',
        description: 'Previsão de chuvas intensas por três dias consecutivos.',
        impact:
          'Risco de encharcamento do solo. Verifique o sistema de drenagem da área de milho.',
        icon: 'cloudRain',
      },
      {
        type: 'Ventos Fortes',
        date: '04/05/2024',
        description: 'Rajadas de vento de até 60 km/h previstas para o dia.',
        impact:
          'Risco de acamamento do milho. Monitore a cultura após o evento.',
        icon: 'cloudSun',
      },
    ],
  },
  'algodao-2024': {
    today: {
      temperature: '34°C',
      condition: 'Ensolarado',
      icon: 'sun',
      min: '24°C',
      max: '34°C',
      humidity: '40%',
      wind: '8 km/h',
      precipitation: '33%',
    },
    sevenDays: [
      {
        day: 'Seg',
        date: '01/05',
        icon: 'sun',
        max: '34°C',
        min: '24°C',
        precipitation: '0%',
      },
      {
        day: 'Ter',
        date: '02/05',
        icon: 'sun',
        max: '33°C',
        min: '23°C',
        precipitation: '5%',
      },
      {
        day: 'Qua',
        date: '03/05',
        icon: 'cloudSun',
        max: '32°C',
        min: '22°C',
        precipitation: '10%',
      },
      {
        day: 'Qui',
        date: '04/05',
        icon: 'cloudSun',
        max: '31°C',
        min: '22°C',
        precipitation: '20%',
      },
      {
        day: 'Sex',
        date: '05/05',
        icon: 'cloud',
        max: '30°C',
        min: '21°C',
        precipitation: '30%',
      },
      {
        day: 'Sáb',
        date: '06/05',
        icon: 'cloudSun',
        max: '31°C',
        min: '22°C',
        precipitation: '15%',
      },
      {
        day: 'Dom',
        date: '07/05',
        icon: 'sun',
        max: '33°C',
        min: '23°C',
        precipitation: '5%',
      },
    ],
    alerts: [
      {
        type: 'Onda de Calor',
        date: '01/05/2024 - 07/05/2024',
        description: 'temperatures acima da média durante toda a semana.',
        impact:
          'Aumento da demanda hídrica do algodão. Considere irrigação suplementar se disponível.',
        icon: 'sun',
      },
      {
        type: 'Baixa Umidade',
        date: '03/05/2024 - 05/05/2024',
        description:
          'Umidade relativa do ar abaixo de 30% durante o período da tarde.',
        impact:
          'Condições favoráveis para pragas como o ácaro-rajado. Intensifique o monitoramento.',
        icon: 'sun',
      },
    ],
  },

  // Previsões padrão para outras culturas
  default: {
    today: {
      temperature: '300°C',
      condition: 'Parcialmente Nublado',
      icon: 'cloudSun',
      min: '21°C',
      max: '30°C',
      humidity: '55%',
      wind: '10 km/h',
      precipitation: '6%',
    },
    sevenDays: [
      {
        day: 'Seg',
        date: '01/05',
        icon: 'cloudSun',
        max: '30°C',
        min: '21°C',
        precipitation: '10%',
      },
      {
        day: 'Ter',
        date: '02/05',
        icon: 'cloudSun',
        max: '29°C',
        min: '20°C',
        precipitation: '15%',
      },
      {
        day: 'Qua',
        date: '03/05',
        icon: 'cloud',
        max: '28°C',
        min: '20°C',
        precipitation: '25%',
      },
      {
        day: 'Qui',
        date: '04/05',
        icon: 'cloud',
        max: '27°C',
        min: '19°C',
        precipitation: '30%',
      },
      {
        day: 'Sex',
        date: '05/05',
        icon: 'cloudRain',
        max: '26°C',
        min: '19°C',
        precipitation: '60%',
      },
      {
        day: 'Sáb',
        date: '06/05',
        icon: 'cloudRain',
        max: '25°C',
        min: '18°C',
        precipitation: '70%',
      },
      {
        day: 'Dom',
        date: '07/05',
        icon: 'cloudSun',
        max: '27°C',
        min: '19°C',
        precipitation: '20%',
      },
    ],
    alerts: [
      {
        type: 'Variação de temperature',
        date: '01/05/2024 - 07/05/2024',
        description:
          'Variações significativas de temperature ao longo da semana.',
        impact: 'Monitore a cultura para possíveis estresses térmicos.',
        icon: 'sun',
      },
    ],
  },
};

/* analises parte das analises */
export const analysesData: Analysis[] = [
  {
    id: 1,
    title: 'Análise de Folha de Soja',
    date: '20/04/2024',
    culture: 'Soja Verão 2024',
    cropId: 'soja-2024',
    location: 'Fazenda São João',
    status: 'Ferrugem Asiática',
    statusColor: 'yellow',
    confidence: '87%',
    image: 'images/single-plant-leaf.png',
  },
  {
    id: 2,
    title: 'Análise de Espiga de Milho',
    date: '15/04/2024',
    culture: 'Milho Safrinha',
    cropId: 'milho-safrinha',
    location: 'Área 2',
    status: 'Lagarta do Cartucho',
    statusColor: 'red',
    confidence: '92%',
    image: 'images/field-of-ripe-corn.png',
  },
];

/* analises detalhadas pode ser utilizada como historico */
export const selectedAnalysisDetailsData: AnalysisDetails[] = [
  {
    id: 1,
    title: 'Análise de Folha de Soja',
    date: '20/04/2024',
    culture: 'Soja Verão 2024',
    cropId: 'soja-2024',
    location: 'Fazenda São João',
    status: 'Ferrugem Asiática',
    statusColor: 'yellow',
    confidence: '87%',
    image: 'images/single-plant-leaf.png',
    diseaseDetails: {
      severity: 'Média',
      affectedArea: '15%',
      diseaseStage: 'Inicial',
      favorableConditions: 'Alta umidade e temperaturas entre 15-28°C',
    },
    diseaseIdentified: 'Phakopsora pachyrhizi',
    diseaseProbability: '87%',
    aiNotes:
      'Os padrões visuais indicam presença precoce de ferrugem com expansão limitada. Reação moderada da planta observada.',
    recommendations: [
      'Aplicação de fungicida triazol + estrobilurina em toda a área afetada.',
      'Monitoramento a cada 5 dias para verificar a eficácia do tratamento.',
      'Considerar uma segunda aplicação após 14 dias, dependendo da evolução.',
    ],
    treatmentHistory: [
      {
        date: '21/04/2024',
        action: 'Aplicação de fungicida triazol + estrobilurina',
        result: 'Redução dos sintomas em 60% da área afetada',
      },
      {
        date: '05/05/2024',
        action: 'Segunda aplicação preventiva',
        result: 'Doença controlada, sem expansão observada',
      },
    ],
    affectedArea: '15%',
    additionalImages: [
      {
        url: 'images/leaf-closeup-1.png',
        description: 'Detalhe da lesão na folha com presença de esporos',
      },
      {
        url: 'images/leaf-comparison.png',
        description: 'Comparação entre folha saudável e afetada',
      },
    ],
  },
  {
    id: 2,
    title: 'Análise de Espiga de Milho',
    date: '20/04/2024',
    culture: 'Milho Safrinha 2024',
    cropId: 'milho-2024',
    location: 'Fazenda São João',
    status: 'Mancha Branca',
    statusColor: 'orange',
    confidence: '75%',
    image: 'images/corn-ear-analysis.png',
    diseaseDetails: {
      severity: 'Alta',
      affectedArea: '30%',
      diseaseStage: 'Intermediário',
      favorableConditions: 'Alta umidade e temperaturas elevadas',
    },
    diseaseIdentified: 'Phaeosphaeria maydis',
    diseaseProbability: '75%',
    aiNotes:
      'Lesões necróticas com bordas claras sugerem estágio avançado da mancha branca. Controle imediato necessário.',
    recommendations: [
      'Aplicação imediata de fungicida sistêmico de amplo espectro.',
      'Evitar irrigação excessiva durante o tratamento.',
      'Realizar avaliação em 7 dias para revisar progresso.',
    ],
    treatmentHistory: [
      {
        date: '22/04/2024',
        action: 'Aplicação de fungicida sistêmico',
        result: 'Melhora parcial observada após 7 dias',
      },
    ],
    affectedArea: '30%',
    additionalImages: [
      {
        url: 'images/corn-disease-zoom.png',
        description: 'Lesões visíveis na espiga de milho',
      },
    ],
  },
];

/* dianostico dados exemplo */
export const diagnosticsData: Diagnostic[] = [
  {
    id: '1',
    name: 'Milho Safrinha',
    issue: 'Ferrugem',
    status: 'Warning',
    color: 'yellow',
    date: '10/05/2025',
  },
  {
    id: '2',
    name: 'Soja',
    issue: 'Pragas',
    status: 'Critical',
    color: 'red',
    date: '05/05/2025',
  },
  {
    id: '3',
    name: 'Trigo',
    issue: 'Nutrientes',
    status: 'Normal',
    color: 'green',
    date: '01/05/2025',
  },
];

/* DADOS AREA RELATORIOS */
/* isso daqui seria uma analise de uma colheita inteira */
export const analysesCropData: AnalysisCropData[] = [
  {
    safraID: 'soja-2024',
    date: '04/05/2024',
    issue: 'Asian Rust',
    status: 'Warning',
    statusColor: 'yellow',
    confidence: '87%',
    recommendation:
      'Apply specific fungicide. Constant monitoring of the affected area.',
    details: {
      description:
        'A ferrugem asiática é uma doença fúngica causada pelo patógeno Phakopsora pachyrhizi. Lesões foram identificadas nas folhas com pequenas pústulas na superfície inferior, típicas da doença. A severidade atual é média, com aproximadamente 15% da área foliar afetada.',
      recommendations: [
        'Aplicação de fungicida triazol + estrobilurina em toda a área afetada.',
        'Monitoramento a cada 5 dias para verificar a eficácia do tratamento.',
        'Considerar uma segunda aplicação após 14 dias, dependendo da evolução.',
      ],
    },
    images: [
      {
        src: 'images/field-of-ripe-corn.png',
        title: 'Image 1',
        date: '04/05/2024',
      },
      {
        src: 'images/field-of-ripe-corn.png',
        title: 'Image 2',
        date: '04/05/2024',
      },
      {
        src: 'images/field-of-ripe-corn.png',
        title: 'Image 3',
        date: '04/05/2024',
      },
    ],
  },
  {
    safraID: 'soja-2024',
    date: '04/05/2024',
    issue: 'Jacares azuis',
    status: 'Warning',
    statusColor: 'green',
    confidence: '87%',
    recommendation:
      'Apply specific fungicide. Constant monitoring of the affected area.',
    details: {
      description:
        'A ferrugem asiática é uma doença fúngica causada pelo patógeno Phakopsora pachyrhizi. Lesões foram identificadas nas folhas com pequenas pústulas na superfície inferior, típicas da doença. A severidade atual é média, com aproximadamente 15% da área foliar afetada.',
      recommendations: [
        'Aplicação de fungicida triazol + estrobilurina em toda a área afetada.',
        'Monitoramento a cada 5 dias para verificar a eficácia do tratamento.',
        'Considerar uma segunda aplicação após 14 dias, dependendo da evolução.',
      ],
    },
    images: [
      {
        src: 'images/field-of-ripe-corn.png',
        title: 'Image 1',
        date: '04/05/2024',
      },
      {
        src: 'images/field-of-ripe-corn.png',
        title: 'Image 2',
        date: '04/05/2024',
      },
      {
        src: 'images/field-of-ripe-corn.png',
        title: 'Image 3',
        date: '04/05/2024',
      },
    ],
  },
  {
    safraID: 'milho-safrinha',
    date: '10/04/2024',
    issue: 'Armyworm',
    status: 'Critical',
    statusColor: 'red',
    confidence: '92%',
    recommendation:
      'Immediate application of insecticide. Daily monitoring of infestation.',
    details: {
      description:
        'Foi identificada uma infestação grave de Spodoptera frugiperda (lagarta-do-cartucho) nas plantas analisadas. As lagartas alimentam-se do verticilo das plantas, causando danos significativos que podem comprometer a produtividade. Estima-se que cerca de 30% das plantas sejam afetadas.',
      recommendations: [
        'Aplicação imediata de inseticida específico para controle de lagartas.',
        'Monitoramento diário da infestação nos próximos 7 dias.',
        'Considerar o uso de agentes de controle biológico como complemento.',
      ],
    },
    images: [
      {
        src: 'images/single-plant-leaf.png',
        title: 'Image 1',
        date: '10/04/2024',
      },
      {
        src: 'images/single-plant-leaf.png',
        title: 'Image 2',
        date: '10/04/2024',
      },
    ],
  },
  {
    safraID: 'algodao-2024',
    date: '18/05/2024',
    issue: 'Boll Weevil',
    status: 'Critical',
    statusColor: 'red',
    confidence: '89%',
    recommendation:
      'Immediate application of insecticides and pheromone traps installation.',
    details: {
      description:
        'Foi detectada uma infestação de Anthonomus grandis (bicudo do algodoeiro) na cultura. Os insetos estão atacando botões florais e capulhos, com danos visíveis em aproximadamente 25% das plantas. Esta praga pode causar graves perdas de produtividade se não for controlada prontamente.',
      recommendations: [
        'Aplicação de inseticidas piretroides em toda a área afetada.',
        'Instalação de armadilhas com feromônio para monitoramento contínuo.',
        'Eliminação de soqueiras e restos culturais para reduzir focos de infestação.',
        'Rotação de modos de ação de inseticidas para evitar resistência.',
      ],
    },
    images: [
      {
        src: 'images/single-plant-leaf.png',
        title: 'Image 1 - Damaged bolls23',
        date: '18/05/2024',
      },
      {
        src: 'images/single-plant-leaf.png',
        title: 'Image 2 - Adult weevil',
        date: '18/05/2024',
      },
      {
        src: 'images/single-plant-leaf.png',
        title: 'Image 3 - Field overview',
        date: '18/05/2024',
      },
      {
        src: 'images/single-plant-leaf.png',
        title: 'Image 4 - Close-up damage',
        date: '18/05/2024',
      },
    ],
  },
];

/* as fazendas com seus relatorios particulares */

/* safras com suas culturas e analises das culturas + analise geral
   da safra como sensor se está boa ou não
*/
export const cropsWithAnalyses: CropWithAnalyses[] = [
  {
    id: 'crop-001',
    name: 'Soja',
    analyses: [
      {
        id: 'analysis-001',
        date: '12/05/2025',
        title: 'Análise foliar - Soja',
        location: 'Talhão 3 - Fazenda São João',
        type: 'Foliar',
        status: 'Saudável',
        statusColor: 'green',
        confidence: '95%',
        image: 'images/single-plant-leaf.png',
        details: {
          diseaseIdentified: null,
          diseaseProbability: '5%',
          recommendedActions: [
            'Manter rotina de irrigação atual',
            'Monitorar condições climáticas',
          ],
          affectedArea: '10%',
          aiNotes:
            'A cultura apresenta desenvolvimento normal, com coloração adequada das folhas e sem sinais de deficiências nutricionais ou estresse hídrico.',
          additionalImages: [
            {
              url: '/images/soja-leaf-closeup-1.jpg',
              description: 'Close da folha saudável',
            },
          ],
        },
      },
      {
        id: 'analysis-002',
        date: '05/05/2025',
        title: 'Verificação de pragas',
        location: 'Talhão 2 - Fazenda São João',
        type: 'Pragas',
        status: 'Atenção',
        statusColor: 'yellow',
        confidence: '87%',
        image: 'images/single-plant-leaf.png',
        details: {
          diseaseIdentified: 'Percevejo marrom',
          diseaseProbability: '65%',
          recommendedActions: [
            'Aplicação de controle biológico',
            'Monitoramento intensificado nos próximos 7 dias',
          ],
          affectedArea: '15%',
          aiNotes:
            'Foram detectados sinais iniciais de infestação por percevejos. Recomenda-se intervenção preventiva para evitar danos à lavoura.',
          additionalImages: [
            {
              url: '/images/bug-closeup-1.jpg',
              description: 'Percevejo identificado na amostra',
            },
            {
              url: '/images/damaged-leaf-1.jpg',
              description: 'Folha com danos iniciais',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'crop-002',
    name: 'Milho',
    analyses: [
      {
        id: 'analysis-003',
        date: '10/05/2025',
        title: 'Análise de doença foliar',
        location: 'Talhão 5 - Fazenda São João',
        type: 'Doença',
        status: 'Crítico',
        statusColor: 'red',
        confidence: '92%',
        image: 'images/single-plant-leaf.png',
        details: {
          diseaseIdentified: 'Ferrugem comum',
          diseaseProbability: '92%',
          recommendedActions: [
            'Aplicação imediata de fungicida específico',
            'Isolamento da área afetada',
            'Reavaliação em 48 horas',
          ],
          affectedArea: '99%',
          aiNotes:
            'Identificado estágio inicial de ferrugem comum no milho. É necessária intervenção imediata para evitar propagação.',
          additionalImages: [
            {
              url: '/images/corn-rust-closeup.jpg',
              description: 'Close da ferrugem na folha',
            },
            {
              url: '/images/affected-corn-area.jpg',
              description: 'Área afetada na plantação',
            },
          ],
        },
      },
      {
        id: 'analysis-004',
        date: '03/05/2025',
        title: 'Monitoramento nutricional',
        location: 'Talhão 4 - Fazenda São João',
        type: 'Nutrientes',
        status: 'Normal',
        statusColor: 'green',
        confidence: '89%',
        image: 'images/single-plant-leaf.png',
        details: {
          diseaseIdentified: null,
          diseaseProbability: '3%',
          recommendedActions: [
            'Manutenção da adubação atual',
            'Novo teste em 10 dias',
          ],
          affectedArea: '25%',
          aiNotes:
            'Níveis nutricionais dentro dos padrões esperados. Nenhum sinal de deficiência encontrado.',
          additionalImages: [
            {
              url: '/images/corn-leaf-closeup.jpg',
              description: 'Folha com coloração ideal',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'crop-003',
    name: 'Algodão',
    analyses: [
      {
        id: 'analysis-005',
        date: '11/05/2025',
        title: 'Detecção de manchas',
        location: 'Talhão 1 - Fazenda São João',
        type: 'Foliar',
        status: 'Atenção',
        statusColor: 'yellow',
        confidence: '78%',
        image: 'images/single-plant-leaf.png',
        details: {
          diseaseIdentified: 'Mancha angular',
          diseaseProbability: '55%',
          recommendedActions: [
            'Avaliação complementar com laboratório',
            'Acompanhamento semanal',
          ],
          affectedArea: '33%',
          aiNotes:
            'Pequenas manchas detectadas em folhas mais novas. Pode indicar estágio inicial de mancha angular.',
          additionalImages: [
            {
              url: '/images/algodao-leaf-spot.jpg',
              description: 'Folha com suspeita de mancha angular',
            },
          ],
        },
      },
      {
        id: 'analysis-006',
        date: '07/05/2025',
        title: 'Verificação pós-chuva',
        location: 'Talhão 6 - Fazenda São João',
        type: 'Foliar',
        status: 'Saudável',
        statusColor: 'green',
        confidence: '90%',
        image: 'images/single-plant-leaf.png',
        details: {
          diseaseIdentified: null,
          diseaseProbability: '4%',
          recommendedActions: [
            'Nenhuma intervenção necessária',
            'Revisar após próxima precipitação',
          ],
          affectedArea: '66%',
          aiNotes:
            'Após chuvas recentes, a lavoura permanece estável e sem sinais de doenças ou estresse hídrico.',
          additionalImages: [],
        },
      },
    ],
  },
];

/* aba reports das safras e das culturas delas tudo geral */
export const CropAndCultureMonitorData: CropMonitorData = {
  crops: [
    {
      id: 'soja-2024',
      name: 'Soja Verão 2024',
      culture: 'Soja',
      location: 'Fazenda São João - MT',
      area: '15 ha',
      plantingDate: '14/01/2024',
      status: 'Em desenvolvimento',
      analyses: [
        {
          id: 'soja-analysis-1',
          safraID: 'soja-2024',
          date: '15/02/2024',
          issue: 'Ferrugem Asiática',
          confidence: '92%',
          status: 'Critical',
          statusColor: 'red',
          recommendation:
            'Aplicação imediata de fungicida triazol + estrobilurina',
          images: [
            {
              src: 'images/single-plant-leaf.png',
              title: 'Folhas com manchas amareladas',
              date: '14/02/2024',
            },
            {
              src: 'images/single-plant-leaf.png',
              title: 'Parte inferior da folha',
              date: '14/02/2024',
            },
          ],
          details: {
            description:
              'Identificamos presença de Phakopsora pachyrhizi (Ferrugem Asiática) em estágio inicial de desenvolvimento, com pústulas características na parte inferior das folhas. A doença está presente em aproximadamente 15% da área monitorada.',
            recommendations: [
              'Aplicação imediata de fungicida com princípio ativo triazol + estrobilurina',
              'Monitorar a área a cada 7 dias após a aplicação',
              'Considerar manejo preventivo nas áreas não afetadas',
            ],
          },
        },
        {
          id: 'soja-analysis-2',
          safraID: 'soja-2024',
          date: '02/03/2024',
          issue: 'Monitoramento após tratamento',
          confidence: '95%',
          status: 'Normal',
          statusColor: 'green',
          recommendation: 'Manter monitoramento preventivo',
          images: [
            {
              src: 'images/single-plant-leaf.png',
              title: 'Folhas recuperadas',
              date: '01/03/2024',
            },
          ],
          details: {
            description:
              'Avaliação após tratamento contra Ferrugem Asiática mostra efetividade da intervenção. Os focos iniciais foram controlados e não há sinais de novas infestações.',
            recommendations: [
              'Manter monitoramento semanal',
              'Aplicação preventiva programada para 15/03/2024',
              'Verificar previsão meteorológica para ajustar manejo',
            ],
          },
        },
      ],
    },
    {
      id: 'milho-safrinha',
      name: 'Milho Safrinha',
      culture: 'Milho',
      location: 'Área 2 - MT',
      area: '20 ha',
      plantingDate: '30/11/2023',
      status: 'Em desenvolvimento',
      analyses: [
        {
          id: 'milho-analysis-1',
          safraID: 'milho-safrinha',
          date: '20/01/2024',
          issue: 'Lagarta do Cartucho',
          confidence: '89%',
          status: 'Warning',
          statusColor: 'yellow',
          recommendation:
            'Aplicação de inseticida específico para controle de Spodoptera frugiperda',
          images: [
            {
              src: 'images/single-plant-leaf.png',
              title: 'Danos foliares iniciais',
              date: '19/01/2024',
            },
            {
              src: 'images/single-plant-leaf.png',
              title: 'Presença de lagartas',
              date: '19/01/2024',
            },
          ],
          details: {
            description:
              'Identificamos a presença de Spodoptera frugiperda (Lagarta do Cartucho) em fase inicial de desenvolvimento. Os danos estão concentrados em aproximadamente 10% da lavoura, principalmente nos bordos da área.',
            recommendations: [
              'Aplicação de inseticida à base de Espinosade ou Metomil',
              'Realizar aplicação no período da tarde para maior eficiência',
              'Monitorar a área 5 dias após a aplicação',
            ],
          },
        },
      ],
    },
    {
      id: 'algodao-2024',
      name: 'Algodão 2024',
      culture: 'Algodão',
      location: 'Fazenda Central - MT',
      area: '10 ha',
      plantingDate: '08/02/2024',
      status: 'Em desenvolvimento',
      analyses: [
        {
          id: 'algodao-analysis-1',
          safraID: 'algodao-2024',
          date: '10/03/2024',
          issue: 'Bicudo do Algodoeiro',
          confidence: '94%',
          status: 'Critical',
          statusColor: 'red',
          recommendation:
            'Aplicação de inseticida específico e instalação de armadilhas',
          images: [
            {
              src: 'images/single-plant-leaf.png',
              title: 'Botões florais danificados',
              date: '09/03/2024',
            },
            {
              src: 'images/single-plant-leaf.png',
              title: 'Presença do inseto adulto',
              date: '09/03/2024',
            },
          ],
          details: {
            description:
              'Detectamos a presença de Anthonomus grandis (Bicudo do Algodoeiro) na fase inicial de florescimento. O nível de infestação está acima do limiar de controle, com aproximadamente 12% de botões florais danificados.',
            recommendations: [
              'Aplicação imediata de inseticida específico para controle do bicudo',
              'Instalação de armadilhas com feromônio nas bordaduras',
              'Monitoramento intensivo a cada 3-4 dias',
              'Considerar destruição antecipada de soqueiras após a colheita',
            ],
          },
        },
        {
          id: 'algodao-analysis-2',
          safraID: 'algodao-2024',
          date: '25/03/2024',
          issue: 'Ramulária',
          confidence: '91%',
          status: 'Warning',
          statusColor: 'yellow',
          recommendation:
            'Aplicação de fungicida específico para manejo da ramulária',
          images: [
            {
              src: 'images/single-plant-leaf.png',
              title: 'Folhas com manchas características',
              date: '24/03/2024',
            },
          ],
          details: {
            description:
              'Identificamos os primeiros sintomas de Ramularia areola (Mancha de Ramulária) nas folhas inferiores da planta. A doença está em estágio inicial, afetando aproximadamente 8% da área cultivada.',
            recommendations: [
              'Aplicação de fungicida à base de estrobirulina + triazol',
              'Monitorar condições climáticas - períodos de maior umidade favorecem a doença',
              'Reavaliar a área 10 dias após a aplicação',
            ],
          },
        },
      ],
    },
  ],
};
