"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { DashboardPage } from "@/components/portal/DashboardPage";
import NewsEventsPage from "@/components/portal/NewsEventsPage";
import ProfilePage from "@/components/portal/ProfilePage";
import { BusinessPage } from "@/components/portal/BusinessPage";
import { OrganizationPage } from "@/components/portal/OrganizationPage";
import { ExpertPage } from "@/components/portal/ExpertPage";
import { JobsPage } from "@/components/portal/JobsPage";
import { WebinarsPage } from "@/components/portal/WebinarsPage";
import { TendersPage } from "@/components/portal/TendersPage";
import { ProjectsPage } from "@/components/portal/ProjectsPage";
import { CataloguePage } from "@/components/portal/CataloguePage";
import { ProductDetailsPage } from "@/components/portal/ProductDetailsPage";
import { MyOrdersPage } from "@/components/portal/OrdersPage";
import { SellerOrdersPage } from "@/components/portal/SellerOrdersPage";
import { CreateCataloguePage } from "@/components/portal/CreateCataloguePage";
import FullNewsPage from "@/components/portal/FullNewsPage";
import BusinessDetailsPage from "@/components/portal/BusinessDetailsPage";
import OrganizationDetailsPage from "@/components/portal/OrganizationDetailsPage";
import ExpertDetailsPage from "@/components/portal/ExpertDetailsPage";
import JobDetailsPage from "@/components/portal/JobDetailsPage";
import WebinarDetailsPage from "@/components/portal/WebinarDetailsPage";

function Placeholder({ title }: { title: string }) {
  return <div>{title} content goes here</div>;
}

export default function PortalPage() {
  const [activePage, setActivePage] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null);
  const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedWebinarId, setSelectedWebinarId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/sign-in");
    else setLoading(false);
  }, [router]);

  if (loading) return <p className="p-6">Checking authentication...</p>;

  // ✅ Shared handler for navigating to a full news page
  // Accepts both number (from DashboardPage & NewsEventsPage) and string (from FullNewsPage)
  const handleSelectNews = (id: number | string) => {
    setSelectedNewsId(id.toString());
    setActivePage("newsDetails");
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        // ✅ FIXED: pass onSelectNews so dashboard news titles are clickable
        return (
          <DashboardPage
            onSelectNews={handleSelectNews}
          />
        );

      case "news":
        return (
          <NewsEventsPage
            onSelectNews={handleSelectNews}
          />
        );

      case "newsDetails":
        return (
          <FullNewsPage
            id={selectedNewsId!}
            onBack={() => setActivePage("news")}
            onSelectNews={handleSelectNews}
          />
        );

      case "profile":
        return <ProfilePage />;

      case "businesses":
        return (
          <BusinessPage
            onSelectBusiness={(id: number) => {
              setSelectedBusinessId(id.toString());
              setActivePage("businessDetails");
            }}
          />
        );

      case "businessDetails":
        return selectedBusinessId ? (
          <BusinessDetailsPage
            id={selectedBusinessId.toString()}
            onBack={() => setActivePage("businesses")}
          />
        ) : (
          <div className="p-6">No business selected.</div>
        );

      case "organizations":
        return (
          <OrganizationPage
            onSelectOrganization={(id: number) => {
              setSelectedOrganizationId(id.toString());
              setActivePage("organizationDetails");
            }}
          />
        );

      case "organizationDetails":
        return selectedOrganizationId ? (
          <OrganizationDetailsPage
            id={selectedOrganizationId.toString()}
            onBack={() => setActivePage("organizations")}
          />
        ) : (
          <div className="p-6">No organization selected.</div>
        );

      case "experts":
        return (
          <ExpertPage
            onSelectExpert={(id: number) => {
              setSelectedExpertId(id.toString());
              setActivePage("expertDetails");
            }}
          />
        );

      case "expertDetails":
        return selectedExpertId ? (
          <ExpertDetailsPage
            id={selectedExpertId.toString()}
            onBack={() => setActivePage("experts")}
          />
        ) : (
          <div className="p-6">No Expert selected.</div>
        );

      case "jobs":
        return (
          <JobsPage
            onSelectJob={(id: number) => {
              setSelectedJobId(id.toString());
              setActivePage("jobDetails");
            }}
          />
        );

      case "jobDetails":
        return selectedJobId ? (
          <JobDetailsPage
            id={selectedJobId.toString()}
            onBack={() => setActivePage("jobs")}
          />
        ) : (
          <div className="p-6">No job selected.</div>
        );

      case "courses":
        return <Placeholder title="Courses" />;

      case "webinars":
        return (
          <WebinarsPage
            onSelectWebinar={(id: number) => {
              setSelectedWebinarId(id.toString());
              setActivePage("webinarDetails");
            }}
          />
        );

      case "webinarDetails":
        return selectedWebinarId ? (
          <WebinarDetailsPage
            id={selectedWebinarId.toString()}
            onBack={() => setActivePage("webinars")}
          />
        ) : (
          <div className="p-6">No webinar selected.</div>
        );

      case "dealrooms":
        return <Placeholder title="Deal Rooms" />;

      case "tenders":
        return <TendersPage />;

      case "projects":
        return <ProjectsPage />;

      case "catalogue":
        return (
          <CataloguePage
            onSelectProduct={(id) => {
              setSelectedProductId(id.toString());
              setActivePage("productDetails");
            }}
            onCreateCatalogue={() => setActivePage("createCatalogue")}
          />
        );

      case "productDetails":
        return (
          <ProductDetailsPage
            id={selectedProductId!}
            onBack={() => setActivePage("catalogue")}
          />
        );

      case "createCatalogue":
        return <CreateCataloguePage onBack={() => setActivePage("catalogue")} />;

      case "services":
        return <Placeholder title="Services Directory" />;

      case "myorders":
        return (
          <MyOrdersPage
            onViewProduct={(id) => {
              setSelectedProductId(id);
              setActivePage("productDetails");
            }}
          />
        );

      case "sellerorders":
        return (
          <SellerOrdersPage
            onSelectProduct={(id) => {
              setSelectedProductId(id.toString());
              setActivePage("productDetails");
            }}
          />
        );

      default:
        // ✅ FIXED: also pass onSelectNews in the default fallback
        return (
          <DashboardPage
            onSelectNews={handleSelectNews}
          />
        );
    }
  };

  return (
    <PortalLayout activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </PortalLayout>
  );
}






















// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { PortalLayout } from "@/components/portal/PortalLayout";
// import { DashboardPage } from "@/components/portal/DashboardPage";
// import NewsEventsPage from "@/components/portal/NewsEventsPage";
// import ProfilePage from "@/components/portal/ProfilePage";
// import { BusinessPage } from "@/components/portal/BusinessPage";
// import { OrganizationPage } from "@/components/portal/OrganizationPage";
// import { ExpertPage } from "@/components/portal/ExpertPage";
// import { JobsPage } from "@/components/portal/JobsPage";
// import { WebinarsPage } from "@/components/portal/WebinarsPage";
// import { TendersPage } from "@/components/portal/TendersPage";
// import { ProjectsPage } from "@/components/portal/ProjectsPage";
// import { CataloguePage } from "@/components/portal/CataloguePage";
// import { ProductDetailsPage } from "@/components/portal/ProductDetailsPage";
// import { MyOrdersPage } from "@/components/portal/OrdersPage";
// import { SellerOrdersPage } from "@/components/portal/SellerOrdersPage";
// import { CreateCataloguePage } from "@/components/portal/CreateCataloguePage";
// import FullNewsPage from "@/components/portal/FullNewsPage";
// import BusinessDetailsPage from "@/components/portal/BusinessDetailsPage";
// import OrganizationDetailsPage from "@/components/portal/OrganizationDetailsPage";
// import ExpertDetailsPage from "@/components/portal/ExpertDetailsPage";
// import JobDetailsPage from "@/components/portal/JobDetailsPage";
// import WebinarDetailsPage from "@/components/portal/WebinarDetailsPage"; // ✅ added

// function Placeholder({ title }: { title: string }) {
//   return <div>{title} content goes here</div>;
// }

// export default function PortalPage() {
//   const [activePage, setActivePage] = useState("dashboard");
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
//   const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
//   const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
//   const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null);
//   const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null);
//   const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
//   const [selectedWebinarId, setSelectedWebinarId] = useState<string | null>(null); // ✅ added

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) router.push("/sign-in");
//     else setLoading(false);
//   }, [router]);

//   if (loading) return <p className="p-6">Checking authentication...</p>;

//   const renderPage = () => {
//     switch (activePage) {
//       case "dashboard":
//         return <DashboardPage />;

//       case "news":
//         return (
//           <NewsEventsPage
//             onSelectNews={(id) => {
//               setSelectedNewsId(id.toString());
//               setActivePage("newsDetails");
//             }}
//           />
//         );

