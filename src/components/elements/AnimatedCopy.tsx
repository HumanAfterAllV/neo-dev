/**
 * 
 * 
 * 
 * 
 */


"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import SplitType from "split-type";


type AnimatedCopyProps = {
    children: React.ReactNode,
    className?: string;
    delay?: number,
    duration?: number,
    ease?: string,
    stagger?: number,
    lineSelector?: string,
    animatedScroll?: boolean,
    direction?: string,
    tag: React.ElementType;
};

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedCopy({
    children,
    className= "",
    delay = 1,
    duration = 1,
    ease ="power4.out",
    stagger = 0.05,
    lineSelector = "",
    animatedScroll = true,
    direction = "bottom",
    tag = "p"

}:AnimatedCopyProps): React.JSX.Element{

    const copyRef = useRef<HTMLElement | null>(null);
    const [copyId, setCopyId] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState<boolean>(false)
    const textSplitRef = useRef<SplitType | null>(null);
    

    useEffect(() => {
        setCopyId(`copy-${Math.floor(Math.random() * 10000)}`);
    },[]);

    useEffect(() => {
        const copy = copyRef.current;

        if(!copy || !copyId || !isInitialized) return;
        
        const lineClass = `line-${copyId}`;

        const text = new SplitType(copy, {
            types: "lines",
            lineClass: lineClass
        });

        textSplitRef.current = text;

        const selector = lineSelector || `.${lineClass}`;
        const lines = document.querySelectorAll(selector);

        lines.forEach((line: Element) => {
            const content = line.innerHTML;
            line.innerHTML = `<span class="line-inner-${copyId}">${content}</span>`;
        });

        const initialY = direction === "top" ? "-100%" : "100%";

        gsap.set(`.line-inner-${copyId}`, {
            y: initialY,
            display: "block",
        });

        setIsInitialized(true);

        return () => {
            if (textSplitRef.current) textSplitRef.current.revert();
        };
        
    },[copyId, lineSelector, direction]);

    useGSAP(() => {
        () => {
            const copy = copyRef.current;

            if (!isInitialized || !copy) return

            const tl = gsap.timeline({
                defaults: {
                    ease,
                    duration,
                },
                ...(animatedScroll ? {
                    scrollTrigger: {
                        trigger: copy,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                }: {}),
            })

            tl.to(`.line-inner-${copyId}`, {
                y: "0%",
                stagger,
                delay,
            });

            return () => {
                if(animatedScroll) {
                    ScrollTrigger.getAll()
                    .filter((st) => st.vars.trigger === copy)
                    .forEach((st) => st.kill())
                }
            }
        }
    },{
        scope: copyRef,
        dependencies: [
            isInitialized,
            animatedScroll,
            delay,
            duration,
            ease,
            stagger,
            direction,
            copyId
        ]
    })

    const TagComponent = tag as React.ElementType;

    return(
        <TagComponent
            ref={copyRef}
            className= {`animated-copy ${className}`}
            data-copy-id={copyId || undefined}
        >
            {children}
        </TagComponent>
    )
}