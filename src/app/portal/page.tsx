"use client";

import { useState } from "react";
import { AnalyticsPage } from "@/components/portal/AnalyticsPage";
import { DashboardPage } from "@/components/portal/DashboardPage";
import { MessagesPage } from "@/components/portal/MessagesPage";
import { OpportunitiesPage } from "@/components/portal/OpportunitiesPage";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { ProfilePage } from "@/components/portal/ProfilePage";

const Members = () => {
  const [page, setPage] = useState("dashboard"); // default page

  return (
    <PortalLayout currentPage={page} onPageChange={setPage}>
      {page === "dashboard" && <DashboardPage />}
      {page === "messages" && <MessagesPage />}
      {page === "opportunities" && <OpportunitiesPage />}
      {page === "analytics" && <AnalyticsPage />}
      {page === "profile" && <ProfilePage />}
    </PortalLayout>
  );
};

export default Members;


// const Members = () => {
//   return (
//     <>
//       <AnalyticsPage />
//             <DashboardPage />
//             <MessagesPage />
//             <OpportunitiesPage />
//             <PortalLayout children={undefined} currentPage={""} onPageChange={function (page: string): void {
//               throw new Error("Function not implemented.");
//           } } />
//             <ProfilePage />
//     </>
//   );
// };

// export default Members;