import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { WordmarkSVG } from "./WordmarkSVG";

// =============================================================================
//  HERO CONFIGURATION — All tuneable values in one place
//  Modify anything below without touching the JSX or animation logic.
// =============================================================================

// ── Background ──────────────────────────────────────────────────────────────
// The section background colour.
export const HERO_BG = "#F8F8F6";

// ── WHAT IF label ────────────────────────────────────────────────────────────
// Font family for the "WHAT IS" label above the wordmark.
const WHAT_IS_FONT = "'Google Sans', sans-serif";
// Font weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 (700 = Bold)
const WHAT_IS_FONT_WEIGHT = "790";
// Size on small screens (mobile)
const WHAT_IS_SIZE_SM = "1.1rem";
// Size on medium screens (tablet)
const WHAT_IS_SIZE_MD = "1.5rem";
// Size on large screens (desktop)
const WHAT_IS_SIZE_LG = "1.5rem";
// Letter-spacing (CSS value, e.g. "0.4em")
const WHAT_IS_LETTER_SPACING = "0.1em";
// Text colour (Tailwind arbitrary or CSS hex)
const WHAT_IS_COLOR = "#71717a"; // zinc-500
// Left offset to perfectly align with the SVG below it
const WHAT_IS_LEFT_OFFSET = "45px";

// ── EXHIBIT'26 SVG wordmark ──────────────────────────────────────────────────
// Maximum height the SVG will grow to on small/large screens.
// Reduce to shrink, increase to grow.
const WORDMARK_MAX_H_SM = "35vh"; // mobile
const WORDMARK_MAX_H_MD = "-30vh"; // desktop
// Negative vertical offset — pulls the wordmark UP from its natural position.
// Increase (more negative) to pull higher; set to "0px" to disable.
const WORDMARK_PULL_UP = "-30vh";
// Left offset so SVG bleeds slightly off screen edge for an editorial feel.
// 0px = flush with container left edge.
const WORDMARK_LEFT_OFFSET = "-300px";
// SVG text/fill colour (via currentColor).
const WORDMARK_COLOR = "#111111"; // near-black

// ── Metadata labels (corner text) ───────────────────────────────────────────
// Font size for all four corner metadata labels.
const META_SIZE = "0.68rem";
// Letter spacing for metadata.
const META_LETTER_SPACING = "0.25em";
// Colour for metadata.
const META_COLOR = "#a1a1aa"; // zinc-400

// ── Mandala Art Configuration ────────────────────────────────────────────────
const MANDALA_TOP = "-top-4";
const MANDALA_RIGHT = "-right-56";
const MANDALA_SIZE = "w-[750px] h-[750px]";
const MANDALA_OPACITY = "opacity-20";

// ── Description Text Style ───────────────────────────────────────────────────
// Adjust the text shadow to ensure the dark text is readable over the spinning mandala
// A subtle white halo ensures it pops against dark lines, and a light dark shadow gives depth.
const DESC_TEXT_SHADOW = "0px 2px 15px rgba(248, 248, 246, 0.9), 0px 0px 5px rgba(255, 255, 255, 1)";

// ── Scroll-exit animation ────────────────────────────────────────────────────
// How much the wordmark scales DOWN as you scroll past the Hero.
// 1 = no change, 0.9 = 10% smaller.
const SCROLL_SCALE_END = 0.96;
// How transparent the wordmark becomes as you scroll away.
// 0 = invisible, 1 = fully opaque.
const SCROLL_OPACITY_END = 0.65;
// The colour the text and SVG fade to as you scroll away.
const SCROLL_COLOR_END = "#000000ff";

// =============================================================================
//  COMPONENT
// =============================================================================

