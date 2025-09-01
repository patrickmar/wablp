import { UserPlus, Search, MessageSquare, Handshake } from "lucide-react";
import { Button } from "./ui/button"; // ✅ Import your button component

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up and build your comprehensive business profile with all relevant information and certifications.",
    Link: "/sign-up"
  },
  {
    icon: Search,
    title: "Discover Opportunities",
    description: "Browse and search through thousands of business opportunities, tenders, and networking events.",
    link: "/sign-up"
  },
  {
    icon: MessageSquare,
    title: "Connect & Communicate",
    description: "Reach out to potential partners through our secure messaging system and collaboration tools.",
    link: "/sign-up"
  },
  {
    icon: Handshake,
    title: "Close Deals",
    description: "Finalize partnerships and business deals with our integrated contract management and payment systems.",
    link: "/sign-up"
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-[#005A8C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Four simple steps to unlock business opportunities and grow your network across West Africa
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#C9A74B] text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                  {index + 1}
                </div>
                
                {/* Icon Container */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#C9A74B] text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-10 h-10" />
                </div>
                
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-[#C9A74B] bg-opacity-30 transform translate-x-4"></div>
                )}
              </div>
              
              <h3 className="text-xl text-white mb-4 group-hover:text-[#C9A74B] transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {step.description}
              </p>

              <Button
                asChild
                variant="outline"
                className="mt-5 text-[#005A8C] border-[#005A8C] hover:bg-[#005A8C] hover:text-white"
              >
                <a href={step.link}>Learn More</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}