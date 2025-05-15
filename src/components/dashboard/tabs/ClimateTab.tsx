import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Cloud,
  CloudRain,
  CloudSun,
  Sun,
  Leaf,
  AlertTriangle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
/* types */
import type { Crop, CultureForecast } from '@/types';

interface ClimateTabProps {
  crops: Crop[];
  setSelectedTab: (tab: string) => void;
  forecastsByCulture: CultureForecast;
}

export default function ClimateTab({
  crops,
  setSelectedTab,
  forecastsByCulture,
}: ClimateTabProps) {
  // const crops = [];
  const [selectedCrop, setSelectedCrop] = useState('');

  // Atualiza a safra selecionada quando a lista de crops muda
  useEffect(() => {
    if (crops.length > 0 && !selectedCrop) {
      setSelectedCrop(crops[0].id);
    }
  }, [crops, selectedCrop]);

  /* função para mapear os icons e renderizar eles */
  const iconMapping: { [key: string]: JSX.Element } = {
    sun: <Sun className="h-8 w-8 text-yellow-500" />,
    cloudSun: <CloudSun className="h-8 w-8 text-yellow-500" />,
    cloud: <Cloud className="h-8 w-8 text-gray-500" />,
    cloudRain: <CloudRain className="h-8 w-8 text-blue-500" />,
  };

  const renderIcon = (iconName: string) => {
    return iconMapping[iconName] || null;
  };

  // Encontrar a safra selecionada
  const safraAtual = crops.find(s => s.id === selectedCrop);

  // Se não houver crops cadastradas ou safra selecionada
  if (!safraAtual) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-betia-green">
            Previsão Climática
          </h1>
          <p className="text-muted-foreground">
            Acompanhe as condições climáticas para suas culturas
          </p>
        </div>

        <Card>
          <CardContent className="p-12 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">
              Nenhuma safra cadastrada
            </h2>
            <p className="text-muted-foreground mb-6">
              Para visualizar previsões climáticas, você precisa cadastrar pelo
              menos uma crop.
            </p>
            <Button
              className="bg-betia-green hover:bg-betia-green/90"
              onClick={() => setSelectedTab('culturas')}
            >
              Cadastrar Safra
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Obter previsões com base na cultura da safra selecionada
  const forecasts =
    forecastsByCulture[safraAtual.id] || forecastsByCulture.default;

  // console.log(safraAtual);
  // console.log(forecasts);
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-betia-green">
            Previsão Climática
          </h1>
          <p className="text-muted-foreground">
            Acompanhe as condições climáticas para suas culturas
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
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
        </div>
      </div>

      {/* Informações da safra selecionada */}
      <Card className="mb-6">
        <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center gap-3">
            <div className="bg-betia-green/10 p-2 rounded-full">
              <Leaf className="h-6 w-6 text-betia-green" />
            </div>
            <div>
              <h3 className="font-medium">{safraAtual.name}</h3>
              <p className="text-sm text-muted-foreground">
                {safraAtual.location}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
            <Badge
              variant="outline"
              className="bg-betia-lightGreen text-betia-green"
            >
              {safraAtual.culture}
            </Badge>
            <Badge variant="outline">{safraAtual.area}</Badge>
            <Badge variant="outline">Plantio: {safraAtual.plantingDate}</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="7dias">
        <TabsList className="mb-4">
          <TabsTrigger value="hoje">Hoje</TabsTrigger>
          <TabsTrigger value="7dias">7 Dias</TabsTrigger>
          <TabsTrigger value="15dias">15 Dias</TabsTrigger>
          <TabsTrigger value="mensal">Mensal</TabsTrigger>
        </TabsList>

        <TabsContent value="hoje">
          <Card>
            <CardHeader>
              <CardTitle>Previsão para Hoje</CardTitle>
              <CardDescription>
                {safraAtual.location}, 01/05/2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex flex-col items-center mb-4 md:mb-0">
                  {renderIcon(forecasts.today.icon)}
                  <p className="text-4xl font-bold mt-2">
                    {forecasts.today.temperature}
                  </p>
                  <p className="text-lg">{forecasts.today.condition}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Mínima</p>
                    <p className="text-xl font-medium">{forecasts.today.min}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Máxima</p>
                    <p className="text-xl font-medium">{forecasts.today.max}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Umidade</p>
                    <p className="text-xl font-medium">
                      {forecasts.today.humidity}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Vento</p>
                    <p className="text-xl font-medium">
                      {forecasts.today.wind}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Horários do Dia</h3>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                  {[6, 9, 12, 15, 18, 21, 0, 3].map(hora => (
                    <div key={hora} className="text-center">
                      <p className="text-sm">{`${hora}:00`}</p>
                      {hora >= 6 && hora < 18 ? (
                        <Sun className="h-6 w-6 mx-auto my-2 text-yellow-500" />
                      ) : (
                        <Cloud className="h-6 w-6 mx-auto my-2 text-gray-400" />
                      )}
                      <p className="text-sm font-medium">
                        {hora >= 9 && hora < 18 ? '30°C' : '24°C'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="7dias">
          <Card>
            <CardHeader>
              <CardTitle>Previsão para 7 Dias</CardTitle>
              <CardDescription>
                {safraAtual.location}, 01/05/2024 - 07/05/2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                {forecasts.sevenDays.map((day, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 border rounded-lg"
                  >
                    <p className="font-medium">{day.day}</p>
                    <p className="text-sm text-muted-foreground">{day.date}</p>
                    <div className="my-4">{renderIcon(day.icon)}</div>
                    <p className="font-medium">{day.max}</p>
                    <p className="text-sm text-muted-foreground">{day.min}</p>
                    <div className="mt-2 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {day.precipitation}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>
                Alertas Climáticos para {safraAtual.culture}
              </CardTitle>
              <CardDescription>
                Alertas importantes para o período e impactos na cultura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forecasts.alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-yellow-50"
                  >
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <CloudRain className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-yellow-800">
                          {alert.type}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {alert.date}
                        </p>
                        <p className="mt-1">{alert.description}</p>
                        <div className="mt-2 p-2 bg-yellow-100 rounded-md">
                          <p className="text-sm font-medium text-yellow-800">
                            Impacto na cultura:
                          </p>
                          <p className="text-sm text-yellow-800">
                            {alert.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="15dias">
          <Card>
            <CardHeader>
              <CardTitle>Previsão para 15 Dias</CardTitle>
              <CardDescription>
                Tendência climática para as próximas duas semanas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center py-12">
                <p className="text-muted-foreground">
                  Disponível apenas para assinantes do plano Premium
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mensal">
          <Card>
            <CardHeader>
              <CardTitle>Previsão Mensal</CardTitle>
              <CardDescription>
                Tendência climática para o próximo mês
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center py-12">
                <p className="text-muted-foreground">
                  Disponível apenas para assinantes do plano Premium
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
