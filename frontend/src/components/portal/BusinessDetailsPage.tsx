import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import ChatBox from "./ChatBox";

type BusinessDetailsPageProps = {
  id: string;
  onBack: () => void;
};

type Business = {
  customers_id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  category: string;
  business_type?: string;
  business_reg_number?: string;
  company_certifications?: string;
  company_documents?: string;
  website?: string;
  address?: string;
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  about_me?: string;
  photo: string | null;
};

type Product = {
  id?: number; // sometimes may be missing
  name: string;
  category: string;
  price: number;
  photo?: string | null;
};

export default function BusinessDetailsPage({ id, onBack }: BusinessDetailsPageProps) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [status, setStatus] = useState("Offline");
  const [chatOpen, setChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const userId = localStorage.getItem("userId");

  // Fetch business
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/business/${id}`);
        setBusiness(res.data);
      } catch (err) {
        console.error("❌ Error loading business:", err);
      }
    };
    fetchBusiness();
  }, [id]);

  // Poll status
  useEffect(() => {
    const pingStatus = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/status/${id}`);
        setStatus(res.data.status);
      } catch (err) {
        console.error("❌ Error fetching status", err);
      }
    };
    pingStatus();
    const interval = setInterval(pingStatus, 10000);
    return () => clearInterval(interval);
  }, [id]);

  // Fetch catalogue
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/business/${id}/products`
        );
        setProducts(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [id]);

  // Filter products
  const filteredProducts = products.filter((p) =>
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (!business) return <p className="p-6">Loading business...</p>;

  return (
    <div className="container mx-auto p-6">
      <Button variant="outline" onClick={onBack} className="mb-4">
        ← Back
      </Button>

      {/* Business Info */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Profile */}
          <div className="flex flex-col items-center border-r md:pr-6">
            <img
              src={business.photo || "/placeholder.png"}
              alt={business.name}
              className="w-36 h-36 rounded-full object-cover border-4 border-gray-300"
            />
            <h2 className="mt-4 text-xl font-semibold">{business.name}</h2>
            <p className="text-gray-600 text-sm">{business.email}</p>
            <p
              className={`mt-1 text-sm font-medium ${
                status === "Online" ? "text-green-600" : "text-gray-500"
              }`}
            >
              ● {status}
            </p>
            <Button
              className="mt-4 bg-blue-600 text-white relative"
              onClick={() => {
                setChatOpen(true);
                setUnreadCount(0);
              }}
            >
              Chat
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </div>

          {/* Right: Details */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4">Business Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold">Your Name</p>
                <p>{business.name || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Mobile Number</p>
                <p>{business.phone || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p>{business.email || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Country</p>
                <p>{business.country || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Category</p>
                <p>{business.category || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Business Type</p>
                <p>{business.business_type || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Business Reg. No.</p>
                <p>{business.business_reg_number || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Business Certifications</p>
                {business.company_certifications ? (
                  <a
                    href={business.company_certifications}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View / Download
                  </a>
                ) : (
                  "-"
                )}
              </div>
              <div>
                <p className="font-semibold">Business Documents</p>
                {business.company_documents ? (
                  <a
                    href={business.company_documents}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View / Download
                  </a>
                ) : (
                  "-"
                )}
              </div>
              <div>
                <p className="font-semibold">Website</p>
                <p>{business.website || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Address</p>
                <p>{business.address || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Contact Name</p>
                <p>{business.contact_name || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Contact Phone</p>
                <p>{business.contact_phone || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Contact Email</p>
                <p>{business.contact_email || "-"}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-semibold">About Me</p>
                <p className="whitespace-pre-line">{business.about_me || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Catalogue Section */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Our Catalogue</h3>
        <Card className="p-6">
          {/* Search */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col md:flex-row md:items-center gap-4"
          >
            <div className="flex-1">
              <label className="text-sm font-medium">Category</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="Search by category"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-blue-600 text-white">
              Search
            </Button>
          </form>

          {/* Product Results */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div
                  key={product.id ?? `product-${index}`} // ✅ unique key
                  className="border rounded-lg p-4 flex flex-col items-center"
                >
                  <img
                    src={product.photo || "/placeholder.png"}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-md border"
                  />
                  <h4 className="mt-2 font-semibold">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-blue-600 font-bold">${product.price}</p>
                </div>
              ))
            ) : (
              <div className="col-span-3 bg-red-400 text-white p-3 rounded-md text-center">
                Oops! No results found
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Chat */}
      {userId && (
        <ChatBox
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          userId={parseInt(userId)}
          peerId={business.customers_id}
          peerName={business.name}
          peerPhoto={business.photo}
          status={status}
          onNewMessage={() => setUnreadCount((c) => c + 1)}
        />
      )}
    </div>
  );
}









// // BusinessDetailsPage.tsx
// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Card, CardContent } from "../ui/card";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

// type BusinessDetailsPageProps = {
//   id: string; // Business ID
//   onBack: () => void;
//   onSelectProduct: (id: number) => void;
// };

// type Business = {
//   customers_id: number;
//   name: string;
//   company_name?: string;
//   country: string;
//   category: string;
//   photo: string | null;
// };

// type Message = {
//   id?: number;
//   sender_id: number;
//   text: string;
//   timestamp: string;
// };

// export function BusinessDetailsPage({ id, onBack, onSelectProduct }: BusinessDetailsPageProps) {
//   const [business, setBusiness] = useState<Business | null>(null);
//   const [onlineStatus, setOnlineStatus] = useState("Offline");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   const userId = localStorage.getItem("userId"); // ✅ logged-in user

//   // Fetch business profile
//   useEffect(() => {
//     const fetchBusiness = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/routes/business/${id}`);
//         setBusiness(res.data);
//       } catch (err) {
//         console.error("❌ Error loading business", err);
//       }
//     };
//     fetchBusiness();
//   }, [id]);

