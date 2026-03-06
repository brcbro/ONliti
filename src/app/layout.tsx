import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Noise from "@/components/Noise";

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
    metadataBase: new URL("https://onliti.vercel.app"),
    applicationName: "ONliti",
    title: {
        template: "%s | ONliti",
        default: "ONliti | High-conversion B2B & E-commerce Landing Pages",
    },
    description: "We design fast, SEO-optimized landing pages to generate leads and sales for local businesses, startups, and e-commerce brands.",
    openGraph: {
        siteName: "ONliti",
        type: "website",
        title: "ONliti | High-conversion B2B & E-commerce Landing Pages",
        description: "We design fast, SEO-optimized landing pages to generate leads and sales for local businesses, startups, and e-commerce brands.",
        url: "https://onliti.vercel.app",
        images: [{ url: "/logo.png" }],
    },
    alternates: {
        canonical: "/",
    },
    icons: {
        icon: "/logo.png",
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
    "name": "ONliti",
    "url": "https://onliti.vercel.app",
    "logo": "https://onliti.vercel.app/logo.png",
    "description": "We design fast, SEO-optimized landing pages to generate leads and sales.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable}`}>
            <body className="antialiased font-sans bg-[#050505] text-white selection:bg-purple-500/30 cursor-none">
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
