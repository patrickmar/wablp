import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  Users, 
  Award, 
  MessageSquare, 
  ExternalLink,
  Star,
  Globe,
  Mail,
  Phone,
  UserPlus,
  Eye,
  TrendingUp
} from "lucide-react";

const businesses = [
  {
    id: 1,
    name: "TechNova Solutions",
    type: "Technology",
    location: "Lagos, Nigeria",
    description: "Leading IT solutions provider specializing in enterprise software development and digital transformation.",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 4.8,
    employees: "150-500",
    founded: "2015",
    verified: true,
    premium: true,
    services: ["Software Development", "Cloud Solutions", "IT Consulting"],
    website: "https://technova.ng",
    email: "info@technova.ng",
    phone: "+234 123 456 7890",
    profileViews: 1247,
    connections: 89
  },
  {
    id: 2,
    name: "GreenHarvest Ltd",
    type: "Agriculture",
    location: "Kumasi, Ghana",
    description: "Sustainable agriculture company focusing on organic farming and agricultural technology solutions.",
    logo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 4.6,
    employees: "50-150",
    founded: "2018",
    verified: true,
    premium: false,
    services: ["Organic Farming", "AgTech Solutions", "Supply Chain"],
    website: "https://greenharvest.gh",
    email: "contact@greenharvest.gh",
    phone: "+233 123 456 789",
    profileViews: 892,
    connections: 67
  },
  {
    id: 3,
    name: "AfricaBuild Corp",
    type: "Construction",
    location: "Abidjan, Côte d'Ivoire",
    description: "Construction and infrastructure development company with projects across West Africa.",
    logo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 4.7,
    employees: "200-1000",
    founded: "2012",
    verified: true,
    premium: true,
    services: ["Infrastructure", "Commercial Buildings", "Project Management"],
    website: "https://africabuild.ci",
    email: "info@africabuild.ci",
    phone: "+225 123 456 789",
    profileViews: 654,
    connections: 123
  }
];

const organizations = [
  {
    id: 1,
    name: "West Africa Development Bank",
    type: "Financial Institution",
    location: "Dakar, Senegal",
    description: "Regional development bank supporting economic growth and development across West Africa.",
    logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    focus: ["Development Finance", "SME Support", "Infrastructure Funding"],
    established: "1973",
    verified: true,
    website: "https://wadb.org",
    email: "info@wadb.org",
    profileViews: 2341,
    followers: 234
  },
  {
    id: 2,
    name: "Ghana Chamber of Commerce",
    type: "Trade Association",
    location: "Accra, Ghana",
    description: "Leading trade association promoting business development and trade facilitation in Ghana.",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    focus: ["Trade Promotion", "Business Advocacy", "Member Services"],
    established: "1961",
    verified: true,
    website: "https://ghanachamber.org",
    email: "info@ghanachamber.org",
    profileViews: 1876,
    followers: 189
  }
];

const experts = [
  {
    id: 1,
    name: "Dr. Kwame Asante",
    title: "Senior Agricultural Consultant",
    specialization: "Sustainable Agriculture",
    location: "Accra, Ghana",
    bio: "20+ years experience in sustainable agriculture development with focus on West African farming systems.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 4.9,
    experience: "20+ years",
    languages: ["English", "Twi", "French"],
    skills: ["Agricultural Development", "Sustainability", "Project Management"],
    verified: true,
    premium: true,
    consultations: 156,
    followers: 432
  },
  {
    id: 2,
    name: "Fatou Diallo",
    title: "Digital Marketing Strategist",
    specialization: "Digital Marketing",
    location: "Lagos, Nigeria",
    bio: "Expert in digital marketing strategies for West African markets with proven track record in e-commerce growth.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b012d7c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 4.8,
    experience: "12+ years",
    languages: ["English", "French", "Yoruba"],
    skills: ["Digital Marketing", "E-commerce", "Social Media Strategy"],
    verified: true,
    premium: false,
    consultations: 89,
    followers: 287
  }
];

