import React, { Suspense } from 'react';
import { OrbitControls, Stars } from '@react-three/drei';
import Terrain from './components/Terrain.js';
import POI from './components/POI.js';

export default function Experience({ setSelectedPOI }) {
    // Example POI Data
    const poiData = [
        { position: [0, 1.5, 0], title: 'Summit Peak', description: 'The highest point in the region, offering panoramic views of the entire valley.' },
        { position: [3, 0.5, 3], title: 'Hidden Valley', description: 'A lush, secluded valley known for its unique bio-diversity and calm atmosphere.' },
        { position: [-3, 0.8, -2], title: 'Crystal Lake', description: 'A small, crystal-clear lake fed by underground springs.' }
    ];

    return React.createElement(
        React.Fragment,
        null,
        // Lights
        React.createElement('ambientLight', { intensity: 0.5 }),
        React.createElement('directionalLight', { position: [10, 10, 5], intensity: 1, castShadow: true }),

        // Environment
        React.createElement(Stars, { radius: 100, depth: 50, count: 5000, factor: 4, saturation: 0, fade: true, speed: 1 }),

        // Controls
        React.createElement(OrbitControls, {
            makeDefault: true,
            maxPolarAngle: Math.PI / 2 - 0.1, // Prevent going under the terrain
            minDistance: 3,
            maxDistance: 20
        }),

        // Terrain
        React.createElement(Suspense, { fallback: null },
            React.createElement(Terrain)
        ),

        // POIs
        poiData.map((poi, index) =>
            React.createElement(POI, {
                key: index,
                position: poi.position,
                title: poi.title,
                description: poi.description,
                onClick: () => setSelectedPOI(poi)
            })
        )
    );
}
