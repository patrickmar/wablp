"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { DashboardPage } from "@/components/portal/DashboardPage";
import  NewsEventsPage  from "@/components/portal/NewsEventsPage";
import  ProfilePage  from "@/components/portal/ProfilePage";

function Placeholder({ title }: { title: string }) {
  return <div>{title} content goes here</div>;
}

export default function PortalPage() {
  const [activePage, setActivePage] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/sign-in");
    else setLoading(false);
  }, [router]);

  if (loading) return <p className="p-6">Checking authentication...</p>;

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "news":
        return <NewsEventsPage />;
      case "profile":
        return <ProfilePage />;
      case "businesses":
        return <Placeholder title="Registered Businesses" />;
      case "organizations":
        return <Placeholder title="Organizations" />;
      case "experts":
        return <Placeholder title="Experts" />;
      case "jobs":
        return <Placeholder title="Jobs" />;
      case "courses":
        return <Placeholder title="Courses" />;
      case "webinars":
        return <Placeholder title="Webinars" />;
      case "deal-rooms":
        return <Placeholder title="Deal Rooms" />;
      case "tenders":
        return <Placeholder title="Tenders" />;
      case "projects":
        return <Placeholder title="WABLP Projects" />;
      case "catalogue":
        return <Placeholder title="Members Catalogue" />;
      case "services":
        return <Placeholder title="Services Directory" />;
      case "my-orders":
        return <Placeholder title="My Orders" />;
      case "seller-orders":
        return <Placeholder title="Seller Orders" />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <PortalLayout activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </PortalLayout>
  );
}





















// "use client";

// import { useState } from "react";
// import { AnalyticsPage } from "@/components/portal/AnalyticsPage";
// import { DashboardPage } from "@/components/portal/DashboardPage";
// import { MessagesPage } from "@/components/portal/MessagesPage";
// import { OpportunitiesPage } from "@/components/portal/OpportunitiesPage";
// import  PortalLayout from "@/components/portal/PortalLayout";
// import { ProfilePage } from "@/components/portal/ProfilePage";
// import { NewsEventsPage } from "@/components/portal/NewsEventsPage";
// import { CommunityMembersPage } from "@/components/portal/CommunityMembersPage";
// import { JobsPage } from "@/components/portal/JobsPage";
// import { TrainingPage } from "@/components/portal/TrainingPage";
// import { DealsPage } from "@/components/portal/DealsPage";
// import { MembersCataloguePage } from "@/components/portal/MembersCataloguePage";
// import { ServicesDirectoryPage } from "@/components/portal/ServicesDirectoryPage";
// import { OrdersPage } from "@/components/portal/OrdersPage";

// const Members = () => {
//   const [page, setPage] = useState("dashboard"); // default page

//   return (
//     <PortalLayout currentPage={page} onPageChange={setPage}>
//       {page === "dashboard" && <DashboardPage />}
//       {page === "dashboard" && <NewsEventsPage />}
//       {page === "profile" && <ProfilePage />}
//       {page === "profile" && <CommunityMembersPage />}
//       {page === "profile" && <JobsPage />}
//       {page === "profile" && <TrainingPage />}
//       {page === "profile" && <DealsPage />}
//       {page === "profile" && <MembersCataloguePage />}
//       {page === "profile" && <ServicesDirectoryPage />}
//       {page === "profile" && <OrdersPage />}
//       {/* {page === "messages" && <MessagesPage />}
//       {page === "opportunities" && <OpportunitiesPage />}
//       {page === "analytics" && <AnalyticsPage />} */}
      
//     </PortalLayout>
//   );
// };

// export default Members;












// // const Members = () => {
// //   return (
// //     <>
// //       <AnalyticsPage />
// //             <DashboardPage />
// //             <MessagesPage />
// //             <OpportunitiesPage />
// //             <PortalLayout children={undefined} currentPage={""} onPageChange={function (page: string): void {
// //               throw new Error("Function not implemented.");
// //           } } />
// //             <ProfilePage />
// //     </>
// //   );
// // };

// // export default Members;