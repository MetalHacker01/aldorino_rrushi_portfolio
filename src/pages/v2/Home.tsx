import IDEShell from "@/components/v2/layout/IDEShell";
import Hero from "@/components/v2/sections/Hero";
import About from "@/components/v2/sections/About";
import Experience from "@/components/v2/sections/Experience";
import Projects from "@/components/v2/sections/Projects";
import Certifications from "@/components/v2/sections/Certifications";
import AI from "@/components/v2/sections/AI";
import Contact from "@/components/v2/sections/Contact";

const Home = () => (
  <IDEShell>
    <Hero />
    <About />
    <Experience />
    <Projects />
    <Certifications />
    <AI />
    <Contact />
  </IDEShell>
);

export default Home;
