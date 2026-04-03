// src/config/seo.ts
export const seoData = {
    services: [
        {
            id: "digital-ecosystems",
            title: "Digital Ecosystems",
            description: "Full-stack web applications built for scale and performance. We design lightning-fast architectures mapped to convert.",
            longDescription: "Our Digital Ecosystems aren't just websites—they are conversion engines. We engineer high-performance web applications using modern stacks like Next.js and React to ensure instantaneous load times, robust security, and unparalleled user experiences that turn casual browsers into loyal clients. We focus on semantic HTML and highly optimized asset delivery.",
            url: "/services/digital-ecosystems",
            highlightMetric: "Sub-1.5s LCP",
            highlightMetricDesc: "Average page load time across our deployments.",
            features: ["Next.js/React Architecture", "Scalable Microservices", "CMS & Database Optimization", "Technical SEO Audits"],
            benefits: ["Lightning Fast", "Pristine Core Web Vitals", "Elastic Scalability"],
            techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Supabase", "Framer Motion"],
            process: [
                { title: "Discovery", description: "Mapping out user journeys and technical constraints." },
                { title: "Architecture", description: "Selecting the optimal tech stack (React/Next.js). " },
                { title: "Development", description: "Writing clean, semantic, and highly performant code." },
                { title: "Deployment", description: "Launching via edge networks to ensure global speed." }
            ]
        },
        {
            id: "mobile-innovation",
            title: "Mobile Innovation",
            description: "Native and cross-platform mobile applications that define user behavior and provide frictionless digital journeys.",
            longDescription: "We build intuitive, robust mobile applications that live natively on iOS and Android. Our approach prioritizes frictionless navigation and eye-catching micro-interactions right out of the box. From the initial wireframe to App Store optimization, we handle the entire lifecycle of your mobile presence.",
            url: "/services/mobile-innovation",
            highlightMetric: "60+ FPS",
            highlightMetricDesc: "Silky smooth animations leading to effortless user experience.",
            features: ["React Native Development", "App Store Optimization", "User-Centric UI/UX", "Seamless API Integrations"],
            benefits: ["High User Retention", "Cross-Platform Consistency", "Smooth 60FPS Animations"],
            techStack: ["React Native", "Expo", "Swift", "Kotlin", "Firebase", "Redux"],
            process: [
                { title: "Wireframing", description: "Rapid prototyping of core user flows." },
                { title: "Prototyping", description: "Interactive mockups with high-fidelity UI." },
                { title: "Engineering", description: "Building robust native/hybrid apps." },
                { title: "Launch", description: "Publishing and App Store Optimization." }
            ]
        },
        {
            id: "brand-identity",
            title: "Brand Identity",
            description: "Visual languages that speak louder than words. We create digital brands built for the modern era.",
            longDescription: "A brand is more than just a logo; it's a feeling. We forge cohesive visual identities spanning typography, color theory, positioning, and copywriting, ensuring your brand resonates deeply with your target demographic. We focus on establishing trust and luxury at the very first glance.",
            url: "/services/brand-identity",
            highlightMetric: "300%",
            highlightMetricDesc: "Average increase in perceived brand value.",
            features: ["Logo & Visual Design", "Design Systems", "Brand Architecture", "Copywriting & Tone"],
            benefits: ["Instant Recognition", "Consistent Visual Language", "Increased Brand Loyalty"],
            techStack: ["Figma", "Adobe Creative Suite", "Spline 3D", "Lottie", "Midjourney"],
            process: [
                { title: "Research", description: "Analyzing competitors and market gaps." },
                { title: "Concepting", description: "Drafting foundational visual elements." },
                { title: "Refining", description: "Perfecting the branding guidelines." },
                { title: "Delivery", description: "Handing off comprehensive design systems." }
            ]
        },
        {
            id: "technical-strategy",
            title: "Technical Strategy",
            description: "Architecture and technical consulting resolving complex digital roadblocks for enterprise clients.",
            longDescription: "Navigating digital scale requires a visionary roadmap. As your strategic technical partner, we assess your legacy systems, propose modern cloud migrations, and architect scalable solutions that future-proof your business operations. We act as your fractional CTO.",
            url: "/services/technical-strategy",
            highlightMetric: "$50k+",
            highlightMetricDesc: "Average reduction in annualized technical debt costs.",
            features: ["Architecture Reviews", "Cloud Migrations", "Security Audits", "CTO-as-a-Service"],
            benefits: ["Future-Proof Infrastructure", "Optimized Cloud Spend", "Ironclad Security"],
            techStack: ["AWS", "Google Cloud", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
            process: [
                { title: "Audit", description: "Deep dive into existing infrastructure." },
                { title: "Roadmap", description: "Charting the migration or upgrade path." },
                { title: "Execution", description: "Collaborative building and transitioning." },
                { title: "Review", description: "Post-launch monitoring and optimization." }
            ]
        },
        {
            id: "growth-engineering",
            title: "Growth Engineering",
            description: "Data-driven development designed explicitly to accelerate your business KPIs and elevate your conversion rates.",
            longDescription: "Stop guessing what your users want. We integrate advanced analytics, A/B testing pipelines, and conversion rate methodologies into your product to mathematically guarantee an uplift in engagement and sales. Our pipelines are built strictly around measurable ROI.",
            url: "/services/growth-engineering",
            highlightMetric: "120%",
            highlightMetricDesc: "Average boost to lead generation conversion rates.",
            features: ["Conversion Rate Optimization", "A/B Testing Frameworks", "Analytics Integrations", "Marketing Automation"],
            benefits: ["Higher Conversion Rates", "Data-Backed Decisions", "Lower CAC"],
            techStack: ["PostHog", "Google Analytics", "Amplitude", "VWO", "Segment", "Hotjar"],
            process: [
                { title: "Analyze", description: "Reviewing heatmaps and user behavior flows." },
                { title: "Hypothesize", description: "Formulating tests to improve conversion." },
                { title: "Test", description: "Running statistically significant A/B tests." },
                { title: "Optimize", description: "Implementing the winning variation." }
            ]
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
    "url": `https://onliti.works${service.url}`,
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
