'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

interface TextRevealProps {
    children: string;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
    className?: string;
    splitBy?: 'chars' | 'words' | 'lines';
    stagger?: number;
    duration?: number;
    delay?: number;
    trigger?: 'scroll' | 'load';
    scrub?: boolean | number;
    y?: number;
    rotation?: number;
    style?: React.CSSProperties;
    ariaHidden?: boolean;
}

export default function TextReveal({
    children,
    as: Tag = 'div',
    className = '',
    splitBy = 'chars',
    stagger = 0.03,
    duration = 0.8,
    delay = 0,
    trigger = 'scroll',
    scrub = false,
    y = 60,
    rotation = 0,
    style,
    ariaHidden = false,
}: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.querySelectorAll('.split-item');
        if (!elements.length) return;

        const tl = gsap.timeline({
            ...(trigger === 'scroll' && !scrub
                ? {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                }
                : {}),
            ...(trigger === 'scroll' && scrub
                ? {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                        end: 'top 30%',
                        scrub: typeof scrub === 'number' ? scrub : 1,
                    },
                }
                : {}),
            delay: trigger === 'load' ? delay : 0,
        });

        tl.from(elements, {
            y,
            rotationX: rotation,
            autoAlpha: 0,
            duration,
            stagger,
            ease: 'power4.out',
            ...(trigger === 'scroll' && !scrub ? { delay } : {}),
        });
    }, { scope: containerRef });

    const renderSplit = () => {
        if (splitBy === 'words') {
            return children.split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <span className="split-item inline-block">{word}&nbsp;</span>
                </span>
            ));
        }

        if (splitBy === 'chars') {
            return children.split('').map((char, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <span className="split-item inline-block" style={{ willChange: 'transform' }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                </span>
            ));
        }

        // lines - just wrap the whole thing
        return (
            <span className="inline-block overflow-hidden">
                <span className="split-item inline-block">{children}</span>
            </span>
        );
    };

    return (
        <div ref={containerRef} aria-hidden={ariaHidden}>
            <Tag className={className} style={style}>
                {renderSplit()}
            </Tag>
        </div>
    );
}
