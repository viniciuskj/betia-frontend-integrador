import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section
          id="inicio"
          className="w-full py-12 md:py-24 lg:py-32 bg-[#f5f5f5]"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Tecnologia no Campo ao Seu Alcance
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Utilize tecnologia de ponta para melhorar sua produção
                  agrícola. Transforme seus resultados com inteligência
                  artificial.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/cadastro">
                    <Button className="bg-betia-green hover:bg-betia-green/90">
                      Começar agora
                    </Button>
                  </Link>
                  <a href="#features">
                    <Button variant="outline">Ver funcionalidades</Button>
                  </a>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[600px] aspect-video overflow-hidden rounded-xl">
                <img
                  src="/images/agricultura-tecnologia.webp"
                  alt="Agricultura moderna com tecnologia de IA analisando plantações"
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Principais Funcionalidades */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Principais Funcionalidades
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Cadastro de Culturas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Registre suas culturas e acompanhe seu desenvolvimento em
                    tempo real.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Análise Climática</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Previsões precisas para melhor planejamento da sua produção.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Diagnóstico por Imagem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Identifique doenças nas plantas através de imagens.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Relatórios de Produtividade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Acompanhe os resultados da sua produção com relatórios
                    detalhados.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sobre o Projeto */}
        <section
          id="about"
          className="w-full py-12 md:py-24 lg:py-32 bg-[#f5f5f5]"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Sobre o Projeto
                </h2>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-8">
              <p className="text-gray-500 md:text-xl/relaxed">
                A BetIA é uma plataforma inovadora que utiliza inteligência
                artificial para auxiliar produtores rurais a otimizarem sua
                produção. Com tecnologia de ponta, oferecemos soluções para
                monitoramento de culturas, previsão climática, diagnóstico de
                doenças e muito mais, tudo isso de forma acessível e fácil de
                usar.
              </p>
              <p className="mt-4 text-gray-500 md:text-xl/relaxed">
                Nossa missão é democratizar o acesso à tecnologia no campo,
                permitindo que pequenos e médios produtores possam aumentar sua
                produtividade e rentabilidade de forma sustentável.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
