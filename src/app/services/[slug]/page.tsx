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
                    <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                        {service.description}
                    </p>
                </div>
            </section>

            {/* Deliverables/Features Section */}
            <section className="snap-section bg-[#050505] py-20 px-4 md:px-12 relative">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black mb-12 tracking-tighter">WHAT WE DELIVER</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                                <CheckCircle2 className="text-blue-500 mt-1 shrink-0" size={24} />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{feature}</h3>
                                    <p className="text-gray-400 text-sm">Strategic implementation built to scale your infrastructure confidently.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <TrustSignals />
            <Contact />
        </main>
    );
}
