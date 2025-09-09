import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Tender = {
  tenders_id: number;
  title: string;
  timestamp: number;
  timeAgo: string; // ✅ coming from backend
  type: string;
  category: string;
  currency: string;
  tender_value: string;
  bid_open_date: string;
  bid_close_date: string;
};

type TypeOption = {
  tender_types_id: number;
  name: string;
};

type CategoryOption = {
  tender_categories_id: number;
  name: string;
};

export function TendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [types, setTypes] = useState<TypeOption[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Fetch types
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/routes/tenders/types");
        setTypes(res.data);
      } catch (err) {
        console.error("Error fetching tender types:", err);
      }
    };
    fetchTypes();
  }, []);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/routes/tenders/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching tender categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Fetch tenders
  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async (filters: any = {}) => {
    try {
      const res = await axios.get("http://localhost:5000/routes/tenders", { params: filters });
      setTenders(res.data);
      setCurrentPage(1); // reset to first page on new search
    } catch (err) {
      console.error("Error fetching tenders:", err);
    }
  };

  const handleSearch = () => {
    const filters: any = {};
    if (typeFilter !== "all") filters.type = typeFilter;
    if (categoryFilter !== "all") filters.category = categoryFilter;
    if (searchTerm.trim() !== "") filters.search = searchTerm;
    fetchTenders(filters);
  };

  // ✅ Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTenders = tenders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(tenders.length / itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      {/* Search Filters */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Search Tenders</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((t) => (
                  <SelectItem key={t.tender_types_id} value={String(t.tender_types_id)}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.tender_categories_id} value={String(c.tender_categories_id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Search term */}
            <Input
              placeholder="Search tenders..."
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

      {/* Results Summary + Pagination Controls */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>
          Showing {tenders.length} tender{tenders.length !== 1 ? "s" : ""} found
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

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentTenders.map((t) => (
          <Card key={t.tenders_id} className="hover:shadow-lg transition">
            <CardContent className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-blue-700 hover:underline">
                {t.title}
              </h3>
              <p className="text-sm text-gray-500">
                {t.timeAgo} | {t.category}
              </p>
              <p className="text-sm font-medium">
                {t.currency}{t.tender_value}
              </p>
              <hr className="my-2" />
              <p className="text-sm">🟢 Open: {t.bid_open_date}</p>
              <p className="text-sm">🔴 Close: {t.bid_close_date}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {tenders.length === 0 && (
        <div className="text-center text-red-500 font-medium">
          No tenders found. Please adjust your filters.
        </div>
      )}
    </div>
  );
}
