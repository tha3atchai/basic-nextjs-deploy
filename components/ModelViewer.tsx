"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Environment, MeshTransmissionMaterial, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTFModel } from "@/hooks/useGlTFModel";
import { useControls } from "leva";

const Model = ({ src }: { src: string }) => {
  const scene = useGLTFModel(src);

  console.log(scene.children);

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
  });
  return (
    <group scale={[1, 1, 1]}>
      <Text
        font={"/fonts/PPNeueMontreal-Bold.otf"}
        position={[0, 0, -1]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        hello world!
      </Text>
      {scene.children.map((child, index) => (
        <mesh
          key={index}
          geometry={(child as any).geometry}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
      ))}
    </group>
  );
};

interface ModelViewerProps {
  src: string;
}

const ModelViewer = ({ src }: ModelViewerProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Canvas style={{ width: 300, height: 500 }}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={2} position={[0, 2, 3]} />
        <OrbitControls />
        <Environment preset="city" />
        <Model src={src} />
      </Canvas>
    </Suspense>
  );
};

export default ModelViewer;
