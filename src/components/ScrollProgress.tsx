'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { usePathname } from 'next/navigation';

export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const waterRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [isContact, setIsContact] = useState(false);

    useEffect(() => {
        setIsContact(pathname === '/contact');
    }, [pathname]);

    useEffect(() => {
        if (isContact || !barRef.current || !glowRef.current || !waterRef.current) return;

        const bar = barRef.current;
        const glow = glowRef.current;
        const water = waterRef.current;

        // Main progress bar
        const progressTrigger = ScrollTrigger.create({
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(bar, { scaleX: progress, transformOrigin: 'left center' });
                gsap.set(glow, { scaleX: progress, transformOrigin: 'left center' });
            },
        });

        // Water fill effect at end
        const waterTrigger = ScrollTrigger.create({
            trigger: document.documentElement,
            start: '90% bottom',
            end: 'bottom bottom',
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(water, {
                    height: `${progress * 100}vh`,
                    borderTopLeftRadius: `${(1 - progress) * 100}%`,
                    borderTopRightRadius: `${(1 - progress) * 100}%`,
                });
            },
        });

        return () => {
            progressTrigger.kill();
            waterTrigger.kill();
        };
    }, [isContact]);

    // Route changes: recompute trigger bounds against the new page height
    // and reset the bar/water so we don't carry stale progress between pages.
    useEffect(() => {
        if (isContact) return;
        if (barRef.current) gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' });
        if (glowRef.current) gsap.set(glowRef.current, { scaleX: 0, transformOrigin: 'left center' });
        if (waterRef.current) gsap.set(waterRef.current, { height: 0 });

        // Wait for the new route to paint, then refresh. Two RAFs covers the
        // common case; a follow-up at 350ms catches late-loading content
        // (videos, lazy images) that change the document height.
        let raf1 = 0, raf2 = 0;
        const t = window.setTimeout(() => ScrollTrigger.refresh(), 350);
        raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => ScrollTrigger.refresh());
        });

        return () => {
            cancelAnimationFrame(raf1);
            cancelAnimationFrame(raf2);
            window.clearTimeout(t);
        };
    }, [pathname, isContact]);

    if (isContact) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 h-1.5 z-[1000] bg-white/5 pointer-events-none mix-blend-difference">
            <div
                ref={barRef}
                className="h-full bg-white"
                style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
            />

            {/* Glow Effect */}
            <div
                ref={glowRef}
                className="absolute top-0 left-0 right-0 h-full bg-white blur-[4px] opacity-50"
                style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
            />

            {/* Water Fill Effect */}
            <div
                ref={waterRef}
                className="fixed bottom-0 left-0 right-0 bg-white z-[999]"
                style={{ height: 0 }}
            />
        </div>
    );
}
