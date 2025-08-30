// import { Button } from "./ui/button";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
// import Link from "next/link";
// import { Play } from "lucide-react";

// export function HeroSection() {
//   return (
//     <section className="relative bg-gradient-to-br from-[#005A8C] via-[#0066a3] to-[#005A8C] text-white overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <ImageWithFallback
//           src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
//           alt="Lagos business district aerial view"
//           className="w-full h-full object-cover opacity-30"
//         />
//         <div className="absolute inset-0 bg-[#005A8C] bg-opacity-70"></div>
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute top-20 right-10 w-32 h-32 bg-[#C9A74B] bg-opacity-20 rounded-full animate-pulse hidden lg:block"></div>
//       <div className="absolute bottom-20 left-10 w-24 h-24 bg-[#C9A74B] bg-opacity-15 rounded-full animate-pulse hidden lg:block"></div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div className="text-center lg:text-left">
//             {/* Badge */}
//             <div className="inline-flex items-center bg-[#C9A74B] bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
//               <span className=" font-medium">✨ Trusted by 560+ businesses</span>
//             </div>

//             <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
//               Connecting West African Businesses to 
//               <span className="text-[#C9A74B]"> Opportunities</span>
//             </h1>
            
//             <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
//               Your gateway to visibility, networking, and growth. Join the premier platform for business connections across West Africa.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 mb-8">
//               <Button 
//                 size="lg"
//                 className="bg-[#C9A74B] text-white hover:bg-[#b8964a] px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group" asChild
//               >
//                 <Link href="/sign-up">Join as a Business</Link>
//                 {/* <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" /> */}
//               </Button>
//               <Button 
//                 size="lg"
//                 variant="outline"
//                 className="border-2 border-white text-[#005A8C] hover:bg-white px-8 py-4 text-lg rounded-lg transition-all duration-300"
//               >
//                 <Play className="mr-2 w-5 h-5" />
//                 <Link href="/portal">Explore Opportunities</Link>
//               </Button>
//             </div>

//             {/* Stats */}
//             <div className="flex flex-col sm:flex-row gap-6 text-center sm:text-left">
//               <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-6 py-3">
//                 <div className="text-2xl font-bold text-[#C9A74B]">560+</div>
//                 <div className="text-gray-300 text-sm">Active Members</div>
//               </div>
//               <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-6 py-3">
//                 <div className="text-2xl font-bold text-[#C9A74B]">$50M+</div>
//                 <div className="text-gray-300 text-sm">Deals Facilitated</div>
//               </div>
//               <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-6 py-3">
//                 <div className="text-2xl font-bold text-[#C9A74B]">15+</div>
//                 <div className="text-gray-300 text-sm">Countries</div>
//               </div>
//             </div>
//           </div>

//           {/* Hero Image/Illustration */}
//           <div className="relative hidden lg:block">
//             <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
//               <ImageWithFallback
//                 src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                 alt="Business networking illustration"
//                 className="w-full h-80 object-cover rounded-lg"
//               />
//             </div>
//             {/* Floating cards */}
//             <div className="absolute -top-4 -right-4 bg-[#C9A74B] text-white p-4 rounded-lg shadow-lg">
//               <div className="text-sm font-medium">New Opportunity</div>
//               <div className="text-xs opacity-90">$2.5M Contract</div>
//             </div>
//             <div className="absolute -bottom-4 -left-4 bg-white text-[#005A8C] p-4 rounded-lg shadow-lg">
//               <div className="text-sm font-medium">Member Spotlight</div>
//               <div className="text-xs opacity-70">TechCorp Nigeria</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }





"use client"

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
// Removed: import { VideoPlayer } from "./VideoPlayer";
import { Play, ArrowRight, Users, Globe, TrendingUp, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";

export function HeroSection() {
  // Slider state (ONLY for the video player section replacement)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // Autoplay (every 4s)
  useEffect(() => {
    if (!instanceRef.current || paused) return;
    const id = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);
    return () => clearInterval(id);
  }, [instanceRef, paused]);

  // Resume autoplay 10s after user pauses via dot click
  useEffect(() => {
    if (!paused) return;
    const resumeId = setTimeout(() => setPaused(false), 10000);
    return () => clearTimeout(resumeId);
  }, [paused]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#005A8C] via-[#0066a3] to-[#005A8C] text-white overflow-hidden">
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Lagos business district skyline"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#005A8C] via-transparent to-[#005A8C] opacity-80"></div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A74B] rounded-full opacity-5 animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-white rounded-full opacity-5 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-[#C9A74B] rounded-full opacity-10 animate-bounce delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center bg-[#C9A74B] bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Users className="w-5 h-5 text-[#C9A74B] mr-2" />
              <span className="text-white font-medium">560+ Verified Businesses Connected</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Connecting 
              <span className="text-[#C9A74B]"> West African</span>
              <br />
              Businesses to 
              <span className="text-[#C9A74B]"> Opportunities</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              Your gateway to visibility, networking, and sustainable growth across 15 West African countries. 
              Join the leading business platform transforming how companies connect and collaborate.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg"
                className="bg-[#C9A74B] text-white hover:bg-[#b8964a] px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-xl"
              >
                <Link href="/sign-up">Join as a Business</Link>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-[#005A8C] hover:bg-white hover:text-[#005A8C] px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A74B] mb-1">560+</div>
                <div className="text-sm text-gray-300">Verified Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A74B] mb-1">15</div>
                <div className="text-sm text-gray-300">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A74B] mb-1">$2.8M</div>
                <div className="text-sm text-gray-300">Deals Facilitated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A74B] mb-1">98%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - (Updated) Image Slider replacing VideoPlayer */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#C9A74B] to-white opacity-20 rounded-3xl blur-lg"></div>
              
              {/* Slider (uses images from /public) */}
              <div
                ref={sliderRef}
                className="keen-slider relative z-10 rounded-3xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 h-[400px] w-[650px] mx-auto"
              >
                <div className="keen-slider__slide">
                  <img
                    src="/slide01.jpg"
                    alt="Business connection"
                    // className="w-[500px] h-[500px] object-cover"
                  />
                </div>
                <div className="keen-slider__slide">
                  <img
                    src="/slide02.jpg"
                    alt="Networking event"
                    // className="w-full h-[500px] object-cover"
                  />
                </div>
                <div className="keen-slider__slide">
                  <img
                    src="/slide03.jpg"
                    alt="Growth opportunities"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div className="keen-slider__slide">
                  <img
                    src="/slide04.jpg"
                    alt="Growth opportunities"
                    // className="w-full h-[500px] object-cover"
                  />
                </div>
                <div className="keen-slider__slide">
                  <img
                    src="/slide05.jpg"
                    alt="Growth opportunities"
                    // className="w-full h-[500px] object-cover"
                  />
                </div>
                <div className="keen-slider__slide">
                  <img
                    src="/slide06.jpg"
                    alt="Growth opportunities"
                    // className="w-full h-[500px] object-cover"
                  />
                </div>
                <div className="keen-slider__slide">
                  <img
                    src="/slide07.jpg"
                    alt="Growth opportunities"
                    // className="w-full h-[500px] object-cover"
                  />
                </div>
                <div className="keen-slider__slide">
                  <img
                    src="/slide08.jpg"
                    alt="Growth opportunities"
                    // className="w-full h-[500px] object-cover"
                  />
                </div>
              </div>

              {/* Dots navigation (pause on click, resume after 10s) */}
              {loaded && instanceRef.current && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                  {Array.from({ length: instanceRef.current.track.details.slides.length }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setPaused(true);
                        instanceRef.current?.moveToIdx(idx);
                      }}
                      className={`w-3 h-3 rounded-full ${
                        currentSlide === idx ? "bg-[#C9A74B]" : "bg-white/50 hover:bg-white"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Arrow navigation */}
              {loaded && instanceRef.current && (
                <>
                  <button
                    onClick={() => instanceRef.current?.prev()}
                    className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white/80 text-black p-2 rounded-full shadow-lg hover:bg-white z-20"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => instanceRef.current?.next()}
                    className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white/80 text-black p-2 rounded-full shadow-lg hover:bg-white z-20"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              
              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 z-20">
                <Badge className="bg-green-500 text-white px-3 py-1 text-sm">
                  ● LIVE
                </Badge>
              </div>
              
              <div className="absolute -bottom-4 -right-4 z-20">
                <Badge className="bg-[#C9A74B] text-white px-3 py-1 text-sm">
                  <Shield className="w-3 h-3 mr-1" />
                  Secure Platform
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-[#C9A74B] text-sm mb-2">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-[#C9A74B] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#C9A74B] rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
}












// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
// import { VideoPlayer } from "./VideoPlayer";
// import { Play, ArrowRight, Users, Globe, TrendingUp, Shield,} from "lucide-react";
// import Link from "next/link";

// export function HeroSection() {
//   return (
//     <section className="relative min-h-screen bg-gradient-to-br from-[#005A8C] via-[#0066a3] to-[#005A8C] text-white overflow-hidden">
//       {/* Background Images with Parallax Effect */}
//       <div className="absolute inset-0">
//         <ImageWithFallback
//           src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
//           alt="Lagos business district skyline"
//           className="w-full h-full object-cover opacity-20"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-[#005A8C] via-transparent to-[#005A8C] opacity-80"></div>
//       </div>

//       {/* Floating Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A74B] rounded-full opacity-5 animate-pulse"></div>
//         <div className="absolute bottom-32 right-20 w-96 h-96 bg-white rounded-full opacity-5 animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-[#C9A74B] rounded-full opacity-10 animate-bounce delay-500"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
//           {/* Left Column - Content */}
//           <div className="order-2 lg:order-1">
//             <div className="inline-flex items-center bg-[#C9A74B] bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
//               <Users className="w-5 h-5 text-[#C9A74B] mr-2" />
//               <span className="text-white font-medium">560+ Verified Businesses Connected</span>
//             </div>
            
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
//               Connecting 
//               <span className="text-[#C9A74B]"> West African</span>
//               <br />
//               Businesses to 
//               <span className="text-[#C9A74B]"> Opportunities</span>
//             </h1>
            
//             <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
//               Your gateway to visibility, networking, and sustainable growth across 15 West African countries. 
//               Join the leading business platform transforming how companies connect and collaborate.
//             </p>
            
//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 mb-12">
//               <Button 
//                 size="lg"
//                 className="bg-[#C9A74B] text-white hover:bg-[#b8964a] px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-xl"
//               >
//                 <Link href="/sign-up">Join as a Business</Link>
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </Button>
//               <Button 
//                 size="lg"
//                 variant="outline"
//                 className="border-2 border-white text-[#005A8C] hover:bg-white hover:text-[#005A8C] px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200"
//               >
//                 <Play className="w-5 h-5 mr-2" />
//                 Watch Demo
//               </Button>
//             </div>
            
//             {/* Trust Indicators */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-[#C9A74B] mb-1">560+</div>
//                 <div className="text-sm text-gray-300">Verified Members</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-[#C9A74B] mb-1">15</div>
//                 <div className="text-sm text-gray-300">Countries</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-[#C9A74B] mb-1">$2.8M</div>
//                 <div className="text-sm text-gray-300">Deals Facilitated</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-[#C9A74B] mb-1">98%</div>
//                 <div className="text-sm text-gray-300">Success Rate</div>
//               </div>
//             </div>
//           </div>
          
//           {/* Right Column - Video Player */}
//           <div className="order-1 lg:order-2">
//             <div className="relative">
//               {/* Background decoration */}
//               <div className="absolute -inset-4 bg-gradient-to-r from-[#C9A74B] to-white opacity-20 rounded-3xl blur-lg"></div>
              
//               <VideoPlayer
//                 title="Discover WABLP: Connecting West African Businesses"
//                 description=""
//                 thumbnail="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                 className="relative z-10 transform hover:scale-105 transition-all duration-300"
//               />
              
//               {/* Floating badges */}
//               <div className="absolute -top-4 -left-4 z-20">
//                 <Badge className="bg-green-500 text-white px-3 py-1 text-sm">
//                   ● LIVE
//                 </Badge>
//               </div>
              
//               <div className="absolute -bottom-4 -right-4 z-20">
//                 <Badge className="bg-[#C9A74B] text-white px-3 py-1 text-sm">
//                   <Shield className="w-3 h-3 mr-1" />
//                   Secure Platform
//                 </Badge>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
//           <div className="text-[#C9A74B] text-sm mb-2">Scroll to explore</div>
//           <div className="w-6 h-10 border-2 border-[#C9A74B] rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-[#C9A74B] rounded-full mt-2 animate-bounce"></div>
//           </div>
//         </div>
//       </div>
      
//       {/* Bottom wave decoration */}
//       <div className="absolute bottom-0 left-0 w-full">
//         <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
//           <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
//           <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
//           <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
//         </svg>
//       </div>
//     </section>
//   );
// }