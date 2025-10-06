import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FeaturesHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#003366] via-[#004080] to-[#003366] text-white overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Business networking illustration"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[#003366] bg-opacity-80"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
              Powerful Features for Business Growth
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Discover the comprehensive tools and benefits that make WABLP the premier platform for West African businesses
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3">
                <div className="w-3 h-3 bg-[#FFD700] rounded-full"></div>
                <span className="text-[#005A8C] text-lg">Advanced Analytics</span>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3">
                <div className="w-3 h-3 bg-[#FFD700] rounded-full"></div>
                <span className="text-[#005A8C] text-lg">Secure Platform</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <ImageWithFallback
                src="/features01.jpg"
                alt="Business networking visualization"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FFD700] bg-opacity-20 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#FFD700] bg-opacity-30 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}