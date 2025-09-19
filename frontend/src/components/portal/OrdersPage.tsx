"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

type Order = {
  product_orders_id: number;
  product: number;
  product_name: string;
  quantity: number;
  price: number;
  currency: string;
  total: number;
  seller_name: string;
  status: string;
};

type MyOrdersPageProps = {
  onViewProduct: (id: string) => void;
};

export function MyOrdersPage({ onViewProduct }: MyOrdersPageProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") || "" : "";

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/orders/${userId}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("❌ Error fetching orders:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this record?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o.product_orders_id !== id));
    } catch (err) {
      console.error("❌ Error deleting order:", err);
    }
  };

  const rowClass = (status: string) => {
    if (status === "NEW") return "bg-blue-50";
    if (status === "CLOSED") return "bg-green-50";
    if (status === "ARCHIVED") return "bg-red-50";
    return "";
  };

  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="p-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">My Orders</h2>

          {orders.length === 0 ? (
            <div className="text-center py-10">
              <img src="/notfound.png" alt="Not found" className="mx-auto mb-4" />
              <h4>No orders for now</h4>
              <Button variant="outline" className="mt-4">
                Search Products
              </Button>
            </div>
          ) : (
            <table className="w-full border border-gray-300 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Product</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Total</th>
                  <th className="p-2 border">Store</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.product_orders_id} className={rowClass(o.status)}>
                    <td className="p-2 border">{o.product_name}</td>
                    <td className="p-2 border">{o.quantity}</td>
                    <td className="p-2 border">{o.currency}{o.price}</td>
                    <td className="p-2 border">{o.currency}{o.total}</td>
                    <td className="p-2 border">{o.seller_name}</td>
                    <td className="p-2 border font-medium">{o.status}</td>
                    <td className="p-2 border space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => onViewProduct(o.product.toString())}
                      >
                        View Product
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(o.product_orders_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
