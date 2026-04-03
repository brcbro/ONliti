import HomeClient from "@/components/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ONliti | High-conversion B2B & E-commerce Landing Pages",
    description: "We design fast, SEO-optimized landing pages to generate leads and sales for local businesses, startups, and e-commerce brands.",
    alternates: {
        canonical: "/",
    },
};

export default function Home() {
    return <HomeClient />;
}
