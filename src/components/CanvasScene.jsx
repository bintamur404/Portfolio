import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Neural network node
const NeuralNode = ({ position }) => {
    const meshRef = useRef();
    useFrame((state) => {
        if (!meshRef.current) return;
        const { pointer, camera } = state;
        const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        const dist = meshRef.current.position.distanceTo(pos);
        if (dist < 5) {
            const force = (5 - dist) * 0.15;
            const repelDir = meshRef.current.position.clone().sub(pos).normalize();
            meshRef.current.position.add(repelDir.multiplyScalar(force));
        }
        meshRef.current.position.lerp(new THREE.Vector3(...position), 0.015);
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.01;
    });
    return (
        <Float speed={2.5} rotationIntensity={2} floatIntensity={3}>
            <mesh ref={meshRef} position={position}>
                <icosahedronGeometry args={[0.6, 0]} />
                <meshStandardMaterial color="#A78BFA" wireframe emissive="#A78BFA" emissiveIntensity={0.8} />
            </mesh>
        </Float>
    );
};

// Drone cross
const DroneCross = ({ position }) => {
    const meshRef = useRef();
    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += 0.015;
        meshRef.current.rotation.z += 0.01;
        const { pointer, camera } = state;
        const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        const dist = meshRef.current.position.distanceTo(pos);
        if (dist < 5) {
            const force = (5 - dist) * 0.15;
            const repelDir = meshRef.current.position.clone().sub(pos).normalize();
            meshRef.current.position.add(repelDir.multiplyScalar(force));
        }
        meshRef.current.position.lerp(new THREE.Vector3(...position), 0.015);
    });
    return (
        <Float speed={2} rotationIntensity={3} floatIntensity={2}>
            <group ref={meshRef} position={position}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1.8, 0.15, 0.15]} />
                    <meshStandardMaterial color="#FB923C" metalness={0.8} roughness={0.2} emissive="#FB923C" emissiveIntensity={0.6} />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.15, 1.8, 0.15]} />
                    <meshStandardMaterial color="#FB923C" metalness={0.8} roughness={0.2} emissive="#FB923C" emissiveIntensity={0.6} />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.15, 0.15, 1.8]} />
                    <meshStandardMaterial color="#FB923C" metalness={0.8} roughness={0.2} emissive="#FB923C" emissiveIntensity={0.6} />
                </mesh>
            </group>
        </Float>
    );
};

// Medical cross
const MedicalCross = ({ position }) => {
    const meshRef = useRef();
    useFrame((state) => {
        if (!meshRef.current) return;
        const { pointer, camera } = state;
        const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        const dist = meshRef.current.position.distanceTo(pos);
        if (dist < 4) {
            const force = (4 - dist) * 0.1;
            const repelDir = meshRef.current.position.clone().sub(pos).normalize();
            meshRef.current.position.add(repelDir.multiplyScalar(force));
        }
        meshRef.current.position.lerp(new THREE.Vector3(...position), 0.02);
        meshRef.current.rotation.x -= 0.005;
        meshRef.current.rotation.z += 0.01;
    });
    return (
        <Float speed={3} rotationIntensity={1.5} floatIntensity={4}>
            <mesh ref={meshRef} position={position}>
                <octahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial color="#4ADE80" transparent opacity={0.7} emissive="#4ADE80" emissiveIntensity={0.8} wireframe={true} />
            </mesh>
        </Float>
    );
};

const CanvasScene = () => {
    return (
        <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
            <color attach="background" args={['#08090D']} />
            <fog attach="fog" args={['#08090D', 8, 35]} />

            <Stars radius={100} depth={50} count={4000} factor={3} saturation={0} fade speed={1} />
            <Sparkles count={150} scale={20} size={3} speed={0.4} opacity={0.4} color="#A78BFA" />

            <ambientLight intensity={0.25} />
            <pointLight position={[15, 15, 15]} intensity={2.5} color="#A78BFA" distance={50} />
            <pointLight position={[-15, -15, -15]} intensity={2.5} color="#FB923C" distance={50} />
            <spotLight position={[0, 20, 0]} intensity={1.5} color="#4ADE80" penumbra={1} angle={0.5} />

            <NeuralNode position={[-6, 4, -2]} />
            <NeuralNode position={[7, -3, -5]} />
            <DroneCross position={[6, 5, -1]} />
            <DroneCross position={[-7, -4, -4]} />
            <MedicalCross position={[0, -6, 2]} />
            <MedicalCross position={[-4, 6, -6]} />
            <MedicalCross position={[8, 2, -8]} />

            <Environment preset="city" />
        </Canvas>
    );
};

export default CanvasScene;
