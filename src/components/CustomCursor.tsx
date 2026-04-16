'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const currentLabel = useRef('');
    const [isTouchDevice, setIsTouchDevice] = useState(true);

    useEffect(() => {
        const hasPointer = window.matchMedia('(pointer: fine)').matches;
        setIsTouchDevice(!hasPointer);
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;
        if (!dotRef.current || !pillRef.current || !labelRef.current) return;

        const dot = dotRef.current;
        const pill = pillRef.current;
        const label = labelRef.current;

        // gsap.quickTo for 60fps buttery smooth following
        const xDot = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power2.out' });
        const yDot = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power2.out' });
        const xPill = gsap.quickTo(pill, 'x', { duration: 0.35, ease: 'power3.out' });
        const yPill = gsap.quickTo(pill, 'y', { duration: 0.35, ease: 'power3.out' });

        const onMove = (e: MouseEvent) => {
            xDot(e.clientX);
            yDot(e.clientY);
            xPill(e.clientX);
            yPill(e.clientY);
        };

        const getLabel = (el: HTMLElement): string | null => {
            // Check for custom label via data attribute
            const custom = el.closest('[data-cursor]') as HTMLElement | null;
            if (custom) return custom.dataset.cursor || null;

            if (el.closest('a')) return 'VIEW';
            if (el.closest('button')) return 'CLICK';
            if (el.closest('input, textarea')) return 'TYPE';
            if (el.closest('.cursor-pointer')) return 'VIEW';
            return null;
        };

        const showPill = (text: string) => {
            if (currentLabel.current === text) return;
            currentLabel.current = text;
            label.textContent = text;

            // Dot shrinks, pill expands
            gsap.to(dot, { scale: 0, duration: 0.25, ease: 'back.in(2)' });
            gsap.to(pill, {
                width: 'auto',
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 8,
                paddingBottom: 8,
                opacity: 1,
                scale: 1,
                duration: 0.35,
                ease: 'back.out(1.7)',
            });
        };

        const hidePill = () => {
            if (!currentLabel.current) return;
            currentLabel.current = '';

            // Pill collapses, dot returns
            gsap.to(dot, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
            gsap.to(pill, {
                width: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 0,
                paddingBottom: 0,
                opacity: 0,
                scale: 0.5,
                duration: 0.25,
                ease: 'power3.in',
            });
        };

        const onHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const text = getLabel(target);
            if (text) {
                showPill(text);
            } else {
                hidePill();
            }
        };

        const onMouseDown = () => {
            gsap.to(currentLabel.current ? pill : dot, {
                scale: currentLabel.current ? 0.85 : 0.5,
                duration: 0.12,
                ease: 'power2.in',
            });
        };

        const onMouseUp = () => {
            gsap.to(currentLabel.current ? pill : dot, {
                scale: 1,
                duration: 0.35,
                ease: 'elastic.out(1, 0.4)',
            });
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseover', onHover);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onHover);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isTouchDevice]);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Small dot (default state) */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-white pointer-events-none z-[10000] mix-blend-difference"
                style={{ willChange: 'transform' }}
            />
            {/* Label pill (hover state) */}
            <div
                ref={pillRef}
                className="fixed top-0 left-0 -mt-4 rounded-full bg-white pointer-events-none z-[10000] flex items-center justify-center overflow-hidden mix-blend-difference"
                style={{ willChange: 'transform', width: 0, opacity: 0, transform: 'translate(-50%, 0) scale(0.5)' }}
            >
                <span
                    ref={labelRef}
                    className="text-black text-[10px] font-black tracking-[0.2em] uppercase whitespace-nowrap"
                />
            </div>
        </>
    );
}
