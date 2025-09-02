import { Button } from "./ui/button";
import { Check, Star, Crown, Zap } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    icon: Zap,
    price: "Free",
    description: "Perfect for small businesses getting started",
    features: [
      "Basic business profile",
      "Browse member directory",
      "Access to opportunities",
      "Basic messaging",
      "Community forum access"
    ],
    limitations: [
      "Limited profile customization",
      "Basic search filters",
      "Standard support"
    ],
    buttonText: "Get Started Free",
    popular: false
  },
  {
    name: "Professional",
    icon: Star,
    price: "$49",
    period: "/month",
    description: "For growing businesses seeking more opportunities",
    features: [
      "Enhanced business profile",
      "Advanced search & filters",
      "Priority in search results",
      "Unlimited messaging",
      "RFQ posting (5/month)",
      "Basic analytics dashboard",
      "Email support"
    ],
    buttonText: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "$149",
    period: "/month",
    description: "For established businesses and corporations",
    features: [
      "Premium business profile",
      "Featured listing placement",
      "Unlimited RFQ posting",
      "Advanced analytics suite",
      "Dedicated account manager",
      "Custom integrations",
      "Priority 24/7 support",
      "White-label options"
    ],
    buttonText: "Contact Sales",
    popular: false
  }
];

export function MembershipTiersSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#005A8C] mb-4">
            Choose Your Membership Tier
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan to unlock your business potential and connect with opportunities
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                tier.popular ? 'ring-2 ring-[#C9A74B] transform scale-105' : ''
              }`}
            >
              {tier.popular && (
                <div className="bg-gradient-to-r from-[#C9A74B] to-[#d4b55a] text-white text-center py-3">
                  <span className="font-medium">Most Popular</span>
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    tier.popular ? 'bg-[#C9A74B] text-white' : 'bg-[#005A8C] text-white'
                  }`}>
                    <tier.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl text-[#005A8C] mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#005A8C]">{tier.price}</span>
                    {tier.period && <span className="text-gray-600">{tier.period}</span>}
                  </div>
                  <p className="text-gray-600">{tier.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[#C9A74B] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  
                  {tier.limitations?.map((limitation, limitIndex) => (
                    <li key={limitIndex} className="flex items-start space-x-3 opacity-60">
                      <div className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-400">•</div>
                      <span className="text-gray-500 text-sm">{limitation}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 rounded-lg transition-all duration-300 ${
                    tier.popular 
                      ? 'bg-[#C9A74B] text-white hover:bg-[#b8964a]' 
                      : 'bg-[#005A8C] text-white hover:bg-[#004a73]'
                  }`}
                >
                  {tier.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include our core features and 24/7 security monitoring
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-gray-500">
            <span>✓ 30-day money-back guarantee</span>
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}