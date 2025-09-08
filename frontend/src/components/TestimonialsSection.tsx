import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Amina Okonkwo",
    role: "CEO, TechNova Solutions",
    company: "Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "WABLP has transformed how we connect with potential partners across West Africa. We've closed over $2M in deals through the platform in just 8 months.",
    rating: 5
  },
  {
    name: "Kwame Asante",
    role: "Founder, GreenHarvest Ltd",
    company: "Accra, Ghana",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "The supplier diversity program helped us connect with certified agricultural suppliers across the region. Our supply chain is now more resilient and diverse.",
    rating: 5
  },
  {
    name: "Fatou Diallo",
    role: "Director, AfricaBuild Corp",
    company: "Dakar, Senegal",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "The platform's security features give us confidence in conducting business online. The verification process ensures we're dealing with legitimate companies.",
    rating: 5
  }
];

const partnerLogos = [
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#005A8C] mb-4">
            What Our Partners Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from successful businesses who have grown their networks and closed deals through WABLP
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#C9A74B] opacity-50" />
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#005A8C]">{testimonial.name}</h3>
                  <p className="text-[#C9A74B] text-sm">{testimonial.role}</p>
                  <p className="text-gray-500 text-sm">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#C9A74B] fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed italic">
                &apos;{testimonial.content}&apos;
              </p>
            </div>
          ))}
        </div>
        
        {/* Partner Logos
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
        </div> */}
      </div>
    </section>
  );
}