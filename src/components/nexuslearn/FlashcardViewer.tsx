import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Flashcard, Progress } from '@/lib/types';
import { ClipboardCheck, Check, X, RotateCw } from 'lucide-react';

interface FlashcardViewerProps {
  flashcards: Flashcard[];
  progress: Progress;
  setProgress: React.Dispatch<React.SetStateAction<Progress>>;
}

export default function FlashcardViewer({ flashcards, progress, setProgress }: FlashcardViewerProps) {
  const [flippedStates, setFlippedStates] = useState<boolean[]>([]);
  const [answeredStates, setAnsweredStates] = useState<Record<number, 'correct' | 'incorrect' | null>>({});

  useEffect(() => {
    setFlippedStates(new Array(flashcards.length).fill(false));
    setAnsweredStates({});
  }, [flashcards]);

  const handleFlip = (index: number) => {
    setFlippedStates(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const handleAnswer = (index: number, answer: 'correct' | 'incorrect') => {
    if (answeredStates[index]) return; // Already answered

    setAnsweredStates(prev => ({...prev, [index]: answer}));
    setProgress(prev => ({
        ...prev,
        flashcardsViewed: prev.flashcardsViewed + 1,
        flashcardsCorrect: answer === 'correct' ? prev.flashcardsCorrect + 1 : prev.flashcardsCorrect
    }));
  };
  
  const handleReset = () => {
    setFlippedStates(new Array(flashcards.length).fill(false));
    setAnsweredStates({});
    setProgress(prev => ({...prev, flashcardsViewed: 0, flashcardsCorrect: 0}))
  }

  if (!flashcards || flashcards.length === 0) {
    return (
      <Card>
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><ClipboardCheck className="h-5 w-5"/>Flashcards</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          No flashcards available. Generate some from your notes!
        </CardContent>
      </Card>
    );
  }
  
  const allAnswered = Object.keys(answeredStates).length === flashcards.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2"><ClipboardCheck className="h-5 w-5"/>Flashcards</CardTitle>
        <CardDescription>Click a card to flip it. Mark if you got it right or wrong.</CardDescription>
      </CardHeader>
      <CardContent>
        {allAnswered ? (
            <div className="flex flex-col items-center justify-center h-[350px] space-y-4">
                <h3 className="text-2xl font-headline">Deck Complete!</h3>
                <p className="text-muted-foreground">You reviewed all the flashcards.</p>
                <Button onClick={handleReset}><RotateCw className="mr-2 h-4 w-4"/>Practice Again</Button>
            </div>
        ) : (
            <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
                {flashcards.map((flashcard, index) => (
                <CarouselItem key={index}>
                    <div className="p-1">
                    <div className="relative" style={{ perspective: '1000px' }}>
                        <div
                        className={cn(
                            'relative w-full h-[350px] transition-transform duration-700',
                            'transform-style-3d'
                        )}
                        style={{ transform: flippedStates[index] ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                        >
                        {/* Front of card */}
                        <div className="absolute w-full h-full backface-hidden">
                            <Card className="h-full flex flex-col items-center justify-center p-6 text-center" onClick={() => handleFlip(index)}>
                                <p className="text-xl font-semibold">{flashcard.front}</p>
                            </Card>
                        </div>
                        {/* Back of card */}
                        <div className="absolute w-full h-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
                            <Card className="h-full flex flex-col items-center justify-center p-6 text-center" onClick={() => handleFlip(index)}>
                                <p className="text-lg">{flashcard.back}</p>
                            </Card>
                        </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => handleAnswer(index, 'incorrect')} disabled={!!answeredStates[index]}>
                            <X className={cn("h-6 w-6", answeredStates[index] === 'incorrect' && "text-red-500")} />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleAnswer(index, 'correct')} disabled={!!answeredStates[index]}>
                            <Check className={cn("h-6 w-6", answeredStates[index] === 'correct' && "text-green-500")} />
                        </Button>
                    </div>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
        )}
      </CardContent>
    </Card>
  );
}
