// import { useState, useRef } from "react";
// import { Button } from "./ui/button";
// import { Card } from "./ui/card";
// import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react";

// interface VideoPlayerProps {
//   title: string;
//   description: string;
//   thumbnail: string;
//   className?: string;
// }

// export function VideoPlayer({ title, description, thumbnail, className = "" }: VideoPlayerProps) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [showControls, setShowControls] = useState(true);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const toggleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleVideoEnd = () => {
//     setIsPlaying(false);
//   };

//   return (
//     <Card className={`overflow-hidden shadow-2xl bg-white ${className}`}>
//       <div 
//         className="relative group cursor-pointer"
//         onMouseEnter={() => setShowControls(true)}
//         onMouseLeave={() => setShowControls(isPlaying)}
//       >
//         {/* Video Element - Using a placeholder since we can't embed actual video files */}
//         <div className="relative aspect-video bg-gray-900 overflow-hidden">
//           {!isPlaying ? (
//             // Thumbnail/Poster
//             <div 
//               className="absolute inset-0 bg-cover bg-center"
//               style={{
//                 backgroundImage: `url(${thumbnail})`
//               }}
//             >
//               <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//                 <Button
//                   onClick={togglePlay}
//                   className="w-20 h-20 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 text-[#005A8C] hover:text-[#004a73] transition-all duration-300 transform hover:scale-110"
//                 >
//                   <Play className="w-8 h-8 ml-1" />
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             // Video Playing State (simulated with image and animation)
//             <div className="relative">
//               <div 
//                 className="absolute inset-0 bg-cover bg-center opacity-80"
//                 style={{
//                   backgroundImage: `url(${thumbnail})`
//                 }}
//               >
//                 {/* Animated overlay to simulate video playback */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white via-transparent animate-pulse opacity-20"></div>
//               </div>
              
//               {/* Simulated video progress */}
//               <div className="absolute bottom-0 left-0 h-1 bg-[#C9A74B] animate-pulse" style={{ width: '35%' }}></div>
//             </div>
//           )}
          
//           {/* Video Controls Overlay */}
//           <div className={`absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
//             {/* Top Controls */}
//             <div className="absolute top-4 right-4 flex space-x-2">
//               <Button
//                 size="sm"
//                 variant="secondary"
//                 className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
//                 onClick={() => setIsPlaying(false)}
//               >
//                 <RotateCcw className="w-4 h-4" />
//               </Button>
//               <Button
//                 size="sm"
//                 variant="secondary"
//                 className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
//               >
//                 <Maximize className="w-4 h-4" />
//               </Button>
//             </div>
            
//             {/* Bottom Controls */}
//             <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <Button
//                   size="sm"
//                   variant="secondary"
//                   className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
//                   onClick={togglePlay}
//                 >
//                   {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                 </Button>
                
//                 <Button
//                   size="sm"
//                   variant="secondary"
//                   className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
//                   onClick={toggleMute}
//                 >
//                   {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
//                 </Button>
                
//                 <span className="text-white text-sm font-medium">
//                   {isPlaying ? "1:35 / 3:42" : "0:00 / 3:42"}
//                 </span>
//               </div>
              
//               <div className="text-white text-sm">
//                 HD
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Video Info */}
//         <div className="p-6">
//           <h3 className="text-xl font-semibold text-[#005A8C] mb-2">{title}</h3>
//           <p className="text-gray-600 leading-relaxed">{description}</p>
          
//           <div className="flex items-center justify-between mt-4">
//             <div className="flex items-center space-x-4 text-sm text-gray-500">
//               <span>3:42 duration</span>
//               <span>•</span>
//               <span>HD Quality</span>
//               <span>•</span>
//               <span>12,547 views</span>
//             </div>
            
//             <Button 
//               variant="outline" 
//               size="sm"
//               className="border-[#005A8C] text-[#005A8C] hover:bg-[#005A8C] hover:text-white"
//             >
//               Share Video
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }





// VIDEO CODE 01

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
//   src: string; // ✅ Required for real video playback
//   className?: string;
// }

// export function VideoPlayer({
//   title,
//   description,
//   thumbnail,
//   src,
//   className = "",
// }: VideoPlayerProps) {
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);

//   const handlePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleReplay = () => {
//     if (videoRef.current) {
//       videoRef.current.currentTime = 0;
//       videoRef.current.play();
//       setIsPlaying(true);
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
//         <video
//           ref={videoRef}
//           src={src}
//           poster={thumbnail}
//           className="w-full h-auto rounded-lg"
//           controls={false}
//         />

//         {/* Controls */}
//         <div className="flex justify-center gap-2 mt-3">
//           <Button size="sm" variant="outline" onClick={handlePlayPause}>
//             {isPlaying ? <Pause size={18} /> : <Play size={18} />}
//           </Button>
//           <Button size="sm" variant="outline" onClick={handleMute}>
//             {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
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







// vIDEO CODE 02

"use client";

import React, { useState } from "react";
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
  thumbnail: string; // just an image
  className?: string;
}

export function VideoPlayer({
  title,
  description,
  thumbnail,
  className = "",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <Card className={`p-4 ${className}`}>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="relative w-full max-w-2xl mx-auto">
        <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isPlaying ? "opacity-50" : "opacity-100"
            }`}
          />
        </div>

        {/* Fake Controls */}
        <div className="flex justify-center gap-2 mt-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </Button>
          <Button size="sm" variant="outline" onClick={() => setIsPlaying(false)}>
            <RotateCcw size={18} />
          </Button>
          <Button size="sm" variant="outline">
            <Maximize size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
