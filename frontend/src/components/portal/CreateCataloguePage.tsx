"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";

// Added prop type for onBack
type CreateCataloguePageProps = {
  onBack: () => void;
};

export function CreateCataloguePage({ onBack }: CreateCataloguePageProps) {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id"); // ✅ Detect edit mode

  const [form, setForm] = useState({
    name: "",
    stock_available: "",
    uom: "",
    type: "",
    category: "",
    price: "",
    currency: "",
    contact_email: "",
    contact_phone: "",
    website: "",
    status: "PUBLISHED",
    description: "",
  });

  const [categories, setCategories] = useState<{ product_categories_id: string; name: string }[]>([]);
  const [types, setTypes] = useState<{ product_types_id: string; name: string }[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [document, setDocument] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // new: document preview URL and filename
  const [documentPreviewName, setDocumentPreviewName] = useState<string | null>(null);
  const [documentPreviewURL, setDocumentPreviewURL] = useState<string | null>(null);

  // ✅ Fetch categories, types, and product (if editing)
  useEffect(() => {
    fetchCategories();
    fetchTypes();
    if (productId) {
      fetchProduct(productId);
    }
    // cleanup on unmount: revoke created object URLs
    return () => {
      if (documentPreviewURL) {
        try {
          URL.revokeObjectURL(documentPreviewURL);
        } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/routes/catalogues/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
    }
  };

  const fetchTypes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/routes/catalogues/types");
      setTypes(res.data);
    } catch (err) {
      console.error("❌ Error fetching types:", err);
    }
  };

  const fetchProduct = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:5000/routes/catalogues/${id}`);
      const prod = res.data;
      setForm({
        name: prod.name || "",
        stock_available: prod.stock_available || "",
        uom: prod.uom || "",
        type: prod.type || "",
        category: prod.category || "",
        price: prod.price || "",
        currency: prod.currency || "",
        contact_email: prod.contact_email || "",
        contact_phone: prod.contact_phone || "",
        website: prod.website || "",
        status: prod.status || "PUBLISHED",
        description: prod.description || "",
      });
      if (prod.photo) setPreview(prod.photo);
      // if existing document link present from backend, show filename + url
      if (prod.document) {
        setDocumentPreviewName(prod.document.split("/").pop() || prod.document);
        setDocumentPreviewURL(prod.document);
      }
    } catch (err) {
      console.error("❌ Error fetching product details:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "photo" | "document") => {
    const file = e.target.files?.[0] || null;
    if (field === "photo") {
      setPhoto(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    } else {
      // document handling: keep file and create preview name + object URL (for open/download)
      // revoke previous URL if any
      if (documentPreviewURL) {
        try {
          URL.revokeObjectURL(documentPreviewURL);
        } catch {}
        setDocumentPreviewURL(null);
      }

      setDocument(file);
      if (file) {
        setDocumentPreviewName(file.name);
        const url = URL.createObjectURL(file);
        setDocumentPreviewURL(url);
      } else {
        setDocumentPreviewName(null);
        setDocumentPreviewURL(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (photo) formData.append("photo", photo);
      if (document) formData.append("document", document);

      let res;
      if (productId) {
        // ✅ Edit existing product
        res = await axios.put(`http://localhost:5000/routes/catalogues/${productId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // ✅ Create new product
        res = await axios.post("http://localhost:5000/routes/catalogues", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert(res.data.MESSAGE || (productId ? "Catalogue updated" : "Catalogue created successfully"));
    } catch (err) {
      console.error("❌ Error saving catalogue:", err);
      alert("Failed to save catalogue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardContent className="p-6">
          {/* added back button next to title only */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {productId ? "Edit Catalogue" : "Create Catalogue"}
            </h2>
            <Button variant="outline" onClick={onBack}>
              ← Back
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image Upload */}
            <div className="col-span-2 flex flex-col items-center">
              {preview ? (
                <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-md mb-2" />
              ) : (
                <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-md mb-2">
                  No Image
                </div>
              )}
              <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "photo")} />
            </div>

            <Input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
            <Input name="stock_available" placeholder="Stock Available" value={form.stock_available} onChange={handleChange} required />
            <Input name="uom" placeholder="Unit of Measure" value={form.uom} onChange={handleChange} required />

            {/* ✅ Dynamic Types */}
            <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((t) => (
                  <SelectItem key={t.product_types_id} value={t.product_types_id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* ✅ Dynamic Categories */}
            <Select value={form.category} onValueChange={(val) => setForm({ ...form, category: val })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.product_categories_id} value={c.product_categories_id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
            <Input name="currency" placeholder="Currency" value={form.currency} onChange={handleChange} required />
            <Input type="email" name="contact_email" placeholder="Contact Email" value={form.contact_email} onChange={handleChange} required />
            <Input name="contact_phone" placeholder="Contact Phone" value={form.contact_phone} onChange={handleChange} required />
            <Input type="url" name="website" placeholder="Website" value={form.website} onChange={handleChange} required />

            {/* Status */}
            <Select value={form.status} onValueChange={(val) => setForm({ ...form, status: val })}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLISHED">PUBLISHED</SelectItem>
                <SelectItem value="DRAFT">DRAFT</SelectItem>
                <SelectItem value="ARCHIVED">ARCHIVED</SelectItem>
              </SelectContent>
            </Select>

            {/* Document Upload */}
            <div className="col-span-2">
              <label className="block text-sm font-medium">Document (PDF)</label>
              <Input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, "document")} />
              {/* show preview name + open link if available */}
              {documentPreviewName && (
                <div className="mt-2">
                  <p className="text-sm text-gray-700">📄 {documentPreviewName}</p>
                  {documentPreviewURL && (
                    <a
                      href={documentPreviewURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Open / Download
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="col-span-2">
              <Textarea
                name="description"
                placeholder="Description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit */}
            <div className="col-span-2 flex justify-center">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : productId ? "Update Product" : "Save Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}










// "use client";

// import { useState } from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";

// type Props = {
//   onBack: () => void;
// };

// export function CreateCataloguePage({ onBack }: Props) {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [currency, setCurrency] = useState("USD");
//   const [description, setDescription] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       // 🔹 Example API call to your backend
//       const res = await fetch("http://localhost:5000/routes/catalogues/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, price, currency, description }),
//       });

//       if (!res.ok) throw new Error("Failed to create catalogue");

//       alert("✅ Catalogue created successfully!");
//       onBack();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error creating catalogue");
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h2 className="text-xl font-bold">Create New Catalogue</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Product Name</label>
//           <Input value={name} onChange={(e) => setName(e.target.value)} required />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Price</label>
//           <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Currency</label>
//           <Input value={currency} onChange={(e) => setCurrency(e.target.value)} />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Description</label>
//           <Textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>

//         <div className="flex space-x-3">
//           <Button type="submit" className="bg-blue-600 text-white">
//             Save Catalogue
//           </Button>
//           <Button type="button" variant="outline" onClick={onBack}>
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
