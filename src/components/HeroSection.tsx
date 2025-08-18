// import { Button } from "./ui/button";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
// import { ArrowRight, Play } from "lucide-react";

// export function HeroSection() {
//   return (
//     <section className="relative bg-gradient-to-br from-[#005A8C] via-[#0066a3] to-[#005A8C] text-white overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <ImageWithFallback
//           src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
//           alt="Lagos business district aerial view"
//           fill
//           sizes="100vw"               // ✅ recommended when using `fill`
//           className="object-cover opacity-30"
//           priority
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
//               <span className="text-[#C9A74B] font-medium">✨ Trusted by 560+ businesses</span>
//             </div>

//             <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
//               Connecting West African Businesses to{" "}
//               <span className="text-[#C9A74B]">Opportunities</span>
//             </h1>

//             <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
//               Your gateway to visibility, networking, and growth. Join the premier platform for business connections across West Africa.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 mb-8">
//               <Button
//                 size="lg"
//                 className="bg-[#C9A74B] text-white hover:bg-[#b8964a] px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
//               >
//                 Join as a Business
//                 <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-2 border-white text-white hover:bg-white hover:text-[#005A8C] px-8 py-4 text-lg rounded-lg transition-all duration-300"
//               >
//                 <Play className="mr-2 w-5 h-5" />
//                 Explore Opportunities
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
//                 fill
//                 // width={800}          // ✅ explicit size for next/image
//                 // height={320}         // ✅ aligns with ~h-80
//                 className="object-cover"
//                 // sizes="(min-width: 1024px) 800px, 100vw"
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









import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#005A8C] via-[#0066a3] to-[#005A8C] text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Lagos business district aerial view"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[#005A8C] bg-opacity-70"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#C9A74B] bg-opacity-20 rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-[#C9A74B] bg-opacity-15 rounded-full animate-pulse hidden lg:block"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center bg-[#C9A74B] bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <span className=" font-medium">✨ Trusted by 560+ businesses</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
              Connecting West African Businesses to 
              <span className="text-[#C9A74B]"> Opportunities</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
              Your gateway to visibility, networking, and growth. Join the premier platform for business connections across West Africa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg"
                className="bg-[#C9A74B] text-white hover:bg-[#b8964a] px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Join as a Business
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-[#005A8C] hover:bg-white px-8 py-4 text-lg rounded-lg transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Explore Opportunities
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-6 text-center sm:text-left">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold text-[#C9A74B]">560+</div>
                <div className="text-gray-300 text-sm">Active Members</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold text-[#C9A74B]">$50M+</div>
                <div className="text-gray-300 text-sm">Deals Facilitated</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold text-[#C9A74B]">15+</div>
                <div className="text-gray-300 text-sm">Countries</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative hidden lg:block">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Business networking illustration"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 bg-[#C9A74B] text-white p-4 rounded-lg shadow-lg">
              <div className="text-sm font-medium">New Opportunity</div>
              <div className="text-xs opacity-90">$2.5M Contract</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-[#005A8C] p-4 rounded-lg shadow-lg">
              <div className="text-sm font-medium">Member Spotlight</div>
              <div className="text-xs opacity-70">TechCorp Nigeria</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}