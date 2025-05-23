import type React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Trash2, Leaf } from 'lucide-react';
import type { Harvest } from '@/types';
import { formatDate } from '@/utils/formatDate';

interface MyCulturesTabProps {
  addCrop: (crop: any) => void;
  handleDeleteHarvest: (cropId: number) => void;
  harvests: Harvest[];
}

const MyCulturesTab = ({
  harvests,
  addCrop,
  handleDeleteHarvest,
}: MyCulturesTabProps) => {
  // console.log('SOU EU ', harvests);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: '',
    culture: '',
    plantingDate: '',
  });

  const [isAnalyzing, setIsAnalyzing] = useState<number | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewCrop(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cropData = {
      id: Date.now().toString(),
      ...newCrop,
      status: 'Em desenvolvimento',
    };

    addCrop(cropData);
    console.log('Nova safra cadastrada:', cropData);

    setNewCrop({
      name: '',
      culture: '',
      plantingDate: '',
    });

    setDialogOpen(false);
  };

  const handleAnalyzeWithAI = async (safraId: number) => {
    try {
      console.log('Analisando safra com IA...', safraId);
      setAnalysisResult(null);
      setAnalysisError(null);
      setIsAnalyzing(safraId);
    } catch (error) {
      console.error('Erro ao analisar safra:', error);
      setAnalysisError(
        error instanceof Error ? error.message : 'Erro desconhecido'
      );
      alert('Erro ao realizar análise. Por favor, tente novamente.');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-betia-green">Minhas Safras</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-betia-green hover:bg-betia-green/90">
              <PlusCircle className="mr-2 h-4 w-4" /> Cadastrar Nova Safra
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Cadastrar Nova Safra</DialogTitle>
                <DialogDescription>
                  Preencha os dados abaixo para cadastrar uma nova safra no
                  sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    placeholder="Nome da safra"
                    value={newCrop.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="culture">Cultura</Label>
                  <Input
                    id="culture"
                    placeholder="Nome da cultura"
                    value={newCrop.culture}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="plantingDate">Data de Plantio</Label>
                  <Input
                    id="plantingDate"
                    type="date"
                    value={newCrop.plantingDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-betia-green hover:bg-betia-green/90"
                >
                  Cadastrar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {harvests?.map(harvest => (
          <Card key={harvest.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">{harvest.title}</h2>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      {harvest.culture_type} | {formatDate(harvest.created_at)}
                    </p>
                    <p>Localização aqui</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  className="bg-betia-green hover:bg-betia-green/90"
                  onClick={() => handleAnalyzeWithAI(harvest.id)}
                  disabled={isAnalyzing === harvest.id}
                >
                  {isAnalyzing === harvest.id ? (
                    <>Analisando...</>
                  ) : (
                    <>
                      <Leaf className="mr-2 h-4 w-4" /> Analisar com IA
                    </>
                  )}
                </Button>
                {analysisResult && analysisResult.safraId === harvest.id && (
                  <div className="mt-2 text-sm text-green-600">
                    Última análise: {new Date().toLocaleString()} -{' '}
                    {analysisResult.status || 'Concluída'}
                  </div>
                )}
                {analysisError && isAnalyzing === harvest.id && (
                  <div className="mt-2 text-sm text-red-600">
                    Erro: {analysisError}
                  </div>
                )}
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteHarvest(harvest.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Excluir Safra
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {harvests?.length === 0 ||
          (harvests === null && (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground">Nenhuma safra cadastrada.</p>
              <p className="text-muted-foreground mt-2">
                Clique em "Cadastrar Nova Safra" para começar.
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyCulturesTab;
