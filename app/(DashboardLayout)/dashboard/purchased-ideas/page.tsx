import PurchasedIdeas from "@/components/modules/Dashboard/member/PurchasedIdeas/PurchasedIdeas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchased Ideas | EcoPulse",
  description: "View and manage all the ideas you have purchased on EcoPulse.",
};

const PurchasedIdeasPage = () => {
  return <PurchasedIdeas />;
};

export default PurchasedIdeasPage;
