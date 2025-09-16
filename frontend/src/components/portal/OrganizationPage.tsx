import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search, Users, MessageSquare, UserPlus, Eye
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia",
  "Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium",
  "Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei",
  "Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Chad",
  "Chile","China","Colombia","Comoros","Costa Rica","Croatia","Cuba","Cyprus",
  "Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","DR Congo",
  "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini",
  "Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana",
  "Greece","Grenada","Guatemala","Guinea","Guyana","Haiti","Honduras","Hungary","Iceland",
  "India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon",
  "Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar",
  "Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico",
  "Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia",
  "Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
  "North Macedonia","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea",
  "Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia",
  "Rwanda","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone",
  "Singapore","Slovakia","Slovenia","Somalia","South Africa","South Korea","South Sudan",
  "Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan",
  "Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia",
  "Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom",
  "United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam",
  "Yemen","Zambia","Zimbabwe"
];

type Organization = {
  customers_id: number;
  name: string;
  company_name: string;
  category: string;
  country: string;
  photo: string;
};

interface OrganizationPageProps {
  onSelectOrganization?: (id: number) => void;
}

export function OrganizationPage({ onSelectOrganization }: OrganizationPageProps) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [categories, setCategories] = useState<{ mentor_categories_id: number; name: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    fetchCategories();
    handleSearch();
  }, [currentPage]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/routes/organizations/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
    }
  };

  const fetchOrganizations = async (filters = {}) => {
    try {
      const res = await axios.get("http://localhost:5000/routes/organizations", { params: filters });
      setOrganizations(res.data);
    } catch (err) {
      console.error("❌ Error fetching organizations:", err);
    }
  };

  const handleSearch = () => {
    const filters: any = {};
    if (searchTerm) filters.search = searchTerm;
    if (locationFilter !== "all") filters.location = locationFilter;
    if (categoryFilter !== "all") filters.category = categoryFilter;

    fetchOrganizations(filters);
  };

  // Pagination logic
  const totalPages = Math.ceil(organizations.length / pageSize);
  const paginatedOrganizations = organizations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6 space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                <SelectItem value="all">🌍 All Locations</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.mentor_categories_id} value={cat.mentor_categories_id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={() => {
                setCurrentPage(1);
                handleSearch();
              }}
            >
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paginatedOrganizations.map((org) => (
          <Card key={org.customers_id} className="hover:shadow-lg transition">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={org.photo || "/placeholder.png"} />
                  <AvatarFallback>{org.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  {/* ✅ Clickable org name */}
                  <h3
                    className={`text-lg font-semibold ${
                      onSelectOrganization ? "text-blue-600 cursor-pointer hover:underline" : ""
                    }`}
                    onClick={() => onSelectOrganization?.(org.customers_id)}
                  >
                    {org.name}
                  </h3>

                  {org.company_name && <p><Badge>{org.company_name}</Badge></p>}
                  <p><Badge variant="outline">{org.category}</Badge></p>
                  <p className="text-sm text-gray-500">{org.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </Button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
















// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Search, Users, MessageSquare, UserPlus, Eye
// } from "lucide-react";
// import { Button } from "../ui/button";
// import { Card, CardContent } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Input } from "../ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Link } from "react-router-dom"; // ✅ Added import

// // 🌍 List of all countries (same as BusinessPage)
// const countries = [ 
//   "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia",
//   "Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium",
//   "Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei",
//   "Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Chad",
//   "Chile","China","Colombia","Comoros","Costa Rica","Croatia","Cuba","Cyprus",
//   "Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","DR Congo",
//   "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini",
//   "Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana",
//   "Greece","Grenada","Guatemala","Guinea","Guyana","Haiti","Honduras","Hungary","Iceland",
//   "India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan",
//   "Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon",
//   "Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar",
//   "Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico",
//   "Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia",
//   "Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
//   "North Macedonia","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea",
//   "Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia",
//   "Rwanda","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone",
//   "Singapore","Slovakia","Slovenia","Somalia","South Africa","South Korea","South Sudan",
//   "Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan",
//   "Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia",
//   "Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom",
//   "United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam",
//   "Yemen","Zambia","Zimbabwe"
// ];

// type Organization = {
//   customers_id: number;
//   name: string;
//   company_name: string;
//   category: string;
//   country: string;
//   photo: string;
// };

// export function OrganizationPage() {
//   const [organizations, setOrganizations] = useState<Organization[]>([]);
//   const [categories, setCategories] = useState<{ mentor_categories_id: number, name: string }[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("all");
//   const [categoryFilter, setCategoryFilter] = useState("all");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 6;

//   useEffect(() => {
//     fetchCategories();
//     handleSearch();
//   }, [currentPage]);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/routes/organizations/categories");
//       setCategories(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching categories:", err);
//     }
//   };

//   const fetchOrganizations = async (filters = {}) => {
//     try {
//       const res = await axios.get("http://localhost:5000/routes/organizations", { params: filters });
//       setOrganizations(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching organizations:", err);
//     }
//   };

//   const handleSearch = () => {
//     const filters: any = {};
//     if (searchTerm) filters.search = searchTerm;
//     if (locationFilter !== "all") filters.location = locationFilter;
//     if (categoryFilter !== "all") filters.category = categoryFilter;

//     fetchOrganizations(filters);
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(organizations.length / pageSize);
//   const paginatedOrganizations = organizations.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//   return (
//     <div className="p-6 space-y-6">
//       {/* Search and Filters */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
//               <Input
//                 placeholder="Search organizations..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             {/* Country Filter */}
//             <Select value={locationFilter} onValueChange={setLocationFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="All Locations" />
//               </SelectTrigger>
//               <SelectContent className="max-h-60 overflow-y-auto">
//                 <SelectItem value="all">🌍 All Locations</SelectItem>
//                 {countries.map((country) => (
//                   <SelectItem key={country} value={country}>{country}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {/* Category Filter */}
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="All Categories" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 {categories.map((cat) => (
//                   <SelectItem key={cat.mentor_categories_id} value={cat.mentor_categories_id.toString()}>
//                     {cat.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Button onClick={() => { setCurrentPage(1); handleSearch(); }}>Search</Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Results */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {paginatedOrganizations.map((org) => (
//           <Card key={org.customers_id} className="hover:shadow-lg transition">
//             <CardContent className="p-6">
//               <div className="flex items-start space-x-4">
//                 <Avatar className="w-16 h-16">
//                   <AvatarImage src={org.photo || "/placeholder.png"} />
//                   <AvatarFallback>{org.name?.slice(0, 2)}</AvatarFallback>
//                 </Avatar>

//                 <div className="flex-1">
//                   {/* ✅ Org name is now clickable */}
//                   <h3 className="text-lg font-semibold">
//                     <Link
//                       to={`/organizations/${org.customers_id}`}
//                       className="text-blue-600 hover:underline"
//                     >
//                       {org.name}
//                     </Link>
//                   </h3>

//                   {org.company_name && (
//                     <p><Badge>{org.company_name}</Badge></p>
//                   )}
//                   <p><Badge variant="outline">{org.category}</Badge></p>
//                   <p className="text-sm text-gray-500">{org.country}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center space-x-2 mt-6">
//           <Button
//             variant="outline"
//             size="sm"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//           >
//             Prev
//           </Button>

//           <span className="text-sm">
//             Page {currentPage} of {totalPages}
//           </span>

//           <Button
//             variant="outline"
//             size="sm"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//           >
//             Next
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }
