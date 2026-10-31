import Preloader from "./components/Preloader.jsx";
import ScrollBar from "./components/ScrollBar.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Collection from "./components/Collection.jsx";
import Story from "./components/Story.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Preloader />
      <ScrollBar />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Collection />
        <Story />
      </main>
      <Footer />
    </>
  );
}
