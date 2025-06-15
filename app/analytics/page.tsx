"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { getSupabaseClient } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UserPracticeData {
  user_id: string;
  last_score: number | null;
  total_questions: number | null;
  questions_attempted: number;
  completed_at: string | null;
}

export default function AnalyticsPage() {
  const { user, loading: authLoading } = useAuth();
  const [practiceData, setPracticeData] = useState<UserPracticeData | null>(
    null
  );
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseClient();

  useEffect(() => {
    const fetchPracticeData = async () => {
      if (!user || authLoading) {
        setLoadingData(false);
        return;
      }

      setLoadingData(true);
      setError(null);
      const { data, error: dbError } = await supabase
        .from("user_practice_data")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (dbError && dbError.code !== "PGRST116") {
        // PGRST116 means no rows found, which is fine for new users
        console.error("Error fetching practice data:", dbError);
        setError("Failed to load practice data. Please try again.");
        setPracticeData(null); // Ensure data is null on real errors
      } else if (data) {
        // @ts-expect-error - all of this is so stupid
        setPracticeData(data);
      } else {
        // If no data found (PGRST116 error), initialize with default values
        setPracticeData({
          user_id: user.id,
          last_score: null,
          total_questions: null,
          questions_attempted: 0,
          completed_at: null,
        });
      }
      setLoadingData(false);
    };

    fetchPracticeData();
  }, [user, authLoading, supabase]);

  // Calculate lastScorePercentage safely
  const lastScorePercentage =
    practiceData?.last_score !== null &&
    practiceData?.total_questions &&
    practiceData.total_questions > 0
      ? Math.round(
          (practiceData.last_score / practiceData.total_questions) * 100
        )
      : 0;

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">
          Loading user data...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center px-4">
        <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Please sign in to view your personalized analytics.
        </p>
        <Button asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    );
  }

  if (loadingData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">
          Loading your analytics...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center px-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Error</h1>
        <p className="text-lg text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <BarChart className="h-9 w-9" />
          Your Analytics
        </h1>
        <p className="text-lg text-muted-foreground">
          Welcome, {user.name || user.email}! Here's a summary of your practice
          progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Total Questions Attempted</CardTitle>
            <CardDescription>Across all practice sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-primary">
              {practiceData?.questions_attempted || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Last Quiz Score</CardTitle>
            <CardDescription>
              Your performance on the most recent quiz
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* This check is already robust */}
            {practiceData &&
            practiceData.last_score !== null &&
            practiceData.total_questions !== null ? (
              <>
                <div className="text-5xl font-bold text-primary">
                  {practiceData.last_score}/{practiceData.total_questions}
                </div>
                <Progress value={lastScorePercentage} className="w-full mt-4" />
                <p className="text-sm text-muted-foreground mt-2">
                  {lastScorePercentage}% Correct
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">No quiz completed yet.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Last Practice Session</CardTitle>
            <CardDescription>When you last completed a quiz</CardDescription>
          </CardHeader>
          <CardContent>
            {practiceData?.completed_at ? (
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="h-5 w-5 text-muted-foreground" />
                {new Date(practiceData.completed_at).toLocaleString()}
              </div>
            ) : (
              <p className="text-muted-foreground">No quiz completed yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {practiceData?.questions_attempted === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <p className="text-lg text-muted-foreground mb-4">
              It looks like you haven't completed any practice questions yet.
            </p>
            <Button asChild size="lg">
              <Link href="/practice">Start Your First Practice Quiz</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tips for Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
              <span>
                **Review Explanations:** After each practice question, carefully
                read the explanation for both correct and incorrect answers.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
              <span>
                **Identify Weak Areas:** Pay attention to the periods or themes
                where you consistently score lower.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
              <span>
                **Revisit Course Content:** Go back to the "Course Content" and
                "Course Themes" pages to reinforce knowledge in challenging
                areas.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-purple-500 flex-shrink-0 mt-1" />
              <span>
                **Consistent Practice:** Regular, short practice sessions are
                more effective than infrequent, long ones.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
