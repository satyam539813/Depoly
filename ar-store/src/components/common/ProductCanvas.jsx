import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function ProductCanvas({ children, cameraPosition = [2, 2, 2] }) {
    return (
        <Canvas
            frameloop="demand"g
            camera={{ position: cameraPosition, fov: 50 }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={2}
                enablePan={false}
            />
            {children}
        </Canvas>
    )
}