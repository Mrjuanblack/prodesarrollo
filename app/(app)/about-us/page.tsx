import { HeroSimple } from "@/ui/organism";
import hero_simple from "@/public/hero-simple.svg";
export default function AboutUs() {
  return (
    <>
      <HeroSimple title="¿Quiénes somos?" backgroundImage={hero_simple} />
    </>
  );
}
