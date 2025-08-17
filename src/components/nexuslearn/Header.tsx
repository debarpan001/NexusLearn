import React from 'react';
import { BrainCircuit, GraduationCap } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
            <div className="mr-4 flex items-center">
                <a className="flex items-center gap-2" href="/">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                    <h1 className="text-2xl font-bold font-headline text-foreground">
                    NexusLearn
                    </h1>
                </a>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-2">
                <Avatar>
                    <AvatarFallback>
                        <GraduationCap />
                    </AvatarFallback>
                </Avatar>
            </div>
        </div>
    </header>
  );
}
