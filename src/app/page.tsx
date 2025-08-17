'use client';

import React, { useState, useTransition } from 'react';
import { Bot, FileText, Loader2 } from 'lucide-react';

import type { Flashcard, MCQ, Progress } from '@/lib/types';
import { generateStudyAids } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

import Header from '@/components/nexuslearn/Header';
import Footer from '@/components/nexuslearn/Footer';
import NoteUploader from '@/components/nexuslearn/NoteUploader';
import ProgressDashboard from '@/components/nexuslearn/ProgressDashboard';
import StudyPlan from '@/components/nexuslearn/StudyPlan';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SummaryDisplay from '@/components/nexuslearn/SummaryDisplay';
import MCQQuiz from '@/components/nexuslearn/MCQQuiz';
import FlashcardViewer from '@/components/nexuslearn/FlashcardViewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NexusLearnHomePage() {
  const [lectureNotes, setLectureNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [progress, setProgress] = useState<Progress>({
    mcqsAttempted: 0,
    mcqsCorrect: 0,
    flashcardsViewed: 0,
    flashcardsCorrect: 0,
    summaryRead: false,
  });

  const handleGenerate = () => {
    if (lectureNotes.trim().length < 50) {
      toast({
        title: 'Error',
        description: 'Please provide more detailed lecture notes (at least 50 characters).',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await generateStudyAids(lectureNotes);
        if (result) {
          setSummary(result.summary || '');
          setMcqs(result.mcqs || []);
          setFlashcards(result.flashcards || []);
          toast({
            title: 'Success!',
            description: 'Your study materials have been generated.',
          });
        }
      } catch (error) {
        console.error('Failed to generate study aids:', error);
        toast({
          title: 'Generation Failed',
          description: 'There was an error generating your study materials. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  const hasGeneratedContent = summary || mcqs.length > 0 || flashcards.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid gap-8">
          <NoteUploader
            onGenerate={handleGenerate}
            isLoading={isPending}
            setLectureNotes={setLectureNotes}
            lectureNotes={lectureNotes}
          />
          
          {isPending && (
            <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-lg bg-card border text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <h2 className="text-2xl font-headline">NexusLearn is thinking...</h2>
              <p className="text-muted-foreground">Generating your personalized study materials. This might take a moment.</p>
            </div>
          )}

          {!isPending && hasGeneratedContent && (
            <>
              <ProgressDashboard progress={progress} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Tabs defaultValue="summary" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                      <TabsTrigger value="mcqs">MCQs</TabsTrigger>
                      <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                    </TabsList>
                    <TabsContent value="summary">
                      <SummaryDisplay summary={summary} progress={progress} setProgress={setProgress} />
                    </TabsContent>
                    <TabsContent value="mcqs">
                      <MCQQuiz mcqs={mcqs} progress={progress} setProgress={setProgress} />
                    </TabsContent>
                    <TabsContent value="flashcards">
                      <FlashcardViewer flashcards={flashcards} progress={progress} setProgress={setProgress} />
                    </TabsContent>
                  </Tabs>
                </div>
                <div className="lg:col-span-1">
                  <StudyPlan />
                </div>
              </div>
            </>
          )}

          {!isPending && !hasGeneratedContent && (
             <Card className="text-center py-16 px-8 border-dashed border-2">
                <CardHeader>
                    <div className="mx-auto bg-secondary p-4 rounded-full w-fit">
                        <Bot className="h-12 w-12 text-primary" />
                    </div>
                  <CardTitle className="font-headline text-2xl mt-4">Welcome to NexusLearn</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    To get started, paste your lecture notes in the box above and let our AI create summaries, quizzes, and flashcards tailored just for you.
                  </p>
                </CardContent>
             </Card>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
