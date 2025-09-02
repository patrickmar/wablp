import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Search, Filter, Plus } from "lucide-react";

export function OpportunitiesHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#005A8C] via-[#0066a3] to-[#005A8C] text-white overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Procurement meeting"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[#005A8C] bg-opacity-70"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
            Discover Business 
            <span className="text-[#C9A74B]"> Opportunities</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
            Access thousands of procurement opportunities, tenders, and business partnerships across West Africa
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input 
                    placeholder="Search opportunities, tenders, or companies..."
                    className="pl-12 pr-4 py-3 bg-white border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#C9A74B] text-lg"
                  />
                </div>
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#005A8C] px-6 py-3 rounded-lg"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </Button>
                <Button 
                  className="bg-[#C9A74B] text-white hover:bg-[#b8964a] px-6 py-3 rounded-lg"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C9A74B] mb-2">1,200+</div>
              <div className="text-gray-300">Active Opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C9A74B] mb-2">$50M+</div>
              <div className="text-gray-300">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C9A74B] mb-2">25+</div>
              <div className="text-gray-300">Industries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C9A74B] mb-2">15+</div>
              <div className="text-gray-300">Countries</div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-[#C9A74B] text-[#C9A74B] hover:bg-[#C9A74B] hover:text-white px-8 py-4 rounded-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Post an Opportunity
          </Button>
        </div>
      </div>
    </section>
  );
}