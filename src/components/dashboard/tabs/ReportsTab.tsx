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
import type { CropMonitorData } from '@/types';

interface Crop {
  id: string;
  name: string;
  culture: string;
  area: string;
  location: string;
  plantingDate: string;
  analyses: Analysis[];
}

interface AnalysisImage {
  src: string;
  title?: string;
  date?: string;
}

interface AnalysisDetails {
  description?: string;
  recommendations?: string[];
}

interface Analysis {
  date: string;
  status: string;
  statusColor: string;
  issue: string;
  confidence: string;
  recommendation: string;
  images?: AnalysisImage[];
  details?: AnalysisDetails;
}

interface ReportsPageProps {
  setSelectedTab: (tab: string) => void;
  CropAndCultureMonitorData: CropMonitorData;
}

export default function ReportsPage({
  setSelectedTab,
  CropAndCultureMonitorData,
}: ReportsPageProps) {
  const crops = CropAndCultureMonitorData.crops as Crop[];

  const [selectedCropId, setSelectedCropId] = useState(
    crops.length > 0 ? crops[0].id : ''
  );

  const selectedCrop =
    crops.find(crop => crop.id === selectedCropId) || ({} as Crop);

  const analysesForSelectedCrop = selectedCrop.analyses || [];

  const [currentAnalysisIndex, setCurrentAnalysisIndex] = useState(0);

  const currentAnalysis =
    analysesForSelectedCrop.length > 0
      ? analysesForSelectedCrop[currentAnalysisIndex]
      : null;

  useEffect(() => {
    setCurrentAnalysisIndex(0);
  }, [selectedCropId]);

  const navigateAnalysis = (direction: 'next' | 'prev') => {
    if (
      direction === 'next' &&
      currentAnalysisIndex < analysesForSelectedCrop.length - 1
    ) {
      setCurrentAnalysisIndex(currentAnalysisIndex + 1);
    } else if (direction === 'prev' && currentAnalysisIndex > 0) {
      setCurrentAnalysisIndex(currentAnalysisIndex - 1);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {crops.length === 0 ? (
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
              asChild
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
              <Select value={selectedCropId} onValueChange={setSelectedCropId}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Selecione uma safra" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map(crop => (
                    <SelectItem key={crop.id} value={crop.id}>
                      {crop.name} ({crop.location})
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
                currentAnalysisIndex === analysesForSelectedCrop.length - 1
              }
            >
              Próxima Análise <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Details of current analysis */}
          {currentAnalysis ? (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">
                      {selectedCrop.name}
                    </CardTitle>
                    <CardDescription>
                      Análise realizada em {currentAnalysis.date}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-betia-lightGreen text-betia-green"
                    >
                      {selectedCrop.culture}
                    </Badge>
                    <Badge variant="outline">{selectedCrop.area}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-lg mb-4">
                      Informações da Cultura
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Cultura:</span>
                        <span className="font-medium">
                          {selectedCrop.culture}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Área:</span>
                        <span className="font-medium">{selectedCrop.area}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">
                          Localização:
                        </span>
                        <span className="font-medium">
                          {selectedCrop.location}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">
                          Data da Análise:
                        </span>
                        <span className="font-medium">
                          {currentAnalysis.date}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">
                          Data de Plantio:
                        </span>
                        <span className="font-medium">
                          {selectedCrop.plantingDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-4">
                      Resultado da Análise
                    </h3>
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
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-6">
              <CardContent className="p-8 text-center">
                <h2 className="text-xl font-medium mb-2">
                  Nenhuma análise disponível
                </h2>
                <p className="text-muted-foreground mb-4">
                  Não há análises disponíveis para a safra selecionada.
                </p>
              </CardContent>
            </Card>
          )}

          {currentAnalysis && (
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Detalhes da Análise</TabsTrigger>
                <TabsTrigger value="history">Histórico da Cultura</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Análise Detalhada</CardTitle>
                      <CardDescription>
                        Informações técnicas sobre o diagnóstico
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-2">
                            Descrição do Problema
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {currentAnalysis.details?.description ||
                              'Descrição detalhada não disponível.'}
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-2">
                            Recomendações Técnicas
                          </h3>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            {currentAnalysis.details?.recommendations ? (
                              currentAnalysis.details.recommendations.map(
                                (rec, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2"
                                  >
                                    <span className="bg-betia-green text-white rounded-full p-1 mt-0.5">
                                      <Check className="h-3 w-3" />
                                    </span>
                                    <span>{rec}</span>
                                  </li>
                                )
                              )
                            ) : (
                              <li className="flex items-start gap-2">
                                <span className="bg-betia-green text-white rounded-full p-1 mt-0.5">
                                  <Check className="h-3 w-3" />
                                </span>
                                <span>
                                  Recomendações detalhadas não disponíveis.
                                </span>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Análises</CardTitle>
                    <CardDescription>
                      Análises anteriores desta cultura
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysesForSelectedCrop.map((analysis, idx) => (
                        <div
                          key={idx}
                          className="flex items-start p-4 border rounded-lg"
                        >
                          <div className="mr-4 mt-1">
                            <FileText className="h-6 w-6 text-betia-green" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-medium">
                                  {analysis.issue}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {selectedCrop.name}
                                </p>
                                <div className="mt-2">
                                  <span
                                    className={`px-2 py-1 text-xs rounded-full bg-${analysis.statusColor}-500 text-slate-800`}
                                  >
                                    {analysis.status}
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-col items-center">
                                <span className="text-sm text-muted-foreground">
                                  {analysis.date}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setCurrentAnalysisIndex(idx)}
                                >
                                  Ver detalhes
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {analysesForSelectedCrop.length === 0 && (
                        <div className="text-center p-4">
                          <p className="text-muted-foreground">
                            Nenhum histórico disponível.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  {analysesForSelectedCrop.length > 0 && (
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Ver histórico completo
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
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
