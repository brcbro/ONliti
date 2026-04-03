'use client';

import { motion } from 'framer-motion';
import { Zap, Layers, Rocket } from 'lucide-react';
import Contact from '@/components/Contact';

export default function AboutClient() {
    const pillars = [
        {
            icon: <Zap size={20} />,
            title: 'DIGITAL ALCHEMY',
            desc: 'Transforming raw ideas into crystalline digital experiences through precision code and surgical design.',
        },
        {
            icon: <Layers size={20} />,
            title: 'CUSTOM BY DEFAULT',
            desc: 'No templates. No compromises. Every solution is as unique and uncompromising as the problem it solves.',
        },
        {
            icon: <Rocket size={20} />,
            title: 'RAPID DEPLOYMENT',
            desc: 'In a fast world, we are faster. High-performance pages built at the speed of thought.',
        },
    ];

    return (
        <main className="bg-[#050505] text-white min-h-screen overflow-x-hidden">

            {/* ─── HERO ─────────────────────────────────────────── */}
            <section className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 overflow-hidden">
                {/* Cinematic video bg */}
                <div className="absolute inset-0 z-0">
                    <video
                        src="https://framerusercontent.com/assets/qCsdRszWc0kdXg6VVE5yAvL0b30.mp4"
                        loop muted playsInline autoPlay
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-6 md:px-12">
                    {/* Eyebrow */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[10px] uppercase tracking-[0.4em] text-violet-400 font-bold mb-5"
                    >
                        Digital Alchemy Since 2024
                    </motion.p>

                    {/* Main headline */}
                    <div className="overflow-hidden mb-4">
                        <motion.h1
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
                            className="font-black tracking-tighter uppercase leading-[0.88]"
                            style={{ fontSize: 'clamp(2rem, 5.5vw, 5.5rem)' }}
                        >
                            THE ARCHITECTS
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden mb-10">
                        <motion.p
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.9, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                            className="font-black tracking-tighter uppercase leading-[0.88] text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-300 to-white"
                            style={{ fontSize: 'clamp(2rem, 5.5vw, 5.5rem)' }}
                        >
                            OF DIGITAL DESIRE.
                        </motion.p>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.35 }}
                        className="text-base md:text-xl text-white/60 max-w-xl font-medium leading-relaxed"
                    >
                        At ONliti, we don&apos;t just build websites.{' '}
                        <span className="text-white">We engineer digital gravity.</span>
                    </motion.p>
                </div>
            </section>

            {/* ─── PHILOSOPHY ───────────────────────────────────── */}
            <section className="py-20 md:py-32 px-6 relative">
                {/* Subtle glow */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/6 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

                        {/* ── Left: prose */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className="text-[10px] uppercase tracking-[0.4em] text-violet-400 font-bold mb-5 block">
                                Our Philosophy
                            </span>
                            <h2 className="font-black tracking-tighter uppercase leading-[0.92] mb-8"
                                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3.2rem)' }}>
                                WE ARE<br />THE COLLECTIVE.
                            </h2>
                            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-5">
                                We are a team of restless enthusiasts, obsessed with the bespoke, catering to the custom demands of an evolving digital landscape. We believe every pixel has a purpose and every line of code should be a weapon.
                            </p>
                            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                                Our mission is simple: to weaponize your brand for a world where attention is the only currency that matters. From startups seeking a pulse to enterprises demanding a digital stronghold — we deliver the precision your vision deserves.
                            </p>
                        </motion.div>

                        {/* ── Right: pillars */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="flex flex-col gap-0"
                        >
                            {pillars.map((p, i) => (
                                <div key={p.title} className={`border-t border-white/10 py-8 ${i === pillars.length - 1 ? 'border-b' : ''}`}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-violet-400">{p.icon}</span>
                                        <h3 className="text-sm font-black tracking-widest">{p.title}</h3>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── CTA — shared Contact component ───────────────── */}
            <Contact />

        </main>
    );
}
