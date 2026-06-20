/**
 * Height-blended terrain shader: blends grass, rock and snow by elevation.
 */
export const terrainVertexShader = /* glsl */ `
  varying float vHeight;
  varying vec3 vNormal;
  void main() {
    vHeight = position.y;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const terrainFragmentShader = /* glsl */ `
  varying float vHeight;
  varying vec3 vNormal;
  void main() {
    vec3 grass = vec3(0.20, 0.30, 0.14);
    vec3 rock = vec3(0.30, 0.28, 0.26);
    vec3 snow = vec3(0.85, 0.86, 0.90);
    vec3 col = mix(grass, rock, smoothstep(4.0, 12.0, vHeight));
    col = mix(col, snow, smoothstep(16.0, 24.0, vHeight));
    float light = max(dot(normalize(vNormal), normalize(vec3(0.5, 1.0, 0.3))), 0.2);
    gl_FragColor = vec4(col * light, 1.0);
  }
`;
