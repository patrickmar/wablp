"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

type Product = {
  products_id: string;
  name: string;
  description: string;
  category: string;
  category_name: string;
  type: string;
  currency: string;
  price: string;
  photo: string;
  stock_available: string;
  uom: string;
  contact_email: string;
  contact_phone: string;
  website: string;
  timeAgo: string;
  seller?: string; // optional
};

type ProductDetailsPageProps = {
  id: string;
  onBack: () => void;
};

export function ProductDetailsPage({ id, onBack }: ProductDetailsPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [shippingDetails, setShippingDetails] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/routes/catalogues/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("❌ Error fetching product:", err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const client_id = localStorage.getItem("userId"); // 👈 logged-in user
      if (!client_id) {
        alert("You must be logged in to place an order.");
        return;
      }

      await axios.post("http://localhost:5000/routes/orders", {
        product_id: product?.products_id,
        quantity,
        shipping_details: shippingDetails,
        description: notes,
        client_id,
        price: product?.price,
        currency: product?.currency,
        seller: product?.seller || "",
      });

      alert("✅ Order placed successfully!");
      setShowForm(false);
      setQuantity("");
      setShippingDetails("");
      setNotes("");
    } catch (err) {
      console.error("❌ Error placing order:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      {/* Back button */}
      <Button variant="outline" onClick={onBack} className="mb-6">
        ← Back to Catalogue
      </Button>

      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side: Image + description */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-sm text-gray-500">
                {product.type} | {product.category_name} • {product.timeAgo}
              </p>

              <img
                src={product.photo}
                alt={product.name}
                className="w-full rounded-md mt-4"
              />
              <p className="mt-4 leading-relaxed">{product.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right side: Catalogue details (sticky) */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-3">
              <h4 className="text-xl font-semibold">Catalogue Details</h4>
              <p>
                Stock: {product.stock_available} {product.uom}
              </p>
              <p>SKU: {product.products_id}</p>
              <p>Email: {product.contact_email}</p>
              <p>Phone: {product.contact_phone}</p>
              <p>
                Website:{" "}
                <a
                  href={product.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {product.website}
                </a>
              </p>

              {/* Price button */}
              <Button className="w-full bg-blue-600 text-white">
                {product.currency}
                {product.price}
              </Button>

              {/* Order Now toggle */}
              <Button
                className="w-full bg-green-600 text-white mt-3"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "Cancel Order" : "Order Now"}
              </Button>

              {/* Order form */}
              {showForm && (
                <form onSubmit={handleSubmit} className="space-y-3 mt-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="w-full border p-2 rounded"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Shipping Details
                    </label>
                    <textarea
                      className="w-full border p-2 rounded"
                      value={shippingDetails}
                      onChange={(e) => setShippingDetails(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Order Notes
                    </label>
                    <textarea
                      className="w-full border p-2 rounded"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 text-white">
                    Send Order
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
