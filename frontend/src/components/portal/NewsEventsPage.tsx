"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type NewsItem = {
  id: number;
  imageUrl: string | null;
  status: string;
  tags: string;
  timestamp: string;
  title: string;
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

export default function NewsEventsPage({
  onSelectNews,
}: {
  onSelectNews: (id: number) => void;
}) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [tag, setTag] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/newsfull`)
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error(err));
  }, []);

  const uniqueTags = Array.from(
    new Set(
      news.flatMap((n) =>
        n.tags ? n.tags.split(",").map((t) => t.trim()).filter(Boolean) : []
      )
    )
  );

  const filteredNews = news.filter((item) => {
    let matches: boolean = true;
    if (search) {
      matches =
        matches && item.title.toLowerCase().includes(search.toLowerCase());
    }
    if (status !== "all") {
      matches = matches && item.status === status;
    }
    if (tag !== "all") {
      matches =
        matches &&
        !!item.tags &&
        item.tags.toLowerCase().includes(tag.toLowerCase());
    }
    return matches;
  });

  const totalPages = Math.ceil(filteredNews.length / pageSize);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return (
          <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
            Published
          </span>
        );
      case "DRAFT":
        return (
          <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full">
            Draft
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">News & Events</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Select
          value={status}
          onValueChange={(val) => {
            setStatus(val);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={tag}
          onValueChange={(val) => {
            setTag(val);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {uniqueTags.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedNews.map((item) => (
          <Card key={item.id} className="rounded-2xl shadow-md overflow-hidden">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
            )}
            <CardHeader>
              {/* ✅ clickable title now uses onSelectNews */}
              <CardTitle
                onClick={() => onSelectNews(item.id)}
                className="text-lg font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
              >
                {decodeHtmlEntities(item.title)}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p className="text-xs text-gray-500">
                {timeAgo(item.timestamp)} | News
              </p>
              <div>{getStatusBadge(item.status)}</div>
              <p>
                <span className="font-semibold">Tags:</span> {item.tags}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
