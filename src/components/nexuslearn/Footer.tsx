import React from 'react';
import { BrainCircuit } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="container mx-auto flex items-center justify-between p-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5" />
            <p>&copy; {new Date().getFullYear()} NexusLearn. All rights reserved.</p>
        </div>
        <p>
          Developed by{' '}
          <a
            href="https://github.com/Debarpan-says"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            Debarpan
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
