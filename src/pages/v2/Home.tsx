import IDEShell from "@/components/v2/layout/IDEShell";
import Hero from "@/components/v2/sections/Hero";
import About from "@/components/v2/sections/About";
import Experience from "@/components/v2/sections/Experience";
import Projects from "@/components/v2/sections/Projects";
import Certifications from "@/components/v2/sections/Certifications";
import AI from "@/components/v2/sections/AI";
import Contact from "@/components/v2/sections/Contact";
import RouteSeo from "@/v2/seo/RouteSeo";
import { personSchema, websiteSchema } from "@/v2/seo/personSchema";

const Home = () => (
  <>
    <RouteSeo
      title="Aldorino Rrushi · Marketing Automation Solution Engineer"
      description="Salesforce Marketing Cloud solution engineer at MarketOne International. 7+ years across enterprise marketing automation programs (SFMC, Eloqua, Marketo, Responsys, Unica). Open-source tools: SFMC Scout, CloudPage Maestro, Maestro Builder. Tirana, Albania. Remote, global."
      path="/"
      ogType="profile"
      jsonLd={[personSchema(), websiteSchema()]}
    />
    <IDEShell>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Certifications />
      <AI />
      <Contact />
    </IDEShell>
  </>
);

export default Home;
