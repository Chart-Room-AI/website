import {
  BathtubIcon,
  BroomIcon,
  BugIcon,
  CameraIcon,
  CarIcon,
  CheckCircleIcon,
  ClockIcon,
  DogIcon,
  DropIcon,
  EnvelopeIcon,
  FireIcon,
  FlowerIcon,
  HammerIcon,
  HardHatIcon,
  HouseIcon,
  LeafIcon,
  LightningIcon,
  MapPinIcon,
  PackageIcon,
  PaintBrushIcon,
  PhoneIcon,
  PlantIcon,
  PlugIcon,
  RecycleIcon,
  RulerIcon,
  ScissorsIcon,
  ShieldIcon,
  ShovelIcon,
  SnowflakeIcon,
  SparkleIcon,
  StarIcon,
  SunIcon,
  ThermometerIcon,
  ToolboxIcon,
  TreeIcon,
  TruckIcon,
  WallIcon,
  WarningCircleIcon,
  WindIcon,
  WrenchIcon,
} from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon, IconWeight } from "@phosphor-icons/react";
import type { BrandKit } from "@config/brand-kit";
import type { ServiceIconName } from "@config/icon-names";

/** Icon set: Phosphor Icons (MIT), rendered on the server. */
const serviceIcons: Record<ServiceIconName, PhosphorIcon> = {
  leaf: LeafIcon,
  tree: TreeIcon,
  plant: PlantIcon,
  flower: FlowerIcon,
  shovel: ShovelIcon,
  drop: DropIcon,
  sun: SunIcon,
  snowflake: SnowflakeIcon,
  wind: WindIcon,
  fire: FireIcon,
  lightning: LightningIcon,
  plug: PlugIcon,
  wrench: WrenchIcon,
  hammer: HammerIcon,
  toolbox: ToolboxIcon,
  "hard-hat": HardHatIcon,
  ruler: RulerIcon,
  "paint-brush": PaintBrushIcon,
  broom: BroomIcon,
  house: HouseIcon,
  wall: WallIcon,
  truck: TruckIcon,
  car: CarIcon,
  bathtub: BathtubIcon,
  thermometer: ThermometerIcon,
  bug: BugIcon,
  recycle: RecycleIcon,
  scissors: ScissorsIcon,
  dog: DogIcon,
  camera: CameraIcon,
  package: PackageIcon,
  shield: ShieldIcon,
  sparkle: SparkleIcon,
  star: StarIcon,
  "check-circle": CheckCircleIcon,
};

/** Icons the designs use for UI (not chosen in configs). */
const uiIcons = {
  phone: PhoneIcon,
  envelope: EnvelopeIcon,
  "map-pin": MapPinIcon,
  clock: ClockIcon,
  "check-circle": CheckCircleIcon,
  "warning-circle": WarningCircleIcon,
} as const;

export type UiIconName = keyof typeof uiIcons;
type IconStyle = BrandKit["iconStyle"];

/** Brand kit icon style -> Phosphor weight. */
export function iconWeight(style: IconStyle): IconWeight {
  if (style.style === "solid") return "fill";
  if (style.style === "duotone") return "duotone";
  return style.weight;
}

type IconProps = { iconStyle: IconStyle; size?: number; className?: string };

export function ServiceIcon({ name, iconStyle, size = 28, className }: IconProps & { name: ServiceIconName }) {
  const Icon = serviceIcons[name];
  return <Icon aria-hidden weight={iconWeight(iconStyle)} size={size} className={className} />;
}

export function UiIcon({ name, iconStyle, size = 20, className }: IconProps & { name: UiIconName }) {
  const Icon = uiIcons[name];
  return <Icon aria-hidden weight={iconWeight(iconStyle)} size={size} className={className} />;
}

/** Tile behind an icon; `corners` from the brand kit sets its shape. */
export function iconTileClass(style: IconStyle): string {
  return style.corners === "sharp" ? "rounded-none" : "rounded-xl";
}
