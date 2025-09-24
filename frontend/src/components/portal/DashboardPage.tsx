// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { Card, CardContent } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { ImageWithFallback } from "../figma/ImageWithFallback";
// import { Eye, MessageSquare, Briefcase, Users, TrendingUp, Star } from "lucide-react";

// // Keep your existing constants
// const recentActivities = [ /* keep your dummy data */ ];
// const quickActions = [ /* keep your actions */ ];

// export function DashboardPage() {
//   const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
//   const [stats, setStats] = useState({
//     businesses: 0,
//     experts: 0,
//     organizations: 0,
//     resources: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   // ✅ NEW: state for news
//   const [news, setNews] = useState<any[]>([]);

//   // ✅ Load user safely
//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) setUser(JSON.parse(storedUser));
//     } catch (err) {
//       console.error("Invalid user JSON in localStorage", err);
//       setUser(null);
//     }
//   }, []);

//   // ✅ Base URL for API
//   const API_BASE =
//     process.env.NEXT_PUBLIC_API_BASE_URL ||
//     process.env.NEXT_PUBLIC_API_URL ||
//     "http://localhost:5000";

//   // ✅ Load stats from backend
//   useEffect(() => {
//     fetch(`${API_BASE}/routes/stats`)
//       .then((res) => {
//         if (!res.ok) throw new Error(`Stats failed: ${res.status}`);
//         return res.json();
//       })
//       .then((data) => setStats(data))
//       .catch((err) => console.error("Failed to load stats:", err))
//       .finally(() => setLoading(false));
//   }, [API_BASE]);

//   // ✅ Load news from backend
//   useEffect(() => {
//     fetch(`${API_BASE}/routes/news`)
//       .then((res) => {
//         if (!res.ok) throw new Error(`News failed: ${res.status}`);
//         return res.json();
//       })
//       .then((data) => setNews(data))
//       .catch((err) => console.error("Failed to load news:", err));
//   }, [API_BASE]);

//   const statCards = [
//     { title: "Businesses", value: stats.businesses, icon: Eye },
//     { title: "Experts", value: stats.experts, icon: MessageSquare },
//     { title: "Organizations", value: stats.organizations, icon: Briefcase },
//     { title: "Resource Center", value: stats.resources, icon: Users },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="relative bg-gradient-to-r from-[#004C97] to-[#0066cc] rounded-xl overflow-hidden">
//         <div className="absolute inset-0">
//           <ImageWithFallback
//             src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
//             alt="Lagos business district"
//             className="w-full h-full object-cover opacity-20"
//           />
//         </div>
//         <div className="relative p-8">
//           <div className="flex items-center space-x-4 mb-4">
//             <Avatar className="w-16 h-16 border-4 border-white">
//               <AvatarImage src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" />
//               <AvatarFallback className="bg-[#D4AF37] text-[#333333] text-xl font-bold">
//                 {user?.name ? user.name.slice(0, 2).toUpperCase() : "U"}
//               </AvatarFallback>
//             </Avatar>
//             <div className="text-white">
//               <h1 className="text-2xl md:text-3xl font-bold mb-2">
//                 Welcome back{user?.name ? `, ${user.name}!` : "!"}
//               </h1>
//               <p className="text-blue-100 text-lg">
//                 You have 3 new messages and 2 opportunity matches today.
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-4 mt-6">
//             <Badge className="bg-white bg-opacity-20 text-white border-0 px-4 py-2">
//               <Star className="w-4 h-4 mr-2" />
//               Premium Member
//             </Badge>
//             <Badge className="bg-[#D4AF37] text-[#333333] px-4 py-2">
//               <TrendingUp className="w-4 h-4 mr-2" />
//               Profile Visibility: High
//             </Badge>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {loading
//           ? Array(4)
//               .fill(0)
//               .map((_, idx) => (
//                 <Card key={idx} className="animate-pulse">
//                   <CardContent className="p-6">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
//                         <div className="h-6 bg-gray-300 rounded w-16"></div>
//                       </div>
//                       <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))
//           : statCards.map((stat, index) => (
//               <Card
//                 key={index}
//                 className="hover:shadow-lg transition-shadow duration-300"
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm font-medium text-[#6B7280] mb-1">
//                         {stat.title}
//                       </p>
//                       <p className="text-2xl font-bold text-[#333333] mb-1">
//                         {stat.value}
//                       </p>
//                     </div>
//                     <div className="w-12 h-12 bg-[#004C97] bg-opacity-10 rounded-lg flex items-center justify-center">
//                       <stat.icon className="w-6 h-6 text-[#004C97]" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//       </div>

//       {/* ✅ News & Events Section */}
//       <div>
//         <h2 className="text-xl font-bold text-[#333333] mb-4">News & Events</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {news.length === 0 ? (
//             <p className="text-gray-500">No news available</p>
//           ) : (
//             news.map((item) => (
//               <Card
//                 key={item.id}
//                 className="overflow-hidden hover:shadow-md transition"
//               >
//                 {item.imageUrl && (
//                   <img
//                     src={item.imageUrl} // ✅ trust backend-provided absolute URL
//                     alt={item.title}
//                     className="w-full h-40 object-cover"
//                     onError={(e) => {
//                       (e.currentTarget as HTMLImageElement).src =
//                         `${API_BASE}/uploads/default.jpg`;
//                     }}
//                   />
//                 )}
//                 <CardContent className="p-4">
//                   <h3 className="font-semibold text-lg text-[#004C97] mb-2 line-clamp-2">
//                     {item.title}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     {item.timeAgo || item.timestamp || "Recently"} |{" "}
//                     {item.category || "General"}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }














"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Eye,
  MessageSquare,
  Briefcase,
  Users,
  TrendingUp,
  Star
} from "lucide-react";

