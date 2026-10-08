/**
 * Icon names a client config can use for services (`services[].icon`).
 * Rendered with Phosphor Icons (@phosphor-icons/react) in the brand kit's
 * icon style; the name-to-component map is src/lib/icons.tsx.
 */
export const serviceIconNames = [
  "leaf", "tree", "plant", "flower", "shovel", "drop", "sun", "snowflake", "wind", "fire",
  "lightning", "plug", "wrench", "hammer", "toolbox", "hard-hat", "ruler", "paint-brush",
  "broom", "house", "wall", "truck", "car", "bathtub", "thermometer", "bug", "recycle",
  "scissors", "dog", "camera", "package", "shield", "sparkle", "star", "check-circle",
] as const;

export type ServiceIconName = (typeof serviceIconNames)[number];
