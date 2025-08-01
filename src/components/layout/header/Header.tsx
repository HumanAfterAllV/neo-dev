"use client";

import React, { useEffect, useRef, useState } from "react"

import gsap from "gsap";

import { HeaderLogo } from "./HeaderLogo";
import { NavOverlay } from "./NavOverlay";


export default function Header(): React.JSX.Element {

    const menuToggleBtnRef = useRef<HTMLDivElement | null>(null);
    const navOverlayRef = useRef<HTMLDivElement | null>(null);
    const openLabelRef = useRef<HTMLParagraphElement  | null>(null);
    const closeLabelRef = useRef<HTMLParagraphElement  | null>(null);
    const navItemsRef = useRef<HTMLDivElement[]>([]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const scrollYRef = useRef(0);
    const isAnimatingRef = useRef(false);

    useEffect(() => {
        const menuToggleBtn = menuToggleBtnRef.current;
        const navOverlay = navOverlayRef.current;
        const openLabel = openLabelRef.current;
        const closeLabel = closeLabelRef.current;

        if (!menuToggleBtn || !navOverlay || !openLabel || !closeLabel) return;

        const handleClick = () => {
            if (isAnimatingRef.current) {
                gsap.killTweensOf([
                    navOverlay, 
                    openLabel, 
                    closeLabel,
                    navItemsRef.current
                ]);
                isAnimatingRef.current = false;
            }
            if (!isMenuOpen) {
                isAnimatingRef.current = true;
    
                navOverlay.style.pointerEvents = "all";
                menuToggleBtn.classList.add("menu-open");
                scrollYRef.current = window.scrollY;
                document.body.style.overflow = "fixed";
                document.body.style.top = `-${scrollYRef.current}px`;
                document.body.style.width = "100%";
    
                gsap.to(openLabel, {
                    y: "-1rem",
                    duration: 0.3,
                });
    
                gsap.to(closeLabel, {
                    y: "-1rem",
                    duration: 0.3,
                });
    
                gsap.to(navOverlay, {
                    opacity: 1,
                    duration: 0.3,
                    onComplete: () => {
                        isAnimatingRef.current = false;
                    }
                });
    
                gsap.to([...navItemsRef.current, "nav-footer-item-header", "nav-footer-item-copy"], {
                    y: "0",
                    opacity: 1,
                    duration: 0.75,
                    stagger: 0.075,
                    ease: "power4.out",
                });
    
                setIsMenuOpen(true);
            }
            else {
                isAnimatingRef.current = true;
                navOverlay.style.pointerEvents = "none";
                menuToggleBtn.classList.remove("menu-open");
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
                window.scrollTo(0, scrollYRef.current);
    
                gsap.to(openLabel, {
                    y: "0",
                    duration: 0.3,
                });
    
                gsap.to(closeLabel, {
                    y: "0",
                    duration: 0.3,
                });
    
                gsap.to(navOverlay, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        gsap.set([...navItemsRef.current, 
                            "nav-footer-item-header", 
                            "nav-footer-item-copy"
                        ], {
                            y: "100%",
                            opacity: 0,
                        });
                        isAnimatingRef.current = false;
                    }
                });
                setIsMenuOpen(false);
            }
        }


        menuToggleBtn.addEventListener("click", handleClick);
        return () => {
            menuToggleBtn.removeEventListener("click", handleClick);
        }

    },[isMenuOpen])
    
    return (
        <>
            <HeaderLogo 
                menuToggleBtnRef={menuToggleBtnRef}
                openLabelRef={openLabelRef} 
                closeLabelRef={closeLabelRef}
            />
            <NavOverlay
                navOverlayRef={navOverlayRef}
                navItemsRef={navItemsRef}
            /> 
        </>
    )
};





