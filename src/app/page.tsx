import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Niches } from "@/components/sections/niches";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Hero />
      <About />
      <Services />
      <Niches />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
