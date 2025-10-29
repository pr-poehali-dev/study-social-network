import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface FlashCard {
  id: number;
  front: string;
  back: string;
}

interface StudySet {
  id: number;
  title: string;
  description: string;
  cards: FlashCard[];
  author: string;
  studyCount: number;
  likes: number;
  isLiked: boolean;
}

interface Friend {
  id: number;
  name: string;
  username: string;
  avatar: string;
  studySets: number;
  status: 'online' | 'offline';
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  timestamp: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [studySets, setStudySets] = useState<StudySet[]>([
    {
      id: 1,
      title: 'Английский: 100 самых важных слов',
      description: 'Базовая лексика для начинающих',
      cards: [
        { id: 1, front: 'Hello', back: 'Привет' },
        { id: 2, front: 'Goodbye', back: 'До свидания' },
        { id: 3, front: 'Thank you', back: 'Спасибо' },
      ],
      author: 'Анна Иванова',
      studyCount: 1234,
      likes: 89,
      isLiked: false,
    },
    {
      id: 2,
      title: 'Математика: Формулы алгебры',
      description: 'Основные формулы для 9 класса',
      cards: [
        { id: 4, front: 'a² - b²', back: '(a - b)(a + b)' },
        { id: 5, front: '(a + b)²', back: 'a² + 2ab + b²' },
        { id: 6, front: '(a - b)²', back: 'a² - 2ab + b²' },
      ],
      author: 'Петр Смирнов',
      studyCount: 892,
      likes: 67,
      isLiked: true,
    },
    {
      id: 3,
      title: 'История России: Даты',
      description: 'Важнейшие события русской истории',
      cards: [
        { id: 7, front: '988 год', back: 'Крещение Руси' },
        { id: 8, front: '1380 год', back: 'Куликовская битва' },
        { id: 9, front: '1612 год', back: 'Освобождение Москвы' },
      ],
      author: 'Мария Петрова',
      studyCount: 654,
      likes: 45,
      isLiked: false,
    },
  ]);

