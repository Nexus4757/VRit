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
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
                <h1 style={{ color: '#4285F4' }}>International Space Station</h1>
                <p>The International Space Station (ISS) is a large space station that was assembled and is maintained in low Earth orbit by a collaboration of five space agencies and their contractors: NASA (United States), Roscosmos (Russia), ESA (Europe), JAXA (Japan), and CSA (Canada). The ISS is the largest space station ever built. Its primary purpose is to perform microgravity and space environment experiments. Operationally, the station is divided into two sections: the Russian Orbital Segment (ROS) assembled by Roscosmos, and the US Orbital Segment (USOS), assembled by NASA, JAXA, ESA and CSA. A striking feature of the ISS is the Integrated Truss Structure, which connects the large solar panels and radiators to the pressurized modules.</p>
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
            <div>
            <h1>Study Materials</h1>
            <div>
Key Point 1: The ISS is the largest space station ever built, constructed and maintained by a collaboration of five international space agencies: NASA, Roscosmos, ESA, JAXA, and CSA. Its main purpose is to conduct experiments in microgravity and the space environment.
<br></br><br></br>
Key Point 2: The space station is divided operationally into two segments: the Russian Orbital Segment (ROS), assembled by Roscosmos, and the US Orbital Segment (USOS), assembled by NASA, JAXA, ESA, and CSA. The Integrated Truss Structure on the ISS connects solar panels and radiators to the pressurized modules.
<br></br><br></br>
Easy Study Questions:
<br></br>
1. What is the primary purpose of the International Space Station (ISS)?
<br></br>
2. Name three of the five international space agencies involved in the assembly and maintenance of the ISS.
<br></br><br></br>
Hard Study Questions:
<br></br>
1. What are the two operational segments of the International Space Station (ISS) and which agencies assembled each?
<br></br>
2. Explain the role of the Integrated Truss Structure on the International Space Station.
</div>
            </div>
        </div>
    );
};

export default IssPage;