"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";

// Keep your existing constants
const recentActivities = [ /* keep your dummy data */];
const quickActions = [ /* keep your actions */];

// ✅ Inline SVG icon components defined OUTSIDE the main component
const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#004C97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconBriefcase = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#004C97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const IconStar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#004C97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconTrendingUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#004C97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const IconEye = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#004C97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

// ✅ Stat card list defined OUTSIDE component
const STAT_CARD_DEFS = [
  { title: "Users",           key: "users",         Icon: IconUsers },
  { title: "Businesses",      key: "businesses",     Icon: IconBriefcase },
  { title: "Experts",         key: "experts",        Icon: IconStar },
  { title: "Organizations",   key: "organizations",  Icon: IconTrendingUp },
  { title: "Resource Center", key: "resources",      Icon: IconEye },
];

// ✅ Accept onSelectNews prop — same pattern as NewsEventsPage
export function DashboardPage({
  onSelectNews,
}: {
  onSelectNews: (id: number) => void;
}) {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [stats, setStats] = useState<Record<string, number>>({
    users: 0,
    businesses: 0,
    experts: 0,
    organizations: 0,
    resources: 0,
  });
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="space-y-6">

      {/* ── Welcome Banner ── */}
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
              <p className="text-blue-100 text-lg">Below is your dashboard.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {loading
          ? Array(5).fill(0).map((_, idx) => (
              <Card key={idx} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                      <div className="h-6 bg-gray-300 rounded w-16" />
                    </div>
                    <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            ))
          : STAT_CARD_DEFS.map(({ title, key, Icon }) => (
              <Card key={key} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p className="text-sm font-medium text-[#6B7280] mb-1">{title}</p>
                      <p className="text-2xl font-bold text-[#333333]">{stats[key] ?? 0}</p>
                    </div>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      backgroundColor: "rgba(0, 76, 151, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Icon />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* ── News & Events ── */}
      <div>
        <h2 className="text-xl font-bold text-[#333333] mb-4">News & Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.length === 0 ? (
            <p className="text-gray-500">No news available</p>
          ) : (
            news.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-md transition">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <CardContent className="p-4">
                  {/* ✅ Clickable title — calls onSelectNews with the news id */}
                  <h3
                    onClick={() => onSelectNews(item.id)}
                    className="font-semibold text-lg text-[#004C97] mb-2 line-clamp-2 cursor-pointer hover:text-[#0066cc] hover:underline transition"
                  >
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
      </div>

      {/* Keep your existing Recent Activity + Quick Actions here */}
    </div>
  );
}



























// "use client";

// import { useEffect, useState } from "react";
// // import { Button } from "../ui/button";
// import { Card, CardContent } from "../ui/card";
// // import { Badge } from "../ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { ImageWithFallback } from "../figma/ImageWithFallback";
// import {
//   Eye,
//   MessageSquare,
//   Briefcase,
//   Users,
//   TrendingUp,
//   Star
// } from "lucide-react";

// // Keep your existing constants
// const recentActivities = [ /* keep your dummy data */];
// const quickActions = [ /* keep your actions */];

// export function DashboardPage() {
//   const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
//   const [stats, setStats] = useState({
//     users: 0,
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

//   // ✅ Load stats from backend
//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/stats`)
//       .then((res) => res.json())
//       .then((data) => setStats(data))
//       .catch((err) => console.error("Failed to load stats:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   // ✅ Load news from backend
//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/news`)
//       .then((res) => res.json())
//       .then((data) => setNews(data))
//       .catch((err) => console.error("Failed to load news:", err));
//   }, []);

//   const statCards = [
//     { title: "Users", value: stats.users, icon: Eye },
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
//                 Below is your dashboard.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//         {loading
//           ? Array(4).fill(0).map((_, idx) => (
//             <Card key={idx} className="animate-pulse">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
//                     <div className="h-6 bg-gray-300 rounded w-16"></div>
//                   </div>
//                   <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))
//           : statCards.map((stat, index) => (
//             <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-[#6B7280] mb-1">{stat.title}</p>
//                     <p className="text-2xl font-bold text-[#333333] mb-1">{stat.value}</p>
//                   </div>
//                   <div className="w-12 h-12 bg-[#004C97] bg-opacity-10 rounded-lg flex items-center justify-center">
//                     <stat.icon className="w-6 h-6 text-[#004C97]" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//       </div>

//       {/* ✅ News & Events Section */}
//       <div>
//         <h2 className="text-xl font-bold text-[#333333] mb-4">News & Events</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {news.length === 0 ? (
//             <p className="text-gray-500">No news available</p>
//           ) : (
//             news.map((item) => (
//               <Card key={item.id} className="overflow-hidden hover:shadow-md transition">
//                 {item.imageUrl && (
//                   <img
//                     src={item.imageUrl}
//                     alt={item.title}
//                     className="w-full h-40 object-cover"
//                   />
//                 )}
//                 <CardContent className="p-4">
//                   <h3 className="font-semibold text-lg text-[#004C97] mb-2 line-clamp-2">
//                     {item.title}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     {item.timeAgo || item.timestamp || "Recently"} | {item.category || "General"}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Keep your existing Recent Activity + Quick Actions here */}
//     </div>
//   );
// }
