/**
 * 
 * 
 */

"use client";

import { useState, useEffect } from "react";

import AnimatedCopy from "@/components/elements/AnimatedCopy";
import PhysicsObjects from "../physics-objects/PhysicsObjects";
import TextAnimationSection from "../text-animation/TextAnimationSection";

export default function AboutSection(): React.JSX.Element{
    
    return (
        <>
            <section 
                className="w-screen min-h-[90svh]
                    grid grid-cols-1 md:grid-cols-2
                    gap-6 md:gap-10
                    md:px-10
                    md:py-14"
            >
                <div className="w-full max-w-xl md:max-w-2xl mx-auto md:mx-0 flex flex-col justify-between gap-6 md:gap-8">
                    <AnimatedCopy tag="h1" className="font-grotesk font-normal lg:text-[8vw] sm:text-[10vw]">
                        Isra <br />
                        Gali
                    </AnimatedCopy>
                    <AnimatedCopy tag="p" className="font-grotesk font-normal text-2xl">
                            Soy desarrollador fullstack en formación, mi  enfoque es construir soluciones claras, 
                            funcionales y bien estructuradas.Me apasiona el diseño de interfaces, 
                            los patrones de desarrollo y compartir lo que aprendo mientras avanzo en este camino.
                    </AnimatedCopy>
                </div>
                <div className="hidden md:block">
                    <div className="relative w-full mt-10 h-[70svh] lg:h-[90svh] rounded-2xl md:rounded-3xl overflow-hidden bg-green-500 border-6 border-b-[25px] border-r-[25px]">
                        <PhysicsObjects />
                    </div>
                </div>
            </section>
            <TextAnimationSection/>
        </>
    )
}