import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.js';

export default function App() {
    const [selectedPOI, setSelectedPOI] = useState(null);

    return React.createElement(
        React.Fragment,
        null,
        // UI Overlay
        React.createElement(
            'div',
            { className: 'overlay-container' },
            React.createElement(
                'div',
                {
                    className: 'overlay-panel',
                    style: {
                        opacity: selectedPOI ? 1 : 0,
                        transform: selectedPOI ? 'translateY(0)' : 'translateY(-10px)',
                        pointerEvents: selectedPOI ? 'auto' : 'none'
                    }
                },
                React.createElement('h1', null, selectedPOI ? selectedPOI.title : 'Select a Location'),
                React.createElement('p', null, selectedPOI ? selectedPOI.description : 'Click on a red marker to learn more.')
            )
        ),
        // 3D Scene
        React.createElement(
            Canvas,
            {
                camera: {
                    position: [5, 5, 5],
                    fov: 45,
                    near: 0.1,
                    far: 200
                }
            },
            React.createElement(Experience, { setSelectedPOI: setSelectedPOI })
        )
    );
}
