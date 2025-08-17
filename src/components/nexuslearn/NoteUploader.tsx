import React from 'react';
import { Bot, Sparkles, Loader2, UploadCloud } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setLectureNotes(text);
      };
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Bot className="h-6 w-6" />
          Your AI Study Assistant
        </CardTitle>
        <CardDescription>
          Paste your lecture notes below, or upload a document. Our AI will generate a summary, multiple-choice questions, and flashcards to help you study.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-4">
          <Textarea
            placeholder="Paste your lecture notes here..."
            className="min-h-[200px] text-base resize-y bg-background/50 focus:bg-background"
            value={lectureNotes}
            onChange={(e) => setLectureNotes(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <Button onClick={handleUploadClick} variant="outline" disabled={isLoading}>
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
              <Input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange}
              />
            </div>
            <Button onClick={onGenerate} disabled={isLoading || !lectureNotes.trim()} className="w-full sm:w-auto" size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Study Materials
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
