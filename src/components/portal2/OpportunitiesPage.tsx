import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  MapPin, 
  Building, 
  DollarSign, 
  Eye, 
  MessageSquare, 
  ExternalLink,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";

const postedOpportunities = [
  {
    id: 1,
    title: "Enterprise Software Development",
    company: "TechNova Solutions",
    description: "Looking for experienced developers to build a comprehensive ERP system for manufacturing companies.",
    budget: "$50,000 - $100,000",
    location: "Lagos, Nigeria",
    sector: "Technology",
    posted: "2 days ago",
    deadline: "Jan 15, 2025",
    status: "active",
    views: 47,
    responses: 12,
    type: "posted"
  },
  {
    id: 2,
    title: "IT Infrastructure Consulting",
    company: "TechNova Solutions",
    description: "Seeking experts to help design and implement cloud infrastructure for growing businesses.",
    budget: "$25,000 - $50,000",
    location: "Accra, Ghana",
    sector: "Technology",
    posted: "1 week ago",
    deadline: "Dec 30, 2024",
    status: "active",
    views: 89,
    responses: 23,
    type: "posted"
  },
  {
    id: 3,
    title: "Mobile App Development",
    company: "TechNova Solutions",
    description: "Need developers for a fintech mobile application targeting West African markets.",
    budget: "$30,000 - $60,000",
    location: "Remote",
    sector: "Fintech",
    posted: "2 weeks ago",
    deadline: "Dec 20, 2024",
    status: "closed",
    views: 156,
    responses: 45,
    type: "posted"
  }
];

const respondedOpportunities = [
  {
    id: 4,
    title: "Agricultural Supply Chain Platform",
    company: "GreenHarvest Ltd",
    description: "Develop a digital platform to connect farmers with distributors and retailers across West Africa.",
    budget: "$75,000 - $120,000",
    location: "Accra, Ghana",
    sector: "Agriculture",
    posted: "3 days ago",
    deadline: "Jan 20, 2025",
    status: "pending",
    appliedDate: "1 day ago",
    responseStatus: "under_review",
    type: "responded"
  },
  {
    id: 5,
    title: "Construction Project Management System",
    company: "AfricaBuild Corp",
    description: "Build a comprehensive project management system for construction companies.",
    budget: "$40,000 - $80,000",
    location: "Abidjan, Côte d'Ivoire",
    sector: "Construction",
    posted: "1 week ago",
    deadline: "Jan 10, 2025",
    status: "active",
    appliedDate: "5 days ago",
    responseStatus: "shortlisted",
    type: "responded"
  },
  {
    id: 6,
    title: "Payment Gateway Integration",
    company: "WestPay Financial",
    description: "Integrate multiple payment gateways into existing e-commerce platforms.",
    budget: "$15,000 - $30,000",
    location: "Lagos, Nigeria",
    sector: "Fintech",
    posted: "2 weeks ago",
    deadline: "Dec 15, 2024",
    status: "active",
    appliedDate: "1 week ago",
    responseStatus: "rejected",
    type: "responded"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700';
    case 'closed':
      return 'bg-gray-100 text-gray-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getResponseStatusColor = (status: string) => {
  switch (status) {
    case 'under_review':
      return 'bg-blue-100 text-blue-700';
    case 'shortlisted':
      return 'bg-green-100 text-green-700';
    case 'rejected':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getResponseStatusIcon = (status: string) => {
  switch (status) {
    case 'under_review':
      return <Clock className="w-4 h-4" />;
    case 'shortlisted':
      return <CheckCircle className="w-4 h-4" />;
    case 'rejected':
      return <XCircle className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};

export function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState("posted");
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filterOpportunities = (opportunities: any[]) => {
    return opportunities.filter(opp => {
      const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           opp.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = sectorFilter === "all" || opp.sector === sectorFilter;
      const matchesStatus = statusFilter === "all" || opp.status === statusFilter;
      
      return matchesSearch && matchesSector && matchesStatus;
    });
  };

  const filteredPosted = filterOpportunities(postedOpportunities);
  const filteredResponded = filterOpportunities(respondedOpportunities);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#333333] mb-2">My Opportunities</h1>
          <p className="text-[#6B7280]">Manage your posted opportunities and track your applications</p>
        </div>
        <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
          <Plus className="w-4 h-4 mr-2" />
          Post New Opportunity
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus:ring-2 focus:ring-[#004C97]"
              />
            </div>
            
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
                <SelectItem value="Construction">Construction</SelectItem>
                <SelectItem value="Fintech">Fintech</SelectItem>
                <SelectItem value="Energy">Energy</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="border-[#004C97] text-[#004C97] hover:bg-[#004C97] hover:text-white">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posted" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            Posted Opportunities ({filteredPosted.length})
          </TabsTrigger>
          <TabsTrigger value="responded" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            Responded Opportunities ({filteredResponded.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posted" className="space-y-4">
          {filteredPosted.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-[#333333] hover:text-[#004C97] cursor-pointer">
                        {opportunity.title}
                      </h3>
                      <Badge className={getStatusColor(opportunity.status)}>
                        {opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-[#6B7280] mb-3 line-clamp-2">{opportunity.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B7280]">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {opportunity.budget}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {opportunity.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {opportunity.sector}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Deadline: {opportunity.deadline}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-6 text-sm text-[#6B7280]">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {opportunity.views} views
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {opportunity.responses} responses
                    </div>
                    <span>Posted {opportunity.posted}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-[#004C97] text-[#004C97] hover:bg-[#004C97] hover:text-white">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="responded" className="space-y-4">
          {filteredResponded.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={`https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} />
                      <AvatarFallback className="bg-[#D4AF37] text-[#333333]">
                        {opportunity.company.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-[#333333] hover:text-[#004C97] cursor-pointer">
                          {opportunity.title}
                        </h3>
                        <Badge className={getResponseStatusColor(opportunity.responseStatus)}>
                          <div className="flex items-center gap-1">
                            {getResponseStatusIcon(opportunity.responseStatus)}
                            {opportunity.responseStatus.replace('_', ' ').charAt(0).toUpperCase() + opportunity.responseStatus.replace('_', ' ').slice(1)}
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-[#6B7280] mb-1">Posted by {opportunity.company}</p>
                      <p className="text-[#6B7280] mb-3 line-clamp-2">{opportunity.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B7280] mb-4">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {opportunity.budget}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {opportunity.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {opportunity.sector}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Deadline: {opportunity.deadline}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-6 text-sm text-[#6B7280]">
                    <span>Applied {opportunity.appliedDate}</span>
                    <span>Posted {opportunity.posted}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-[#004C97] text-[#004C97] hover:bg-[#004C97] hover:text-white">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}