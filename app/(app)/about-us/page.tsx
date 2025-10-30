import { HeroSimple } from "@/ui/organism";
import hero_simple from "@/public/hero-simple.svg";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";

export default function AboutUs() {
  return (
    <>
      <HeroSimple title="¿Quiénes somos?" backgroundImage={hero_simple} />
      <CallToActionSection />
    </>
  );
}
