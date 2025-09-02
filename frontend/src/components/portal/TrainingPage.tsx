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
  Play, 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  Download,
  ExternalLink,
  CheckCircle,
  Lock,
  Video,
  FileText
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Digital Marketing for West African Markets",
    instructor: "Fatou Diallo",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b012d7c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "Master digital marketing strategies specifically designed for West African markets. Learn about local consumer behavior, cultural considerations, and effective digital channels.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Marketing",
    level: "Intermediate",
    duration: "6 weeks",
    lessons: 24,
    enrolled: 156,
    rating: 4.8,
    price: 149,
    currency: "$",
    progress: 65,
    enrolled_by_user: true,
    featured: true,
    skills: ["Digital Marketing", "Social Media", "Analytics", "Strategy"],
    modules: [
      { title: "Understanding West African Markets", completed: true, duration: "45 min" },
      { title: "Social Media Strategy", completed: true, duration: "60 min" },
      { title: "Content Marketing", completed: false, duration: "50 min" },
      { title: "Analytics & Measurement", completed: false, duration: "40 min" }
    ]
  },
  {
    id: 2,
    title: "Sustainable Agriculture Technologies",
    instructor: "Dr. Kwame Asante",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "Learn about cutting-edge sustainable agriculture technologies and practices that can increase productivity while protecting the environment.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Agriculture",
    level: "Advanced",
    duration: "8 weeks",
    lessons: 32,
    enrolled: 89,
    rating: 4.9,
    price: 199,
    currency: "$",
    progress: 0,
    enrolled_by_user: false,
    featured: false,
    skills: ["Sustainable Farming", "Technology", "Environmental Science", "Innovation"],
    modules: [
      { title: "Introduction to AgTech", completed: false, duration: "50 min" },
      { title: "Precision Agriculture", completed: false, duration: "65 min" },
      { title: "Sustainable Practices", completed: false, duration: "55 min" },
      { title: "Case Studies", completed: false, duration: "45 min" }
    ]
  },
  {
    id: 3,
    title: "Cross-Border Trade Regulations",
    instructor: "Ibrahim Sall",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "Navigate complex cross-border trade regulations across West Africa. Understand ECOWAS protocols, customs procedures, and compliance requirements.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Trade",
    level: "Intermediate",
    duration: "4 weeks",
    lessons: 16,
    enrolled: 234,
    rating: 4.7,
    price: 99,
    currency: "$",
    progress: 25,
    enrolled_by_user: true,
    featured: true,
    skills: ["Trade Law", "Compliance", "ECOWAS", "Documentation"],
    modules: [
      { title: "ECOWAS Trade Protocols", completed: true, duration: "40 min" },
      { title: "Customs Procedures", completed: false, duration: "55 min" },
      { title: "Documentation Requirements", completed: false, duration: "35 min" },
      { title: "Compliance Best Practices", completed: false, duration: "50 min" }
    ]
  }
];

const webinars = [
  {
    id: 1,
    title: "Fintech Innovations in West Africa",
    presenter: "Adanna Okoye",
    presenterAvatar: "https://images.unsplash.com/photo-1494790108755-2616b012d7c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "Explore the latest fintech innovations transforming financial services across West Africa. Learn about mobile money, digital banking, and investment platforms.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    date: "2024-12-20",
    time: "14:00",
    duration: "90 minutes",
    attendees: 450,
    category: "Finance",
    status: "upcoming",
    price: 0,
    registered: true,
    topics: ["Mobile Money", "Digital Banking", "Investment Platforms", "Regulatory Environment"]
  },
  {
    id: 2,
    title: "Building Resilient Supply Chains",
    presenter: "Emmanuel Kone",
    presenterAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "Learn strategies for building resilient supply chains that can withstand disruptions and support business continuity across West African markets.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    date: "2024-12-22",
    time: "16:00",
    duration: "60 minutes",
    attendees: 320,
    category: "Supply Chain",
    status: "upcoming",
    price: 25,
    registered: false,
    topics: ["Risk Management", "Supplier Diversity", "Technology Integration", "Sustainability"]
  },
  {
    id: 3,
    title: "Women in West African Business",
    presenter: "Aisha Bello",
    presenterAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "A panel discussion featuring successful women entrepreneurs sharing their experiences, challenges, and insights on building businesses in West Africa.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    date: "2024-12-18",
    time: "10:00",
    duration: "120 minutes",
    attendees: 680,
    category: "Entrepreneurship",
    status: "completed",
    price: 0,
    registered: true,
    topics: ["Women Entrepreneurship", "Leadership", "Funding", "Mentorship"]
  }
];

