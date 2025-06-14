"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/auth-provider";
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  period: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface UserPracticeData {
  user_id: string;
  last_score: number | null;
  total_questions: number | null;
  questions_attempted: number;
  completed_at: string | null;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question:
      "Which trade network was most important for connecting Europe, Asia, and Africa during the period 1200-1450?",
    options: [
      "The Silk Roads",
      "The Indian Ocean trade network",
      "The Trans-Saharan trade routes",
      "The Mediterranean Sea trade",
    ],
    correct: 1,
    explanation:
      "The Indian Ocean trade network was the most extensive and important trade system connecting Europe, Asia, and Africa during this period, facilitating the exchange of goods, ideas, and technologies.",
    period: "Period 2",
    difficulty: "Medium",
  },
  {
    id: 2,
    question:
      "What was the primary cause of the decline of the Byzantine Empire?",
    options: [
      "The Black Death",
      "Mongol invasions",
      "Ottoman expansion",
      "Crusader attacks",
    ],
    correct: 2,
    explanation:
      "The Ottoman Empire's expansion was the primary cause of the Byzantine Empire's decline, culminating in the conquest of Constantinople in 1453.",
    period: "Period 3",
    difficulty: "Easy",
  },
  {
    id: 3,
    question: "Which of the following best describes the Columbian Exchange?",
    options: [
      "The exchange of precious metals between Spain and its colonies",
      "The transfer of plants, animals, and diseases between the Americas and the Old World",
      "The trade of manufactured goods for raw materials",
      "The exchange of slaves for sugar and tobacco",
    ],
    correct: 1,
    explanation:
      "The Columbian Exchange refers to the widespread transfer of plants, animals, cultures, human populations, technology, and diseases between the Americas and the Old World following Columbus's voyages.",
    period: "Period 4",
    difficulty: "Hard",
  },
];

export default function PracticePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const [practiceData, setPracticeData] = useState<UserPracticeData | null>(
    null
  );
  const { user, loading: authLoading } = useAuth();
  const supabase = getSupabaseClient();

  useEffect(() => {
    const fetchPracticeData = async () => {
      if (user && !authLoading) {
        const { data, error } = await supabase
          .from("user_practice_data")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          // PGRST116 means no rows found
          console.error("Error fetching practice data:", error);
        } else if (data) {
          setPracticeData(data as unknown as UserPracticeData);
        } else {
          setPracticeData({
            user_id: user.id,
            last_score: null,
            total_questions: null,
            questions_attempted: 0,
            completed_at: null,
          });
        }
      } else if (!user && !authLoading) {
        setPracticeData(null); // Clear data if logged out
      }
    };
    fetchPracticeData();
  }, [user, authLoading, supabase]);

  const savePracticeData = async (dataToSave: Partial<UserPracticeData>) => {
    if (!user) {
      console.warn("Attempted to save practice data without a logged-in user.");
      return; // Can't save if not logged in
    }

    console.log("Attempting to save practice data:", dataToSave);
    const { data, error } = await supabase
      .from("user_practice_data")
      .upsert(
        {
          user_id: user.id,
          ...dataToSave,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
      .select()
      .single(); // Select the updated row to get fresh data

    if (error) {
      console.error("Error saving practice data to Supabase:", error);
      // Optionally, set an error state here to display to the user
    } else {
      console.log("Practice data saved successfully:", data);
      if (data) {
        setPracticeData(data as unknown as UserPracticeData);
      }
    }
  };

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleSubmitAnswer = () => {
    const answerIndex = Number.parseInt(selectedAnswer);
    const newUserAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newUserAnswers);

    if (answerIndex === sampleQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowResult(false);
    } else {
      // Quiz completed
      const finalScore = score;
      savePracticeData({
        last_score: finalScore,
        total_questions: sampleQuestions.length,
        questions_attempted:
          (practiceData?.questions_attempted || 0) + sampleQuestions.length,
        completed_at: new Date().toISOString(),
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowResult(false);
    setScore(0);
    setUserAnswers([]);
  };

  // Determine if quiz is completed for rendering the results screen
  const isQuizCompleted =
    currentQuestion === sampleQuestions.length - 1 && showResult;

  // Calculate finalScore for display on the results screen
  // This should only be calculated when the quiz is actually completed and results are shown
  const finalScoreForDisplay = isQuizCompleted
    ? score // Use the accumulated score directly
    : score +
      (Number.parseInt(selectedAnswer) ===
      sampleQuestions[currentQuestion].correct
        ? 1
        : 0); // For current question if not yet moved to next

  const percentage = Math.round(
    (finalScoreForDisplay / sampleQuestions.length) * 100
  );

  if (isQuizCompleted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
            <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
            <CardDescription>Here are your results</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                {finalScoreForDisplay}/{sampleQuestions.length}
              </div>
              <div className="text-lg text-muted-foreground">
                {percentage}% Correct
              </div>
            </div>

            <Progress value={percentage} className="w-full" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <div className="font-semibold text-green-700 dark:text-green-400">
                  Correct
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {finalScoreForDisplay}
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <div className="font-semibold text-red-700 dark:text-red-400">
                  Incorrect
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {sampleQuestions.length - finalScoreForDisplay}
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <div className="font-semibold text-blue-700 dark:text-blue-400">
                  Accuracy
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {percentage}%
                </div>
              </div>
            </div>

            <Button onClick={resetQuiz} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Practice Questions</h1>
        <p className="text-lg text-muted-foreground">
          Test your knowledge with AP World History practice questions.
        </p>
        {user && practiceData && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>Your Progress:</strong> {practiceData.questions_attempted}{" "}
              questions attempted
              {practiceData.last_score !== null && (
                <span className="ml-4">
                  <strong>Last Score:</strong> {practiceData.last_score}/
                  {practiceData.total_questions}
                </span>
              )}
            </p>
          </div>
        )}
        {!user && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
            Sign in to save your practice progress!
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {sampleQuestions.length}
            </span>
            <div className="flex gap-2">
              <Badge variant="outline">{question.period}</Badge>
              <Badge
                variant={
                  question.difficulty === "Easy"
                    ? "default"
                    : question.difficulty === "Medium"
                    ? "secondary"
                    : "destructive"
                }
              >
                {question.difficulty}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={selectedAnswer}
              onValueChange={handleAnswerSelect}
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option}
                  </Label>
                  {showResult && (
                    <div className="ml-2">
                      {index === question.correct ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : index === Number.parseInt(selectedAnswer) ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : null}
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>

            {showResult && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Explanation:</h4>
                <p className="text-sm">{question.explanation}</p>
              </div>
            )}

            <div className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
              </div>
              <div>
                {!showResult ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion}>
                    {currentQuestion < sampleQuestions.length - 1
                      ? "Next Question"
                      : "Finish Quiz"}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
