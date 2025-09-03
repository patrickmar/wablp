import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, Quote } from "lucide-react";


const partnerLogos = [
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
];

export function PartnerPage() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         {/* Partner Logos */}
        <div className="text-center">
          <h3 className="text-2xl text-[#005A8C] mb-8">Trusted by Leading Organizations</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <ImageWithFallback
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )}