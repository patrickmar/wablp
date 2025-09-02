import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  Users, 
  Star, 
  MessageSquare, 
  UserPlus, 
  ExternalLink,
  Eye,
  Phone,
  Mail,
  Globe,
  Award,
  TrendingUp,
  Grid3x3,
  List,
  Download
} from "lucide-react";

const members = [
  {
    id: 1,
    name: "TechNova Solutions",
    type: "business",
    category: "Technology",
    description: "Leading IT solutions provider specializing in enterprise software development and digital transformation across West Africa.",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Lagos, Nigeria",
    founded: "2015",
    employees: "150-500",
    rating: 4.8,
    verified: true,
    premium: true,
    profileViews: 1247,
    connections: 89,
    services: ["Software Development", "Cloud Solutions", "IT Consulting", "Digital Transformation"],
    website: "https://technova.ng",
    email: "info@technova.ng",
    phone: "+234 123 456 7890",
    certifications: ["ISO 27001", "Microsoft Gold Partner", "AWS Advanced Partner"],
    recentActivity: "Posted new job opening",
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Dr. Kwame Asante",
    type: "expert",
    category: "Agriculture",
    specialization: "Sustainable Agriculture",
    description: "20+ years experience in sustainable agriculture development with focus on West African farming systems and climate-resilient crops.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Accra, Ghana",
    experience: "20+ years",
    rating: 4.9,
    verified: true,
    premium: true,
    consultations: 156,
    followers: 432,
    skills: ["Agricultural Development", "Sustainability", "Project Management", "Research"],
    languages: ["English", "Twi", "French"],
    education: "PhD in Agricultural Science - University of Ghana",
    recentActivity: "Published research paper",
    lastActive: "1 day ago"
  },
  {
    id: 3,
    name: "West Africa Development Bank",
    type: "organization",
    category: "Financial Services",
    description: "Regional development bank supporting economic growth and development across West Africa through strategic financing and technical assistance.",
    logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Dakar, Senegal",
    established: "1973",
    memberCountries: 15,
    verified: true,
    premium: false,
    profileViews: 2341,
    followers: 234,
    focus: ["Development Finance", "SME Support", "Infrastructure Funding", "Capacity Building"],
    website: "https://wadb.org",
    email: "info@wadb.org",
    assets: "$2.8 billion",
    recentActivity: "Approved new funding program",
    lastActive: "3 hours ago"
  },
  {
    id: 4,
    name: "GreenHarvest Ltd",
    type: "business",
    category: "Agriculture",
    description: "Sustainable agriculture company focusing on organic farming and agricultural technology solutions for smallholder farmers.",
    logo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Kumasi, Ghana",
    founded: "2018",
    employees: "50-150",
    rating: 4.6,
    verified: true,
    premium: false,
    profileViews: 892,
    connections: 67,
    services: ["Organic Farming", "AgTech Solutions", "Supply Chain", "Training Programs"],
    website: "https://greenharvest.gh",
    email: "contact@greenharvest.gh",
    phone: "+233 123 456 789",
    certifications: ["Organic Certification", "Fair Trade"],
    recentActivity: "Launched new training program",
    lastActive: "5 hours ago"
  },
  {
    id: 5,
    name: "Fatou Diallo",
    type: "expert",
    category: "Marketing",
    specialization: "Digital Marketing",
    description: "Expert in digital marketing strategies for West African markets with proven track record in e-commerce growth and brand development.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b012d7c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Lagos, Nigeria",
    experience: "12+ years",
    rating: 4.8,
    verified: true,
    premium: false,
    consultations: 89,
    followers: 287,
    skills: ["Digital Marketing", "E-commerce", "Social Media Strategy", "Brand Development"],
    languages: ["English", "French", "Yoruba"],
    education: "MBA Marketing - Lagos Business School",
    recentActivity: "Conducted webinar",
    lastActive: "6 hours ago"
  },
  {
    id: 6,
    name: "AfricaBuild Corp",
    type: "business",
    category: "Construction",
    description: "Construction and infrastructure development company with major projects across West Africa, specializing in sustainable building practices.",
    logo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Abidjan, Côte d'Ivoire",
    founded: "2012",
    employees: "200-1000",
    rating: 4.7,
    verified: true,
    premium: true,
    profileViews: 654,
    connections: 123,
    services: ["Infrastructure", "Commercial Buildings", "Project Management", "Sustainable Construction"],
    website: "https://africabuild.ci",
    email: "info@africabuild.ci",
    phone: "+225 123 456 789",
    certifications: ["ISO 9001", "LEED Certification"],
    recentActivity: "Won major infrastructure project",
    lastActive: "1 day ago"
  }
];

