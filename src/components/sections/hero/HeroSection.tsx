"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import HeroScroll from "./HeroScroll";
import Button from "@/components/elements/Button";

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
                    <h1 className="font-black font-grotesk hero-title leading-[1] lg:text-[6vw] sm:text-[12vw]">
                        Fullstack con pasión
                    </h1>
                    <p className="font-black leading-1 lg:text-[1.5vw] sm:text-[4vw]">
                        Encaminate conmigo y dejemos huella como jr´s
                    </p>
                    <div className="flex justify-center items-center">
                        <Button label="Conóceme"/>
                    </div>
                </div>
                <div ref={animatedIconsRef} className="animated-icons">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`animated-icon icon-${i}`}>
                            <Image
                                src={`/img/icon_${i}.png`}
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
                    <span className="text-segment">Construyo</span>
                    <div className="placeholder-icon"/>
                    <span className="text-segment">con Next.js</span>
                    <span className="text-segment"> y Typescript</span>
                    <div className="placeholder-icon"/>
                    <span className="text-segment">para el desarrollo</span>
                    <div className="placeholder-icon"/>
                    <span className="text-segment">web moderno</span>
                    <div className="placeholder-icon"/>
                    <span className="text-segment">.</span>
                </h1>
            </section>
        </>
    )
}
    
