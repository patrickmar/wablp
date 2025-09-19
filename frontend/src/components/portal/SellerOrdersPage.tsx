"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface SellerOrder {
  product_orders_id: number;
  product: number;
  product_name: string;
  client: string;
  client_name: string;
  quantity: string;
  price: string;
  currency: string;
  total: string;
  status: string;
}

interface SellerOrdersPageProps {
  onSelectProduct: (id: number) => void;
}

export function SellerOrdersPage({ onSelectProduct }: SellerOrdersPageProps) {
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const sellerId = localStorage.getItem("userId"); // assumes seller ID is stored in localStorage

  useEffect(() => {
    if (!sellerId) return;
    fetchOrders();
  }, [sellerId]);

  const fetchOrders = () => {
    axios
      .get<SellerOrder[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/orders/seller/${sellerId}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching seller orders:", err))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this order?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/orders/${id}`);
      setOrders(orders.filter((o) => o.product_orders_id !== id));
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/orders/${id}/status`, { status });
      setOrders(
        orders.map((o) =>
          o.product_orders_id === id ? { ...o, status } : o
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <p>Loading seller orders...</p>;

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center">
        <h4>No seller orders yet.</h4>
        <p className="text-gray-500">You haven’t received any product orders.</p>
      </div>
    );
  }

  const getRowColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-50";
      case "CLOSED":
        return "bg-green-50";
      case "ARCHIVED":
        return "bg-red-50";
      default:
        return "";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded">NEW</span>;
      case "CLOSED":
        return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded">CLOSED</span>;
      case "ARCHIVED":
        return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded">ARCHIVED</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded">{status}</span>;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Seller Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Client</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.product_orders_id}
                className={`${getRowColor(order.status)} border`}
              >
                <td className="p-2 border">{order.product_name}</td>
                <td className="p-2 border">{order.quantity}</td>
                <td className="p-2 border">
                  {order.currency} {order.price}
                </td>
                <td className="p-2 border">
                  {order.currency} {order.total}
                </td>
                <td className="p-2 border">{order.client_name}</td>
                <td className="p-2 border">{getStatusBadge(order.status)}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => onSelectProduct(order.product)}
                  >
                    View Product
                  </button>

                  {order.status === "NEW" && (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() =>
                        handleUpdateStatus(order.product_orders_id, "CLOSED")
                      }
                    >
                      Mark Closed
                    </button>
                  )}

                  {order.status !== "ARCHIVED" && (
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() =>
                        handleUpdateStatus(order.product_orders_id, "ARCHIVED")
                      }
                    >
                      Archive
                    </button>
                  )}

                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(order.product_orders_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
