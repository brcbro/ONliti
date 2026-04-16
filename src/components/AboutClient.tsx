'use client';

import { useRef } from 'react';
import { Zap, Layers, Rocket } from 'lucide-react';
import Contact from '@/components/Contact';
import { gsap, useGSAP } from '@/lib/gsap';

export default function AboutClient() {
    const heroRef = useRef<HTMLDivElement>(null);
    const philosophyRef = useRef<HTMLDivElement>(null);

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

    useGSAP(() => {
        if (!heroRef.current) return;

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.from('.about-eyebrow', {
            y: 30,
            autoAlpha: 0,
            duration: 0.7,
        }, 0.2);

        tl.from('.about-headline-1', {
            y: 80,
            autoAlpha: 0,
            duration: 1,
        }, 0.35);

        tl.from('.about-headline-2', {
            y: 80,
            autoAlpha: 0,
            duration: 1,
        }, 0.5);

        tl.from('.about-desc', {
            y: 30,
            autoAlpha: 0,
            duration: 0.8,
        }, 0.7);

        // Parallax on hero video
        gsap.to('.about-hero-video', {
            y: -60,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
        });

    }, { scope: heroRef });

    useGSAP(() => {
        if (!philosophyRef.current) return;

        // Philosophy left column
        const leftTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.philosophy-left',
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });

        leftTl.from('.philosophy-eyebrow', {
            y: 20,
            autoAlpha: 0,
            duration: 0.6,
        });

        leftTl.from('.philosophy-heading', {
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
        }, '-=0.3');

        leftTl.from('.philosophy-text', {
            y: 25,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.15,
        }, '-=0.4');

        // Pillars - staggered reveal from right
        const pillarItems = philosophyRef.current.querySelectorAll('.pillar-item');

        pillarItems.forEach((pillar, i) => {
            const icon = pillar.querySelector('.pillar-icon');
            const title = pillar.querySelector('.pillar-title');
            const desc = pillar.querySelector('.pillar-desc');

            const pillarTl = gsap.timeline({
                scrollTrigger: {
                    trigger: pillar,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            pillarTl.from(pillar, {
                x: 40,
                autoAlpha: 0,
                duration: 0.7,
                delay: i * 0.1,
            });

            if (icon) {
                pillarTl.from(icon, {
                    scale: 0,
                    rotation: -90,
                    duration: 0.5,
                    ease: 'back.out(2)',
                }, '-=0.3');
            }

            if (title) {
                pillarTl.from(title, {
                    x: 20,
                    autoAlpha: 0,
                    duration: 0.4,
                }, '-=0.2');
            }

            if (desc) {
                pillarTl.from(desc, {
                    y: 10,
                    autoAlpha: 0,
                    duration: 0.4,
                }, '-=0.1');
            }
        });

        // Glow animation
        gsap.to('.about-glow', {
            scale: 1.5,
            autoAlpha: 0.5,
            duration: 4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
        });

    }, { scope: philosophyRef });

    return (
        <main className="bg-[#050505] text-white min-h-screen overflow-x-hidden">

            {/* HERO */}
            <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 overflow-hidden">
                <div className="about-hero-video absolute inset-0 z-0">
                    <video
                        src="https://framerusercontent.com/assets/qCsdRszWc0kdXg6VVE5yAvL0b30.mp4"
                        loop muted playsInline autoPlay
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-6 md:px-12">
                    <p className="about-eyebrow text-[10px] uppercase tracking-[0.4em] text-violet-400 font-bold mb-5">
                        Digital Alchemy Since 2024
                    </p>

                    <div className="overflow-hidden mb-4">
                        <h1
                            className="about-headline-1 font-black tracking-tighter uppercase leading-[0.88]"
                            style={{ fontSize: 'clamp(2rem, 5.5vw, 5.5rem)' }}
                        >
                            THE ARCHITECTS
                        </h1>
                    </div>
                    <div className="overflow-hidden mb-10">
                        <p
                            className="about-headline-2 font-black tracking-tighter uppercase leading-[0.88] text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-300 to-white"
                            style={{ fontSize: 'clamp(2rem, 5.5vw, 5.5rem)' }}
                        >
                            OF DIGITAL DESIRE.
                        </p>
                    </div>

                    <p className="about-desc text-base md:text-xl text-white/60 max-w-xl font-medium leading-relaxed">
                        At ONliti, we don&apos;t just build websites.{' '}
                        <span className="text-white">We engineer digital gravity.</span>
                    </p>
                </div>
            </section>

            {/* PHILOSOPHY */}
            <section ref={philosophyRef} className="py-20 md:py-32 px-6 relative">
                <div className="about-glow absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/6 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

                        <div className="philosophy-left">
                            <span className="philosophy-eyebrow text-[10px] uppercase tracking-[0.4em] text-violet-400 font-bold mb-5 block">
                                Our Philosophy
                            </span>
                            <h2 className="philosophy-heading font-black tracking-tighter uppercase leading-[0.92] mb-8"
                                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3.2rem)' }}>
                                WE ARE<br />THE COLLECTIVE.
                            </h2>
                            <p className="philosophy-text text-gray-400 text-base md:text-lg leading-relaxed mb-5">
                                We are a team of restless enthusiasts, obsessed with the bespoke, catering to the custom demands of an evolving digital landscape. We believe every pixel has a purpose and every line of code should be a weapon.
                            </p>
                            <p className="philosophy-text text-gray-400 text-base md:text-lg leading-relaxed">
                                Our mission is simple: to weaponize your brand for a world where attention is the only currency that matters. From startups seeking a pulse to enterprises demanding a digital stronghold — we deliver the precision your vision deserves.
                            </p>
                        </div>

                        <div className="flex flex-col gap-0">
                            {pillars.map((p, i) => (
                                <div key={p.title} className={`pillar-item border-t border-white/10 py-8 ${i === pillars.length - 1 ? 'border-b' : ''}`}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="pillar-icon text-violet-400">{p.icon}</span>
                                        <h3 className="pillar-title text-sm font-black tracking-widest">{p.title}</h3>
                                    </div>
                                    <p className="pillar-desc text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <Contact />
        </main>
    );
}
