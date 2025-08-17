import React from 'react';
import { BrainCircuit, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-card">
      <div className="flex items-center gap-2">
        <BrainCircuit className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold font-headline text-foreground">
          NexusLearn
        </h1>
      </div>
      <Avatar>
        <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="person student" />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
