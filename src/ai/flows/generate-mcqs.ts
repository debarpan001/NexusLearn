'use server';

/**
 * @fileOverview A multiple-choice question generator AI agent.
 *
 * - generateMCQs - A function that handles the generation of MCQs from lecture notes.
 * - GenerateMCQsInput - The input type for the generateMCQs function.
 * - GenerateMCQsOutput - The return type for the generateMCQs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMCQsInputSchema = z.object({
  lectureNotes: z
    .string()
    .describe('The lecture notes to generate multiple-choice questions from.'),
});
export type GenerateMCQsInput = z.infer<typeof GenerateMCQsInputSchema>;

const GenerateMCQsOutputSchema = z.object({
  mcqs: z.array(
    z.object({
      question: z.string().describe('The multiple-choice question.'),
      options: z.array(z.string()).describe('The possible answers.'),
      correctAnswer: z.string().describe('The correct answer to the question.'),
    })
  ).describe('The generated multiple-choice questions.'),
  progress: z.string().describe('Progress summary of the MCQs generated.'),
});
export type GenerateMCQsOutput = z.infer<typeof GenerateMCQsOutputSchema>;

export async function generateMCQs(input: GenerateMCQsInput): Promise<GenerateMCQsOutput> {
  return generateMCQsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMCQsPrompt',
  input: {schema: GenerateMCQsInputSchema},
  output: {schema: GenerateMCQsOutputSchema},
  prompt: `You are an expert educator specializing in creating effective multiple-choice questions.

  Based on the provided lecture notes, generate a set of multiple-choice questions to test the student's understanding of the material.
  Each question should have 4 possible answers, with one correct answer.

  Lecture Notes: {{{lectureNotes}}}
  Output the MCQs in JSON format.
  `, // Ensure output is valid JSON.
});

const generateMCQsFlow = ai.defineFlow(
  {
    name: 'generateMCQsFlow',
    inputSchema: GenerateMCQsInputSchema,
    outputSchema: GenerateMCQsOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return {
        ...output!,
        progress: 'Generated multiple-choice questions from the lecture notes.',
      };
    } catch (error) {
      // Add detailed logging here
      console.error('Error in generateMCQsFlow:', error);
      // Re-throw the error
      throw error;
    }
  }
);
