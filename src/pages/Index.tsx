import { useState } from 'react';
import { StudySet, Friend, Comment, FlashCard } from '@/types';
import Navigation from '@/components/StudyHub/Navigation';
import HomeTab from '@/components/StudyHub/HomeTab';
import StudyMode from '@/components/StudyHub/StudyMode';
import FriendsTab from '@/components/StudyHub/FriendsTab';
import ProfileTab from '@/components/StudyHub/ProfileTab';
import CreateSetModal from '@/components/StudyHub/CreateSetModal';

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
    setNewCards(newCards.filter((card) => card.id !== cardId));
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
      const filtered = friends.filter(
        (friend) =>
          friend.username.toLowerCase().includes(query.toLowerCase()) ||
          friend.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFriends(filtered);
    }
  };

  const filteredStudySets = studySets.filter(
    (set) =>
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
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && !studyMode && (
          <HomeTab
            filteredStudySets={filteredStudySets}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setShowCreateSet={setShowCreateSet}
            toggleLike={toggleLike}
            startStudy={startStudy}
          />
        )}

        {studyMode && currentStudySet && (
          <StudyMode
            currentStudySet={currentStudySet}
            currentCardIndex={currentCardIndex}
            flippedCards={flippedCards}
            comments={comments}
            newComment={newComment}
            setNewComment={setNewComment}
            setStudyMode={setStudyMode}
            toggleCardFlip={toggleCardFlip}
            nextCard={nextCard}
            prevCard={prevCard}
            addComment={addComment}
          />
        )}

        {activeTab === 'friends' && (
          <FriendsTab
            filteredFriends={filteredFriends}
            userSearchQuery={userSearchQuery}
            handleUserSearch={handleUserSearch}
          />
        )}

        {activeTab === 'profile' && <ProfileTab userStats={userStats} />}

        <CreateSetModal
          showCreateSet={showCreateSet}
          newSetTitle={newSetTitle}
          newSetDescription={newSetDescription}
          newCards={newCards}
          newCardFront={newCardFront}
          newCardBack={newCardBack}
          setShowCreateSet={setShowCreateSet}
          setNewSetTitle={setNewSetTitle}
          setNewSetDescription={setNewSetDescription}
          setNewCardFront={setNewCardFront}
          setNewCardBack={setNewCardBack}
          addCardToNewSet={addCardToNewSet}
          removeCardFromNewSet={removeCardFromNewSet}
          createNewSet={createNewSet}
        />
      </main>
    </div>
  );
};

export default Index;
