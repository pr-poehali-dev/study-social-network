import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-xl flex items-center justify-center">
              <Icon name="GraduationCap" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              StudyHub
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('home')}
              className={activeTab === 'home' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
            >
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </Button>
            <Button
              variant={activeTab === 'friends' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('friends')}
              className={activeTab === 'friends' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
            >
              <Icon name="Users" size={18} className="mr-2" />
              Друзья
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('profile')}
              className={activeTab === 'profile' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
            >
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
