'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const updateHoverState = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, textarea, .cursor-pointer')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mouseover', updateHoverState);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mouseover', updateHoverState);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000] mix-blend-difference"
            animate={{
                x: position.x - 4,
                y: position.y - 4,
                scale: isHovering ? 6 : 1,
                backgroundColor: '#ffffff',
            }}
            transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 0.1,
            }}
        />
    );
}
