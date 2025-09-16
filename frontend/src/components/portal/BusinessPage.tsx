import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search, MapPin, Building, Users,
  MessageSquare, UserPlus, Eye
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Chad",
  "Chile", "China", "Colombia", "Comoros", "Costa Rica", "Croatia", "Cuba", "Cyprus",
  "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "DR Congo",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
  "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico",
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
  "North Macedonia", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Rwanda", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
  "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea", "South Sudan",
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
  "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

type Business = {
  customers_id: number;
  name: string;
  company_name: string;
  category: string;
  country: string;
  photo: string;
  timestamp: string;
};

// ✅ Added props type
type BusinessPageProps = {
  onSelectBusiness?: (id: number) => void;
};

export function BusinessPage({ onSelectBusiness }: BusinessPageProps) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  const fetchBusinesses = async (filters = {}) => {
    try {
      const res = await axios.get("http://localhost:5000/routes/business", { params: filters });
      setBusinesses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {
    const filters: any = {};
    if (searchTerm) filters.search = searchTerm;
    if (locationFilter !== "all") filters.location = locationFilter;
    if (typeFilter !== "all") filters.category = typeFilter;

    fetchBusinesses(filters);
  };

  const totalPages = Math.ceil(businesses.length / pageSize);
  const paginatedBusinesses = businesses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-6 space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                placeholder="Search businesses..."
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
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Agritech">Agritech</SelectItem>
                <SelectItem value="Business and Finance">Business and Finance</SelectItem>
                <SelectItem value="Social Media">Social Media</SelectItem>
                <SelectItem value="Social Enterprise">Social Enterprise</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={() => { setCurrentPage(1); handleSearch(); }}>Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paginatedBusinesses.map((business) => (
          <Card key={business.customers_id} className="hover:shadow-lg transition">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={business.photo || "/placeholder.png"} />
                  <AvatarFallback>{business.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  {/* ✅ Business name clickable with callback */}
                  <h3
                    className="text-lg font-semibold text-blue-600 cursor-pointer"
                    onClick={() => onSelectBusiness?.(business.customers_id)}
                  >
                    {business.name}
                  </h3>

                  {business.company_name && (
                    <p><Badge>{business.company_name}</Badge></p>
                  )}
                  <p><Badge variant="outline">{business.category}</Badge></p>
                  <p className="text-sm text-gray-500">{business.country}</p>
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
//   Search, MapPin, Building, Users,
//   MessageSquare, UserPlus, Eye
// } from "lucide-react";
// import { Button } from "../ui/button";
// import { Card, CardContent } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Input } from "../ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// // 🌍 List of all countries (shortened for example, but you can expand fully)
// const countries = [
//   "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia",
//   "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
//   "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
//   "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Chad",
//   "Chile", "China", "Colombia", "Comoros", "Costa Rica", "Croatia", "Cuba", "Cyprus",
//   "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "DR Congo",
//   "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
//   "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
//   "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
//   "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
//   "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
//   "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
//   "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico",
//   "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
//   "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
//   "North Macedonia", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea",
//   "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
//   "Rwanda", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
//   "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea", "South Sudan",
//   "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
//   "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
//   "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
//   "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
//   "Yemen", "Zambia", "Zimbabwe"
// ];

// type Business = {
//   customers_id: number;
//   name: string;
//   company_name: string;
//   category: string;
//   country: string;
//   photo: string;
//   timestamp: string;
// };

// export function BusinessPage() {
//   const [businesses, setBusinesses] = useState<Business[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("all");
//   const [typeFilter, setTypeFilter] = useState("all");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 6;

//   useEffect(() => {
//     handleSearch();
//   }, [currentPage]);

//   const fetchBusinesses = async (filters = {}) => {
//     try {
//       const res = await axios.get("http://localhost:5000/routes/business", { params: filters });
//       setBusinesses(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSearch = () => {
//     const filters: any = {};
//     if (searchTerm) filters.search = searchTerm;
//     if (locationFilter !== "all") filters.location = locationFilter;
//     if (typeFilter !== "all") filters.category = typeFilter;

//     fetchBusinesses(filters);
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(businesses.length / pageSize);
//   const paginatedBusinesses = businesses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//   return (
//     <div className="p-6 space-y-6">
//       {/* Search and Filters */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
//               <Input
//                 placeholder="Search businesses..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

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

//             <Select value={typeFilter} onValueChange={setTypeFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="All Types" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Types</SelectItem>
//                 <SelectItem value="Agritech">Agritech</SelectItem>
//                 <SelectItem value="Business and Finance">Business and Finance</SelectItem>
//                 <SelectItem value="Social Media">Social Media</SelectItem>
//                 <SelectItem value="Social Enterprise">Social Enterprise</SelectItem>
//               </SelectContent>
//             </Select>

//             <Button onClick={() => { setCurrentPage(1); handleSearch(); }}>Search</Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Results */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {paginatedBusinesses.map((business) => (
//           <Card key={business.customers_id} className="hover:shadow-lg transition">
//             <CardContent className="p-6">
//               <div className="flex items-start space-x-4">
//                 <Avatar className="w-16 h-16">
//                   <AvatarImage src={business.photo || "/placeholder.png"} />
//                   <AvatarFallback>{business.name?.slice(0, 2)}</AvatarFallback>
//                 </Avatar>

//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold">{business.name}</h3>
//                   {business.company_name && (
//                     <p><Badge>{business.company_name}</Badge></p>
//                   )}
//                   <p><Badge variant="outline">{business.category}</Badge></p>
//                   <p className="text-sm text-gray-500">{business.country}</p>
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
