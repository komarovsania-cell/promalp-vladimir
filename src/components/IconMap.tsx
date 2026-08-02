import {
  IconBolt,
  IconWrenchBolt,
  IconDroplet,
  IconRoller,
  IconHammer,
  IconGarland,
  IconShield,
  IconDocument,
  IconClock,
  IconTeam,
  IconRig,
  IconLayers,
} from "./icons";
import type { SVGProps } from "react";

const map: Record<string, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  bolt: IconBolt,
  wrench: IconWrenchBolt,
  droplet: IconDroplet,
  roller: IconRoller,
  hammer: IconHammer,
  garland: IconGarland,
  shield: IconShield,
  document: IconDocument,
  clock: IconClock,
  team: IconTeam,
  rig: IconRig,
  layers: IconLayers,
};

export function Icon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  const Cmp = map[name] ?? IconShield;
  return <Cmp {...props} />;
}
