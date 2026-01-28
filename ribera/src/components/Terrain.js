import React, { useMemo, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

export default function Terrain() {
    const meshRef = useRef();

    // Generate terrain data
    const { geometry } = useMemo(() => {
        const noise2D = createNoise2D();
        const width = 20;
        const height = 20;
        const widthSegments = 64;
        const heightSegments = 64;

        const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);

        // Displace vertices
        const posAttribute = geometry.attributes.position;
        for (let i = 0; i < posAttribute.count; i++) {
            const x = posAttribute.getX(i);
            const y = posAttribute.getY(i);

            // fbm like noise frequency/amplitude
            let elevation = 0;
            // First layer
            elevation += noise2D(x * 0.2, y * 0.2) * 1.5;
            // Second layer (detail)
            elevation += noise2D(x * 0.8, y * 0.8) * 0.3;

            // Apply height (z-axis in PlaneGeometry logic before rotation)
            posAttribute.setZ(i, elevation);
        }

        geometry.computeVertexNormals();
        return { geometry };
    }, []);

    return React.createElement(
        'mesh',
        {
            ref: meshRef,
            rotation: [-Math.PI / 2, 0, 0], // Rotate to be flat
            position: [0, -1, 0],
            receiveShadow: true
        },
        React.createElement('primitive', { object: geometry, attach: 'geometry' }),
        React.createElement('meshStandardMaterial', {
            color: '#333',
            wireframe: true,
            roughness: 0.8,
            metalness: 0.2,
            flatShading: true
        })
    );
}
