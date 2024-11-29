"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Model = () => {
  const { scene, animations } = useGLTF("/models/Dance.glb");

  const mixer = new THREE.AnimationMixer(scene);

  animations.forEach(clip => mixer.clipAction(clip).play());

  useEffect(() => {
    scene.traverse(child => {
      if (child instanceof THREE.Mesh) {
        const material = child.material;
        if (material && material.map) {
          material.needsUpdate = true;
        } else {
          console.log("No texture found for this material");
        }
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    mixer.update(delta);
  });

  return <primitive object={scene} scale={[2, 2, 2]} />;
};

const ModelViewer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Canvas style={{ width: "100%", height: "100vh" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls />
        <Model />
      </Canvas>
    </Suspense>
  );
};

export default ModelViewer;
