import BlogHero from "./BlogHero/BlogHero";
import BlogList from "./BlogList/BlogList";

export default function Blog() {
  return (
    <div className="w-full">
      <BlogHero />
      <BlogList />
    </div>
  );
}
