import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const prizes = [
  {
    tier: "1st",
    title: "Grand Champion",
    amount: "₹50,000",
    perks: ["Championship Trophy", "Incubation Fast-Track", "Internship Offers", "Certificate of Excellence"],
    accent: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.15)",
    ringColor: "rgba(251, 191, 36, 0.4)",
    featured: true,
  },
  {
    tier: "2nd",
    title: "First Runner-Up",
    amount: "₹30,000",
    perks: ["Silver Trophy", "Mentorship Sessions", "Internship Offers", "Certificate of Merit"],
    accent: "#cbd5e1",
    glowColor: "rgba(203, 213, 225, 0.12)",
    ringColor: "rgba(203, 213, 225, 0.3)",
    featured: false,
  },
  {
    tier: "3rd",
    title: "Second Runner-Up",
    amount: "₹20,000",
    perks: ["Bronze Trophy", "Mentorship Sessions", "Goodies Kit", "Certificate of Merit"],
    accent: "#d97706",
    glowColor: "rgba(217, 119, 6, 0.12)",
    ringColor: "rgba(217, 119, 6, 0.3)",
    featured: false,
  },
];

const specialAwards = [
  {
    title: "Best Innovation",
    description: "Most creative and novel approach to problem-solving.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    accent: "#818cf8",
  },
  {
    title: "Best UI/UX",
    description: "Outstanding user interface and experience design.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    accent: "#f472b6",
  },
  {
    title: "People's Choice",
    description: "Voted by fellow participants and the live audience.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904m10.598-9.052a1.5 1.5 0 01.268 2.103c-.39.487-.898.871-1.476 1.112" />
      </svg>
    ),
    accent: "#34d399",
  },
  {
    title: "Best Freshers Team",
    description: "Highest-performing team composed entirely of first-year students.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    accent: "#fb923c",
  },
];

const Prizes = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        ".prizes-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".prizes-header", start: "top 85%" },
        }
      );

      // Prize tier cards
      gsap.utils.toArray<HTMLElement>(".prize-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // Special awards stagger
      gsap.utils.toArray<HTMLElement>(".special-award").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });

      // Amount counter animation
      gsap.utils.toArray<HTMLElement>(".prize-amount").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(2)",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col items-start justify-start w-full py-10 px-6 md:px-12 max-w-6xl mx-auto" style={{ fontFamily: "'Google Sans', sans-serif" }}>
      {/* Header */}
      <div className="prizes-header w-full mb-14">
        <h2 className="text-4xl md:text-5xl text-left m-0">
          <span className="font-bold text-[#fdfbf7]">Prizes &</span>{" "}
          <span className="font-bold italic text-[#fbbf24]">Awards</span>
        </h2>
        <div className="h-[2px] w-full max-w-md bg-gradient-to-r from-[#fbbf24]/60 via-[#fbbf24]/20 to-transparent mt-4 rounded-full" />
        <p className="text-sm text-white/50 mt-4 max-w-lg leading-relaxed">
          Compete for glory, recognition, and rewards that kickstart your journey.
        </p>
      </div>

      {/* Prize Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
        {prizes.map((prize, i) => (
          <div
            key={i}
            className={`prize-card group relative backdrop-blur-xl border rounded-3xl p-7 md:p-8 transition-all duration-400 shadow-xl overflow-hidden flex flex-col items-center text-center ${
              prize.featured
                ? "bg-white/[0.06] border-[#fbbf24]/30 md:scale-105 md:-mt-4 md:mb-4"
                : "bg-white/[0.03] border-white/10"
            }`}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { y: -8, duration: 0.3, ease: "power2.out" });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: "power2.out" });
            }}
          >
            {/* Background glow */}
            <div
              className="absolute -top-28 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              style={{ backgroundColor: prize.glowColor }}
            />

            {/* Tier badge */}
            <div
              className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border-2 text-2xl font-black"
              style={{ borderColor: prize.ringColor, color: prize.accent, backgroundColor: prize.glowColor }}
            >
              {prize.tier}
            </div>

            {/* Title */}
            <h4 className="relative z-10 text-lg font-bold text-[#fdfbf7] mb-1">
              {prize.title}
            </h4>

            {/* Amount */}
            <div
              className="prize-amount relative z-10 text-4xl md:text-5xl font-black my-4"
              style={{ color: prize.accent }}
            >
              {prize.amount}
            </div>

            {/* Perks */}
            <ul className="relative z-10 space-y-2 mt-2 w-full">
              {prize.perks.map((perk, j) => (
                <li key={j} className="flex items-center gap-2.5 text-sm text-white/60">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={prize.accent} className="w-4 h-4 flex-shrink-0 opacity-70">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            {/* Featured ribbon */}
            {prize.featured && (
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#fbbf24]/20 text-[#fbbf24] text-[10px] uppercase tracking-widest font-bold">
                Grand Prize
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Special Awards Section */}
      <div className="w-full">
        <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold mb-6">
          Special Category Awards
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specialAwards.map((award, i) => (
            <div
              key={i}
              className="special-award group backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-2xl p-5 transition-all duration-300 shadow-lg"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: award.accent + "1a", borderColor: award.accent + "33", color: award.accent }}
              >
                {award.icon}
              </div>
              <h4 className="text-sm font-bold text-[#fdfbf7] mb-1 group-hover:text-white transition-colors">
                {award.title}
              </h4>
              <p className="text-xs text-white/45 leading-relaxed">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prizes;