export function TrainingPage() {
  const [activeTab, setActiveTab] = useState("courses");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const filteredWebinars = webinars.filter(webinar => {
    const matchesSearch = webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webinar.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || webinar.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#333333] mb-2">Training & Education</h1>
          <p className="text-[#6B7280]">Enhance your skills with courses and webinars designed for West African professionals</p>
        </div>
        <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
          <Award className="w-4 h-4 mr-2" />
          View Certificates
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
              <Input
                placeholder="Search courses and webinars..."
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
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
                <SelectItem value="Trade">Trade</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
              </SelectContent>
            </Select>
            
            {activeTab === "courses" && (
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            <Button variant="outline" className="border-[#004C97] text-[#004C97] hover:bg-[#004C97] hover:text-white">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="courses" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            <BookOpen className="w-4 h-4 mr-2" />
            Courses ({filteredCourses.length})
          </TabsTrigger>
          <TabsTrigger value="webinars" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            <Video className="w-4 h-4 mr-2" />
            Webinars ({filteredWebinars.length})
          </TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  {course.featured && (
                    <Badge className="absolute top-3 left-3 bg-[#D4AF37] text-[#333333]">
                      Featured
                    </Badge>
                  )}
                  <Badge className="absolute top-3 right-3 bg-[#004C97] text-white">
                    {course.currency}{course.price}
                  </Badge>
                  {course.enrolled_by_user && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-white bg-opacity-90 rounded-lg p-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant="outline">{course.category}</Badge>
                    <Badge variant="outline" className="text-xs">{course.level}</Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-[#333333] mb-2 line-clamp-2 hover:text-[#004C97] cursor-pointer">
                    {course.title}
                  </h3>
                  
                  <p className="text-[#6B7280] text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={course.instructorAvatar} />
                      <AvatarFallback className="text-xs">IN</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-[#6B7280]">{course.instructor}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-[#6B7280] mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {course.lessons} lessons
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.enrolled} enrolled
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      {course.rating}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {course.enrolled_by_user ? (
                      <Button className="flex-1 bg-[#004C97] text-white hover:bg-[#003a75]">
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                      </Button>
                    ) : (
                      <Button className="flex-1 bg-[#004C97] text-white hover:bg-[#003a75]">
                        Enroll Now
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Webinars Tab */}
        <TabsContent value="webinars" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredWebinars.map((webinar) => (
              <Card key={webinar.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={webinar.image}
                    alt={webinar.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className={`absolute top-3 left-3 ${
                    webinar.status === 'upcoming' ? 'bg-green-500' :
                    webinar.status === 'live' ? 'bg-red-500' : 'bg-gray-500'
                  } text-white`}>
                    {webinar.status === 'upcoming' ? 'Upcoming' :
                     webinar.status === 'live' ? 'Live' : 'Completed'}
                  </Badge>
                  {webinar.price > 0 ? (
                    <Badge className="absolute top-3 right-3 bg-[#D4AF37] text-[#333333]">
                      ${webinar.price}
                    </Badge>
                  ) : (
                    <Badge className="absolute top-3 right-3 bg-[#004C97] text-white">
                      Free
                    </Badge>
                  )}
                  {webinar.registered && (
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-white text-[#004C97]">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Registered
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant="outline">{webinar.category}</Badge>
                    <div className="flex items-center text-sm text-[#6B7280]">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(webinar.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-[#333333] mb-2 line-clamp-2 hover:text-[#004C97] cursor-pointer">
                    {webinar.title}
                  </h3>
                  
                  <p className="text-[#6B7280] text-sm mb-4 line-clamp-2">
                    {webinar.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={webinar.presenterAvatar} />
                      <AvatarFallback className="text-xs">PR</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-[#6B7280]">{webinar.presenter}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-[#6B7280] mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {webinar.time} ({webinar.duration})
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {webinar.attendees} attendees
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {webinar.topics.slice(0, 3).map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    {webinar.status === 'completed' ? (
                      <Button className="flex-1 bg-[#004C97] text-white hover:bg-[#003a75]">
                        <Download className="w-4 h-4 mr-2" />
                        Download Recording
                      </Button>
                    ) : webinar.registered ? (
                      <Button className="flex-1 bg-green-600 text-white hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Registered
                      </Button>
                    ) : (
                      <Button className="flex-1 bg-[#004C97] text-white hover:bg-[#003a75]">
                        Register Now
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
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