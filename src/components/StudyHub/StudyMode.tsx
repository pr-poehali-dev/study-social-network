import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { StudySet, Comment } from '@/types';

interface StudyModeProps {
  currentStudySet: StudySet;
  currentCardIndex: number;
  flippedCards: Set<number>;
  comments: Comment[];
  newComment: string;
  setNewComment: (comment: string) => void;
  setStudyMode: (mode: boolean) => void;
  toggleCardFlip: (cardId: number) => void;
  nextCard: () => void;
  prevCard: () => void;
  addComment: () => void;
}

const StudyMode = ({
  currentStudySet,
  currentCardIndex,
  flippedCards,
  comments,
  newComment,
  setNewComment,
  setStudyMode,
  toggleCardFlip,
  nextCard,
  prevCard,
  addComment,
}: StudyModeProps) => {
  return (
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
            <Button onClick={addComment} className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Icon name="Send" size={18} />
            </Button>
          </div>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
              >
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
  );
};

export default StudyMode;
