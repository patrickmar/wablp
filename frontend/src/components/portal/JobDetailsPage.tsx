"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import DOMPurify from "dompurify";

type JobDetailsPageProps = {
  id: string;
  onBack: () => void;
};

type Job = {
  jobs_id: number;
  title: any;
  description: any;
  more_details: any;
  salary: any;
  application_link: any;
  document: any;
  photo: any;
  category_name: any;
  timeAgo: any;
};

export default function JobDetailsPage({ id, onBack }: JobDetailsPageProps) {
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("❌ Error fetching job details:", err);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) {
    return <div className="p-6">Loading job details...</div>;
  }

  // ✅ Clean HTML: strip inline styles but keep <ul><li>
  const cleanDescription = DOMPurify.sanitize(job.description || "", {
    FORBID_ATTR: ["style"],
  });
  const cleanMoreDetails = DOMPurify.sanitize(job.more_details || "", {
    FORBID_ATTR: ["style"],
  });

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold">{String(job.title || "-")}</h2>
          <p className="text-sm text-gray-500">
            {String(job.timeAgo || "-")} | {String(job.category_name || "-")}
          </p>

          {job.photo && (
            <img
              src={String(job.photo)}
              alt={String(job.title || "Job Image")}
              className="w-full rounded-lg my-4"
              onError={(e) => (e.currentTarget.src = "/default-job.png")}
            />
          )}

          <div className="mt-4">
            <h6 className="font-semibold">Share / Refer</h6>
            <p className="text-sm text-blue-600 underline cursor-pointer">
              Share this job
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Right Column */}
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* ✅ Description with clean HTML */}
          <div>
            <h3 className="text-lg font-semibold">Description</h3>
            <div
              className="text-gray-700 prose prose-li:list-disc prose-li:ml-5 max-w-none"
              dangerouslySetInnerHTML={{ __html: cleanDescription }}
            />
          </div>

          {/* ✅ More Details with clean HTML */}
          <div>
            <h3 className="text-lg font-semibold">More Details</h3>
            <div
              className="text-gray-700 prose prose-li:list-disc prose-li:ml-5 max-w-none"
              dangerouslySetInnerHTML={{ __html: cleanMoreDetails }}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">Salary</h3>
            <p className="text-gray-700">
              {String(job.salary || "Not specified")}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Downloads</h3>
            {job.document ? (
              <a
                href={String(job.document)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View / Download
              </a>
            ) : (
              <p className="text-gray-500">No document available</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold">Application Link</h3>
            {job.application_link ? (
              <a
                href={String(job.application_link)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {String(job.application_link)}
              </a>
            ) : (
              <p className="text-gray-500">No application link</p>
            )}
          </div>

          <div className="pt-6">
            <Button variant="outline" onClick={onBack}>
              ← Back to Jobs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
