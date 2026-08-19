import React from "react";
import FloatingNavbar from "../components/floatingnavbar";

export default function Contents() {
  return (
    <section
      className="relative min-h-screen w-full"
      style={{
        background: `
          /* Bright upper-left green source */
          radial-gradient(
            ellipse 48% 72% at 2% -8%,
            rgba(67, 205, 73, 0.98) 0%,
            rgba(48, 166, 56, 0.90) 12%,
            rgba(29, 105, 36, 0.70) 30%,
            rgba(12, 48, 18, 0.38) 50%,
            transparent 72%
          ),

          /* Diagonal green atmospheric beam */
          linear-gradient(
            122deg,
            rgba(46, 155, 53, 0.72) 0%,
            rgba(30, 103, 36, 0.50) 16%,
            rgba(15, 57, 21, 0.28) 34%,
            rgba(5, 18, 8, 0.08) 52%,
            transparent 70%
          ),

          /* Very subtle central haze */
          radial-gradient(
            ellipse 55% 42% at 42% 12%,
            rgba(22, 83, 29, 0.28) 0%,
            rgba(9, 35, 13, 0.14) 35%,
            transparent 72%
          ),

          /* Extremely subtle right-side atmosphere */
          radial-gradient(
            ellipse 65% 55% at 100% 0%,
            rgba(21, 45, 26, 0.16) 0%,
            rgba(5, 12, 7, 0.08) 40%,
            transparent 75%
          ),

          /* Base */
          #050706
        `,
      }}
    >
      {/* CONTENTS — build from scratch here */}
      <div className="relative z-10 text-white min-h-screen">
        <div className="p-12">
          <h1 className="text-4xl font-bold">Contents Page</h1>
          <p className="mt-4 text-white/70">This is the /contents route.</p>
        </div>
      </div>

      <FloatingNavbar />
    </section>
  );
}
