import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Criteria = () => {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const registrationLink = "https://exhibit26.com/register";

  const handleCopy = () => {
    navigator.clipboard.writeText(registrationLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rules = [
    {
      id: "01",
      title: "Student Eligibility",
      description: "Open to all currently enrolled undergraduate and postgraduate students from any recognized university or discipline."
    },
    {
      id: "02",
      title: "Team Formation",
      description: "Participate individually or form a team of 2 to 4 members. Cross-institutional teams are warmly welcomed."
    },
    {
      id: "03",
      title: "Originality & Ethics",
      description: "All project submissions, designs, and codebases must be original work created specifically for Exhibit '26."
    },
    {
      id: "04",
      title: "On-Site Verification",
      description: "Every participating member must carry a valid physical college ID card during the offline evaluation & presentation round."
    },
    {
      id: "05",
      title: "Code of Conduct",
      description: "Respect fellow builders, mentors, and evaluators. Maintain high standards of professional integrity throughout the event."
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".criteria-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".criteria-header", start: "top 85%" },
        }
      );

      // Underline draw-in
      gsap.fromTo(
        ".criteria-underline",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".criteria-underline", start: "top 85%" },
        }
      );

      // Stagger rule cards
      gsap.utils.toArray<HTMLElement>(".criteria-rule").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });

      // QR card reveal
      gsap.fromTo(
        ".criteria-qr-card",
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".criteria-qr-card", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col items-start justify-start w-full py-10 px-6 md:px-12 max-w-6xl mx-auto" style={{ fontFamily: "'Google Sans', sans-serif" }}>
      {/* Header with Thin Glowing Underline */}
      <div className="criteria-header w-full mb-12">
        <h2 className="text-4xl md:text-5xl text-left m-0">
          <span className="font-bold text-[#fdfbf7]">Who can</span>{" "}
          <span className="font-bold italic text-[#d4f5e3]">Participate?</span>
        </h2>
        <div className="criteria-underline h-[2px] w-full max-w-md bg-gradient-to-r from-[#d4f5e3]/80 via-[#d4f5e3]/30 to-transparent mt-4 rounded-full" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
        {/* Participation Rules */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#d4f5e3]/60 font-semibold mb-2">
            Participation Guidelines
          </h3>
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="criteria-rule group relative backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#d4f5e3]/40 rounded-2xl p-5 md:p-6 transition-all duration-300 shadow-xl flex items-start gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#d4f5e3]/10 border border-[#d4f5e3]/20 flex items-center justify-center text-[#d4f5e3] font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                {rule.id}
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-bold text-[#fdfbf7] mb-1 group-hover:text-[#d4f5e3] transition-colors duration-200">
                  {rule.title}
                </h4>
                <p className="text-sm text-white/60 leading-relaxed font-normal">
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Registration & QR Code Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#d4f5e3]/60 font-semibold mb-2">
            Instant Registration
          </h3>

          <div className="criteria-qr-card backdrop-blur-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center text-center relative overflow-hidden group lg:sticky lg:top-28">
            {/* Ambient glowing orb */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#d4f5e3]/10 rounded-full blur-3xl pointer-events-none" />

            {/* QR Image Frame */}
            <div className="relative mb-6 p-3 bg-black/40 rounded-2xl border border-white/10 shadow-inner group-hover:border-[#d4f5e3]/50 transition-all duration-300">
              <img
                src="/qr_code.jpg"
                alt="Registration QR Code"
                className="w-44 h-44 md:w-52 md:h-52 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 rounded-2xl border border-[#d4f5e3]/20 pointer-events-none" />
            </div>

            <h4 className="text-xl font-bold text-[#fdfbf7] mb-2">
              Scan to Register
            </h4>
            <p className="text-xs text-white/50 mb-6 max-w-xs leading-relaxed">
              Scan with your phone camera or any QR reader to open the official registration form directly.
            </p>

            {/* Registration CTA Button */}
            <a
              href={registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-black bg-[#d4f5e3] hover:bg-[#bbf0d2] transition-all duration-200 shadow-lg shadow-[#d4f5e3]/20 hover:shadow-[#d4f5e3]/40 flex items-center justify-center gap-2 mb-4 group/btn"
            >
              <span>Register Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>

            {/* Direct URL & Copy Button */}
            <div className="w-full flex items-center justify-between bg-black/40 border border-white/10 rounded-xl p-2 px-3 text-xs">
              <span className="truncate max-w-[180px] text-white/50 font-mono">
                {registrationLink}
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#d4f5e3] font-medium transition-colors text-[11px] flex-shrink-0"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Criteria;
