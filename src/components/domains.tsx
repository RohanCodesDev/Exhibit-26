import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const domains = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "Artificial Intelligence",
    description: "Build intelligent systems — from NLP chatbots to computer vision, recommendation engines, and generative AI applications.",
    accent: "#a78bfa",
    accentBg: "rgba(167, 139, 250, 0.12)",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: "Climate Tech",
    description: "Tackle climate change head-on — renewable energy dashboards, carbon footprint trackers, waste management systems, and sustainable tech.",
    accent: "#34d399",
    accentBg: "rgba(52, 211, 153, 0.12)",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "HealthTech",
    description: "Revolutionize healthcare — telemedicine platforms, health analytics, mental wellness apps, wearable device integrations, and diagnostic tools.",
    accent: "#f472b6",
    accentBg: "rgba(244, 114, 182, 0.12)",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "EdTech",
    description: "Transform learning experiences — adaptive learning platforms, gamified education, accessibility tools, and skill-development ecosystems.",
    accent: "#60a5fa",
    accentBg: "rgba(96, 165, 250, 0.12)",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Cybersecurity",
    description: "Defend the digital world — intrusion detection systems, encryption tools, secure authentication, privacy-preserving technologies.",
    accent: "#fb923c",
    accentBg: "rgba(251, 146, 60, 0.12)",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: "Open Innovation",
    description: "Don't fit the above? Build anything that matters — fintech, agritech, social impact, IoT, blockchain, or a wild idea nobody's thought of yet.",
    accent: "#e879f9",
    accentBg: "rgba(232, 121, 249, 0.12)",
  },
];

const Domains = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".domains-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".domains-header", start: "top 85%" },
        }
      );

      // Stagger domain cards from bottom
      gsap.utils.toArray<HTMLElement>(".domain-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col items-start justify-start w-full py-10 px-6 md:px-12 max-w-6xl mx-auto" style={{ fontFamily: "'Google Sans', sans-serif" }}>
      {/* Header */}
      <div className="domains-header w-full mb-14">
        <h2 className="text-4xl md:text-5xl text-left m-0">
          <span className="font-bold text-[#fdfbf7]">Project</span>{" "}
          <span className="font-bold italic text-[#a78bfa]">Domains</span>
        </h2>
        <div className="h-[2px] w-full max-w-md bg-gradient-to-r from-[#a78bfa]/60 via-[#a78bfa]/20 to-transparent mt-4 rounded-full" />
        <p className="text-sm text-white/50 mt-4 max-w-lg leading-relaxed">
          Choose a track that aligns with your passion. Each domain welcomes fresh perspectives and bold ideas.
        </p>
      </div>

      {/* Domain Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {domains.map((domain, i) => (
          <div
            key={i}
            className="domain-card group relative backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-opacity-50 rounded-2xl p-6 md:p-7 transition-all duration-400 shadow-xl cursor-default overflow-hidden"
            style={{ ["--accent" as string]: domain.accent }}
            onMouseEnter={(e) => {
              const card = e.currentTarget;
              gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
            }}
            onMouseLeave={(e) => {
              const card = e.currentTarget;
              gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: domain.accentBg }}
            />

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: domain.accentBg, borderColor: domain.accent + "33", color: domain.accent }}
            >
              {domain.icon}
            </div>

            {/* Content */}
            <h4
              className="text-lg font-bold text-[#fdfbf7] mb-2 transition-colors duration-200"
              style={{ "--hover-color": domain.accent } as React.CSSProperties}
            >
              <span className="group-hover:text-[var(--accent)] transition-colors duration-200">{domain.title}</span>
            </h4>
            <p className="text-sm text-white/50 leading-relaxed">
              {domain.description}
            </p>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ backgroundColor: domain.accent + "66" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Domains;
