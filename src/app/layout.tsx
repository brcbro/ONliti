import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Noise from "@/components/Noise";
import { siteConfig } from "@/config/siteConfig";

const syne = Syne({
    subsets: ["latin"],
    variable: "--font-syne",
    display: "swap",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    title: {
        template: `%s | ${siteConfig.name}`,
        default: "ONliti | High-conversion B2B & E-commerce Landing Pages",
    },
    description: "We design fast, SEO-optimized landing pages to generate leads and sales for local businesses, startups, and e-commerce brands.",
    openGraph: {
        siteName: siteConfig.name,
        type: "website",
        title: "ONliti | High-conversion B2B & E-commerce Landing Pages",
        description: "We design fast, SEO-optimized landing pages to generate leads and sales for local businesses, startups, and e-commerce brands.",
        url: siteConfig.url,
        images: [{ url: "/newlogo.png" }],
    },
    icons: {
        icon: "/newlogo.png",
    },
    verification: {
        google: "Dmrux6CKde0sSNNUUWAMBsfyXzx53FkjatKTNVf2wJc",
    },
};

import ScrollProgress from "@/components/ScrollProgress";
import SchemaMarkup from "@/components/SchemaMarkup";

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/newlogo.png`,
    "description": "We design fast, SEO-optimized landing pages to generate leads and sales.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable}`}>
            <body className="antialiased font-sans bg-[#050505] text-white selection:bg-purple-500/30 md:cursor-none">
                <SchemaMarkup schema={organizationSchema} />
                <SmoothScroll>
                    <ScrollProgress />
                    <CustomCursor />
                    <Noise />
                    <Navbar />
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}
