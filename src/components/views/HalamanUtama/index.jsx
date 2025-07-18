import { useRef } from "react";
import Navbar from "@/components/KomponenHalamanUtama/Navbar";
import Hero from "@/components/KomponenHalamanUtama/Hero";
import About from "@/components/KomponenHalamanUtama/About";
import Footer from "@/components/KomponenHalamanUtama/Footer";
import Fitur from "@/components/KomponenHalamanUtama/Fitur";
import Kontak from "@/components/KomponenHalamanUtama/Kontak";

const HalamanUtama = () => {
  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    fitur: useRef(null),
    kontak: useRef(null),
  };

  const scrollToSection = (targetId, lenis) => {
    const ref = sectionRefs[targetId];
    if (ref && ref.current && lenis) {
      lenis.scrollTo(ref.current, {
        offset: -80,
        duration: 1.2,
      });
    } else {
      console.warn(
        `Section with id ${targetId} not found or Lenis not initialized.`
      );
    }
  };

  return (
    <>
      <Navbar scrollToSection={scrollToSection} />
      <div id="hero" ref={sectionRefs.hero}>
        <Hero />
      </div>
      <div id="about" ref={sectionRefs.about}>
        <About />
      </div>
      <div id="fitur" ref={sectionRefs.fitur}>
        <Fitur />
      </div>
      <div id="kontak" ref={sectionRefs.kontak}>
        <Kontak />
      </div>
      <Footer />
    </>
  );
};

export default HalamanUtama;
