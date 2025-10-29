import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { StudySet } from '@/types';

interface HomeTabProps {
  filteredStudySets: StudySet[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setShowCreateSet: (show: boolean) => void;
  toggleLike: (setId: number) => void;
  startStudy: (studySet: StudySet) => void;
}

const HomeTab = ({
  filteredStudySets,
  searchQuery,
  setSearchQuery,
  setShowCreateSet,
  toggleLike,
  startStudy,
}: HomeTabProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Популярные занятия
          </h2>
          <p className="text-muted-foreground">Изучайте новое каждый день</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск занятий..."
              className="pl-10 w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600" onClick={() => setShowCreateSet(true)}>
            <Icon name="Plus" size={18} className="mr-2" />
            Создать
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudySets.map((set) => (
          <Card
            key={set.id}
            className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-purple-100 overflow-hidden group"
          >
            <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 animate-gradient bg-[length:200%_200%]" />
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span className="text-xl">{set.title}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleLike(set.id)}
                  className="hover:scale-110 transition-transform"
                >
                  <Icon
                    name="Heart"
                    size={20}
                    className={set.isLiked ? 'fill-pink-500 text-pink-500' : 'text-muted-foreground'}
                  />
                </Button>
              </CardTitle>
              <CardDescription>{set.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        {set.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{set.author}</span>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {set.cards.length} карточек
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Users" size={16} />
                      {set.studyCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Heart" size={16} />
                      {set.likes}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-90"
                  onClick={() => startStudy(set)}
                >
                  <Icon name="Play" size={18} className="mr-2" />
                  Начать изучение
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomeTab;
