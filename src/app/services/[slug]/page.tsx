import { notFound } from "next/navigation";
import { seoData } from "@/config/seo";
import TrustSignals from "@/components/TrustSignals";
import Contact from "@/components/Contact";
import SchemaMarkup from "@/components/SchemaMarkup";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
    readonly params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return seoData.services.map((service) => ({
        slug: service.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = seoData.services.find((s) => s.id === slug);

    if (!service) {
        return { title: 'Service Not Found' };
    }

    return {
        title: `${service.title} | ONliti Expertise`,
        description: service.description,
        alternates: {
            canonical: service.url,
        }
    };
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;
    const service = seoData.services.find((s) => s.id === slug);
    const serviceIndex = seoData.services.findIndex((s) => s.id === slug);
    const nextService = seoData.services[(serviceIndex + 1) % seoData.services.length];

    if (!service) {
        notFound();
    }

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
            "@type": "Organization",
            "name": "ONliti",
        },
        "url": `https://onliti.com${service.url}`,
    };

    return (
        <main className="bg-[#050505] overflow-x-hidden">
            <SchemaMarkup schema={serviceSchema} />

            {/* ───── Hero Section ───── */}
            <section className="relative min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center items-center text-center px-5 md:px-8 pt-28 md:pt-36 pb-12 md:pb-20">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-[#050505] to-[#050505] pointer-events-none z-0" />

                <div className="relative z-10 w-full max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] md:text-xs font-bold tracking-[0.2em] mb-6 md:mb-8 text-blue-400">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        EXPERTISE
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 tracking-tighter leading-[1.1] md:leading-[1]">
                        {service.title.toUpperCase()}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light max-w-xl mx-auto leading-relaxed mb-6 md:mb-10">
                        {service.description}
                    </p>

                    {/* Long Description */}
                    {service.longDescription && (
                        <div className="max-w-2xl mx-auto p-5 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm text-left mb-6 md:mb-10">
                            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed font-light">
                                {service.longDescription}
                            </p>
                        </div>
                    )}

                    {/* Highlight Metric */}
                    {service.highlightMetric && (
                        <div className="max-w-xs mx-auto text-center mt-4 md:mt-8">
                            <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-1 md:mb-2">
                                {service.highlightMetric}
                            </div>
                            <div className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider text-blue-500 uppercase">
                                {service.highlightMetricDesc}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ───── Core Benefits ───── */}
            {service.benefits && service.benefits.length > 0 && (
                <section className="bg-[#0a0a0a] py-16 md:py-28 px-5 md:px-12 relative border-t border-b border-white/5">
                    <div className="w-full max-w-5xl mx-auto">
                        <h2 className="text-[10px] sm:text-xs tracking-[0.3em] text-blue-500 font-bold mb-3 md:mb-4">THE ADVANTAGE</h2>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-10 md:mb-14 tracking-tighter">WHY IT MATTERS</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {service.benefits.map((benefit, idx) => (
                                <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-colors">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 md:mb-6">
                                        <ArrowUpRight className="text-blue-500 w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <h4 className="text-lg md:text-xl font-bold text-white">{benefit}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ───── Tech Stack ───── */}
            {service.techStack && service.techStack.length > 0 && (
                <section className="bg-[#050505] py-16 md:py-28 px-5 md:px-12 relative border-b border-white/5">
                    <div className="w-full max-w-5xl mx-auto text-center">
                        <h2 className="text-[10px] sm:text-xs tracking-[0.3em] text-blue-500 font-bold mb-3 md:mb-4">TEARDOWN</h2>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-10 md:mb-14 tracking-tighter">OUR ARSENAL</h3>

                        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                            {service.techStack.map((tech, idx) => (
                                <div key={idx} className="px-4 py-2 md:px-6 md:py-3 rounded-full border border-white/10 bg-white/5 text-white/80 text-sm md:text-base font-medium hover:bg-white/10 hover:text-white transition-colors">
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ───── Deliverables & Process ───── */}
            <section className="bg-[#050505] py-16 md:py-28 px-5 md:px-12 relative">
                <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                    {/* Left: What We Deliver */}
                    <div>
                        <h2 className="text-[10px] sm:text-xs tracking-[0.3em] text-blue-500 font-bold mb-3 md:mb-4">CAPABILITIES</h2>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 md:mb-10 tracking-tighter">WHAT WE DELIVER</h3>

                        <div className="flex flex-col gap-3 md:gap-4">
                            {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                                    <CheckCircle2 className="text-blue-500 mt-0.5 shrink-0 w-5 h-5" />
                                    <div>
                                        <h4 className="text-base md:text-lg font-bold mb-0.5">{feature}</h4>
                                        <p className="text-gray-400 text-xs md:text-sm">Strategic implementation built to scale.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Our Process */}
                    {service.process && service.process.length > 0 && (
                        <div>
                            <h2 className="text-[10px] sm:text-xs tracking-[0.3em] text-blue-500 font-bold mb-3 md:mb-4">METHODOLOGY</h2>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 md:mb-10 tracking-tighter">OUR PROCESS</h3>

                            <div className="relative border-l border-white/10 ml-3 md:ml-4 py-3 md:py-4 space-y-8 md:space-y-10">
                                {service.process.map((step, idx) => (
                                    <div key={idx} className="relative pl-6 md:pl-8">
                                        <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-blue-500 ring-4 ring-[#050505]" />
                                        <h4 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                                            <span className="text-blue-500/50 text-xs md:text-sm mr-2 font-mono">0{idx + 1}</span>
                                            {step.title}
                                        </h4>
                                        <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ───── Next Expertise CTA ───── */}
            <section className="bg-[#050505] py-8 md:py-12 px-5 md:px-12 border-t border-white/5">
                <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/services" className="text-sm text-gray-400 hover:text-white transition-colors">
                        ← All Expertise
                    </Link>
                    <Link href={nextService.url} className="inline-flex items-center gap-2 text-sm md:text-base font-bold text-white hover:text-blue-400 transition-colors">
                        Next: {nextService.title} <ArrowUpRight size={16} />
                    </Link>
                </div>
            </section>

            <TrustSignals />
            <Contact />
        </main>
    );
}
