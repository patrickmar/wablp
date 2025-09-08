import { Eye, Network, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const benefits = [
  {
    icon: Eye,
    title: "Increase Your Visibility",
    description: "Get discovered by potential partners and clients across West Africa with our comprehensive business directory.",
    features: [
      "Enhanced business profiles with multimedia content",
      "SEO-optimized listings for better discoverability",
      "Featured placement opportunities",
      "Industry-specific categorization"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Network,
    title: "Build Better Connections",
    description: "Connect with verified businesses through our intelligent matching system and networking tools.",
    features: [
      "AI-powered business matching",
      "Verified member profiles",
      "Industry events and networking",
      "Direct messaging tools"
    ],
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Zap,
    title: "Close Deals Faster",
    description: "Accelerate your business processes with streamlined communication and efficient deal management.",
    features: [
      "Automated RFQ management",
      "Secure contract negotiation",
      "Integrated payment services",
      "Real-time deal tracking"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export function WhyJoinSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#005A8C] mb-4">
            Why Join WABLP?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the power of West Africa&apos;s premier business network and accelerate your growth marked by diverse currencies and regulatory environments. 
          </p>
        </div>
        
        <div className="space-y-20">
          <div className="text-center mb-16">
            <h1 className="text-3xl text-[#005A8C] max-w-3xl mx-auto">
            Why Join WABLP?
          </h1>
          </div>
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-cols-2' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C9A74B] text-white rounded-xl mb-6">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl md:text-4xl text-[#005A8C] mb-6">
                  {benefit.title}
                </h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {benefit.description}
                </p>
                <ul className="space-y-4">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#C9A74B] rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#005A8C] to-[#C9A74B] rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-2xl">
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