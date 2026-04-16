'use client';

import { useRef } from 'react';
import { ArrowUpRight, Code, PenTool, BarChart3, Globe, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

const services = [
    {
        id: "digital-ecosystems",
        title: "Digital Ecosystems",
        description: "Full-stack web applications built for scale and performance.",
        icon: <Globe size={32} />,
        col: "col-span-12 md:col-span-8",
        bg: "bg-blue-600/10"
    },
    {
        id: "mobile-innovation",
        title: "Mobile Innovation",
        description: "Native and cross-platform apps that define user behavior.",
        icon: <Smartphone size={32} />,
        col: "col-span-12 md:col-span-4",
        bg: "bg-purple-600/10"
    },
    {
        id: "brand-identity",
        title: "Brand Identity",
        description: "Visual languages that speak louder than words.",
        icon: <PenTool size={32} />,
        col: "col-span-12 md:col-span-4",
        bg: "bg-pink-600/10"
    },
    {
        id: "technical-strategy",
        title: "Technical Strategy",
        description: "Architecture and consulting for complex digital problems.",
        icon: <Code size={32} />,
        col: "col-span-12 md:col-span-4",
        bg: "bg-emerald-600/10"
    },
    {
        id: "growth-engineering",
        title: "Growth Engineering",
        description: "Data-driven development to accelerate business metrics.",
        icon: <BarChart3 size={32} />,
        col: "col-span-12 md:col-span-4",
        bg: "bg-orange-600/10"
    }
];

export default function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // Section heading reveal
        const headingTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.services-header',
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });

        headingTl.from('.services-title', {
            y: 80,
            autoAlpha: 0,
            duration: 1,
            ease: 'power4.out',
        });

        headingTl.from('.services-divider', {
            scaleX: 0,
            duration: 1,
            ease: 'power3.inOut',
            transformOrigin: 'left center',
        }, '-=0.5');

        // Service cards - batch stagger reveal
        ScrollTrigger.batch('.service-card', {
            start: 'top 85%',
            onEnter: (batch) => {
                gsap.from(batch, {
                    y: 60,
                    autoAlpha: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'power3.out',
                });
            },
            once: true,
        });

        // Card hover magnetic tilt via GSAP
        const cards = sectionRef.current.querySelectorAll('.service-card');
        cards.forEach((card) => {
            const el = card as HTMLElement;
            const glow = el.querySelector('.card-glow') as HTMLElement;

            el.addEventListener('mouseenter', () => {
                gsap.to(el, { scale: 1.02, duration: 0.4, ease: 'power2.out' });
                if (glow) gsap.to(glow, { autoAlpha: 1, duration: 0.4 });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, { scale: 1, rotationX: 0, rotationY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
                if (glow) gsap.to(glow, { autoAlpha: 0, duration: 0.4 });
            });

            el.addEventListener('mousemove', (e: Event) => {
                const me = e as MouseEvent;
                const rect = el.getBoundingClientRect();
                const x = me.clientX - rect.left;
                const y = me.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                gsap.to(el, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    duration: 0.3,
                    ease: 'power2.out',
                    transformPerspective: 800,
                });

                if (glow) {
                    gsap.to(glow, {
                        x: x - rect.width / 2,
                        y: y - rect.height / 2,
                        duration: 0.3,
                    });
                }
            });
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="services" className="snap-section min-h-screen bg-[#050505] py-16 md:py-24 px-4 md:px-6 relative flex items-center">
            <div className="container mx-auto">
                <div className="services-header mb-16 overflow-hidden">
                    <h2 className="services-title text-[8vw] md:text-[6vw] font-black leading-none tracking-tighter text-white opacity-20">
                        EXPERTISE
                    </h2>
                    <div className="services-divider h-[1px] w-full bg-white/10 mt-4"></div>
                </div>

                <div className="grid grid-cols-12 gap-4 md:gap-8">
                    {services.map((service, index) => (
                        <Link href={`/services/${service.id}`} key={index} className={`block col-span-12 ${service.col.includes('md:col-span') ? service.col.split(' ').filter(c => c.startsWith('md:')).join(' ') : ''}`}>
                            <div
                                className={`service-card h-full group relative overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 md:p-12 transition-colors duration-300 hover:border-white/10`}
                                style={{ willChange: 'transform' }}
                            >
                                <div className={`card-glow absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 invisible ${service.bg}`}></div>

                                <div className="relative z-10 h-full flex flex-col justify-between gap-8">
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 md:p-4 rounded-full bg-white/5 text-white/80 group-hover:text-white group-hover:bg-white/10 transition-colors">
                                            {service.icon}
                                        </div>
                                        <ArrowUpRight className="text-white/30 group-hover:text-white transition-colors" size={32} />
                                    </div>

                                    <div>
                                        <h3 className="text-xl md:text-4xl font-bold mb-2 md:mb-4">{service.title}</h3>
                                        <p className="text-gray-400 text-sm md:text-lg">{service.description}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
