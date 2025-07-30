"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider() : null {
    useEffect(() => {

        // Initialize Lenis for smooth scrolling
        // and integrate with GSAP's ScrollTrigger
        const lenis = new Lenis();

        const rafCallback = (time: number) => {
            lenis.raf(time * 1000);
        }


        // Use GSAP's ticker to call Lenis' RAF method
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        lenis.on("scroll", ScrollTrigger.update);

        return () => {
            gsap.ticker.remove(rafCallback);
            lenis.destroy();
        }

    }, [])

    return null;
}