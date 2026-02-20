import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://onliti.com';

    // These should eventually map to your dynamic routes or CMS
    const routes = [
        '',
        '/services/ecommerce-landing-pages',
        '/services/lead-generation-pages',
        '/industries/real-estate-landing-pages',
        '/blog/how-to-increase-landing-page-conversion-rate',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));
}
