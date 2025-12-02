import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import LiveChangelog from "./components/LiveChangelog";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
      <Navbar />
      <Hero />
      <Features />
      <LiveChangelog />
      <FAQ />
      <Footer />
    </main>
  );
}
