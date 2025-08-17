'use server';

import { createFlashcards } from '@/ai/flows/create-flashcards';
import { generateMCQs } from '@/ai/flows/generate-mcqs';
import { summarizeNotes } from '@/ai/flows/summarize-notes';
import type { Flashcard, MCQ } from '@/lib/types';

interface StudyAids {
  summary: string | null;
  mcqs: MCQ[] | null;
  flashcards: Flashcard[] | null;
}

export async function generateStudyAids(lectureNotes: string): Promise<StudyAids> {
  try {
    const [summaryResult, mcqResult, flashcardResult] = await Promise.all([
      summarizeNotes({ notes: lectureNotes }),
      generateMCQs({ lectureNotes }),
      createFlashcards({ lectureNotes }),
    ]);

    return {
      summary: summaryResult?.summary || null,
      mcqs: mcqResult?.mcqs || null,
      flashcards: flashcardResult?.flashcards || null,
    };
  } catch (error) {
    console.error("Error generating study aids:", error);
    // Depending on the desired error handling, you might want to throw the error
    // or return a specific error structure.
    throw new Error("Failed to generate study aids.");
  }
}
