import { Calendar, Users, Globe, Award } from "lucide-react";

const milestones = [
  {
    year: "2020",
    icon: Calendar,
    title: "Foundation",
    description: "WABLP was founded with a vision to connect West African businesses and create opportunities for regional economic growth."
  },
  {
    year: "2021",
    icon: Users,
    title: "Community Growth",
    description: "Reached 100+ members across Nigeria, Ghana, Senegal, and Côte d'Ivoire, establishing our first regional partnerships."
  },
  {
    year: "2022",
    icon: Globe,
    title: "Platform Launch",
    description: "Officially launched our digital platform with secure networking features, supplier directory, and business matching capabilities."
  },
  {
    year: "2023",
    icon: Award,
    title: "Regional Recognition",
    description: "Recognized by ECOWAS as a key platform for regional business development, surpassing 400 active members."
  },
  {
    year: "2024",
    icon: Users,
    title: "Expansion",
    description: "Growing community of 560+ members with successful partnerships spanning multiple industries and countries."
  }
];

export function OurStorySection() {
  return (
    <section className="py-20 bg-[#003366]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Our Story
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From vision to reality: Building West Africa&apos;s premier business networking platform
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#FFD700] hidden lg:block"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className={`flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`w-full lg:w-5/12 ${
                    index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'
                  }`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-[#FFD700] text-[#003366] rounded-full flex items-center justify-center mr-4">
                          <milestone.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-xl text-[#003366] mb-1">{milestone.title}</h4>
                          <p className="text-[#FFD700]">{milestone.year}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden lg:block w-6 h-6 bg-[#FFD700] rounded-full border-4 border-[#003366] absolute left-1/2 transform -translate-x-1/2"></div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block w-5/12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}