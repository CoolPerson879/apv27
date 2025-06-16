import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  HelpCircle,
  BookOpen,
  Users,
  Target,
} from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What is the format of the AP World History exam?",
    answer:
      "The AP World History exam consists of two sections: Section I includes 55 multiple-choice questions (55 minutes) and 3 short-answer questions (40 minutes). Section II includes 1 document-based question (recommended 60 minutes) and 1 long essay question (recommended 40 minutes). The exam is 3 hours and 15 minutes total.",
    category: "Exam Format",
  },
  {
    id: 2,
    question: "How is the AP World History exam scored?",
    answer:
      "The exam is scored on a scale of 1-5. Multiple choice is worth 40%, short answer questions 20%, the DBQ 25%, and the long essay question 15%. Most colleges accept scores of 3 or higher for credit.",
    category: "Scoring",
  },
  {
    id: 3,
    question: "What time periods does AP World History cover?",
    answer:
      "The course spans from c.1200 to present, spread into 4 major periods. Period 1 is around c.1200-1450 (Units 1, 2) Period 2 is from 1450-1750 (Units 3, 4). Period 3 is from 1750-1900 (Units 5, 6) Period 4 is from 1900-present (around 2011 on historical content or 2020 for COVID and other innovations, Units 7, 8, 9)",
    category: "Content",
  },
  {
    id: 4,
    question: "How should I prepare for the DBQ (Document-Based Question)?",
    answer:
      "Practice analyzing historical documents, sourcing for point of view, purpose, audience, and context. Learn to synthesize information from multiple documents and include outside historical knowledge. Practice writing thesis statements and organizing evidence effectively.",
    category: "Study Tips",
  },
  {
    id: 5,
    question: "What are the six themes of AP World History?",
    answer:
      "The six themes are: 1) Humans and the Environment (ENV), 2) Cultural Developments and Interactions (CDI), 3) Governance (GOV), 4) Economic Systems (ECN), 5) Social Interactions and Organization (SIO), and 6) Technology and Innovation (TEC). These themes help organize and analyze historical developments.",
    category: "Content",
  },
  {
    id: 6,
    question: "How much time should I spend studying each day?",
    answer:
      "Aim for 30-60 minutes of focused study daily. This should include reading, note-taking, practice questions, and review. Consistency is more important than cramming. Increase study time as the exam approaches.",
    category: "Study Tips",
  },
];

const studyTips = [
  {
    icon: BookOpen,
    title: "Active Reading",
    description:
      "Take notes while reading, create timelines, and summarize key concepts in your own words.",
  },
  {
    icon: Target,
    title: "Practice Essays",
    description:
      "Write practice DBQs and LEQs regularly. Focus on thesis development and evidence usage.",
  },
  {
    icon: Users,
    title: "Study Groups",
    description:
      "Form study groups to discuss concepts, quiz each other, and share different perspectives.",
  },
  {
    icon: Clock,
    title: "Time Management",
    description:
      "Practice with timed conditions to build stamina and improve pacing for the actual exam.",
  },
];

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
        <p className="text-lg text-muted-foreground">
          Get answers to common questions, study tips, and contact information
          for additional support.
        </p>
      </div>

      {/* Quick Help Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Quick Help</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {studyTips.map((tip, index) => {
            const IconComponent = tip.icon;
            return (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 rounded-lg w-fit">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {tip.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <Card>
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className="px-6"
                >
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{faq.question}</span>
                      <Badge variant="outline" className="ml-auto">
                        {faq.category}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-7">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* Study Resources */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Additional Study Resources</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">
                  Recommended Study Schedule
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>
                      <strong>September-December:</strong> Focus on Periods 1-3,
                      build foundational knowledge
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>
                      <strong>January-March:</strong> Cover Periods 4-6,
                      practice essay writing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>
                      <strong>April-May:</strong> Intensive review, practice
                      exams, final preparation
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Emergency Study Tips</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <span>
                      Focus on major themes and patterns rather than memorizing
                      details
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <span>
                      Practice essay outlines even if you don't write full
                      essays
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <span>
                      Use mnemonics and acronyms to remember key information
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <span>
                      Get plenty of sleep before the exam - don't cram all night
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
