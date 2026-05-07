import Section from "@/components/shared/reusableComponents/Section";
import { Zap, Droplets, Trash2, TreePine, Car, Home } from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Renewable Energy", icon: Zap, color: "text-yellow-500", count: 120 },
  {
    name: "Water Conservation",
    icon: Droplets,
    color: "text-blue-500",
    count: 85,
  },
  {
    name: "Waste Management",
    icon: Trash2,
    color: "text-orange-500",
    count: 210,
  },
  {
    name: "Reforestation",
    icon: TreePine,
    color: "text-green-500",
    count: 150,
  },
  { name: "Eco-Transport", icon: Car, color: "text-purple-500", count: 65 },
  {
    name: "Sustainable Living",
    icon: Home,
    color: "text-pink-500",
    count: 320,
  },
];

export default function FeaturedCategories() {
  return (
    <Section>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-3">Explore by Category</h2>
          <p className="text-muted-foreground max-w-lg">
            Find innovative solutions across the most critical areas of
            sustainability and environmental protection.
          </p>
        </div>
        <Link
          href="/ideas"
          className="text-primary font-semibold hover:underline flex items-center gap-1"
        >
          View all categories
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <Link
            key={i}
            href={`/ideas?category=${cat.name}`}
            className="group p-6 bg-card border border-border flex flex-col items-center text-center hover:border-primary/50 transition-all shadow-sm hover:shadow-md"
          >
            <div
              className={`p-4 rounded-2xl bg-muted group-hover:bg-primary/5 transition-colors mb-4 ${cat.color}`}
            >
              <cat.icon className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">
              {cat.name}
            </h4>
            <p className="text-xs text-muted-foreground">{cat.count} Ideas</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
