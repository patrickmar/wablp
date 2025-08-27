import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Eye, 
  MessageSquare, 
  Briefcase, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Plus,
  Calendar,
  MapPin,
  Clock,
  Star,
  ExternalLink
} from "lucide-react";

const statCards = [
  {
    title: "Profile Views",
    value: "1,247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Eye,
    description: "This month"
  },
  {
    title: "Messages",
    value: "43",
    change: "+5",
    changeType: "positive" as const,
    icon: MessageSquare,
    description: "Unread messages"
  },
  {
    title: "Active Opportunities",
    value: "12",
    change: "+3",
    changeType: "positive" as const,
    icon: Briefcase,
    description: "Currently bidding"
  },
  {
    title: "New Connections",
    value: "28",
    change: "+8",
    changeType: "positive" as const,
    icon: Users,
    description: "This week"
  }
];

const recentActivities = [
  {
    id: 1,
    type: "message",
    title: "New message from GreenHarvest Ltd",
    description: "Regarding the Agricultural Equipment Opportunity",
    time: "2 hours ago",
    avatar: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    company: "GreenHarvest Ltd"
  },
  {
    id: 2,
    type: "opportunity",
    title: "New opportunity match found",
    description: "IT Infrastructure Development - Lagos State Government",
    time: "4 hours ago",
    avatar: null,
    company: "Lagos State Government"
  },
  {
    id: 3,
    type: "profile",
    title: "Profile viewed by AfricaBuild Corp",
    description: "They're interested in your construction services",
    time: "6 hours ago",
    avatar: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    company: "AfricaBuild Corp"
  },
  {
    id: 4,
    type: "connection",
    title: "Connection request accepted",
    description: "WestPay Financial is now in your network",
    time: "1 day ago",
    avatar: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    company: "WestPay Financial"
  },
  {
    id: 5,
    type: "opportunity",
    title: "Opportunity deadline approaching",
    description: "Solar Panel Installation - Deadline in 2 days",
    time: "1 day ago",
    avatar: null,
    company: "EcoEnergy Solutions"
  }
];

const quickActions = [
  {
    title: "Post New Opportunity",
    description: "Share a business opportunity with the community",
    icon: Plus,
    buttonText: "Create Opportunity",
    buttonColor: "bg-[#004C97] hover:bg-[#003a75]"
  },
  {
    title: "Update Your Profile",
    description: "Keep your business information current and complete",
    icon: Users,
    buttonText: "Edit Profile",
    buttonColor: "bg-[#D4AF37] hover:bg-[#c19b2b]"
  }
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="relative bg-gradient-to-r from-[#004C97] to-[#0066cc] rounded-xl overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Lagos business district"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative p-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16 border-4 border-white">
              <AvatarImage src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" />
              <AvatarFallback className="bg-[#D4AF37] text-[#333333] text-xl font-bold">TN</AvatarFallback>
            </Avatar>
            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, TechNova Solutions!</h1>
              <p className="text-blue-100 text-lg">You have 3 new messages and 2 opportunity matches today.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            <Badge className="bg-white bg-opacity-20 text-white border-0 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Premium Member
            </Badge>
            <Badge className="bg-[#D4AF37] text-[#333333] px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Profile Visibility: High
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280] mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-[#333333] mb-1">{stat.value}</p>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      className={`text-xs px-2 py-0.5 ${
                        stat.changeType === 'positive' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {stat.change}
                    </Badge>
                    <span className="text-xs text-[#6B7280]">{stat.description}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-[#004C97] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-[#004C97]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#333333]">Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" className="text-[#004C97] hover:bg-[#004C97] hover:text-white">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="p-6 hover:bg-[#F5F6FA] transition-colors cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {activity.avatar ? (
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={activity.avatar} />
                            <AvatarFallback className="bg-[#D4AF37] text-[#333333]">
                              {activity.company.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-10 h-10 bg-[#004C97] bg-opacity-10 rounded-full flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-[#004C97]" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#333333] mb-1">{activity.title}</p>
                        <p className="text-sm text-[#6B7280] mb-2">{activity.description}</p>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-[#6B7280]" />
                          <span className="text-xs text-[#6B7280]">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${action.buttonColor} rounded-lg flex items-center justify-center`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">{action.title}</h3>
                <p className="text-sm text-[#6B7280] mb-4">{action.description}</p>
                <Button className={`w-full ${action.buttonColor} text-white`}>
                  {action.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#333333] text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-[#D4AF37] pl-4">
                <h4 className="font-medium text-[#333333] text-sm">West Africa Tech Summit</h4>
                <div className="flex items-center text-xs text-[#6B7280] mt-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  Dec 15, 2024
                </div>
                <div className="flex items-center text-xs text-[#6B7280] mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  Lagos, Nigeria
                </div>
              </div>
              
              <div className="border-l-4 border-[#004C97] pl-4">
                <h4 className="font-medium text-[#333333] text-sm">Supplier Diversity Workshop</h4>
                <div className="flex items-center text-xs text-[#6B7280] mt-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  Dec 20, 2024
                </div>
                <div className="flex items-center text-xs text-[#6B7280] mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  Virtual Event
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full border-[#004C97] text-[#004C97] hover:bg-[#004C97] hover:text-white">
                View All Events
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}