export default function HeroText() {
    const heroRef = useRef<HTMLElement>(null);
    const wordmarkRef = useRef<HTMLDivElement>(null);
    const metaLeftTopRef = useRef<HTMLDivElement>(null);
    const metaRightTopRef = useRef<HTMLDivElement>(null);
    const metaLeftBottomRef = useRef<HTMLDivElement>(null);
    const metaRightBottomRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const mandalaRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const metaElements = [
                metaLeftTopRef.current,
                metaRightTopRef.current,
                metaLeftBottomRef.current,
                metaRightBottomRef.current,
            ].filter(Boolean);

            // Subtle entrance: wordmark settles into position
            if (wordmarkRef.current) {
                gsap.fromTo(
                    wordmarkRef.current,
                    { y: 15, opacity: 0.85 },
                    { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
                );
            }

            // Metadata gently fades in with stagger
            if (metaElements.length > 0) {
                gsap.fromTo(
                    metaElements,
                    { opacity: 0, y: 5 },
                    { opacity: 1, y: 0, duration: 1, delay: 0.3, stagger: 0.08, ease: "power2.out" }
                );
            }

            // Infinite slow rotation for the mandala
            if (mandalaRef.current) {
                gsap.to(mandalaRef.current, {
                    rotation: 360,
                    repeat: -1,
                    duration: 60, // 60 seconds for a full rotation (nice and slow)
                    ease: "none"
                });
            }

            // Scroll effects: color, scale, opacity (no pin — line is driven by slidingPanel)
            if (heroRef.current && wordmarkRef.current) {
                const whatIsText = wordmarkRef.current.querySelector('span');
                const svgElement = wordmarkRef.current.querySelector('svg');

                // Force line to 0 — slidingPanel will animate it
                if (lineRef.current) {
                    gsap.set(lineRef.current, { width: "0%" });
                }

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1.5,
                    }
                });

                if (whatIsText) {
                    tl.to(whatIsText, { color: SCROLL_COLOR_END, ease: "none" }, 0);
                }
                if (svgElement) {
                    tl.to(svgElement, { color: SCROLL_COLOR_END, ease: "none" }, 0);
                }
                tl.to(wordmarkRef.current, {
                    scale: SCROLL_SCALE_END,
                    opacity: SCROLL_OPACITY_END,
                    ease: "none",
                }, 0);
                if (metaElements.length > 0) {
                    tl.to(metaElements, { opacity: 0.15, y: -10, ease: "none" }, 0);
                }
            }
        }, heroRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={heroRef}
            style={{ backgroundColor: HERO_BG }}
            className="relative w-full h-screen min-h-[650px] flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none overflow-hidden text-zinc-900 border-b border-zinc-200/60"
        >
            {/* ── TOP-RIGHT MANDALA ARTWORK ── */}
            <div className={`absolute ${MANDALA_TOP} ${MANDALA_RIGHT} ${MANDALA_OPACITY} pointer-events-none z-0 overflow-hidden select-none`}>
                <img
                    ref={mandalaRef}
                    src="/mandala.svg"
                    alt="Mandala Art"
                    className={`${MANDALA_SIZE} object-contain block`}
                />
            </div>

            {/* ── CENTRE-LEFT WORDMARK + WHAT IS ── */}
            <div data-hero-wordmark className="w-full flex-1 flex items-center justify-start py-0 relative z-10">
                <div
                    ref={wordmarkRef}
                    className="w-full flex flex-col items-start"
                    style={{ marginTop: WORDMARK_PULL_UP }}
                >
                    {/* "WHAT IF" label in Lexend */}
                    <span
                        style={{
                            fontFamily: WHAT_IS_FONT,
                            fontWeight: WHAT_IS_FONT_WEIGHT,
                            letterSpacing: WHAT_IS_LETTER_SPACING,
                            color: WHAT_IS_COLOR,
                            // Responsive font size via clamp for smooth scaling
                            fontSize: `clamp(${WHAT_IS_SIZE_SM}, 2.5vw, ${WHAT_IS_SIZE_LG})`,
                            lineHeight: 1,
                            marginLeft: WHAT_IS_LEFT_OFFSET,
                        }}
                        className="uppercase -mb-3 sm:-mb-5 md:-mb-6 relative z-10"
                    >
                        WHAT IS
                    </span>

                    {/* EXHIBIT'26 SVG wordmark — left-aligned, large, dominant */}
                    <WordmarkSVG
                        style={{
                            color: WORDMARK_COLOR,
                            maxHeight: `clamp(${WORDMARK_MAX_H_SM}, 7vw, ${WORDMARK_MAX_H_MD})`,
                            marginLeft: WORDMARK_LEFT_OFFSET,
                        }}
                        className="w-full h-auto object-contain"
                    />

                    {/* Animated Underline */}
                    <div
                        ref={lineRef}
                        data-hero-line
                        style={{
                            marginLeft: WORDMARK_LEFT_OFFSET,
                            height: "2px",
                            backgroundColor: SCROLL_COLOR_END,
                            width: "0%",
                            marginTop: "1.5rem", // Gap between SVG and the line
                        }}
                    />
                </div>
            </div>

            {/* ── DESCRIPTION (typewriter effect, scroll-driven) ── */}
            <div
                data-hero-description
                className="absolute inset-0 flex items-center justify-center px-8 sm:px-16 md:px-24 pointer-events-none z-20"
            >
                <p
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight leading-snug tracking-tight text-center flex flex-wrap justify-center gap-x-[0.25em]"
                    style={{ 
                        color: "#18181b", 
                        fontFamily: "'Kumbh Sans', sans-serif", 
                        maxWidth: "900px",
                        textShadow: DESC_TEXT_SHADOW
                    }}
                >
                    {"Exhibit'26 is a project competition where students showcase working prototypes across AI, Climate Tech, HealthTech, and more.".split(" ").map((word, wIdx) => (
                        <span key={wIdx} className="inline-block">
                            {word.split("").map((char, cIdx) => (
                                <span key={cIdx} className="hero-desc-char opacity-0">{char}</span>
                            ))}
                        </span>
                    ))}
                </p>
            </div>

            {/* ── BOTTOM METADATA ROW ── */}
            <div className="w-full flex items-center justify-between z-10 pb-2 sm:pb-4">
                <div
                    ref={metaLeftBottomRef}
                    style={{ fontSize: META_SIZE, letterSpacing: META_LETTER_SPACING, color: META_COLOR }}
                    className="font-mono uppercase font-medium"
                >
                    FIEM
                </div>
                <div
                    ref={metaRightBottomRef}
                    style={{ fontSize: META_SIZE, letterSpacing: META_LETTER_SPACING, color: META_COLOR }}
                    className="font-mono uppercase font-medium flex items-center gap-1.5"
                >
                    <span>SCROLL TO EXPLORE</span>
                    <span className="font-sans">&darr;</span>
                </div>
            </div>
        </section>
    );
}
