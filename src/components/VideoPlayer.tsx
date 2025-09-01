// "use client";

// import React, { useState, useRef } from "react";
// import { Button } from "./ui/button";
// import { Card } from "./ui/card";
// import {
//   Play,
//   Pause,
//   Volume2,
//   VolumeX,
//   Maximize,
//   RotateCcw,
// } from "lucide-react";

// interface VideoPlayerProps {
//   title: string;
//   description: string;
//   thumbnail: string;
//   src: string; // Video source file
//   className?: string;
//   isPlaying: boolean;  // Track play state
//   onPlay: () => void;   // Trigger on play
//   onPause: () => void;  // Trigger on pause
// }

// export function VideoPlayer({
//   title,
//   description,
//   thumbnail,
//   src,
//   className = "",
//   isPlaying,
//   onPlay,
//   onPause,
// }: VideoPlayerProps) {
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   const handlePlayPause = () => {
//     if (isPlaying) {
//       videoRef.current?.pause();
//       onPause();
//     } else {
//       videoRef.current?.play();
//       onPlay();
//     }
//   };

//   const handleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !videoRef.current.muted;
//     }
//   };

//   const handleReplay = () => {
//     if (videoRef.current) {
//       videoRef.current.currentTime = 0;
//       videoRef.current.play();
//       onPlay();
//     }
//   };

//   const handleFullscreen = () => {
//     if (videoRef.current) {
//       if (videoRef.current.requestFullscreen) {
//         videoRef.current.requestFullscreen();
//       }
//     }
//   };

//   return (
//     <Card className={`p-4 ${className}`}>
//       <h3 className="text-xl font-bold">{title}</h3>
//       <p className="text-gray-600 mb-4">{description}</p>

//       <div className="relative w-full max-w-2xl mx-auto">
//         {/* Video Element */}
//         <video
//           ref={videoRef}
//           src={src}
//           poster={thumbnail}
//           className="w-full h-auto rounded-lg"
//           controls={true} // Disable default controls
//         />

//         {/* Controls */}
//         <div className="flex justify-center gap-2 mt-3">
//           <Button size="sm" variant="outline" onClick={handlePlayPause}>
//             {isPlaying ? <Pause size={18} /> : <Play size={18} />}
//           </Button>
//           <Button size="sm" variant="outline" onClick={handleMute}>
//             <Volume2 size={18} />
//           </Button>
//           <Button size="sm" variant="outline" onClick={handleReplay}>
//             <RotateCcw size={18} />
//           </Button>
//           <Button size="sm" variant="outline" onClick={handleFullscreen}>
//             <Maximize size={18} />
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// }







"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  RotateCcw,
} from "lucide-react";

interface VideoPlayerProps {
  title: string;
  description: string;
  thumbnail: string;
  src: string; // Video source file
  className?: string;
  isPlaying: boolean;  // Controlled by parent
  onPlay: () => void;   // Trigger on play
  onPause: () => void;  // Trigger on pause
}

export function VideoPlayer({
  title,
  description,
  thumbnail,
  src,
  className = "",
  isPlaying,
  onPlay,
  onPause,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // ✅ Auto play/pause when `isPlaying` or `src` changes
  useEffect(() => {
    if (videoRef.current) {
      // Reset video when switching
      videoRef.current.pause();
      videoRef.current.currentTime = 0;

      videoRef.current.load(); // reload with new source

      if (isPlaying) {
        videoRef.current.play().catch(() => {
          /* autoplay might be blocked */
        });
      }
    }
  }, [isPlaying, src]);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      onPause();
    } else {
      videoRef.current?.play();
      onPlay();
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      onPlay();
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <Card className={`p-4 ${className}`}>
      <h3 className="text-xl font-bold">{title}</h3>
      {description && <p className="text-gray-600 mb-4">{description}</p>}

      <div className="relative w-full max-w-2xl mx-auto">
        {/* Video Element */}
        <video
          ref={videoRef}
          key={src} // 🔑 force re-render when src changes
          src={src}
          poster={thumbnail}
          className="w-full h-auto rounded-lg"
          controls={true}
        />

        {/* Controls */}
        <div className="flex justify-center gap-2 mt-3">
          <Button size="sm" variant="outline" onClick={handlePlayPause}>
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </Button>
          <Button size="sm" variant="outline" onClick={handleMute}>
            <Volume2 size={18} />
          </Button>
          <Button size="sm" variant="outline" onClick={handleReplay}>
            <RotateCcw size={18} />
          </Button>
          <Button size="sm" variant="outline" onClick={handleFullscreen}>
            <Maximize size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
}


