import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import ChatBox from "./ChatBox";

type Organization = {
  customers_id: number;
  name: string;
  email: string;
  phone: string;
  organization_type: string;
  country: string;
  website: string;
  portfolio: string;
  description: string;
  photo: string;
};

interface OrganizationDetailsPageProps {
  id: string;
  onBack: () => void;
}

export default function OrganizationDetailsPage({
  id,
  onBack,
}: OrganizationDetailsPageProps) {
  const [org, setOrg] = useState<Organization | null>(null);
  const [status, setStatus] = useState<string>("Offline");
  const [chatOpen, setChatOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [unreadCount, setUnreadCount] = useState(0); // 🔔 unread counter

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(parseInt(storedUserId));

    async function fetchOrg() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/organizations/${id}`
        );
        setOrg(res.data);
      } catch (err) {
        console.error("❌ Error fetching organization:", err);
      }
    }
    fetchOrg();
  }, [id]);

  // ✅ Poll status every 10s
  useEffect(() => {
    if (!id) return;
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/status/${id}`
        );
        setStatus(res.data.status);
      } catch (err) {
        console.error("❌ Error fetching status:", err);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [id]);

  if (!org) return <p className="p-6">Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <Button variant="outline" onClick={onBack} className="mb-4">
        ← Back
      </Button>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Profile */}
          <div className="flex flex-col items-center border-r md:pr-6">
            <img
              src={org.photo || "/placeholder.png"}
              alt={org.name}
              className="w-36 h-36 rounded-full object-cover border-4 border-gray-300"
            />
            <h2 className="mt-4 text-xl font-semibold">{org.name}</h2>
            <p className="text-gray-600 text-sm">{org.email}</p>
            <p
              className={`mt-1 text-sm font-medium ${
                status === "Online" ? "text-green-600" : "text-gray-500"
              }`}
            >
              ● {status}
            </p>
            <Button
              className="mt-4 bg-blue-600 text-white relative"
              onClick={() => {
                setChatOpen(true);
                setUnreadCount(0); // reset when opened
              }}
            >
              Chat
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </div>

          {/* Right: Details */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4">Your Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold">Your Name</p>
                <p>{org.name || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Mobile Number</p>
                <p>{org.phone || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p>{org.email || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Organization Type</p>
                <p>{org.organization_type || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Country</p>
                <p>{org.country || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Website</p>
                <p>{org.website || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Portfolio</p>
                <p>{org.portfolio || "-"}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-semibold">Description</p>
                <p className="whitespace-pre-line">{org.description || "-"}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-semibold">Share / Refer</p>
                <p>-</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ✅ Shared ChatBox with unread handling */}
      {userId && (
        <ChatBox
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          userId={userId}
          peerId={org.customers_id}
          peerName={org.name}
          peerPhoto={org.photo}
          status={status}
          onNewMessage={() => setUnreadCount((c) => c + 1)} // increment when new arrives
        />
      )}
    </div>
  );
}