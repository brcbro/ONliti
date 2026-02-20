'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const pathname = usePathname();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // All hooks must be called unconditionally (Rules of Hooks)
    const waterHeight = useTransform(scrollYProgress, [0.9, 1], ["0vh", "100vh"]);
    const waterRadiusL = useTransform(scrollYProgress, [0.9, 1], ["100%", "0%"]);
    const waterRadiusR = useTransform(scrollYProgress, [0.9, 1], ["100%", "0%"]);

    const isContact = pathname === '/contact';

    if (isContact) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 h-1.5 z-[1000] bg-white/5 pointer-events-none mix-blend-difference">
            <motion.div
                className="h-full bg-white origin-left"
                style={{ scaleX }}
            />

            {/* Glow Effect */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-full bg-white blur-[4px] opacity-50 origin-left"
                style={{ scaleX }}
            />

            {/* Water Fill Effect */}
            <motion.div
                className="fixed bottom-0 left-0 right-0 bg-white z-[999]"
                style={{
                    height: waterHeight,
                    borderTopLeftRadius: waterRadiusL,
                    borderTopRightRadius: waterRadiusR,
                }}
            />
        </div>
    );
}
