import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Target } from 'lucide-react';

const studyTasks = [
  { id: 'task1', label: 'Review AI-generated summary' },
  { id: 'task2', label: 'Complete all multiple-choice questions' },
  { id: 'task3', label: 'Practice with flashcards (first pass)' },
  { id: 'task4', label: 'Re-read lecture notes on key topics' },
  { id: 'task5', label: 'Practice flashcards again (focus on mistakes)' },
  { id: 'task6', label: 'Take a short break' },
  { id: 'task7', label: 'Re-take MCQ quiz to test knowledge' },
];

export default function StudyPlan() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2 text-2xl">
          <Target className="h-6 w-6" />
          Personalized Study Plan
        </CardTitle>
        <CardDescription>
          A recommended study plan based on your generated materials. Check off tasks as you complete them.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {studyTasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-secondary/50 transition-colors">
              <Checkbox id={task.id} />
              <Label
                htmlFor={task.id}
                className="text-base flex-1 cursor-pointer"
              >
                {task.label}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
