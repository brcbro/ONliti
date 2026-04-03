// ============================================
// SITE CONFIG — Edit your preferences here
// ============================================

export const siteConfig = {
    // ── Brand ──────────────────────────────────
    name: "ONliti",
    url: "https://onliti.works",
    tagline: "Digital Alchemy Since 2024",
    madeBy: "Bhavya",

    // ── Contact Info ───────────────────────────
    email: "Onliti.official@gmail.com",
    phone: "+91 8155920669",
    location: "Surat, India",

    // ── Web3Forms (free form submissions to your email) ──
    // Get your free access key at: https://web3forms.com
    // It will send form submissions to the email above
    web3formsKey: "1e786afe-5735-460c-b3be-4226b2891935", // paste your access key here

    // ── Social Links ───────────────────────────
    // Leave empty string "" to hide the icon
    socials: {
        linkedin: "https://linkedin.com/in/",
        twitter: "https://twitter.com/",
        github: "https://github.com/",
        instagram: "https://instagram.com/",
    },

    // ── Footer ─────────────────────────────────
    copyright: `© ${new Date().getFullYear()} ONliti. All rights reserved.`,
};

export type SiteConfig = typeof siteConfig;
