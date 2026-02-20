// src/config/seo.ts
export const seoData = {
    services: [
        {
            id: "digital-ecosystems",
            title: "Digital Ecosystems",
            description: "Full-stack web applications built for scale and performance. We design lightning-fast architectures mapped to convert.",
            url: "/services/digital-ecosystems",
            features: ["Next.js/React Architecture", "Scalable Microservices", "CMS & Database Optimization", "Technical SEO Audits"],
        },
        {
            id: "mobile-innovation",
            title: "Mobile Innovation",
            description: "Native and cross-platform mobile applications that define user behavior and provide frictionless digital journeys.",
            url: "/services/mobile-innovation",
            features: ["React Native Development", "App Store Optimization", "User-Centric UI/UX", "Seamless API Integrations"],
        },
        {
            id: "brand-identity",
            title: "Brand Identity",
            description: "Visual languages that speak louder than words. We create digital brands built for the modern era.",
            url: "/services/brand-identity",
            features: ["Logo & Visual Design", "Design Systems", "Brand Architecture", "Copywriting & Tone"],
        },
        {
            id: "technical-strategy",
            title: "Technical Strategy",
            description: "Architecture and technical consulting resolving complex digital roadblocks for enterprise clients.",
            url: "/services/technical-strategy",
            features: ["Architecture Reviews", "Cloud Migrations", "Security Audits", "CTO-as-a-Service"],
        },
        {
            id: "growth-engineering",
            title: "Growth Engineering",
            description: "Data-driven development designed explicitly to accelerate your business KPIs and elevate your conversion rates.",
            url: "/services/growth-engineering",
            features: ["Conversion Rate Optimization", "A/B Testing Frameworks", "Analytics Integrations", "Marketing Automation"],
        }
    ],
    faqs: [
        {
            question: "What is a good landing page conversion rate?",
            answer: "A good conversion rate ranges from 2% to 5%, depending on the industry and the intent of the traffic.",
        },
        {
            question: "How long does it take to build a custom landing page?",
            answer: "Typically, our high-conversion landing pages are designed, developed, and deployed within 1 to 2 weeks.",
        }
    ],
};

export const serviceSchema = seoData.services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
        "@type": "Organization",
        "name": "ONliti",
    },
    "url": `https://onliti.com${service.url}`,
}));

export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": seoData.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
        },
    })),
};
