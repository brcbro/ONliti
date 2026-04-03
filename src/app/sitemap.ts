import { MetadataRoute } from 'next';
import { seoData } from '@/config/seo';
import { siteConfig } from '@/config/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url;

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
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }
    ];

    return [...staticRoutes, ...dynamicRoutes];
}
