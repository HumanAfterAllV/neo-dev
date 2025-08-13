"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedCopy from "@/components/elements/AnimatedCopy";

import Image from "next/image";


type Category = "Frontend" | "Backend"

type ProjectsList = {
    label: string;
    link: string;
    src: string;
    category: Category;
    hashtag?: string;
}
export default function ProjectsScroll(): React.JSX.Element {
    
    const stickyProjectsHeaderRef = useRef<HTMLElement | null>(null);
    const homeProjectsRef = useRef<HTMLElement | null>(null);
    
    useEffect(() => {
        const homeProjects = homeProjectsRef.current;
        const stickyProjectsHeader = stickyProjectsHeaderRef.current;

        if (!homeProjects || !stickyProjectsHeader) return;

        let projectsHeaderPin: ScrollTrigger | undefined;

        if(stickyProjectsHeader && homeProjects) {
            projectsHeaderPin = ScrollTrigger.create({
                trigger: stickyProjectsHeader,
                start: "top top",
                endTrigger: homeProjects,
                end: "bottom bottom",
                pin: true,
                pinSpacing: false,
            });
        }

        return () => {
            if (projectsHeaderPin) {
                projectsHeaderPin.kill();
            }
        }
    },[])

    const projectsList: ProjectsList[] = [
	{ 
        label: "Awwwards", link: "", src: "/screenshots/awwward_screenshot.png" , category: "Frontend"},
	{ label: "Suburbia", link: "", src: "/screenshots/suburdia_screenshot.png" , category: "Frontend"},
    { label: "IPhone", link: "" , src: "/screenshots/iphone_screenshot.png", category: "Frontend"},
    { label: "Express", link: "", src: "" , category: "Backend"},
    { label: "CoEdit", link: "" , src: "", category: "Frontend"},
    { label: "BlogApi", link: "", src: "" , category: "Backend"},
]


    return(
        <>
            <section ref={stickyProjectsHeaderRef} className="relative w-screen h-svh p-[2em] flex justify-center items-center text-center overflow-hidden">
                <AnimatedCopy tag="h1" className="opacity-10 leading-1 text-9xl font-grotesk font-semibold" animatedScroll={true}>
                    Proyectos
                </AnimatedCopy>
            </section>
            <section ref={homeProjectsRef} className="w-full p-[8em]">
                <div className="w-2/5 m-auto flex flex-col gap-[8em]">
                    {projectsList.map((item: ProjectsList, index: number) => (
                        <Link key={index} href={item.link} className="flex flex-col justify-center items-center text-center gap-[2em] z-10" target="_blank">
                            <p className="uppercase font-barlow text-sm font-semibold tracking-[0.04em]">
                                {`${String(index + 1).padStart(2, "0")}`} - {`${String(projectsList.length).padStart(2, "0")}`}
                            </p>
                            <h3 className="font-semibold text-[4vw] tracking-tight leading-[3.4vw]">{item.label}</h3>
                            <div className="flex flex-col justify-between items-center w-2xl h-[350px] bg-black rounded-[60px]">
                                <Image 
                                    src={item.src} 
                                    alt={item.label} 
                                    height={500} 
                                    width={500}
                                    className="rounded-4xl pt-2.5" 
                                />
                            </div>
                            <div>

                            </div>
                            <div className="font-semibold text-[2vw] tracking-tighter leading-[2vw]">{item.category}</div>
                        </Link>
                    ))}
                </div>
            </section>
            <section className="w-full h-[500px]"></section>
        </>
    )
}