import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const milestones = [
  {
    date: "Aug 20, 2026",
    title: "Registrations Open",
    description: "Team sign-ups go live. Form your squad and lock in your spot before slots fill up.",
    status: "completed",
  },
  {
    date: "Sep 5, 2026",
    title: "Abstract Submission",
    description: "Submit a one-page abstract outlining your project idea, tech stack, and intended impact.",
    status: "completed",
  },
  {
    date: "Sep 18, 2026",
    title: "Shortlist Announcement",
    description: "Selected teams will be notified via email. Shortlisted teams advance to the build phase.",
    status: "active",
  },
  {
    date: "Oct 1 – Oct 20, 2026",
    title: "Build Sprint",
    description: "Three-week intensive build period. Mentors assigned. Weekly check-ins and office hours available.",
    status: "upcoming",
  },
  {
    date: "Oct 25, 2026",
    title: "Final Submission",
    description: "Push your working prototype, documentation, and demo video to the submission portal.",
    status: "upcoming",
  },
  {
    date: "Nov 2, 2026",
    title: "On-Site Evaluation & Awards",
    description: "Present your project to the jury panel live. Winners announced the same evening at the grand ceremony.",
    status: "upcoming",
  },
];

const Roadmap = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".roadmap-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".roadmap-header", start: "top 85%" },
        }
      );

      // Animate the vertical timeline track growth
      if (timelineTrackRef.current) {
        gsap.fromTo(
          timelineTrackRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 1.5,
            },
          }
        );
      }

      // Stagger milestone cards
      gsap.utils.toArray<HTMLElement>(".roadmap-milestone").forEach((el, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          el,
          { x: isLeft ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // Timeline dots pulse
      gsap.utils.toArray<HTMLElement>(".roadmap-dot").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return { dot: "bg-[#d4f5e3]", border: "border-[#d4f5e3]/50", text: "text-[#d4f5e3]", badge: "bg-[#d4f5e3]/15 text-[#d4f5e3]" };
      case "active":
        return { dot: "bg-amber-400", border: "border-amber-400/50", text: "text-amber-400", badge: "bg-amber-400/15 text-amber-400" };
      default:
        return { dot: "bg-white/30", border: "border-white/20", text: "text-white/50", badge: "bg-white/10 text-white/50" };
    }
  };

  return (
    <section ref={sectionRef} className="flex flex-col items-start justify-start w-full py-10 px-6 md:px-12 max-w-6xl mx-auto" style={{ fontFamily: "'Google Sans', sans-serif" }}>
      {/* Header */}
      <div className="roadmap-header w-full mb-16">
        <h2 className="text-4xl md:text-5xl text-left m-0">
          <span className="font-bold text-[#fdfbf7]">Event</span>{" "}
          <span className="font-bold italic text-amber-300/90">Roadmap</span>
        </h2>
        <div className="h-[2px] w-full max-w-md bg-gradient-to-r from-amber-300/60 via-amber-300/20 to-transparent mt-4 rounded-full" />
        <p className="text-sm text-white/50 mt-4 max-w-lg leading-relaxed">
          Key milestones from registration to the grand finale. Mark your calendar.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative w-full max-w-3xl mx-auto">
        {/* Vertical track */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-[1px]">
          <div className="w-full h-full bg-white/10 rounded-full" />
          <div ref={timelineTrackRef} className="absolute inset-0 w-full bg-gradient-to-b from-[#d4f5e3]/60 via-amber-300/40 to-white/20 rounded-full" />
        </div>

        {/* Milestones */}
        <div className="flex flex-col gap-12 md:gap-16">
          {milestones.map((milestone, i) => {
            const colors = getStatusColor(milestone.status);
            const isLeft = i % 2 === 0;

            return (
              <div key={i} className={`roadmap-milestone relative flex items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}>
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`roadmap-dot w-4 h-4 rounded-full ${colors.dot} shadow-lg ring-4 ring-black/40`} />
                </div>

                {/* Spacer for mobile */}
                <div className="w-12 md:hidden flex-shrink-0" />

                {/* Card */}
                <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} pl-6 md:pl-0`}>
                  <div className={`group backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:${colors.border} rounded-2xl p-5 md:p-6 transition-all duration-300 shadow-xl`}>
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                      <span className={`text-[11px] uppercase tracking-widest font-mono ${colors.text}`}>
                        {milestone.date}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${colors.badge}`}>
                        {milestone.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-[#fdfbf7] mb-2 group-hover:text-amber-300 transition-colors duration-200">
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Opposite spacer for desktop */}
                <div className="hidden md:block flex-1" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
