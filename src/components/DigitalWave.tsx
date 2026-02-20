'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

const COUNT = 100; // 100x100 = 10,000 particles
const SEPARATION = 0.4;
const TOTAL_WIDTH = COUNT * SEPARATION;

export default function DigitalWave() {
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const { viewport, mouse } = useThree();

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < COUNT; i++) {
            for (let j = 0; j < COUNT; j++) {
                const x = (i - COUNT / 2) * SEPARATION;
                const z = (j - COUNT / 2) * SEPARATION;
                temp.push({ x, z, y: 0 });
            }
        }
        return temp;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const mouseX = (mouse.x * viewport.width) / 2;
        const mouseY = (mouse.y * viewport.height) / 2;

        particles.forEach((particle, i) => {
            const { x, z } = particle;

            // Base Wave
            let y = Math.sin(x * 0.5 + time * 0.5) * Math.cos(z * 0.5 + time * 0.3) * 0.5;

            // Mouse Interaction (Ripple)
            const dist = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(z - -mouseY * 2, 2)); // improved mapping
            if (dist < 8) {
                const force = 1 - dist / 8;
                y -= force * 2 * Math.sin(dist * 2 - time * 5);
            }

            dummy.position.set(x, y, z);

            // Scale based on height for dynamic feel
            const scale = 1 + y * 0.5;
            dummy.scale.set(scale, scale, scale);

            dummy.rotation.x = Math.sin(time + x) * 0.2;
            dummy.rotation.z = Math.cos(time + z) * 0.2;

            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);

            // Dynamic Coloring
            // We'll update color in a shader or per-instance if needed, 
            // but for max performance let's stick to material color + lighting first
            // Or we can set instance color here:
            const color = new THREE.Color();
            // Mix violet and cyan
            const mix = (y + 1) / 2; // 0 to 1
            color.setHSL(0.7 + mix * 0.1, 0.8, 0.5); // purple range
            mesh.current.setColorAt(i, color);
        });

        mesh.current.instanceMatrix.needsUpdate = true;
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, COUNT * COUNT]} frustumCulled={false}>
            <boxGeometry args={[0.05, 0.05, 0.05]} />
            <meshStandardMaterial
                color="#ffffff"
                emissive="#4c1d95"
                emissiveIntensity={2}
                roughness={0.1}
                metalness={0.8}
                toneMapped={false}
            />
        </instancedMesh>
    );
}
