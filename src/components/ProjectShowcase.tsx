'use client';

import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { gsap, useGSAP } from '@/lib/gsap';

const projects = [
    {
        title: "DREAM GREEN",
        category: "E-commerce Website",
        description: "A premium digital experience for gifting plants in Surat, designed for seamless conversion.",
        video: "https://framerusercontent.com/assets/3617at5Ss1Lc4HOX3Z7QNLnUP8.mp4",
        poster: "https://framerusercontent.com/images/gfMLghOxL9U41yIA4AywQpuL0I.png?width=1600&height=1600",
        year: "2026",
        color: "#22c55e"
    },
    {
        title: "QUANTUM FINANCE",
        category: "Fintech Platform",
        description: "High-frequency trading visualization dashboard with real-time data processing.",
        video: "https://framerusercontent.com/assets/i4nloUQQuGXKCjureGC7vA6C46s.mp4",
        poster: "https://framerusercontent.com/images/RSFFCqu8LGt7K7fZOjOnPKy50E0.png?width=2560&height=2560",
        year: "2025",
        color: "#a855f7"
    },
    {
        title: "AETHER VISION",
        category: "AI Interface",
        description: "Computer vision analysis tool for autonomous drone fleet management.",
        video: "https://framerusercontent.com/assets/VwQPaTQpRM0jHm3Tz6chzrkrZM.mp4",
        poster: "https://framerusercontent.com/images/axCUyrOgrZtFMleSAorxkRxumk.png?width=1600&height=1600",
        year: "2024",
        color: "#ec4899"
    },
];

export default function ProjectShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // Section heading
        const headingTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.work-header',
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });

        headingTl.from('.work-title', {
            y: 80,
            autoAlpha: 0,
            duration: 1,
            ease: 'power4.out',
        });

        headingTl.from('.work-divider', {
            scaleX: 0,
            duration: 1,
            ease: 'power3.inOut',
            transformOrigin: 'center center',
        }, '-=0.5');

        // Project cards - stacking effect with ScrollTrigger
        const cards = sectionRef.current.querySelectorAll('.project-card-wrapper');

        cards.forEach((card, i) => {
            const inner = card.querySelector('.project-card') as HTMLElement;
            if (!inner) return;

            // Scale down as next card comes in
            if (i < cards.length - 1) {
                gsap.to(inner, {
                    scale: 0.9,
                    autoAlpha: 0.5,
                    filter: 'blur(4px)',
                    scrollTrigger: {
                        trigger: cards[i + 1],
                        start: 'top bottom',
                        end: 'top 20%',
                        scrub: 1,
                    },
                });
            }

            // Content reveal inside each card
            const title = inner.querySelector('.project-title');
            const desc = inner.querySelector('.project-desc');
            const link = inner.querySelector('.project-link');
            const meta = inner.querySelector('.project-meta');

            const contentTl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top 60%',
                    toggleActions: 'play none none none',
                },
            });

            if (meta) contentTl.from(meta, { y: 20, autoAlpha: 0, duration: 0.6 }, 0);
            if (title) contentTl.from(title, { y: 40, autoAlpha: 0, duration: 0.8, ease: 'power4.out' }, 0.15);
            if (desc) contentTl.from(desc, { y: 30, autoAlpha: 0, duration: 0.7 }, 0.3);
            if (link) contentTl.from(link, { y: 20, autoAlpha: 0, duration: 0.6 }, 0.45);
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="work" className="relative bg-[#050505] mt-12 md:mt-0">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 mb-8 md:mb-12">
                <div className="work-header">
                    <h2 className="work-title text-[6vw] md:text-[6vw] font-black leading-none tracking-tighter text-white opacity-20 text-center md:text-left">
                        SELECTED WORK
                    </h2>
                    <div className="work-divider h-[1px] w-full bg-white/10 mt-8"></div>
                </div>
            </div>

            <div className="pb-[20vh]">
                {projects.map((project, index) => (
                    <div key={index} className="project-card-wrapper h-screen flex items-center justify-center sticky top-8">
                        <div
                            className="project-card relative flex flex-col w-[95vw] md:w-[70vw] h-[55vh] md:h-[70vh] rounded-2xl md:rounded-[3rem] p-6 md:p-12 origin-top border border-white/10 bg-[#0a0a0a] overflow-hidden"
                            style={{ top: `calc(-3vh + ${index * 25}px)`, willChange: 'transform, filter' }}
                        >
                            {/* Background Video */}
                            <div className="absolute inset-0 z-0">
                                <video
                                    src={project.video}
                                    poster={project.poster}
                                    loop
                                    muted
                                    playsInline
                                    autoPlay
                                    preload="auto"
                                    className="w-full h-full object-cover opacity-70"
                                />
                                <div className="absolute inset-0 bg-black/50" />
                            </div>

                            {/* Content */}
                            <div className="project-content relative z-10 h-full flex flex-col justify-between">
                                <div className="project-meta flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }}></span>
                                        <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white/80">{project.category}</span>
                                    </div>
                                    <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-[10px] md:text-xs font-bold tracking-widest">
                                        {project.year}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="project-title text-3xl md:text-7xl font-black tracking-tighter mix-blend-difference leading-[0.9]">{project.title}</h3>
                                    <p className="project-desc text-gray-300 max-w-md text-sm md:text-lg font-light leading-relaxed">{project.description}</p>

                                    <div className="project-link pt-4">
                                        <Link href="/contact" className="inline-flex items-center gap-2 text-white font-bold border-b border-white pb-1 hover:opacity-70 transition-opacity">
                                            DISCUSS PROJECT <ArrowUpRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
