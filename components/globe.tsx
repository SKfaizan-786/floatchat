"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { getFresnelMat } from "../lib/getFresnelMat";

interface GlobeProps {
  className?: string;
}

export default function Globe({ className }: GlobeProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;

    // Renderer (transparent background)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0); // transparent background
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    mountRef.current.appendChild(renderer.domElement);

    // Earth group
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23.4 * Math.PI / 180;
    scene.add(earthGroup);

    new OrbitControls(camera, renderer.domElement);

    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, 12);

    // Earth surface
    const earthMat = new THREE.MeshPhongMaterial({
      map: loader.load("/textures/00_earthmap1k.jpg"),
      specularMap: loader.load("/textures/02_earthspec1k.jpg"),
      bumpMap: loader.load("/textures/01_earthbump1k.jpg"),
      bumpScale: 0.04,
    });
    const earthMesh = new THREE.Mesh(geometry, earthMat);
    earthGroup.add(earthMesh);

    // Night lights
    const lightsMat = new THREE.MeshBasicMaterial({
      map: loader.load("/textures/03_earthlights1k.jpg"),
      blending: THREE.AdditiveBlending,
    });
    const lightsMesh = new THREE.Mesh(geometry, lightsMat);
    earthGroup.add(lightsMesh);

    // Clouds
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: loader.load("/textures/04_earthcloudmap.jpg"),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      alphaMap: loader.load("/textures/05_earthcloudmaptrans.jpg"),
    });
    const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
    cloudsMesh.scale.setScalar(1.003);
    earthGroup.add(cloudsMesh);

    // Glow (atmosphere)
    const glowMesh = new THREE.Mesh(geometry, getFresnelMat());
    glowMesh.scale.setScalar(1.01);
    earthGroup.add(glowMesh);

    // Sunlight
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    // Animation loop
    const animate = () => {
      earthMesh.rotation.y += 0.002;
      lightsMesh.rotation.y += 0.002;
      cloudsMesh.rotation.y += 0.0023;
      glowMesh.rotation.y += 0.002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className ? className + " w-full h-screen" : "w-full h-screen"} />;
}
