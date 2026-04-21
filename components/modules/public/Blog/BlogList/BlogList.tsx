import Section from "@/components/shared/reusableComponents/Section";
import BlogCard from "./BlogCard/BlogCard";

const blogs = [
  {
    id: 1,
    title: "10 Ways to Reduce Your Carbon Footprint",
    desc: "Simple daily habits that can help reduce environmental impact.",
    date: "Apr 2026",
  },
  {
    id: 2,
    title: "Future of Renewable Energy",
    desc: "How solar, wind and hydro power are shaping the world.",
    date: "Mar 2026",
  },
  {
    id: 3,
    title: "Smart Cities and Sustainability",
    desc: "How technology is making cities greener and smarter.",
    date: "Feb 2026",
  },
];

export default function BlogList() {
  return (
    <Section>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </Section>
  );
}
