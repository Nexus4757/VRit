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
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
                <h1 style={{ color: '#4285F4' }}>3D Coordinate System</h1>
                <p>In geometry, a coordinate system is a system that uses one or more numbers, or coordinates, to uniquely determine the position of the points or other geometric elements on a manifold such as Euclidean space. The order of the coordinates is significant, and they are sometimes identified by their position in an ordered tuple and sometimes by a letter, as in "the x-coordinate". The coordinates are taken to be real numbers in elementary mathematics, but may be complex numbers or elements of a more abstract system such as a commutative ring. The use of a coordinate system allows problems in geometry to be translated into problems about numbers and vice versa; this is the basis of analytic geometry.</p>
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
            <div>
                    <h1>Study Materials</h1>
                    <div>
                    Key Points:
                    <br></br><br></br>
1. A coordinate system in geometry refers to a system that uses numbers or coordinates to specifically determine the placement of points or geometric elements in a certain space (like Euclidean space). The order of these coordinates is significant, and they are often recognized by their position in an ordered tuple or by a letter like "x."
<br></br>
2. Coordinate systems are essential because they allow problems in geometry to be converted into numerical problems and conversely. This concept is the basis for analytic geometry, where geometrical figures are translated into formulas. These coordinates are primarily real numbers in basic mathematics, but can also be complex numbers or elements of a more extensive abstract system.
<br></br><br></br>
Easy Study Questions:
<br></br>
1. What is a coordinate system in geometry?
<br></br>
2. Why is the order of coordinates significant in a coordinate system?
<br></br><br></br>

Hard Study Questions:
<br></br>
1. How does the use of a coordinate system translate geometry problems into problems about numbers and vice versa?
<br></br>
2. Discuss the potential use of complex numbers or elements of a commutative ring in a coordinate system.
                    </div>
            </div>
        </div>
    );
};

export default CoordinateSystemPage;