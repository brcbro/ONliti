'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

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
                    <Link href="/" className="flex items-center shrink-0" onClick={() => setMobileOpen(false)}>
                        <Image src="/logo.png" alt="ONliti" width={64} height={22} className="h-5 w-auto" />
                    </Link>

                    <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
                        <Link href="/#work" className="text-xs font-medium hover:text-violet-400 transition-colors">Work</Link>
                        <Link href="/#services" className="text-xs font-medium hover:text-violet-400 transition-colors">Services</Link>
                    </div>

                    <button
                        className="md:hidden p-1 text-white/80"
                        onClick={() => setMobileOpen(!mobileOpen)}
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
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
                    >
                        <Link
                            href="/#work"
                            className="text-3xl font-bold tracking-tight text-white hover:text-violet-400 transition-colors"
                            onClick={() => setMobileOpen(false)}
                        >
                            Work
                        </Link>
                        <Link
                            href="/#services"
                            className="text-3xl font-bold tracking-tight text-white hover:text-violet-400 transition-colors"
                            onClick={() => setMobileOpen(false)}
                        >
                            Services
                        </Link>
                        <Link
                            href="/contact"
                            className="mt-4 px-8 py-3 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition-colors"
                            onClick={() => setMobileOpen(false)}
                        >
                            Let&apos;s Talk ✦
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
