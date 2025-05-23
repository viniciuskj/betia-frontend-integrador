import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  FileText,
  ArrowLeft,
  ArrowRight,
  Leaf,
  Check,
} from 'lucide-react';

/* types */
interface Harvest {
  id: number;
  user_id: number;
  title: string;
  culture_type: string;
  latitude: number;
  longitude: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  // Propriedades opcionais para análises (caso existam)
  analyses?: Analysis[];
}

interface Analysis {
  id: string;
  date: string;
  issue: string;
  confidence: string;
  status: string;
  statusColor: string;
  recommendation: string;
  details?: {
    description?: string;
    recommendations?: string[];
  };
}

interface ReportsPageProps {
  setSelectedTab: (tab: string) => void;
  harvests: Harvest[];
}

export default function ReportsPage({
  setSelectedTab,
  harvests,
}: ReportsPageProps) {
  const [selectedHarvestId, setSelectedHarvestId] = useState<string>(
    harvests.length > 0 ? harvests[0].id.toString() : ''
  );

  const selectedHarvest = harvests.find(
    harvest => harvest.id.toString() === selectedHarvestId
  );

  const analysesForSelectedHarvest = selectedHarvest?.analyses || [];

  const [currentAnalysisIndex, setCurrentAnalysisIndex] = useState(0);

  const currentAnalysis =
    analysesForSelectedHarvest.length > 0
      ? analysesForSelectedHarvest[currentAnalysisIndex]
      : null;

  useEffect(() => {
    setCurrentAnalysisIndex(0);
  }, [selectedHarvestId]);

  // Função para formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Função para calcular área aproximada (placeholder - você pode implementar a lógica real)
  const calculateArea = (harvest: Harvest) => {
    // Implementar cálculo real baseado nas coordenadas se necessário
    return '10 hectares'; // Placeholder
  };

  const navigateAnalysis = (direction: 'next' | 'prev') => {
    if (
      direction === 'next' &&
      currentAnalysisIndex < analysesForSelectedHarvest.length - 1
    ) {
      setCurrentAnalysisIndex(currentAnalysisIndex + 1);
    } else if (direction === 'prev' && currentAnalysisIndex > 0) {
      setCurrentAnalysisIndex(currentAnalysisIndex - 1);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {harvests.length === 0 ? (
        <Card className="mt-8">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-medium mb-2">
              Nenhuma safra cadastrada
            </h2>
            <p className="text-muted-foreground mb-4">
              Para visualizar relatórios, você precisa cadastrar pelo menos uma
              safra.{' '}
            </p>
            <Button
              className="bg-betia-green hover:bg-betia-green/90"
              onClick={() => setSelectedTab('culturas')}
            >
              Cadastrar Cultura
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-betia-green">
                Relatórios de Análise
              </h1>
              <p className="text-muted-foreground">
                Detalhes completos das análises realizadas em suas culturas
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-4">
              <Select
                value={selectedHarvestId}
                onValueChange={setSelectedHarvestId}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Selecione uma safra" />
                </SelectTrigger>
                <SelectContent>
                  {harvests.map(harvest => (
                    <SelectItem key={harvest.id} value={harvest.id.toString()}>
                      {harvest.title} - {harvest.culture_type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Exportar Relatório
              </Button>
            </div>
          </div>

          {/* Navigation between analyses */}
          {analysesForSelectedHarvest.length > 0 && (
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="outline"
                onClick={() => navigateAnalysis('prev')}
                disabled={currentAnalysisIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Análise Anterior
              </Button>
              {currentAnalysis && (
                <Badge
                  className={`bg-${currentAnalysis.statusColor}-500 text-slate-800 px-3 py-1 text-sm`}
                >
                  {currentAnalysis.status}
                </Badge>
              )}
              <Button
                variant="outline"
                onClick={() => navigateAnalysis('next')}
                disabled={
                  currentAnalysisIndex === analysesForSelectedHarvest.length - 1
                }
              >
                Próxima Análise <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Details of current analysis */}
          {selectedHarvest && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">
                      {selectedHarvest.title}
                    </CardTitle>
                    <CardDescription>
                      {currentAnalysis
                        ? `Análise realizada em ${currentAnalysis.date}`
                        : `Safra criada em ${formatDate(
                            selectedHarvest.created_at
                          )}`}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-betia-lightGreen text-betia-green"
                    >
                      {selectedHarvest.culture_type}
                    </Badge>
                    <Badge variant="outline">
                      {calculateArea(selectedHarvest)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-lg mb-4">
                      Informações da Safra
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Cultura:</span>
                        <span className="font-medium">
                          {selectedHarvest.culture_type}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Área:</span>
                        <span className="font-medium">
                          {calculateArea(selectedHarvest)}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">
                          Coordenadas:
                        </span>
                        <span className="font-medium">
                          {selectedHarvest.latitude},{' '}
                          {selectedHarvest.longitude}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">
                          Data de Início:
                        </span>
                        <span className="font-medium">
                          {formatDate(selectedHarvest.start_date)}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">
                          Data de Término:
                        </span>
                        <span className="font-medium">
                          {formatDate(selectedHarvest.end_date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-4">
                      {currentAnalysis
                        ? 'Resultado da Análise'
                        : 'Status da Safra'}
                    </h3>
                    {currentAnalysis ? (
                      <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">
                            Diagnóstico:
                          </span>
                          <span className="font-medium">
                            {currentAnalysis.issue}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">
                            Confiança:
                          </span>
                          <span className="font-medium">
                            {currentAnalysis.confidence}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge className={`bg-slate-100 text-slate-800`}>
                            {currentAnalysis.status}
                          </Badge>
                        </div>
                        <div className="pt-2">
                          <span className="text-muted-foreground block mb-2">
                            Recomendação:
                          </span>
                          <p className="text-sm bg-muted p-3 rounded-md">
                            {currentAnalysis.recommendation}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge className="bg-slate-100 text-slate-800">
                            Ativa
                          </Badge>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">
                            Análises Realizadas:
                          </span>
                          <span className="font-medium">
                            {analysesForSelectedHarvest.length}
                          </span>
                        </div>
                        <div className="pt-2">
                          <span className="text-muted-foreground block mb-2">
                            Observações:
                          </span>
                          <p className="text-sm bg-muted p-3 rounded-md">
                            {analysesForSelectedHarvest.length === 0
                              ? 'Nenhuma análise foi realizada ainda para esta safra.'
                              : `${analysesForSelectedHarvest.length} análise(s) disponível(is) para visualização.`}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!currentAnalysis &&
            selectedHarvest &&
            analysesForSelectedHarvest.length === 0 && (
              <Card className="mb-6">
                <CardContent className="p-8 text-center">
                  <h2 className="text-xl font-medium mb-2">
                    Nenhuma análise disponível
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Não há análises disponíveis para a safra selecionada.
                  </p>
                  <Button
                    className="bg-betia-green hover:bg-betia-green/90"
                    onClick={() => setSelectedTab('diagnostico')}
                  >
                    <Leaf className="mr-2 h-4 w-4" /> Realizar Nova Análise
                  </Button>
                </CardContent>
              </Card>
            )}

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => setSelectedTab('culturas')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Culturas
            </Button>
            <Button
              className="bg-betia-green hover:bg-betia-green/90"
              onClick={() => setSelectedTab('diagnostico')}
            >
              <Leaf className="mr-2 h-4 w-4" /> Nova Análise
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
