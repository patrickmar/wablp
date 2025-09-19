"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * NewsMarquee
 * - Displays static "UNECA UPDATE" label + scrolling news
 * - Smooth infinite horizontal scroll
 */
export default function NewsMarquee({
  className = "",
  speed = 40,
}: {
  className?: string;
  speed?: number;
}) {
  // ✅ Static news items (with optional links)
  const [items] = useState([
    {
      id: 1,
      title:
        "🚀 ECA supports Guinea in boosting trade in services (2 June 2025)",
      link: "/news",
    },
    {
      id: 2,
      title: "📢 Niger includes demographic dividend in budget (20 June 2024).",
      link: "/news",
    },
    {
      id: 3,
      title:
        "💼 AfCFTA best practices framework for West & North Africa (21 May 2024, Lomé).",
      link: "/news",
    },
    {
      id: 4,
      title:
        "🌍 Togo commits to demographic dividend & gender-sensitive budgeting (19–20 July 2024).",
      link: "/news",
    },
  ]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  // Duplicate items so animation is seamless
  const displayItems = [...items, ...items];

  // compute animation duration based on content width
  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    inner.style.animation = "none";
    const id = window.setTimeout(() => {
      const innerWidth = inner.scrollWidth / 2; // half (original)
      const dur = innerWidth / Math.max(1, speed);
      inner.style.setProperty("--marquee-duration", `${dur}s`);
      inner.style.animation =
        "marquee-scroll var(--marquee-duration) linear infinite";
    }, 20);

    return () => clearTimeout(id);
  }, [items, speed]);

  return (
    <div
      className={`w-full flex items-center bg-slate-50 border rounded-md overflow-hidden ${className}`}
      aria-label="Latest news"
      role="region"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style jsx>{`
        .marquee-clip {
          white-space: nowrap;
          flex: 1; /* fills remaining space */
          overflow: hidden;
        }
        .marquee-inner {
          display: inline-block;
          will-change: transform;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-inner[data-paused="true"] {
          animation-play-state: paused !important;
        }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-right: 1px solid rgba(0, 0, 0, 0.05);
          font-size: 0.95rem;
          color: #0f172a;
        }
        .read-more {
          font-size: 0.8rem;
          color: #2563eb;
          text-decoration: underline;
          white-space: nowrap;
        }
        .read-more:hover {
          color: #1e40af;
        }
        .static-label {
          background: #facc15; /* yellow */
          color: #000;
          font-weight: bold;
          padding: 0.5rem 1rem;
          white-space: nowrap;
          border-right: 1px solid rgba(0, 0, 0, 0.2);
          flex-shrink: 0; /* prevents shrinking */
        }
      `}</style>

      {/* Static UNECA UPDATE label */}
      <div className="static-label">UNECA UPDATE</div>

      {/* Marquee content */}
      <div ref={containerRef} className="marquee-clip">
        <div
          ref={innerRef}
          className="marquee-inner"
          data-paused={paused ? "true" : "false"}
          style={{
            display: "inline-block",
            animationTimingFunction: "linear",
          }}
        >
          {displayItems.map((it, idx) => (
            <div key={`${it.id}-${idx}`} className="marquee-item">
              <strong>●</strong> {it.title}
              <Link href={it.link} className="read-more">
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}












// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Link from "next/link";

// /**
//  * NewsMarquee
//  * - Displays static news headlines with a "Read more" link
//  * - Smooth infinite horizontal scroll
//  */
// export default function NewsMarquee({
//   className = "",
//   speed = 40,
// }: {
//   className?: string;
//   speed?: number;
// }) {
//   // ✅ Static news items (with optional links)
//   const [items] = useState([
//     { id: 1, title: "🚀 ECA supports Guinea in boosting trade in services (2 June 2025)", link: "/news" },
//     { id: 2, title: "📢 Niger includes demographic dividend in budget (20 June 2024).", link: "/news" },
//     { id: 3, title: "💼 AfCFTA best practices framework for West & North Africa (21 May 2024, Lomé).", link: "/news" },
//     { id: 4, title: "🌍 Togo commits to demographic dividend & gender-sensitive budgeting (19–20 July 2024).", link: "/news" },
//   ]);

//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const innerRef = useRef<HTMLDivElement | null>(null);
//   const [paused, setPaused] = useState(false);

//   // Duplicate items so animation is seamless
//   const displayItems = [...items, ...items];

//   // compute animation duration based on content width
//   useEffect(() => {
//     const container = containerRef.current;
//     const inner = innerRef.current;
//     if (!container || !inner) return;

//     inner.style.animation = "none";
//     const id = window.setTimeout(() => {
//       const innerWidth = inner.scrollWidth / 2; // half (original)
//       const dur = innerWidth / Math.max(1, speed);
//       inner.style.setProperty("--marquee-duration", `${dur}s`);
//       inner.style.animation =
//         "marquee-scroll var(--marquee-duration) linear infinite";
//     }, 20);

//     return () => clearTimeout(id);
//   }, [items, speed]);

//   return (
//     <div
//       className={`w-full overflow-hidden bg-slate-50 border rounded-md ${className}`}
//       aria-label="Latest news"
//       role="region"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       <style jsx>{`
//         .marquee-clip {
//           white-space: nowrap;
//         }
//         .marquee-inner {
//           display: inline-block;
//           will-change: transform;
//         }
//         @keyframes marquee-scroll {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//         .marquee-inner[data-paused="true"] {
//           animation-play-state: paused !important;
//         }
//         .marquee-item {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.5rem 1rem;
//           border-right: 1px solid rgba(0, 0, 0, 0.05);
//           font-size: 0.95rem;
//           color: #0f172a;
//         }
//         .read-more {
//           font-size: 0.8rem;
//           color: #2563eb;
//           text-decoration: underline;
//           white-space: nowrap;
//         }
//         .read-more:hover {
//           color: #1e40af;
//         }
//       `}</style>

//       <div ref={containerRef} className="marquee-clip">
//         <div
//           ref={innerRef}
//           className="marquee-inner"
//           data-paused={paused ? "true" : "false"}
//           style={{
//             display: "inline-block",
//             animationTimingFunction: "linear",
//           }}
//         >
//           {displayItems.map((it, idx) => (
//             <div key={`${it.id}-${idx}`} className="marquee-item">
//               <strong>●</strong> {it.title}
//               <Link href={it.link} className="read-more">
//                 Read more →
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
