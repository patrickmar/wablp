import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  MapPin, 
  Building, 
  FileText, 
  Download,
  Eye,
  MessageSquare,
  Handshake,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const dealRooms = [
  {
    id: 1,
    title: "Solar Energy Infrastructure Partnership",
    description: "Seeking partners for large-scale solar energy projects across Ghana and Nigeria. Total project value $50M with multiple implementation phases.",
    initiator: "West Africa Energy Corp",
    initiatorLogo: "https://images.unsplash.com/photo-1497436072909-f5e4be5b12ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    value: "$50,000,000",
    participants: 12,
    status: "active",
    deadline: "2025-01-15",
    category: "Energy",
    location: "Ghana, Nigeria",
    progress: 65,
    lastActivity: "2 hours ago",
    requirements: ["Engineering expertise", "Financial backing", "Local partnerships"],
    phase: "Due Diligence"
  },
  {
    id: 2,
    title: "Agricultural Supply Chain Network",
    description: "Building a comprehensive agricultural supply chain network connecting smallholder farmers with urban markets across West Africa.",
    initiator: "FarmLink Solutions",
    initiatorLogo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    value: "$15,000,000",
    participants: 8,
    status: "active",
    deadline: "2024-12-30",
    category: "Agriculture",
    location: "Multi-country",
    progress: 40,
    lastActivity: "1 day ago",
    requirements: ["Logistics expertise", "Technology platform", "Market access"],
    phase: "Partner Selection"
  },
  {
    id: 3,
    title: "Fintech Payment Gateway Integration",
    description: "Developing a unified payment gateway for cross-border transactions in West Africa. Looking for technology and financial partners.",
    initiator: "PayWest Technologies",
    initiatorLogo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    value: "$8,000,000",
    participants: 15,
    status: "closed",
    deadline: "2024-11-30",
    category: "Technology",
    location: "Nigeria, Ghana, Senegal",
    progress: 100,
    lastActivity: "Completed",
    requirements: ["Technical infrastructure", "Regulatory compliance", "Banking partnerships"],
    phase: "Implementation"
  }
];

const tenders = [
  {
    id: 1,
    title: "National Highway Construction Project",
    description: "Construction of 150km highway connecting major cities in Côte d'Ivoire. Requires experienced construction companies with proven track record.",
    client: "Ministry of Infrastructure, Côte d'Ivoire",
    clientLogo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    value: "$120,000,000",
    deadline: "2025-02-28",
    submissionDeadline: "2025-01-15",
    status: "open",
    category: "Construction",
    location: "Côte d'Ivoire",
    estimatedDuration: "36 months",
    requirements: [
      "Minimum 10 years construction experience",
      "Previous highway construction projects",
      "Local partnership required",
      "ISO 9001 certification"
    ],
    documents: [
      { name: "Technical Specifications", size: "2.5 MB", type: "PDF" },
      { name: "Bidding Guidelines", size: "1.8 MB", type: "PDF" },
      { name: "Environmental Assessment", size: "3.2 MB", type: "PDF" }
    ]
  },
  {
    id: 2,
    title: "Digital Identity System Implementation",
    description: "Implementation of a national digital identity system for citizens. Technology partners needed for biometric systems and data management.",
    client: "Digital Transformation Agency, Ghana",
    clientLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    value: "$45,000,000",
    deadline: "2025-03-30",
    submissionDeadline: "2025-01-30",
    status: "open",
    category: "Technology",
    location: "Ghana",
    estimatedDuration: "24 months",
    requirements: [
      "Biometric technology expertise",
      "Government project experience",
      "Data security certifications",
      "Local technical support capability"
    ],
    documents: [
      { name: "System Requirements", size: "4.1 MB", type: "PDF" },
      { name: "Security Standards", size: "2.9 MB", type: "PDF" },
      { name: "Implementation Timeline", size: "1.5 MB", type: "PDF" }
    ]
  },
  {
    id: 3,
    title: "Rural Electrification Program",
    description: "Electrification of 500 rural communities across Senegal using renewable energy solutions. Solar and wind energy providers needed.",
    client: "Ministry of Energy, Senegal",
    clientLogo: "https://images.unsplash.com/photo-1497436072909-f5e4be5b12ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    value: "$85,000,000",
    deadline: "2024-12-15",
    submissionDeadline: "2024-12-01",
    status: "closing_soon",
    category: "Energy",
    location: "Senegal",
    estimatedDuration: "42 months",
    requirements: [
      "Renewable energy experience",
      "Rural deployment capability",
      "Maintenance and support network",
      "Community engagement experience"
    ],
    documents: [
      { name: "Project Scope", size: "3.8 MB", type: "PDF" },
      { name: "Technical Requirements", size: "2.2 MB", type: "PDF" },
      { name: "Evaluation Criteria", size: "1.9 MB", type: "PDF" }
    ]
  }
];

