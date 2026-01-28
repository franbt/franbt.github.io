import React, { useState } from 'react';
import { Html } from '@react-three/drei';

export default function POI({ position, title, onClick }) {
    const [hovered, setHovered] = useState(false);

    return React.createElement(
        'group',
        { position: position },
        // Visual Marker (Sphere)
        React.createElement('mesh', {
            onClick: (e) => {
                e.stopPropagation(); // Prevent clicking through to other things
                onClick();
            },
            onPointerOver: () => {
                document.body.style.cursor = 'pointer';
                setHovered(true);
            },
            onPointerOut: () => {
                document.body.style.cursor = 'auto';
                setHovered(false);
            }
        },
            React.createElement('sphereGeometry', { args: [0.15, 16, 16] }),
            React.createElement('meshBasicMaterial', { color: hovered ? '#ff3333' : '#ff4d4d' })
        ),

        // Html Overlay (The label/dot wrapper)
        React.createElement(
            Html,
            { center: true, distanceFactor: 10 },
            React.createElement(
                'div',
                {
                    className: 'poi-marker',
                    onClick: onClick
                },
                React.createElement('div', { className: 'poi-dot' }),
                React.createElement('div', { className: 'poi-label' }, title)
            )
        )
    );
}
