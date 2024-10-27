// src/pages/CovidPage.js
import React, { Suspense, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useFBX, Html, useProgress } from '@react-three/drei';

const CovidModel = React.memo(() => {
    const fbx = useFBX('/models/covid19.fbx'); // Load the FBX model
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
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
                <h1 style={{ color: '#4285F4' }} >COVID-19 Virus Structure</h1>
                <p>Coronaviruses are a group of related RNA viruses that cause diseases in mammals and birds. In humans and birds, they cause respiratory tract infections that can range from mild to lethal. Mild illnesses in humans include some cases of the common cold (which is also caused by other viruses, predominantly rhinoviruses), while more lethal varieties can cause SARS, MERS and COVID-19. In cows and pigs they cause diarrhea, while in mice they cause hepatitis and encephalomyelitis. Coronaviruses constitute the subfamily Orthocoronavirinae, in the family Coronaviridae, order Nidovirales and realm Riboviria.</p>
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
            <div>
                    <h1>Study Materials</h1>
                    <div>
                    Key Point 1: Coronaviruses are RNA viruses causing various diseases in mammals and birds, with severity ranging from mild to lethal. In humans, they can result in conditions including the common cold, SARS, MERS, and COVID-19.
                    <br></br><br></br>
                    Key Point 2: Taxonomically, coronaviruses belong to the subfamily Orthocoronavirinae, within the family Coronaviridae, order Nidovirales, and realm Riboviria.
                    <br></br><br></br>
                    Easy Questions:
                    <br></br>
                    1. What kind of virus is a coronavirus?
                    <br></br>
                    2. What are some of the diseases that coronaviruses can cause in humans?
                    <br></br><br></br>
                    Hard Questions:
                    <br></br>
                    1. How does the severity of diseases caused by coronaviruses vary in different species (birds, cows, humans)?
                    <br></br>
                    2. Explain the taxonomic classification of coronaviruses.
                    </div>
            </div>
        </div>
    );
};

export default CovidPage;
