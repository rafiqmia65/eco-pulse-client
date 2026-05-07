import Section from "@/components/shared/reusableComponents/Section";
import Image from "next/image";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Sustainability Researcher",
    content:
      "Eco Pulse has transformed how I share my findings. The community is incredibly supportive and the platform is so easy to use.",
    image: "https://i.pravatar.cc/150?u=alex",
  },
  {
    name: "Sarah Chen",
    role: "Green Tech Entrepreneur",
    content:
      "I found my first group of testers for my vertical garden idea right here. This platform is a goldmine for innovators.",
    image: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Marcus Thorne",
    role: "Climate Advocate",
    content:
      "Seeing so many practical solutions in one place gives me hope for our planet's future. Truly a remarkable initiative.",
    image: "https://i.pravatar.cc/150?u=marcus",
  },
];

export default function Testimonials() {
  return (
    <Section variant="muted">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hear from the researchers, entrepreneurs, and advocates who are using
          Eco Pulse to drive real change.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-card p-8 border border-border shadow-sm hover:shadow-md transition flex flex-col relative"
          >
            <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/10" />
            <p className="text-muted-foreground italic mb-6 flex-1">
              &quot;{t.content}&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm">{t.name}</h4>
                <p className="text-xs text-primary font-medium">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
