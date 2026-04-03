import ContactClient from "@/components/ContactClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | ONliti",
    description: "Get in touch with ONliti for high-conversion landing pages and digital strategy. Let's weaponize your brand.",
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
