"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function HeroScroll({
    animatedIconRef,
    heroHeaderRef,
    heroSectionRef,
    }: {
    animatedIconRef: React.RefObject<HTMLDivElement | null>;
    heroHeaderRef: React.RefObject<HTMLDivElement | null>;
    heroSectionRef: React.RefObject<HTMLElement | null>;
}): null {

    useEffect(() => {

        // Instance Lenis for smooth scrollin

        // Clean up on component unmount
        const animatedIcons = animatedIconRef.current;
        const heroHeader = heroHeaderRef.current;
        const heroSection = heroSectionRef.current;


        // Ensure all elements are available before proceeding
        const iconElements = document.querySelectorAll<HTMLDivElement>(".animated-icon");
        const textSegments = document.querySelectorAll<HTMLElement>(".text-segment");
        const placeholders = document.querySelectorAll<HTMLDivElement>(".placeholder-icon");

        // Check if all elements are found
        if (!animatedIcons || !heroHeader || !heroSection || !iconElements.length  || !textSegments.length ) {
            console.warn("Elements not found or not ready");
            return;
        }

        // Set up GSAP animations for the animated icons
        const textAnimationOrder: { segment: Element; originalIndex: number }[] = [];
        textSegments.forEach((segment, index) => {
            textAnimationOrder.push({ segment, originalIndex: index });
        });

        for (let i = textAnimationOrder.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [textAnimationOrder[i], textAnimationOrder[j]] = [textAnimationOrder[j], textAnimationOrder[i]];
        }

        
        // Animate the text segments
        const isMobile: boolean = window.innerWidth <= 1000;
        const headerIconSize: number = isMobile ? 30 : 60;
        const currentIconSize: number = iconElements[0].getBoundingClientRect().width;
        const exactScale: number = headerIconSize / currentIconSize;

        // Array to hold duplicate icons
        const duplicateIcons: HTMLDivElement[] = [];
 
        // Create scroll-triggered animations for each icon
        ScrollTrigger.create({
            trigger: heroSection,
            start: "top top",
            end: `+=${window.innerHeight * 8}px`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // 
                textSegments.forEach((segment) => {
                    gsap.set(segment, {
                        opacity: 0
                    })
                });

                // Animate the text segments based on progress
                if (progress <= 0.3) {
                    const moveProgress: number = progress / 0.3;
                    const containerMoveY: number = -window.innerHeight * 0.3 * moveProgress;

                    if (progress <= 0.15) {
                        const headerProgress: number = progress / 0.15;
                        const headerMoverY: number = -50 * headerProgress;
                        const headerOpacity: number = 1 - headerProgress;

                        gsap.set(heroHeader, {
                            transform: `translate(-50%, calc(-50% + ${headerMoverY}px))`,
                            opacity: headerOpacity
                        });
                    }
                    else {
                        gsap.set(heroHeader, {
                            transform: `translate(-50%, calc(-50% + -50px))`,
                            opacity: 0
                        })
                    }

                    // Move the animated icons
                    if (duplicateIcons.length > 0) {
                        duplicateIcons.forEach((duplicate) => {
                            if (duplicate.parentNode) {
                                duplicate.parentNode.removeChild(duplicate);
                            }
                        });

                        duplicateIcons.length = 0; // Clear the array
                    }

                    gsap.set(animatedIcons, {
                        x: 0,
                        y: containerMoveY,
                        scale: 1,
                        opacity: 1,
                    });

                    // Animate the text segments
                    iconElements.forEach((icon: HTMLElement, index: number) => {
                        const staggerDelay: number = index * 0.1;
                        const iconStart: number = staggerDelay;
                        const iconEnd: number = staggerDelay + 0.3;
                        const iconProgress: number = gsap.utils.mapRange(
                            iconStart,
                            iconEnd,
                            0,
                            1,
                            moveProgress
                        );
                        const clamped: number = Math.max(0, Math.min(1, iconProgress));
                        const startOffset: number = -containerMoveY;
                        const individualY = startOffset * (1 - clamped);

                        gsap.set(icon, {
                            y: individualY,
                            x: 0,
                        });
                    });
                }
                else if (progress <= 0.6) {
                    const scaleProgress: number = (progress - 0.3) / 0.3;

                    gsap.set(heroHeader, {
                        transform: `translate(-50%, calc(-50% + -50px))`,
                        opacity: 0
                    })

                    if (scaleProgress >= 0.5) {
                        heroSection.style.background = "#E3E3DB";
                    }
                    else {
                        heroSection.style.background = "#E3E3DB";
                    }

                    if (duplicateIcons.length > 0) {
                        duplicateIcons.forEach((duplicate) => {
                            if (duplicate.parentNode) {
                                duplicate.parentNode.removeChild(duplicate);
                            }
                        });

                        duplicateIcons.length = 0; // Clear the array
                    }

                    const targetCenterX: number = window.innerWidth / 2;
                    const targetCenterY: number = window.innerHeight / 2;
                    const containerRect = animatedIcons.getBoundingClientRect();
                    const currentCenterX: number = containerRect.left + containerRect.width / 2;
                    const currentCenterY: number = containerRect.top + containerRect.height / 2;
                    const deltaX: number = (targetCenterX- currentCenterX) * scaleProgress;
                    const deltaY: number = (targetCenterY - currentCenterY) * scaleProgress
                    const baseY: number = -window.innerHeight * 0.3;
                    const currentScale: number = 1 + (exactScale - 1) * scaleProgress;

                    gsap.set(animatedIcons, {
                        x: deltaX,
                        y: baseY + deltaY,
                        scale: currentScale,
                        opacity: 1,
                    });

                    iconElements.forEach((icon) => {
                        gsap.set(icon, {
                            x: 0,
                            y: 0,
                        });
                    });
                }
                else if (progress <= 0.75) {
                    const moveProgress: number = (progress - 0.6) / 0.15;

                    gsap.set(heroHeader, {
                        transform: `translate(-50%, calc(-50% + -50px))`,
                        opacity: 0
                    })

                    heroSection.style.background = "#E3E3DB";

                    const targetCenterY: number = window.innerHeight / 2;
                    const targetCenterX: number = window.innerWidth / 2;
                    const containerRect = animatedIcons.getBoundingClientRect();
                    const currentCenterX: number = containerRect.left + containerRect.width / 2;
                    const currentCenterY: number = containerRect.top + containerRect.height / 2;
                    const deltaX: number = targetCenterX - currentCenterX;
                    const deltaY: number = targetCenterY - currentCenterY;
                    const baseY: number = -window.innerHeight * 0.3;

                    gsap.set(animatedIcons, {
                        x: deltaX,
                        y: baseY + deltaY,
                        scale: exactScale,
                        opacity: 0,
                    });

                    iconElements.forEach((icon) => {
                        gsap.set(icon, {
                            x: 0,
                            y: 0,
                        });
                    });

                    if (!duplicateIcons.length) {
                        iconElements.forEach((icon) => {
                            const duplicate = icon.cloneNode(true) as HTMLDivElement;
                            duplicate.classList.add("duplicate-icon");
                            duplicate.style.position = "absolute";
                            duplicate.style.width = headerIconSize + "px";
                            duplicate.style.height = headerIconSize + "px";

                            document.body.appendChild(duplicate);
                            duplicateIcons.push(duplicate);
                        });
                    }

                    if (duplicateIcons) {
                        duplicateIcons.forEach((duplicate, index) => {
                            if (index < placeholders.length ) {
                                const iconRect = iconElements[index].getBoundingClientRect();
                                const startCenterX: number = iconRect.left + iconRect.width / 2;
                                const startCenterY: number = iconRect.top + iconRect.height / 2;
                                const startPageX: number = startCenterX + window.pageXOffset;
                                const startPageY: number = startCenterY + window.pageYOffset;

                                const targetRect = placeholders[index].getBoundingClientRect();
                                const targetCenterX: number = targetRect.left + targetRect.width / 2;
                                const targetCenterY: number = targetRect.top + targetRect.height / 2;
                                const targetPageX: number = targetCenterX + window.pageXOffset;
                                const targetPageY: number = targetCenterY + window.pageYOffset;

                                const moveX: number = targetPageX - startPageX;
                                const moveY: number = targetPageY - startPageY;
    
                                let currentX: number = 0;
                                let currentY: number = 0;
    
                                if (moveProgress <= 0.5) {
                                    const verticalProgress: number = moveProgress / 0.5;
                                    currentY = moveY * verticalProgress;
                                }
                                else {
                                    const horizontalProgress: number = (moveProgress -0.5) / 0.5;
                                    currentY = moveY;
                                    currentX = moveX * horizontalProgress;
                                }

                                const finalPageX: number = startPageX + currentX;
                                const finalPageY: number = startPageY + currentY;

                                duplicate.style.left = `${finalPageX - headerIconSize / 2}px`;
                                duplicate.style.top = `${finalPageY - headerIconSize / 2}px`;
                                duplicate.style.opacity = "1";
                                duplicate.style.display = "flex";
                            }
                        })
                    }
                }
                else {
                    gsap.set(heroHeader, {
                        transform: `translate(-50%, calc(-50% + -50px))`,
                        opacity: 0
                    });

                    heroSection.style.backgroundColor = "#E3E3DB";

                    gsap.set(animatedIcons, {
                        opacity: 0,
                    })

                    if (duplicateIcons.length > 0) {
                        duplicateIcons.forEach((duplicate, index) => {
                            if (index < placeholders.length) {
                                const targetRect = placeholders[index].getBoundingClientRect();
                                const targetCenterX: number = targetRect.left + targetRect.width / 2;
                                const targetCenterY: number = targetRect.top + targetRect.height / 2;

                                const targetPageX: number = targetCenterX + window.pageXOffset;
                                const targetPageY: number = targetCenterY + window.pageYOffset;

                                duplicate.style.left = `${targetPageX - headerIconSize / 2}px`;
                                duplicate.style.top = `${targetPageY - headerIconSize / 2}px`;
                                duplicate.style.opacity = "1";
                                duplicate.style.display = "flex";
                            }
                        });
                    }
                    textAnimationOrder.forEach((item, randomIndex) => {
                        const segmentStart: number = 0.75 + randomIndex * 0.03;
                        const segmentEnd: number = segmentStart + 0.015;

                        const segmentProgress: number = gsap.utils.mapRange(
                            segmentStart,
                            segmentEnd,
                            0,
                            1,
                            progress
                        );
                        const clampedProgress: number = Math.max(0, Math.min(1, segmentProgress));

                        gsap.set(item.segment, { opacity: clampedProgress });
                    });
                }
            }
        })

        ScrollTrigger.refresh();

    }, [heroHeaderRef, heroSectionRef, animatedIconRef]);

    return null
}