import React from "react";

const Home = async () => {
  await new Promise((r) => setTimeout(r, 5000));
  return <div>Home</div>;
};

export default Home;
