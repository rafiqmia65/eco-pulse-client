import { getTrendingIdeas } from "@/services/home/home.services";
import TrendingIdeas from "./TrendingIdeas/TrendingIdeas";

const TrendingIdeasSection = async () => {
  const res = await getTrendingIdeas();

  return <TrendingIdeas ideas={res.data ?? []} />;
};

export default TrendingIdeasSection;
