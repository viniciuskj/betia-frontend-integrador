import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreditCard, Download, Loader2 } from 'lucide-react';
/* get plans api*/
import getPlans from '@/api/getPlans';
import updateSubscription from '@/api/UpdateSubscription';
/* types */
import type { UserData, PlansData } from '@/types';

interface PlansTabProps {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const planFeatures = [
  {
    feature: 'Análises de diagnóstico',
    free: '1/mês',
    monthly: '10/mês',
    yearly: 'Ilimitado',
  },
  {
    feature: 'Previsão climática',
    free: '7 dias',
    monthly: '15 dias',
    yearly: '30 dias',
  },
  {
    feature: 'Culturas cadastradas',
    free: '3',
    monthly: '10',
    yearly: 'Ilimitado',
  },
  {
    feature: 'Tempo de resposta do suporte',
    free: '48h',
    monthly: '24h',
    yearly: '6h',
  },
  {
    feature: 'Relatórios exportáveis',
    free: '❌',
    monthly: '✅',
    yearly: '✅',
  },
  {
    feature: 'Análises preditivas',
    free: '❌',
    monthly: '❌',
    yearly: '✅',
  },
  {
    feature: 'API para integração',
    free: '❌',
    monthly: '❌',
    yearly: '✅',
  },
];

const paymentMethods = [
  {
    icon: CreditCard,
    name: 'Cartão de Crédito',
  },
  {
    icon: () => (
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
    ),
    name: 'PIX',
  },
  {
    icon: () => (
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
    ),
    name: 'Boleto Bancário',
  },
];

export default function PlansTab({ userData, setUserData }: PlansTabProps) {
  const [plansData, setPlansData] = useState<PlansData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingPlan, setUpdatingPlan] = useState<number | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        const plans = await getPlans();
        setPlansData(plans.data);
      } catch (error) {
        console.error('Erro ao carregar planos:', error);
        setError('Erro ao carregar planos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanUpdate = async (planId: number) => {
    if (isCurrentPlan(planId)) return;

    try {
      setUpdatingPlan(planId);
      const result = await updateSubscription(planId);

      if (result.success) {
        setUserData(prevUserData => {
          if (!prevUserData) return prevUserData;

          return {
            ...prevUserData,
            subscription: {
              ...prevUserData.subscription,
              plan: planId,
            },
          };
        });

        toast.success('Plano alterado com sucesso.');
      } else {
        setError(result.message || 'Erro ao alterar plano');
        toast.error(result.message || 'Erro ao alterar plano');
      }
    } catch (error) {
      console.error('Erro ao alterar plano:', error);
      toast.error('Erro inesperado ao alterar plano');
    } finally {
      setUpdatingPlan(null);
    }
  };

  const isCurrentPlan = (planId: number): boolean => {
    return userData?.subscription?.plan === planId;
  };

  const formatPrice = (price?: number): string => {
    if (!price || price === 0) return 'R$ 0';
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const getButtonText = (plan: PlansData): string => {
    if (isCurrentPlan(plan.id)) {
      return 'Plano Atual';
    }
    if (plan.type === 'free') {
      return 'Downgrade';
    }
    return 'Fazer Upgrade';
  };

  const getPlanTitle = (plan: PlansData): string => {
    switch (plan.type) {
      case 'free':
        return 'Plano Gratuito';
      case 'monthly':
        return 'Plano Essencial';
      case 'yearly':
        return 'Plano Premium';
      default:
        return `Plano ${plan.id}`;
    }
  };

  const getPlanDescription = (plan: PlansData): string => {
    switch (plan.type) {
      case 'free':
        return 'Para pequenos produtores';
      case 'monthly':
        return 'Para produtores em crescimento';
      case 'yearly':
        return 'Para produtores profissionais';
      default:
        return 'Plano personalizado';
    }
  };

  const getDurationText = (plan: PlansData): string => {
    if (plan.type === 'free') {
      return 'Duração ilimitada';
    }
    if (!plan.duration) return '';

    if (plan.duration >= 365) {
      const years = Math.floor(plan.duration / 365);
      return `${years} ano${years > 1 ? 's' : ''}`;
    }
    return `${plan.duration} dias`;
  };

  const getButtonVariant = (plan: PlansData) => {
    if (isCurrentPlan(plan.id)) {
      return 'outline';
    }
    if (plan.type === 'monthly') {
      return 'default';
    }
    return 'outline';
  };

  const getCardClassName = (plan: PlansData): string => {
    const baseClasses = 'flex flex-col';
    if (plan.type === 'monthly') {
      return `${baseClasses} border-betia-green`;
    }
    return baseClasses;
  };

  const retryFetch = () => {
    setError(null);
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const plans = await getPlans();
        setPlansData(plans.data);
      } catch (error) {
        console.error('Erro ao carregar planos:', error);
        setError('Erro ao carregar planos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-betia-green">
            Planos e Assinaturas
          </h1>
          <p className="text-muted-foreground">
            Carregando planos disponíveis...
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="flex flex-col animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardFooter>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-betia-green">
            Planos e Assinaturas
          </h1>
          <p className="text-red-500">{error}</p>
        </div>
        <Button onClick={retryFetch} variant="outline">
          Tentar Novamente
        </Button>
      </div>
    );
  }

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
        {plansData?.map(plan => (
          <Card key={plan.id} className={getCardClassName(plan)}>
            <CardHeader>
              {plan.type === 'monthly' && (
                <div className="px-3 py-1 text-xs bg-betia-green text-white rounded-full w-fit mb-2">
                  Popular
                </div>
              )}
              <CardTitle>{getPlanTitle(plan)}</CardTitle>
              <CardDescription>{getPlanDescription(plan)}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                  {formatPrice(plan.price)}
                </span>
                <span className="text-muted-foreground">
                  {plan.type === 'free'
                    ? ''
                    : plan.type === 'monthly'
                    ? '/mês'
                    : plan.type === 'yearly'
                    ? '/ano'
                    : ''}
                </span>
                {plan.duration && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {getDurationText(plan)}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button
                variant={getButtonVariant(plan)}
                className={`w-full ${
                  plan.type === 'monthly' && !isCurrentPlan(plan.id)
                    ? 'bg-betia-green hover:bg-betia-green/90'
                    : ''
                }`}
                disabled={isCurrentPlan(plan.id) || updatingPlan === plan.id}
                onClick={() => handlePlanUpdate(plan.id)}
              >
                {updatingPlan === plan.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Alterando...
                  </>
                ) : (
                  getButtonText(plan)
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
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
                  {planFeatures.map((feature, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4">{feature.feature}</td>
                      <td className="py-3 px-4 text-center">{feature.free}</td>
                      <td className="py-3 px-4 text-center">
                        {feature.monthly}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {feature.yearly}
                      </td>
                    </tr>
                  ))}
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
              {paymentMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <IconComponent className="h-6 w-6 text-betia-green" />
                    <span>{method.name}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
