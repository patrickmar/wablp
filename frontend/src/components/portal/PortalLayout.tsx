"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  User,
  Users,
  Briefcase,
  GraduationCap,
  VideoIcon,
  Handshake,
  FolderKanban,
  Landmark,
  Building2,
  ShoppingCart,
  ClipboardList,
  Package,
  BookOpen,
  Notebook,
  Bell,
  Search,
  Settings,
  LogOut,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

interface PortalLayoutProps {
  activePage: string;
  onNavigate: (page: string) => void;
  children: ReactNode;
}

export function PortalLayout({
  activePage,
  onNavigate,
  children,
}: PortalLayoutProps) {
  const sections = [
    {
      heading: "Main",
      items: [
        { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { key: "news", label: "News & Events", icon: Newspaper },
        { key: "profile", label: "My Profile", icon: User },
      ],
    },
    {
      heading: "Community",
      items: [
        {
          key: "community",
          label: "Community Members",
          icon: Users,
          children: [
            { key: "businesses", label: "Businesses", icon: Building2 },
            { key: "organizations", label: "Organizations", icon: Landmark },
            { key: "experts", label: "Experts", icon: User },
          ],
        },
      ],
    },
    {
      heading: "Opportunities",
      items: [
        { key: "jobs", label: "Jobs", icon: Briefcase },
        {
          key: "training",
          label: "Training",
          icon: GraduationCap,
          children: [{ key: "webinars", label: "Webinars", icon: VideoIcon }],
        },
        {
          key: "deals",
          label: "Deals",
          icon: Handshake,
          children: [
            { key: "tenders", label: "Tenders", icon: FolderKanban },
            { key: "projects", label: "WABLP Projects", icon: Notebook },
          ],
        },
      ],
    },
    {
      heading: "Directories",
      items: [{ key: "catalogue", label: "Members Catalogue", icon: BookOpen }],
    },
    {
      heading: "Orders",
      items: [
        {
          key: "orders",
          label: "Orders",
          icon: ShoppingCart,
          children: [
            { key: "myorders", label: "My Orders", icon: ClipboardList },
            { key: "sellerorders", label: "Seller Orders", icon: Package },
          ],
        },
      ],
    },
  ];

  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    sections.forEach((section) =>
      section.items.forEach((item) => {
        if (
          item.children &&
          item.children.some((child) => child.key === activePage)
        ) {
          setExpanded(item.key);
        }
      })
    );
  }, [activePage]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Invalid user JSON:", err);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/sign-in");
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#F0F4F8" }}>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-[56px] bottom-0 left-0 z-50 w-64 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{ backgroundColor: "#004C97", borderRight: "1px solid #003a75" }}
      >
        {/* Sidebar Header */}
        <div
          className="p-4 flex items-center gap-2"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            background: "linear-gradient(135deg, #003a75, #004C97)",
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: "#D4AF37", color: "#003a75" }}
          >
            W
          </div>
          <span className="font-bold text-white text-sm">WABLP Portal</span>
        </div>

        {/* Nav Items */}
        <nav className="p-3 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
          {sections.map((section) => (
            <div key={section.heading}>
              {/* Section Heading */}
              <div
                className="px-2 text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {section.heading}
              </div>

              <div className="space-y-1">
                {section.items.map(({ key, label, icon: Icon, children }) => {
                  const isExpanded = expanded === key;
                  const isActive = activePage === key;

                  return (
                    <div key={key}>
                      <button
                        className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-all duration-200"
                        style={{
                          backgroundColor: isActive
                            ? "rgba(212, 175, 55, 0.25)"
                            : "transparent",
                          color: isActive ? "#D4AF37" : "rgba(255,255,255,0.85)",
                          borderLeft: isActive
                            ? "3px solid #D4AF37"
                            : "3px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                              "rgba(255,255,255,0.1)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                              "transparent";
                          }
                        }}
                        onClick={() =>
                          children
                            ? setExpanded(isExpanded ? null : key)
                            : onNavigate(key)
                        }
                      >
                        <span className="flex items-center gap-3">
                          {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                          <span className="text-sm font-medium">{label}</span>
                        </span>
                        {children &&
                          (isExpanded ? (
                            <ChevronDown className="w-4 h-4 opacity-60" />
                          ) : (
                            <ChevronRight className="w-4 h-4 opacity-60" />
                          ))}
                      </button>

                      {/* Children */}
                      {children && isExpanded && (
                        <div className="ml-4 mt-1 space-y-1 pl-3"
                          style={{ borderLeft: "1px solid rgba(255,255,255,0.2)" }}
                        >
                          {children.map(({ key: childKey, label: childLabel, icon: ChildIcon }) => {
                            const isChildActive = activePage === childKey;
                            return (
                              <button
                                key={childKey}
                                className="flex items-center w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200"
                                style={{
                                  backgroundColor: isChildActive
                                    ? "rgba(212, 175, 55, 0.25)"
                                    : "transparent",
                                  color: isChildActive
                                    ? "#D4AF37"
                                    : "rgba(255,255,255,0.75)",
                                  borderLeft: isChildActive
                                    ? "2px solid #D4AF37"
                                    : "2px solid transparent",
                                }}
                                onMouseEnter={(e) => {
                                  if (!isChildActive) {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                                      "rgba(255,255,255,0.1)";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isChildActive) {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                                      "transparent";
                                  }
                                }}
                                onClick={() => {
                                  onNavigate(childKey);
                                  setSidebarOpen(false);
                                }}
                              >
                                {ChildIcon && <ChildIcon className="w-4 h-4 mr-2 flex-shrink-0" />}
                                {childLabel}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col md:ml-64">

        {/* ── Top Navbar ── */}
        <header
          className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 md:px-6 h-[56px] z-50"
          style={{
            background: "linear-gradient(90deg, #003a75 0%, #004C97 60%, #0066cc 100%)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {/* Left — mobile menu + search */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-md transition"
              style={{ color: "white" }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo text for desktop */}
            <div className="flex items-center">
            <img
              src="/logo.png"
              alt="WABLP Logo"
              className="w-60 h-10 object-contain"
            />
          </div>
          </div>

          {/* Right — bell + user */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              className="relative p-2 rounded-full transition"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <Bell className="w-5 h-5" style={{ color: "white" }} />
              <span
                className="absolute top-1 right-1 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold"
                style={{ backgroundColor: "#D4AF37", color: "#003a75", fontSize: "10px" }}
              >
                3
              </span>
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-lg transition"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                onClick={() => setOpen(!open)}
              >
                {/* Avatar circle with initials */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: "#D4AF37", color: "#003a75" }}
                >
                  {getUserInitials()}
                </div>
                <span className="hidden sm:block text-sm font-medium" style={{ color: "white" }}>
                  {user ? user.name : "Loading..."}
                </span>
                <ChevronDown className="w-4 h-4 hidden sm:block" style={{ color: "rgba(255,255,255,0.7)" }} />
              </div>

              {/* Dropdown Menu */}
              {open && (
                <div
                  className="absolute right-0 mt-2 w-44 rounded-xl border py-1 z-50"
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    borderColor: "#e5e7eb",
                  }}
                >
                  {/* User info header */}
                  <div className="px-4 py-2 border-b" style={{ borderColor: "#f3f4f6" }}>
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{user?.email || ""}</p>
                  </div>

                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition"
                    onClick={() => { setOpen(false); onNavigate("profile"); }}
                  >
                    <User className="w-4 h-4 mr-2" style={{ color: "#004C97" }} />
                    Profile
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition"
                    onClick={() => { setOpen(false); alert("Settings clicked"); }}
                  >
                    <Settings className="w-4 h-4 mr-2" style={{ color: "#004C97" }} />
                    Settings
                  </button>
                  <div className="border-t my-1" style={{ borderColor: "#f3f4f6" }} />
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-red-50 transition"
                    style={{ color: "#dc2626" }}
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 p-4 md:p-6 mt-[56px]">
          {children}
        </main>
      </div>
    </div>
  );
}




























// "use client";

// import { ReactNode, useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   LayoutDashboard,
//   Newspaper,
//   User,
//   Users,
//   Briefcase,
//   GraduationCap,
//   VideoIcon,
//   Handshake,
//   FolderKanban,
//   Landmark,
//   Building2,
//   ShoppingCart,
//   ClipboardList,
//   Package,
//   BookOpen,
//   Notebook,
//   Bell,
//   Search,
//   Settings,
//   LogOut,
//   ChevronRight,
//   ChevronDown,
//   Menu,
//   X,
// } from "lucide-react";

// interface PortalLayoutProps {
//   activePage: string;
//   onNavigate: (page: string) => void;
//   children: ReactNode;
// }

// export function PortalLayout({
//   activePage,
//   onNavigate,
//   children,
// }: PortalLayoutProps) {
//   const sections = [
//     {
//       heading: "Main",
//       items: [
//         { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//         { key: "news", label: "News & Events", icon: Newspaper },
//         { key: "profile", label: "My Profile", icon: User },
//       ],
//     },
//     {
//       heading: "Community",
//       items: [
//         {
//           key: "community",
//           label: "Community Members",
//           icon: Users,
//           children: [
//             { key: "businesses", label: "Businesses", icon: Building2 },
//             { key: "organizations", label: "Organizations", icon: Landmark },
//             { key: "experts", label: "Experts", icon: User },
//           ],
//         },
//       ],
//     },
//     {
//       heading: "Opportunities",
//       items: [
//         { key: "jobs", label: "Jobs", icon: Briefcase },
//         {
//           key: "training",
//           label: "Training",
//           icon: GraduationCap,
//           children: [{ key: "webinars", label: "Webinars", icon: VideoIcon }],
//         },
//         {
//           key: "deals",
//           label: "Deals",
//           icon: Handshake,
//           children: [
//             { key: "tenders", label: "Tenders", icon: FolderKanban },
//             { key: "projects", label: "WABLP Projects", icon: Notebook },
//           ],
//         },
//       ],
//     },
//     {
//       heading: "Directories",
//       items: [{ key: "catalogue", label: "Members Catalogue", icon: BookOpen }],
//     },
//     {
//       heading: "Orders",
//       items: [
//         {
//           key: "orders",
//           label: "Orders",
//           icon: ShoppingCart,
//           children: [
//             { key: "myorders", label: "My Orders", icon: ClipboardList },
//             { key: "sellerorders", label: "Seller Orders", icon: Package },
//           ],
//         },
//       ],
//     },
//   ];

//   const [open, setOpen] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [expanded, setExpanded] = useState<string | null>(null);
//   const [user, setUser] = useState<{ name: string; email: string } | null>(
//     null
//   );
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   useEffect(() => {
//     sections.forEach((section) =>
//       section.items.forEach((item) => {
//         if (
//           item.children &&
//           item.children.some((child) => child.key === activePage)
//         ) {
//           setExpanded(item.key);
//         }
//       })
//     );
//   }, [activePage]);

//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) setUser(JSON.parse(storedUser));
//     } catch (err) {
//       console.error("Invalid user JSON:", err);
//       setUser(null);
//     }
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     router.push("/sign-in");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-[56px] bottom-0 left-0 z-50 bg-white shadow-md border-r w-64 transform transition-transform duration-300
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
//       >
//         <div className="p-4 font-bold text-lg border-b">My Dashboard</div>
//         <nav className="p-2 space-y-4 overflow-y-auto h-[calc(100%-56px)]">
//           {sections.map((section) => (
//             <div key={section.heading}>
//               <div className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
//                 {section.heading}
//               </div>
//               <div className="space-y-1">
//                 {section.items.map(({ key, label, icon: Icon, children }) => {
//                   const isExpanded = expanded === key;
//                   return (
//                     <div key={key}>
//                       <button
//                         className={`flex items-center justify-between w-full text-left p-2 rounded-lg transition-colors ${
//                           activePage === key
//                             ? "bg-blue-100 text-blue-600 font-medium"
//                             : "text-gray-700 hover:bg-gray-100"
//                         }`}
//                         onClick={() =>
//                           children
//                             ? setExpanded(isExpanded ? null : key)
//                             : onNavigate(key)
//                         }
//                       >
//                         <span className="flex items-center">
//                           {Icon && <Icon className="w-5 h-5 mr-3" />}
//                           {label}
//                         </span>

//                         {children &&
//                           (isExpanded ? (
//                             <ChevronDown className="w-4 h-4 text-gray-500" />
//                           ) : (
//                             <ChevronRight className="w-4 h-4 text-gray-500" />
//                           ))}
//                       </button>

//                       {children && isExpanded && (
//                         <div className="ml-6 mt-1 space-y-1">
//                           {children.map(
//                             ({
//                               key: childKey,
//                               label: childLabel,
//                               icon: ChildIcon,
//                             }) => (
//                               <button
//                                 key={childKey}
//                                 className={`flex items-center w-full text-left p-2 rounded-lg text-sm ${
//                                   activePage === childKey
//                                     ? "bg-blue-50 text-blue-600 font-medium"
//                                     : "text-gray-600 hover:bg-gray-100"
//                                 }`}
//                                 onClick={() => {
//                                   onNavigate(childKey);
//                                   setSidebarOpen(false); // close on mobile
//                                 }}
//                               >
//                                 {ChildIcon && (
//                                   <ChildIcon className="w-4 h-4 mr-2" />
//                                 )}
//                                 {childLabel}
//                               </button>
//                             )
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </nav>
//       </aside>

//       {/* Main */}
//       <div className="flex-1 flex flex-col md:ml-64">
//         {/* Top Navbar */}
//         <header className="fixed top-0 left-0 right-0 flex items-center justify-between bg-white border-b px-4 md:px-6 py-3 shadow-sm h-[56px] z-50">
//           {/* Left side - mobile menu */}
//           <div className="flex items-center gap-2">
//             <button
//               className="md:hidden p-2 rounded-md hover:bg-gray-100"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               {sidebarOpen ? (
//                 <X className="w-5 h-5 text-gray-600" />
//               ) : (
//                 <Menu className="w-5 h-5 text-gray-600" />
//               )}
//             </button>

//             <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
//               <Search className="w-4 h-4 text-gray-500 mr-2" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="bg-transparent outline-none flex-1 text-sm"
//               />
//             </div>
//           </div>

//           {/* Right side */}
//           <div className="flex items-center gap-3 md:gap-4">
//             <button className="relative p-2 rounded-full hover:bg-gray-100">
//               <Bell className="w-5 h-5 text-gray-600" />
//               <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//                 3
//               </span>
//             </button>

//             <div className="relative" ref={dropdownRef}>
//               <div
//                 className="flex items-center gap-2 cursor-pointer"
//                 onClick={() => setOpen(!open)}
//               >
//                 <img
//                   src="https://i.pravatar.cc/40"
//                   alt="User"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="hidden sm:block text-sm font-medium text-gray-700">
//                   {user ? user.name : "Loading..."}
//                 </span>
//               </div>

//               {open && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border py-2 z-50">
//                   <button
//                     className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     onClick={() => {
//                       setOpen(false);
//                       onNavigate("profile");
//                     }}
//                   >
//                     <User className="w-4 h-4 mr-2" />
//                     Profile
//                   </button>
//                   <button
//                     className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     onClick={() => {
//                       setOpen(false);
//                       alert("Settings clicked");
//                     }}
//                   >
//                     <Settings className="w-4 h-4 mr-2" />
//                     Settings
//                   </button>
//                   <button
//                     className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                     onClick={handleLogout}
//                   >
//                     <LogOut className="w-4 h-4 mr-2" />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 p-4 md:p-6 mt-[56px]">{children}</main>
//       </div>
//     </div>
//   );
// }
