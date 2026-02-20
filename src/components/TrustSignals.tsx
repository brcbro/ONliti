'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

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
    return (
        <section className="snap-section bg-[#0a0a0a] py-16 md:py-24 px-4 md:px-6 relative border-t border-white/5">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-[6vw] md:text-[4vw] font-black leading-none tracking-tighter text-white opacity-90 text-center md:text-left">
                        DON'T JUST TAKE <span className="text-blue-500">OUR WORD</span> FOR IT
                    </h2>
                    <div className="h-[1px] w-full bg-white/10 mt-8"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {testimonials.map((test, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden group hover:border-blue-500/50 transition-colors"
                        >
                            <div className="flex gap-1 mb-6 text-blue-500">
                                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                            </div>
                            <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-8 text-gray-200">
                                "{test.quote}"
                            </blockquote>
                            <div>
                                <h3 className="font-bold text-white text-lg">{test.author}</h3>
                                <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">{test.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
