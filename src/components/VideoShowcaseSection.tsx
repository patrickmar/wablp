"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { VideoPlayer } from "./VideoPlayer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Play, 
  Users, 
  Star, 
  Quote,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Globe
} from "lucide-react";

// Updated the video object to include the file path for local videos
const videos = [
  {
    id: 1,
    title: "Benefits of Registering on WABLP",
    description: "",
    thumbnail: "/images/wablp-thumbnail.jpg",  // Local image file for thumbnail
    videoFile: "ghana02.mp4",  // Local video file
    duration: "3:42",
    category: "Success Story"
  },
  {
    id: 2,
    title: "Success Story",
    description: "",
    thumbnail: "/images/technova-thumbnail.jpg",  // Local image file for thumbnail
    videoFile: "ivory01.mp4",  // Local video file
    duration: "2:18",
    category: "Success Story"
  },
  {
    id: 3,
    title: "Success Story",
    description: "",
    thumbnail: "/images/security-thumbnail.jpg",  // Local image file for thumbnail
    videoFile: "ghana01.mp4",  // Local video file
    duration: "2:54",
    category: "Success Story"
  },
  {
    id: 4,
    title: "Success Story",
    description: "",
    thumbnail: "/images/security-thumbnail.jpg",  // Local image file for thumbnail
    videoFile: "senegal01.mp4",  // Local video file
    duration: "2:54",
    category: "Success Story"
  }
];

const testimonials = [
  {
    name: "Kwame Asante",
    company: "GreenHarvest Ltd",
    location: "Accra, Ghana",
    quote: "WABLP helped us find reliable suppliers across West Africa. Our supply chain is now 40% more efficient.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    rating: 5,
    growth: "+40% efficiency"
  },
  {
    name: "Fatou Diallo",
    company: "AfricaBuild Corp",
    location: "Abidjan, Côte d'Ivoire",
    quote: "The platform's security features gave us confidence to expand into new markets. We've completed over $2M in deals.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b012d7c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    rating: 5,
    growth: "$2M+ deals"
  },
  {
    name: "Ibrahim Sall",
    company: "WestPay Financial",
    location: "Dakar, Senegal",
    quote: "WABLP's networking events connected us with key partners. Our customer base has tripled in 8 months.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    rating: 5,
    growth: "3x customer growth"
  }
];

