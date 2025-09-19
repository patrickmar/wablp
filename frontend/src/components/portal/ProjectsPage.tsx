import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Project = {
  projects_id: number;
  name: string;
  photo: string;
  timestamp: string;
  timeAgo: string;
  country_name: string;
  owner_name: string;
};

type Country = {
  countries_id: number;
  name: string;
};

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryFilter, setCountryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/projects/countries`);
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // ✅ Fetch projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async (filters: any = {}) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/projects`, { params: filters });
      setProjects(res.data);
      setCurrentPage(1); // reset page after new search
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleSearch = () => {
    const filters: any = {};
    if (countryFilter !== "all") filters.country = countryFilter;
    if (searchTerm.trim() !== "") filters.search = searchTerm;
    fetchProjects(filters);
  };

  // ✅ Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Search Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Country filter */}
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((c) => (
                  <SelectItem key={c.countries_id} value={String(c.countries_id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Search input */}
            <Input
              placeholder="Search by project name or owner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Search button */}
            <Button onClick={handleSearch} className="bg-blue-600 text-white">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary + Pagination Controls */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>
          Showing {projects.length} project{projects.length !== 1 ? "s" : ""} found
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentProjects.map((p) => (
          <Card key={p.projects_id} className="hover:shadow-lg transition">
            {/* Image */}
            {p.photo && (
              <img
                src={p.photo}
                alt={p.name}
                className="w-full h-40 object-cover rounded-t"
                onError={(e) => (e.currentTarget.src = "/default-project.png")}
              />
            )}
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-blue-700 hover:underline">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.timeAgo}</p>
              <p className="text-sm text-gray-600">
                {p.country_name} | Owned by {p.owner_name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {projects.length === 0 && (
        <div className="text-center text-red-500 font-medium">
          No projects found. Please adjust your filters.
        </div>
      )}
    </div>
  );
}
