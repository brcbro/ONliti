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
    title: "ONliti Creative | Digital Alchemy",
    description: "Award-winning digital experiences.",
};

import ScrollProgress from "@/components/ScrollProgress";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable}`}>
            <body className="antialiased font-sans bg-[#050505] text-white selection:bg-purple-500/30 cursor-none">
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
