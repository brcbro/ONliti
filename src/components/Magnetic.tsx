'use client';

import { useRef, useCallback } from 'react';
import { gsap } from '@/lib/gsap';

interface MagneticProps {
    children: React.ReactNode;
    strength?: number;
    className?: string;
}

export default function Magnetic({ children, strength = 0.35, className = 'w-full md:w-auto' }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        gsap.to(ref.current, {
            x: middleX * strength,
            y: middleY * strength,
            duration: 0.5,
            ease: 'power3.out',
        });
    }, [strength]);

    const handleLeave = useCallback(() => {
        if (!ref.current) return;
        gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.4)',
        });
    }, []);

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className={className}
            style={{ willChange: 'transform' }}
        >
            {children}
        </div>
    );
}
