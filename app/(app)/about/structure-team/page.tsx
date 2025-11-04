import { HeroSimple } from "@/ui/organism";
import { teamMembers } from "./page.properties";
import hero_simple from "@/public/hero-simple.svg";
import { BackgroundSection, TeamCard } from "@/ui/atoms";
import { Container, IconTitle, Section } from "@/ui/molecules";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";

export default function StructureTeam() {
  return (
    <>
      <HeroSimple
        title="Estructura organizacional"
        backgroundImage={hero_simple}
      />

      <Section fadeIn={true}>
        <Container>
          <IconTitle title="Directivos" />
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-7">
            {teamMembers.map((team) => {
              return <TeamCard key={team.id} item={team} />;
            })}
          </div>
        </Container>
      </Section>

      <CallToActionSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
