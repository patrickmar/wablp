import { Users, FileText, Handshake, TrendingUp, Globe, Building } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "560+",
    label: "Active Members",
    description: "Businesses across West Africa"
  },
  {
    icon: FileText,
    number: "1,200+",
    label: "Opportunities Posted",
    description: "Business opportunities shared"
  },
  {
    icon: Handshake,
    number: "340+",
    label: "Deals Closed",
    description: "Successful partnerships formed"
  },
  {
    icon: TrendingUp,
    number: "$50M+",
    label: "Value Created",
    description: "Total deal value facilitated"
  },
  {
    icon: Globe,
    number: "15+",
    label: "Countries",
    description: "Regional and international reach"
  },
  {
    icon: Building,
    number: "25+",
    label: "Industries",
    description: "Diverse business sectors"
  }
];

export function OurImpactSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#003366] mb-4">
            Our Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Measuring success through meaningful connections and business growth across West Africa
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-8 bg-gray-50 rounded-xl hover:bg-[#003366] hover:text-white transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFD700] text-[#003366] rounded-full mb-6 group-hover:bg-white group-hover:text-[#003366]">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-4xl md:text-5xl text-[#003366] mb-3 group-hover:text-[#FFD700]">
                {stat.number}
              </div>
              <h3 className="text-xl text-[#003366] mb-2 group-hover:text-white">
                {stat.label}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-300">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* <div className="mt-16 bg-[#003366] rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-3xl mb-6">Making a Difference</h3>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Every connection made on our platform represents more than just a business deal. 
            We&apos;re creating jobs, fostering innovation, and building a stronger, more connected 
            West African business ecosystem that benefits communities across the region.
          </p>
        </div> */}
      </div>
    </section>
  );
}