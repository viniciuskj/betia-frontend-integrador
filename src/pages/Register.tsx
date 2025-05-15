import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Dados do formulário da etapa 1
  const [formDataStep1, setFormDataStep1] = useState({
    name: '',
    email: '',
    tipoConta: '',
    tipoProducao: '',
    terms: false,
  });

  // Erros do formulário da etapa 1
  const [errorsStep1, setErrorsStep1] = useState({
    name: '',
    email: '',
    tipoConta: '',
    tipoProducao: '',
    terms: '',
  });

  // Dados do formulário da etapa 2
  const [formDataStep2, setFormDataStep2] = useState({
    password: '',
    confirmPassword: '',
  });

  // Erros do formulário da etapa 2
  const [errorsStep2, setErrorsStep2] = useState({
    password: '',
    confirmPassword: '',
  });

  // Manipuladores de alteração dos formulários
  const handleChangeStep1 = e => {
    const { name, value, type, checked } = e.target;
    setFormDataStep1({
      ...formDataStep1,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleChangeStep2 = e => {
    const { name, value } = e.target;
    setFormDataStep2({
      ...formDataStep2,
      [name]: value,
    });
  };

  // Manipulador de alteração para Select
  const handleSelectChange = (name, value) => {
    setFormDataStep1({
      ...formDataStep1,
      [name]: value,
    });
  };

  // Manipulador de alteração para Checkbox
  const handleCheckboxChange = checked => {
    setFormDataStep1({
      ...formDataStep1,
      terms: checked,
    });
  };

  // Validação da etapa 1
  const validateStep1 = () => {
    const errors = {
      name: '',
      email: '',
      tipoConta: '',
      tipoProducao: '',
      terms: '',
    };
    let isValid = true;

    // Validação do nome
    if (!formDataStep1.name) {
      errors.name = 'Nome é obrigatório';
      isValid = false;
    } else if (formDataStep1.name.length < 3) {
      errors.name = 'Nome deve ter pelo menos 3 caracteres';
      isValid = false;
    }

    // Validação do email
    if (!formDataStep1.email) {
      errors.email = 'E-mail é obrigatório';
      isValid = false;
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(formDataStep1.email)) {
        errors.email = 'Formato de e-mail inválido';
        isValid = false;
      }
    }

    // Validação do tipo de conta
    if (!formDataStep1.tipoConta) {
      errors.tipoConta = 'Tipo de conta é obrigatório';
      isValid = false;
    }

    // Validação do tipo de produção
    if (!formDataStep1.tipoProducao) {
      errors.tipoProducao = 'Tipo de produção é obrigatório';
      isValid = false;
    }

    // Validação dos termos
    if (!formDataStep1.terms) {
      errors.terms = 'Você precisa concordar com os Termos de Uso';
      isValid = false;
    }

    setErrorsStep1(errors);
    return isValid;
  };

  // Validação da etapa 2
  const validateStep2 = () => {
    const errors = {
      password: '',
      confirmPassword: '',
    };
    let isValid = true;

    // Validação da senha
    if (!formDataStep2.password) {
      errors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (formDataStep2.password.length < 6) {
      errors.password = 'A senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }

    // Validação da confirmação de senha
    if (!formDataStep2.confirmPassword) {
      errors.confirmPassword = 'Confirmação de senha é obrigatória';
      isValid = false;
    } else if (formDataStep2.password !== formDataStep2.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem';
      isValid = false;
    }

    setErrorsStep2(errors);
    return isValid;
  };

  // Submissão da etapa 1
  const handleSubmitStep1 = e => {
    e.preventDefault();

    if (validateStep1()) {
      console.log('Dados da etapa 1:', formDataStep1);
      setStep(2);
    }
  };

  // Submissão da etapa 2
  const handleSubmitStep2 = async e => {
    e.preventDefault();

    if (validateStep2()) {
      setIsLoading(true);

      try {
        // Combinar dados das duas etapas
        const formData = {
          ...formDataStep1,
          ...formDataStep2,
        };

        // Mostrar apenas os dados do formulário inicialmente
        console.log('Dados da etapa 2:', formData);

        // Simular um delay de processamento
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mostrar toast de sucesso
        toast.success(
          'Conta criada com sucesso! Redirecionando para o dashboard...'
        );

        // Redirecionar após cadastro bem-sucedido
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } catch (error) {
        console.error('Erro ao fazer cadastro:', error);
        toast.error('Erro ao criar conta. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="flex md:min-h-screen">
        <div className="hidden md:flex w-1/2 bg-betia-green items-center justify-center p-8">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-4">BetIA</h2>
            <h3 className="text-2xl font-bold mb-4">
              Transforme sua produção agrícola
            </h3>
            <p className="mb-6">
              Utilize nossa plataforma baseada em inteligência artificial para
              otimizar sua produção agrícola e aumentar sua produtividade.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-betia-green/20 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <Label htmlFor="feature1" className="text-white font-normal">
                  Análise com Termos Reais
                  <p className="text-sm opacity-80">
                    Utilizamos dados reais para oferecer as melhores análises
                  </p>
                </Label>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-betia-green/20 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <Label htmlFor="feature2" className="text-white font-normal">
                  Suporte Especializado
                  <p className="text-sm opacity-80">
                    Equipe técnica disponível para esclarecer suas dúvidas
                  </p>
                </Label>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-betia-green/20 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <Label htmlFor="feature3" className="text-white font-normal">
                  Decisões Inteligentes
                  <p className="text-sm opacity-80">
                    Recomendações baseadas em IA para melhorar seus resultados
                  </p>
                </Label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Crie sua conta gratuita</CardTitle>
              <CardDescription>
                Preencha os campos abaixo para começar a usar nossa plataforma.
                Você terá acesso a todas as funcionalidades.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 ? (
                <form className="space-y-4" onSubmit={handleSubmitStep1}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Digite seu nome completo"
                      value={formDataStep1.name}
                      onChange={handleChangeStep1}
                      className={errorsStep1.name ? 'border-red-500' : ''}
                    />
                    {errorsStep1.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsStep1.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Digite seu e-mail"
                      value={formDataStep1.email}
                      onChange={handleChangeStep1}
                      className={errorsStep1.email ? 'border-red-500' : ''}
                    />
                    {errorsStep1.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsStep1.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo-conta">Tipo de conta</Label>
                    <Select
                      value={formDataStep1.tipoConta}
                      onValueChange={value =>
                        handleSelectChange('tipoConta', value)
                      }
                    >
                      <SelectTrigger
                        className={
                          errorsStep1.tipoConta ? 'border-red-500' : ''
                        }
                        id="tipo-conta"
                      >
                        <SelectValue placeholder="Selecione o tipo de conta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="produtor">Produtor Rural</SelectItem>
                        <SelectItem value="tecnico">
                          Técnico Agrícola
                        </SelectItem>
                        <SelectItem value="empresa">Empresa</SelectItem>
                      </SelectContent>
                    </Select>
                    {errorsStep1.tipoConta && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsStep1.tipoConta}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo-producao">Tipo de produção</Label>
                    <Select
                      value={formDataStep1.tipoProducao}
                      onValueChange={value =>
                        handleSelectChange('tipoProducao', value)
                      }
                    >
                      <SelectTrigger
                        className={
                          errorsStep1.tipoProducao ? 'border-red-500' : ''
                        }
                        id="tipo-producao"
                      >
                        <SelectValue placeholder="Selecione o tipo de produção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="graos">Grãos</SelectItem>
                        <SelectItem value="hortalicas">Hortaliças</SelectItem>
                        <SelectItem value="frutas">Frutas</SelectItem>
                        <SelectItem value="pecuaria">Pecuária</SelectItem>
                      </SelectContent>
                    </Select>
                    {errorsStep1.tipoProducao && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsStep1.tipoProducao}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formDataStep1.terms}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      Concordo com os Termos de Uso
                    </Label>
                  </div>
                  {errorsStep1.terms && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsStep1.terms}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-betia-green hover:bg-betia-green/90"
                  >
                    Próximo
                  </Button>
                  <div className="text-center text-sm">
                    Já tem uma conta?{' '}
                    <a
                      href="/login"
                      className="text-betia-green hover:underline"
                    >
                      Entrar
                    </a>
                  </div>
                </form>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmitStep2}>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua senha"
                        value={formDataStep2.password}
                        onChange={handleChangeStep2}
                        className={
                          errorsStep2.password
                            ? 'border-red-500 pr-10'
                            : 'pr-10'
                        }
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errorsStep2.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsStep2.password}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirme sua senha</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirme sua senha"
                        value={formDataStep2.confirmPassword}
                        onChange={handleChangeStep2}
                        className={
                          errorsStep2.confirmPassword
                            ? 'border-red-500 pr-10'
                            : 'pr-10'
                        }
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errorsStep2.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsStep2.confirmPassword}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-betia-green hover:bg-betia-green/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Criando conta...' : 'Criar conta'}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={e => {
                      e.preventDefault();
                      setStep(1);
                    }}
                    disabled={isLoading}
                  >
                    Voltar
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
