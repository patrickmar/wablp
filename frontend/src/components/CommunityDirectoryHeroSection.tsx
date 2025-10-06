import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Search, Filter, Users, Globe, TrendingUp } from "lucide-react";
import Link from "next/link";

export function CommunityDirectoryHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#005A8C] via-[#0066a3] to-[#005A8C] text-white overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/connect.jpg"
          alt="Collage of diverse business owners"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-opacity-70"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#C9A74B] bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Users className="w-5 h-5 text-[#C9A74B] mr-2" />
            <span className="text-white font-medium">560+ Verified Members</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
            Connect with West Africa&apos;s 
            <span className="text-[#C9A74B]"> Business Leaders</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
            Discover verified businesses, suppliers, and partners across 15+ countries in West Africa
          </p>
          
          {/* Search Bar */}
          <div>
            <div className="inline-flex items-center bg-[#C9A74B] bg-opacity-10 rounded-full px-6 py-2 mb-4">
            <Button 
                  className="bg-[#C9A74B] text-white hover:bg-[#b8964a] px-6 py-3 rounded-lg"
                >
                  <Link href="/sign-up">Search Directory</Link>
                </Button>
          </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <Users className="w-12 h-12 text-[#C9A74B] mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">560+</div>
              <div className="text-[#005A8C] text-lg">Verified Businesses</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <Globe className="w-12 h-12 text-[#C9A74B] mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-[#005A8C] text-lg">Countries Covered</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <TrendingUp className="w-12 h-12 text-[#C9A74B] mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-[#005A8C] text-lg">Industry Sectors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}