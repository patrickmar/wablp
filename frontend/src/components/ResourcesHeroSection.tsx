import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Search, BookOpen, TrendingUp, Award, Users } from "lucide-react";

export function ResourcesHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#005A8C] via-[#0066a3] to-[#005A8C] text-white overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Business team working"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[#005A8C] bg-opacity-70"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#C9A74B] bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <BookOpen className="w-5 h-5 text-[#C9A74B] mr-2" />
            <span className="text-white font-medium">Knowledge Center</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
            Empower Your Business with 
            <span className="text-[#C9A74B]"> Knowledge</span>
          </h1>
          <p className="text-xl md:text-xl text-gray-200 mb-8 max-w-4xl mx-auto">
            {/* Access training resources, market insights, success stories, and industry reports to accelerate your business growth */}
            By providing access to resources, WABLP empowers businesses to navigate the West African market and build a sustainable 
            competitive advantage. We offer a wealth of knowledge that goes beyond simple transactions to include in-depth market 
            intelligence and advisory services, which small and medium enterprises (SMEs) desperately need to grow their operations. 
          </p>
          
          {/* Search Bar */}
          {/* <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input 
                    placeholder="Search articles, reports, training materials..."
                    className="pl-12 pr-4 py-3 bg-white border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#C9A74B] text-lg"
                  />
                </div>
                <Button 
                  className="bg-[#C9A74B] text-white hover:bg-[#b8964a] px-8 py-3 rounded-lg"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search Resources
                </Button>
              </div>
            </div>
          </div> */}
          
          {/* Resource Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all cursor-pointer group">
              <BookOpen className="w-12 h-12 text-[#C9A74B] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-white mb-2">120+</div>
              <div className="text-[#005A8C]">Training Materials</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all cursor-pointer group">
              <TrendingUp className="w-12 h-12 text-[#C9A74B] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-white mb-2">85+</div>
              <div className="text-[#005A8C]">Market Reports</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all cursor-pointer group">
              <Award className="w-12 h-12 text-[#C9A74B] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-white mb-2">200+</div>
              <div className="text-[#005A8C]">Success Stories</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all cursor-pointer group">
              <Users className="w-12 h-12 text-[#C9A74B] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-white mb-2">50+</div>
              <div className="text-[#005A8C]">Expert Articles</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}