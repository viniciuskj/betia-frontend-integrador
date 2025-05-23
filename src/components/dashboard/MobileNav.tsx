import { useState } from 'react';
import { UserInfo } from '@/components/dashboard/UserInfo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  BarChart,
  Calendar,
  FileText,
  Image,
  Leaf,
  Menu,
  Home,
  CreditCard,
} from 'lucide-react';
/* type */
import type { UserData } from '@/types';

interface MobileNavProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  userData: UserData | null;
}

export default function MobileNav({
  selectedTab,
  setSelectedTab,
  userData,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const isActive = (id: string) => {
    return selectedTab === id;
  };

  const navItems = [
    {
      name: 'Dashboard',
      id: 'dashboard',
      icon: BarChart,
    },
    {
      name: 'Minhas Safras',
      id: 'culturas',
      icon: Leaf,
    },
    {
      name: 'Diagnóstico',
      id: 'diagnostico',
      icon: Image,
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

  const handleNavigation = (id: string) => {
    setSelectedTab(id);
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 bg-betia-green text-white w-64 flex flex-col"
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-8">
              <Home className="h-6 w-6" />
              <button
                className="text-xl font-bold"
                onClick={() => {
                  setSelectedTab('dashboard');
                  setOpen(false);
                }}
              >
                BetIA
              </button>
            </div>
            <nav className="space-y-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`flex items-center gap-2 p-2 w-full text-left rounded-md transition-colors ${
                    isActive(item.id) ? 'bg-white/10' : 'hover:bg-white/10'
                  }`}
                  onClick={() => handleNavigation(item.id)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto">
            <UserInfo userData={userData} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
