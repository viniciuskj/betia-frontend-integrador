import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const scrollToAnchor = (anchor: string): void => {
    const element = document.getElementById(anchor);

    if (isHomePage && element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const targetElement = document.getElementById(anchor);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const getNavLink = (anchor: string, label: string) => {
    return (
      <a
        href={`/#${anchor}`}
        className="text-sm font-medium hover:underline cursor-pointer"
        onClick={e => {
          e.preventDefault();
          scrollToAnchor(anchor);
          setIsMenuOpen(false);
        }}
      >
        {label}
      </a>
    );
  };

  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">BetIA</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          {getNavLink('inicio', 'Início')}
          {getNavLink('features', 'Funcionalidades')}
          {getNavLink('about', 'Sobre o Projeto')}
        </nav>

        <div className="hidden md:flex gap-4">
          <Link to="/login">
            <Button variant="outline">Entrar</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-betia-green hover:bg-betia-green/90">
              Criar Conta
            </Button>
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden container bg-white border-b py-4">
          <nav className="flex flex-col gap-4">
            {getNavLink('inicio', 'Início')}
            {getNavLink('features', 'Funcionalidades')}
            {getNavLink('about', 'Sobre o Projeto')}
            {getNavLink('contato', 'Contato')}

            <div className="flex gap-4 mt-4">
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  Entrar
                </Button>
              </Link>
              <Link to="/register" className="w-full">
                <Button className="w-full bg-betia-green hover:bg-betia-green/90">
                  Criar Conta
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
