import { useGLTF, Bounds } from '@react-three/drei'

export default function ProductModel({
                                         modelPath,
                                         scale = [0.5, 0.5, 0.5],
                                         position = [0, -0.5, 0],
                                         rotation = [0, 0, 0],
                                         color = "#ffffff"
                                     }) {
    const { scene } = useGLTF(modelPath)

    // Clone the scene to modify materials
    const clonedScene = scene.clone()
    clonedScene.traverse((child) => {
        if (child.material) {
            child.material.color.set(color)
        }
    })

    return (
        <group position={position} rotation={rotation}>
            <primitive object={clonedScene} scale={scale} />
            <Bounds fit clip observe margin={1.2}>
                <mesh visible={false}>
                    <boxGeometry />
                </mesh>
            </Bounds>
        </group>
    )
}

export function preloadModels(products) {
    const uniqueModels = [...new Set(products.map(p => p.modelPath))]
    uniqueModels.forEach(modelPath => {
        try {
            useGLTF.preload(modelPath)
        } catch (error) {
            console.error(`Failed to preload model: ${modelPath}`, error)
        }
    })
}