import { Eye, Network, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const benefits = [
  {
    icon: Eye,
    title: "Increased Visibility",
    description: "Get discovered by potential partners and clients across West Africa with our comprehensive business directory and advanced search capabilities.",
    features: [
      "Enhanced business profiles with multimedia content",
      "SEO-optimized listings for better discoverability",
      "Featured placement opportunities for premium members",
      "Industry-specific categorization and tagging"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Network,
    title: "Better Connections",
    description: "Build meaningful relationships with verified businesses through our intelligent matching system and networking tools.",
    features: [
      "AI-powered business matching algorithms",
      "Verified member profiles and certifications",
      "Industry events and networking opportunities",
      "Direct messaging and collaboration tools"
    ],
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Zap,
    title: "Faster Deals",
    description: "Accelerate your business processes with streamlined communication, secure transactions, and efficient deal management tools.",
    features: [
      "Automated RFQ and proposal management",
      "Secure contract negotiation platform",
      "Integrated payment and escrow services",
      "Real-time deal tracking and analytics"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#003366] mb-4">
            Transform Your Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the key benefits that drive success for over 560+ businesses across West Africa
          </p>
        </div>
        
        <div className="space-y-20">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-cols-2' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFD700] text-[#003366] rounded-full mb-8">
                  <benefit.icon className="w-10 h-10" />
                </div>
                <h3 className="text-3xl md:text-4xl text-[#003366] mb-6">
                  {benefit.title}
                </h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {benefit.description}
                </p>
                <ul className="space-y-4">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#FFD700] rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#003366] to-[#FFD700] rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                  <ImageWithFallback
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}