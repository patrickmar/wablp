import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// Types
type Webinar = {
  webinars_id: number;
  name: string;
  photo: string;
  timestamp: string;
  platform_name: string;
};

type Platform = {
  webinar_platforms_id: number;
  name: string;
};

// ✅ Mapping platform names to icons (you can replace with actual logo URLs if available)
const platformIcons: Record<string, string> = {
  Zoom: "/icons/zoom.png",
  "Google Meet": "/icons/google-meet.png",
  "Microsoft Teams": "/icons/teams.png",
  Webex: "/icons/webex.png",
  Skype: "/icons/skype.png",
};

export function WebinarsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platformFilter, setPlatformFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Fetch webinar platforms
  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/routes/webinars/platforms");
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
      const res = await axios.get("http://localhost:5000/routes/webinars", { params: filters });
      setWebinars(res.data);
      setCurrentPage(1); // reset to first page after new search
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

  // ✅ Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentWebinars = webinars.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(webinars.length / itemsPerPage);

  // ✅ Helper to get icon by platform name
  const getPlatformIcon = (name: string) => {
    const normalized = name.trim();
    return platformIcons[normalized] || null;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Search Filters */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Search Webinars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Platform Filter */}
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

            {/* Search term */}
            <Input
              placeholder="Search by webinar title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Search Button */}
            <Button onClick={handleSearch} className="bg-blue-600 text-white">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
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

      {/* Webinars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentWebinars.map((w) => (
          <Card key={w.webinars_id} className="hover:shadow-lg transition">
            {/* Webinar Image */}
            {w.photo && (
              <img
                src={w.photo}
                alt={w.name}
                className="w-full h-40 object-cover rounded-t"
                onError={(e) => (e.currentTarget.src = "/default-webinar.png")} // fallback
              />
            )}
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-blue-700 hover:underline">
                {w.name}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span>{w.timestamp}</span>
                <span className="flex items-center gap-1">
                  {getPlatformIcon(w.platform_name) && (
                    <img
                      src={getPlatformIcon(w.platform_name)!}
                      alt={w.platform_name}
                      className="h-5 inline-block"
                    />
                  )}
                  {w.platform_name}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {webinars.length === 0 && (
        <div className="text-center text-red-500 font-medium">
          No webinars found. Please adjust your filters.
        </div>
      )}
    </div>
  );
}
