import { Users, Globe, Network, Shield } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Supplier Diversity",
    description: "Connect with certified diverse suppliers and promote inclusive business practices across West Africa."
  },
  {
    icon: Globe,
    title: "Market Access",
    description: "Expand your reach across regional and international markets with our comprehensive platform."
  },
  {
    icon: Network,
    title: "Business Networking",
    description: "Build meaningful relationships with verified businesses through intelligent matching."
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Conduct business safely with encrypted communication and verified member profiles."
  }
];

export function KeyFeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#005A8C] mb-4">
            Everything You Need to Grow
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful tools and features designed specifically for West African businesses
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#005A8C] to-[#0066a3] text-white rounded-2xl mb-6 group-hover:shadow-xl transition-shadow duration-300">
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl text-[#005A8C] mb-4 group-hover:text-[#C9A74B] transition-colors">
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