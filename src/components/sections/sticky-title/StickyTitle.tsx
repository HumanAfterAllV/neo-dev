"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";


gsap.registerPlugin(ScrollTrigger);

export default function StickyTitle(): React.JSX.Element {
    
    const stickyTitleRef = useRef<HTMLElement | null>(null);
    const titlesRef = useRef<Array<HTMLHeadingElement | null>>([]);

    useEffect(() => {
        const handleResize = () => {
            ScrollTrigger.refresh();
        }

        window.addEventListener("resize", handleResize);

        const stickySection = stickyTitleRef.current;
        const titles = titlesRef.current.filter(Boolean);

        if (!stickySection || titles.length !== 3)
        {
            window.removeEventListener("resize", handleResize);
            return
        };

        gsap.set(titles[0], {opacity: 1, scale: 1});
        gsap.set(titles[1], {opacity: 0, scale: 0.75});
        gsap.set(titles[2], {opacity: 0, scale: 0.75});

        const pinTrigger = ScrollTrigger.create({
            trigger: stickySection,
            start: "top top",
            end: `+=${window.innerHeight * 5 }`,
            pin: true,
            pinSpacing: true,
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: stickySection,
                start: "top top",
                end: `+=${window.innerHeight * 4}`,
                scrub: 0.5
            }
        })

        tl.to(titles[0],{
            opacity: 0,
            scale: 0.75,
            duration: 0.3,
            ease: "power2.out"
        },1)

        .to(titles[1], {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.in"
        }, 1.25)

        tl.to(titles[1], {
            opacity: 0,
            scale: 0.75,
            duration: 0.3,
            ease: "power2.out",
        },2.5)

        .to(titles[2], {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.in",
        }, 2.75)


        return () => {
            pinTrigger.kill()
            
            if(tl.scrollTrigger)
            {
                tl.scrollTrigger.kill()
            }
            tl.kill()
            window.removeEventListener("resize", handleResize);
        }
    })

    const titleData: string[] = [
        "Creo experiencia y lo comparto en mi blog, historias de un jr",
        "Cada proyecto lleva a una emoción, a una estética de mi vision.",
        "Esta web esta hecha para aquellos que desean salir del jr en tiempo de IA."
    ] 

    return (
        <section ref={stickyTitleRef} className="relative w-screen h-svh overflow-hidden p-[2em] flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full px-22 flex justify-between items-center font-barlow text-sm text-black border border-t-[1px] border-dashed border-dark-500">
                <p >Mi historia en la tecnología</p>
                <p >Abierto a colaborar</p>
            </div>
            {titleData.map((item: string, index: number) => (
                <h2 className="title-sticky font-grotesk font-bold text-7xl absolute top-1/2 left-1/2 text-center -translate-x-1/2 -translate-y-1/2" key={index} ref={(el) => { titlesRef.current[index] = el; }}>{item}</h2>
            ))}
        </section>
    )
}