const wablpProjects = [
  {
    id: 1,
    title: "WABLP Digital Marketplace Platform",
    description: "Development of an enhanced digital marketplace connecting businesses across West Africa with advanced matching algorithms and secure transaction processing.",
    value: "$2,500,000",
    status: "in_progress",
    progress: 75,
    startDate: "2024-06-01",
    expectedCompletion: "2025-03-31",
    category: "Platform Development",
    participants: [
      { name: "TechNova Solutions", role: "Lead Developer", avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" },
      { name: "UI/UX Masters", role: "Design Partner", avatar: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" },
      { name: "SecureFinance Ltd", role: "Payment Integration", avatar: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" }
    ],
    milestones: [
      { title: "Platform Architecture", completed: true, date: "2024-07-15" },
      { title: "Core Features Development", completed: true, date: "2024-10-30" },
      { title: "Payment Integration", completed: false, date: "2024-12-31" },
      { title: "Beta Testing", completed: false, date: "2025-02-28" },
      { title: "Platform Launch", completed: false, date: "2025-03-31" }
    ]
  },
  {
    id: 2,
    title: "Cross-Border Trade Facilitation Initiative",
    description: "Streamlining cross-border trade processes through digital documentation, customs integration, and automated compliance checking across ECOWAS member states.",
    value: "$4,200,000",
    status: "planning",
    progress: 25,
    startDate: "2025-01-01",
    expectedCompletion: "2026-12-31",
    category: "Trade Facilitation",
    participants: [
      { name: "TradeFlow Systems", role: "System Integrator", avatar: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" },
      { name: "ECOWAS Secretariat", role: "Policy Partner", avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" }
    ],
    milestones: [
      { title: "Stakeholder Alignment", completed: true, date: "2024-11-30" },
      { title: "System Design", completed: false, date: "2025-03-31" },
      { title: "Pilot Implementation", completed: false, date: "2025-09-30" },
      { title: "Regional Rollout", completed: false, date: "2026-06-30" },
      { title: "Full Implementation", completed: false, date: "2026-12-31" }
    ]
  }
];

const getStatusColor = (status: string) => {
  const colors = {
    active: "bg-green-100 text-green-700",
    closed: "bg-gray-100 text-gray-700",
    open: "bg-blue-100 text-blue-700",
    closing_soon: "bg-orange-100 text-orange-700",
    in_progress: "bg-blue-100 text-blue-700",
    planning: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700"
  };
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-700";
};

export function DealsPage() {
  const [activeTab, setActiveTab] = useState("deal-rooms");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#333333] mb-2">Deals & Opportunities</h1>
          <p className="text-[#6B7280]">Discover business opportunities, tenders, and collaborative projects</p>
        </div>
        <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
          <Plus className="w-4 h-4 mr-2" />
          Create Deal Room
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
              <Input
                placeholder="Search deals and opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus:ring-2 focus:ring-[#004C97]"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Energy">Energy</SelectItem>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Construction">Construction</SelectItem>
                <SelectItem value="Trade Facilitation">Trade Facilitation</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closing_soon">Closing Soon</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
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
          <TabsTrigger value="deal-rooms" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            <Handshake className="w-4 h-4 mr-2" />
            Deal Rooms ({dealRooms.length})
          </TabsTrigger>
          <TabsTrigger value="tenders" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            <FileText className="w-4 h-4 mr-2" />
            Tenders ({tenders.length})
          </TabsTrigger>
          <TabsTrigger value="wablp-projects" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            WABLP Projects ({wablpProjects.length})
          </TabsTrigger>
        </TabsList>

        {/* Deal Rooms Tab */}
        <TabsContent value="deal-rooms" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dealRooms.map((deal) => (
              <Card key={deal.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={deal.initiatorLogo} />
                        <AvatarFallback className="bg-[#004C97] text-white">
                          {deal.initiator.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold text-[#333333] hover:text-[#004C97] cursor-pointer mb-1">
                          {deal.title}
                        </h3>
                        <p className="text-sm text-[#6B7280]">{deal.initiator}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(deal.status)}>
                      {deal.status}
                    </Badge>
                  </div>
                  
                  <p className="text-[#6B7280] text-sm mb-4 line-clamp-2">
                    {deal.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-[#6B7280] mb-4">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {deal.value}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {deal.participants} participants
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {deal.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(deal.deadline).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-[#6B7280]">Progress: {deal.phase}</span>
                      <span className="text-[#333333] font-medium">{deal.progress}%</span>
                    </div>
                    <Progress value={deal.progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-[#6B7280]">
                      Last activity: {deal.lastActivity}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="bg-[#004C97] text-white hover:bg-[#003a75]">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Join
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tenders Tab */}
        <TabsContent value="tenders" className="space-y-6">
          <div className="space-y-6">
            {tenders.map((tender) => (
              <Card key={tender.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-[#333333] hover:text-[#004C97] cursor-pointer">
                          {tender.title}
                        </h3>
                        <Badge className={getStatusColor(tender.status)}>
                          {tender.status.replace('_', ' ')}
                        </Badge>
                        {tender.status === 'closing_soon' && (
                          <Badge className="bg-red-100 text-red-700">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-[#6B7280] mb-2">{tender.client}</p>
                    </div>
                    
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={tender.clientLogo} />
                      <AvatarFallback className="bg-[#D4AF37] text-[#333333]">
                        {tender.client.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <p className="text-[#6B7280] text-sm mb-4">
                    {tender.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[#6B7280] mb-4">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {tender.value}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {tender.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {tender.estimatedDuration}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Due: {new Date(tender.submissionDeadline).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-[#333333] mb-2">Key Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tender.requirements.slice(0, 3).map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      {tender.requirements.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{tender.requirements.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-[#333333] mb-2">Documents:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tender.documents.map((doc, index) => (
                        <Button key={index} variant="outline" size="sm" className="h-8">
                          <Download className="w-3 h-3 mr-1" />
                          {doc.name} ({doc.size})
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-[#6B7280]">
                      Category: {tender.category}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" className="bg-[#004C97] text-white hover:bg-[#003a75]">
                        Submit Bid
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* WABLP Projects Tab */}
        <TabsContent value="wablp-projects" className="space-y-6">
          <div className="space-y-6">
            {wablpProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-[#333333] hover:text-[#004C97] cursor-pointer">
                          {project.title}
                        </h3>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-semibold text-[#333333]">{project.value}</div>
                      <div className="text-xs text-[#6B7280]">Project Value</div>
                    </div>
                  </div>
                  
                  <p className="text-[#6B7280] text-sm mb-4">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-[#6B7280] mb-4">
                    <div>
                      <span className="font-medium">Start Date:</span> {new Date(project.startDate).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Expected Completion:</span> {new Date(project.expectedCompletion).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-[#6B7280]">Project Progress</span>
                      <span className="text-[#333333] font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-[#333333] mb-2">Project Partners:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.participants.map((participant, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={participant.avatar} />
                            <AvatarFallback className="text-xs">{participant.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-xs font-medium text-[#333333]">{participant.name}</div>
                            <div className="text-xs text-[#6B7280]">{participant.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-[#333333] mb-2">Milestones:</h4>
                    <div className="space-y-2">
                      {project.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {milestone.completed && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                          <div className="flex-1 flex items-center justify-between">
                            <span className={`text-sm ${
                              milestone.completed ? 'text-[#333333]' : 'text-[#6B7280]'
                            }`}>
                              {milestone.title}
                            </span>
                            <span className="text-xs text-[#6B7280]">
                              {new Date(milestone.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-[#6B7280]">
                      Managed by WABLP
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" className="bg-[#004C97] text-white hover:bg-[#003a75]">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Updates
                      </Button>
                    </div>
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