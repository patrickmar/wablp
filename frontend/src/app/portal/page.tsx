"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { DashboardPage } from "@/components/portal/DashboardPage";
import NewsEventsPage from "@/components/portal/NewsEventsPage";
import ProfilePage  from "@/components/portal/ProfilePage";
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
import  FullNewsPage from "@/components/portal/FullNewsPage"; // ✅ added

function Placeholder({ title }: { title: string }) {
  return <div>{title} content goes here</div>;
}

export default function PortalPage() {
  const [activePage, setActivePage] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null); // ✅ added

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
        return (
          <NewsEventsPage
            onSelectNews={(id) => {
              setSelectedNewsId(id.toString());
              setActivePage("newsDetails");
            }}
          />
        );

      case "newsDetails":
        return (
          <FullNewsPage
            id={selectedNewsId!}
            onBack={() => setActivePage("news")}
          />
        );

      case "profile":
        return <ProfilePage />;

      case "businesses":
        return <BusinessPage />;

      case "organizations":
        return <OrganizationPage />;

      case "experts":
        return <ExpertPage />;

      case "jobs":
        return <JobsPage />;

      case "courses":
        return <Placeholder title="Courses" />;

      case "webinars":
        return <WebinarsPage />;

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

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { PortalLayout } from "@/components/portal/PortalLayout";
// import { DashboardPage } from "@/components/portal/DashboardPage";
// import  NewsEventsPage  from "@/components/portal/NewsEventsPage";
// import  ProfilePage  from "@/components/portal/ProfilePage";
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

// function Placeholder({ title }: { title: string }) {
//   return <div>{title} content goes here</div>;
// }

// export default function PortalPage() {
//   const [activePage, setActivePage] = useState("dashboard");
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
//   const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);



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
//     <NewsEventsPage
//       onSelectNews={(id) => {
//         setSelectedNewsId(id.toString());
//         setActivePage("newsDetails");
//       }}
//     />
//   );
//       case "fullNews":
//         return (
//     <FullNewsPage
//       id={selectedNewsId!}
//       onBack={() => setActivePage("news")}
//     />
//   );
//       case "profile":
//         return <ProfilePage />;
//       case "businesses":
//         return <BusinessPage />;
//       case "organizations":
//         return <OrganizationPage />;
//       case "experts":
//         return <ExpertPage />;
//         // case "resources":
//         // return <Placeholder title="Resources" />;
//       case "jobs":
//         return <JobsPage />;
//       case "courses":
//         return <Placeholder title="Courses" />;
//       case "webinars":
//         return <WebinarsPage />;
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
//         return <ProductDetailsPage id={selectedProductId!} onBack={() => setActivePage("catalogue")} />;
//       case "createCatalogue":
//         return <CreateCataloguePage onBack={() => setActivePage("catalogue")} />;
//       case "services":
//         return <Placeholder title="Services Directory" />;
//       case "myorders":
//         return <MyOrdersPage onViewProduct={(id) => {
//           setSelectedProductId(id);
//           setActivePage("productDetails");
//         }} />;
//       case "sellerorders":
//         return (
//     <SellerOrdersPage
//       onSelectProduct={(id) => {
//         setSelectedProductId(id.toString());
//         setActivePage("productDetails");
//       }}
//     />
//   );
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