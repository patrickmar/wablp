// CataloguePage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";

type Product = {
  products_id: number;
  name: string;
  category: string;
  category_name?: string;
  type: string;
  currency: string;
  price: string;
  photo: string;
  timeAgo: string;
};

// ✅ Props
type CataloguePageProps = {
  onSelectProduct: (id: number) => void;
  onCreateCatalogue: () => void;
};

export function CataloguePage({ onSelectProduct, onCreateCatalogue }: CataloguePageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ product_categories_id: number; name: string }[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    fetchCategories();
    handleSearch();
  }, [currentPage]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/routes/catalogues/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
    }
  };

  const fetchProducts = async (filters = {}) => {
    try {
      const res = await axios.get("http://localhost:5000/routes/catalogues", { params: filters });
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  };

  const handleSearch = () => {
    const filters: any = {};
    if (searchTerm) filters.search = searchTerm;
    if (categoryFilter !== "all") filters.category = categoryFilter;
    if (typeFilter !== "all") filters.type = typeFilter;
    fetchProducts(filters);
  };

  const totalPages = Math.ceil(products.length / pageSize);
  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6 space-y-6">
      {/* Search + Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem
                    key={cat.product_categories_id}
                    value={cat.product_categories_id.toString()}
                  >
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="digital">Digital</SelectItem>
                <SelectItem value="physical">Physical</SelectItem>
                <SelectItem value="service">Service</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex space-x-2">
              <Button
                onClick={() => {
                  setCurrentPage(1);
                  handleSearch();
                }}
              >
                Search
              </Button>

              <Button className="bg-green-600 text-white" onClick={onCreateCatalogue}>
                + Create Catalogue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <Card key={product.products_id} className="hover:shadow-lg transition">
            <CardContent className="p-4">
              <img
                src={product.photo}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h5 className="mt-3 text-lg font-semibold">{product.name}</h5>
              <p className="text-sm text-gray-500">{product.category_name || product.category}</p>
              <p className="text-xs text-gray-400">{product.timeAgo}</p>

              {/* ✅ Call parent when clicked */}
              <Button
                className="w-full mt-3 bg-blue-600 text-white"
                onClick={() => onSelectProduct(product.products_id)}
              >
                {product.currency}
                {product.price}
              </Button>
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
