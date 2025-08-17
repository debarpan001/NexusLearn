import { config } from 'dotenv';
config();

import '@/ai/flows/create-flashcards.ts';
import '@/ai/flows/summarize-notes.ts';
import '@/ai/flows/generate-mcqs.ts';