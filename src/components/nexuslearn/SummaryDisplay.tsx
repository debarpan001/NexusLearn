import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Progress } from '@/lib/types';
import { BookOpen, CheckCircle } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface SummaryDisplayProps {
  summary: string;
  progress: Progress;
  setProgress: React.Dispatch<React.SetStateAction<Progress>>;
}

export default function SummaryDisplay({ summary, progress, setProgress }: SummaryDisplayProps) {
  const handleMarkAsRead = () => {
    setProgress(prev => ({ ...prev, summaryRead: true }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <BookOpen className="h-5 w-5"/>
            AI Summary
        </CardTitle>
        <CardDescription>A concise overview of your lecture notes.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full pr-4">
            <p className="whitespace-pre-wrap text-base leading-relaxed">
                {summary}
            </p>
        </ScrollArea>
        <div className="mt-4 flex justify-end">
            <Button onClick={handleMarkAsRead} disabled={progress.summaryRead} variant={progress.summaryRead ? "secondary" : "default"}>
                <CheckCircle className="mr-2 h-4 w-4" />
                {progress.summaryRead ? 'Marked as Read' : 'Mark as Read'}
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
