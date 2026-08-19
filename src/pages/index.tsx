import React, { useEffect } from "react";
import Head from "next/head";
import SlidingPanel from "./slidingPanel";
import HeroText from "../components/heroText";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize global Lenis smooth scrolling instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

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

  return (
    <>
      <Head>
        <title>Exhibit&apos;26 | Project Competition</title>
        <meta
          name="description"
          content="Exhibit'26 - An exhibition of ideas, innovation and solutions. A sober, professional and highly creative project competition."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SlidingPanel
        heroContent={<HeroText />}
      />
    </>
  );
}