// Keep your existing constants
const recentActivities = [ /* keep your dummy data */];
const quickActions = [ /* keep your actions */];

export function DashboardPage() {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [stats, setStats] = useState({
    businesses: 0,
    experts: 0,
    organizations: 0,
    resources: 0,
  });
  const [loading, setLoading] = useState(true);

  // ✅ NEW: state for news
  const [news, setNews] = useState<any[]>([]);

  // ✅ Load user safely
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Invalid user JSON in localStorage", err);
      setUser(null);
    }
  }, []);

  // ✅ Load stats from backend
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to load stats:", err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Load news from backend
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/news`)
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Failed to load news:", err));
  }, []);

  const statCards = [
    { title: "Businesses", value: stats.businesses, icon: Eye },
    { title: "Experts", value: stats.experts, icon: MessageSquare },
    { title: "Organizations", value: stats.organizations, icon: Briefcase },
    { title: "Resource Center", value: stats.resources, icon: Users },
  ];

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
              <AvatarFallback className="bg-[#D4AF37] text-[#333333] text-xl font-bold">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome back{user?.name ? `, ${user.name}!` : "!"}
              </h1>
              <p className="text-blue-100 text-lg">
                You have 3 new messages and 2 opportunity matches today.
              </p>
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
        {loading
          ? Array(4).fill(0).map((_, idx) => (
            <Card key={idx} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                </div>
              </CardContent>
            </Card>
          ))
          : statCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#6B7280] mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-[#333333] mb-1">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#004C97] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-[#004C97]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* ✅ News & Events Section */}


      {/* ✅ News & Events Section */}
      <div>
        <h2 className="text-xl font-bold text-[#333333] mb-4">News & Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.length === 0 ? (
            <p className="text-gray-500">No news available</p>
          ) : (
            news.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={item.image?.externalUrl || "/uploads/default.jpg"}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/uploads/default.jpg";
                  }}
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-[#004C97] mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.timeAgo || item.timestamp || "Recently"} |{" "}
                    {item.category || "General"}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>





      {/* LOCAL */}
      {/* <div>
        <h2 className="text-xl font-bold text-[#333333] mb-4">News & Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.length === 0 ? (
            <p className="text-gray-500">No news available</p>
          ) : (
            news.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-md transition">
                {item.imageUrl && (

                  <img
                    src={item.image.localUrl}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        item.image.externalUrl || item.image.fallback;
                    }}
                  />

                  // <img
                  //   src={item.imageUrl}
                  //   alt={item.title}
                  //   className="w-full h-40 object-cover"
                  //   onError={(e) => {
                  //       (e.currentTarget as HTMLImageElement).src =
                  //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/default.jpg`;
                  //     }}
                  // />
                )}
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-[#004C97] mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.timeAgo || item.timestamp || "Recently"} | {item.category || "General"}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div> */}

      {/* Keep your existing Recent Activity + Quick Actions here */}
    </div>
  );
}
