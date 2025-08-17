import React from 'react';
import { Bot, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface NoteUploaderProps {
  onGenerate: () => void;
  isLoading: boolean;
  lectureNotes: string;
  setLectureNotes: (notes: string) => void;
}

export default function NoteUploader({
  onGenerate,
  isLoading,
  lectureNotes,
  setLectureNotes,
}: NoteUploaderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Bot className="h-6 w-6" />
          Your AI Study Assistant
        </CardTitle>
        <CardDescription>
          Paste your lecture notes below. Our AI will generate a summary, multiple-choice questions, and flashcards to help you study.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-4">
          <Textarea
            placeholder="Paste your lecture notes here..."
            className="min-h-[200px] text-base resize-y"
            value={lectureNotes}
            onChange={(e) => setLectureNotes(e.target.value)}
            disabled={isLoading}
          />
          <Button onClick={onGenerate} disabled={isLoading || !lectureNotes.trim()} className="w-full sm:w-auto sm:ml-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Study Materials'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
