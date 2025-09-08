import { Users, Globe, Network, Shield } from "lucide-react";
import { Button } from "./ui/button"; // ✅ Import your button component

const features = [
  {
    icon: Users,
    title: "Agriculture & Agribusiness",
    description: "Opportunities are shifting from raw commodity production to the modernization of the entire value chain through digital platforms. ",
    link: "/sign-up"
  },
  {
    icon: Globe,
    title: "Infrastructure, Energy, and Construction",
    description: "This sector presents major opportunities, many of which are large-scale projects funded by governments and international development agencies. firms.",
    link: "/sign-up"
  },
  {
    icon: Network,
    title: "Logistics, Transportation, and Supply Chain Management",
    description: "As a critical enabler of regional trade, this sector offers opportunities in freight forwarding, warehousing, and supply chain management.",
    link: "/sign-up"
  },
  {
    icon: Shield,
    title: "Information & Communication Technology (ICT) & Digital Services",
    description: "This sector is a primary driver of transformation across the entire West African economy, with a strong focus on mobile-first solutions.",
    link: "/sign-up"
  },
  {
    icon: Shield,
    title: "Manufacturing & Industrial",
    description: "The manufacturing sector has significant growth potential, particularly with the implementation of the African Continental Free Trade Area (AfCFTA).",
    link: "/sign-up"
  },
  {
    icon: Shield,
    title: "Arts and Crafts, Fashion & Apparel",
    description: "This sector presents a significant opportunity for B2B commerce, with West Africa positioned to become a major textiles and apparel manufacturing hub. ",
    link: "/sign-up"
  }
];

export function ListingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl text-[#005A8C] mb-4">
            Opportunity Listings
          </h2>
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful tools and features designed specifically for West African businesses
          </p> */}
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center group hover:-translate-y-2 transition-all duration-300 p-6 rounded-2xl"
            >
              {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#005A8C] to-[#0066a3] text-white rounded-2xl mb-6 group-hover:shadow-xl transition-shadow duration-300">
                <feature.icon className="w-10 h-10" />
              </div> */}
              <h3 className="text-xl text-[#005A8C] mb-4 group-hover:text-[#C9A74B] transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Learn More Button */}
              <Button
                asChild
                variant="outline"
                className="text-[#005A8C] border-[#005A8C] hover:bg-[#005A8C] hover:text-white"
              >
                <a href={feature.link}>Learn More</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}