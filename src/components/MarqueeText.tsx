'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

interface MarqueeTextProps {
    text: string;
    className?: string;
    speed?: number;
    separator?: string;
    direction?: 'left' | 'right';
}

export default function MarqueeText({
    text,
    className = '',
    speed = 20,
    separator = ' \u2014 ',
    direction = 'left',
}: MarqueeTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;
        const inner = containerRef.current.querySelector('.marquee-inner') as HTMLElement;
        if (!inner) return;

        const totalWidth = inner.scrollWidth / 2;

        gsap.set(inner, { x: direction === 'left' ? 0 : -totalWidth });

        gsap.to(inner, {
            x: direction === 'left' ? -totalWidth : 0,
            duration: speed,
            ease: 'none',
            repeat: -1,
        });
    }, { scope: containerRef });

    const content = `${text}${separator}`.repeat(6);

    return (
        <div ref={containerRef} className="overflow-hidden whitespace-nowrap">
            <div className={`marquee-inner inline-block ${className}`}>
                {content}{content}
            </div>
        </div>
    );
}
