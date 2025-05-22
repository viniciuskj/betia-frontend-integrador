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
import { Check, Eye, EyeOff } from 'lucide-react';
/* api */
import register from '@/api/register';
/* types */
import type { ChangeEvent, FormEvent } from 'react';

// Types
interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  address: Address;
}

interface FormDataStep1 {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormDataStep2 {
  street: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
}

interface ErrorsStep1 {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorsStep2 {
  street: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
}

const Register = () => {
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const [formDataStep1, setFormDataStep1] = useState<FormDataStep1>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorsStep1, setErrorsStep1] = useState<ErrorsStep1>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formDataStep2, setFormDataStep2] = useState<FormDataStep2>({
    street: '',
    city: '',
    state: '',
    country: 'Brasil',
    zip_code: '',
  });

  const [errorsStep2, setErrorsStep2] = useState<ErrorsStep2>({
    street: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
  });

  const handleChangeStep1 = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormDataStep1({
      ...formDataStep1,
      [name]: value,
    });
  };

  const handleChangeStep2 = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormDataStep2({
      ...formDataStep2,
      [name]: value,
    });
  };

  const handleSelectChange = (
    name: keyof FormDataStep2,
    value: string
  ): void => {
    setFormDataStep2({
      ...formDataStep2,
      [name]: value,
    });
  };

  const validateStep1 = (): boolean => {
    const errors: ErrorsStep1 = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;

    if (!formDataStep1.name) {
      errors.name = 'Nome é obrigatório';
      isValid = false;
    } else if (formDataStep1.name.length < 3) {
      errors.name = 'Nome deve ter pelo menos 3 caracteres';
      isValid = false;
    }

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

    // Validação da senha
    if (!formDataStep1.password) {
      errors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (formDataStep1.password.length < 6) {
      errors.password = 'A senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }

    // Validação da confirmação de senha
    if (!formDataStep1.confirmPassword) {
      errors.confirmPassword = 'Confirmação de senha é obrigatória';
      isValid = false;
    } else if (formDataStep1.password !== formDataStep1.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem';
      isValid = false;
    }

    setErrorsStep1(errors);
    return isValid;
  };

  const validateStep2 = (): boolean => {
    const errors: ErrorsStep2 = {
      street: '',
      city: '',
      state: '',
      country: '',
      zip_code: '',
    };
    let isValid = true;

    if (!formDataStep2.street) {
      errors.street = 'Endereço é obrigatório';
      isValid = false;
    }

    if (!formDataStep2.city) {
      errors.city = 'Cidade é obrigatória';
      isValid = false;
    }

    if (!formDataStep2.state) {
      errors.state = 'Estado é obrigatório';
      isValid = false;
    }

    if (!formDataStep2.country) {
      errors.country = 'País é obrigatório';
      isValid = false;
    }

    if (!formDataStep2.zip_code) {
      errors.zip_code = 'CEP é obrigatório';
      isValid = false;
    } else {
      const cepRegex = /^\d{5}-?\d{3}$/;
      if (!cepRegex.test(formDataStep2.zip_code)) {
        errors.zip_code = 'Formato de CEP inválido (ex: 12345-678)';
        isValid = false;
      }
    }

    setErrorsStep2(errors);
    return isValid;
  };

  // Submissão da etapa 1
  const handleSubmitStep1 = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validateStep1()) {
      console.log('Dados da etapa 1:', formDataStep1);
      setStep(2);
    }
  };

  // Submissão da etapa 2 (final)
  const handleSubmitStep2 = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (validateStep2()) {
      setIsLoading(true);

      try {
        const userData: RegisterData = {
          name: formDataStep1.name,
          email: formDataStep1.email,
          password: formDataStep1.password,
          address: {
            street: formDataStep2.street,
            city: formDataStep2.city,
            state: formDataStep2.state,
            country: formDataStep2.country,
            zip_code: formDataStep2.zip_code,
          },
        };

        console.log('Dados completos para registro:', userData);

        const result = await register(userData);

        if (result.success) {
          toast.success(
            'Conta criada com sucesso! Redirecionando para o dashboard...'
          );

          setTimeout(() => {
            navigate('/admin');
          }, 1000);
        } else {
          toast.error(
            result.message || 'Erro ao criar conta. Por favor, tente novamente.'
          );
        }
      } catch (error) {
        console.error('Erro ao fazer cadastro:', error);
        toast.error('Erro inesperado. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getStepTitle = (): string => {
    switch (step) {
      case 1:
        return 'Dados pessoais';
      case 2:
        return 'Endereço';
      default:
        return 'Crie sua conta gratuita';
    }
  };

  const getStepDescription = (): string => {
    switch (step) {
      case 1:
        return 'Preencha seus dados básicos e crie sua senha.';
      case 2:
        return 'Complete seu cadastro com seu endereço.';
      default:
        return 'Preencha os campos abaixo para começar a usar nossa plataforma.';
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
              <CardTitle>{getStepTitle()}</CardTitle>
              <CardDescription>
                {getStepDescription()}
                <div className="flex gap-2 mt-2">
                  {[1, 2].map(stepNumber => (
                    <div
                      key={stepNumber}
                      className={`h-2 w-full rounded-full ${
                        step >= stepNumber ? 'bg-betia-green' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <form className="space-y-4" onSubmit={handleSubmitStep1}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
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
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua senha"
                        value={formDataStep1.password}
                        onChange={handleChangeStep1}
                        className={
                          errorsStep1.password
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
                    {errorsStep1.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsStep1.password}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirme sua senha</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirme sua senha"
                        value={formDataStep1.confirmPassword}
                        onChange={handleChangeStep1}
                        className={
                          errorsStep1.confirmPassword
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
                    {errorsStep1.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsStep1.confirmPassword}
                      </p>
                    )}
                  </div>
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
              )}

              {step === 2 && (
                <form className="space-y-4" onSubmit={handleSubmitStep2}>
                  <div className="space-y-2">
                    <Label htmlFor="street">Endereço</Label>
                    <Input
                      id="street"
                      name="street"
                      placeholder="Rua, número, complemento"
                      value={formDataStep2.street}
                      onChange={handleChangeStep2}
                      className={errorsStep2.street ? 'border-red-500' : ''}
                    />
                    {errorsStep2.street && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsStep2.street}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Sua cidade"
                        value={formDataStep2.city}
                        onChange={handleChangeStep2}
                        className={errorsStep2.city ? 'border-red-500' : ''}
                      />
                      {errorsStep2.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsStep2.city}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Select
                        value={formDataStep2.state}
                        onValueChange={value =>
                          handleSelectChange('state', value)
                        }
                      >
                        <SelectTrigger
                          className={errorsStep2.state ? 'border-red-500' : ''}
                          id="state"
                        >
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AC">AC</SelectItem>
                          <SelectItem value="AL">AL</SelectItem>
                          <SelectItem value="AP">AP</SelectItem>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="BA">BA</SelectItem>
                          <SelectItem value="CE">CE</SelectItem>
                          <SelectItem value="DF">DF</SelectItem>
                          <SelectItem value="ES">ES</SelectItem>
                          <SelectItem value="GO">GO</SelectItem>
                          <SelectItem value="MA">MA</SelectItem>
                          <SelectItem value="MT">MT</SelectItem>
                          <SelectItem value="MS">MS</SelectItem>
                          <SelectItem value="MG">MG</SelectItem>
                          <SelectItem value="PA">PA</SelectItem>
                          <SelectItem value="PB">PB</SelectItem>
                          <SelectItem value="PR">PR</SelectItem>
                          <SelectItem value="PE">PE</SelectItem>
                          <SelectItem value="PI">PI</SelectItem>
                          <SelectItem value="RJ">RJ</SelectItem>
                          <SelectItem value="RN">RN</SelectItem>
                          <SelectItem value="RS">RS</SelectItem>
                          <SelectItem value="RO">RO</SelectItem>
                          <SelectItem value="RR">RR</SelectItem>
                          <SelectItem value="SC">SC</SelectItem>
                          <SelectItem value="SP">SP</SelectItem>
                          <SelectItem value="SE">SE</SelectItem>
                          <SelectItem value="TO">TO</SelectItem>
                        </SelectContent>
                      </Select>
                      {errorsStep2.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsStep2.state}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip_code">CEP</Label>
                      <Input
                        id="zip_code"
                        name="zip_code"
                        placeholder="00000-000"
                        value={formDataStep2.zip_code}
                        onChange={handleChangeStep2}
                        className={errorsStep2.zip_code ? 'border-red-500' : ''}
                      />
                      {errorsStep2.zip_code && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsStep2.zip_code}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">País</Label>
                      <Select
                        value={formDataStep2.country}
                        onValueChange={value =>
                          handleSelectChange('country', value)
                        }
                      >
                        <SelectTrigger
                          className={
                            errorsStep2.country ? 'border-red-500' : ''
                          }
                          id="country"
                        >
                          <SelectValue placeholder="Selecione o país" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Brasil">Brasil</SelectItem>
                          <SelectItem value="Argentina">Argentina</SelectItem>
                          <SelectItem value="Chile">Chile</SelectItem>
                          <SelectItem value="Uruguai">Uruguai</SelectItem>
                          <SelectItem value="Paraguai">Paraguai</SelectItem>
                        </SelectContent>
                      </Select>
                      {errorsStep2.country && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsStep2.country}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-betia-green hover:bg-betia-green/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Criando conta...' : 'Criar conta'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setStep(1)}
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