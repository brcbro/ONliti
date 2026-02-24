import { MetadataRoute } from 'next';
import { seoData } from '@/config/seo';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://onliti.vercel.app';

    const dynamicRoutes = seoData.services.map((service) => ({
        url: `${baseUrl}${service.url}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const staticRoutes = [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        }
    ];

    return [...staticRoutes, ...dynamicRoutes];
}
