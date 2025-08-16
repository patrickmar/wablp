import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const newsbody = [
  {
    name: "News Title",
    role: "News Sub-Title",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Tech entrepreneur and software architect with expertise in building scalable platforms for emerging markets.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    name: "News Title",
    role: "News Sub-Title",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Strategic partnerships expert with a track record of connecting businesses across francophone and anglophone West Africa.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    name: "News Title",
    role: "News Sub-Title",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Operations specialist with extensive experience in supply chain management and business process optimization.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
];

export function NewsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#003366] mb-4">
            NEWS
          </h2>
          {/* <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Passionate professionals dedicated to connecting and empowering West African businesses
          </p> */}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsbody.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-64 overflow-hidden">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-[#003366] mb-2">{member.name}</h3>
                <p className="text-[#FFD700] mb-4">{member.role}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg"
                className="bg-[#C9A74B] text-white hover:bg-[#b8964a] px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Read More
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}