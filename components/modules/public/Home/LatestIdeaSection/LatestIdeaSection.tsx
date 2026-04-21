import { getLatestIdeas } from "@/services/public/home.services";
import LatestIdeas from "./LatestIdeas/LatestIdeas";

const LatestIdeaSection = async () => {
  const res = await getLatestIdeas();

  return <LatestIdeas ideas={res.data ?? []} />;
};

export default LatestIdeaSection;
