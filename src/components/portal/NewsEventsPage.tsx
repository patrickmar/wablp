"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type NewsItem = {
  id: number;
  imageUrl: string | null;
  status: string;
  tags: string;
  timestamp: string;
  title: string;
};

// ✅ helper function for relative time
function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "just now";
}

// ✅ decode HTML entities (fixes â€œ and similar issues)
function decodeHtmlEntities(str: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export default function NewsEventsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [tag, setTag] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // 👈 items per page

  useEffect(() => {
    fetch("http://localhost:5000/routes/newsfull") // Adjust to your API endpoint
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error(err));
  }, []);

  // Collect unique tags
  const uniqueTags = Array.from(
    new Set(
      news.flatMap((n) =>
        n.tags ? n.tags.split(",").map((t) => t.trim()).filter(Boolean) : []
      )
    )
  );

  // Apply filters
  const filteredNews = news.filter((item) => {
    let matches: boolean = true;

    if (search) {
      matches =
        matches &&
        item.title.toLowerCase().includes(search.toLowerCase());
    }

    if (status !== "all") {
      matches = matches && item.status === status;
    }

    if (tag !== "all") {
      matches =
        matches &&
        !!item.tags &&
        item.tags.toLowerCase().includes(tag.toLowerCase());
    }

    return matches;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / pageSize);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Status Badge Helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return (
          <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
            Published
          </span>
        );
      case "DRAFT":
        return (
          <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full">
            Draft
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* ✅ News & Events Heading */}
      <h2 className="text-2xl font-bold text-gray-800">News & Events</h2>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset page when filtering
          }}
        />

        {/* Status Filter */}
        <Select
          value={status}
          onValueChange={(val) => {
            setStatus(val);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
          </SelectContent>
        </Select>

        {/* Tag Filter */}
        <Select
          value={tag}
          onValueChange={(val) => {
            setTag(val);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {uniqueTags.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedNews.map((item) => (
          <Card key={item.id} className="rounded-2xl shadow-md overflow-hidden">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
            )}
            <CardHeader>
              {/* ✅ decode the title to fix broken characters */}
              <CardTitle className="text-lg font-bold text-blue-600 hover:text-blue-800 transition">
                {decodeHtmlEntities(item.title)}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              {/* ✅ relative time like "9 months ago | News" */}
              <p className="text-xs text-gray-500">
                {timeAgo(item.timestamp)} | News
              </p>

              <div>{getStatusBadge(item.status)}</div>
              <p>
                <span className="font-semibold">Tags:</span> {item.tags}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}








// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// type NewsItem = {
//   id: number;
//   imageUrl: string | null;
//   status: string;
//   tags: string;
//   timestamp: string;
//   title: string;
// };

// export default function NewsEventsPage() {
//   const [news, setNews] = useState<NewsItem[]>([]);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("all");
//   const [tag, setTag] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 6; // 👈 items per page

//   useEffect(() => {
//     fetch("http://localhost:5000/routes/newsfull") // Adjust to your API endpoint
//       .then((res) => res.json())
//       .then((data) => setNews(data))
//       .catch((err) => console.error(err));
//   }, []);

//   // Collect unique tags
//   const uniqueTags = Array.from(
//     new Set(
//       news.flatMap((n) =>
//         n.tags ? n.tags.split(",").map((t) => t.trim()).filter(Boolean) : []
//       )
//     )
//   );

//   // Apply filters
//   const filteredNews = news.filter((item) => {
//     let matches: boolean = true;

//     if (search) {
//       matches =
//         matches &&
//         item.title.toLowerCase().includes(search.toLowerCase());
//     }

//     if (status !== "all") {
//       matches = matches && item.status === status;
//     }

//     if (tag !== "all") {
//       matches =
//         matches &&
//         !!item.tags &&
//         item.tags.toLowerCase().includes(tag.toLowerCase());
//     }

//     return matches;
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredNews.length / pageSize);
//   const paginatedNews = filteredNews.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   // Status Badge Helper
//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "PUBLISHED":
//         return (
//           <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
//             Published
//           </span>
//         );
//       case "DRAFT":
//         return (
//           <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full">
//             Draft
//           </span>
//         );
//       default:
//         return (
//           <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
//             {status}
//           </span>
//         );
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Filters Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {/* Search */}
//         <Input
//           placeholder="Search by title..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1); // reset page when filtering
//           }}
//         />

//         {/* Status Filter */}
//         <Select
//           value={status}
//           onValueChange={(val) => {
//             setStatus(val);
//             setCurrentPage(1);
//           }}
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Filter by Status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Status</SelectItem>
//             <SelectItem value="PUBLISHED">Published</SelectItem>
//             <SelectItem value="DRAFT">Draft</SelectItem>
//           </SelectContent>
//         </Select>

//         {/* Tag Filter */}
//         <Select
//           value={tag}
//           onValueChange={(val) => {
//             setTag(val);
//             setCurrentPage(1);
//           }}
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Filter by Tag" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Tags</SelectItem>
//             {uniqueTags.map((t) => (
//               <SelectItem key={t} value={t}>
//                 {t}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* News Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {paginatedNews.map((item) => (
//           <Card key={item.id} className="rounded-2xl shadow-md overflow-hidden">
//             {item.imageUrl && (
//               <img
//                 src={item.imageUrl}
//                 alt={item.title}
//                 className="w-full h-40 object-cover"
//               />
//             )}
//             <CardHeader>
//               <CardTitle className="text-lg font-bold text-blue-600 hover:text-blue-800 transition">
//                 {item.title}
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="text-sm text-gray-600 space-y-2">
//               <div>{getStatusBadge(item.status)}</div>
//               <p>
//                 <span className="font-semibold">Tags:</span> {item.tags}
//               </p>
//               <p>
//                 <span className="font-semibold">Date:</span>{" "}
//                 {new Date(item.timestamp).toLocaleDateString()}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-center gap-2 mt-6">
//           <Button
//             variant="outline"
//             size="sm"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => p - 1)}
//           >
//             Prev
//           </Button>

//           {Array.from({ length: totalPages }, (_, i) => (
//             <Button
//               key={i + 1}
//               variant={currentPage === i + 1 ? "default" : "outline"}
//               size="sm"
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </Button>
//           ))}

//           <Button
//             variant="outline"
//             size="sm"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => p + 1)}
//           >
//             Next
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }
















// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Input } from "../ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { ImageWithFallback } from "../figma/ImageWithFallback";
// import { 
//   Search, 
//   Filter, 
//   Calendar, 
//   Grid3x3, 
//   List, 
//   Clock, 
//   MapPin, 
//   Users, 
//   ExternalLink,
//   Bookmark,
//   Share2,
//   Eye,
//   MessageSquare,
//   Heart
// } from "lucide-react";

// const newsItems = [
//   {
//     id: 1,
//     title: "West Africa Digital Trade Summit 2024 Announces Major Partnerships",
//     excerpt: "Leading businesses across West Africa announce groundbreaking partnerships to enhance digital trade infrastructure.",
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
//     category: "Business",
//     author: "WABLP Editorial",
//     publishedAt: "2 hours ago",
//     readTime: "3 min read",
//     views: 1247,
//     likes: 89,
//     comments: 23,
//     tags: ["Digital Trade", "Partnerships", "Summit"]
//   },
//   {
//     id: 2,
//     title: "Nigeria's Tech Sector Shows Remarkable Growth in Q4 2024",
//     excerpt: "New report reveals 45% growth in Nigerian tech startups, with significant investments from regional partners.",
//     image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
//     category: "Technology",
//     author: "Adanna Okoye",
//     publishedAt: "4 hours ago",
//     readTime: "5 min read",
//     views: 892,
//     likes: 67,
//     comments: 15,
//     tags: ["Nigeria", "Tech Growth", "Startups"]
//   },
//   {
//     id: 3,
//     title: "Ghana's Renewable Energy Initiative Attracts International Investment",
//     excerpt: "Major renewable energy project in Ghana secures $500M funding from international development banks.",
//     image: "https://images.unsplash.com/photo-1497436072909-f5e4be5b12ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
//     category: "Energy",
//     author: "Kwame Asante",
//     publishedAt: "1 day ago",
//     readTime: "4 min read",
//     views: 654,
//     likes: 45,
//     comments: 12,
//     tags: ["Ghana", "Renewable Energy", "Investment"]
//   },
//   {
//     id: 4,
//     title: "ECOWAS Trade Agreement Simplifies Cross-Border Commerce",
//     excerpt: "New trade regulations make it easier for businesses to operate across West African borders.",
//     image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
//     category: "Trade",
//     author: "Ibrahim Diallo",
//     publishedAt: "2 days ago",
//     readTime: "6 min read",
//     views: 1123,
//     likes: 78,
//     comments: 34,
//     tags: ["ECOWAS", "Trade", "Cross-Border"]
//   }
// ];

// const events = [
//   {
//     id: 1,
//     title: "West Africa Fintech Conference 2024",
//     description: "Join leading fintech companies and investors for two days of networking and insights.",
//     date: "2024-12-15",
//     time: "09:00 AM",
//     location: "Lagos, Nigeria",
//     type: "Conference",
//     attendees: 250,
//     price: "Free",
//     status: "upcoming",
//     organizer: "West Africa Fintech Association",
//     image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
//   },
//   {
//     id: 2,
//     title: "Sustainable Agriculture Workshop",
//     description: "Learn about sustainable farming practices and connect with agricultural technology providers.",
//     date: "2024-12-18",
//     time: "02:00 PM",
//     location: "Accra, Ghana",
//     type: "Workshop",
//     attendees: 75,
//     price: "$50",
//     status: "upcoming",
//     organizer: "Ghana Agriculture Council",
//     image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
//   },
//   {
//     id: 3,
//     title: "Digital Marketing Masterclass",
//     description: "Master digital marketing strategies for West African markets with industry experts.",
//     date: "2024-12-20",
//     time: "10:00 AM",
//     location: "Virtual Event",
//     type: "Webinar",
//     attendees: 500,
//     price: "Free",
//     status: "upcoming",
//     organizer: "WABLP Training Institute",
//     image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
//   },
//   {
//     id: 4,
//     title: "Cross-Border Trade Summit",
//     description: "Explore opportunities in cross-border trade and meet potential partners.",
//     date: "2024-12-22",
//     time: "09:00 AM",
//     location: "Abidjan, Côte d'Ivoire",
//     type: "Summit",
//     attendees: 300,
//     price: "$100",
//     status: "upcoming",
//     organizer: "West Africa Trade Council",
//     image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
//   }
// ];

// const getCategoryColor = (category: string) => {
//   const colors = {
//     Business: "bg-blue-100 text-blue-700",
//     Technology: "bg-purple-100 text-purple-700",
//     Energy: "bg-green-100 text-green-700",
//     Trade: "bg-orange-100 text-orange-700"
//   };
//   return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
// };

// const getEventTypeColor = (type: string) => {
//   const colors = {
//     Conference: "bg-[#004C97] text-white",
//     Workshop: "bg-[#D4AF37] text-[#333333]",
//     Webinar: "bg-green-500 text-white",
//     Summit: "bg-purple-500 text-white"
//   };
//   return colors[type as keyof typeof colors] || "bg-gray-500 text-white";
// };

// export function NewsEventsPage() {
//   const [activeTab, setActiveTab] = useState("news");
//   const [newsFilter, setNewsFilter] = useState("all");
//   const [eventView, setEventView] = useState("grid");
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredNews = newsItems.filter(item => {
//     const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = newsFilter === "all" || item.category === newsFilter;
//     return matchesSearch && matchesCategory;
//   });

//   const filteredEvents = events.filter(event => 
//     event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     event.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold text-[#333333] mb-2">News & Events</h1>
//           <p className="text-[#6B7280]">Stay updated with the latest news and upcoming events in West Africa</p>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
//               <Input
//                 placeholder="Search news and events..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 focus:ring-2 focus:ring-[#004C97]"
//               />
//             </div>
            
//             {activeTab === "news" && (
//               <Select value={newsFilter} onValueChange={setNewsFilter}>
//                 <SelectTrigger className="w-40">
//                   <SelectValue placeholder="Category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Categories</SelectItem>
//                   <SelectItem value="Business">Business</SelectItem>
//                   <SelectItem value="Technology">Technology</SelectItem>
//                   <SelectItem value="Energy">Energy</SelectItem>
//                   <SelectItem value="Trade">Trade</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
            
//             {activeTab === "events" && (
//               <div className="flex gap-2">
//                 <Button
//                   variant={eventView === "grid" ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setEventView("grid")}
//                   className={eventView === "grid" ? "bg-[#004C97] text-white" : ""}
//                 >
//                   <Grid3x3 className="w-4 h-4 mr-1" />
//                   Grid
//                 </Button>
//                 <Button
//                   variant={eventView === "list" ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setEventView("list")}
//                   className={eventView === "list" ? "bg-[#004C97] text-white" : ""}
//                 >
//                   <List className="w-4 h-4 mr-1" />
//                   List
//                 </Button>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Tabs */}
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="news" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
//             News ({filteredNews.length})
//           </TabsTrigger>
//           <TabsTrigger value="events" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
//             Events ({filteredEvents.length})
//           </TabsTrigger>
//         </TabsList>

//         {/* News Content */}
//         <TabsContent value="news" className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredNews.map((article) => (
//               <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
//                 <div className="relative">
//                   <ImageWithFallback
//                     src={article.image}
//                     alt={article.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <Badge className={`absolute top-3 left-3 ${getCategoryColor(article.category)}`}>
//                     {article.category}
//                   </Badge>
//                   <Button 
//                     variant="ghost" 
//                     size="sm" 
//                     className="absolute top-3 right-3 bg-white bg-opacity-80 hover:bg-white"
//                   >
//                     <Bookmark className="w-4 h-4" />
//                   </Button>
//                 </div>
                
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-2 text-sm text-[#6B7280] mb-3">
//                     <span>{article.author}</span>
//                     <span>•</span>
//                     <span>{article.publishedAt}</span>
//                     <span>•</span>
//                     <span>{article.readTime}</span>
//                   </div>
                  
//                   <h3 className="text-lg font-semibold text-[#333333] mb-2 line-clamp-2 hover:text-[#004C97] cursor-pointer">
//                     {article.title}
//                   </h3>
                  
//                   <p className="text-[#6B7280] text-sm mb-4 line-clamp-3">
//                     {article.excerpt}
//                   </p>
                  
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {article.tags.map((tag, index) => (
//                       <Badge key={index} variant="outline" className="text-xs">
//                         {tag}
//                       </Badge>
//                     ))}
//                   </div>
                  
//                   <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                     <div className="flex items-center space-x-4 text-sm text-[#6B7280]">
//                       <div className="flex items-center space-x-1">
//                         <Eye className="w-4 h-4" />
//                         <span>{article.views}</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <Heart className="w-4 h-4" />
//                         <span>{article.likes}</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <MessageSquare className="w-4 h-4" />
//                         <span>{article.comments}</span>
//                       </div>
//                     </div>
                    
//                     <Button variant="ghost" size="sm">
//                       <Share2 className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>

//         {/* Events Content */}
//         <TabsContent value="events" className="space-y-6">
//           {eventView === "grid" ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredEvents.map((event) => (
//                 <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
//                   <div className="relative">
//                     <ImageWithFallback
//                       src={event.image}
//                       alt={event.title}
//                       className="w-full h-48 object-cover"
//                     />
//                     <Badge className={`absolute top-3 left-3 ${getEventTypeColor(event.type)}`}>
//                       {event.type}
//                     </Badge>
//                     <Badge className="absolute top-3 right-3 bg-[#D4AF37] text-[#333333]">
//                       {event.price}
//                     </Badge>
//                   </div>
                  
//                   <CardContent className="p-6">
//                     <h3 className="text-lg font-semibold text-[#333333] mb-2 hover:text-[#004C97] cursor-pointer">
//                       {event.title}
//                     </h3>
                    
//                     <p className="text-[#6B7280] text-sm mb-4 line-clamp-2">
//                       {event.description}
//                     </p>
                    
//                     <div className="space-y-2 mb-4">
//                       <div className="flex items-center text-sm text-[#6B7280]">
//                         <Calendar className="w-4 h-4 mr-2" />
//                         {new Date(event.date).toLocaleDateString()} at {event.time}
//                       </div>
//                       <div className="flex items-center text-sm text-[#6B7280]">
//                         <MapPin className="w-4 h-4 mr-2" />
//                         {event.location}
//                       </div>
//                       <div className="flex items-center text-sm text-[#6B7280]">
//                         <Users className="w-4 h-4 mr-2" />
//                         {event.attendees} attendees
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                       <span className="text-sm text-[#6B7280]">by {event.organizer}</span>
//                       <Button size="sm" className="bg-[#004C97] text-white hover:bg-[#003a75]">
//                         Register
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {filteredEvents.map((event) => (
//                 <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300">
//                   <CardContent className="p-6">
//                     <div className="flex items-start space-x-4">
//                       <div className="flex-shrink-0">
//                         <ImageWithFallback
//                           src={event.image}
//                           alt={event.title}
//                           className="w-24 h-24 object-cover rounded-lg"
//                         />
//                       </div>
                      
//                       <div className="flex-1">
//                         <div className="flex items-start justify-between mb-2">
//                           <div className="flex items-center space-x-2">
//                             <h3 className="text-lg font-semibold text-[#333333] hover:text-[#004C97] cursor-pointer">
//                               {event.title}
//                             </h3>
//                             <Badge className={getEventTypeColor(event.type)}>
//                               {event.type}
//                             </Badge>
//                           </div>
//                           <Badge className="bg-[#D4AF37] text-[#333333]">
//                             {event.price}
//                           </Badge>
//                         </div>
                        
//                         <p className="text-[#6B7280] text-sm mb-3">
//                           {event.description}
//                         </p>
                        
//                         <div className="flex items-center space-x-6 text-sm text-[#6B7280] mb-3">
//                           <div className="flex items-center">
//                             <Calendar className="w-4 h-4 mr-1" />
//                             {new Date(event.date).toLocaleDateString()} at {event.time}
//                           </div>
//                           <div className="flex items-center">
//                             <MapPin className="w-4 h-4 mr-1" />
//                             {event.location}
//                           </div>
//                           <div className="flex items-center">
//                             <Users className="w-4 h-4 mr-1" />
//                             {event.attendees} attendees
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm text-[#6B7280]">by {event.organizer}</span>
//                           <div className="flex space-x-2">
//                             <Button variant="outline" size="sm">
//                               <ExternalLink className="w-4 h-4 mr-1" />
//                               Details
//                             </Button>
//                             <Button size="sm" className="bg-[#004C97] text-white hover:bg-[#003a75]">
//                               Register
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }