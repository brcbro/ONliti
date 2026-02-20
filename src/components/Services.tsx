'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Code, PenTool, BarChart3, Globe, Smartphone, Zap } from 'lucide-react';
import Link from 'next/link';

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
    return (
        <section id="services" className="snap-section min-h-screen bg-[#050505] py-16 md:py-24 px-4 md:px-6 relative flex items-center">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 overflow-hidden"
                >
                    <h2 className="text-[8vw] md:text-[6vw] font-black leading-none tracking-tighter text-white opacity-20">
                        EXPERTISE
                    </h2>
                    <div className="h-[1px] w-full bg-white/10 mt-4"></div>
                </motion.div>

                <div className="grid grid-cols-12 gap-4 md:gap-8">
                    {services.map((service, index) => (
                        <Link href={`/services/${service.id}`} key={index} className={`block col-span-12 ${service.col.includes('md:col-span') ? service.col.split(' ').filter(c => c.startsWith('md:')).join(' ') : ''}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className={`h-full group relative overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 md:p-12 transition-colors duration-300 hover:bg-white/[0.05] hover:border-white/10`}
                            >
                                <div className={`absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${service.bg}`}></div>

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
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
