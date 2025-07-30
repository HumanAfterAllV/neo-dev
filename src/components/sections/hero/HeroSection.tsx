"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import HeroScroll from "./HeroScroll";

export default function HeroSection(): React.JSX.Element {
    const animatedIconsRef = useRef<HTMLDivElement>(null)
    const heroHeaderRef = useRef<HTMLDivElement>(null)
    const heroSectionRef = useRef<HTMLElement>(null)

    // Estas las llenamos en useEffect porque son listas de nodos
    const iconElementsRef = useRef<NodeListOf<HTMLDivElement>>(null)
    const textSegmentsRef = useRef<NodeListOf<HTMLSpanElement>>(null)
    const placeholdersRef = useRef<NodeListOf<HTMLDivElement>>(null)

    useEffect(() => {
        if (typeof window !== "undefined") {
            iconElementsRef.current = document.querySelectorAll(".animated-icon");
            textSegmentsRef.current = document.querySelectorAll(".text-segment");
            placeholdersRef.current = document.querySelectorAll(".placeholder-icon")
        }
    }, [])

    return (
        <>
            <HeroScroll
                animatedIconRef={animatedIconsRef}
                heroHeaderRef={heroHeaderRef}
                heroSectionRef={heroSectionRef}
            />

            <section ref={heroSectionRef} className="hero hero-section">
                <div ref={heroHeaderRef} className="hero-header">
                    <h1 className="font-bold hero-title leading-[1] lg:text-[6vw] sm:text-[12vw] text-center">
                        Fullstack <br />
                        with Purpose.
                    </h1>
                    <p className="hero-paragraph">
                        Creo experiencias, y en mi blog te cuento el cómo y el porqué.
                    </p>
                </div>
                <div ref={animatedIconsRef} className="animated-icons">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`animated-icon icon-${i}`}>
                            <Image
                                src={`/icons/icon_${i}.png`}
                                alt={`Icon ${i}`}
                                width={2000}
                                height={2000}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                <h1 className="animated-text hero-title">
                    <div className="placeholder-icon"/>
                    <span className="text-segment">Delve into coding</span>
                    <div className="placeholder-icon"/>
                    <span className="text-segment">with Next.js</span>
                    <span className="text-segment"> and TypeScript</span>
                    <div className="placeholder-icon"/>
                    <span className="text-segment">for modern web</span>
                    <div className="placeholder-icon"/>
                    <span className="text-segment">development</span>
                    <div className="placeholder-icon"/>
                    <span className="text-segment">.</span>
                </h1>
            </section>
        </>
    )
}
    
