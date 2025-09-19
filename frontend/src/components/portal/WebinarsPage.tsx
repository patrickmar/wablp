import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Webinar = {
  webinars_id: number;
  name: string;
  photo: string;
  platform_name: string;
  timeAgo: string; // ✅ comes from backend
};

type Platform = {
  webinar_platforms_id: number;
  name: string;
};

export function WebinarsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platformFilter, setPlatformFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Fetch platforms
  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/webinars/platforms`);
        setPlatforms(res.data);
      } catch (err) {
        console.error("Error fetching platforms:", err);
      }
    };
    fetchPlatforms();
  }, []);

  // ✅ Fetch webinars
  useEffect(() => {
    fetchWebinars();
  }, []);

  const fetchWebinars = async (filters: any = {}) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/webinars`, { params: filters });
      setWebinars(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching webinars:", err);
    }
  };

  const handleSearch = () => {
    const filters: any = {};
    if (platformFilter !== "all") filters.platform = platformFilter;
    if (searchTerm.trim() !== "") filters.search = searchTerm;
    fetchWebinars(filters);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentWebinars = webinars.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(webinars.length / itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Search Webinars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {platforms.map((p) => (
                  <SelectItem key={p.webinar_platforms_id} value={String(p.webinar_platforms_id)}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Search by webinar title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Button onClick={handleSearch} className="bg-blue-600 text-white">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>
          Showing {webinars.length} webinar{webinars.length !== 1 ? "s" : ""} found
        </p>
        {totalPages > 1 && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="px-2 py-1 border rounded">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentWebinars.map((w) => (
          <Card key={w.webinars_id} className="hover:shadow-lg transition">
            {w.photo && (
              <img
                src={w.photo}
                alt={w.name}
                className="w-full h-40 object-cover rounded-t"
                onError={(e) => (e.currentTarget.src = "/default-webinar.png")}
              />
            )}
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-blue-700 hover:underline">
                {w.name}
              </h3>
              <p className="text-sm text-gray-500">
                {w.timeAgo} | {w.platform_name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {webinars.length === 0 && (
        <div className="text-center text-red-500 font-medium">
          No webinars found. Please adjust your filters.
        </div>
      )}
    </div>
  );
}