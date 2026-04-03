import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/siteConfig';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: ['*', 'GPTBot', 'ClaudeBot', 'Google-Extended'],
            allow: '/',
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
    };
}
