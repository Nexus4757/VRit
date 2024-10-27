// src/pages/CovidPage.js
import React, { Suspense, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useFBX, Html, useProgress } from '@react-three/drei';

const CovidModel = React.memo(() => {
    const fbx = useFBX('/models/sars_cov2_spike_protein.fbx'); // Load the FBX model
    const [rotationSpeed] = useState(0.01); // Idle rotation speed

    // Animate model rotation on idle
    useFrame(() => {
        fbx.rotation.y += rotationSpeed;
    });

    return <primitive object={fbx} scale={0.03} />; // Adjusted scale for compact view
});

function Loader() {
    const { progress } = useProgress();
    return <Html center>{Math.round(progress)} % loaded</Html>;
}

const CovidPage = () => {
    const [modelLoaded, setModelLoaded] = useState(false);

    // Memoize lighting to improve performance and keep it subtle
    const lighting = useMemo(() => (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
        </>
    ), []);

    useEffect(() => {
        const preloadModel = async () => {
            await useFBX.preload('/models/covid19.fbx'); // Preload FBX file
            setModelLoaded(true);
        };
        preloadModel();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            {/* Centered Heading and Description */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '1.5em', color: '#333' }}>COVID-19 Virus Structure</h1>
                <p style={{ color: '#555' }}>Explore the 3D structure of the COVID-19 virus spike protein.</p>
            </div>

            {/* Layout with model on the left and heading centered */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                {/* 3D Canvas Container on the left */}
                <div style={{ width: '40%', height: '400px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginRight: '20px' }}>
                    <Canvas
                        style={{ width: '100%', height: '100%', backgroundColor: '#ffffff', borderRadius: '8px' }}
                        camera={{ position: [0, 0, 3], fov: 60 }}
                        pixelRatio={Math.min(window.devicePixelRatio, 1.5)}
                    >
                        {lighting}

                        {modelLoaded ? (
                            <Suspense fallback={<Loader />}>
                                <CovidModel />
                            </Suspense>
                        ) : (
                            <Loader />
                        )}

                        {/* OrbitControls with tight zoom and rotation control */}
                        <OrbitControls
                            enableZoom={true}
                            zoomSpeed={0.6}
                            maxDistance={3}
                            minDistance={1.8}
                            enableRotate={true}
                            rotateSpeed={0.4}
                            enablePan={false} // Disable panning for a cleaner experience
                        />
                    </Canvas>
                </div>
            </div>
        </div>
    );
};

export default CovidPage;
