import { notFound } from "next/navigation";
import { seoData } from "@/config/seo";
import TrustSignals from "@/components/TrustSignals";
import Contact from "@/components/Contact";
import SchemaMarkup from "@/components/SchemaMarkup";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

type Props = {
    readonly params: { readonly slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const service = seoData.services.find((s) => s.id === params.slug);

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

export default function ServicePage({ params }: Props) {
    const service = seoData.services.find((s) => s.id === params.slug);

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
        <main className="snap-container">
            <SchemaMarkup schema={serviceSchema} />

            {/* Hero Section */}
            <section className="snap-section relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 pt-32 pb-16">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-[#050505] to-[#050505] pointer-events-none z-0" />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-[0.2em] mb-8 text-blue-400">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        EXPERTISE
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter mix-blend-difference leading-[0.9]">
                        {service.title.toUpperCase()}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-12">
                        {service.description}
                    </p>

                    {/* Add long description here */}
                    {service.longDescription && (
                        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm text-left">
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                                {service.longDescription}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Core Benefits */}
            {service.benefits && service.benefits.length > 0 && (
                <section className="snap-section bg-[#0a0a0a] py-20 px-4 md:px-12 relative border-t border-b border-white/5">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-sm tracking-[0.3em] text-blue-500 font-bold mb-4">THE ADVANTAGE</h2>
                        <h3 className="text-3xl md:text-5xl font-black mb-12 tracking-tighter">WHY IT MATTERS</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {service.benefits.map((benefit, idx) => (
                                <div key={idx} className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                                        <ArrowUpRight className="text-blue-500" size={24} />
                                    </div>
                                    <h4 className="text-xl font-bold text-white">{benefit}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Deliverables/Features Section */}
            <section className="snap-section bg-[#050505] py-20 px-4 md:px-12 relative">
                <div className="container mx-auto grid md:grid-cols-2 gap-16 max-w-6xl">
                    <div>
                        <h2 className="text-sm tracking-[0.3em] text-blue-500 font-bold mb-4">CAPABILITIES</h2>
                        <h3 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter">WHAT WE DELIVER</h3>

                        <div className="flex flex-col gap-4">
                            {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                                    <CheckCircle2 className="text-blue-500 mt-1 shrink-0" size={24} />
                                    <div>
                                        <h4 className="text-xl font-bold mb-1">{feature}</h4>
                                        <p className="text-gray-400 text-sm">Strategic implementation built to scale.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Methodology / Process */}
                    {service.process && service.process.length > 0 && (
                        <div>
                            <h2 className="text-sm tracking-[0.3em] text-blue-500 font-bold mb-4">METHODOLOGY</h2>
                            <h3 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter">OUR PROCESS</h3>

                            <div className="relative border-l border-white/10 ml-4 py-4 space-y-12">
                                {service.process.map((step, idx) => (
                                    <div key={idx} className="relative pl-8">
                                        <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-blue-500 ring-4 ring-[#050505]" />
                                        <h4 className="text-2xl font-bold text-white mb-2">
                                            <span className="text-blue-500/50 text-sm mr-2 font-mono">0{idx + 1}</span>
                                            {step.title}
                                        </h4>
                                        <p className="text-gray-400 font-light">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <TrustSignals />
            <Contact />
        </main>
    );
}
