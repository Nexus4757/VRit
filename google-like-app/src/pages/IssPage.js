// src/pages/IssPage.js
import React, { Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei';

const ISSModel = React.memo(() => {
    const { scene } = useGLTF('/models/ISS_stationary.glb'); // Ensure the path is correct

    useFrame(() => {
        scene.rotation.y += 0.002; // Slight rotation for idle effect
    });

    return <primitive object={scene} scale={0.1} />;
});

function Loader() {
    const { progress } = useProgress();
    return <Html center>{Math.round(progress)} % loaded</Html>; // Loading progress
}

const IssPage = () => {
    const lighting = useMemo(() => (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
        </>
    ), []);

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '1.5em', color: '#333' }}>International Space Station</h1>
                <p style={{ color: '#555' }}>Explore the 3D model of the International Space Station.</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                <div style={{ width: '40%', height: '400px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginRight: '20px' }}>
                    <Canvas
                        style={{ width: '100%', height: '100%', backgroundColor: '#ffffff', borderRadius: '8px' }}
                        camera={{ position: [0, 0, 6], fov: 60 }} // Increase Z position to zoom out
                        pixelRatio={Math.min(window.devicePixelRatio, 1.5)}
                    >
                        {lighting}

                        <Suspense fallback={<Loader />}>
                            <ISSModel />
                        </Suspense>

                        <OrbitControls
                            enableZoom={true}
                            zoomSpeed={0.6}
                            maxDistance={7} // Increase if you want further zoom out capability
                            minDistance={1.5}
                            enableRotate={true}
                            rotateSpeed={0.4}
                            enablePan={false}
                        />
                    </Canvas>
                </div>
            </div>
        </div>
    );
};

export default IssPage;