//       case "newsDetails":
//         return (
//           <FullNewsPage
//             id={selectedNewsId!}
//             onBack={() => setActivePage("news")}
//             onSelectNews={(id) => {
//               setSelectedNewsId(id.toString());
//               setActivePage("newsDetails");
//             }}
//           />
//         );

//       case "profile":
//         return <ProfilePage />;

//       case "businesses":
//         return (
//           <BusinessPage
//             onSelectBusiness={(id: number) => {
//               setSelectedBusinessId(id.toString());
//               setActivePage("businessDetails");
//             }}
//           />
//         );

//       case "businessDetails":
//         return selectedBusinessId ? (
//           <BusinessDetailsPage
//             id={selectedBusinessId.toString()}
//             onBack={() => setActivePage("businesses")}
//           />
//         ) : (
//           <div className="p-6">No business selected.</div>
//         );

//       case "organizations":
//         return (
//           <OrganizationPage
//             onSelectOrganization={(id: number) => {
//               setSelectedOrganizationId(id.toString());
//               setActivePage("organizationDetails");
//             }}
//           />
//         );

//       case "organizationDetails":
//         return selectedOrganizationId ? (
//           <OrganizationDetailsPage
//             id={selectedOrganizationId.toString()}
//             onBack={() => setActivePage("organizations")}
//           />
//         ) : (
//           <div className="p-6">No organization selected.</div>
//         );

//       case "experts":
//         return (
//           <ExpertPage
//             onSelectExpert={(id: number) => {
//               setSelectedExpertId(id.toString());
//               setActivePage("expertDetails");
//             }}
//           />
//         );

//       case "expertDetails":
//         return selectedExpertId ? (
//           <ExpertDetailsPage
//             id={selectedExpertId.toString()}
//             onBack={() => setActivePage("experts")}
//           />
//         ) : (
//           <div className="p-6">No Expert selected.</div>
//         );

//       case "jobs":
//         return (
//           <JobsPage
//             onSelectJob={(id: number) => {
//               setSelectedJobId(id.toString());
//               setActivePage("jobDetails");
//             }}
//           />
//         );

//       case "jobDetails":
//         return selectedJobId ? (
//           <JobDetailsPage
//             id={selectedJobId.toString()}
//             onBack={() => setActivePage("jobs")}
//           />
//         ) : (
//           <div className="p-6">No job selected.</div>
//         );

//       case "courses":
//         return <Placeholder title="Courses" />;

//       case "webinars":
//         return (
//           <WebinarsPage
//             onSelectWebinar={(id: number) => {
//               setSelectedWebinarId(id.toString());
//               setActivePage("webinarDetails");
//             }}
//           />
//         );

//       case "webinarDetails":
//         return selectedWebinarId ? (
//           <WebinarDetailsPage
//             id={selectedWebinarId.toString()}
//             onBack={() => setActivePage("webinars")}
//           />
//         ) : (
//           <div className="p-6">No webinar selected.</div>
//         );

//       case "dealrooms":
//         return <Placeholder title="Deal Rooms" />;

//       case "tenders":
//         return <TendersPage />;

//       case "projects":
//         return <ProjectsPage />;

//       case "catalogue":
//         return (
//           <CataloguePage
//             onSelectProduct={(id) => {
//               setSelectedProductId(id.toString());
//               setActivePage("productDetails");
//             }}
//             onCreateCatalogue={() => setActivePage("createCatalogue")}
//           />
//         );

//       case "productDetails":
//         return (
//           <ProductDetailsPage
//             id={selectedProductId!}
//             onBack={() => setActivePage("catalogue")}
//           />
//         );

//       case "createCatalogue":
//         return <CreateCataloguePage onBack={() => setActivePage("catalogue")} />;

//       case "services":
//         return <Placeholder title="Services Directory" />;

//       case "myorders":
//         return (
//           <MyOrdersPage
//             onViewProduct={(id) => {
//               setSelectedProductId(id);
//               setActivePage("productDetails");
//             }}
//           />
//         );

//       case "sellerorders":
//         return (
//           <SellerOrdersPage
//             onSelectProduct={(id) => {
//               setSelectedProductId(id.toString());
//               setActivePage("productDetails");
//             }}
//           />
//         );

//       default:
//         return <DashboardPage />;
//     }
//   };

//   return (
//     <PortalLayout activePage={activePage} onNavigate={setActivePage}>
//       {renderPage()}
//     </PortalLayout>
//   );
// }
