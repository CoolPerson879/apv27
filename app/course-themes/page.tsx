import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Cpu,
  Banknote,
  Users,
  Crown,
  Zap,
  Building,
  Leaf,
  Brain,
  HeartHandshake,
} from "lucide-react";

const themes = [
  {
    id: 1,
    title: "Humans and the Environment",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    description:
      "Interaction between humans and the environment shaped both human societies and the environment itself.",
    keyPoints: [
      "Demography and disease",
      "Migration patterns",
      "Patterns of settlement",
      "Technology and environment",
    ],
    examples: [
      "The spread of the Black Death",
      "Agricultural revolutions",
      "Deforestation and urbanization",
      "Climate change impacts on societies",
    ],
    abv: "ENV",
  },
  {
    id: 2,
    title: "Cultural Developments and Interactions",
    icon: HeartHandshake,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    description:
      "Development, interaction, and transformation of belief systems, philosophies, and ideologies.",
    keyPoints: [
      "Religions and belief systems",
      "Philosophy and ideology",
      "Science and technology",
      "Arts and architecture",
    ],
    examples: [
      "Spread of Buddhism and Islam",
      "Renaissance humanism",
      "Scientific Revolution",
      "Cultural syncretism in the Americas",
    ],
    abv: "CDI",
  },
  {
    id: 3,
    title: "Governance",
    icon: Crown,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    description:
      "Development and transformation of political institutions, leaders, and political theories.",
    keyPoints: [
      "Political structures and forms of governance",
      "Empires and nations",
      "Revolts and revolutions",
      "Regional, transregional, and global structures",
    ],
    examples: [
      "Rise and fall of empires",
      "Democratic revolutions",
      "Decolonization movements",
      "International organizations",
    ],
    abv: "GOV",
  },
  {
    id: 4,
    title: "Economic Systems",
    icon: Banknote,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    description:
      "Creation, expansion, and interaction of economic systems including trade networks.",
    keyPoints: [
      "Agricultural and pastoral production",
      "Trade and commerce",
      "Labor systems",
      "Industrialization and capitalism",
    ],
    examples: [
      "Silk Roads trade networks",
      "Atlantic slave trade",
      "Industrial Revolution",
      "Global capitalism",
    ],
    abv: "ECN",
  },
  {
    id: 5,
    title: "Social Interactions and Organization",
    icon: Users,
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    description:
      "Development and transformation of social structures, gender roles, and family structures.",
    keyPoints: [
      "Social hierarchies and social mobility",
      "Gender roles and relations",
      "Family and kinship structures",
      "Racial and ethnic constructions",
    ],
    examples: [
      "Caste systems",
      "Women's rights movements",
      "Slavery and abolition",
      "Social reform movements",
    ],
    abv: "SIO",
  },
  {
    id: 6,
    title: "Technology and Innovation",
    icon: Cpu,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    description:
      "Development and interaction of technology, innovation, and their effects on society.",
    keyPoints: [
      "Agricultural technologies",
      "Transportation innovations",
      "Communication technologies",
      "Military technologies",
    ],
    examples: [
      "Printing press",
      "Maritime navigation tools",
      "Steam engine",
      "Internet and globalization",
    ],
    abv: "TEC",
  },
];

export default function CourseThemesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Course Themes</h1>
        <p className="text-lg text-muted-foreground">
          Master the six major themes that organize AP World History content and
          provide analytical frameworks for understanding historical
          developments.
        </p>
      </div>

      <div className="grid gap-6">
        {themes.map((theme) => {
          const IconComponent = theme.icon;
          return (
            <Card key={theme.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${theme.bgColor}`}>
                    <IconComponent className={`h-8 w-8 ${theme.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{theme.title}</CardTitle>
                      <Badge variant="outline">{theme.abv}</Badge>
                    </div>
                    <CardDescription className="text-base">
                      {theme.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Key Points</h4>
                    <ul className="space-y-2">
                      {theme.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Historical Examples</h4>
                    <ul className="space-y-2">
                      {theme.examples.map((example, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${theme.color.replace(
                              "text-",
                              "bg-"
                            )}`}
                          />
                          <span className="text-sm">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How to Use the Themes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">For Analysis</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  • Use themes to organize your thinking about historical
                  developments
                </li>
                <li>
                  • Look for connections between different themes in the same
                  time period
                </li>
                <li>
                  • Compare how themes manifest differently across regions
                </li>
                <li>• Trace changes in themes over time</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Essays</h4>
              <ul className="space-y-2 text-sm">
                <li>• Structure arguments around thematic analysis</li>
                <li>
                  • Use specific historical evidence to support thematic claims
                </li>
                <li>
                  • Show understanding of continuity and change within themes
                </li>
                <li>• Demonstrate connections between multiple themes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
