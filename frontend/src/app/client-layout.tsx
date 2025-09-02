"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide header & footer on dashboard pages
  const hideOn = ["/portal"];
  const shouldHide = hideOn.some((path) => pathname.startsWith(path));

  return (
    <>
      {!shouldHide && <Header />}
      <main className="flex-1">{children}</main>
      {!shouldHide && <Footer />}
    </>
  );
}
