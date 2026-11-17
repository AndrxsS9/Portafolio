import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import References from "@/components/References";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SceneBackground from "@/components/background/SceneBackground";

export default function Page() {
  return (
    <>
      <SceneBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <References />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
