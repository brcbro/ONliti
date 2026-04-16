'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { gsap, useGSAP } from '@/lib/gsap';

export default function ContactClient() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data.access_key = siteConfig.web3formsKey;
        data.subject = `New inquiry from ${data.name} — ${siteConfig.name}`;
        data.from_name = siteConfig.name;

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (result.success) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
                setErrorMsg(result.message || 'Something went wrong.');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Network error. Please try again.');
        }
    }

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        // Left column - video + info (use opacity only, not autoAlpha,
        // so children don't inherit visibility:hidden)
        tl.from('.contact-left-video', {
            x: -60,
            opacity: 0,
            duration: 1,
        }, 0.1);

        // Contact badges stagger (standalone, not in timeline)
        gsap.fromTo('.contact-badge',
            { y: 20, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.5, ease: 'back.out(1.7)' }
        );

        // Right column - form
        tl.from('.contact-right', {
            y: 60,
            opacity: 0,
            duration: 1,
        }, 0.3);

        // Form fields stagger
        tl.from('.form-field', {
            y: 25,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
        }, 0.8);

        // Submit button
        tl.from('.form-submit', {
            y: 20,
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            ease: 'back.out(1.5)',
        }, '-=0.2');

    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="min-h-screen bg-[#050505] text-white pt-24 md:pt-32 pb-12 px-4 md:px-6 flex items-center justify-center relative overflow-hidden">

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-stretch">

                    {/* Left Column */}
                    <div className="space-y-8 flex flex-col">
                        <div className="contact-left-video relative rounded-[2rem] overflow-hidden border border-white/10 flex-1">
                            <video
                                src="https://framerusercontent.com/assets/wg6Qomh5thQN52habSaotTAXk9c.mp4"
                                loop
                                preload="auto"
                                poster="https://framerusercontent.com/images/rpD9AT5DUkAMxsyUs1BqwMyOcdQ.png?width=1920&height=1920"
                                muted
                                playsInline
                                autoPlay
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'block',
                                    objectFit: 'cover',
                                    objectPosition: '50% 50%',
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                            <div className="absolute inset-0 flex items-end p-8 md:p-10">
                                <div className="flex items-end gap-4">
                                    <span
                                        className="text-[5vw] lg:text-[1.5vw] font-black tracking-[0.3em] text-white/60 uppercase"
                                        style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
                                    >
                                        LET&apos;S
                                    </span>
                                    <h1 className="text-[16vw] lg:text-[5vw] font-black leading-[0.85] tracking-tighter text-white">
                                        TALK<span className="text-white/40">.</span>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-6">
                            {[
                                { icon: <Mail size={18} />, label: "EMAIL", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                                { icon: <Phone size={18} />, label: "PHONE", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, '')}` },
                                { icon: <MapPin size={18} />, label: "STUDIO", value: siteConfig.location, href: "#" },
                            ].map((item, idx) => (
                                <a key={idx} href={item.href} className="contact-badge group flex items-center gap-3 px-4 py-2.5 md:px-5 md:py-3 rounded-full bg-white/5 border border-white/5 hover:bg-white hover:text-black transition-all duration-300">
                                    {item.icon}
                                    <span className="text-xs md:text-sm font-bold tracking-wide">{item.value}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="contact-right bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-[2rem] p-6 md:p-12 flex flex-col justify-center">
                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center text-center py-12 gap-6">
                                <CheckCircle size={48} className="text-green-400" />
                                <h3 className="text-2xl font-black tracking-tight">SENT SUCCESSFULLY</h3>
                                <p className="text-gray-400">We&apos;ll get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="text-sm text-white/50 hover:text-white underline underline-offset-4 transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="form-field space-y-2 group">
                                        <label className="text-xs font-bold tracking-[0.2em] text-gray-500 ml-1 group-focus-within:text-white transition-colors">NAME</label>
                                        <input name="name" type="text" required className="w-full bg-transparent border-b border-white/10 py-4 text-lg outline-none focus:border-white transition-all placeholder:text-gray-700" placeholder="John Doe" />
                                    </div>
                                    <div className="form-field space-y-2 group">
                                        <label className="text-xs font-bold tracking-[0.2em] text-gray-500 ml-1 group-focus-within:text-white transition-colors">COMPANY</label>
                                        <input name="company" type="text" className="w-full bg-transparent border-b border-white/10 py-4 text-lg outline-none focus:border-white transition-all placeholder:text-gray-700" placeholder="Acme Inc." />
                                    </div>
                                </div>

                                <div className="form-field space-y-2 group">
                                    <label className="text-xs font-bold tracking-[0.2em] text-gray-500 ml-1 group-focus-within:text-white transition-colors">EMAIL</label>
                                    <input name="email" type="email" required className="w-full bg-transparent border-b border-white/10 py-4 text-lg outline-none focus:border-white transition-all placeholder:text-gray-700" placeholder="john@example.com" />
                                </div>

                                <div className="form-field space-y-2 group">
                                    <label className="text-xs font-bold tracking-[0.2em] text-gray-500 ml-1 group-focus-within:text-white transition-colors">MESSAGE</label>
                                    <textarea name="message" rows={4} required className="w-full bg-transparent border-b border-white/10 py-4 text-lg outline-none focus:border-white transition-all placeholder:text-gray-700 resize-none" placeholder="Tell us about the project..."></textarea>
                                </div>

                                {status === 'error' && (
                                    <p className="text-red-400 text-sm">{errorMsg}</p>
                                )}

                                <div className="form-submit pt-8">
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full py-4 md:py-6 bg-white text-black rounded-full font-bold text-base md:text-lg tracking-wide hover:bg-gray-200 transition-all flex items-center justify-between px-6 md:px-8 group disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <span>{status === 'sending' ? 'SENDING...' : 'SEND INQUIRY'}</span>
                                        {status === 'sending' ? (
                                            <Loader2 className="animate-spin" size={20} />
                                        ) : (
                                            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
