import { Shield, Lock, Server, Zap, Eye, FileCheck } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const securityFeatures = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description: "All communications and data transfers are protected with military-grade encryption."
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description: "Multi-factor authentication and advanced identity verification for all members."
  },
  {
    icon: Server,
    title: "Cloud Infrastructure",
    description: "Built on enterprise-grade cloud infrastructure with 99.9% uptime guarantee."
  },
  {
    icon: Zap,
    title: "Real-time Monitoring",
    description: "24/7 security monitoring and threat detection to protect your business data."
  },
  {
    icon: Eye,
    title: "Privacy Controls",
    description: "Granular privacy settings to control who can see your business information."
  },
  {
    icon: FileCheck,
    title: "Compliance Ready",
    description: "Fully compliant with international data protection and business regulations."
  }
];

export function TechnologySecuritySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center bg-[#C9A74B] bg-opacity-10 rounded-full px-6 py-2 mb-6">
              <Shield className="w-5 h-5 text-[#C9A74B] mr-2" />
              <span className="text-white font-medium">Enterprise Security</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl text-[#005A8C] mb-6">
              Advanced Technology & Security
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Built with cutting-edge technology and enterprise-grade security to protect your business data and ensure seamless, secure transactions.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#005A8C] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#005A8C] mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#005A8C] to-[#C9A74B] rounded-2xl transform rotate-3"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Technology and security illustration"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              {/* Security badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#005A8C] mb-1">256-bit</div>
                  <div className="text-sm text-gray-600">SSL Encryption</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#C9A74B] mb-1">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime SLA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}