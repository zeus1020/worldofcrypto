/**
 * Builds the standard lighting rig for the dark-fantasy 3D world:
 * a cool ambient fill, a warm key light, and a subtle rim light.
 */
export function createLights() {
  return [
    { type: "ambient", color: 0x3a3450, intensity: 0.6 },
    {
      type: "directional",
      color: 0xffe0b0,
      intensity: 1.1,
      position: { x: 40, y: 80, z: 30 },
      castShadow: true,
    },
    {
      type: "point",
      color: 0x8c5adc,
      intensity: 0.8,
      distance: 120,
      position: { x: -30, y: 20, z: -20 },
    },
  ];
}
