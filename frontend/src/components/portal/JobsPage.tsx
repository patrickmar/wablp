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
  category_name: string;
  timeAgo: string; // ✅ comes from backend
};

type Category = {
  job_categories_id: number;
  name: string;
};

type JobsPageProps = {
  onSelectJob: (id: number) => void;
};

export function JobsPage({ onSelectJob }: JobsPageProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [institutionFilter, setInstitutionFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch categories
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

  // ✅ Fetch jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (filters: any = {}) => {
    try {
      const res = await axios.get("http://localhost:5000/routes/jobs", { params: filters });
      setJobs(res.data);
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

  return (
    <div className="p-6 space-y-6">
      {/* Search Filters */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Search Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <Input
              placeholder="Institution Name"
              value={institutionFilter}
              onChange={(e) => setInstitutionFilter(e.target.value)}
            />

            <Button onClick={handleSearch} className="bg-blue-600 text-white">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.jobs_id} className="hover:shadow-lg transition">
            {job.photo && (
              <img
                src={job.photo}
                alt={job.title}
                className="w-full h-40 object-cover rounded-t"
                onError={(e) => (e.currentTarget.src = "/default-job.png")}
              />
            )}
            <CardContent className="p-4">
              {/* ✅ Clickable job title */}
              <h3
                className="text-lg font-semibold text-blue-700 hover:underline cursor-pointer"
                onClick={() => onSelectJob(job.jobs_id)}
              >
                {job.title}
              </h3>
              <p className="text-sm text-gray-500">
                {job.timeAgo} | {job.category_name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center text-red-500 font-medium">
          No jobs found. Please adjust your filters.
        </div>
      )}
    </div>
  );
}








// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "../ui/button";
// import { Card, CardContent } from "../ui/card";
// import { Input } from "../ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// type Job = {
//   jobs_id: number;
//   title: string;
//   institution: string;
//   photo: string;
//   category_name: string;
//   timeAgo: string; // ✅ comes from backend
// };

// type Category = {
//   job_categories_id: number;
//   name: string;
// };

// export function JobsPage() {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [institutionFilter, setInstitutionFilter] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   // ✅ Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/routes/jobs/categories");
//         setCategories(res.data);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // ✅ Fetch jobs
//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async (filters: any = {}) => {
//     try {
//       const res = await axios.get("http://localhost:5000/routes/jobs", { params: filters });
//       setJobs(res.data);
//     } catch (err) {
//       console.error("Error fetching jobs:", err);
//     }
//   };

//   const handleSearch = () => {
//     const filters: any = {};
//     if (categoryFilter !== "all") filters.category = categoryFilter;
//     if (institutionFilter.trim() !== "") filters.institution = institutionFilter;
//     if (searchTerm.trim() !== "") filters.search = searchTerm;
//     fetchJobs(filters);
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Search Filters */}
//       <Card>
//         <CardContent className="p-6">
//           <h2 className="text-xl font-semibold mb-4">Search Jobs</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 {categories.map((cat) => (
//                   <SelectItem key={cat.job_categories_id} value={String(cat.job_categories_id)}>
//                     {cat.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Input
//               placeholder="Institution Name"
//               value={institutionFilter}
//               onChange={(e) => setInstitutionFilter(e.target.value)}
//             />

//             <Button onClick={handleSearch} className="bg-blue-600 text-white">
//               Search
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Job Results */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {jobs.map((job) => (
//           <Card key={job.jobs_id} className="hover:shadow-lg transition">
//             {job.photo && (
//               <img
//                 src={job.photo}
//                 alt={job.title}
//                 className="w-full h-40 object-cover rounded-t"
//                 onError={(e) => (e.currentTarget.src = "/default-job.png")}
//               />
//             )}
//             <CardContent className="p-4">
//               <h3 className="text-lg font-semibold text-blue-700 hover:underline">
//                 {job.title}
//               </h3>
//               <p className="text-sm text-gray-500">
//                 {job.timeAgo} | {job.category_name}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {jobs.length === 0 && (
//         <div className="text-center text-red-500 font-medium">
//           No jobs found. Please adjust your filters.
//         </div>
//       )}
//     </div>
//   );
// }