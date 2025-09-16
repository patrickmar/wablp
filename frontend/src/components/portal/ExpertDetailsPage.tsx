import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import ChatBox from "./ChatBox";

type Expert = {
  customers_id: number;
  name: string;
  email: string;
  phone: string;
  country: any;
  category: any;
  organizations?: any;
  specialties?: any;
  education_level?: any;
  languages?: any;
  linkedin?: any;
  website?: any;
  portfolio?: any;
  about_me?: any;
  photo: string | null;
};

interface ExpertDetailsPageProps {
  id: string;
  onBack: () => void;
}

export default function ExpertDetailsPage({ id, onBack }: ExpertDetailsPageProps) {
  const [expert, setExpert] = useState<Expert | null>(null);
  const [status, setStatus] = useState("Offline");
  const [chatOpen, setChatOpen] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/routes/experts/${id}`);
        console.log("✅ Expert data:", res.data);
        setExpert(res.data);
      } catch (err) {
        console.error("❌ Error fetching expert:", err);
      }
    };
    fetchExpert();
  }, [id]);

  // Poll status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/routes/status/${id}`);
        setStatus(res.data.status);
      } catch (err) {
        console.error("❌ Error fetching status:", err);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, [id]);

  if (!expert) return <p className="p-6">Loading expert...</p>;

  return (
    <div className="container mx-auto p-6">
      <Button variant="outline" onClick={onBack} className="mb-4">
        ← Back
      </Button>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left profile */}
          <div className="flex flex-col items-center border-r md:pr-6">
            <img
              src={expert.photo || "/placeholder.png"}
              alt={String(expert.name || "-")}
              className="w-36 h-36 rounded-full object-cover border-4 border-gray-300"
            />
            <h2 className="mt-4 text-xl font-semibold">{String(expert.name || "-")}</h2>
            <p className="text-gray-600 text-sm">{String(expert.email || "-")}</p>
            <p
              className={`mt-1 text-sm font-medium ${
                status === "Online" ? "text-green-600" : "text-gray-500"
              }`}
            >
              ● {status}
            </p>
            <Button className="mt-4 bg-blue-600 text-white" onClick={() => setChatOpen(true)}>
              Chat
            </Button>
          </div>

          {/* Right details */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4">Expert Account Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold">Your Name</p>
                <p>{String(expert.name || "-")}</p>
              </div>
              <div>
                <p className="font-semibold">Mobile Number</p>
                <p>{String(expert.phone || "-")}</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p>{String(expert.email || "-")}</p>
              </div>
              <div>
                <p className="font-semibold">Country</p>
                <p>{String(expert.country || "-")}</p>
              </div>
              <div>
                <p className="font-semibold">Organizations</p>
                <p>{String(expert.organizations || "-")}</p>
              </div>
              <div>
                <p className="font-semibold">Category</p>
                <p>{String(expert.category || "-")}</p>
              </div>
              <div>
                <p className="font-semibold">Specialties</p>
                <p>{String(expert.specialties || "-")}</p>
              </div>
              <div>
                <p className="font-semibold">Education Level</p>
                <p>{String(expert.education_level || "-")}</p>
              </div>
              <div>
                <p className="font-semibold">Languages</p>
                <p>{String(expert.languages || "-")}</p>
              </div>
              <div>
                <p className="font-semibold">LinkedIn</p>
                {expert.linkedin ? (
                  <a
                    href={String(expert.linkedin)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    {String(expert.linkedin)}
                  </a>
                ) : (
                  "-"
                )}
              </div>
              <div>
                <p className="font-semibold">Website</p>
                {expert.website ? (
                  <a
                    href={String(expert.website)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    {String(expert.website)}
                  </a>
                ) : (
                  "-"
                )}
              </div>
              <div>
                <p className="font-semibold">Portfolio</p>
                {expert.portfolio ? (
                  <a
                    href={String(expert.portfolio)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View / Download
                  </a>
                ) : (
                  "-"
                )}
              </div>
              <div className="md:col-span-2">
                <p className="font-semibold">About Me</p>
                <p className="whitespace-pre-line">{String(expert.about_me || "-")}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-semibold">Share / Refer</p>
                <p>-</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Chat */}
      {userId && (
        <ChatBox
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          userId={parseInt(userId)}
          peerId={expert.customers_id}
          peerName={String(expert.name || "-")}
          peerPhoto={expert.photo}
          status={status}
        />
      )}
    </div>
  );
}
