import Navbar from "@/components/KomponenHalamanUtama/Navbar";
import Hero from "@/components/KomponenHalamanUtama/Hero";
import About from "@/components/KomponenHalamanUtama/About";
import Footer from "@/components/KomponenHalamanUtama/Footer";
import Fitur from "@/components/KomponenHalamanUtama/Fitur";
import Kontak from "@/components/KomponenHalamanUtama/Kontak";

const HalamanUtama = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Fitur />
      <Kontak />
      <Footer />
    </>
  );
};

export default HalamanUtama;
