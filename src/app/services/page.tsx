import { Metadata } from 'next';
import Link from 'next/link';
import { seoData } from '@/config/seo';
import { ArrowUpRight, Globe, Smartphone, PenTool, Code, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Our Expertise | ONliti',
    description: 'Explore ONliti\'s core expertise areas including Digital Ecosystems, Mobile Innovation, Brand Identity, Technical Strategy, and Growth Engineering.',
    alternates: {
        canonical: '/services',
    }
};

const iconMap: Record<string, React.ReactNode> = {
    'digital-ecosystems': <Globe size={32} />,
    'mobile-innovation': <Smartphone size={32} />,
    'brand-identity': <PenTool size={32} />,
    'technical-strategy': <Code size={32} />,
    'growth-engineering': <BarChart3 size={32} />,
};

export default function ServicesIndexPage() {
    return (
        <main className="snap-container">
            {/* Hero Section */}
            <section className="snap-section relative min-h-[60vh] flex flex-col justify-center items-center text-center px-4 pt-32 pb-16">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-[#050505] to-[#050505] pointer-events-none z-0" />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-[0.2em] mb-8 text-blue-400">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        OUR EXPERTISE
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter mix-blend-difference leading-[0.9]">
                        SERVICES
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                        We don&apos;t just build websites. We engineer high-performance digital ecosystems designed to scale, convert, and dominate.
                    </p>
                </div>
            </section>

            {/* Services List Section */}
            <section className="snap-section bg-[#050505] py-20 px-4 md:px-12 relative">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col gap-6">
                        {seoData.services.map((service, index) => (
                            <Link href={service.url} key={service.id} className="block group">
                                <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:p-12 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/10 hover:-translate-y-1">
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-blue-600/10 pointer-events-none"></div>

                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                        <div className="flex items-start gap-6">
                                            <div className="p-4 rounded-full bg-white/5 text-white/80 group-hover:text-white group-hover:bg-white/10 transition-colors shrink-0">
                                                {iconMap[service.id] || <Code size={32} />}
                                            </div>
                                            <div>
                                                <h2 className="text-3xl md:text-4xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h2>
                                                <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">{service.description}</p>

                                                <div className="flex flex-wrap gap-3 mt-6">
                                                    {service.techStack?.slice(0, 3).map((tech, idx) => (
                                                        <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {service.techStack && service.techStack.length > 3 && (
                                                        <span className="text-xs font-semibold px-3 py-1 rounded-full border border-transparent text-gray-500">
                                                            +{service.techStack.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hidden md:flex shrink-0 w-16 h-16 rounded-full border border-white/10 items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-300 transform group-hover:scale-110">
                                            <ArrowUpRight className="text-white/30 group-hover:text-white transition-colors" size={28} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
