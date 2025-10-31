import { Download } from "lucide-react";
import { laws } from "./page.properties";
import { HelpSection, HeroSimple } from "@/ui/organism";
import { BackgroundSection } from "@/ui/atoms";
import hero_simple from "@/public/hero-simple.svg";
import { Container, Section } from "@/ui/molecules";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";

export default function Participate() {
  return (
    <>
      <HeroSimple title="Banco de oferentes" backgroundImage={hero_simple} />

      <HelpSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
