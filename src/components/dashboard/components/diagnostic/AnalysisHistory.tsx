import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
/* types */
import type { CropWithAnalyses } from '@/types/dashboard';

interface AnalysisHistoryProps {
  cropsWithAnalyses: CropWithAnalyses[];
}

const AnalysisHistory = ({ cropsWithAnalyses }: AnalysisHistoryProps) => {
  const [selectedAnalysis, setSelectedAnalysis] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const onViewDetails = (analysis: any) => {
    setSelectedAnalysis(analysis);
    setDetailsModalOpen(true);
  };

  if (cropsWithAnalyses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">Nenhuma análise realizada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {cropsWithAnalyses.map(crop => (
        <div key={crop.id} className="md:space-y-4">
          <h3 className="font-medium text-lg border-b pb-2">{crop.name}</h3>

          {crop.analyses.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">
              Nenhuma análise para esta cultura.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 mt-3">
              {crop.analyses.map(analysis => (
                <div
                  key={analysis.id}
                  className="flex items-start flex-col gap-y-4 md:flex-row p-4 border rounded-lg"
                >
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <img
                        src={analysis.image || '/images/placeholder.svg'}
                        alt={analysis.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{analysis.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        {analysis.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {analysis.location}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs bg-${analysis.statusColor}-100 text-${analysis.statusColor}-800`}
                      >
                        {analysis.status}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Confiança: {analysis.confidence}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Tipo: {analysis.type}
                      </span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetails(analysis)}
                      >
                        <FileText className="mr-2 h-4 w-4" /> Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Modal de Detalhes usando Dialog */}
      {selectedAnalysis && (
        <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedAnalysis.title}</DialogTitle>
              <DialogDescription>
                {selectedAnalysis.crop} - {selectedAnalysis.date}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-video rounded-md overflow-hidden">
                  <img
                    src={selectedAnalysis.image || '/images/placeholder.svg'}
                    alt={selectedAnalysis.title}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="font-medium mt-1">
                    <span
                      className={`px-2 py-1 bg-${selectedAnalysis.statusColor}-100 text-${selectedAnalysis.statusColor}-800 rounded-full text-xs`}
                    >
                      {selectedAnalysis.status}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Confiança</Label>
                  <div className="font-medium mt-1">
                    {selectedAnalysis.confidence}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Localização</Label>
                  <div className="font-medium mt-1">
                    {selectedAnalysis.location}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">
                    Data da Análise
                  </Label>
                  <div className="font-medium mt-1">
                    {selectedAnalysis.date}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Tipo</Label>
                  <div className="font-medium mt-1">
                    {selectedAnalysis.type}
                  </div>
                </div>
              </div>

              {selectedAnalysis.details && (
                <>
                  <div>
                    <Label className="text-muted-foreground">
                      Detalhes da Análise
                    </Label>
                    <div className="p-3 bg-muted rounded-md mt-1 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-medium">
                            Doença Identificada:
                          </span>{' '}
                          {selectedAnalysis.details.diseaseIdentified}
                        </div>
                        <div>
                          <span className="font-medium">
                            Probabilidade de doença:
                          </span>{' '}
                          {selectedAnalysis.details.diseaseProbability}
                        </div>
                        <div>
                          <span className="font-medium">
                            Data do Diagnóstico:
                          </span>{' '}
                          {selectedAnalysis.details.diagnosticDate}
                        </div>
                        <div>
                          <span className="font-medium">Área Afetada:</span>{' '}
                          {selectedAnalysis.details.affectedArea}
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedAnalysis.details.additionalImages &&
                    selectedAnalysis.details.additionalImages.length > 0 && (
                      <div>
                        <Label className="text-muted-foreground">
                          Imagens adicionais
                        </Label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          {selectedAnalysis.details.additionalImages.map(
                            (img, idx) => (
                              <div
                                key={idx}
                                className="rounded-md overflow-hidden"
                              >
                                <div className="h-24">
                                  <img
                                    src={img.url || '/images/placeholder.svg'}
                                    alt={img.description}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {img.description}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  <div>
                    <Label className="text-muted-foreground">Notas da IA</Label>
                    <div className="p-3 bg-muted rounded-md mt-1 text-sm">
                      {selectedAnalysis.details.aiNotes}
                    </div>
                  </div>
                </>
              )}

              {selectedAnalysis.details &&
                selectedAnalysis.details.recommendedActions &&
                selectedAnalysis.details.recommendedActions.length > 0 && (
                  <div>
                    <Label className="text-muted-foreground">
                      Ações Recomendadas
                    </Label>
                    <div className="p-3 bg-muted rounded-md mt-1 text-sm">
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedAnalysis.details.recommendedActions.map(
                          (action, index) => (
                            <li key={index}>{action}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}

              <div>
                <Label className="text-muted-foreground">
                  Histórico de Tratamentos
                </Label>
                <div className="p-3 bg-muted rounded-md mt-1 text-sm text-center">
                  Nenhum tratamento registrado para esta análise.
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDetailsModalOpen(false)}
              >
                Fechar
              </Button>
              <Button className="bg-betia-green hover:bg-betia-green/90">
                Exportar Relatório
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AnalysisHistory;
