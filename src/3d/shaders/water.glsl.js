/**
 * Animated water surface shader (GLSL source as JS strings).
 */
export const waterVertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z += sin(pos.x * 0.4 + uTime) * 0.4;
    pos.z += cos(pos.y * 0.3 + uTime * 1.3) * 0.3;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const waterFragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    float ripple = 0.5 + 0.5 * sin(vUv.x * 30.0 + uTime * 2.0);
    vec3 deep = vec3(0.05, 0.10, 0.22);
    vec3 shallow = vec3(0.12, 0.28, 0.45);
    gl_FragColor = vec4(mix(deep, shallow, ripple), 0.85);
  }
`;
