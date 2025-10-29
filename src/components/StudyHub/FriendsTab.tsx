import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Friend } from '@/types';

interface FriendsTabProps {
  filteredFriends: Friend[];
  userSearchQuery: string;
  handleUserSearch: (query: string) => void;
}

const FriendsTab = ({ filteredFriends, userSearchQuery, handleUserSearch }: FriendsTabProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Мои друзья
          </h2>
          <p className="text-muted-foreground">Учитесь вместе с друзьями</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск по @username..."
              className="pl-10 w-80"
              value={userSearchQuery}
              onChange={(e) => handleUserSearch(e.target.value)}
            />
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Icon name="UserPlus" size={18} className="mr-2" />
            Добавить
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFriends.map((friend) => (
          <Card key={friend.id} className="hover:shadow-lg transition-all border-2 border-purple-100">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <Avatar className="w-16 h-16 border-4 border-purple-200">
                    <AvatarFallback className="text-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      {friend.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                      friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{friend.name}</h3>
                  <p className="text-sm text-purple-600">{friend.username}</p>
                  <p className="text-xs text-muted-foreground">{friend.studySets} наборов</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 border-2 border-purple-200">
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Написать
                </Button>
                <Button variant="outline" size="icon" className="border-2 border-purple-200">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FriendsTab;
