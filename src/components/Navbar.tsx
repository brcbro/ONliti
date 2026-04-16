'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from '@/lib/gsap';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const menuLinksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const openMenu = useCallback(() => {
        setMobileOpen(true);
        // Animate in next frame after state renders the DOM
        requestAnimationFrame(() => {
            if (!overlayRef.current || !menuLinksRef.current) return;

            const tl = gsap.timeline();

            tl.fromTo(overlayRef.current,
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.4, ease: 'power2.out' }
            );

            const links = menuLinksRef.current.querySelectorAll('.menu-link');
            tl.from(links, {
                y: 60,
                autoAlpha: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power4.out',
            }, '-=0.2');

            const cta = menuLinksRef.current.querySelector('.menu-cta');
            if (cta) {
                tl.from(cta, {
                    y: 30,
                    autoAlpha: 0,
                    scale: 0.9,
                    duration: 0.5,
                    ease: 'back.out(1.7)',
                }, '-=0.3');
            }
        });
    }, []);

    const closeMenu = useCallback(() => {
        if (!overlayRef.current) {
            setMobileOpen(false);
            return;
        }

        gsap.to(overlayRef.current, {
            autoAlpha: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => setMobileOpen(false),
        });
    }, []);

    return (
        <>
            <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-xl px-0 md:px-4">
                <div className={`
                    flex items-center justify-between px-4 py-2 rounded-full
                    transition-all duration-300 backdrop-blur-md border relative
                    ${scrolled
                        ? 'bg-black/60 border-white/10 shadow-2xl'
                        : 'bg-white/5 border-white/5 shadow-none'}
                `}>
                    <Link href="/" className="flex items-center shrink-0" onClick={closeMenu}>
                        <Image src="/newlogo.png" alt="ONliti" width={64} height={22} className="h-5 w-auto" />
                    </Link>

                    <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
                        <Link href="/#work" className="text-xs font-medium hover:text-violet-400 transition-colors">Work</Link>
                        <Link href="/about" className="text-xs font-medium hover:text-violet-400 transition-colors">About</Link>
                        <Link href="/#services" className="text-xs font-medium hover:text-violet-400 transition-colors">Services</Link>
                    </div>

                    <button
                        className="md:hidden p-1 text-white/80"
                        onClick={mobileOpen ? closeMenu : openMenu}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <div className="hidden md:block">
                        <Link href="/contact" className="flex items-center gap-1.5 nav-btn px-4 py-1.5 text-[11px] font-semibold tracking-wide text-white/90 whitespace-nowrap">
                            Let&apos;s Talk <span className="text-[9px]">✦</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileOpen && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
                    style={{ visibility: 'hidden' }}
                >
                    <div ref={menuLinksRef} className="flex flex-col items-center gap-8">
                        {[
                            { href: '/#work', label: 'Work' },
                            { href: '/about', label: 'About' },
                            { href: '/#services', label: 'Services' },
                        ].map((item) => (
                            <div key={item.href} className="overflow-hidden">
                                <Link
                                    href={item.href}
                                    className="menu-link block text-3xl font-bold tracking-tight text-white hover:text-violet-400 transition-colors"
                                    onClick={closeMenu}
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}
                        <Link
                            href="/contact"
                            className="menu-cta mt-4 px-8 py-3 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition-colors"
                            onClick={closeMenu}
                        >
                            Let&apos;s Talk ✦
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
