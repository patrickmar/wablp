"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

type WebinarDetailsPageProps = {
  id: string;
  onBack: () => void;
};

type Webinar = {
  webinars_id: number;
  name: string;
  photo: string | null;
  platform_name: string;
  timestamp: string;
  date_time: string;
  details: string | null;
  link: string | null;
  meeting_id: string | null;
  password: string | null;
};

export default function WebinarDetailsPage({ id, onBack }: WebinarDetailsPageProps) {
  const [webinar, setWebinar] = useState<Webinar | null>(null);

  useEffect(() => {
    const fetchWebinar = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/webinars/${id}`
        );
        setWebinar(res.data);
      } catch (err) {
        console.error("❌ Error fetching webinar:", err);
      }
    };
    fetchWebinar();
  }, [id]);

  if (!webinar) {
    return <div className="p-6">Loading webinar details...</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Main Webinar */}
      <Card className="lg:col-span-2">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">{webinar.name}</h2>
          <p className="text-sm text-gray-500">
            {webinar.date_time} <strong>via</strong> {webinar.platform_name}
          </p>

          {webinar.photo && (
            <img
              src={webinar.photo}
              alt={webinar.name}
              className="w-full rounded-lg my-4"
              onError={(e) => (e.currentTarget.src = "/default-webinar.png")}
            />
          )}

          {/* Share / Refer */}
          <div>
            <h6 className="font-semibold">Share / Refer</h6>
            <p className="text-sm text-blue-600 underline cursor-pointer">
              Share this webinar
            </p>
          </div>

          {/* Details */}
          {webinar.details && (
            <div>
              <h3 className="text-lg font-semibold">Details</h3>
              <div
                className="text-gray-700 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: webinar.details }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Right: Webinar Details */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Webinar Details</h2>

          <p>
            <strong>Date & Time:</strong> {webinar.date_time}
          </p>

          {webinar.meeting_id && (
            <p>
              <strong>Meeting ID:</strong> {webinar.meeting_id}
            </p>
          )}

          {webinar.password && (
            <p>
              <strong>Password:</strong> {webinar.password}
            </p>
          )}

          {webinar.link && (
            <p>
              <strong>Join Link: </strong>
              <a
                href={webinar.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {webinar.link}
              </a>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Back button */}
      <div className="lg:col-span-3 pt-4">
        <Button variant="outline" onClick={onBack}>
          ← Back to Webinars
        </Button>
      </div>
    </div>
  );
}
