import React from "react";
import MyVotesIdeas from "@/components/modules/Dashboard/member/MyVotesIdeas/MyVotesIdeas";

export const metadata = {
  title: "My Voted Ideas | EcoPulse",
  description: "View and track all the ideas you have voted for.",
};

const page = () => {
  return <MyVotesIdeas />;
};

export default page;
