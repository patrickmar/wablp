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
  BookMarked,
  VideoIcon,
  Handshake,
  Ticket,
  FolderKanban,
  Landmark,
  Building2,
  Factory,
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
            { key: "resources", label: "Resources", icon: Factory },
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
          children: [
            { key: "courses", label: "Courses", icon: BookMarked },
            { key: "webinars", label: "Webinars", icon: VideoIcon },
          ],
        },
        {
          key: "deals",
          label: "Deals",
          icon: Handshake,
          children: [
            { key: "dealrooms", label: "Deal Rooms", icon: Ticket },
            { key: "tenders", label: "Tenders", icon: FolderKanban },
            { key: "projects", label: "WABLP Projects", icon: Notebook },
          ],
        },
      ],
    },
    {
      heading: "Directories",
      items: [
        { key: "catalogue", label: "Members Catalogue", icon: BookOpen },
        { key: "services", label: "Services Directory", icon: Landmark },
      ],
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
  const [expanded, setExpanded] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r fixed top-[56px] bottom-0">
        <div className="p-4 font-bold text-lg border-b">My Dashboard</div>
        <nav className="p-2 space-y-4 overflow-y-auto h-[calc(100%-56px)]">
          {sections.map((section) => (
            <div key={section.heading}>
              <div className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                {section.heading}
              </div>
              <div className="space-y-1">
                {section.items.map(({ key, label, icon: Icon, children }) => {
                  const isExpanded = expanded === key;
                  return (
                    <div key={key}>
                      <button
                        className={`flex items-center justify-between w-full text-left p-2 rounded-lg transition-colors ${
                          activePage === key
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() =>
                          children
                            ? setExpanded(isExpanded ? null : key)
                            : onNavigate(key)
                        }
                      >
                        <span className="flex items-center">
                          {Icon && <Icon className="w-5 h-5 mr-3" />}
                          {label}
                        </span>

                        {children &&
                          (isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          ))}
                      </button>

                      {children && isExpanded && (
                        <div className="ml-6 mt-1 space-y-1">
                          {children.map(
                            ({
                              key: childKey,
                              label: childLabel,
                              icon: ChildIcon,
                            }) => (
                              <button
                                key={childKey}
                                className={`flex items-center w-full text-left p-2 rounded-lg text-sm ${
                                  activePage === childKey
                                    ? "bg-blue-50 text-blue-600 font-medium"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                                onClick={() => onNavigate(childKey)}
                              >
                                {ChildIcon && (
                                  <ChildIcon className="w-4 h-4 mr-2" />
                                )}
                                {childLabel}
                              </button>
                            )
                          )}
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

      {/* Main */}
      <div className="flex-1 flex flex-col bg-gray-50 ml-64">
        {/* Top Navbar */}
        <header className="fixed top-0 left-0 right-0 flex items-center justify-between bg-white border-b px-6 py-3 shadow-sm h-[56px] z-50">
          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </button>

            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <img
                  src="https://i.pravatar.cc/40"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  {user ? user.name : "Loading..."}
                </span>
              </div>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border py-2 z-50">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setOpen(false);
                      onNavigate("profile");
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setOpen(false);
                      alert("Settings clicked");
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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

        {/* Page Content */}
        <main className="flex-1 p-6 mt-[56px]">{children}</main>
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
//   BookMarked,
//   VideoIcon,
//   Handshake,
//   Ticket,
//   FolderKanban,
//   Landmark,
//   Building2,
//   Factory,
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
//   // Sidebar grouped sections
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
//             { key: "resources", label: "Resources", icon: Factory },
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
//           children: [
//             { key: "courses", label: "Courses", icon: BookMarked },
//             { key: "webinars", label: "Webinars", icon: VideoIcon },
//           ],
//         },
//         {
//           key: "deals",
//           label: "Deals",
//           icon: Handshake,
//           children: [
//             { key: "dealrooms", label: "Deal Rooms", icon: Ticket },
//             { key: "tenders", label: "Tenders", icon: FolderKanban },
//             { key: "projects", label: "WABLP Projects", icon: Notebook },
//           ],
//         },
//       ],
//     },
//     {
//       heading: "Directories",
//       items: [
//         { key: "catalogue", label: "Members Catalogue", icon: BookOpen },
//         { key: "services", label: "Services Directory", icon: Landmark },
//       ],
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
//   const [expanded, setExpanded] = useState<string | null>(null);
//   const [user, setUser] = useState<{ name: string; email: string } | null>(
//     null
//   );
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   // Expand parent if activePage is a child
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

//   // Load user
//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) setUser(JSON.parse(storedUser));
//     } catch (err) {
//       console.error("Invalid user JSON:", err);
//       setUser(null);
//     }
//   }, []);

//   // Close dropdown
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
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md border-r">
//         <div className="p-4 font-bold text-lg">My Dashboard</div>
//         <nav className="p-2 space-y-4">
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

//                         {/* Dropdown Arrow */}
//                         {children &&
//                           (isExpanded ? (
//                             <ChevronDown className="w-4 h-4 text-gray-500" />
//                           ) : (
//                             <ChevronRight className="w-4 h-4 text-gray-500" />
//                           ))}
//                       </button>

//                       {/* Submenu */}
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
//                                 onClick={() => onNavigate(childKey)}
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
//       <div className="flex-1 flex flex-col bg-gray-50">
//         {/* Top Navbar */}
//         <header className="flex items-center justify-between bg-white border-b px-6 py-3 shadow-sm">
//           {/* Search */}
//           <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3">
//             <Search className="w-4 h-4 text-gray-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-transparent outline-none flex-1 text-sm"
//             />
//           </div>

//           {/* Right side */}
//           <div className="flex items-center gap-4">
//             <button className="relative p-2 rounded-full hover:bg-gray-100">
//               <Bell className="w-5 h-5 text-gray-600" />
//               <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//                 3
//               </span>
//             </button>

//             {/* User Dropdown */}
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
//                 <span className="text-sm font-medium text-gray-700">
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
//         <main className="flex-1 p-6">{children}</main>
//       </div>
//     </div>
//   );
// }




























// import { useState } from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "../ui/avatar";
// import { Badge } from "../ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "../ui/collapsible";
// import {
//   LayoutDashboard,
//   Newspaper,
//   User,
//   Users,
//   Briefcase,
//   GraduationCap,
//   Handshake,
//   BookOpen,
//   ShoppingBag,
//   LogOut,
//   Search,
//   Bell,
//   HelpCircle,
//   ChevronDown,
//   ChevronRight,
//   Menu,
//   X,
//   Settings,
//   Building,
//   Award,
//   UserCheck,
//   ShoppingCart,
//   Package,
// } from "lucide-react";

// interface PortalLayoutProps {
//   children: React.ReactNode;
//   currentPage: string;
//   onPageChange: (page: string) => void;
// }

// const navigationItems = [
//   {
//     id: "dashboard",
//     label: "Dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     id: "news-events",
//     label: "News & Events",
//     icon: Newspaper,
//   },
//   { id: "my-profile", label: "My Profile", icon: User },
//   {
//     id: "community-members",
//     label: "Community Members",
//     icon: Users,
//     submenu: [
//       {
//         id: "registered-businesses",
//         label: "Registered Businesses",
//         icon: Building,
//       },
//       {
//         id: "organizations",
//         label: "Organizations",
//         icon: Award,
//       },
//       { id: "experts", label: "Experts", icon: UserCheck },
//     ],
//   },
//   { id: "jobs", label: "Jobs", icon: Briefcase, badge: 12 },
//   {
//     id: "training",
//     label: "Training",
//     icon: GraduationCap,
//     submenu: [
//       { id: "courses", label: "Courses", icon: BookOpen },
//       {
//         id: "webinars",
//         label: "Webinars",
//         icon: GraduationCap,
//       },
//     ],
//   },
//   {
//     id: "deals",
//     label: "Deals",
//     icon: Handshake,
//     badge: 5,
//     submenu: [
//       {
//         id: "deal-rooms",
//         label: "Deal Rooms",
//         icon: Handshake,
//       },
//       { id: "tenders", label: "Tenders", icon: Briefcase },
//       {
//         id: "wablp-projects",
//         label: "WABLP Projects",
//         icon: Award,
//       },
//     ],
//   },
//   {
//     id: "members-catalogue",
//     label: "Members Catalogue",
//     icon: BookOpen,
//   },
//   {
//     id: "services-directory",
//     label: "Services Directory",
//     icon: ShoppingBag,
//   },
//   {
//     id: "orders",
//     label: "Orders",
//     icon: ShoppingCart,
//     badge: 3,
//     submenu: [
//       {
//         id: "my-orders",
//         label: "My Orders",
//         icon: ShoppingCart,
//       },
//       {
//         id: "seller-orders",
//         label: "Seller Orders",
//         icon: Package,
//       },
//     ],
//   },
// ];

// export default function PortalLayout({
//   children,
//   currentPage,
//   onPageChange,
// }: PortalLayoutProps) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [expandedMenus, setExpandedMenus] = useState<string[]>(
//     [],
//   );

//   const toggleSubmenu = (menuId: string) => {
//     setExpandedMenus((prev) =>
//       prev.includes(menuId)
//         ? prev.filter((id) => id !== menuId)
//         : [...prev, menuId],
//     );
//   };

//   const handleMenuClick = (
//     itemId: string,
//     hasSubmenu: boolean,
//   ) => {
//     if (hasSubmenu) {
//       toggleSubmenu(itemId);
//     } else {
//       onPageChange(itemId);
//       setSidebarOpen(false);
//     }
//   };

//   const isMenuExpanded = (menuId: string) =>
//     expandedMenus.includes(menuId);
//   const isActiveMenu = (itemId: string, submenu?: any[]) => {
//     if (currentPage === itemId) return true;
//     if (submenu) {
//       return submenu.some(
//         (subItem) => currentPage === subItem.id,
//       );
//     }
//     return false;
//   };

//   return (
//     <div className="min-h-screen bg-[#F5F6FA]">
//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed left-0 top-0 h-full w-72 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 flex flex-col`}
//       >
//         {/* Logo Section - Fixed */}
//         <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 flex-shrink-0">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-[#004C97] to-[#D4AF37] rounded-xl flex items-center justify-center">
//               <span className="text-white font-bold text-lg">
//                 W
//               </span>
//             </div>
//             <div>
//               <div className="font-semibold text-[#333333]">
//                 WABLP Portal
//               </div>
//               <div className="text-xs text-[#6B7280]">
//                 Member Area
//               </div>
//             </div>
//           </div>
//           <Button
//             variant="ghost"
//             size="sm"
//             className="lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <X className="w-4 h-4" />
//           </Button>
//         </div>

//         {/* Navigation - Scrollable */}
//         <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
//           <div className="px-4 py-6 space-y-2">
//             {navigationItems.map((item) => (
//               <div key={item.id}>
//                 <button
//                   onClick={() =>
//                     handleMenuClick(item.id, !!item.submenu)
//                   }
//                   className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
//                     isActiveMenu(item.id, item.submenu)
//                       ? "bg-[#004C97] text-white shadow-lg"
//                       : "text-[#6B7280] hover:bg-gray-50 hover:text-[#333333]"
//                   }`}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <item.icon
//                       className={`w-5 h-5 ${
//                         isActiveMenu(item.id, item.submenu)
//                           ? "text-white"
//                           : "text-[#6B7280] group-hover:text-[#004C97]"
//                       }`}
//                     />
//                     <span>{item.label}</span>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     {item.badge && (
//                       <Badge className="bg-[#D4AF37] text-[#333333] text-xs h-5 px-1.5">
//                         {item.badge}
//                       </Badge>
//                     )}
//                     {item.submenu && (
//                       <ChevronRight
//                         className={`w-4 h-4 transition-transform ${
//                           isMenuExpanded(item.id)
//                             ? "rotate-90"
//                             : ""
//                         } ${
//                           isActiveMenu(item.id, item.submenu)
//                             ? "text-white"
//                             : "text-[#6B7280]"
//                         }`}
//                       />
//                     )}
//                   </div>
//                 </button>

//                 {/* Submenu */}
//                 {item.submenu && (
//                   <Collapsible open={isMenuExpanded(item.id)}>
//                     <CollapsibleContent className="ml-6 mt-2 space-y-1">
//                       {item.submenu.map((subItem) => (
//                         <button
//                           key={subItem.id}
//                           onClick={() => {
//                             onPageChange(subItem.id);
//                             setSidebarOpen(false);
//                           }}
//                           className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                             currentPage === subItem.id
//                               ? "bg-[#D4AF37] text-[#333333] shadow-md"
//                               : "text-[#6B7280] hover:bg-gray-50 hover:text-[#333333]"
//                           }`}
//                         >
//                           <subItem.icon
//                             className={`w-4 h-4 ${
//                               currentPage === subItem.id
//                                 ? "text-[#333333]"
//                                 : "text-[#6B7280]"
//                             }`}
//                           />
//                           <span>{subItem.label}</span>
//                         </button>
//                       ))}
//                     </CollapsibleContent>
//                   </Collapsible>
//                 )}
//               </div>
//             ))}
//           </div>
//         </nav>

//         {/* Bottom Section - Fixed */}
//         <div className="px-4 py-4 border-t border-gray-100 space-y-2 flex-shrink-0">
//           <button
//             onClick={() => onPageChange("settings")}
//             className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
//               currentPage === "settings"
//                 ? "bg-[#004C97] text-white"
//                 : "text-[#6B7280] hover:bg-gray-50 hover:text-[#333333]"
//             }`}
//           >
//             <Settings className="w-5 h-5" />
//             <span>Settings</span>
//           </button>
//           <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#6B7280] hover:bg-gray-50 hover:text-[#333333] transition-all duration-200">
//             <HelpCircle className="w-5 h-5" />
//             <span>Help & Support</span>
//           </button>
//           <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200">
//             <LogOut className="w-5 h-5" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="lg:ml-72">
//         {/* Top Bar */}
//         <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
//           {/* Left Section */}
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="lg:hidden"
//               onClick={() => setSidebarOpen(true)}
//             >
//               <Menu className="w-5 h-5" />
//             </Button>

//             {/* Search Bar */}
//             <div className="relative w-64 md:w-96">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
//               <Input
//                 placeholder="Search members, deals, jobs..."
//                 className="pl-10 pr-4 py-2 bg-[#F5F6FA] border-0 rounded-lg text-sm focus:ring-2 focus:ring-[#004C97] focus:bg-white transition-all"
//               />
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center space-x-4">
//             {/* Notifications */}
//             <Button
//               variant="ghost"
//               size="sm"
//               className="relative"
//             >
//               <Bell className="w-5 h-5 text-[#6B7280]" />
//               <Badge className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#333333] text-xs h-4 w-4 p-0 flex items-center justify-center">
//                 5
//               </Badge>
//             </Button>

//             {/* User Menu */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50"
//                 >
//                   <Avatar className="w-8 h-8">
//                     <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" />
//                     <AvatarFallback className="bg-[#004C97] text-white text-sm">
//                       TN
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="hidden md:block text-left">
//                     <div className="text-sm font-medium text-[#333333]">
//                       TechNova Solutions
//                     </div>
//                     <div className="text-xs text-[#6B7280]">
//                       Premium Member
//                     </div>
//                   </div>
//                   <ChevronDown className="w-4 h-4 text-[#6B7280]" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-56">
//                 <DropdownMenuItem
//                   onClick={() => onPageChange("my-profile")}
//                 >
//                   <User className="w-4 h-4 mr-2" />
//                   View Profile
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   onClick={() => onPageChange("settings")}
//                 >
//                   <Settings className="w-4 h-4 mr-2" />
//                   Account Settings
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <HelpCircle className="w-4 h-4 mr-2" />
//                   Help & Support
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem className="text-red-600">
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Sign Out
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="p-6">{children}</main>
//       </div>
//     </div>
//   );
// }