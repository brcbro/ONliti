'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

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

const Card = ({ project, index, progress, range, targetScale }: { project: typeof projects[0], index: number, progress: MotionValue<number>, range: number[], targetScale: number }) => {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-8">
            <motion.div
                style={{ scale, top: `calc(-3vh + ${index * 25}px)` }}
                className="relative flex flex-col w-[95vw] md:w-[70vw] h-[55vh] md:h-[70vh] rounded-2xl md:rounded-[3rem] p-6 md:p-12 origin-top border border-white/10 bg-[#0a0a0a] overflow-hidden"
            >
                {/* Background Video with Overlay */}
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
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }}></span>
                            <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white/80">{project.category}</span>
                        </div>
                        <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-[10px] md:text-xs font-bold tracking-widest">
                            {project.year}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-3xl md:text-7xl font-black tracking-tighter mix-blend-difference leading-[0.9]">{project.title}</h3>
                        <p className="text-gray-300 max-w-md text-sm md:text-lg font-light leading-relaxed">{project.description}</p>

                        <div className="pt-4">
                            <Link href="/contact" className="inline-flex items-center gap-2 text-white font-bold border-b border-white pb-1 hover:opacity-70 transition-opacity">
                                DISCUSS PROJECT <ArrowUpRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function ProjectShowcase() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <section ref={container} id="work" className="relative bg-[#050505] mt-12 md:mt-0">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-[6vw] md:text-[6vw] font-black leading-none tracking-tighter text-white opacity-20 text-center md:text-left">
                        SELECTED WORK
                    </h2>
                    <div className="h-[1px] w-full bg-white/10 mt-8"></div>
                </motion.div>
            </div>

            <div className="pb-[20vh]">
                {projects.map((project, index) => {
                    const targetScale = 1 - ((projects.length - index) * 0.05);
                    return (
                        <Card
                            key={index}
                            project={project}
                            index={index}
                            progress={scrollYProgress}
                            range={[index * (1 / projects.length), 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </section>
    );
}
