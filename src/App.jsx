import Preloader from "./components/Preloader.jsx";
import ScrollBar from "./components/ScrollBar.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Showcase from "./components/Showcase.jsx";
import Collection from "./components/Collection.jsx";
import Story from "./components/Story.jsx";
import Footer from "./components/Footer.jsx";

import useSmoothScroll from "./hooks/useSmoothScroll.js";
import CustomCursor from "./components/CustomCursor.jsx";

export default function App() {
  useSmoothScroll();
  return (
    <>
      <CustomCursor />
      <Preloader />
      <ScrollBar />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Showcase />
        <Collection />
        <Story />
      </main>
      <Footer />
    </>
  );
}
