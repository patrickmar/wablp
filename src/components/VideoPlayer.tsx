// "use client";

// import React, { useState } from "react";
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
//   thumbnail: string; // just an image
//   className?: string;
// }

// export function VideoPlayer({
//   title,
//   description,
//   thumbnail,
//   className = "",
// }: VideoPlayerProps) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);

//   return (
//     <Card className={`p-4 ${className}`}>
//       <h3 className="text-xl font-bold">{title}</h3>
//       <p className="text-gray-600 mb-4">{description}</p>

//       <div className="relative w-full max-w-2xl mx-auto">
//         <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden">
//           <img
//             src={thumbnail}
//             alt={title}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
//               isPlaying ? "opacity-50" : "opacity-100"
//             }`}
//           />
//         </div>

//         {/* Fake Controls */}
//         <div className="flex justify-center gap-2 mt-3">
//           <Button
//             size="sm"
//             variant="outline"
//             onClick={() => setIsPlaying(!isPlaying)}
//           >
//             {isPlaying ? <Pause size={18} /> : <Play size={18} />}
//           </Button>
//           <Button
//             size="sm"
//             variant="outline"
//             onClick={() => setIsMuted(!isMuted)}
//           >
//             {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
//           </Button>
//           <Button size="sm" variant="outline" onClick={() => setIsPlaying(false)}>
//             <RotateCcw size={18} />
//           </Button>
//           <Button size="sm" variant="outline">
//             <Maximize size={18} />
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// }






"use client";

import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
} from "lucide-react";

interface VideoPlayerProps {
  title: string;
  description: string;
  thumbnail: string;
  src: string; // Video source file
  className?: string;
  isPlaying: boolean;  // Track play state
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
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="relative w-full max-w-2xl mx-auto">
        {/* Video Element */}
        <video
          ref={videoRef}
          src={src}
          poster={thumbnail}
          className="w-full h-auto rounded-lg"
          controls={false} // Disable default controls
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

