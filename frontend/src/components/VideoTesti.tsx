"use client";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, Quote } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const videos = [
  {
    title: "Ngone Diop explains the importance of demographic dynamics in West Africa",
    // subtitle: "Video Sub-Title",
    url: "/videos/partner1.mp4",
  },
  {
    title: "CoM 2025 - Interview with Ngone Diop, Director of the sub-regional office for West Africa",
    // subtitle: "Video Sub-Title",
    url: "/videos/partner2.mp4",
  },
  {
    title: "Africa's Future unveiled_ Ngone Diop’s Vision and the UN’s role in transforming It",
    // subtitle: "Video Sub-Title",
    url: "/videos/partner3.mp4",
  },
];


export function VideoTesti() {
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
          vid.currentTime = 0; // restart
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                  {/* <p className="text-[#FFD700] text-sm">{video.subtitle}</p> */}
                </div>
              </div>
            ))}
          </div>
      </div>

      {/* ✅ Animated Video Popup */}
      <AnimatePresence>
        {openVideo && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            onClick={() => setOpenVideo(null)} // overlay click closes
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black rounded-xl relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()} // stop bubbling
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
    )
}