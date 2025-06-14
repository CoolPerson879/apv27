import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, BookOpen, Video, FileText, Globe, Users, Download } from "lucide-react"
import Link from "next/link"

const resources = [
  {
    id: 1,
    title: "College Board AP World History Course Description",
    description: "Official course and exam description with detailed curriculum framework",
    type: "Official Document",
    icon: FileText,
    url: "https://apcentral.collegeboard.org/media/pdf/ap-world-history-modern-course-and-exam-description.pdf",
    tags: ["Official", "Curriculum", "Exam Info"],
  },
  {
    id: 2,
    title: "Khan Academy AP World History",
    description: "Free video lessons and practice materials covering all periods of AP World History",
    type: "Video Course",
    icon: Video,
    url: "https://www.khanacademy.org/humanities/world-history-project-ap",
    tags: ["Free", "Videos", "Comprehensive"],
  },
  {
    id: 3,
    title: "Heimler's History",
    description: "Engaging video series covering major themes and events in world history",
    type: "Video Series",
    icon: Video,
    url: "https://www.youtube.com/@heimlershistory",
    tags: ["Popular", "Engaging", "Overview"],
  },
  {
    id: 4,
    title: "AP World History: Modern Textbook",
    description: "Comprehensive textbook aligned with the current AP World curriculum",
    type: "Textbook",
    icon: BookOpen,
    url: "#",
    tags: ["Comprehensive", "Aligned", "Detailed"],
  },
  {
    id: 5,
    title: "DeAP Learning",
    description: "AI tutor trained on Heimler's History, can grade practice free-response questions",
    type: "Reference",
    icon: Globe,
    url: "https://deaplearning.com/courses/ap-world-history/chat?mode=learn&workshopMode=grader",
    tags: ["Reference", "Detailed", "Scholarly"],
  },
  {
    id: 6,
    title: "AP World History Teachers Community",
    description: "Online community for teachers and students to share resources and strategies",
    type: "Community",
    icon: Users,
    url: "#",
    tags: ["Community", "Discussion", "Support"],
  },
]

const studyGuides = [
  {
    title: "Period 1 Study Guide: The Global Tapestry",
    description: "Comprehensive guide covering 1200-1450 CE",
    downloadUrl: "#",
  },
  {
    title: "Period 2 Study Guide: Networks of Exchange",
    description: "Trade networks and cultural exchange 1200-1450 CE",
    downloadUrl: "#",
  },
  {
    title: "Period 3 Study Guide: Land-Based Empires",
    description: "Gunpowder empires and political developments 1450-1750 CE",
    downloadUrl: "#",
  },
  {
    title: "DBQ Writing Guide",
    description: "Step-by-step guide to writing Document-Based Questions",
    downloadUrl: "#",
  },
  {
    title: "LEQ Essay Templates",
    description: "Templates and examples for Long Essay Questions",
    downloadUrl: "#",
  },
]

const examTips = [
  {
    section: "Multiple Choice",
    tips: [
      "Read questions carefully and identify the time period",
      "Eliminate obviously wrong answers first",
      "Look for key words that indicate the correct theme",
      "Practice with released College Board questions",
    ],
  },
  {
    section: "Short Answer Questions (SAQ)",
    tips: [
      "Answer all parts of the question (A, B, C)",
      "Use specific historical evidence",
      "Keep answers concise but complete",
      "Practice identifying historical developments, processes, and effects",
    ],
  },
  {
    section: "Document-Based Question (DBQ)",
    tips: [
      "Analyze all provided documents",
      "Use at least 6 documents in your essay",
      "Include outside historical context",
      "Address the complexity of the issue",
    ],
  },
  {
    section: "Long Essay Question (LEQ)",
    tips: [
      "Choose the question you know best",
      "Create a clear thesis statement",
      "Use specific historical evidence",
      "Address continuity and change over time",
    ],
  },
]

export default function AdditionalResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Additional Resources</h1>
        <p className="text-lg text-muted-foreground">
          Expand your AP World History knowledge with these carefully curated resources, study guides, and exam
          preparation materials.
        </p>
      </div>

      {/* External Resources */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">External Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource) => {
            const IconComponent = resource.icon
            return (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription className="mt-1">{resource.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild size="sm">
                      <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visit
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Study Guides */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Downloadable Study Guides</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studyGuides.map((guide, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">{guide.title}</CardTitle>
                <CardDescription className="text-sm">{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild size="sm" className="w-full">
                  <Link href={guide.downloadUrl}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Exam Tips */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Exam Preparation Tips</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {examTips.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{section.section}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Essential links for AP World History students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild variant="outline" className="h-auto p-4 flex-col">
              <Link href="#" target="_blank">
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-sm">College Board</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex-col">
              <Link href="#" target="_blank">
                <Video className="h-6 w-6 mb-2" />
                <span className="text-sm">Khan Academy</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex-col">
              <Link href="#" target="_blank">
                <Globe className="h-6 w-6 mb-2" />
                <span className="text-sm">World History</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex-col">
              <Link href="#" target="_blank">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">Study Groups</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
