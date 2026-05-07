import Section from "@/components/shared/reusableComponents/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import StillHaveQuestions from "./StillHaveQuestions";

const faqs = [
  {
    question: "What is the primary mission of Eco Pulse?",
    answer: "Eco Pulse is dedicated to accelerating the global transition to sustainability by providing a decentralized platform for innovation. Our mission is to empower individuals and organizations to share, validate, and fund eco-friendly solutions that address critical environmental challenges like climate change, waste management, and resource depletion. We bridge the gap between brilliant ideas and the resources needed to bring them to life.",
  },
  {
    question: "How does the 'Paid Idea' model work for creators?",
    answer: "Creators can choose to offer their detailed implementation plans, research data, or technical blueprints as 'Paid Content.' When a user purchases access to an idea, the funds (minus a small platform fee) are transferred directly to the creator. This model incentivizes high-quality, actionable research and allows environmental innovators to sustain their work while providing value to the community. All transactions are secured and transparent.",
  },
  {
    question: "Is my intellectual property protected on the platform?",
    answer: "We take IP protection seriously. While the summary of your idea is public to attract interest, the core 'secret sauce' or detailed implementation can be kept behind a paywall (Locked Content). Additionally, our terms of service include non-disclosure agreements for certain types of interactions. We recommend that creators only share high-level concepts in the public view and use our secure channels for detailed collaborations.",
  },
  {
    question: "How can I be sure the ideas on Eco Pulse are legitimate?",
    answer: "Eco Pulse uses a community-driven validation system. Ideas are ranked based on upvotes, detailed reviews, and engagement from verified experts in the field. We also have an 'Impact Analysis' tool (AI-driven) that helps evaluate the feasibility and potential environmental benefits of submitted concepts. Always look for the 'Verified' badge or high community ratings when exploring new solutions.",
  },
  {
    question: "Can I collaborate with other users on a specific project?",
    answer: "Absolutely! Eco Pulse is designed for collaboration. Each idea has a dedicated discussion section where you can offer your expertise, suggest improvements, or ask for partnerships. Many projects on our platform have evolved from single-person concepts into multi-disciplinary team efforts. You can also use our direct messaging feature (available for registered members) to connect with creators.",
  },
  {
    question: "What are platform fees and how are they used?",
    answer: "To maintain the infrastructure, provide AI analysis tools, and ensure platform security, Eco Pulse takes a nominal 10% fee from 'Paid Content' transactions. These funds are reinvested into the community to host innovation contests, improve our technology stack, and provide grants for the most promising free (Open Source) ideas that show exceptional environmental impact.",
  },
];

export default function FAQSection() {
  return (
    <Section variant="muted">
      <div className="max-w-6xl mx-auto">
        <div className="text-center lg:text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-4 border border-primary/20">
            <HelpCircle className="w-3.5 h-3.5" />
            Common Questions
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            Everything You Need <span className="text-primary">To Know</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl lg:mx-0 mx-auto leading-relaxed">
            New to Eco Pulse? Here are the most frequently asked questions about our platform, 
            intellectual property, and how you can start making a difference today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem 
                  key={i} 
                  value={`item-${i}`}
                  className="bg-card border border-border px-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 data-[state=open]:border-primary/40 data-[state=open]:shadow-primary/5"
                >
                  <AccordionTrigger className="text-left font-bold py-5 hover:no-underline hover:text-primary transition-colors text-base md:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm md:text-base border-t border-border/50 pt-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="lg:col-span-4">
            <StillHaveQuestions />
          </div>
        </div>
      </div>
    </Section>
  );
}
