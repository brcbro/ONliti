'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins once at app level
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Default ease for premium feel
gsap.defaults({
    ease: 'power3.out',
    duration: 1,
});

export { gsap, ScrollTrigger, useGSAP };
