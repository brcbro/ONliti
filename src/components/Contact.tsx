'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/config/siteConfig';

export default function Contact() {
    const socialIcons = [
        { key: 'email', icon: <Mail size={20} />, href: `mailto:${siteConfig.email}` },
        { key: 'github', icon: <Github size={20} />, href: siteConfig.socials.github },
        { key: 'twitter', icon: <Twitter size={20} />, href: siteConfig.socials.twitter },
        { key: 'linkedin', icon: <Linkedin size={20} />, href: siteConfig.socials.linkedin },
        { key: 'instagram', icon: <Instagram size={20} />, href: siteConfig.socials.instagram },
    ].filter(s => s.href); // only show icons with a URL

    return (
        <section className="snap-section bg-black px-6 py-12 md:py-20 relative overflow-hidden flex flex-col items-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto max-w-4xl relative z-10 flex-grow flex flex-col justify-center items-center text-center pt-24 md:pt-0">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter uppercase leading-[0.9]">
                        READY TO <br /><span className="text-blue-500">SCALE?</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-12">
                        Let's turn your vision into a digital reality.
                    </p>

                    <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-white text-black font-black text-base md:text-lg rounded-full hover:bg-gray-200 hover:scale-105 transition-all group">
                        START A PROJECT <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            {/* Footer Info */}
            <div className="w-full container mx-auto max-w-6xl border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <span>Made With ❤️ by {siteConfig.madeBy}</span>
                    <span>{siteConfig.copyright}</span>
                </div>
                <div className="flex gap-6">
                    {socialIcons.map(s => (
                        <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{s.icon}</a>
                    ))}
                </div>
            </div>
        </section>
    );
}
