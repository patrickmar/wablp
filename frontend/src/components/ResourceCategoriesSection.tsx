import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BookOpen, TrendingUp, Award, Download, ExternalLink, Clock, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const featuredArticle = {
  title: "Digital Transformation in West African SMEs: A Complete Guide",
  description: "Comprehensive guide on how small and medium enterprises in West Africa can leverage technology to scale their operations and compete globally.",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  author: "Dr. Amina Okonkwo",
  publishDate: "December 15, 2024",
  readTime: "12 min read",
  category: "Digital Strategy",
  featured: true
};

const resources = {
  training: [
    {
      id: 1,
      title: "Export Documentation Essentials",
      description: "Learn the fundamentals of export documentation required for international trade in West Africa.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      type: "Course",
      duration: "2 hours",
      level: "Beginner",
      downloadCount: 1240,
      rating: 4.8
    },
    {
      id: 2,
      title: "Financial Planning for Growing Businesses",
      description: "Strategic financial planning workshop specifically designed for West African entrepreneurs.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      type: "Workshop",
      duration: "4 hours",
      level: "Intermediate",
      downloadCount: 890,
      rating: 4.9
    },
    {
      id: 3,
      title: "Digital Marketing for African Markets",
      description: "Comprehensive guide to digital marketing strategies that work in West African markets.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      type: "Guide",
      duration: "1 hour",
      level: "All Levels",
      downloadCount: 2100,
      rating: 4.7
    }
  ],
  reports: [
    {
      id: 1,
      title: "West Africa Trade Report 2024",
      description: "Annual comprehensive analysis of trade patterns, opportunities, and challenges across West Africa.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      type: "Market Report",
      pages: 45,
      publishDate: "January 2024",
      downloadCount: 3200,
      premium: true
    },
    {
      id: 2,
      title: "Fintech Innovation in Nigeria",
      description: "In-depth analysis of the fintech landscape and emerging opportunities in Nigeria's digital economy.",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      type: "Industry Analysis",
      pages: 28,
      publishDate: "November 2024",
      downloadCount: 1850,
      premium: false
    },
    {
      id: 3,
      title: "Renewable Energy Investment Guide",
      description: "Investment opportunities and regulatory frameworks for renewable energy projects in West Africa.",
      image: "https://images.unsplash.com/photo-1497436072909-f5e4be5b12ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      type: "Investment Guide",
      pages: 52,
      publishDate: "October 2024",
      downloadCount: 1420,
      premium: true
    }
  ],
  stories: [
    {
      id: 1,
      title: "From Startup to $10M: TechNova's Journey",
      description: "How a Nigerian tech startup scaled to $10M revenue using WABLP's network and resources.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      company: "TechNova Solutions",
      industry: "Technology",
      growth: "1000% revenue growth",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Sustainable Agriculture Success in Ghana",
      description: "GreenHarvest's transformation into West Africa's leading organic food processor.",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      company: "GreenHarvest Ltd",
      industry: "Agriculture",
      growth: "500% export increase",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Building Infrastructure Across Borders",
      description: "AfricaBuild's expansion strategy across three West African countries.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      company: "AfricaBuild Corp",
      industry: "Construction",
      growth: "Regional expansion",
      readTime: "10 min read"
    }
  ]
};

export function ResourceCategoriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Article */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">Featured Article</h2>
            <p className="text-xl text-gray-600">Latest insights from industry experts</p>
          </div>
          
          <div className="bg-gradient-to-r from-[#005A8C] to-[#0066a3] rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 text-white">
                <Badge className="bg-[#C9A74B] text-white mb-4">
                  {featuredArticle.category}
                </Badge>
                <h3 className="text-2xl md:text-3xl mb-4 leading-tight">
                  {featuredArticle.title}
                </h3>
                <p className="text-gray-200 mb-6 leading-relaxed">
                  {featuredArticle.description}
                </p>
                
                <div className="flex items-center mb-6 space-x-4">
                  <div className="text-sm">
                    <div className="font-medium">{featuredArticle.author}</div>
                    <div className="text-gray-300">{featuredArticle.publishDate}</div>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {featuredArticle.readTime}
                  </div>
                </div>
                
                <Button className="bg-[#C9A74B] text-white hover:bg-[#b8964a]">
                  Read Full Article
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="relative">
                <ImageWithFallback
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Resource Categories */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">Knowledge Resources</h2>
          <p className="text-xl text-gray-600">Explore our comprehensive library of business resources</p>
        </div>
        
        <Tabs defaultValue="training" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="training" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Training Materials</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Market Reports</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Success Stories</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="training">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.training.map((resource) => (
                <div key={resource.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  <div className="relative">
                    <ImageWithFallback
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-[#005A8C] text-white">
                      {resource.type}
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg text-[#005A8C] mb-2 group-hover:text-[#C9A74B] transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{resource.duration}</span>
                      <span>{resource.level}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-[#C9A74B] fill-current" />
                        <span className="text-sm">{resource.rating}</span>
                        <span className="text-gray-400 text-sm">({resource.downloadCount})</span>
                      </div>
                      <Button size="sm" className="bg-[#005A8C] text-white hover:bg-[#004a73]">
                        <Download className="w-4 h-4 mr-1" />
                        Access
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.reports.map((resource) => (
                <div key={resource.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  <div className="relative">
                    <ImageWithFallback
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className={`absolute top-4 left-4 ${resource.premium ? 'bg-[#C9A74B]' : 'bg-[#005A8C]'} text-white`}>
                      {resource.premium ? 'Premium' : 'Free'}
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg text-[#005A8C] mb-2 group-hover:text-[#C9A74B] transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{resource.pages} pages</span>
                      <span>{resource.publishDate}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">{resource.downloadCount} downloads</span>
                      <Button size="sm" className="bg-[#005A8C] text-white hover:bg-[#004a73]">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="stories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.stories.map((resource) => (
                <div key={resource.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  <div className="relative">
                    <ImageWithFallback
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-[#C9A74B] text-white">
                      {resource.industry}
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg text-[#005A8C] mb-2 group-hover:text-[#C9A74B] transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{resource.company}</span>
                      <span>{resource.readTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[#C9A74B] text-sm font-medium">{resource.growth}</span>
                      <Button size="sm" className="bg-[#005A8C] text-white hover:bg-[#004a73]">
                        Read Story
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-[#005A8C] to-[#0066a3] rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl mb-4">Stay Updated with Latest Resources</h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Get weekly updates on new training materials, market reports, and success stories delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C9A74B]"
            />
            <Button className="bg-[#C9A74B] text-white hover:bg-[#b8964a] px-6 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}