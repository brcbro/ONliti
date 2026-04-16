'use client';

import { useRef } from 'react';
import { Star } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';

const testimonials = [
    {
        quote: "ONliti transformed our landing pages completely. We saw a 140% increase in lead generation within the first month.",
        author: "Sarah J.",
        role: "CMO, TechFlow",
    },
    {
        quote: "The speed and SEO focus they bring to the table is unmatched. Our customer acquisition costs halved.",
        author: "Michael T.",
        role: "Founder, Zenith E-Comm",
    }
];

export default function TrustSignals() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // Heading reveal
        const headingTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.trust-header',
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });

        headingTl.from('.trust-title', {
            y: 60,
            autoAlpha: 0,
            duration: 1,
            ease: 'power4.out',
        });

        headingTl.from('.trust-divider', {
            scaleX: 0,
            duration: 1,
            ease: 'power3.inOut',
            transformOrigin: 'left center',
        }, '-=0.5');

        // Testimonial cards
        const cards = sectionRef.current.querySelectorAll('.testimonial-card');
        cards.forEach((card, i) => {
            const stars = card.querySelectorAll('.star-icon');
            const quote = card.querySelector('.testimonial-quote');
            const author = card.querySelector('.testimonial-author');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });

            tl.from(card, {
                y: 50,
                autoAlpha: 0,
                scale: 0.95,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'power3.out',
            });

            tl.from(stars, {
                scale: 0,
                autoAlpha: 0,
                duration: 0.3,
                stagger: 0.06,
                ease: 'back.out(3)',
            }, '-=0.3');

            if (quote) {
                tl.from(quote, {
                    y: 20,
                    autoAlpha: 0,
                    duration: 0.6,
                }, '-=0.2');
            }

            if (author) {
                tl.from(author, {
                    y: 15,
                    autoAlpha: 0,
                    duration: 0.5,
                }, '-=0.3');
            }
        });

        // Hover glow effect
        cards.forEach((card) => {
            const el = card as HTMLElement;
            el.addEventListener('mouseenter', () => {
                gsap.to(el, { scale: 1.02, duration: 0.4, ease: 'power2.out' });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(el, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
            });
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="snap-section bg-[#0a0a0a] py-16 md:py-24 px-4 md:px-6 relative border-t border-white/5">
            <div className="container mx-auto">
                <div className="trust-header mb-16">
                    <h2 className="trust-title text-[6vw] md:text-[4vw] font-black leading-none tracking-tighter text-white opacity-90 text-center md:text-left">
                        DON&apos;T JUST TAKE <span className="text-blue-500">OUR WORD</span> FOR IT
                    </h2>
                    <div className="trust-divider h-[1px] w-full bg-white/10 mt-8"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {testimonials.map((test, index) => (
                        <div
                            key={index}
                            className="testimonial-card p-8 md:p-10 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden group hover:border-blue-500/50 transition-colors"
                            style={{ willChange: 'transform' }}
                        >
                            <div className="flex gap-1 mb-6 text-blue-500">
                                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" className="star-icon" />)}
                            </div>
                            <blockquote className="testimonial-quote text-xl md:text-2xl font-light leading-relaxed mb-8 text-gray-200">
                                &ldquo;{test.quote}&rdquo;
                            </blockquote>
                            <div className="testimonial-author">
                                <h3 className="font-bold text-white text-lg">{test.author}</h3>
                                <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">{test.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
