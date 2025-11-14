import Image from "next/image";
import Header from "@/components/Header";

import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Projects from "@/components/Projects"
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="lg:w-full  w-[80%] flex flex-col">
      <Header/>
      <Hero/>
      <Projects/>
      <Faq/>
      <hr className="border-zinc-500 -translate-x-10 lg:translate-x-0"/>
      <Footer/>
      
    </div>
  );
}
