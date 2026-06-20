/**
 * Helper builders for simple procedural meshes used by the 3D world
 * (ground planes, props, collision boxes) without external art.
 */
export function makeGroundPlane(factory, size, color) {
  const geo = factory.planeGeometry(size, size, 32, 32);
  const mat = factory.standardMaterial({ color, roughness: 0.95 });
  const mesh = factory.mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

export function makeBox(factory, w, h, d, color) {
  const geo = factory.boxGeometry(w, h, d);
  const mat = factory.standardMaterial({ color, roughness: 0.8 });
  return factory.mesh(geo, mat);
}

export function tintMaterial(material, hex) {
  if (material && material.color && material.color.setHex) {
    material.color.setHex(hex);
  }
  return material;
}
