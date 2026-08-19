import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { WordmarkSVG } from "../components/WordmarkSVG";

// Easily configurable solid background color for the opening panel
export const INTRO_BG = "#0A0A0C";

// ADJUST SVG SIZE HERE:
export const SVG_SIZE_CLASSES = "w-full max-w-4xl md:max-w-6xl lg:max-w-7xl max-h-[60vh] h-auto object-contain text-[#FBFBFB]";

interface SlidingPanelProps {
    heroContent?: React.ReactNode;
}

export default function SlidingPanel({ heroContent }: SlidingPanelProps) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const textWrapperRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            if (!svgRef.current || !wrapperRef.current || !textRef.current || !textContainerRef.current) return;

            // Select all individual letter paths inside the SVG
            const paths = svgRef.current.querySelectorAll('.wordmark-path');

            // 1. Initial Entrance Animation on Page Load
            const tl = gsap.timeline();

            // Scale the SVG wrapper slightly
            tl.fromTo(
                wrapperRef.current,
                { scale: 1.05 },
                { scale: 1, duration: 2, ease: "power2.out" },
                0
            );

            // "Draw" / reveal letters one by one
            tl.fromTo(
                paths,
                { opacity: 0, y: 40, scale: 0.9, transformOrigin: "50% 50%" },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "back.out(1.5)",
                    stagger: {
                        each: 0.15,
                        from: "start"
                    }
                },
                0
            );

            // 2. Scroll-Driven Timeline (Typewriter + Zoom Reveal + Description)
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=600%",
                    pin: true,
                    pinSpacing: true,
                    scrub: 2.2,
                    anticipatePin: 1,
                }
            });

            // Calculate exact pixel width of the text string so cursor stops EXACTLY after the last letter
            const fullTextWidth = textRef.current.offsetWidth || textRef.current.scrollWidth;

            // Fade out scroll indicator immediately upon scrolling
            if (scrollIndicatorRef.current) {
                scrollTl.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.1 }, 0);
            }

            // Step A: Make text wrapper visible
            scrollTl.to(textWrapperRef.current, { opacity: 1, duration: 0.05 }, 0.05);

            // Step B: Typewrite the text up to exact text width
            scrollTl.fromTo(
                textContainerRef.current,
                { width: 0 },
                { width: fullTextWidth, ease: "none", duration: 1 },
                0.1
            );

            // Step C: Fade out the cursor right after typing finishes
            scrollTl.to(
                textContainerRef.current,
                { borderRightColor: "transparent", duration: 0.1 },
                1.15
            );

            // Fade out description text right before zoom starts
            scrollTl.to(
                textWrapperRef.current,
                { opacity: 0, scale: 0.9, duration: 0.3 },
                1.25
            );

            // Step D: CINEMATIC ZOOM-THROUGH & FADE REVEAL
            // 1. Zoom SVG wordmark massively so the camera "zooms through" it
            scrollTl.to(
                wrapperRef.current,
                {
                    scale: 16,
                    opacity: 0,
                    transformOrigin: "50% 50%",
                    ease: "power2.in",
                    duration: 1.5
                },
                1.3
            );

            // 2. Fade out background panel to reveal the landing page behind
            scrollTl.to(
                panelRef.current,
                {
                    opacity: 0,
                    ease: "power1.inOut",
                    duration: 1.2
                },
                1.5
            );

            // Hide panel completely after zoom completes so landing page is fully interactive
            scrollTl.set(panelRef.current, { pointerEvents: "none", display: "none" });

            // Step E: DRAW THE HERO UNDERLINE while still pinned
            const heroLine = document.querySelector('[data-hero-line]') as HTMLElement | null;
            if (heroLine) {
                scrollTl.fromTo(
                    heroLine,
                    { width: "0%" },
                    { width: "80%", ease: "power2.out", duration: 1 },
                    2.8
                );
            }

            // Step F: FADE OUT wordmark, line, and metadata — page stays pinned
            const heroWordmark = document.querySelector('[data-hero-wordmark]') as HTMLElement | null;

            if (heroWordmark) {
                scrollTl.to(
                    heroWordmark,
                    { opacity: 0, y: -30, ease: "power2.in", duration: 0.6 },
                    4.0
                );
            }
            if (heroLine) {
                scrollTl.to(
                    heroLine,
                    { opacity: 0, ease: "power1.in", duration: 0.4 },
                    4.0
                );
            }

            // Step G: TYPEWRITER IN the description text
            const heroDescriptionChars = document.querySelectorAll('.hero-desc-char');
            if (heroDescriptionChars.length > 0) {
                scrollTl.fromTo(
                    heroDescriptionChars,
                    { opacity: 0 },
                    { opacity: 1, ease: "none", duration: 0.1, stagger: 0.02 },
                    4.5
                );
            }

        }, triggerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div className="relative w-full overflow-hidden bg-[#FAF9F6]">
            {/* PINNED SCROLL TRIGGER CONTAINER */}
            <div ref={triggerRef} className="relative w-full">

                {/* SINGLE PANEL: LANDING PAGE */}
                <div className="relative w-screen h-screen overflow-hidden bg-[#F8F8F6]">
                    {/* SOLID BACKGROUND SLIDING PANEL (ON TOP) */}
                    <div
                        ref={panelRef}
                        data-intro-panel
                        style={{ backgroundColor: INTRO_BG }}
                        className="absolute top-0 left-0 w-full h-screen select-none z-50 overflow-hidden"
                    >
                        {/* DEAD-CENTERED EXHIBIT'26 WORDMARK SVG */}
                        <div
                            ref={wrapperRef}
                            className="absolute inset-0 flex items-center justify-center p-6 sm:p-12 pointer-events-none"
                            style={{ transformOrigin: "50% 50%" }}
                        >
                            <WordmarkSVG
                                ref={svgRef}
                                className={SVG_SIZE_CLASSES}
                            />
                        </div>

                        {/* SCROLL-DRIVEN TYPEWRITER TEXT */}
                        <div
                            ref={textWrapperRef}
                            className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 opacity-0 flex items-center justify-center w-full max-w-4xl px-4 z-10"
                        >
                            <div
                                ref={textContainerRef}
                                className="overflow-hidden border-r-2 border-[#FBFBFB] pr-1 whitespace-nowrap transition-colors"
                                style={{ width: 0 }}
                            >
                                <div
                                    ref={textRef}
                                    className="inline-block text-[#FBFBFB]/90 text-center text-sm md:text-lg lg:text-xl font-light tracking-wide"
                                >
                                    Build what matters. Solve what challenges us. Exhibit what you create.
                                </div>
                            </div>
                        </div>

                        {/* SCROLL DOWN INDICATOR */}
                        <div
                            ref={scrollIndicatorRef}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#FBFBFB]/50 pointer-events-none transition-opacity z-10"
                        >
                            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-mono">Scroll to explore</span>
                            <svg
                                className="w-4 h-4 animate-bounce text-[#FBFBFB]/70"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </div>

                    {/* HERO CONTENT REVEALED UNDERNEATH */}
                    <div className="relative z-10 w-full h-full">
                        {heroContent}
                    </div>
                </div>

            </div>
        </div>
    );
}
