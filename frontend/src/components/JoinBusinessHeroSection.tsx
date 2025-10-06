import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Users, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";

export function JoinBusinessHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#005A8C] via-[#0066a3] to-[#005A8C] text-white overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Business handshake"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-opacity-70"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center bg-[#C9A74B] bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <span className="text-white font-medium">🚀 Join the Growth Network</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
              Grow Your Business with 
              <span className="text-[#C9A74B]"> WABLP</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Connect with verified businesses, access new markets, and accelerate your growth across West Africa&apos;s most trusted business platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg"
                className="bg-[#C9A74B] text-white hover:bg-[#b8964a] px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group" asChild
              >
                <Link href="/sign-up">Join as a Business</Link>
                {/* <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" /> */}
              </Button>
              {/* <Button 
                size="lg"
                className="bg-[#C9A74B] text-white hover:bg-[#b8964a] px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button> */}
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-[#005A8C] hover:bg-white px-8 py-4 text-lg rounded-lg transition-all duration-300"
              >
                Schedule Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="w-8 h-8 text-[#C9A74B] mx-auto mb-2" />
                <div className="text-2xl font-bold">560+</div>
                <div className="text-gray-300 text-sm">Members</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-[#C9A74B] mx-auto mb-2" />
                <div className="text-2xl font-bold">340+</div>
                <div className="text-gray-300 text-sm">Deals</div>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-[#C9A74B] mx-auto mb-2" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-gray-300 text-sm">Secure</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <ImageWithFallback
                src="/join01.jpg"
                alt="Business growth visualization"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}