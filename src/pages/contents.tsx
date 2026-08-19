import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import FloatingNavbar from "../components/floatingnavbar";
import Criteria from "../components/criteria";
import Roadmap from "../components/roadmap";
import Domains from "../components/domains";
import Prizes from "../components/prizes";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Contents() {
  const [activeSection, setActiveSection] = useState("criteria");
  const lenisRef = useRef<Lenis | null>(null);

  // ── Lenis smooth scroll + GSAP integration ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateRaf);
    };
  }, []);

  // ── Scroll spy with IntersectionObserver ──
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll("div[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // ── Section divider GSAP reveals ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate each section divider line
      gsap.utils.toArray<HTMLElement>(".section-divider").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  // ── Click handler for smooth scroll ──
  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80, duration: 1.6 });
    }
  };

  return (
    <>
      <Head>
        <title>Exhibit&apos;26 | Contents</title>
        <meta
          name="description"
          content="Criteria, Roadmap, Domains, and Prizes for Exhibit'26 project competition."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Fixed background layer */}
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          zIndex: -1,
          background: `
            radial-gradient(circle at 10% 5%, rgba(70, 30, 120, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 90% 95%, rgba(20, 100, 85, 0.25) 0%, transparent 55%),
            radial-gradient(circle at 85% 15%, rgba(25, 40, 110, 0.20) 0%, transparent 50%),
            radial-gradient(circle at 15% 85%, rgba(15, 75, 40, 0.20) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(40, 20, 80, 0.12) 0%, transparent 65%),
            #050706
          `,
        }}
      />

      <section className="relative min-h-screen w-full overflow-x-hidden">
        <div className="relative z-10 text-white pt-28 pb-40">

          {/* ── CRITERIA ── */}
          <div id="criteria" data-section className="min-h-screen">
            <Criteria />
          </div>

          {/* Divider */}
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
            <div className="section-divider h-[1px] w-full bg-gradient-to-r from-white/20 via-white/8 to-transparent" />
          </div>

          {/* ── ROADMAP ── */}
          <div id="roadmap" data-section className="min-h-screen">
            <Roadmap />
          </div>

          {/* Divider */}
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
            <div className="section-divider h-[1px] w-full bg-gradient-to-r from-white/20 via-white/8 to-transparent" />
          </div>

          {/* ── DOMAINS ── */}
          <div id="domains" data-section className="min-h-screen">
            <Domains />
          </div>

          {/* Divider */}
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
            <div className="section-divider h-[1px] w-full bg-gradient-to-r from-white/20 via-white/8 to-transparent" />
          </div>

          {/* ── PRIZES ── */}
          <div id="prizes" data-section className="min-h-screen">
            <Prizes />
          </div>

        </div>

        <FloatingNavbar activeSection={activeSection} onNavClick={handleNavClick} />
      </section>
    </>
  );
}