  const [friends, setFriends] = useState<Friend[]>([
    { id: 1, name: 'Анна Иванова', username: '@anna_ivanova', avatar: '', studySets: 12, status: 'online' },
    { id: 2, name: 'Петр Смирнов', username: '@petr_smirnov', avatar: '', studySets: 8, status: 'online' },
    { id: 3, name: 'Мария Петрова', username: '@maria_petrova', avatar: '', studySets: 15, status: 'offline' },
    { id: 4, name: 'Иван Сидоров', username: '@ivan_sidorov', avatar: '', studySets: 6, status: 'offline' },
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'Петр Смирнов',
      avatar: '',
      text: 'Отличный набор! Очень помог при подготовке к экзамену 🎯',
      likes: 12,
      timestamp: '2 часа назад',
    },
    {
      id: 2,
      author: 'Мария Петрова',
      avatar: '',
      text: 'Спасибо за материал! Добавила в избранное',
      likes: 8,
      timestamp: '5 часов назад',
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [currentStudySet, setCurrentStudySet] = useState<StudySet | null>(null);
  const [studyMode, setStudyMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showCreateSet, setShowCreateSet] = useState(false);
  const [newSetTitle, setNewSetTitle] = useState('');
  const [newSetDescription, setNewSetDescription] = useState('');
  const [newCards, setNewCards] = useState<FlashCard[]>([]);
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>(friends);

  const toggleCardFlip = (cardId: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const toggleLike = (setId: number) => {
    setStudySets((prev) =>
      prev.map((set) =>
        set.id === setId
          ? { ...set, isLiked: !set.isLiked, likes: set.isLiked ? set.likes - 1 : set.likes + 1 }
          : set
      )
    );
  };

  const startStudy = (studySet: StudySet) => {
    setCurrentStudySet(studySet);
    setStudyMode(true);
    setCurrentCardIndex(0);
    setFlippedCards(new Set());
  };

  const nextCard = () => {
    if (currentStudySet && currentCardIndex < currentStudySet.cards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setFlippedCards(new Set());
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setFlippedCards(new Set());
    }
  };

  const addComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: 'Вы',
        avatar: '',
        text: newComment,
        likes: 0,
        timestamp: 'только что',
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const addCardToNewSet = () => {
    if (newCardFront.trim() && newCardBack.trim()) {
      const newCard: FlashCard = {
        id: Date.now(),
        front: newCardFront,
        back: newCardBack,
      };
      setNewCards([...newCards, newCard]);
      setNewCardFront('');
      setNewCardBack('');
    }
  };

  const removeCardFromNewSet = (cardId: number) => {
    setNewCards(newCards.filter(card => card.id !== cardId));
  };

  const createNewSet = () => {
    if (newSetTitle.trim() && newCards.length > 0) {
      const newSet: StudySet = {
        id: studySets.length + 1,
        title: newSetTitle,
        description: newSetDescription,
        cards: newCards,
        author: 'Вы',
        studyCount: 0,
        likes: 0,
        isLiked: false,
      };
      setStudySets([newSet, ...studySets]);
      setShowCreateSet(false);
      setNewSetTitle('');
      setNewSetDescription('');
      setNewCards([]);
    }
  };

  const handleUserSearch = (query: string) => {
    setUserSearchQuery(query);
    if (query.trim() === '') {
      setFilteredFriends(friends);
    } else {
      const filtered = friends.filter(friend => 
        friend.username.toLowerCase().includes(query.toLowerCase()) ||
        friend.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFriends(filtered);
    }
  };

  const filteredStudySets = studySets.filter(set =>
    set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    set.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userStats = {
    studySets: 24,
    cardsStudied: 1543,
    streak: 12,
    friends: friends.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
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

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && !studyMode && (
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
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                  onClick={() => setShowCreateSet(true)}
                >
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
        )}

        {studyMode && currentStudySet && (
          <div className="max-w-4xl mx-auto space-y-6 animate-scale-in">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => setStudyMode(false)}>
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Назад к списку
              </Button>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {currentCardIndex + 1} / {currentStudySet.cards.length}
              </Badge>
            </div>

            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {currentStudySet.title}
                </CardTitle>
                <Progress value={((currentCardIndex + 1) / currentStudySet.cards.length) * 100} className="h-2" />
              </CardHeader>
            </Card>

            <div className="perspective-1000">
              <Card
                className="min-h-[400px] cursor-pointer hover:shadow-2xl transition-all duration-300 border-4 border-purple-200 bg-gradient-to-br from-white to-purple-50"
                onClick={() => toggleCardFlip(currentStudySet.cards[currentCardIndex].id)}
              >
                <CardContent className="flex items-center justify-center min-h-[400px] p-12">
                  <div className="text-center space-y-4">
                    <p className="text-5xl font-bold">
                      {flippedCards.has(currentStudySet.cards[currentCardIndex].id)
                        ? currentStudySet.cards[currentCardIndex].back
                        : currentStudySet.cards[currentCardIndex].front}
                    </p>
                    <p className="text-muted-foreground">
                      {flippedCards.has(currentStudySet.cards[currentCardIndex].id)
                        ? 'Нажмите, чтобы вернуть'
                        : 'Нажмите, чтобы увидеть ответ'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={prevCard}
                disabled={currentCardIndex === 0}
                className="border-2 border-purple-200"
              >
                <Icon name="ChevronLeft" size={20} className="mr-2" />
                Предыдущая
              </Button>
              <Button
                size="lg"
                onClick={nextCard}
                disabled={currentCardIndex === currentStudySet.cards.length - 1}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                Следующая
                <Icon name="ChevronRight" size={20} className="ml-2" />
              </Button>
            </div>

            <Card className="border-2 border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MessageSquare" size={24} className="text-purple-600" />
                  Комментарии ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Textarea
                    placeholder="Поделитесь своим мнением..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="resize-none border-2 border-purple-100 focus:border-purple-300"
                  />
                  <Button
                    onClick={addComment}
                    className="bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    <Icon name="Send" size={18} />
                  </Button>
                </div>

                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                          {comment.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{comment.author}</span>
                          <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-pink-600">
                            <Icon name="Heart" size={16} className="mr-1" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
                            <Icon name="MessageCircle" size={16} className="mr-1" />
                            Ответить
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'friends' && (
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
        )}

        {activeTab === 'profile' && (
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
        )}

        {showCreateSet && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2 border-purple-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Создать новый набор
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowCreateSet(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Название набора</label>
                    <Input 
                      placeholder="Например: Английский для начинающих"
                      value={newSetTitle}
                      onChange={(e) => setNewSetTitle(e.target.value)}
                      className="border-2 border-purple-100 focus:border-purple-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Описание</label>
                    <Textarea 
                      placeholder="Краткое описание набора..."
                      value={newSetDescription}
                      onChange={(e) => setNewSetDescription(e.target.value)}
                      className="border-2 border-purple-100 focus:border-purple-300 resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="border-t-2 border-purple-100 pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Layers" size={20} className="text-purple-600" />
                    Карточки ({newCards.length})
                  </h3>
                  
                  <div className="space-y-3 mb-4">
                    {newCards.map((card, index) => (
                      <div key={card.id} className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border-2 border-purple-100">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Вопрос</p>
                            <p className="font-medium">{card.front}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Ответ</p>
                            <p className="font-medium">{card.back}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeCardFromNewSet(card.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
                    <CardContent className="pt-6 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium mb-1 block">Вопрос</label>
                          <Input 
                            placeholder="Передняя сторона"
                            value={newCardFront}
                            onChange={(e) => setNewCardFront(e.target.value)}
                            className="border-purple-200"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium mb-1 block">Ответ</label>
                          <Input 
                            placeholder="Задняя сторона"
                            value={newCardBack}
                            onChange={(e) => setNewCardBack(e.target.value)}
                            className="border-purple-200"
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={addCardToNewSet}
                        variant="outline"
                        className="w-full border-2 border-purple-200 hover:bg-purple-100"
                        disabled={!newCardFront.trim() || !newCardBack.trim()}
                      >
                        <Icon name="Plus" size={18} className="mr-2" />
                        Добавить карточку
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-3 pt-4 border-t-2 border-purple-100">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowCreateSet(false)}
                  >
                    Отмена
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                    onClick={createNewSet}
                    disabled={!newSetTitle.trim() || newCards.length === 0}
                  >
                    <Icon name="Check" size={18} className="mr-2" />
                    Создать набор
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;