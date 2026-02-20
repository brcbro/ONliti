'use client';

import Hero3D from "@/components/Hero3D";
import Services from "@/components/Services";
import ProjectShowcase from "@/components/ProjectShowcase";
import Contact from "@/components/Contact";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";

export default function Home() {
    return (
        <main className="snap-container">
            {/* Cinematic Hero Section */}
            <section className="snap-section relative overflow-hidden h-screen flex items-end justify-center">
                <div className="absolute inset-0 pointer-events-none">
                    <Hero3D />
                </div>

                {/* Stronger bottom gradient so text is always readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-[1]" />

                <div className="container mx-auto px-4 md:px-12 z-10 relative pb-8 md:pb-16">

                    {/* Decorative SVG — Rotating Starburst */}
                    <motion.svg
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.15, scale: 1, rotate: 360 }}
                        transition={{ opacity: { duration: 1, delay: 0.8 }, scale: { duration: 1, delay: 0.8 }, rotate: { duration: 40, repeat: Infinity, ease: "linear" } }}
                        className="absolute -top-32 right-4 md:right-12 w-24 h-24 md:w-32 md:h-32 text-white pointer-events-none"
                        viewBox="0 0 100 100" fill="none"
                    >
                        {[...Array(8)].map((_, i) => (
                            <line key={i} x1="50" y1="5" x2="50" y2="25" stroke="currentColor" strokeWidth="1"
                                transform={`rotate(${i * 45} 50 50)`} />
                        ))}
                        <circle cx="50" cy="50" r="3" fill="currentColor" />
                        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" />
                    </motion.svg>

                    {/* Subheading */}
                    <div className="overflow-hidden">
                        <motion.p
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                            className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/40 font-medium mb-4 md:mb-6"
                        >
                            Digital Alchemy Since 2024
                        </motion.p>
                    </div>

                    {/* Main Headline — Left-aligned, editorial with grain */}
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: 120, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                            className="text-[7.5vw] md:text-[7vw] leading-[0.85] font-black tracking-tighter"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E"), linear-gradient(135deg, #ffffff, #e0e0e0, #ffffff)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundSize: '150px 150px, 100% 100%',
                            }}
                        >
                            YOUR BRAND
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: 120, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.12, ease: [0.33, 1, 0.68, 1] }}
                            className="text-[7.5vw] md:text-[7vw] leading-[0.85] font-black tracking-tighter"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E"), linear-gradient(135deg, #c4b5fd, #8b5cf6, #7c3aed)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundSize: '150px 150px, 100% 100%',
                            }}
                        >
                            WEAPONIZED.
                        </motion.h1>
                    </div>

                    {/* Divider + CTA row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0"
                    >
                        {/* Decorative line */}
                        <div className="hidden md:block w-[1px] h-0" />

                        <div className="flex gap-3 md:gap-4 items-center flex-col sm:flex-row w-full md:w-auto">
                            <Magnetic>
                                <Link href="/#work" className="w-full sm:w-auto">
                                    <button className="w-full sm:w-[200px] py-2.5 md:py-3.5 bg-white text-black font-bold text-xs md:text-sm rounded-full hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group">
                                        EXPLORE WORK <MoveRight className="group-hover:translate-x-2 transition-transform" size={16} />
                                    </button>
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <Link href="/contact" className="w-full sm:w-auto">
                                    <button className="w-full sm:w-[200px] py-2.5 md:py-3.5 border border-white/20 text-white font-bold text-xs md:text-sm rounded-full hover:bg-white/10 transition-all flex items-center justify-center">
                                        GET IN TOUCH
                                    </button>
                                </Link>
                            </Magnetic>
                        </div>
                    </motion.div>
                </div>

            </section>

            {/* Services Section */}
            <Services />

            {/* Project Showcase Section */}
            <ProjectShowcase />

            {/* Final Contact Section */}
            <Contact />
        </main>
    );
}