//   // Ping status every 5s
//   useEffect(() => {
//     const pingStatus = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/routes/status/${id}`);
//         setOnlineStatus(res.data.status);
//       } catch (err) {
//         console.error("❌ Error fetching status", err);
//       }
//     };
//     pingStatus();
//     const interval = setInterval(pingStatus, 5000);
//     return () => clearInterval(interval);
//   }, [id]);

//   // Fetch messages every 5s
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/routes/messages`, {
//           params: { sender: userId, client: id },
//         });
//         setMessages(res.data);
//         scrollToBottom();
//       } catch (err) {
//         console.error("❌ Error fetching messages", err);
//       }
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 5000);
//     return () => clearInterval(interval);
//   }, [id, userId]);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;
//     try {
//       await axios.post(`http://localhost:5000/routes/messages/send`, {
//         sender: userId,
//         client: id,
//         text: newMessage,
//       });
//       setNewMessage("");
//     } catch (err) {
//       console.error("❌ Error sending message", err);
//     }
//   };

//   if (!business) return <p className="p-6">Loading business...</p>;

//   return (
//     <div className="p-6">
//       <Card>
//         <CardContent className="p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Avatar className="w-16 h-16 relative">
//                 <AvatarImage src={business.photo || "/placeholder.png"} />
//                 <AvatarFallback>{business.name?.slice(0, 2)}</AvatarFallback>
//                 <span
//                   className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border ${
//                     onlineStatus === "Online" ? "bg-green-500" : "bg-yellow-500"
//                   }`}
//                 ></span>
//               </Avatar>
//               <div>
//                 <h3 className="text-lg font-semibold">{business.name}</h3>
//                 <p className="text-sm text-gray-500">{onlineStatus}</p>
//               </div>
//             </div>
//             <Button variant="outline" onClick={onBack}>
//               Close
//             </Button>
//           </div>

//           {/* Chat Window */}
//           <div
//             className="chat-content mt-6 p-4 bg-gray-100 rounded-md overflow-y-auto"
//             style={{ height: "400px" }}
//           >
//             {messages.map((msg, index) => {
//               const sender = msg.sender_id ? msg.sender_id.toString() : "";
//               const isMine = sender === userId;
//               return (
//                 <div
//                   key={msg.id ?? `${index}-${msg.timestamp}`} // ✅ fixed unique key
//                   className={`mb-2 flex ${isMine ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`p-2 rounded-lg max-w-xs ${
//                       isMine ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
//                     }`}
//                   >
//                     {msg.text}
//                     <div className="text-xs opacity-70">{msg.timestamp}</div>
//                   </div>
//                 </div>
//               );
//             })}
//             <div ref={chatEndRef}></div>
//           </div>

//           {/* Input */}
//           <div className="flex items-center mt-4 space-x-2">
//             <Input
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <Button onClick={sendMessage}>Send</Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

