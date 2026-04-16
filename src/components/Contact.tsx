'use client';

import { useRef } from 'react';
import { Mail, Github, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/config/siteConfig';
import Magnetic from '@/components/Magnetic';
import { gsap, useGSAP } from '@/lib/gsap';

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const socialIcons = [
        { key: 'email', icon: <Mail size={20} />, href: `mailto:${siteConfig.email}` },
        { key: 'github', icon: <Github size={20} />, href: siteConfig.socials.github },
        { key: 'twitter', icon: <Twitter size={20} />, href: siteConfig.socials.twitter },
        { key: 'linkedin', icon: <Linkedin size={20} />, href: siteConfig.socials.linkedin },
        { key: 'instagram', icon: <Instagram size={20} />, href: siteConfig.socials.instagram },
    ].filter(s => s.href);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // Background glow pulse
        gsap.to('.contact-glow', {
            scale: 1.3,
            autoAlpha: 0.8,
            duration: 3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
        });

        // Main CTA reveal
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none none',
            },
        });

        tl.from('.contact-heading', {
            y: 80,
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: 'power4.out',
        });

        tl.from('.contact-subtext', {
            y: 30,
            opacity: 0,
            duration: 0.7,
        }, '-=0.4');

        // Footer row
        tl.from('.contact-footer', {
            y: 20,
            opacity: 0,
            duration: 0.6,
        }, '-=0.2');

        // Social icons stagger
        tl.from('.social-icon', {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: 'back.out(2)',
        }, '-=0.3');

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="snap-section bg-black px-6 py-12 md:py-20 relative overflow-hidden flex flex-col items-center">
            {/* Background Glow */}
            <div className="contact-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto max-w-4xl relative z-10 flex-grow flex flex-col justify-center items-center text-center pt-24 md:pt-0">
                <div>
                    <h2 className="contact-heading text-5xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter uppercase leading-[0.9]">
                        READY TO <br /><span className="text-blue-500">SCALE?</span>
                    </h2>
                    <p className="contact-subtext text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-12">
                        Let&apos;s turn your vision into a digital reality.
                    </p>

                    <Magnetic strength={0.15}>
                        <Link href="/contact" className="contact-btn inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-white text-black font-black text-base md:text-lg rounded-full hover:bg-gray-200 hover:scale-105 transition-all group">
                            START A PROJECT <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Magnetic>
                </div>
            </div>

            {/* Footer Info */}
            <div className="contact-footer w-full container mx-auto max-w-6xl border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <span>Made With ❤️ by {siteConfig.madeBy}</span>
                    <span>{siteConfig.copyright}</span>
                </div>
                <div className="flex gap-6">
                    {socialIcons.map(s => (
                        <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon hover:text-white transition-colors">{s.icon}</a>
                    ))}
                </div>
            </div>
        </section>
    );
}
