export interface Flashcard {
  front: string;
  back: string;
}

export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Progress {
  mcqsAttempted: number;
  mcqsCorrect: number;
  flashcardsViewed: number;
  flashcardsCorrect: number;
  summaryRead: boolean;
}
