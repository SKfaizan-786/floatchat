import * as THREE from "three";

/**
 * Creates a Fresnel effect material for atmosphere/glow around the Earth.
 */
export function getFresnelMat(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: new THREE.Color(0x00aaff) }, // inner atmosphere glow
      color2: { value: new THREE.Color(0x000000) }, // outer fade
    },
    vertexShader: `
      varying float intensity;
      void main() {
        vec3 viewDirection = normalize(cameraPosition - position);
        intensity = pow(1.0 - dot(normal, viewDirection), 3.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying float intensity;
      void main() {
        gl_FragColor = vec4(mix(color2, color1, intensity), 1.0);
      }
    `,
    side: THREE.BackSide, // render glow outside the Earth sphere
    blending: THREE.AdditiveBlending,
    transparent: true,
  });
}
