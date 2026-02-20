import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: ['*', 'GPTBot', 'ClaudeBot', 'Google-Extended'],
            allow: '/',
        },
        sitemap: 'https://onliti.com/sitemap.xml',
    };
}
