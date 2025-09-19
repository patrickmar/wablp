"use client";
import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const videos = [
  {
    title: "Boosting Intra-African Trade: AfCFTA Launches Digital Innovation Challenge",
    url: "/videos/news1.mp4",
  },
  {
    title: "AfCFTA Empowers African Innovators with New E-commerce Initiative",
    url: "/videos/news2.mp4",
  },
  {
    title: "Video Title 3",
    url: "/videos/news2.mp4",
  },
];

const relatedArticles = [
  {
    title: "ECA supports Guinea in boosting trade in services (2 June 2025)",
    url: "https://www.uneca.org/stories/the-eca-supports-guinea-in-boosting-trade-in-services",
    image: "/Guinea.jpg",
  },
  {
    title: "Cotonou hosts WSIS+20 Africa Summit: Reflecting on two decades of digital transformation (14 May 2025)",
    url: "https://www.uneca.org/stories/cotonou-hosts-wsis%2B20-africa-summit-reflecting-on-two-decades-of-digital-transformation",
    image: "/Cotonou Benin.jpg",
  },
  {
    title: "Togo advances integrating demographic dividend-sensitive budgeting into the 2026 budget cycle (21 March 2025)",
    url: "https://www.uneca.org/stories/togo-advances-commitment-to-integrating-demographic-dividend-sensitive-budgeting-into-the",
    image: "Lome Togo .jpg",
  },
  {
    title: "Côte d’Ivoire: Strengthening the migration–development nexus(14 January 2025, Abidjan)",
    url: "https://www.uneca.org/stories/in-abidjan%2C-eca-supports-c%C3%B4te-d%E2%80%99ivoire%27s-efforts-to-strengthen-the-migration-development",
    image: "/image.jpg",
  },
  {
    title: "ICSOE 2024 (Rabat): Digital transformation & AfCFTA economic diversification (20 November 2024)",
    url: "https://www.uneca.org/stories/eca-must-continue-to-support-our-countries-in-facing-afcfta-implementation-challenges-, ",
    image: "/images/article5.jpg",
  },
  {
    title: "Ghana champions labour migration & economic integration (18 September 2024, Accra)",
    url: "https://www.uneca.org/stories/ghana-champions-labour-migration-and-economic-integration-at-national-consultation-workshop",
    image: "/accra-ghana-19sept.png",
  },
  {
    title: "12th CCDA in Abidjan: Call for innovative climate adaptation financing (3–4 September 2024)",
    url: "https://www.uneca.org/stories/12th-ccda-calls-for-urgent-innovative-financing-to-support-climate-adaptation-and-resilient",
    image: "/Abidjan Cote .jpg",
  },
  {
    title: "Burkina Faso operationalizes demographic dividend-sensitive budgeting (BSDD) (29 August 2024)",
    url: "https://www.uneca.org/stories/advancing-the-operationalization-and-institutionalization-of-the-demographic-dividend",
    image: "/Burkina Faso.jpg",
  },
  {
    title: "Togo commits to demographic dividend & gender-sensitive budgeting (19–20 July 2024)",
    url: "https://www.uneca.org/stories/togo-is-committed-to-integrating-demographic-dividend-and-gender-sensitive-budgeting-into",
    image: "/images/article9.jpg",
  },
  {
    title: "Niger includes demographic dividend in budget (20 June 2024)",
    url: "https://www.uneca.org/stories/niger-sets-course-to-include-demographic-dividend-in-budget",
    image: "/Niger.jpg",
  },
  {
    title: "Regional meeting of West African IGOs: Accelerating integration & sustainable development (19 June 2024)",
    url: "https://www.uneca.org/stories/regional-meeting-of-west-african-igos-accelerating-regional-integration-and-sustainable",
    image: "/Regional meeting_OIGs_Abidjan.jpg",
  },
  {
    title: "AfCFTA best practices framework for West & North Africa (21 May 2024, Lomé)",
    url: "https://www.uneca.org/stories/towards-the-establishment-of-a-framework-for-sharing-best-practices-for-the-implementation",
    image: "/AfCFTA in West and North Africa.jpg",
  },
  {
    title: "Framework for green economy transition in West African countries (8 February 2024, Niamey)",
    url: "https://www.uneca.org/stories/identifying-west-african-countries%E2%80%99-challenges%2C-imperatives%2C-and-financial-opportunities-to",
    image: "/images/article13.jpg",
  },
  {
    title: "North & West Africa workshop: Renewable energy, food security (1 November 2023, Accra)",
    url: "https://www.uneca.org/eca-events/egm-na-wa-energy-food-security-2023",
    image: "/North and West Africa.jpg",
  },
  {
    title: "3rd NTA-Africa Conference on demographic dividend (6–8 September 2023, Somone, Senegal)",
    url: "https://www.uneca.org/eca-events/3rd-edition-nta-national-transfer-accounts-africa-conference",
    image: "/nta-africa_800x600.jpg",
  },
];