export function VideoShowcaseSection() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);  // Add state to track video play status

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const togglePlay = (index: number) => {
    if (activeVideo === index) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveVideo(index);
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-[#C9A74B] text-white mb-4 px-4 py-2">
            <Play className="w-4 h-4 mr-2" />
            Video Showcase
          </Badge>
          <h2 className="text-4xl md:text-5xl text-[#005A8C] mb-6">
            See WABLP in 
            <span className="text-[#C9A74B]"> Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Watch real success stories, explore platform features, and learn how businesses 
            across West Africa are growing with WABLP.
          </p>
        </div>

        {/* Main Video Player */}
        <div className="mb-16">
          <VideoPlayer
            title={videos[activeVideo].title}
            description={videos[activeVideo].description}
            thumbnail={videos[activeVideo].thumbnail}
            src={`/videos/${videos[activeVideo].videoFile}`}  // Local video path
            className="max-w-4xl mx-auto"
            isPlaying={isPlaying} // Add the state for controlling play status
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>

        {/* Video Playlist */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {videos.map((video, index) => (
            <Card 
              key={video.id}
              className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${
                activeVideo === index ? 'ring-2 ring-[#C9A74B] shadow-lg' : ''
              }`}
              onClick={() => togglePlay(index)}
            >
              <div className="relative">
                <video
                  src={`/videos/${video.videoFile}`} // Show the video directly
                  className="w-full h-40 object-cover rounded-t-lg"
                  poster={video.thumbnail}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  autoPlay   // ✅ autoplay enabled
                />
                <Badge className="absolute top-2 left-2 bg-[#005A8C] text-white text-xs">
                  {video.category}
                </Badge>
                <Badge className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs">
                  {video.duration}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className={`font-semibold mb-2 ${
                  activeVideo === index ? 'text-[#C9A74B]' : 'text-[#005A8C]'
                }`}>
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {video.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="bg-gradient-to-r from-[#005A8C] to-[#0066a3] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Business networking"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <Badge className="bg-[#C9A74B] text-white mb-4 px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Success Stories
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Hear from Our Community
              </h3>
              <p className="text-xl text-gray-200">
                Real businesses sharing their growth stories on WABLP
              </p>
            </div>
            
            {/* Testimonial Card */}
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white bg-opacity-10 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center justify-between mb-8">
                    <Quote className="w-12 h-12 text-[#C9A74B] opacity-50" />
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#C9A74B] fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 text-center">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <ImageWithFallback
                        src={testimonials[currentTestimonial].avatar}
                        alt={testimonials[currentTestimonial].name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-[#C9A74B]"
                      />
                      <div>
                        <div className="font-semibold text-lg">{testimonials[currentTestimonial].name}</div>
                        <div className="text-[#C9A74B] font-medium">{testimonials[currentTestimonial].company}</div>
                        <div className="text-gray-300 text-sm flex items-center">
                          <Globe className="w-3 h-3 mr-1" />
                          {testimonials[currentTestimonial].location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge className="bg-[#C9A74B] text-white px-3 py-2 mb-2">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {testimonials[currentTestimonial].growth}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="border-white text-white hover:bg-white hover:text-[#005A8C]"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentTestimonial === index ? 'bg-[#C9A74B]' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="border-white text-white hover:bg-white hover:text-[#005A8C]"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}







// "use client"
// import { useState } from "react";
// import { Button } from "./ui/button";
// import { Card, CardContent } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
// import { 
//   Users, 
//   Star, 
//   Quote,
//   ArrowLeft,
//   ArrowRight,
//   TrendingUp,
//   Globe
// } from "lucide-react";

// // Showcase images instead of videos
// const showcases = [
//   {
//     id: 1,
//     title: "Success Story",
//     description: "Discover how WABLP is transforming business networking across West Africa with our comprehensive platform features and success stories.",
//     image: "temp01.jpg",
//     category: "Platform Tour"
//   },
//   {
//     id: 2,
//     title: "Success Story",
//     description: "See how TechNova grew their business by 300% using WABLP's networking tools and opportunity marketplace.",
//     image: "temp05.jpg",
//     category: "Success Story"
//   },
//   {
//     id: 3,
//     title: "Success Story",
//     description: "Learn about our enterprise-grade security measures and how we protect your business data and transactions.",
//     image: "temp02.jpg",
//     category: "Security"
//   }
// ];

// const testimonials = [
//   {
//     name: "Kwame Asante",
//     company: "GreenHarvest Ltd",
//     location: "Accra, Ghana",
//     quote: "WABLP helped us find reliable suppliers across West Africa. Our supply chain is now 40% more efficient.",
//     avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
//     rating: 5,
//     growth: "+40% efficiency"
//   },
//   {
//     name: "Fatou Diallo",
//     company: "AfricaBuild Corp",
//     location: "Abidjan, Côte d'Ivoire",
//     quote: "The platform's security features gave us confidence to expand into new markets. We've completed over $2M in deals.",
//     avatar: "https://images.unsplash.com/photo-1494790108755-2616b012d7c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
//     rating: 5,
//     growth: "$2M+ deals"
//   },
//   {
//     name: "Ibrahim Sall",
//     company: "WestPay Financial",
//     location: "Dakar, Senegal",
//     quote: "WABLP's networking events connected us with key partners. Our customer base has tripled in 8 months.",
//     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
//     rating: 5,
//     growth: "3x customer growth"
//   }
// ];

// export function VideoShowcaseSection() {
//   const [activeImage, setActiveImage] = useState(0);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);

//   const nextTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   return (
//     <section className="py-20 bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <Badge className="bg-[#C9A74B] text-white mb-4 px-4 py-2">
//             Image Showcase
//           </Badge>
//           <h2 className="text-4xl md:text-5xl text-[#005A8C] mb-6">
//             See WABLP in 
//             <span className="text-[#C9A74B]"> Action</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Explore platform features, success stories, and learn how businesses 
//             across West Africa are growing with WABLP.
//           </p>
//         </div>

//         {/* Main Image */}
//         <div className="mb-16 max-w-4xl mx-auto">
//           <ImageWithFallback
//             src={showcases[activeImage].image}
//             alt={showcases[activeImage].title}
//             className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
//           />
//           <div className="mt-6 text-center">
//             <h3 className="text-2xl font-semibold text-[#005A8C]">
//               {showcases[activeImage].title}
//             </h3>
//             {/* main description removed */}
//           </div>
//         </div>

//         {/* Image Playlist */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
//           {showcases.map((item, index) => (
//             <Card 
//               key={item.id}
//               className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${
//                 activeImage === index ? 'ring-2 ring-[#C9A74B] shadow-lg' : ''
//               }`}
//               onClick={() => setActiveImage(index)}
//             >
//               <div className="relative">
//                 <ImageWithFallback
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-64 object-cover rounded-t-lg" /* increased height */
//                 />
//                 <Badge className="absolute top-2 left-2 bg-[#005A8C] text-white text-xs">
//                   {item.category}
//                 </Badge>
//               </div>
//               <CardContent className="p-4">
//                 <h3 className={`font-semibold ${
//                   activeImage === index ? 'text-[#C9A74B]' : 'text-[#005A8C]'
//                 }`}>
//                   {item.title}
//                 </h3>
//                 {/* per-card description removed */}
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Testimonials Carousel */}
//         <div className="bg-gradient-to-r from-[#005A8C] to-[#0066a3] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
//           <div className="absolute inset-0 opacity-10">
//             <ImageWithFallback
//               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
//               alt="Business networking"
//               className="w-full h-full object-cover"
//             />
//           </div>
          
//           <div className="relative z-10">
//             <div className="text-center mb-12">
//               <Badge className="bg-[#C9A74B] text-white mb-4 px-4 py-2">
//                 <Users className="w-4 h-4 mr-2" />
//                 Success Stories
//               </Badge>
//               <h3 className="text-3xl md:text-4xl font-bold mb-4">
//                 Hear from Our Community
//               </h3>
//               <p className="text-xl text-gray-200">
//                 Real businesses sharing their growth stories on WABLP
//               </p>
//             </div>
            
//             {/* Testimonial Card */}
//             <div className="max-w-4xl mx-auto">
//               <Card className="bg-white bg-opacity-10 backdrop-blur-sm border-0 text-white">
//                 <CardContent className="p-8 md:p-12">
//                   <div className="flex items-center justify-between mb-8">
//                     <Quote className="w-12 h-12 text-[#C9A74B] opacity-50" />
//                     <div className="flex items-center space-x-1">
//                       {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
//                         <Star key={i} className="w-5 h-5 text-[#C9A74B] fill-current" />
//                       ))}
//                     </div>
//                   </div>
                  
//                   <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 text-center">
//                     "{testimonials[currentTestimonial].quote}"
//                   </blockquote>
                  
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                       <ImageWithFallback
//                         src={testimonials[currentTestimonial].avatar}
//                         alt={testimonials[currentTestimonial].name}
//                         className="w-16 h-16 rounded-full object-cover border-4 border-[#C9A74B]"
//                       />
//                       <div>
//                         <div className="font-semibold text-lg">{testimonials[currentTestimonial].name}</div>
//                         <div className="text-[#C9A74B] font-medium">{testimonials[currentTestimonial].company}</div>
//                         <div className="text-gray-300 text-sm flex items-center">
//                           <Globe className="w-3 h-3 mr-1" />
//                           {testimonials[currentTestimonial].location}
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="text-right">
//                       <Badge className="bg-[#C9A74B] text-white px-3 py-2 mb-2">
//                         <TrendingUp className="w-4 h-4 mr-1" />
//                         {testimonials[currentTestimonial].growth}
//                       </Badge>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
            
//             {/* Navigation */}
//             <div className="flex items-center justify-center space-x-4 mt-8">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={prevTestimonial}
//                 className="border-white text-white hover:bg-white hover:text-[#005A8C]"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//               </Button>
              
//               <div className="flex space-x-2">
//                 {testimonials.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentTestimonial(index)}
//                     className={`w-3 h-3 rounded-full transition-all ${
//                       currentTestimonial === index ? 'bg-[#C9A74B]' : 'bg-white bg-opacity-50'
//                     }`}
//                   />
//                 ))}
//               </div>
              
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={nextTestimonial}
//                 className="border-white text-white hover:bg-white hover:text-[#005A8C]"
//               >
//                 <ArrowRight className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



