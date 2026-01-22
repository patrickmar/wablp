"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UserPlus, CheckCircle, X } from "lucide-react";
import Link from "next/link";

const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost";

export function SigninFormSection() {
  const router = useRouter();

  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Profile modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState<any>({});
  const [missingFields, setMissingFields] = useState<string[]>([]);

  // All required profile fields
  const requiredFields = [
    "name", "phone", "email", "country", "category", "gender", "languages",
    "joined_as", "company_name", "business_description", "website", "about_me",
    "business_category", "business_type", "business_reg_number",
    "company_certifications", "company_documents", "address",
    "contact_name", "contact_phone", "contact_email"
  ];

  // ------------------------------
  // 1️⃣ Login handler
  // ------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let res;
      if (isLocalhost) {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
      } else {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Login failed");

      // Save token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userId", data.user.customers_id);

      // Check for missing profile fields
      const missing = requiredFields.filter(field => !data.user[field]);
      if (missing.length > 0) {
        setProfileData(data.user);
        setMissingFields(missing);
        setShowProfileModal(true); // Show modal
      } else {
        router.push("/portal");
      }
    } catch (err: any) {
      console.error("Login error:", err.message);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // 2️⃣ Profile modal submit handler
  // ------------------------------
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Build payload only with missing fields
      const payload: Record<string, string> = {};
      missingFields.forEach((field) => {
        payload[field] = profileData[field] ? String(profileData[field]) : "";
      });

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token missing. Please login again.");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Backend error:", data);
        throw new Error(data.msg || "Failed to update profile");
      }

      // Save updated user info
      localStorage.setItem("user", JSON.stringify(data.user));
      setShowProfileModal(false);
      router.push("/portal");
    } catch (err: any) {
      console.error("Profile update error:", err.message);
      alert("Profile update failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">
                Login to WABLP
              </h2>
              <p className="text-xl text-gray-600">
                Login with your credentials to access your account.
              </p>
            </div>

            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-[#005A8C] to-[#0066a3] text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <UserPlus className="w-6 h-6 mr-2" />
                  Input your login details.
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={loading}
                      className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      disabled={loading}
                      className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                    />
                    <div className="flex justify-end">
                      <a
                        href="/forgot-password"
                        className="mt-1 text-xs text-[#005A8C] hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  <Button
                    type="submit"
                    className="w-full bg-[#C9A74B] text-white hover:bg-[#b8964a] py-4 text-lg flex justify-center items-center gap-2"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Login"}
                    <CheckCircle className="w-5 h-5" />
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      href="/sign-up"
                      className="text-[#005A8C] hover:underline ml-1"
                    >
                      Sign up here
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* -------------------------------
          Profile modal for missing fields
      ------------------------------- */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setShowProfileModal(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl mb-4 text-[#005A8C]">Complete Your Profile</h2>
            <form
              onSubmit={handleProfileSubmit}
              className="space-y-4 max-h-[70vh] overflow-y-auto"
            >
              {missingFields.map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium">
                    {field.replace(/_/g, " ")}
                  </label>
                  <Input
                    name={field}
                    value={profileData[field] || ""}
                    onChange={(e) =>
                      setProfileData({ ...profileData, [field]: e.target.value })
                    }
                    required
                  />
                </div>
              ))}
              <Button type="submit" disabled={loading} className="w-full mt-4">
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}











// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { UserPlus, CheckCircle, X } from "lucide-react";
// import Link from "next/link";

// const isLocalhost =
//   typeof window !== "undefined" && window.location.hostname === "localhost";

// export function SigninFormSection() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Modal state
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [profileData, setProfileData] = useState<any>({});
//   const [missingFields, setMissingFields] = useState<string[]>([]);

//   // All required fields
//   const requiredFields = [
//     "name", "phone", "email", "country", "category", "gender", "languages",
//     "joined_as", "company_name", "business_description", "website", "about_me",
//     "business_category", "business_type", "business_reg_number",
//     "company_certifications", "company_documents", "address",
//     "contact_name", "contact_phone", "contact_email"
//   ];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       let res;
//       if (isLocalhost) {
//         res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         });
//       } else {
//         res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({ email, password }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.msg || "Login failed");

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("userId", data.user.customers_id);

//       // Check for missing fields
//       const missing = requiredFields.filter(field => !data.user[field]);
//       if (missing.length > 0) {
//         setProfileData(data.user);
//         setMissingFields(missing); // Only show missing fields in modal
//         setShowProfileModal(true);
//       } else {
//         router.push("/portal");
//       }
//     } catch (err: any) {
//       console.error(err.message);
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Profile modal submit
//   const handleProfileSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile/update`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(profileData),
//       });

//       if (!res.ok) throw new Error("Failed to update profile");

//       const data = await res.json();
//       localStorage.setItem("user", JSON.stringify(data.user));
//       setShowProfileModal(false);
//       router.push("/portal");
//     } catch (err: any) {
//       console.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//           <div>
//             <div className="mb-8">
//               <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">
//                 Login to WABLP
//               </h2>
//               <p className="text-xl text-gray-600">
//                 Login with your credentials to access your account.
//               </p>
//             </div>

//             <Card className="shadow-xl">
//               <CardHeader className="bg-gradient-to-r from-[#005A8C] to-[#0066a3] text-white rounded-t-lg">
//                 <CardTitle className="flex items-center">
//                   <UserPlus className="w-6 h-6 mr-2" />
//                   Input your login details.
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-8">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <Input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Enter your email"
//                       required
//                       disabled={loading}
//                       className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Password *
//                     </label>
//                     <Input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter your password"
//                       required
//                       disabled={loading}
//                       className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                     />
//                     <div className="flex justify-end">
//                       <a
//                         href="/forgot-password"
//                         className="mt-1 text-xs text-[#005A8C] hover:underline"
//                       >
//                         Forgot password?
//                       </a>
//                     </div>
//                   </div>

//                   {error && <p className="text-red-600 text-sm">{error}</p>}

//                   <Button
//                     type="submit"
//                     className="w-full bg-[#C9A74B] text-white hover:bg-[#b8964a] py-4 text-lg flex justify-center items-center gap-2"
//                     disabled={loading}
//                   >
//                     {loading ? "Signing in..." : "Login"}
//                     <CheckCircle className="w-5 h-5" />
//                   </Button>

//                   <p className="text-center text-sm text-gray-600">
//                     Don't have an account?{" "}
//                     <Link
//                       href="/sign-up"
//                       className="text-[#005A8C] hover:underline ml-1"
//                     >
//                       Sign up here
//                     </Link>
//                   </p>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Modal for missing profile fields */}
//       {showProfileModal && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white p-8 rounded-lg w-full max-w-2xl relative">
//             <button
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//               onClick={() => setShowProfileModal(false)}
//             >
//               <X className="w-6 h-6" />
//             </button>
//             <h2 className="text-2xl mb-4 text-[#005A8C]">Complete Your Profile</h2>
//             <form onSubmit={handleProfileSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
//               {missingFields.map((field) => (
//                 <div key={field}>
//                   <label className="block text-sm font-medium">{field.replace(/_/g, " ")}</label>
//                   <Input
//                     name={field}
//                     value={profileData[field] || ""}
//                     onChange={(e) =>
//                       setProfileData({ ...profileData, [field]: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//               ))}
//               <Button type="submit" disabled={loading} className="w-full mt-4">
//                 {loading ? "Saving..." : "Save Profile"}
//               </Button>
//             </form>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }





// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { UserPlus, CheckCircle } from "lucide-react";
// import Link from "next/link";

// const isLocalhost =
//   typeof window !== "undefined" && window.location.hostname === "localhost";

// export function SigninFormSection() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       let data: any;

//       if (isLocalhost) {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         });

//         data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.msg || "Login failed");
//         }
//       } else {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({ email, password }),
//         });

//         data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.msg || "Login failed");
//         }
//       }

//       // ✅ Save token & user info including customers_id
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("userId", data.user.customers_id);

//       router.push("/portal");
//     } catch (err: any) {
//       console.error(err.message);
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//           <div>
//             <div className="mb-8">
//               <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">
//                 Login to WABLP
//               </h2>
//               <p className="text-xl text-gray-600">
//                 Login with your credentials to access your account.
//               </p>
//             </div>

//             <Card className="shadow-xl">
//               <CardHeader className="bg-gradient-to-r from-[#005A8C] to-[#0066a3] text-white rounded-t-lg">
//                 <CardTitle className="flex items-center">
//                   <UserPlus className="w-6 h-6 mr-2" />
//                   Input your login details.
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-8">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <Input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Enter your email"
//                       required
//                       disabled={loading}
//                       className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Password *
//                     </label>
//                     <Input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter your password"
//                       required
//                       disabled={loading}
//                       className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                     />
//                     <div className="flex justify-end">
//                       <a
//                         href="/forgot-password"
//                         className="mt-1 text-xs text-[#005A8C] hover:underline"
//                       >
//                         Forgot password?
//                       </a>
//                     </div>
//                   </div>

//                   {error && <p className="text-red-600 text-sm">{error}</p>}

//                   <Button
//                     type="submit"
//                     className="w-full bg-[#C9A74B] text-white hover:bg-[#b8964a] py-4 text-lg flex justify-center items-center gap-2"
//                     disabled={loading}
//                   >
//                     {loading ? "Signing in..." : "Login"}
//                     <CheckCircle className="w-5 h-5" />
//                   </Button>

//                   <p className="text-center text-sm text-gray-600">
//                     Don't have an account?{" "}
//                     {/* <a
//                       href="/sign-up"
//                       className="text-[#005A8C] hover:underline ml-1"
//                     >
//                       Sign Up here
//                     </a> */}
//                     <Link
//                       href="/sign-up"
//                       className="text-[#005A8C] hover:underline ml-1"
//                     >
//                       Sign up here
//                     </Link>
//                   </p>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

