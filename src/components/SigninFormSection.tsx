"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UserPlus, CheckCircle } from "lucide-react";

const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost";

export function SigninFormSection() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let data: any;

      if (isLocalhost) {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg || "Login failed");
        }
      } else {
        // Mock login for production/dev preview
        await new Promise((r) => setTimeout(r, 600));
        data = {
          token: "fake-token-123",
          user: { customers_id: 1, email, name: "Demo User" },
        };
      }

      // ✅ Save token & user info including customers_id
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userId", data.user.customers_id);

      router.push("/portal");
    } catch (err: any) {
      console.error(err.message);
      setError(err.message || "Login failed");
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
                    <a
                      href="/sign-up"
                      className="text-[#005A8C] hover:underline ml-1"
                    >
                      Sign Up here
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}















// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { UserPlus, CheckCircle } from "lucide-react";

// // 🔹 Added: runtime check (does not change UI)
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
//         // ✅ Local dev → use your real backend exactly as before
//         const res = await fetch("http://localhost:5000/api/auth/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         });

//         data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.message || "Login failed");
//         }
//       } else {
//         // ✅ Netlify / non-local → mock login success (no backend call)
//         await new Promise((r) => setTimeout(r, 600)); // simulate delay
//         data = {
//           token: "fake-token-123",
//           user: { id: 1, email, name: "Demo User" },
//         };
//       }

//       // Save token + user info in localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // Redirect to dashboard
//       router.push("/portal");
//     } catch (err: any) {
//       console.error(err.message);
//       alert(err.message);
//       setError(err.message);
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
//                 Login with your data you entered during your registration.
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
//                     <h3 className="text-lg font-semibold text-[#005A8C] mb-4">Personal Information</h3>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address *
//                       </label>
//                       <Input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter your email"
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                         required
//                       />
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Password *
//                       </label>
//                       <Input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Enter your password"
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                         required
//                       />
//                       <div className="flex justify-end">
//                         <a
//                           href="/forgot-password"
//                           className="mt-1 text-xs text-[#005A8C] hover:underline"
//                         >
//                           Forgot password?
//                         </a>
//                       </div>
//                     </div>
//                   </div>

//                   {error && (
//                     <p className="text-red-600 text-sm">{error}</p>
//                   )}

//                   <Button
//                     type="submit"
//                     className="w-full bg-[#C9A74B] text-white hover:bg-[#b8964a] py-4 text-lg"
//                     disabled={loading}
//                   >
//                     {loading ? "Logging in..." : "Login"}
//                     <CheckCircle className="w-5 h-5 ml-2" />
//                   </Button>

//                   <p className="text-center text-sm text-gray-600">
//                     Don't have an account?
//                     <a href="/sign-up" className="text-[#005A8C] hover:underline ml-1">Sign Up here</a>
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














// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { UserPlus, CheckCircle } from "lucide-react";

// export function SigninFormSection() {
//     const router = useRouter();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");

//         try {
//             const res = await fetch("http://localhost:5000/api/auth/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await res.json();

//             if (!res.ok) {
//                 throw new Error(data.message || "Login failed");
//             }

//             // Save token + user info in localStorage
//             localStorage.setItem("token", data.token);
//             localStorage.setItem("user", JSON.stringify(data.user));

//             // Redirect to dashboard
//             router.push("/portal");

//         } catch (err: any) {
//             console.error(err.message);
//             alert(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <section className="py-20 bg-gray-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//                     <div>
//                         <div className="mb-8">
//                             <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">
//                                 Login to WABLP
//                             </h2>
//                             <p className="text-xl text-gray-600">
//                                 Login with your data you entered during your registration.
//                             </p>
//                         </div>

//                         <Card className="shadow-xl">
//                             <CardHeader className="bg-gradient-to-r from-[#005A8C] to-[#0066a3] text-white rounded-t-lg">
//                                 <CardTitle className="flex items-center">
//                                     <UserPlus className="w-6 h-6 mr-2" />
//                                     Input your login details.
//                                 </CardTitle>
//                             </CardHeader>
//                             <CardContent className="p-8">
//                                 <form onSubmit={handleSubmit} className="space-y-6">
//                                     <div>
//                                         <h3 className="text-lg font-semibold text-[#005A8C] mb-4">Personal Information</h3>

