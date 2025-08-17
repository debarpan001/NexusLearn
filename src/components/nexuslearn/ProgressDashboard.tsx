'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Progress } from '@/lib/types';
import { BarChart2, CheckCircle, Target } from 'lucide-react';

interface ProgressDashboardProps {
  progress: Progress;
}

const COLORS = ['hsl(var(--chart-2))', 'hsl(var(--destructive))'];

export default function ProgressDashboard({ progress }: ProgressDashboardProps) {
  const mcqData = [
    { name: 'MCQs', Correct: progress.mcqsCorrect, Incorrect: progress.mcqsAttempted - progress.mcqsCorrect },
  ];

  const flashcardPieData = [
    { name: 'Correct', value: progress.flashcardsCorrect },
    { name: 'Incorrect', value: (progress.flashcardsViewed - progress.flashcardsCorrect) > 0 ? (progress.flashcardsViewed - progress.flashcardsCorrect) : 0 },
  ];
  
  const mcqAccuracy = progress.mcqsAttempted > 0 ? Math.round((progress.mcqsCorrect / progress.mcqsAttempted) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <BarChart2 className="h-6 w-6"/>
            Progress Dashboard
        </CardTitle>
        <CardDescription>Track your performance and stay on top of your study goals.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-headline flex items-center gap-2 text-muted-foreground">
                        <Target className="h-5 w-5"/>
                        MCQ Accuracy
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold text-primary">{mcqAccuracy}%</p>
                    <p className="text-sm text-muted-foreground">{progress.mcqsCorrect} of {progress.mcqsAttempted} correct</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-headline flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="h-5 w-5"/>
                        Summary Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {progress.summaryRead ? (
                        <>
                            <p className="text-4xl font-bold text-green-500">Read</p>
                            <p className="text-sm text-muted-foreground">Great job reviewing!</p>
                        </>
                    ) : (
                        <>
                            <p className="text-4xl font-bold">Unread</p>
                            <p className="text-sm text-muted-foreground">Don't forget to review.</p>
                        </>
                    )}
                </CardContent>
            </Card>
            <div className="sm:col-span-2">
                <h3 className="font-headline mb-4 text-center text-lg">Question Performance</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={mcqData} layout="vertical" barSize={30}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" hide/>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            borderColor: 'hsl(var(--border))',
                            borderRadius: 'var(--radius)'
                          }}
                        />
                        <Legend wrapperStyle={{paddingTop: '1rem'}} />
                        <Bar dataKey="Correct" stackId="a" fill="hsl(var(--chart-2))" radius={[4, 0, 0, 4]} />
                        <Bar dataKey="Incorrect" stackId="a" fill="hsl(var(--destructive))" radius={[0, 4, 4, 0]}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className="md:col-span-1 flex flex-col items-center">
            <h3 className="font-headline mb-4 text-center text-lg">Flashcard Mastery</h3>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={flashcardPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        stroke="hsl(var(--border))"
                    >
                        {flashcardPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: 'var(--radius)'
                        }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
             <p className="text-sm text-muted-foreground mt-4">{progress.flashcardsCorrect} of {progress.flashcardsViewed} viewed flashcards correct</p>
        </div>
      </CardContent>
    </Card>
  );
}