export default function NewsSection() {
  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // ✅ Close popup with Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenVideo(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Hover handlers
  const handleMouseEnter = (index: number) => {
    const vid = videoRefs.current[index];
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
  };

  const handleMouseLeave = (index: number) => {
    const vid = videoRefs.current[index];
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#003366] mb-4">NEWS</h2>
        </div>

        {/* Grid: Videos (left) + Related Articles (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Videos */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group"
                onClick={() => setOpenVideo(video.url)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Video always visible */}
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={video.url}
                  muted
                  loop
                  playsInline
                  className="w-full h-56 object-cover"
                />

                {/* Text overlay */}
                <div className="p-4">
                  <h3 className="font-semibold text-[#003366]">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Related Articles */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-semibold text-[#003366] mb-6">
              Other News
            </h3>
            <ul className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {relatedArticles.map((article, idx) => (
                <li
                  key={idx}
                  className="flex items-center space-x-4 bg-white rounded-lg shadow-sm p-2 hover:shadow-md transition"
                >
                  {/* Thumbnail */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-20 h-16 object-cover rounded-md flex-shrink-0"
                  />

                  {/* Title */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm leading-snug"
                  >
                    {article.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ✅ Animated Video Popup */}
      <AnimatePresence>
        {openVideo && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            onClick={() => setOpenVideo(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black rounded-xl relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close button */}
              <button
                onClick={() => setOpenVideo(null)}
                className="absolute top-2 right-2 text-white hover:text-gray-300 z-10"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Full Video Player */}
              <video
                src={openVideo}
                controls
                autoPlay
                className="w-full h-[400px] rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}










// "use client";
// import { useState, useRef, useEffect } from "react";
// import { X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const videos = [
//   {
//     title: "Boosting Intra-African Trade: AfCFTA Launches Digital Innovation Challenge",
//     // subtitle: "Video Sub-Title",
//     url: "/videos/news1.mp4",
//   },
//   {
//     title: "AfCFTA Empowers African Innovators with New E-commerce Initiative",
//     // subtitle: "Video Sub-Title",
//     url: "/videos/news2.mp4",
//   },
//   {
//     title: "Video Title 3",
//     // subtitle: "Video Sub-Title",
//     url: "/videos/news2.mp4",
//   },
// ];

// const relatedArticles = [
//   {
//     title: "ECA supports Guinea in boosting trade in services (2 June 2025)",
//     url: "https://www.uneca.org/stories/the-eca-supports-guinea-in-boosting-trade-in-services",
//   },
//   {
//     title: "Cotonou hosts WSIS+20 Africa Summit: Reflecting on two decades of digital transformation (14 May 2025)",
//     url: "https://www.uneca.org/stories/cotonou-hosts-wsis%2B20-africa-summit-reflecting-on-two-decades-of-digital-transformation",
//   },
//   {
//     title: "Togo advances integrating demographic dividend-sensitive budgeting into the 2026 budget cycle (21 March 2025)",
//     url: "https://www.uneca.org/stories/togo-advances-commitment-to-integrating-demographic-dividend-sensitive-budgeting-into-the",
//   },
//   {
//     title: "Côte d’Ivoire: Strengthening the migration–development nexus(14 January 2025, Abidjan)",
//     url: "https://www.uneca.org/stories/in-abidjan%2C-eca-supports-c%C3%B4te-d%E2%80%99ivoire%27s-efforts-to-strengthen-the-migration-development",
//   },
//   {
//     title: "ICSOE 2024 (Rabat): Digital transformation & AfCFTA economic diversification (20 November 2024)",
//     url: "https://www.uneca.org/stories/eca-must-continue-to-support-our-countries-in-facing-afcfta-implementation-challenges-, ",
//   },
//   {
//     title: "Ghana champions labour migration & economic integration (18 September 2024, Accra)",
//     url: "https://www.uneca.org/stories/ghana-champions-labour-migration-and-economic-integration-at-national-consultation-workshop",
//   },
//   {
//     title: "12th CCDA in Abidjan: Call for innovative climate adaptation financing (3–4 September 2024)",
//     url: "https://www.uneca.org/stories/12th-ccda-calls-for-urgent-innovative-financing-to-support-climate-adaptation-and-resilient",
//   },
//   {
//     title: "Burkina Faso operationalizes demographic dividend-sensitive budgeting (BSDD) (29 August 2024)",
//     url: "https://www.uneca.org/stories/advancing-the-operationalization-and-institutionalization-of-the-demographic-dividend",
//   },
//   {
//     title: "Togo commits to demographic dividend & gender-sensitive budgeting (19–20 July 2024)",
//     url: "https://www.uneca.org/stories/togo-is-committed-to-integrating-demographic-dividend-and-gender-sensitive-budgeting-into",
//   },
//   {
//     title: "Niger includes demographic dividend in budget (20 June 2024)",
//     url: "https://www.uneca.org/stories/niger-sets-course-to-include-demographic-dividend-in-budget",
//   },
//   {
//     title: "Regional meeting of West African IGOs: Accelerating integration & sustainable development (19 June 2024)",
//     url: "https://www.uneca.org/stories/regional-meeting-of-west-african-igos-accelerating-regional-integration-and-sustainable",
//   },
//   {
//     title: "AfCFTA best practices framework for West & North Africa (21 May 2024, Lomé)",
//     url: "https://www.uneca.org/stories/towards-the-establishment-of-a-framework-for-sharing-best-practices-for-the-implementation",
//   },
//   {
//     title: "Framework for green economy transition in West African countries (8 February 2024, Niamey)",
//     url: "https://www.uneca.org/stories/identifying-west-african-countries%E2%80%99-challenges%2C-imperatives%2C-and-financial-opportunities-to",
//   },
//   {
//     title: "North & West Africa workshop: Renewable energy, food security (1 November 2023, Accra)",
//     url: "https://www.uneca.org/eca-events/egm-na-wa-energy-food-security-2023",
//   },
//   {
//     title: "3rd NTA-Africa Conference on demographic dividend (6–8 September 2023, Somone, Senegal)",
//     url: "https://www.uneca.org/eca-events/3rd-edition-nta-national-transfer-accounts-africa-conference",
//   },
  
// ];

// export default function NewsSection() {
//   const [openVideo, setOpenVideo] = useState<string | null>(null);
//   const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

//   // ✅ Close popup with Escape key
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setOpenVideo(null);
//       }
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, []);

//   // Hover handlers
//   const handleMouseEnter = (index: number) => {
//     const vid = videoRefs.current[index];
//     if (vid) {
//       vid.currentTime = 0; // restart
//       vid.play().catch(() => {});
//     }
//   };

//   const handleMouseLeave = (index: number) => {
//     const vid = videoRefs.current[index];
//     if (vid) {
//       vid.pause();
//       vid.currentTime = 0;
//     }
//   };

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Title */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl text-[#003366] mb-4">NEWS</h2>
//         </div>

//         {/* Grid: Videos (left) + Related Articles (right) */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left: Videos */}
//           <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
//             {videos.map((video, index) => (
//               <div
//                 key={index}
//                 className="relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group"
//                 onClick={() => setOpenVideo(video.url)}
//                 onMouseEnter={() => handleMouseEnter(index)}
//                 onMouseLeave={() => handleMouseLeave(index)}
//               >
//                 {/* Video always visible */}
//                 <video
//                   ref={(el) => {
//                     videoRefs.current[index] = el;
//                   }}
//                   src={video.url}
//                   muted
//                   loop
//                   playsInline
//                   className="w-full h-56 object-cover"
//                 />

//                 {/* Text overlay */}
//                 <div className="p-4">
//                   <h3 className="font-semibold text-[#003366]">
//                     {video.title}
//                   </h3>
//                   {/* <p className="text-[#FFD700] text-sm">{video.subtitle}</p> */}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right: Related Articles */}
//           <div className="lg:col-span-1">
//             <h3 className="text-2xl font-semibold text-[#003366] mb-6">
//               Other News
//             </h3>
//             <ul className="space-y-4">
//               {relatedArticles.map((article, idx) => (
//                 <li key={idx}>
//                   <a
//                     href={article.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:underline"
//                   >
//                     {article.title}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Animated Video Popup */}
//       <AnimatePresence>
//         {openVideo && (
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
//             onClick={() => setOpenVideo(null)} // overlay click closes
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-black rounded-xl relative w-full max-w-3xl"
//               onClick={(e) => e.stopPropagation()} // stop bubbling
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               {/* Close button */}
//               <button
//                 onClick={() => setOpenVideo(null)}
//                 className="absolute top-2 right-2 text-white hover:text-gray-300 z-10"
//               >
//                 <X className="w-8 h-8" />
//               </button>

//               {/* Full Video Player */}
//               <video
//                 src={openVideo}
//                 controls
//                 autoPlay
//                 className="w-full h-[400px] rounded-xl"
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }