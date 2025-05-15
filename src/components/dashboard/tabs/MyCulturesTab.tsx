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
import { PlusCircle, FileText, Trash2, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MyCulturesTabProps {
  crops: any[];
  addCrop: (crop: any) => void;
  removeCrop: (cropId: string) => void;
}

const MyCulturesTab = ({ crops, addCrop, removeCrop }: MyCulturesTabProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  // Estado para o formulário
  const [newCrop, setNewCrop] = useState({
    name: '',
    culture: '',
    plantingDate: '',
    area: '',
    location: '',
  });

  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewCrop(prev => ({ ...prev, [id]: value }));
  };

  const handlecultureChange = (value: string) => {
    setNewCrop(prev => ({ ...prev, culture: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addCrop({
      id: Date.now().toString(),
      ...newCrop,
      status: 'Em desenvolvimento',
    });

    setNewCrop({
      name: '',
      culture: '',
      plantingDate: '',
      area: '',
      location: '',
    });

    setDialogOpen(false);
  };

  // Função para analisar uma safra com IA
  const handleAnalyzeWithAI = async (safraId: string) => {
    try {
      console.log('Analisando safra com IA...', safraId);
      // Resetar estados anteriores
      setAnalysisResult(null);
      setAnalysisError(null);
      setIsAnalyzing(safraId);

      // Encontrar a safra pelo ID
      const safraToAnalyze = crops.find(s => s.id === safraId);

      if (!safraToAnalyze) {
        throw new Error('Safra não encontrada');
      }

      // Exemplo de chamada à API - substitua pela URL real da sua API
      const response = await fetch('/api/analyze-crop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          safraId: safraId,
          culture: safraToAnalyze.culture,
          location: safraToAnalyze.location,
          plantingDate: safraToAnalyze.plantingDate,
          area: safraToAnalyze.area,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResult(data);

      // Exibir resultado em um toast ou modal
      alert(
        `Análise concluída para ${safraToAnalyze.name}. Status: ${
          data.status || 'Concluído'
        }`
      );
    } catch (error) {
      console.error('Erro ao analisar safra:', error);
      setAnalysisError(
        error instanceof Error ? error.message : 'Erro desconhecido'
      );
      alert('Erro ao realizar análise. Por favor, tente novamente.');
    } finally {
      setIsAnalyzing(null);
    }
  };

  /* função para ver analises */
  const handleViewReviews = (safraId: string) => {
    console.log('Visualizando reviews para safra:', safraId);
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
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    name
                  </Label>
                  <Input
                    id="name"
                    placeholder="name da safra"
                    className="col-span-3"
                    value={newCrop.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="culture" className="text-right">
                    culture
                  </Label>
                  <div className="col-span-3">
                    <Select
                      value={newCrop.culture}
                      onValueChange={handlecultureChange}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a culture" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Soja">Soja</SelectItem>
                        <SelectItem value="Milho">Milho</SelectItem>
                        <SelectItem value="Algodão">Algodão</SelectItem>
                        <SelectItem value="Café">Café</SelectItem>
                        <SelectItem value="Trigo">Trigo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plantingDate" className="text-right">
                    Data de Plantio
                  </Label>
                  <Input
                    id="plantingDate"
                    type="date"
                    className="col-span-3"
                    value={newCrop.plantingDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="area" className="text-right">
                    Área (ha)
                  </Label>
                  <Input
                    id="area"
                    type="text"
                    placeholder="0.0"
                    className="col-span-3"
                    value={newCrop.area}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Localização
                  </Label>
                  <Input
                    id="location"
                    placeholder="name da fazenda/área"
                    className="col-span-3"
                    value={newCrop.location}
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
        {crops.map(crop => (
          <Card key={crop.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">{crop.name}</h2>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      {crop.culture} | {crop.plantingDate}
                    </p>
                    <p>{crop.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  >
                    Análise Pendente
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 hover:bg-green-100"
                  >
                    {crop.status}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  className="bg-betia-green hover:bg-betia-green/90"
                  onClick={() => handleAnalyzeWithAI(crop.id)}
                  disabled={isAnalyzing === crop.id}
                >
                  {isAnalyzing === crop.id ? (
                    <>Analisando...</>
                  ) : (
                    <>
                      <Leaf className="mr-2 h-4 w-4" /> Analisar com IA
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleViewReviews(crop.id)}
                >
                  <FileText className="mr-2 h-4 w-4" /> Ver Análises
                </Button>
                {analysisResult && analysisResult.safraId === crop.id && (
                  <div className="mt-2 text-sm text-green-600">
                    Última análise: {new Date().toLocaleString()} -{' '}
                    {analysisResult.status || 'Concluída'}
                  </div>
                )}
                {analysisError && isAnalyzing === crop.id && (
                  <div className="mt-2 text-sm text-red-600">
                    Erro: {analysisError}
                  </div>
                )}
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => removeCrop(crop.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Excluir Safra
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {crops.length === 0 && (
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground">Nenhuma safra cadastrada.</p>
            <p className="text-muted-foreground mt-2">
              Clique em "Cadastrar Nova Safra" para começar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCulturesTab;
