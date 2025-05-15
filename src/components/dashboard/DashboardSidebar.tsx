import {
  BarChart,
  Calendar,
  FileText,
  ImageIcon,
  Leaf,
  CreditCard,
  Home,
} from 'lucide-react';
import { UserInfo } from '@/components/dashboard/UserInfo';

interface MobileNavProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}
export default function DashboardSidebar({
  selectedTab,
  setSelectedTab,
}: MobileNavProps) {
  const navItems = [
    {
      name: 'Dashboard',
      id: 'dashboard',
      icon: BarChart,
    },
    {
      name: 'Minhas Culturas',
      id: 'culturas',
      icon: Leaf,
    },
    {
      name: 'Diagnóstico',
      id: 'diagnostico',
      icon: ImageIcon,
    },
    {
      name: 'Previsão Climática',
      id: 'clima',
      icon: Calendar,
    },
    {
      name: 'Relatórios',
      id: 'relatorios',
      icon: FileText,
    },
    {
      name: 'Planos',
      id: 'planos',
      icon: CreditCard,
    },
  ];

  return (
    <div className="hidden md:flex w-64 flex-col bg-betia-green text-white p-4 min-h-screen">
      <div className="flex items-center gap-2 mb-8">
        <Home className="h-6 w-6" />
        <span className="text-xl font-bold cursor-pointer">BetIA</span>
      </div>
      <nav className="space-y-2 flex-1">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setSelectedTab(item.id)}
            className={`flex items-center gap-2 p-2 w-full text-left rounded-md transition-colors cursor-pointer
              ${selectedTab === item.id ? 'bg-white/10' : 'hover:bg-white/10'}`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
      <UserInfo />
    </div>
  );
}
