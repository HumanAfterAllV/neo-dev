"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function TextAnimation(): React.JSX.Element {

    const hasAnimatedRef = useRef<boolean>(false);
    
    useEffect(() => {

        let radId: number;

        const init = () => {

            if (hasAnimatedRef.current) return;
            hasAnimatedRef.current = true;

            const animeTextParagraphs: NodeListOf<Element> = document.querySelectorAll('.anime-text-paragraph');
            const animeTextContainer: NodeListOf<Element> = document.querySelectorAll('.animated-text-container');
            
            const wordHighlightBgColor: string = "191, 188, 180";
        
            const keywords: string[] = [
                "HumanDev",
                "fullstack",
                "estructura",
                "simples",
                "construcción",
                "aprendizaje",
                "blog",
                "compartir",
                "construir",
            ];
    
            if (!animeTextParagraphs.length || !animeTextContainer.length) {
                console.warn("No anime text paragraphs or containers found.");
                return;
            }
    
        
            animeTextParagraphs.forEach((paragraph: Element) => {
                const text: string = paragraph.textContent || "";
                const words: string[] = text.split(/\s+/);
                paragraph.innerHTML = "";
        
                words.forEach((word: string) => {
                    if(word.trim()) {
                        const wordContainer = document.createElement("div");
                        wordContainer.className = "word";
        
                        const wordText = document.createElement("span");
                        wordText.textContent = word;
        
                        const normalizedWord = word.toLowerCase().replace(/[.,!?;:"]/g, "");
                        if (keywords.includes(normalizedWord)) {
                        wordContainer.classList.add("keyword-wrapper");
                        wordText.classList.add("keyword", normalizedWord);
                        }
        
                        wordContainer.appendChild(wordText);
                        paragraph.appendChild(wordContainer);
                    }
                });
            });
            
            
            animeTextContainer.forEach((container: Element) => {
                ScrollTrigger.create({
                    trigger: container,
                    pin: container,
                    start: "top top",
                    end: `+=${window.innerHeight * 4}`,
                    pinSpacing: true,
                    onUpdate: (self: ScrollTrigger) => {
                        const progress: number = self.progress;
                        const words: Element[] = Array.from(container.querySelectorAll(".anime-text .word"));
        
                        const totalWords: number = words.length;
        
                        words.forEach((word, index) => {
                            const wordText: Element | null = word.querySelector("span");
        
                            if (progress  <= 0.7) {
                                const progressTarget: number = 0.7;
                                const revealProgress: number = Math.min(1, progress / progressTarget);
        
                                const overlapWords: number = 15;
                                const totalAnimationLength: number = 1 + overlapWords / totalWords;;
        
                                const wordStart: number = index / totalWords;
                                const wordEnd: number = wordStart + overlapWords / totalWords;
        
                                const timeLineScale: number = 1 / Math.min(totalAnimationLength, 1 + (totalWords - 1) / totalWords + overlapWords / totalWords);
        
                                const adjustedStart: number = wordStart * timeLineScale;
                                const adjustedEnd: number = wordEnd * timeLineScale;
                                const duration: number = adjustedEnd - adjustedStart;
    
                                const wordProgress =
                                revealProgress <= adjustedStart
                                    ? 0
                                    : revealProgress >= adjustedEnd
                                    ? 1
                                    : (revealProgress - adjustedStart) / duration;
                                                            
                                (word as HTMLElement).style.opacity = String(wordProgress);
        
                                const backgroundFadeStart: number =
                                wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
                                const backgroundOpacity: number = Math.max(0, 1 - backgroundFadeStart);
                                (word as HTMLElement).style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`;
    
                                const textRevealThreshold: number = 0.9;
                                const textRevealProgress: number =
                                wordProgress >= textRevealThreshold
                                    ? (wordProgress - textRevealThreshold) /
                                    (1 - textRevealThreshold)
                                    : 0;
                                (wordText as HTMLElement).style.opacity = String(Math.pow(textRevealProgress, 0.5));
                            } 
                            else {
                                const reverseProgress: number = (progress - 0.7) / 0.3;
                                (word as HTMLElement).style.opacity = "1";
                                const targetTextOpacity: number = 1;
    
                                const reverseOverlapWords: number = 5;
                                const reverseWordStart: number = index / totalWords;
                                const reverseWordEnd: number =
                                reverseWordStart + reverseOverlapWords / totalWords;
    
                                const reverseTimelineScale: number =
                                1 /
                                Math.max(
                                    1,
                                    (totalWords - 1) / totalWords + reverseOverlapWords / totalWords
                                );
    
                                const reverseAdjustedStart: number =
                                reverseWordStart * reverseTimelineScale;
                                const reverseAdjustedEnd: number = reverseWordEnd * reverseTimelineScale;
                                const reverseDuration: number = reverseAdjustedEnd - reverseAdjustedStart;
    
                                const reverseWordProgress: number =
                                reverseProgress <= reverseAdjustedStart
                                    ? 0
                                    : reverseProgress >= reverseAdjustedEnd
                                    ? 1
                                    : (reverseProgress - reverseAdjustedStart) / reverseDuration;
        
                                if (reverseWordProgress > 0) {
                                (wordText as HTMLElement).style.opacity =
                                    String(targetTextOpacity * (1 - reverseWordProgress));
                                (word as HTMLElement).style.backgroundColor = `rgba(${wordHighlightBgColor}, ${reverseWordProgress})`;
                                } 
                                else {
                                    (wordText as HTMLElement).style.opacity = String(targetTextOpacity);
                                    (word as HTMLElement).style.backgroundColor = `rgba(${wordHighlightBgColor}, 0)`;
                                }
                            }
                        });
                    }
                })
                
            })
        }

        radId = requestAnimationFrame(init);

        return () => {
            cancelAnimationFrame(radId);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            hasAnimatedRef.current = false;
        };

    }, []);


    return (
        <>
            <section className="about home-section animated-text-container relative">
                <div className="copy-container">
                    <div className="anime-text">
                        <p className="anime-text-paragraph">
                            NeoDev es mi espacio para crecer como desarrollador fullstack con enfoque en diseño, estructura y claridad.
                            Trabajo con Next.js, TypeScript, Tailwind, GSAP y PostgreSQL, buscando siempre soluciones simples y bien pensadas.
                        </p>
                        <p className="anime-text-paragraph">
                            En el blog comparto lo que aprendo: patrones de diseño, buenas prácticas y errores comunes.
                            Es una guía en construcción para quienes también están comenzando este camino.
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full px-12">
                    <div className="flex justify-between px-10 font-barlow text-md text-black">
                        <p>
                            <span>&#9654;</span> Specs loaded
                        </p>
                        <p>
                            / Readme.md
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}