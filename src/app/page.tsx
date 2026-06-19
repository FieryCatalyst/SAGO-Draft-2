import HeroSection from "@/components/hero/HeroSection";
import ProductShowcase from "@/components/hero/ProductShowcase";
import SlotTeaser from "@/components/hero/SlotTeaser";
import BarPreview from "@/components/hero/BarPreview";
import InstagramPreview from "@/components/hero/InstagramPreview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductShowcase />
      <SlotTeaser />
      <BarPreview />
      <InstagramPreview />
    </>
  );
}
