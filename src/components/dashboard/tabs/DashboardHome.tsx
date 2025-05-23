import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf } from 'lucide-react';
/* types */
import type { Diagnostic, UserData, Harvest } from '@/types';

interface DashboardHomeProps {
  setSelectedTab: (tab: string) => void;
  latestDiagnostics: Diagnostic[];
  userData: UserData | null;
  harvests: Harvest[];
}

export default function DashboardHome({
  setSelectedTab,
  latestDiagnostics,
  userData,
  harvests,
}: DashboardHomeProps) {
  function handleViewDetails(id: number) {
    console.log('View Details ID:', id);
  }

  function handleDiagnosis(id: number) {
    console.log('Diagnosis ID:', id);
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Olá, {userData?.name}</h1>
          <p className="text-muted-foreground">Bem-vindo ao seu dashboard</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button
            className="bg-betia-green hover:bg-betia-green/90"
            onClick={() => setSelectedTab('culturas')}
            size="sm"
          >
            <Leaf className="h-4 w-4 mr-2" />
            Cadastrar Nova Safra
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Culturas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{harvests?.length || 0}</div>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Diagnósticos Realizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+5 na última semana</p>
          </CardContent>
        </Card> */}
      </div>

      <Tabs defaultValue="culturas">
        <TabsList className="mb-4  overflow-x-scroll md:overflow-hidden">
          <TabsTrigger value="culturas">Minhas Culturas</TabsTrigger>
          {/* <TabsTrigger value="diagnosticos">Últimos Diagnósticos</TabsTrigger> */}
        </TabsList>

        <TabsContent value="culturas">
          <Card>
            <CardHeader>
              <CardTitle>Culturas Ativas</CardTitle>
              <CardDescription>
                Visão geral das suas culturas em andamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              {harvests?.length > 0 ? (
                <div className="space-y-4">
                  {harvests.map(harvest => (
                    <div
                      key={harvest.id}
                      className="flex flex-col gap-y-4 md:flex-row justify-between items-center p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{harvest.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Plantio: {harvest.culture_type}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(harvest.id)}
                        >
                          Ver Detalhes
                        </Button>

                        <Button
                          className="bg-betia-green hover:bg-betia-green/90"
                          size="sm"
                          onClick={() => handleDiagnosis(harvest.id)}
                        >
                          Diagnóstico
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Nenhuma cultura cadastrada.
                  </p>
                  <Button
                    className="bg-betia-green hover:bg-betia-green/90"
                    asChild
                    onClick={() => setSelectedTab('culturas')}
                  >
                    Cadastrar Nova Cultura
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="diagnosticos">
          <Card>
            <CardHeader>
              <CardTitle>Diagnósticos Recentes</CardTitle>
              <CardDescription>Últimos diagnósticos realizados</CardDescription>
            </CardHeader>
            <CardContent>
              {latestDiagnostics.length > 0 ? (
                <div className="space-y-4">
                  {latestDiagnostics.slice(0, 3).map((diagnostic, index) => {
                    return (
                      <div
                        key={diagnostic.id}
                        className="flex justify-between items-center p-4 border rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium">
                            Diagnóstico de {diagnostic.issue}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {diagnostic.name} • {diagnostic.date}
                          </p>
                        </div>
                        <div>
                          <span
                            className={`px-2 py-1 bg-${diagnostic.color}-100 text-${diagnostic.color}-800 rounded-full text-xs`}
                          >
                            {diagnostic.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Nenhum diagnóstico disponível. Cadastre uma cultura
                    primeiro.
                  </p>
                  <Button
                    className="bg-betia-green hover:bg-betia-green/90"
                    asChild
                    onClick={() => setSelectedTab('culturas')}
                  >
                    Cadastrar Nova Cultura
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
