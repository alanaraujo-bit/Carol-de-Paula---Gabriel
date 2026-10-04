import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Disciplines } from "@/components/sections/Disciplines";
import { Experience } from "@/components/sections/Experience";
import { Services } from "@/components/sections/Services";
import { Highlights } from "@/components/sections/Highlights";
import { Works } from "@/components/sections/Works";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Disciplines />
      <Experience />
      <Services />
      <Highlights />
      <Works />
      <Contact />
    </>
  );
}
