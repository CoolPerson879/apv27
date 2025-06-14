import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen } from "lucide-react"

const periods = [
  {
    id: 1,
    title: "Period 1: The Global Tapestry (c. 1200 to c. 1450)",
    description: "Development and interaction of early agricultural and pastoral societies",
    topics: [
      "Silk Roads and trade networks",
      "Indian Ocean trading",
      "Trans-Saharan trade",
      "Mongol Empire",
      "Islamic expansion",
      "Medieval Europe",
    ],
    timeframe: "c. 1200-1450 CE",
  },
  {
    id: 2,
    title: "Period 2: Networks of Exchange (c. 1200 to c. 1450)",
    description: "Improved transportation technologies and commercial practices",
    topics: [
      "Silk Roads revival",
      "Indian Ocean trade expansion",
      "Trans-Saharan trade growth",
      "Cultural transfers",
      "Disease transmission",
      "Environmental effects",
    ],
    timeframe: "c. 1200-1450 CE",
  },
  {
    id: 3,
    title: "Period 3: Land-Based Empires (c. 1450 to c. 1750)",
    description: "Empires expanded using gunpowder, cannons, and armed trade",
    topics: [
      "Ottoman Empire",
      "Safavid Empire",
      "Mughal Empire",
      "Qing Dynasty",
      "Russian Empire",
      "European maritime empires",
    ],
    timeframe: "c. 1450-1750 CE",
  },
  {
    id: 4,
    title: "Period 4: Transoceanic Interconnections (c. 1450 to c. 1750)",
    description: "European technological developments in shipbuilding and navigation",
    topics: [
      "Columbian Exchange",
      "Atlantic slave trade",
      "Maritime empires",
      "Mercantilism",
      "Coercive labor systems",
      "Cultural synthesis",
    ],
    timeframe: "c. 1450-1750 CE",
  },
  {
    id: 5,
    title: "Period 5: Revolutions (c. 1750 to c. 1900)",
    description: "Political and industrial revolutions altered global power",
    topics: [
      "Industrial Revolution",
      "Atlantic Revolutions",
      "Nationalism",
      "Imperialism",
      "Abolition movements",
      "Women's rights",
    ],
    timeframe: "c. 1750-1900 CE",
  },
  {
    id: 6,
    title: "Period 6: Consequences of Industrialization (c. 1750 to c. 1900)",
    description: "Industrialization fundamentally changed how people lived",
    topics: [
      "Industrial Revolution spread",
      "New imperialism",
      "Migration patterns",
      "Social changes",
      "Environmental impact",
      "Economic systems",
    ],
    timeframe: "c. 1750-1900 CE",
  },
]

export default function CourseContentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Course Content</h1>
        <p className="text-lg text-muted-foreground">
          Explore the six major periods of AP World History with comprehensive study materials and key concepts.
        </p>
      </div>

      <div className="grid gap-6">
        {periods.map((period) => (
          <Card key={period.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{period.title}</CardTitle>
                  <CardDescription className="text-base mb-3">{period.description}</CardDescription>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {period.timeframe}
                  </div>
                </div>
                <Badge variant="outline" className="ml-4">
                  Period {period.id}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Key Topics
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {period.topics.map((topic, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Study Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <span>Focus on understanding patterns and connections across periods</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <span>Practice analyzing primary and secondary sources</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <span>Master the six AP World History themes</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <span>Create timelines to visualize chronological relationships</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
