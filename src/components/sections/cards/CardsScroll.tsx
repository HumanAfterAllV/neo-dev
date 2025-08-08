/**
 * * 1
 */

"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

type ProjectsItems = {
    label: string;
    img: string;
    alt: string;
    bgColor?: string;
    description: string;
    colorText?: string;
    link: string;
};

gsap.registerPlugin(ScrollTrigger);

export default function CardsScroll(): React.JSX.Element {

    const scrollTriggerRef = useRef<ScrollTrigger[]>([]);


    useEffect(() => {
        const initialAnimation = () => {
            if (window.innerWidth <= 1000) 
            {
                scrollTriggerRef.current?.forEach((instance) => {
                    if (instance) instance.kill();
                });
                scrollTriggerRef.current = [];
                return;
            }

            scrollTriggerRef.current.forEach((instance) => {
                if (instance) instance.kill();
            })
            scrollTriggerRef.current = [];

            const service: HTMLElement[] = gsap.utils.toArray('.service-card');

            if (service.length === 0) return;

            const mainTrigger = ScrollTrigger.create({
                trigger: service[0],
                start: "top 50%",
                endTrigger: service[service.length - 1],
                end: "top 150%",
            });

            scrollTriggerRef.current.push(mainTrigger);

            service.forEach((card: HTMLElement, index: number) => {
                const isLastServiceCard = index === service.length - 1;
                const serviceCardInner = card.querySelector('.service-card-inner');

                if (!isLastServiceCard && serviceCardInner) {
                    const trigger = ScrollTrigger.create({
                        trigger: card,
                        start: "top 45%",
                        endTrigger: ".contact-cta",
                        end: "top 90%",
                        pin: true,
                        pinSpacing: false,
                    });

                    scrollTriggerRef.current.push(trigger);

                    const scrollAnimation = gsap.to(serviceCardInner, {
                        y: `-${(service.length - index) * 14}vh`,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 45%",
                            endTrigger: ".contact-cta",
                            end: "top 90%",
                            scrub: true,
                        }
                    })

                    if (scrollAnimation.scrollTrigger) {
                        scrollTriggerRef.current.push(scrollAnimation.scrollTrigger);
                    }
                }
            });
        }

        initialAnimation();
        ScrollTrigger.refresh();

        return () => {
            scrollTriggerRef.current.forEach((instance) => {
                if (instance) instance.kill();
            });
            scrollTriggerRef.current = [];
        }
    },[])

    const projectsItems: ProjectsItems[] = [
        {
            label: "iPhone 15",
            img: "/screenshots/iphone_screenshot.png",
            alt: "Apple-iPhone website",
            bgColor: "#f2acac",
            description: "Diseños creativos para tu marca.",
            link: "https://apple-website-haav.vercel.app/"
        },
        {
            label: "Suburbia",
            img: "/screenshots/suburdia_screenshot.png",
            alt: "Suburbia website",
            bgColor: "#fffd94",
            description: "Creamos sitios web modernos y funcionales.",
            link: "https://suburbia-skate-sigma.vercel.app/"
        },
        {
            label: "Awwwards",
            img: "/screenshots/awwward_screenshot.png",
            alt: "Awwwards website",
            bgColor: "#0a0a0a",
            colorText: "#f9f4eb",
            description: "Estrategias efectivas para crecer en línea.",
            link: "https://awwwards-gsap-eta.vercel.app/"
        },
    ];


    
    return (
        <>
            {projectsItems.map((item: ProjectsItems, index: number) => (
                <div key={index} className="service-card" id={"service-card-" + (index + 1)} >
                    <div className="service-card-inner">
                        <div className="service-card-content">
                            <Link
                            target="_blank"
                                href={item.link}
                                className="font-grotesk font-bold text-8xl cursor-pointer"
                                style={{
                                    color: item.colorText ?? "#0a0a0a"
                                }}

                            >
                                {item.label}</Link>
                        </div>
                        <div className="flex-1 aspect-[4/5] border rounded-2xl overflow-hidden relative">
                            <Image
                                src={item.img}
                                alt={item.alt}
                                fill
                                className="object-cover object-center"
                            />
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}