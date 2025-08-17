// src/ai/flows/create-flashcards.ts
'use server';

/**
 * @fileOverview A flashcard creation AI agent.
 *
 * - createFlashcards - A function that handles the flashcard creation process.
 * - CreateFlashcardsInput - The input type for the createFlashcards function.
 * - CreateFlashcardsOutput - The return type for the createFlashcards function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateFlashcardsInputSchema = z.object({
  lectureNotes: z
    .string()
    .describe('The lecture notes to generate flashcards from.'),
});
export type CreateFlashcardsInput = z.infer<typeof CreateFlashcardsInputSchema>;

const CreateFlashcardsOutputSchema = z.object({
  flashcards: z.array(
    z.object({
      front: z.string().describe('The front of the flashcard.'),
      back: z.string().describe('The back of the flashcard.'),
    })
  ).describe('The generated flashcards.'),
});
export type CreateFlashcardsOutput = z.infer<typeof CreateFlashcardsOutputSchema>;

export async function createFlashcards(input: CreateFlashcardsInput): Promise<CreateFlashcardsOutput> {
  return createFlashcardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createFlashcardsPrompt',
  input: {schema: CreateFlashcardsInputSchema},
  output: {schema: CreateFlashcardsOutputSchema},
  prompt: `You are an expert educator specializing in creating flashcards for students.

  You will use the following lecture notes to create flashcards.

  The AI tool should consider context clues to create meaningful pairings of prompts and responses.

  Lecture Notes: {{{lectureNotes}}}`,
});

const createFlashcardsFlow = ai.defineFlow(
  {
    name: 'createFlashcardsFlow',
    inputSchema: CreateFlashcardsInputSchema,
    outputSchema: CreateFlashcardsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
