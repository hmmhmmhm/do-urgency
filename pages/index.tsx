import type { NextPage } from "next";
import PrimaryTest from "../components/PrimaryTest";

const Home: NextPage = () => {
  return (
    <div>
      <p>Hello Next.js</p>
      <PrimaryTest name="Test?" />
    </div>
  );
};

export default Home;
