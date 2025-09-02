import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ArrowRight, Star, MapPin, Users } from "lucide-react";

const featuredMembers = [
  {
    name: "TechNova Solutions",
    industry: "Technology",
    location: "Lagos, Nigeria",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    description: "Leading IT solutions provider specializing in enterprise software development and digital transformation.",
    rating: 4.9,
    deals: 28
  },
  {
    name: "GreenHarvest Ltd",
    industry: "Agriculture",
    location: "Accra, Ghana",
    logo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    description: "Sustainable agriculture and food processing company serving West African markets.",
    rating: 4.8,
    deals: 34
  },
  {
    name: "AfricaBuild Corp",
    industry: "Construction",
    location: "Abidjan, Côte d'Ivoire",
    logo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    description: "Premier construction and infrastructure development company with regional expertise.",
    rating: 4.7,
    deals: 19
  }
];

export function CommunitySpotlightSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-[#C9A74B] bg-opacity-10 rounded-full px-6 py-2 mb-4">
            <Users className="w-5 h-5 text-[#C9A74B] mr-2" />
            <span className="text-white font-medium">Community Spotlight</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-[#005A8C] mb-4">
            Meet Our Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover how businesses across West Africa are thriving through WABLP connections
          </p>
          
          {/* Community Stats */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#005A8C] mb-2">560+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#C9A74B] mb-2">340+</div>
              <div className="text-gray-600">Successful Deals</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#005A8C] mb-2">25+</div>
              <div className="text-gray-600">Industries</div>
            </div>
          </div>
        </div>
        
        {/* Featured Members Carousel */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={member.logo}
                      alt={`${member.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#005A8C] mb-1">{member.name}</h3>
                    <p className="text-[#C9A74B] text-sm mb-1">{member.industry}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {member.location}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {member.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-[#C9A74B] fill-current mr-1" />
                      <span className="text-sm font-medium text-gray-700">{member.rating}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {member.deals} deals
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="border-[#005A8C] text-[#005A8C] hover:bg-[#005A8C] hover:text-white"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div> */}
        
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-[#005A8C] text-white hover:bg-[#004a73] px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <a href="/sign-up">
            View All Members
            {/* <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /> */}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}