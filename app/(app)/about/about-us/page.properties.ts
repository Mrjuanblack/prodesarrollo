import {
  Map,
  MapPin,
  Folder,
  Search,
  Shield,
  Repeat2,
  Settings,
  Building,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  HeartHandshake,
} from "lucide-react";
import { InfoItem } from "@/ui/atoms/Cards/InfoCard/info-card.properties";
import { TransparencyItem } from "@/ui/atoms/Cards/TransparencyCard/transparency-card.properties";

export const infos: InfoItem[] = [
  {
    id: 1,
    title: "Nuestro propósito",
    Icon: Folder,
    description:
      "Tenemos como propósito fundamental articular técnica, operativa e institucionalmente los esfuerzos del sector público, privado y la sociedad civil, con el fin de movilizar recursos, capacidades y alianzas orientadas al fortalecimiento del desarrollo económico, social y territorial del país.",
  },
  {
    id: 2,
    title: "Nuestro enfoque",
    Icon: Folder,
    description:
      "Nuestra labor se centra en impulsar programas, proyectos y mecanismos de inversión que promuevan la equidad territorial, la sostenibilidad ambiental y el bienestar colectivo, garantizando una gestión transparente, eficiente y de alto impacto.",
  },
  {
    id: 3,
    title: "Nuestro rol estratégico",
    Icon: Settings,
    description:
      "Actuamos como un instrumento estratégico de cooperación interinstitucional, orientado a planificar, gestionar y ejecutar iniciativas que consoliden el crecimiento local y regional, la competitividad productiva y la participación comunitaria, en concordancia con los planes de desarrollo y las políticas públicas nacionales.",
  },
  {
    id: 4,
    title: "Nuestro compromiso con los territorios",

    Icon: MapPin,
    description:
      "Reconocemos la importancia de la asociatividad territorial como base del progreso colectivo y trabajamos para integrar los territorios con oportunidades nacionales e internacionales de inversión, aportando al cierre de brechas y a la construcción de una Colombia más equilibrada, inclusiva y sostenible.",
  },
];

export const transparencies: TransparencyItem[] = [
  {
    id: 1,
    title: "Integridad",
    Icon: CheckCircle,
    description:
      "Actuamos con rectitud, coherencia y ética en todas nuestras decisiones y relaciones institucionales.",
  },
  {
    id: 2,
    title: "Transparencia",
    Icon: Search,
    description:
      "Garantizamos claridad y rendición de cuentas en la gestión de los recursos públicos y privados.",
  },
  {
    id: 3,
    title: "Confianza pública",
    Icon: Shield,
    description:
      "Construimos legitimidad institucional a través del cumplimiento, la credibilidad y el servicio al interés general.",
  },
  {
    id: 4,
    title: "Compromiso institucional",
    Icon: Building,
    description:
      "Asumimos con responsabilidad la misión de fortalecer la gestión pública y el desarrollo territorial sostenible.",
  },
  {
    id: 5,
    title: "Responsabilidad social",
    Icon: HeartHandshake,
    description:
      "Priorizamos el bienestar colectivo y la inclusión como principios rectores de nuestra gestión y nuestros proyectos.",
  },
  {
    id: 6,
    title: "Cooperación",
    Icon: Repeat2,
    description:
      "Fomentamos la articulación entre sectores y niveles de gobierno para lograr resultados compartidos y duraderos.",
  },
  {
    id: 7,
    title: "Equidad territorial",
    Icon: Map,
    description:
      "Promovemos oportunidades equilibradas de desarrollo en todas las regiones y comunidades del país.",
  },
  {
    id: 8,
    title: "Innovación",
    Icon: Lightbulb,
    description:
      "Aplicamos soluciones creativas, técnicas y sostenibles que fortalezcan la gestión territorial y la inversión público-privada.",
  },
  {
    id: 9,
    title: "Eficiencia",
    Icon: TrendingUp,
    description:
      "Optimizamos recursos y procesos para lograr el máximo impacto con el menor costo institucional y operativo.",
  },
];
