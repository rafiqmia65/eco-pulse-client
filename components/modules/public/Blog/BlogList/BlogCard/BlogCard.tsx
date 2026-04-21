import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Blog {
  title: string;
  desc: string;
  date: string;
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="group border border-border rounded-2xl bg-card p-6 hover:shadow-lg transition">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <Calendar className="w-4 h-4" />
        {blog.date}
      </div>

      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">
        {blog.title}
      </h3>

      <p className="text-muted-foreground text-sm mb-4">{blog.desc}</p>

      <Link
        href={`/blog/${blog.title.toLowerCase().replace(/\s/g, "-")}`}
        className="inline-flex items-center gap-2 text-primary text-sm font-medium"
      >
        Read More <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
