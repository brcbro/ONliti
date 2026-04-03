import { Metadata } from 'next';
import AboutClient from '@/components/AboutClient';

export const metadata: Metadata = {
    title: 'About Us | The Architects of Digital Desire',
    description: 'Meet the ONliti collective — a team of restless developers obsessed with building custom, high-performance web experiences that weaponize your brand.',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About ONliti | The Architects of Digital Desire',
        description: 'Meet the ONliti collective — a team of restless developers obsessed with building custom, high-performance web experiences that weaponize your brand.',
        url: 'https://onliti.works/about',
        images: [{ url: '/newlogo.png' }],
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
