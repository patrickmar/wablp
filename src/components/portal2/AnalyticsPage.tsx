import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  MessageSquare, 
  Briefcase, 
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const profileViewsData = [
  { month: 'Jul', views: 120 },
  { month: 'Aug', views: 189 },
  { month: 'Sep', views: 234 },
  { month: 'Oct', views: 278 },
  { month: 'Nov', views: 356 },
  { month: 'Dec', views: 423 }
];

const messageActivityData = [
  { day: 'Mon', sent: 12, received: 18 },
  { day: 'Tue', sent: 8, received: 15 },
  { day: 'Wed', sent: 15, received: 22 },
  { day: 'Thu', sent: 20, received: 25 },
  { day: 'Fri', sent: 18, received: 20 },
  { day: 'Sat', sent: 5, received: 8 },
  { day: 'Sun', sent: 3, received: 6 }
];

const opportunitySourceData = [
  { name: 'Direct Applications', value: 45, color: '#004C97' },
  { name: 'Profile Views', value: 30, color: '#D4AF37' },
  { name: 'Network Referrals', value: 15, color: '#6B7280' },
  { name: 'Event Connections', value: 10, color: '#F5F6FA' }
];

const sectorEngagementData = [
  { sector: 'Technology', opportunities: 28, responses: 45 },
  { sector: 'Agriculture', opportunities: 15, responses: 32 },
  { sector: 'Construction', opportunities: 12, responses: 28 },
  { sector: 'Fintech', opportunities: 18, responses: 38 },
  { sector: 'Energy', opportunities: 8, responses: 18 }
];

const kpiCards = [
  {
    title: "Total Profile Views",
    value: "12,847",
    change: "+18.2%",
    changeType: "positive" as const,
    icon: Eye,
    description: "Last 30 days",
    detail: "1,423 this month"
  },
  {
    title: "Messages Received",
    value: "247",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: MessageSquare,
    description: "Last 30 days",
    detail: "Response rate: 89%"
  },
  {
    title: "Opportunities Won",
    value: "18",
    change: "+25.0%",
    changeType: "positive" as const,
    icon: Briefcase,
    description: "This quarter",
    detail: "Win rate: 73%"
  },
  {
    title: "Network Growth",
    value: "156",
    change: "-3.2%",
    changeType: "negative" as const,
    icon: Users,
    description: "New connections",
    detail: "This month"
  }
];

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#333333] mb-2">Analytics Overview</h1>
          <p className="text-[#6B7280]">Track your business performance and engagement metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="30">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#004C97] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <kpi.icon className="w-6 h-6 text-[#004C97]" />
                </div>
                <Badge 
                  className={`text-xs px-2 py-1 ${
                    kpi.changeType === 'positive' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {kpi.changeType === 'positive' ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  {kpi.change}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-[#6B7280] mb-1">{kpi.title}</p>
                <p className="text-2xl font-bold text-[#333333] mb-1">{kpi.value}</p>
                <p className="text-xs text-[#6B7280]">{kpi.description}</p>
                <p className="text-xs text-[#004C97] mt-2 font-medium">{kpi.detail}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Views Over Time */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#333333]">Profile Views Over Time</CardTitle>
              <Badge className="bg-green-100 text-green-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18.2%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={profileViewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#004C97" 
                  strokeWidth={3}
                  dot={{ fill: '#004C97', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#D4AF37' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Message Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#333333]">Weekly Message Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={messageActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="sent" fill="#004C97" name="Sent" radius={[2, 2, 0, 0]} />
                <Bar dataKey="received" fill="#D4AF37" name="Received" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Opportunity Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#333333]">Opportunity Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={opportunitySourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {opportunitySourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {opportunitySourceData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-[#6B7280]">{item.name}</span>
                  <span className="text-sm font-medium text-[#333333]">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sector Engagement */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#333333]">Sector Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectorEngagementData.map((sector, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#333333]">{sector.sector}</span>
                    <div className="flex items-center space-x-4 text-sm text-[#6B7280]">
                      <span>{sector.opportunities} ops</span>
                      <span>{sector.responses} responses</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#004C97] h-2 rounded-full" 
                      style={{ width: `${(sector.responses / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#333333]">Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-[#004C97] rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-[#004C97]">Growing Visibility</h4>
              </div>
              <p className="text-sm text-[#6B7280]">
                Your profile views increased by 18% this month. Consider updating your services to capitalize on this trend.
              </p>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-[#D4AF37]">High Engagement</h4>
              </div>
              <p className="text-sm text-[#6B7280]">
                Your response rate is 89%, well above average. Maintain this excellent communication standard.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-green-600">Peak Activity</h4>
              </div>
              <p className="text-sm text-[#6B7280]">
                Thursdays show highest message activity. Schedule important communications on this day.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}