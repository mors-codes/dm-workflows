import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { Contact } from "@/components/sections/Contact";
import { BuiltWith } from "@/components/sections/BuiltWith";

export default function Home() {
  return (
    <main>
      <Hero />
      <BuiltWith />
      <Services />
      <Process />
      <WhyUs />
      <Contact />
    </main>
  );
}