import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, CreditCard, Download } from 'lucide-react';
/* get plans */

export default function PlansTab() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-betia-green">
          Planos e Assinaturas
        </h1>
        <p className="text-muted-foreground">
          Escolha o plano ideal para suas necessidades e maximize o potencial da
          sua produção
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Plano Gratuito */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Plano Gratuito</CardTitle>
            <CardDescription>Para pequenos produtores</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">R$ 0</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>1 análise por mês</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>Previsão climática básica (7 dias)</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>Suporte por e-mail</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>Até 3 culturas cadastradas</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Plano Atual
            </Button>
          </CardFooter>
        </Card>

        {/* Plano Essencial */}
        <Card className="flex flex-col border-betia-green">
          <CardHeader>
            <div className="px-3 py-1 text-xs bg-betia-green text-white rounded-full w-fit mb-2">
              Popular
            </div>
            <CardTitle>Plano Essencial</CardTitle>
            <CardDescription>Para produtores em crescimento</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">R$ 97</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>10 análises por mês</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>Previsão climática detalhada (15 dias)</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>Suporte prioritário</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>Até 10 culturas cadastradas</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>Relatórios básicos exportáveis</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-betia-green hover:bg-betia-green/90">
              Fazer Upgrade
            </Button>
          </CardFooter>
        </Card>

        {/* Plano Premium */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Plano Premium</CardTitle>
            <CardDescription>Para produtores profissionais</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">R$ 197</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>Análises ilimitadas</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>Previsão climática avançada (30 dias)</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>Suporte VIP com atendimento em até 6h</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>Culturas ilimitadas</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>Relatórios avançados e análises preditivas</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-betia-green shrink-0" />
                <span>API para integração com outros sistemas</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Fazer Upgrade</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Comparativo de Planos</CardTitle>
            <CardDescription>
              Veja detalhadamente o que cada plano oferece
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Recurso</th>
                    <th className="py-3 px-4 text-center">Gratuito</th>
                    <th className="py-3 px-4 text-center">Essencial</th>
                    <th className="py-3 px-4 text-center">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Análises de diagnóstico</td>
                    <td className="py-3 px-4 text-center">1/mês</td>
                    <td className="py-3 px-4 text-center">10/mês</td>
                    <td className="py-3 px-4 text-center">Ilimitado</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Previsão climática</td>
                    <td className="py-3 px-4 text-center">7 dias</td>
                    <td className="py-3 px-4 text-center">15 dias</td>
                    <td className="py-3 px-4 text-center">30 dias</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Culturas cadastradas</td>
                    <td className="py-3 px-4 text-center">3</td>
                    <td className="py-3 px-4 text-center">10</td>
                    <td className="py-3 px-4 text-center">Ilimitado</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Tempo de resposta do suporte</td>
                    <td className="py-3 px-4 text-center">48h</td>
                    <td className="py-3 px-4 text-center">24h</td>
                    <td className="py-3 px-4 text-center">6h</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Relatórios exportáveis</td>
                    <td className="py-3 px-4 text-center">❌</td>
                    <td className="py-3 px-4 text-center">✅</td>
                    <td className="py-3 px-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Análises preditivas</td>
                    <td className="py-3 px-4 text-center">❌</td>
                    <td className="py-3 px-4 text-center">❌</td>
                    <td className="py-3 px-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">API para integração</td>
                    <td className="py-3 px-4 text-center">❌</td>
                    <td className="py-3 px-4 text-center">❌</td>
                    <td className="py-3 px-4 text-center">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" /> Baixar tabela comparativa
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Formas de Pagamento</CardTitle>
            <CardDescription>
              Aceitamos diversas formas de pagamento para sua conveniência
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-betia-green" />
                <span>Cartão de Crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-6 w-6 text-betia-green"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L10.1213 5.87868L16.2426 12L10.1213 18.1213L12 20L20 12L12 4Z"
                    fill="currentColor"
                  />
                  <path
                    d="M4 12L12 4L10.1213 2.12132L2.12132 10.1213L4 12Z"
                    fill="currentColor"
                  />
                  <path
                    d="M2.12132 13.8787L10.1213 21.8787L12 20L4 12L2.12132 13.8787Z"
                    fill="currentColor"
                  />
                </svg>
                <span>PIX</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-6 w-6 text-betia-green"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="12"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M7 15H13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Boleto Bancário</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
