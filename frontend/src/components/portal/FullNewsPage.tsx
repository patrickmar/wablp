"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type RelatedItem = {
  id: number;
  title: string;
};

// Type for a full news item
type NewsFull = {
  id: number;
  title: string;
  body: string;
  category: string;
  tags: string;
  status: string;
  timestamp: string;
  imageUrl: string;
  related?: RelatedItem[];
};

type FullNewsPageProps = {
  id: string;
  onBack: () => void;
  onSelectNews: (id: string) => void; // ✅ added
};

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "just now";
}

function decodeHtmlEntities(str: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export default function FullNewsPage({ id, onBack, onSelectNews }: FullNewsPageProps) {
  const params = useParams();

  const [news, setNews] = useState<NewsFull | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/news/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching full news:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading news...</p>;
  }

  if (!news) {
    return <p className="p-6 text-red-500">News not found</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main content */}
      <div className="lg:col-span-2 space-y-4">
        <Button variant="outline" onClick={onBack} className="mb-6">
          ← Back to News
        </Button>

        <Card className="shadow-lg rounded-2xl overflow-hidden">
          {news.imageUrl && (
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-64 object-cover"
            />
          )}
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {decodeHtmlEntities(news.title)}
            </CardTitle>
            <p className="text-sm text-gray-500">
              {timeAgo(news.timestamp)} | {news.category || "Uncategorized"}
            </p>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(news.body) }}
            />

            <div>
              <Badge
                className={
                  news.status === "PUBLISHED"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }
              >
                {news.status}
              </Badge>
            </div>

            {news.tags && (
              <p className="text-sm">
                <span className="font-semibold">Tags:</span>{" "}
                {news.tags.split(",").map((t, i) => (
                  <span
                    key={i}
                    className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mr-2"
                  >
                    {t.trim()}
                  </span>
                ))}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Related Sidebar */}
      <div className="sticky top-6 h-fit">
        <h3 className="text-lg font-semibold mb-4">Related</h3>
        {news.related && news.related.length > 0 ? (
          <div className="space-y-3">
            {news.related.map((item, idx) => (
              <div key={item.id}>
                <div
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() => onSelectNews(item.id.toString())} // ✅ use parent handler
                >
                  {decodeHtmlEntities(item.title)}
                </div>
                {idx < (news.related?.length ?? 0) - 1 && (
                  <hr className="my-2 border-gray-300" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No related articles</p>
        )}
      </div>
    </div>
  );
}