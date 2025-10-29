import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { FlashCard } from '@/types';

interface CreateSetModalProps {
  showCreateSet: boolean;
  newSetTitle: string;
  newSetDescription: string;
  newCards: FlashCard[];
  newCardFront: string;
  newCardBack: string;
  setShowCreateSet: (show: boolean) => void;
  setNewSetTitle: (title: string) => void;
  setNewSetDescription: (description: string) => void;
  setNewCardFront: (front: string) => void;
  setNewCardBack: (back: string) => void;
  addCardToNewSet: () => void;
  removeCardFromNewSet: (cardId: number) => void;
  createNewSet: () => void;
}

const CreateSetModal = ({
  showCreateSet,
  newSetTitle,
  newSetDescription,
  newCards,
  newCardFront,
  newCardBack,
  setShowCreateSet,
  setNewSetTitle,
  setNewSetDescription,
  setNewCardFront,
  setNewCardBack,
  addCardToNewSet,
  removeCardFromNewSet,
  createNewSet,
}: CreateSetModalProps) => {
  if (!showCreateSet) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2 border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Создать новый набор
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowCreateSet(false)}>
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
              {newCards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border-2 border-purple-100"
                >
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
            <Button variant="outline" className="flex-1" onClick={() => setShowCreateSet(false)}>
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
  );
};

export default CreateSetModal;
