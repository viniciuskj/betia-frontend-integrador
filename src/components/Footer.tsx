import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-betia-green text-white">
      <div className="container px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">BetIA</h3>
            <p className="mt-2 text-sm">Transformando agricultura com IA</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Links Rápidos</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:underline">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/funcionalidades" className="hover:underline">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link to="/sobre-o-projeto" className="hover:underline">
                  Sobre o Projeto
                </Link>
              </li>
              <li>
                <Link to="/precos" className="hover:underline">
                  Preços
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Contato</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>Email: contato@betia.com</li>
              <li>Telefone: (00) 0000-0000</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-4 text-center text-sm">
          <p>
            © {new Date().getFullYear()} BetIA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
