import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  Search, 
  Filter, 
  Plus, 
  MapPin, 
  Clock, 
  Building, 
  DollarSign, 
  Users, 
  Calendar,
  Bookmark,
  ExternalLink,
  Eye,
  Heart
} from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior Software Developer",
    company: "TechNova Solutions",
    companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    location: "Lagos, Nigeria",
    type: "Full-time",
    remote: true,
    salary: "$60,000 - $80,000",
    postedAt: "2 days ago",
    deadline: "2024-12-31",
    description: "We're looking for a Senior Software Developer to join our growing team. You'll be responsible for developing scalable web applications and leading junior developers.",
    requirements: [
      "5+ years of software development experience",
      "Proficiency in React, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS/Azure)",
      "Strong problem-solving skills"
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Remote work options",
      "Professional development budget"
    ],
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    applicants: 23,
    views: 156,
    featured: true,
    urgent: false
  },
  {
    id: 2,
    title: "Digital Marketing Manager",
    company: "GreenHarvest Ltd",
    companyLogo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    location: "Accra, Ghana",
    type: "Full-time",
    remote: false,
    salary: "$40,000 - $55,000",
    postedAt: "1 week ago",
    deadline: "2024-12-25",
    description: "Join our marketing team to drive digital marketing strategies for our agricultural products across West Africa.",
    requirements: [
      "3+ years of digital marketing experience",
      "Experience with social media advertising",
      "Knowledge of agricultural markets preferred",
      "Bachelor's degree in Marketing or related field"
    ],
    benefits: [
      "Health and dental insurance",
      "Annual bonus",
      "Training opportunities",
      "Flexible working hours"
    ],
    skills: ["Digital Marketing", "Social Media", "SEO", "Analytics"],
    applicants: 45,
    views: 234,
    featured: false,
    urgent: true
  },
  {
    id: 3,
    title: "Construction Project Manager",
    company: "AfricaBuild Corp",
    companyLogo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    location: "Abidjan, Côte d'Ivoire",
    type: "Contract",
    remote: false,
    salary: "$70,000 - $90,000",
    postedAt: "3 days ago",
    deadline: "2025-01-15",
    description: "Lead construction projects from initiation to completion. Manage teams, budgets, and ensure quality delivery.",
    requirements: [
      "8+ years of construction project management",
      "PMP certification preferred",
      "Experience with large-scale infrastructure projects",
      "Fluency in French and English"
    ],
    benefits: [
      "Competitive contract rate",
      "Project completion bonuses",
      "Travel allowances",
      "Equipment provided"
    ],
    skills: ["Project Management", "Construction", "Leadership", "Budgeting"],
    applicants: 12,
    views: 89,
    featured: true,
    urgent: false
  }
];

const salaryRanges = [
  "Under $30,000",
  "$30,000 - $50,000",
  "$50,000 - $70,000",
  "$70,000 - $100,000",
  "Over $100,000"
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Executive"];

export function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [salaryFilter, setSalaryFilter] = useState("all");
  const [remoteFilter, setRemoteFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showPostJob, setShowPostJob] = useState(false);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "all" || job.location.includes(locationFilter);
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    const matchesRemote = remoteFilter === "all" || 
                         (remoteFilter === "remote" && job.remote) ||
                         (remoteFilter === "onsite" && !job.remote);
    
    return matchesSearch && matchesLocation && matchesType && matchesRemote;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#333333] mb-2">Jobs</h1>
          <p className="text-[#6B7280]">Discover career opportunities across West Africa</p>
        </div>
        <Dialog open={showPostJob} onOpenChange={setShowPostJob}>
          <DialogTrigger asChild>
            <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
              <Plus className="w-4 h-4 mr-2" />
              Post a Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Post a New Job</DialogTitle>
              <DialogDescription>
                Create a job listing to attract top talent from across West Africa.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Job Title</label>
                  <Input placeholder="e.g. Senior Software Developer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Company</label>
                  <Input placeholder="Your company name" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Location</label>
                  <Input placeholder="e.g. Lagos, Nigeria" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Job Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map(type => (
                        <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Salary Range</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      {salaryRanges.map(range => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Experience Level</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map(level => (
                        <SelectItem key={level} value={level.toLowerCase()}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Job Description</label>
                <Textarea rows={4} placeholder="Describe the role, responsibilities, and what you're looking for..." />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Requirements</label>
                <Textarea rows={3} placeholder="List the key requirements and qualifications..." />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowPostJob(false)}>
                  Cancel
                </Button>
                <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
                  Post Job
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
              <Input
                placeholder="Search jobs, companies..."
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
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {jobTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={remoteFilter} onValueChange={setRemoteFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Work Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="border-[#004C97] text-[#004C97] hover:bg-[#004C97] hover:text-white">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-[#6B7280]">
          Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
        </p>
        <Select defaultValue="newest">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="salary-asc">Salary: Low to High</SelectItem>
            <SelectItem value="salary-desc">Salary: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => setSelectedJob(job)}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={job.companyLogo} />
                    <AvatarFallback className="bg-[#004C97] text-white">
                      {job.company.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-[#333333] hover:text-[#004C97]">
                        {job.title}
                      </h3>
                      {job.featured && (
                        <Badge className="bg-[#D4AF37] text-[#333333] text-xs">
                          Featured
                        </Badge>
                      )}
                      {job.urgent && (
                        <Badge className="bg-red-500 text-white text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <p className="text-[#004C97] font-medium text-sm mb-2">{job.company}</p>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-[#6B7280] mb-3">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {job.location}
                  {job.remote && <Badge variant="outline" className="ml-2 text-xs">Remote</Badge>}
                </div>
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  {job.type}
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {job.salary}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {job.postedAt}
                </div>
              </div>
              
              <p className="text-[#6B7280] text-sm mb-4 line-clamp-2">
                {job.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.slice(0, 4).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-sm text-[#6B7280]">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {job.applicants} applicants
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {job.views} views
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Details
                  </Button>
                  <Button size="sm" className="bg-[#004C97] text-white hover:bg-[#003a75]">
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedJob.companyLogo} />
                  <AvatarFallback className="bg-[#004C97] text-white text-lg">
                    {selectedJob.company.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
                    {selectedJob.featured && (
                      <Badge className="bg-[#D4AF37] text-[#333333]">Featured</Badge>
                    )}
                    {selectedJob.urgent && (
                      <Badge className="bg-red-500 text-white">Urgent</Badge>
                    )}
                  </div>
                  <p className="text-[#004C97] font-medium text-lg">{selectedJob.company}</p>
                  <div className="flex items-center space-x-4 text-sm text-[#6B7280] mt-2">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedJob.location}
                    </div>
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      {selectedJob.type}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {selectedJob.salary}
                    </div>
                  </div>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-6 py-6">
              <div>
                <h3 className="text-lg font-semibold text-[#333333] mb-3">Job Description</h3>
                <p className="text-[#6B7280] leading-relaxed">{selectedJob.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#333333] mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-start text-[#6B7280]">
                      <span className="w-2 h-2 bg-[#004C97] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#333333] mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {selectedJob.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start text-[#6B7280]">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#333333] mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="text-sm text-[#6B7280]">
                  <p>Posted {selectedJob.postedAt}</p>
                  <p>Application deadline: {new Date(selectedJob.deadline).toLocaleDateString()}</p>
                </div>
                
                <div className="flex space-x-3">
                  <Button variant="outline">
                    <Heart className="w-4 h-4 mr-2" />
                    Save Job
                  </Button>
                  <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}