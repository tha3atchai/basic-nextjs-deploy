import { useEffect } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const useGLTFModel = (url: string) => {
  const { scene, animations } = useGLTF(url);

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

  useFrame((_, delta) => {
    mixer.update(delta);
  });

  return scene;
};
