import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Cookies from 'js-cookie';

export function UserInfo() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (e) {
        console.error('Erro ao carregar dados do usuário:', e);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="mt-auto p-4 border-t border-white/10">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-white/20 text-white">
            {user?.name?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">
            {user?.name || 'Usuário'}
          </p>
          <p className="text-xs text-white/70 truncate">{user?.email || ''}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/70 hover:text-white cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
