'use client';

import { useRef } from 'react';
import Hero3D from "@/components/Hero3D";
import Services from "@/components/Services";
import ProjectShowcase from "@/components/ProjectShowcase";
import TrustSignals from "@/components/TrustSignals";
import Contact from "@/components/Contact";
import MarqueeText from "@/components/MarqueeText";
import { MoveRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import SchemaMarkup from "@/components/SchemaMarkup";
import { serviceSchema, faqSchema } from "@/config/seo";
import { gsap, useGSAP } from '@/lib/gsap';

export default function HomeClient() {
    const heroRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!heroRef.current) return;

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        // Starburst entrance
        tl.from('.hero-starburst', {
            scale: 0,
            autoAlpha: 0,
            rotation: -180,
            duration: 1.2,
            ease: 'back.out(1.7)',
        }, 0.5);

        // Infinite rotation for starburst
        gsap.to('.hero-starburst', {
            rotation: 360,
            duration: 40,
            ease: 'none',
            repeat: -1,
        });

        // Eyebrow text
        tl.from('.hero-eyebrow', {
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
        }, 0.2);

        // Main headline - line by line reveal with clip path
        tl.from('.hero-line-1', {
            y: 120,
            autoAlpha: 0,
            duration: 1.2,
            ease: 'power4.out',
        }, 0.4);

        tl.from('.hero-line-2', {
            y: 120,
            autoAlpha: 0,
            duration: 1.2,
            ease: 'power4.out',
        }, 0.55);

        // CTA buttons stagger
        tl.from('.hero-cta', {
            y: 30,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.15,
        }, 0.9);

        // Subtle parallax on scroll
        gsap.to('.hero-content', {
            y: -80,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
        });

        // Hero fade out on scroll
        gsap.to('.hero-content', {
            autoAlpha: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: '60% top',
                end: 'bottom top',
                scrub: 1,
            },
        });

    }, { scope: heroRef });

    return (
        <main className="snap-container">
            <SchemaMarkup schema={[...serviceSchema, faqSchema]} />

            {/* Cinematic Hero Section */}
            <section ref={heroRef} className="snap-section relative overflow-hidden h-screen flex items-end justify-center">
                <div className="absolute inset-0 pointer-events-none">
                    <Hero3D />
                </div>

                {/* Stronger bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-[1]" />

                <div className="hero-content container mx-auto px-4 md:px-12 z-10 relative pb-8 md:pb-16">

                    {/* Decorative SVG — Rotating Starburst */}
                    <svg
                        className="hero-starburst absolute -top-32 right-4 md:right-12 w-24 h-24 md:w-32 md:h-32 text-white pointer-events-none opacity-15"
                        viewBox="0 0 100 100" fill="none"
                    >
                        {[...Array(8)].map((_, i) => (
                            <line key={i} x1="50" y1="5" x2="50" y2="25" stroke="currentColor" strokeWidth="1"
                                transform={`rotate(${i * 45} 50 50)`} />
                        ))}
                        <circle cx="50" cy="50" r="3" fill="currentColor" />
                        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" />
                    </svg>

                    {/* Subheading */}
                    <div className="overflow-hidden">
                        <p className="hero-eyebrow text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/40 font-medium mb-4 md:mb-6">
                            Digital Alchemy Since 2024
                        </p>
                    </div>

                    {/* Structurally sound, SEO-optimized single H1 */}
                    <h1 className="sr-only">Your Brand Weaponized. High-Conversion B2B and E-Commerce Landing Pages.</h1>

                    {/* Main Headline */}
                    <div className="overflow-hidden" aria-hidden="true">
                        <div
                            className="hero-line-1 text-[7.5vw] md:text-[7vw] leading-[0.85] font-black tracking-tighter"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E"), linear-gradient(135deg, #ffffff, #e0e0e0, #ffffff)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundSize: '150px 150px, 100% 100%',
                            }}
                        >
                            YOUR BRAND
                        </div>
                    </div>
                    <div className="overflow-hidden" aria-hidden="true">
                        <div
                            className="hero-line-2 text-[7.5vw] md:text-[7vw] leading-[0.85] font-black tracking-tighter"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E"), linear-gradient(135deg, #c4b5fd, #8b5cf6, #7c3aed)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundSize: '150px 150px, 100% 100%',
                            }}
                        >
                            WEAPONIZED.
                        </div>
                    </div>

                    {/* CTA row */}
                    <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0">
                        <div className="hidden md:block w-[1px] h-0" />
                        <div className="flex gap-3 md:gap-4 items-center flex-col sm:flex-row w-full md:w-auto">
                            <Magnetic>
                                <Link href="/#work" className="hero-cta w-full sm:w-auto">
                                    <button className="w-full sm:w-[200px] py-2.5 md:py-3.5 bg-white text-black font-bold text-xs md:text-sm rounded-full hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group">
                                        EXPLORE WORK <MoveRight className="group-hover:translate-x-2 transition-transform" size={16} />
                                    </button>
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <Link href="/contact" className="hero-cta w-full sm:w-auto">
                                    <button className="w-full sm:w-[200px] py-2.5 md:py-3.5 border border-white/20 text-white font-bold text-xs md:text-sm rounded-full hover:bg-white/10 transition-all flex items-center justify-center">
                                        GET IN TOUCH
                                    </button>
                                </Link>
                            </Magnetic>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marquee divider */}
            <div className="py-6 md:py-10 border-y border-white/5 bg-[#050505] relative z-10">
                <MarqueeText
                    text="DESIGN \u2022 DEVELOP \u2022 DEPLOY \u2022 DOMINATE"
                    className="text-[3vw] md:text-[1.5vw] font-black tracking-[0.3em] text-white/10 uppercase"
                    speed={30}
                />
            </div>

            {/* Services Section */}
            <Services />

            {/* Project Showcase Section */}
            <ProjectShowcase />

            {/* Marquee divider */}
            <div className="py-6 md:py-10 border-y border-white/5 bg-[#050505] relative z-10">
                <MarqueeText
                    text="PREMIUM \u2022 BESPOKE \u2022 SCALABLE \u2022 PERFORMANT"
                    className="text-[3vw] md:text-[1.5vw] font-black tracking-[0.3em] text-white/10 uppercase"
                    speed={25}
                    direction="right"
                />
            </div>

            {/* Testimonials & Trust Signals */}
            <TrustSignals />

            {/* Final Contact Section */}
            <Contact />
        </main>
    );
}
