import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Users, Trophy, Target, Globe } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 dark:from-blue-800 dark:via-purple-800 dark:to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Master AP World History</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Comprehensive study materials, practice tests, and expert guidance to help you excel in AP World History
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/practice">Start Practicing</Link>
            </Button>
            {/* Changed styling for "View Content" button */}
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100" // Matches "Start Practicing" button
            >
              <Link href="/course-content">View Content</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Succeed</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Comprehensive Content</CardTitle>
                <CardDescription>Complete coverage of all AP World History periods and themes</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Practice Tests</CardTitle>
                <CardDescription>Hundreds of practice questions with detailed explanations</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Interactive Timeline</CardTitle>
                <CardDescription>Visual timeline of major world events and civilizations</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-10 w-10 text-orange-600 mb-2" />
                <CardTitle>Course Themes</CardTitle>
                <CardDescription>Deep dive into the 6 major themes of AP World History</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-red-600 mb-2" />
                <CardTitle>Expert Help</CardTitle>
                <CardDescription>Get assistance from experienced AP World History teachers</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Trophy className="h-10 w-10 text-yellow-600 mb-2" />
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>Monitor your improvement with detailed analytics</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button asChild variant="outline" className="h-20 text-lg">
              <Link href="/course-content">Course Content</Link>
            </Button>
            <Button asChild variant="outline" className="h-20 text-lg">
              <Link href="/practice">Practice Tests</Link>
            </Button>
            <Button asChild variant="outline" className="h-20 text-lg">
              <Link href="/timeline">Timeline</Link>
            </Button>
            <Button asChild variant="outline" className="h-20 text-lg">
              <Link href="/course-themes">Themes</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
