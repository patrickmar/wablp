import { Button } from "./ui/button";
import { ArrowRight, Users, Shield, TrendingUp } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#FFD700] to-[#e6c200]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl text-[#003366] mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl md:text-2xl text-[#003366] mb-12 max-w-4xl mx-auto">
            Join over 560+ successful businesses who are already growing their networks, 
            expanding their reach, and closing more deals on WABLP
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <div className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-lg px-6 py-3">
              <Users className="w-6 h-6 text-[#003366]" />
              <span className="text-[#003366] font-medium">560+ Active Members</span>
            </div>
            <div className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-lg px-6 py-3">
              <Shield className="w-6 h-6 text-[#003366]" />
              <span className="text-[#003366] font-medium">100% Secure Platform</span>
            </div>
            <div className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-lg px-6 py-3">
              <TrendingUp className="w-6 h-6 text-[#003366]" />
              <span className="text-[#003366] font-medium">$50M+ Deals Facilitated</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-[#003366] text-white hover:bg-[#002244] px-8 py-4 text-xl rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Join WABLP Today
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white px-8 py-4 text-xl rounded-lg transition-all duration-300"
            >
              Schedule a Demo
            </Button>
          </div>
          
          <div className="mt-8 text-[#003366]">
            <p className="mb-2">🎉 <strong>Limited Time:</strong> Free membership for the first 3 months!</p>
            <p className="text-sm opacity-80">* No setup fees, no hidden costs. Cancel anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}