export function MembersCataloguePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (member.services && member.services.some(service => 
                           service.toLowerCase().includes(searchTerm.toLowerCase())
                         )) ||
                         (member.skills && member.skills.some(skill => 
                           skill.toLowerCase().includes(searchTerm.toLowerCase())
                         ));
    
    const matchesType = typeFilter === "all" || member.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || member.category === categoryFilter;
    const matchesLocation = locationFilter === "all" || member.location.includes(locationFilter);
    
    return matchesSearch && matchesType && matchesCategory && matchesLocation;
  });

  const renderMemberCard = (member: any) => (
    <Card key={member.id} className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="w-16 h-16 flex-shrink-0">
            <AvatarImage src={member.logo || member.avatar} />
            <AvatarFallback className="bg-[#004C97] text-white text-lg">
              {member.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 min-w-0">
                <h3 className="text-lg font-semibold text-[#333333] hover:text-[#004C97] cursor-pointer truncate">
                  {member.name}
                </h3>
                {member.verified && (
                  <Badge className="bg-green-100 text-green-700 text-xs flex-shrink-0">
                    Verified
                  </Badge>
                )}
                {member.premium && (
                  <Badge className="bg-[#D4AF37] text-[#333333] text-xs flex-shrink-0">
                    Premium
                  </Badge>
                )}
              </div>
              {member.rating && (
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{member.rating}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-[#6B7280] mb-2">
              <Badge variant="outline" className="text-xs">{member.category}</Badge>
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {member.location}
              </div>
              {member.type === "business" && (
                <div className="flex items-center">
                  <Building className="w-3 h-3 mr-1" />
                  {member.employees}
                </div>
              )}
              {member.type === "expert" && (
                <div className="flex items-center">
                  <Award className="w-3 h-3 mr-1" />
                  {member.experience}
                </div>
              )}
            </div>
            
            <p className="text-[#6B7280] text-sm mb-3 line-clamp-2">
              {member.description}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {(member.services || member.skills || member.focus)?.slice(0, 3).map((item: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-[#6B7280]">
                <div className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {member.profileViews || member.consultations || member.followers} {member.type === "expert" ? "consultations" : "views"}
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {member.connections || member.followers} {member.type === "expert" ? "followers" : "connections"}
                </div>
                <span className="text-green-600">●</span>
                <span>{member.lastActive}</span>
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
  );

  const renderMemberRow = (member: any) => (
    <Card key={member.id} className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={member.logo || member.avatar} />
            <AvatarFallback className="bg-[#004C97] text-white">
              {member.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 grid grid-cols-6 gap-4 items-center">
            <div className="col-span-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-[#333333] hover:text-[#004C97] cursor-pointer">
                  {member.name}
                </h3>
                {member.verified && (
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="text-sm text-[#6B7280]">{member.category}</div>
            </div>
            
            <div className="text-sm text-[#6B7280]">
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {member.location}
              </div>
            </div>
            
            <div className="text-sm text-[#6B7280]">
              {member.type === "business" && `Est. ${member.founded}`}
              {member.type === "expert" && member.experience}
              {member.type === "organization" && `Est. ${member.established}`}
            </div>
            
            <div className="flex items-center">
              {member.rating && (
                <>
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{member.rating}</span>
                </>
              )}
            </div>
            
            <div className="flex space-x-2 justify-end">
              <Button variant="outline" size="sm">
                <MessageSquare className="w-3 h-3" />
              </Button>
              <Button size="sm" className="bg-[#004C97] text-white hover:bg-[#003a75]">
                <UserPlus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#333333] mb-2">Members Catalogue</h1>
          <p className="text-[#6B7280]">Comprehensive directory of WABLP members across West Africa</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Directory
          </Button>
          <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Members
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus:ring-2 focus:ring-[#004C97]"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Member Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="business">Businesses</SelectItem>
                <SelectItem value="expert">Experts</SelectItem>
                <SelectItem value="organization">Organizations</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
                <SelectItem value="Construction">Construction</SelectItem>
                <SelectItem value="Financial Services">Financial Services</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Nigeria">Nigeria</SelectItem>
                <SelectItem value="Ghana">Ghana</SelectItem>
                <SelectItem value="Senegal">Senegal</SelectItem>
                <SelectItem value="Côte d'Ivoire">Côte d'Ivoire</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="border-[#004C97] text-[#004C97] hover:bg-[#004C97] hover:text-white">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-[#6B7280]">
              Showing {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-[#6B7280]">View:</span>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-[#004C97] text-white" : ""}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-[#004C97] text-white" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMembers.map(renderMemberCard)}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMembers.map(renderMemberRow)}
        </div>
      )}

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 text-[#6B7280] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#333333] mb-2">No members found</h3>
            <p className="text-[#6B7280] mb-4">
              Try adjusting your search criteria or filters to find more members.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setTypeFilter("all");
              setCategoryFilter("all");
              setLocationFilter("all");
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}