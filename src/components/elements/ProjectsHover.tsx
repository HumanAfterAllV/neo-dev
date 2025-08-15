"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";

type ProjectsList = {
    label: string;
    link: string;
}

export default function ProjectsHover(): React.JSX.Element {
    
    const containerRef = useRef<HTMLDivElement>(null);
    const highlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const container = containerRef.current;
        const highlight = highlightRef.current;

        if (!container || !highlight) return;

        const gridItems = container.querySelectorAll(".grid-item");
        const firstItem = container.querySelector(".grid-item");

        const highlightsColors : string[] = [
            "#f2acac",
            "#b1c1ef",
            "#ffdd94",
            "#c8b2e2",
            "#b2e2b1",
            "#f4c2e1",
            "#a5dee5",
            "#e9b6ff",
        ];

        gridItems.forEach((item, index) => {
            (item as HTMLElement).dataset.color = highlightsColors[index % highlightsColors.length];
        });

        const moveElement = (element: any) => {
            if (element)
            {
                const rect = element.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                highlight.style.transform = `translate(${
                    rect.left - containerRect.left
                }px, ${rect.top - containerRect.top}px)`;
                highlight.style.width = `${rect.width}px`;
                highlight.style.height = `${rect.height}px`;
                highlight.style.backgroundColor = element.dataset.color ?? "#ffffff";
            }
        }

        const moveHighlight = (e: MouseEvent) => {
            const hoverElement = document.elementFromPoint(e.clientX, e.clientY);

            if (hoverElement && hoverElement.classList.contains("grid-item"))
            {
                moveElement(hoverElement);
            }
            else if
            (
                hoverElement &&
                hoverElement?.parentElement &&
                hoverElement.parentElement.classList.contains("grid-item")
            ){
                moveElement(hoverElement.parentElement);
            }
            
        }

        moveElement(firstItem);

        container.addEventListener("mousemove", moveHighlight);

        return () => {
            container.removeEventListener("mouseleave", moveHighlight);
        }
    }, []);


    const projectsList1: ProjectsList[] = [
        {label: "Suburbia", link: "https://suburbia-skate-sigma.vercel.app/"},
        {label: "Awwwwards", link: "https://awwwards-gsap-eta.vercel.app/"},
        {label: "Iphone-15", link: "https://apple-website-haav.vercel.app/"},
    ];

    const projectsList2: ProjectsList[] = [
        {label: "Co-Edit", link:"https://co-edit-virid.vercel.app/"},
        {label: "Health-Care", link: "https://health-care-vert-two.vercel.app/"},
        {label: "BlogPost-API", link:"https://github.com/HumanAfterAllV/blogpost-api"},
        {label: "Design-Patterns", link: "https://github.com/HumanAfterAllV/design-patterns"},
        {label: "Store-Express", link: "https://github.com/HumanAfterAllV/my-store-express"}
    ]
    
    return(
        <div ref={containerRef} className="relative w-full h-svh flex items-center justify-center">
            <div className="relative m-auto w-[90%] h-[60%] flex flex-col ">
                <div className="flex-1 flex justify-center items-center h-full">
                    {projectsList1.map((item: ProjectsList, index: number) => (
                        <Link key={index} href={item.link} target="_blank" className="grid-item flex-1 flex justify-center items-center h-full relative z-10">
                                {item.label}
                        </Link>
                    ))}
                </div>
                <div className="flex-1 flex justify-center items-center h-full">
                    {projectsList2.map((item: ProjectsList, index: number) => (
                        <Link key={index} href={item.link} target="_blank" className="grid-item flex-1 flex justify-center items-center h-full relative z-10">
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
            <div ref={highlightRef} className="highlight absolute top-0 left-0 bg-bg pointer-events-none"></div>
        </div>
    )
}