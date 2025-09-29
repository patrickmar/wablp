"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const youtubeVideos = [
  { id: "1vADuHybr10", title: "Ngone Diop explains the importance of demographic dynamics in West Africa" },
  { id: "ULTg6WI6OvE", title: "CoM 2025 - Interview with Ngone Diop, Director of the sub-regional office for West Africa" },
  { id: "Y4LmgesLy0A", title: "Africa's Future unveiled: Ngone Diop’s Vision and the UN’s role in transforming it" },
];

export function VideoTesti() {
  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // ✅ Close with Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenVideo(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="py-5 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {youtubeVideos.map((video) => (
            <div
              key={video.id}
              className="relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group"
              onClick={() => setOpenVideo(video.id)}
              onMouseEnter={() => setHovered(video.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Video / Thumbnail */}
              <div className="w-full h-56">
                {hovered === video.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
                    className="w-full h-full object-cover"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Title */}
              <div className="p-4">
                <h3 className="font-semibold text-[#003366]">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Animated Popup */}
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
              className="bg-black rounded-xl relative w-full max-w-3xl aspect-video"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setOpenVideo(null)}
                className="absolute top-2 right-2 text-white hover:text-gray-300 z-10"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Full YouTube Player */}
              <iframe
                src={`https://www.youtube.com/embed/${openVideo}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
                className="w-full h-full rounded-xl"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


















// "use client";

// import React, { useState } from "react";
// import { X } from "lucide-react";

// const youtubeVideos = [
//   { id: "dQw4w9WgXcQ", title: "Video 1" },
//   { id: "9bZkp7q19f0", title: "Video 2" },
//   { id: "3JZ_D3ELwOQ", title: "Video 3" },
//   { id: "LXb3EKWsInQ", title: "Video 4" },
//   { id: "M7lc1UVf-VE", title: "Video 5" },
//   { id: "ScMzIvxBSi4", title: "Video 6" },
// ];

// export function VideoTesti() {
//   const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

//   return (
//     <>
//       {/* Video Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//         {youtubeVideos.map((video) => (
//           <VideoCard
//             key={video.id}
//             id={video.id}
//             title={video.title}
//             onClick={() => setSelectedVideo(video.id)}
//           />
//         ))}
//       </div>

//       {/* Popup Player */}
//       {selectedVideo && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
//           onClick={() => setSelectedVideo(null)} // click outside closes modal
//         >
//           <div
//             className="relative w-full max-w-4xl aspect-video bg-black rounded-lg shadow-lg"
//             onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
//           >
//             <iframe
//               className="w-full h-full rounded-lg"
//               src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&controls=1&modestbranding=1&rel=0&fs=1`}
//               title="YouTube video player"
//               frameBorder="0"
//               allow="autoplay; encrypted-media"
//               allowFullScreen
//             ></iframe>

//             {/* Close Button */}
//             <button
//               onClick={() => setSelectedVideo(null)}
//               className="absolute -top-10 right-0 text-white hover:text-red-400"
//             >
//               <X size={32} />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// const VideoCard: React.FC<{
//   id: string;
//   title: string;
//   onClick: () => void;
// }> = ({ id, title, onClick }) => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       className="rounded-lg overflow-hidden shadow-md bg-white cursor-pointer"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onClick={onClick}
//     >
//       <div className="aspect-video w-full">
//         {hovered ? (
//           <iframe
//             className="w-full h-full"
//             src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
//             title={title}
//             frameBorder="0"
//             allow="autoplay; encrypted-media"
//             allowFullScreen
//           ></iframe>
//         ) : (
//           <img
//             src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
//             alt={title}
//             className="w-full h-full object-cover"
//           />
//         )}
//       </div>
//       <div className="p-2 text-center">
//         <p className="text-sm font-medium">{title}</p>
//       </div>
//     </div>
//   );
// };











// "use client";

// import { ImageWithFallback } from "./figma/ImageWithFallback";
// import { Star, Quote } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import { X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";


// const videos = [
//   {
//     title: "Ngone Diop explains the importance of demographic dynamics in West Africa",
//     // subtitle: "Video Sub-Title",
//     url: "/videos/partner1.mp4",
//   },
//   {
//     title: "CoM 2025 - Interview with Ngone Diop, Director of the sub-regional office for West Africa",
//     // subtitle: "Video Sub-Title",
//     url: "/videos/partner2.mp4",
//   },
//   {
//     title: "Africa's Future unveiled_ Ngone Diop’s Vision and the UN’s role in transforming It",
//     // subtitle: "Video Sub-Title",
//     url: "/videos/partner3.mp4",
//   },
// ];


// export function VideoTesti() {
//     const [openVideo, setOpenVideo] = useState<string | null>(null);
//       const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    
//         // ✅ Close popup with Escape key
//       useEffect(() => {
//         const handleEsc = (e: KeyboardEvent) => {
//           if (e.key === "Escape") {
//             setOpenVideo(null);
//           }
//         };
//         window.addEventListener("keydown", handleEsc);
//         return () => window.removeEventListener("keydown", handleEsc);
//       }, []);
    
//       // Hover handlers
//       const handleMouseEnter = (index: number) => {
//         const vid = videoRefs.current[index];
//         if (vid) {
//           vid.currentTime = 0; // restart
//           vid.play().catch(() => {});
//         }
//       };
    
//       const handleMouseLeave = (index: number) => {
//         const vid = videoRefs.current[index];
//         if (vid) {
//           vid.pause();
//           vid.currentTime = 0;
//         }
//       };
      
//     return (
//         <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
//       </section>
//     )
// }