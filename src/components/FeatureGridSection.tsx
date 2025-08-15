import { Users, Globe, TrendingUp, Leaf, Shield, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Supplier Diversity",
    description: "Connect with certified diverse suppliers across West Africa, promoting inclusive business practices and expanding your supplier network with verified businesses."
  },
  {
    icon: Globe,
    title: "Market Access",
    description: "Expand your reach across regional and international markets with our comprehensive platform that opens doors to new business opportunities and partnerships."
  },
  {
    icon: TrendingUp,
    title: "Supplier Development",
    description: "Access training programs, mentorship opportunities, and resources designed to help suppliers grow their capabilities and meet international standards."
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Promote sustainable business practices with our ESG tracking tools and connect with environmentally conscious partners committed to responsible growth."
  },
  {
    icon: Shield,
    title: "Secure Communication",
    description: "Conduct business safely with our encrypted messaging system, secure document sharing, and verified member profiles ensuring authentic connections."
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Make informed decisions with comprehensive analytics dashboards, market insights, and performance tracking tools tailored for West African businesses."
  }
];

export function FeatureGridSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#003366] mb-4">
            Comprehensive Platform Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to connect, collaborate, and grow your business across West Africa
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#003366] text-white rounded-lg mb-6 group-hover:bg-[#FFD700] group-hover:text-[#003366] transition-colors duration-300">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl text-[#003366] mb-4 group-hover:text-[#003366]">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}