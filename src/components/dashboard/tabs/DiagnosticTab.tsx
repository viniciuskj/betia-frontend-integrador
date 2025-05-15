import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
/* types */
import type {
  Crop,
  AnalysisDetails,
  Analysis,
  CropWithAnalyses,
} from '@/types';
/* components tabs */
import NewAnalysis from '../components/diagnostic/NewAnalysis';
import AnalysisHistory from '../components/diagnostic/AnalysisHistory';

interface DiagnosticTabProps {
  crops: Crop[];
  analysesData: Analysis[];
  selectedAnalysisDetailsData: AnalysisDetails[];
  setSelectedTab: (tab: string) => void;
  cropsWithAnalyses: CropWithAnalyses[];
}

function DiagnosticTab({
  crops,
  analysesData,
  selectedAnalysisDetailsData,
  setSelectedTab,
  cropsWithAnalyses,
}: DiagnosticTabProps) {
  // States
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [analyses, setAnalyses] = useState<Analysis[]>(analysesData);
  const [selectedAnalysisDetails, setSelectedAnalysisDetails] =
    useState<AnalysisDetails>(selectedAnalysisDetailsData);

  useEffect(() => {}, [detailsModalOpen]);

  // Function to find the most common status in analyses
  const getMostCommonStatus = analysesList => {
    if (analysesList.length === 0) return 'N/A';

    const statusCount = {};
    analysesList.forEach(analysis => {
      statusCount[analysis.status] = (statusCount[analysis.status] || 0) + 1;
    });

    let mostCommonStatus = '';
    let maxCount = 0;

    Object.entries(statusCount).forEach(([status, count]) => {
      if (count > maxCount) {
        mostCommonStatus = status;
        maxCount = count;
      }
    });

    return mostCommonStatus;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-betia-green">
            Diagnóstico de Doenças com IA
          </h1>
          <p className="text-muted-foreground">
            Envie imagens da sua plantação e receba um diagnóstico automático
            com recomendações de tratamento
          </p>
        </div>
      </div>

      <Tabs defaultValue="nova-analise">
        <TabsList className="mb-4">
          <TabsTrigger value="nova-analise">Nova Análise</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="relatorio-safra">Relatório por Safra</TabsTrigger>
        </TabsList>

        <TabsContent value="nova-analise">
          <Card>
            <CardHeader>
              <CardTitle>Nova Análise</CardTitle>
              <CardDescription>
                Envie uma imagem clara da planta para análise
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewAnalysis crops={crops} setSelectedTab={setSelectedTab} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Análises</CardTitle>
              <CardDescription>
                Consulte suas análises anteriores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnalysisHistory cropsWithAnalyses={cropsWithAnalyses} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorio-safra">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Consolidado por Safra</CardTitle>
              <CardDescription>
                Visualize todas as análises agrupadas por safra
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!crops || crops.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Nenhuma safra cadastrada.
                  </p>
                  <Button
                    className="bg-betia-green hover:bg-betia-green/90"
                    asChild
                  >
                    <a href="/dashboard/culturas">Cadastrar Nova Cultura</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {crops
                    .map(crop => {
                      const cropAnalyses = analyses.filter(
                        a => a.cropId === crop.id
                      );

                      if (cropAnalyses.length === 0) return null;

                      return (
                        <div key={crop.id} className="border rounded-lg p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">{crop.name}</h3>
                            <Badge
                              variant="outline"
                              className="bg-betia-lightGreen text-betia-green"
                            >
                              {crop.culture}
                            </Badge>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm text-muted-foreground">
                              Localização: {crop.location}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Área: {crop.area}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Data de Plantio: {crop.plantingDate}
                            </p>
                          </div>

                          <div className="mb-6">
                            <h4 className="font-medium mb-2">
                              Resumo das Análises
                            </h4>
                            <div className="grid  grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div className="p-3 bg-muted rounded-md">
                                <p className="font-medium">Total de Análises</p>
                                <p className="text-2xl font-bold">
                                  {cropAnalyses.length}
                                </p>
                              </div>
                              <div className="p-3 bg-muted rounded-md">
                                <p className="font-medium">Última Análise</p>
                                <p>{cropAnalyses[0]?.date || 'N/A'}</p>
                              </div>
                              <div className="p-3 bg-muted rounded-md">
                                <p className="font-medium">
                                  Status Predominante
                                </p>
                                <p>{getMostCommonStatus(cropAnalyses)}</p>
                              </div>
                            </div>
                          </div>

                          <h4 className="font-medium mb-2">
                            Imagens Analisadas
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {cropAnalyses.slice(0, 8).map(analysis => (
                              <div
                                key={analysis.id}
                                className="relative aspect-square rounded-md overflow-hidden border"
                              >
                                <img
                                  src={
                                    analysis.image ||
                                    'images/placeholder.svg?height=300&width=300&query=plant'
                                  }
                                  alt={analysis.title}
                                  className="object-cover h-full"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                                  {analysis.date}
                                </div>
                              </div>
                            ))}
                            {cropAnalyses.length > 8 && (
                              <div className="relative aspect-square rounded-md overflow-hidden border flex items-center justify-center bg-muted">
                                <p className="text-lg font-medium">
                                  +{cropAnalyses.length - 8}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-end">
                            <Button className="bg-betia-green hover:bg-betia-green/90">
                              Ver Relatório Completo
                            </Button>
                          </div>
                        </div>
                      );
                    })
                    .filter(Boolean)}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DiagnosticTab;
