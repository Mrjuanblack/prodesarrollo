import { BackgroundSection } from "@/ui/atoms";
import hero_simple from "@/public/hero-simple.svg";
import { HelpSection, HeroSimple } from "@/ui/organism";

export default function Participate() {
  return (
    <>
      <HeroSimple title="Banco de oferentes" backgroundImage={hero_simple} />

      <HelpSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
