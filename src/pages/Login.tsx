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
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Eye, EyeOff } from 'lucide-react';
/* api */
import login from '@/api/login';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    remember: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    senha: '',
  });

  const validateEmail = email => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return re.test(email);
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {
      email: '',
      senha: '',
    };

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Formato de e-mail inválido';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'A senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.senha;
  };

  const handleSubmit = async e => {
  e.preventDefault();

  if (!validate()) {
    return;
  }

  setIsLoading(true);

  try {
  //  console.log('Dados do formulário:', formData);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      toast.success(
        'Login realizado com sucesso! Redirecionando para o dashboard...'
      );

      // Redirecionar para o dashboard
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } else {
      toast.error(result.message || 'Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    }

  } catch (error) {
    // console.error('Erro ao fazer login:', error);
    toast.error('Erro inesperado. Tente novamente.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <Header />
      <main className="flex md:min-h-screen">
        <div className="hidden md:flex w-1/2 bg-betia-green items-center justify-center p-8">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-4">BetIA</h2>
            <h3 className="text-2xl font-bold mb-4">Bem-vindo de volta</h3>
            <p className="mb-6">
              Acesse sua conta para continuar utilizando nossa plataforma e
              aproveitar todos os recursos disponíveis.
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
              <CardTitle>Entrar</CardTitle>
              <CardDescription>
                Digite suas credenciais para acessar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha</Label>
                  <div className="relative">
                    <Input
                      id="senha"
                      name="senha"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Digite sua senha"
                      value={formData.senha}
                      onChange={handleChange}
                      className={
                        errors.senha ? 'border-red-500 pr-10' : 'pr-10'
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.senha && (
                    <p className="text-red-500 text-sm mt-1">{errors.senha}</p>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      name="remember"
                      checked={formData.remember}
                      onCheckedChange={checked =>
                        setFormData({ ...formData, remember: checked === true })
                      }
                    />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Lembrar de mim
                    </Label>
                  </div>
                  <a
                    href="/recuperar-senha"
                    className="text-sm text-betia-green hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-betia-green hover:bg-betia-green/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
                <div className="text-center text-sm">
                  Não tem uma conta?{' '}
                  <a
                    href="/cadastro"
                    className="text-betia-green hover:underline"
                  >
                    Criar conta
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