export function CommunityMembersPage() {
  const [activeTab, setActiveTab] = useState("businesses");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filterMembers = (members: any[], typeKey: string = "type") => {
    return members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.bio?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter === "all" || member.location.includes(locationFilter);
      const matchesType = typeFilter === "all" || member[typeKey] === typeFilter;
      
      return matchesSearch && matchesLocation && matchesType;
    });
  };

  const filteredBusinesses = filterMembers(businesses);
  const filteredOrganizations = filterMembers(organizations);
  const filteredExperts = filterMembers(experts, "specialization");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#333333] mb-2">Community Members</h1>
          <p className="text-[#6B7280]">Connect with businesses, organizations, and experts across West Africa</p>
        </div>
        <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Members
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
              <Input
                placeholder="Search members..."
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
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {activeTab === "businesses" && (
                  <>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </>
                )}
                {activeTab === "organizations" && (
                  <>
                    <SelectItem value="Financial Institution">Financial Institution</SelectItem>
                    <SelectItem value="Trade Association">Trade Association</SelectItem>
                    <SelectItem value="NGO">NGO</SelectItem>
                  </>
                )}
                {activeTab === "experts" && (
                  <>
                    <SelectItem value="Sustainable Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Digital Marketing">Marketing</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="border-[#004C97] text-[#004C97] hover:bg-[#004C97] hover:text-white">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="businesses" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            <Building className="w-4 h-4 mr-2" />
            Businesses ({filteredBusinesses.length})
          </TabsTrigger>
          <TabsTrigger value="organizations" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            <Award className="w-4 h-4 mr-2" />
            Organizations ({filteredOrganizations.length})
          </TabsTrigger>
          <TabsTrigger value="experts" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" />
            Experts ({filteredExperts.length})
          </TabsTrigger>
        </TabsList>

        {/* Businesses Tab */}
        <TabsContent value="businesses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBusinesses.map((business) => (
              <Card key={business.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={business.logo} />
                      <AvatarFallback className="bg-[#004C97] text-white text-lg">
                        {business.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-[#333333] hover:text-[#004C97] cursor-pointer">
                            {business.name}
                          </h3>
                          {business.verified && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              Verified
                            </Badge>
                          )}
                          {business.premium && (
                            <Badge className="bg-[#D4AF37] text-[#333333] text-xs">
                              Premium
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{business.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-[#6B7280] mb-2">
                        <Badge variant="outline">{business.type}</Badge>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {business.location}
                        </div>
                        <div className="flex items-center">
                          <Building className="w-3 h-3 mr-1" />
                          {business.employees}
                        </div>
                      </div>
                      
                      <p className="text-[#6B7280] text-sm mb-3 line-clamp-2">
                        {business.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {business.services.slice(0, 3).map((service: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-[#6B7280]">
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {business.profileViews} views
                          </div>
                          <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {business.connections} connections
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Message
                          </Button>
                          <Button size="sm" className="bg-[#004C97] text-white hover:bg-[#003a75]">
                            <UserPlus className="w-3 h-3 mr-1" />
                            Connect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Organizations Tab */}
        <TabsContent value="organizations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrganizations.map((org) => (
              <Card key={org.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={org.logo} />
                      <AvatarFallback className="bg-[#D4AF37] text-[#333333] text-lg">
                        {org.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-[#333333] hover:text-[#004C97] cursor-pointer">
                            {org.name}
                          </h3>
                          {org.verified && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-[#6B7280] mb-2">
                        <Badge variant="outline">{org.type}</Badge>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {org.location}
                        </div>
                        <span>Est. {org.established}</span>
                      </div>
                      
                      <p className="text-[#6B7280] text-sm mb-3 line-clamp-2">
                        {org.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {org.focus.slice(0, 3).map((focus: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {focus}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-[#6B7280]">
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {org.profileViews} views
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {org.followers} followers
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Visit
                          </Button>
                          <Button size="sm" className="bg-[#004C97] text-white hover:bg-[#003a75]">
                            Follow
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Experts Tab */}
        <TabsContent value="experts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredExperts.map((expert) => (
              <Card key={expert.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={expert.avatar} />
                    <AvatarFallback className="bg-[#004C97] text-white text-xl">
                      {expert.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-[#333333] hover:text-[#004C97] cursor-pointer">
                      {expert.name}
                    </h3>
                    {expert.verified && (
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        Verified
                      </Badge>
                    )}
                    {expert.premium && (
                      <Badge className="bg-[#D4AF37] text-[#333333] text-xs">
                        Premium
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-[#004C97] font-medium text-sm mb-1">{expert.title}</p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-[#6B7280] mb-3">
                    <Badge variant="outline">{expert.specialization}</Badge>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {expert.location}
                    </div>
                  </div>
                  
                  <p className="text-[#6B7280] text-sm mb-4 line-clamp-3">
                    {expert.bio}
                  </p>
                  
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{expert.rating}</span>
                    <span className="text-xs text-[#6B7280]">({expert.consultations} consultations)</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {expert.skills.slice(0, 2).map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 text-xs text-[#6B7280] mb-4">
                    <span>{expert.experience}</span>
                    <span>•</span>
                    <span>{expert.followers} followers</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" className="flex-1 bg-[#004C97] text-white hover:bg-[#003a75]">
                      <UserPlus className="w-3 h-3 mr-1" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}