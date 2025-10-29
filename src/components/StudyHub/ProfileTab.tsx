import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface UserStats {
  studySets: number;
  cardsStudied: number;
  streak: number;
  friends: number;
}

interface ProfileTabProps {
  userStats: UserStats;
}

const ProfileTab = ({ userStats }: ProfileTabProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="border-2 border-purple-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 animate-gradient bg-[length:200%_200%]" />
        <CardContent className="relative pt-0">
          <div className="flex items-end gap-6 -mt-16 mb-6">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarFallback className="text-4xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                В
              </AvatarFallback>
            </Avatar>
            <div className="pb-4">
              <h2 className="text-3xl font-bold mb-1">Ваш профиль</h2>
              <p className="text-muted-foreground">Участник с января 2024</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="pt-6 text-center">
                <Icon name="BookOpen" size={32} className="mx-auto mb-2 text-purple-600" />
                <p className="text-3xl font-bold text-purple-600">{userStats.studySets}</p>
                <p className="text-sm text-muted-foreground">Наборов</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-purple-100 bg-gradient-to-br from-pink-50 to-orange-50">
              <CardContent className="pt-6 text-center">
                <Icon name="Layers" size={32} className="mx-auto mb-2 text-pink-600" />
                <p className="text-3xl font-bold text-pink-600">{userStats.cardsStudied}</p>
                <p className="text-sm text-muted-foreground">Карточек</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-purple-100 bg-gradient-to-br from-orange-50 to-purple-50">
              <CardContent className="pt-6 text-center">
                <Icon name="Flame" size={32} className="mx-auto mb-2 text-orange-500" />
                <p className="text-3xl font-bold text-orange-500">{userStats.streak}</p>
                <p className="text-sm text-muted-foreground">Дней подряд</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="pt-6 text-center">
                <Icon name="Users" size={32} className="mx-auto mb-2 text-purple-600" />
                <p className="text-3xl font-bold text-purple-600">{userStats.friends}</p>
                <p className="text-sm text-muted-foreground">Друзей</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="TrendingUp" size={24} className="text-purple-600" />
            Активность за неделю
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-2 h-48">
            {[65, 42, 88, 95, 72, 58, 100].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-muted-foreground">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