//                                         <div className="mt-4">
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                 Email Address *
//                                             </label>
//                                             <Input
//                                                 type="email"
//                                                 value={email}
//                                                 onChange={(e) => setEmail(e.target.value)}
//                                                 placeholder="Enter your email"
//                                                 className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                                                 required
//                                             />
//                                         </div>

//                                         <div className="mt-4">
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                 Password *
//                                             </label>
//                                             <Input
//                                                 type="password"
//                                                 value={password}
//                                                 onChange={(e) => setPassword(e.target.value)}
//                                                 placeholder="Enter your password"
//                                                 className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                                                 required
//                                             />
//                                             <div className="flex justify-end">
//                                                 <a
//                                                     href="/forgot-password"
//                                                     className="mt-1 text-xs text-[#005A8C] hover:underline"
//                                                 >
//                                                     Forgot password?
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {error && (
//                                         <p className="text-red-600 text-sm">{error}</p>
//                                     )}

//                                     <Button
//                                         type="submit"
//                                         className="w-full bg-[#C9A74B] text-white hover:bg-[#b8964a] py-4 text-lg"
//                                         disabled={loading}
//                                     >
//                                         {loading ? "Logging in..." : "Login"}
//                                         <CheckCircle className="w-5 h-5 ml-2" />
//                                     </Button>

//                                     <p className="text-center text-sm text-gray-600">
//                                         Don't have an account?
//                                         <a href="/sign-up" className="text-[#005A8C] hover:underline ml-1">Sign Up here</a>
//                                     </p>
//                                 </form>
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }






// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { UserPlus, Shield, CheckCircle, Users } from "lucide-react";

// const benefits = [
//     "14-day free trial",
//     "No setup fees",
//     "Cancel anytime",
//     "Dedicated support"
// ];

// export function SigninFormSection() {
//     return (
//         <section className="py-20 bg-gray-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//                     {/* Form */}
//                     <div>
//                         <div className="mb-8">
//                             <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">
//                                 Login to WABLP
//                             </h2>
//                             <p className="text-xl text-gray-600">
//                                 Login with your data you entered during your registration.
//                             </p>
//                         </div>

//                         <Card className="shadow-xl">
//                             <CardHeader className="bg-gradient-to-r from-[#005A8C] to-[#0066a3] text-white rounded-t-lg">
//                                 <CardTitle className="flex items-center">
//                                     <UserPlus className="w-6 h-6 mr-2" />
//                                     Input your login details.
//                                 </CardTitle>
//                                 {/* <p className="text-gray-200 text-sm">Join 560+ verified businesses across West Africa</p> */}
//                             </CardHeader>
//                             <CardContent className="p-8">
//                                 <form className="space-y-6">
//                                     {/* Personal Information */}
//                                     <div>
//                                         <h3 className="text-lg font-semibold text-[#005A8C] mb-4">Personal Information</h3>
//                                         <div className="mt-4">
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                 Email Address *
//                                             </label>
//                                             <Input
//                                                 type="email"
//                                                 placeholder="Enter your email"
//                                                 className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                                             />
//                                         </div>
//                                         <div className="mt-4">
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                 Password *
//                                             </label>
//                                             <Input
//                                                 type="password"
//                                                 placeholder="Enter your password"
//                                                 className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                                             />
//                                             <div className="flex justify-end">
//                                                 <a
//                                                     href="/forgot-password" // <-- replace with your route
//                                                     className="mt-1 text-xs text-[#005A8C] hover:underline"
//                                                 >
//                                                     Forgot password?
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Terms and Conditions */}
//                                     <Button
//                                         type="submit"
//                                         className="w-full bg-[#C9A74B] text-white hover:bg-[#b8964a] py-4 text-lg"
//                                     >
//                                         Login
//                                         <CheckCircle className="w-5 h-5 ml-2" />
//                                     </Button>

//                                     <p className="text-center text-sm text-gray-600">
//                                         Don't have an account?
//                                         <a href="#" className="text-[#005A8C] hover:underline ml-1">Sign Up here</a>
//                                     </p>
//                                 </form>
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }