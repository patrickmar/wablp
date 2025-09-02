import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Search, 
  Filter, 
  Plus, 
  MapPin, 
  Star, 
  MessageSquare, 
  ExternalLink,
  Eye,
  Heart,
  Share2,
  DollarSign,
  Clock,
  CheckCircle,
  ShoppingCart,
  Package
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Enterprise Software Development",
    description: "Custom enterprise software solutions including web applications, mobile apps, and system integrations for businesses of all sizes.",
    provider: "TechNova Solutions",
    providerLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    category: "Technology",
    subcategory: "Software Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Lagos, Nigeria",
    price: "Starting at $15,000",
    priceType: "project",
    rating: 4.8,
    reviews: 45,
    delivery: "3-6 months",
    availability: "available",
    tags: ["Web Development", "Mobile Apps", "System Integration", "Custom Software"],
    features: [
      "Full-stack development",
      "Cloud deployment",
      "Ongoing maintenance",
      "Technical support"
    ],
    verified: true,
    featured: true,
    lastUpdated: "2 days ago"
  },
  {
    id: 2,
    title: "Sustainable Agriculture Consulting",
    description: "Expert consulting services for implementing sustainable farming practices, crop rotation strategies, and organic certification guidance.",
    provider: "Dr. Kwame Asante",
    providerLogo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    category: "Agriculture",
    subcategory: "Consulting",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Accra, Ghana",
    price: "$150/hour",
    priceType: "hourly",
    rating: 4.9,
    reviews: 28,
    delivery: "Flexible",
    availability: "available",
    tags: ["Sustainable Farming", "Organic Certification", "Crop Management", "Training"],
    features: [
      "On-site consultation",
      "Customized farming plans",
      "Training programs",
      "Certification assistance"
    ],
    verified: true,
    featured: false,
    lastUpdated: "1 week ago"
  },
  {
    id: 3,
    title: "Digital Marketing Campaign Management",
    description: "Comprehensive digital marketing services including social media management, content creation, and paid advertising campaigns.",
    provider: "Fatou Diallo",
    providerLogo: "https://images.unsplash.com/photo-1494790108755-2616b012d7c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    category: "Marketing",
    subcategory: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Lagos, Nigeria",
    price: "$2,500/month",
    priceType: "monthly",
    rating: 4.7,
    reviews: 32,
    delivery: "Ongoing",
    availability: "limited",
    tags: ["Social Media", "Content Creation", "Paid Advertising", "Analytics"],
    features: [
      "Multi-platform management",
      "Content calendar",
      "Performance analytics",
      "Monthly reporting"
    ],
    verified: true,
    featured: true,
    lastUpdated: "3 days ago"
  },
  {
    id: 4,
    title: "Construction Project Management",
    description: "End-to-end construction project management services from planning and design to execution and quality control.",
    provider: "AfricaBuild Corp",
    providerLogo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    category: "Construction",
    subcategory: "Project Management",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Abidjan, Côte d'Ivoire",
    price: "Quote on request",
    priceType: "quote",
    rating: 4.6,
    reviews: 18,
    delivery: "6-18 months",
    availability: "available",
    tags: ["Project Management", "Quality Control", "Sustainable Building", "LEED Certification"],
    features: [
      "Full project lifecycle",
      "Quality assurance",
      "Timeline management",
      "Cost optimization"
    ],
    verified: true,
    featured: false,
    lastUpdated: "5 days ago"
  },
  {
    id: 5,
    title: "Financial Advisory Services",
    description: "Strategic financial advisory services for SMEs including business planning, investment guidance, and funding assistance.",
    provider: "West Africa Financial Advisors",
    providerLogo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    category: "Finance",
    subcategory: "Advisory",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Dakar, Senegal",
    price: "$200/hour",
    priceType: "hourly",
    rating: 4.8,
    reviews: 23,
    delivery: "1-3 months",
    availability: "available",
    tags: ["Business Planning", "Investment Advisory", "Funding Assistance", "Financial Analysis"],
    features: [
      "Comprehensive analysis",
      "Custom strategies",
      "Funding connections",
      "Ongoing support"
    ],
    verified: true,
    featured: false,
    lastUpdated: "1 day ago"
  },
  {
    id: 6,
    title: "Organic Farm Products Supply",
    description: "Direct supply of certified organic agricultural products including grains, vegetables, and processed foods to retailers and distributors.",
    provider: "GreenHarvest Ltd",
    providerLogo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    category: "Agriculture",
    subcategory: "Products",
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Kumasi, Ghana",
    price: "Wholesale pricing",
    priceType: "wholesale",
    rating: 4.5,
    reviews: 41,
    delivery: "2-4 weeks",
    availability: "available",
    tags: ["Organic Products", "Wholesale", "Certified", "Fresh Produce"],
    features: [
      "Organic certification",
      "Bulk quantities",
      "Cold chain logistics",
      "Quality guarantee"
    ],
    verified: true,
    featured: true,
    lastUpdated: "2 days ago"
  }
];

const categories = [
  { name: "Technology", count: 145, subcategories: ["Software Development", "IT Consulting", "Cloud Services", "Cybersecurity"] },
  { name: "Agriculture", count: 89, subcategories: ["Consulting", "Products", "Equipment", "Training"] },
  { name: "Construction", count: 76, subcategories: ["Project Management", "Architecture", "Materials", "Equipment Rental"] },
  { name: "Marketing", count: 92, subcategories: ["Digital Marketing", "Branding", "Advertising", "Market Research"] },
  { name: "Finance", count: 54, subcategories: ["Advisory", "Accounting", "Investment", "Insurance"] },
  { name: "Logistics", count: 67, subcategories: ["Transportation", "Warehousing", "Supply Chain", "Customs"] }
];

export function ServicesDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [subcategoryFilter, setSubcategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceTypeFilter, setPriceTypeFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    const matchesSubcategory = subcategoryFilter === "all" || service.subcategory === subcategoryFilter;
    const matchesLocation = locationFilter === "all" || service.location.includes(locationFilter);
    const matchesPriceType = priceTypeFilter === "all" || service.priceType === priceTypeFilter;
    const matchesAvailability = availabilityFilter === "all" || service.availability === availabilityFilter;
    
    return matchesSearch && matchesCategory && matchesSubcategory && matchesLocation && matchesPriceType && matchesAvailability;
  });

  const getAvailabilityColor = (availability: string) => {
    const colors = {
      available: "bg-green-100 text-green-700",
      limited: "bg-orange-100 text-orange-700",
      unavailable: "bg-red-100 text-red-700"
    };
    return colors[availability as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const getPriceTypeDisplay = (priceType: string) => {
    const displays = {
      hourly: "per hour",
      monthly: "per month",
      project: "per project",
      quote: "on request",
      wholesale: "wholesale"
    };
    return displays[priceType as keyof typeof displays] || "";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#333333] mb-2">Services Directory</h1>
          <p className="text-[#6B7280]">Discover professional services and products from WABLP members</p>
        </div>
        <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
          <Plus className="w-4 h-4 mr-2" />
          List Your Service
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Categories */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setCategoryFilter(category.name);
                      setSubcategoryFilter("all");
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                      categoryFilter === category.name ? 'bg-[#004C97] text-white' : 'text-[#6B7280]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <Badge variant="outline" className={`text-xs ${
                        categoryFilter === category.name ? 'border-white text-white' : ''
                      }`}>
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Directory Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Total Services</span>
                  <span className="font-semibold text-[#333333]">523</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Verified Providers</span>
                  <span className="font-semibold text-[#333333]">312</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Countries Covered</span>
                  <span className="font-semibold text-[#333333]">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Featured Services</span>
                  <span className="font-semibold text-[#333333]">89</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
                  <Input
                    placeholder="Search services and products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 focus:ring-2 focus:ring-[#004C97]"
                  />
                </div>
                
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Nigeria">Nigeria</SelectItem>
                    <SelectItem value="Ghana">Ghana</SelectItem>
                    <SelectItem value="Senegal">Senegal</SelectItem>
                    <SelectItem value="Côte d'Ivoire">Côte d'Ivoire</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Availability</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="limited">Limited</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-[#6B7280]">
                  Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
                </p>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="featured">Featured First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Services List */}
          <div className="space-y-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 relative">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                    {service.featured && (
                      <Badge className="absolute top-3 left-3 bg-[#D4AF37] text-[#333333]">
                        Featured
                      </Badge>
                    )}
                    <Badge className={`absolute top-3 right-3 ${getAvailabilityColor(service.availability)}`}>
                      {service.availability}
                    </Badge>
                  </div>
                  
                  <CardContent className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-semibold text-[#333333] hover:text-[#004C97] cursor-pointer">
                            {service.title}
                          </h3>
                          {service.verified && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-[#6B7280] mb-2">
                          <Badge variant="outline">{service.category}</Badge>
                          <span>•</span>
                          <span>{service.subcategory}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold text-[#333333]">{service.price}</div>
                        <div className="text-xs text-[#6B7280]">{getPriceTypeDisplay(service.priceType)}</div>
                      </div>
                    </div>
                    
                    <p className="text-[#6B7280] text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={service.providerLogo} />
                        <AvatarFallback className="text-xs">{service.provider.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-[#333333]">{service.provider}</div>
                        <div className="flex items-center text-xs text-[#6B7280]">
                          <MapPin className="w-3 h-3 mr-1" />
                          {service.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-[#6B7280] mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                        {service.rating} ({service.reviews} reviews)
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.delivery}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {service.tags.slice(0, 4).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-[#6B7280]">
                        <span>Updated {service.lastUpdated}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Heart className="w-3 h-3 mr-1" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-3 h-3 mr-1" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" className="bg-[#004C97] text-white hover:bg-[#003a75]">
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Request Quote
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-12 h-12 text-[#6B7280] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#333333] mb-2">No services found</h3>
                <p className="text-[#6B7280] mb-4">
                  Try adjusting your search criteria or browse different categories.
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setLocationFilter("all");
                  setAvailabilityFilter("all");
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}