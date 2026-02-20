// src/config/seo.ts
export const seoData = {
    services: [
        {
            id: "ecommerce-landing-pages",
            title: "E-Commerce Landing Pages",
            description: "High-converting landing pages tailored for e-commerce brands.",
            url: "/services/ecommerce-landing-pages",
        },
        {
            id: "lead-generation-pages",
            title: "Lead Generation Landing Pages",
            description: "Capture more leads with our optimized B2B landing pages.",
            url: "/services/lead-generation-pages",
        },
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
