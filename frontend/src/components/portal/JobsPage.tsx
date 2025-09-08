import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Job = {
  jobs_id: number;
  title: string;
  institution: string;
  photo: string;
  timestamp: string;
  category_name: string;
};

type Category = {
  job_categories_id: number;
  name: string;
};

export function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [institutionFilter, setInstitutionFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  // ✅ Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/routes/jobs/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Fetch jobs from backend
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (filters: any = {}) => {
    try {
      const res = await axios.get("http://localhost:5000/routes/jobs", { params: filters });
      setJobs(res.data);
      setCurrentPage(1); // reset to first page after search
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleSearch = () => {
    const filters: any = {};
    if (categoryFilter !== "all") filters.category = categoryFilter;
    if (institutionFilter.trim() !== "") filters.institution = institutionFilter;
    if (searchTerm.trim() !== "") filters.search = searchTerm;
    fetchJobs(filters);
  };

  // ✅ Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="p-6 space-y-6">
      {/* Search Filters */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Search Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.job_categories_id} value={String(cat.job_categories_id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Institution Filter */}
            <Input
              placeholder="Institution Name"
              value={institutionFilter}
              onChange={(e) => setInstitutionFilter(e.target.value)}
            />

            {/* Search Button */}
            <Button onClick={handleSearch} className="bg-blue-600 text-white">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      {jobs.length > 0 && (
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>
            Showing {indexOfFirstJob + 1}–{Math.min(indexOfLastJob, jobs.length)} of {jobs.length} jobs
          </p>
          <p>Page {currentPage} of {totalPages}</p>
        </div>
      )}

      {/* Job Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <Card key={job.jobs_id} className="hover:shadow-lg transition">
            {/* Job Image */}
            {job.photo && (
              <img
                src={job.photo}
                alt={job.title}
                className="w-full h-40 object-cover rounded-t"
                onError={(e) => (e.currentTarget.src = "/default-job.png")}
              />
            )}
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-blue-700 hover:underline">
                {job.title}
              </h3>
              <p className="text-sm text-gray-500">
                {job.timestamp} | {job.category_name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {jobs.length > jobsPerPage && (
        <div className="flex justify-center space-x-4 mt-6">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* No Results */}
      {jobs.length === 0 && (
        <div className="text-center text-red-500 font-medium">
          No jobs found. Please adjust your filters.
        </div>
      )}
    </div>
  );
}
