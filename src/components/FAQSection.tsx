import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { HelpCircle, MessageCircle, Phone } from "lucide-react";
import { Button } from "./ui/button";

const faqs = [
  {
    question: "What is WABLP and how does it work?",
    answer: "WABLP (West Africa Business Linkages Platform) is a comprehensive business networking and supplier diversity platform that connects verified businesses across West Africa. It works by allowing businesses to create detailed profiles, discover opportunities, connect with potential partners, and access resources for growth. Our platform facilitates secure communication, contract management, and business transactions."
  },
  {
    question: "How much does membership cost?",
    answer: "We offer three membership tiers: Starter (Free), Professional ($49/month), and Enterprise ($149/month). The Starter plan includes basic features like profile creation and opportunity browsing. Professional adds enhanced profiles, priority listings, and analytics. Enterprise includes all features plus dedicated support and custom integrations. All paid plans come with a 14-day free trial."
  },
  {
    question: "How do you verify businesses on the platform?",
    answer: "We have a rigorous verification process that includes checking business registration documents, conducting background checks, verifying contact information, and reviewing financial standing where applicable. Verified businesses receive a 'Verified' badge on their profiles, giving other members confidence in their legitimacy and professionalism."
  },
  {
    question: "What types of opportunities are available?",
    answer: "Our platform features diverse opportunities including procurement contracts, supply agreements, partnership opportunities, joint ventures, tenders from government and private sector, subcontracting opportunities, and business collaborations. Opportunities span across 25+ industries and are posted by verified businesses and organizations."
  },
  {
    question: "Which countries does WABLP cover?",
    answer: "WABLP covers all 15 ECOWAS member countries: Benin, Burkina Faso, Cape Verde, Côte d'Ivoire, Gambia, Ghana, Guinea, Guinea-Bissau, Liberia, Mali, Niger, Nigeria, Senegal, Sierra Leone, and Togo. We're continuously expanding our reach within the West African region."
  },
  {
    question: "How secure is the platform?",
    answer: "Security is our top priority. We use enterprise-grade encryption, secure authentication, regular security audits, and comply with international data protection standards. All communications are encrypted, and we have 24/7 monitoring to protect member data and transactions."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time without penalties. If you cancel during your billing cycle, you'll continue to have access to premium features until the end of that billing period. We also offer a 30-day money-back guarantee for new subscribers."
  },
  {
    question: "What support is available to members?",
    answer: "We provide comprehensive support including 24/7 customer service, dedicated account managers for Enterprise clients, onboarding assistance, training resources, and a comprehensive knowledge base. You can reach us via email, phone, or live chat, and we guarantee response times within 24 hours."
  },
  {
    question: "How do I get started on WABLP?",
    answer: "Getting started is simple: 1) Create your account using our signup form, 2) Complete your business verification, 3) Build your comprehensive business profile, 4) Start exploring opportunities and connecting with other businesses. Our onboarding team will guide you through each step."
  },
  {
    question: "Are there any setup fees or hidden costs?",
    answer: "No, there are no setup fees, hidden costs, or long-term contracts. Our pricing is transparent with clear monthly rates. The only costs are your chosen membership tier. Free trial periods give you full access to test all features before committing to a paid plan."
  }
];

export function FAQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-[#C9A74B] bg-opacity-10 rounded-full px-6 py-2 mb-6">
            <HelpCircle className="w-5 h-5 text-[#C9A74B] mr-2" />
            <span className="text-[#C9A74B] font-medium">Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">
            Got Questions? We&apos;ve Got Answers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about WABLP membership, features, and getting started
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-gray-50 rounded-lg border border-gray-200 px-6"
            >
              <AccordionTrigger className="text-left hover:text-[#005A8C] text-lg font-medium py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {/* Still Have Questions CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#005A8C] to-[#0066a3] rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl mb-4">Still Have Questions?</h3>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Our team is here to help you get started and make the most of your WABLP membership.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-[#C9A74B] text-white hover:bg-[#b8964a] px-8 py-3"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Live Chat Support
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#005A8C] px-8 py-3"
            >
              <Phone className="w-5 h-5 mr-2" />
              Schedule a Call
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-gray-300">
            Average response time: Under 2 hours • Available 24/7
          </div>
        </div>
      </div>
    </section>
  );
}