import { ImageWithFallback } from "./figma/ImageWithFallback";

export function NewsHeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-[#003366] to-[#004080] text-white overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Business meeting"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[#003366] bg-opacity-70"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
            WABLP News
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Bringing you the best News from the West African Business Community and beyond
          </p>
        </div>
      </div>
    </section>
  );
}