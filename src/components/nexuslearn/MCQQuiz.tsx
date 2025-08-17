import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { MCQ, Progress } from '@/lib/types';
import { FileQuestion, Check, X, RotateCw } from 'lucide-react';

interface MCQQuizProps {
  mcqs: MCQ[];
  progress: Progress;
  setProgress: React.Dispatch<React.SetStateAction<Progress>>;
}

export default function MCQQuiz({ mcqs, progress, setProgress }: MCQQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [localScore, setLocalScore] = useState(0);

  useEffect(() => {
    // Reset state when mcqs prop changes
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setLocalScore(0);
  }, [mcqs]);

  if (!mcqs || mcqs.length === 0) {
    return (
      <Card>
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><FileQuestion className="h-5 w-5"/>Multiple-Choice Questions</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          No questions available. Generate some from your notes!
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = mcqs[currentQuestionIndex];
  const isQuizFinished = currentQuestionIndex >= mcqs.length;
  
  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;
    setIsAnswered(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setLocalScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setProgress(prev => ({
        ...prev,
        mcqsAttempted: prev.mcqsAttempted + 1,
        mcqsCorrect: selectedAnswer === currentQuestion.correctAnswer ? prev.mcqsCorrect + 1 : prev.mcqsCorrect,
    }));
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(prev => prev + 1);
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setLocalScore(0);
    setProgress(prev => ({...prev, mcqsAttempted: 0, mcqsCorrect: 0}))
  };

  if (isQuizFinished) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Quiz Complete!</CardTitle>
                <CardDescription>You've finished the quiz. Here's how you did.</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <p className="text-2xl font-bold">Your Score: {localScore} / {mcqs.length}</p>
                <div className="w-full bg-secondary rounded-full h-4">
                    <div className="bg-primary h-4 rounded-full" style={{ width: `${(localScore / mcqs.length) * 100}%` }}></div>
                </div>
                <Button onClick={handleRestart}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    Take Again
                </Button>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2"><FileQuestion className="h-5 w-5"/>Multiple-Choice Questions</CardTitle>
        <CardDescription>Question {currentQuestionIndex + 1} of {mcqs.length}</CardDescription>
        <ProgressBar value={((currentQuestionIndex + 1) / mcqs.length) * 100} className="mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="font-medium text-lg">{currentQuestion.question}</p>
          <RadioGroup
            value={selectedAnswer || ''}
            onValueChange={setSelectedAnswer}
            disabled={isAnswered}
          >
            {currentQuestion.options.map((option, index) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;
              
              return (
              <div
                key={index}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-md border transition-all",
                  isAnswered && isCorrect && "bg-green-500/20 border-green-500",
                  isAnswered && isSelected && !isCorrect && "bg-red-500/20 border-red-500"
                )}
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                {isAnswered && isCorrect && <Check className="h-5 w-5 text-green-500" />}
                {isAnswered && isSelected && !isCorrect && <X className="h-5 w-5 text-red-500" />}
              </div>
            )})}
          </RadioGroup>
          <div className="flex justify-end">
            {isAnswered ? (
                 <Button onClick={handleNextQuestion}>Next Question</Button>
            ) : (
                <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>Submit Answer</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
