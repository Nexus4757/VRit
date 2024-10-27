// src/pages/CoordinateSystemPage.js
import React, { Suspense, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei';

const CoordinateSystemModel = React.memo(() => {
    const { scene } = useGLTF('/models/axes.glb'); // Updated to load GLB format

    useFrame(() => {
        scene.rotation.y += 0.002;
    });

    return <primitive object={scene} scale={0.1} />;
});

function Loader() {
    const { progress } = useProgress();
    return <Html center>{Math.round(progress)} % loaded</Html>;
}

const CoordinateSystemPage = () => {
    const lighting = useMemo(() => (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
        </>
    ), []);

    useEffect(() => {
        const preloadModel = async () => {
            await useGLTF.preload('/models/coordinate_system.glb'); // Preload GLB file
        };
        preloadModel();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '1.5em', color: '#333' }}>3D Coordinate System</h1>
                <p style={{ color: '#555' }}>Explore the 3D representation of a coordinate system.</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                <div style={{ width: '40%', height: '400px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginRight: '20px' }}>
                    <Canvas
                        style={{ width: '100%', height: '100%', backgroundColor: '#ffffff', borderRadius: '8px' }}
                        camera={{ position: [0, 0, 20], fov: 60 }}
                        pixelRatio={Math.min(window.devicePixelRatio, 1.5)}
                    >
                        {lighting}

                        <Suspense fallback={<Loader />}>
                            <CoordinateSystemModel />
                        </Suspense>

                        <OrbitControls
                            enableZoom={true}
                            zoomSpeed={0.6}
                            maxDistance={30}
                            minDistance={5}
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

export default CoordinateSystemPage;
