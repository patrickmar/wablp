"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UserPlus, Shield, CheckCircle, Users, Phone } from "lucide-react";
import Link from "next/link";

const benefits = [
  "14-day free trial",
  "No setup fees",
  "Cancel anytime",
  "Dedicated support"
];

// 🔹 Added: runtime check (does not change UI)
const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost";

export function SignupFormSection() {
  // added state for all visible fields (we’ll only send name, email, password to backend for now)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    code: "",
    joined_as: "",
    how_did_you_hear: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      if (isLocalhost) {
        // ✅ Local dev → use your real backend exactly as before
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // backend expects: name, email, password
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            code: form.code,
            joined_as: form.joined_as,
            how_did_you_hear: form.how_did_you_hear,
            password: form.password,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          alert("✅ Registration successful!");
          // you can redirect to login here if you want
          // router.push("/login");
        } else {
          alert("❌ " + (data?.msg || "Registration failed"));
        }
      } else {
        // ✅ Netlify / non-local → mock success (no backend call)
        await new Promise((r) => setTimeout(r, 600)); // simulate network delay
        alert("✅ Registration successful!");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">
                Join WABLP Today
              </h2>
              <p className="text-xl text-gray-600">
                Start your journey to business growth with our comprehensive platform.
              </p>
            </div>

            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-[#005A8C] to-[#0066a3] text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <UserPlus className="w-6 h-6 mr-2" />
                  Input your data to register to our website.
                </CardTitle>
                {/* <p className="text-gray-200 text-sm">Join 560+ verified businesses across West Africa</p> */}
              </CardHeader>
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>

                  <p className="text-center text-sm text-gray-600">
                    Already have an account?
                    {/* <a href="sign-in" className="text-[#005A8C] hover:underline ml-1">Login here</a> */}
                    <Link
                      href="/sign-in"
                      className="text-[#005A8C] hover:underline ml-1"
                    >
                      Login here
                    </Link>
                  </p>

                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#005A8C] mb-4">Personal Information</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <Input
                        placeholder="Enter your name"
                        className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address 
                        {/* *(Code will be sent here) */}
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        placeholder="+234 (123) 456-7890"
                        className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>

                    {/* <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Code *
                      </label>
                      <Input
                        type="num"
                        placeholder=""
                        className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                        value={form.code}
                        onChange={(e) => setForm({ ...form, code: e.target.value })}
                      />
                      <div className="flex justify-end">
                        <a
                          href="/forgot-password" // <-- replace with your route
                          className="mt-1 text-xs text-[#005A8C] hover:underline"
                        >
                          Send Code
                        </a>
                      </div>
                    </div> */}

                    {/* <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Joining As: *
                      </label>
                      <Input
                        placeholder=""
                        className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                        value={form.joined_as}
                        onChange={(e) => setForm({ ...form, joined_as: e.target.value })}
                      />
                    </div> */}

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How did you learn about WABLP? *
                      </label>
                      <Input
                        placeholder=""
                        className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                        value={form.how_did_you_hear}
                        onChange={(e) => setForm({ ...form, how_did_you_hear: e.target.value })}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <Input
                        type="password"
                        placeholder=""
                        className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        (Minimum 5 characters, at least one letter, one number and one special character)
                      </p>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <Input
                        type="password"
                        placeholder=""
                        className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="border-t pt-6">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mt-1 text-[#C9A74B] focus:ring-[#C9A74B]"
                        checked={form.terms}
                        onChange={(e) => setForm({ ...form, terms: e.target.checked })}
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                        I agree to the <a href="#" className="text-[#005A8C] hover:underline">Terms and Condition</a>
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#C9A74B] text-white hover:bg-[#b8964a] py-4 text-lg"
                  >
                    Submit
                    <CheckCircle className="w-5 h-5 ml-2" />
                  </Button>

                  {/* <p className="text-center text-sm text-gray-600">
                    Already have an account?
                    <a href="sign-in" className="text-[#005A8C] hover:underline ml-1">Login here</a>
                  </p> */}
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
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { UserPlus, Shield, CheckCircle, Users, Phone } from "lucide-react";

// const benefits = [
//   "14-day free trial",
//   "No setup fees",
//   "Cancel anytime",
//   "Dedicated support"
// ];

// export function SignupFormSection() {
//   // added state for all visible fields (we’ll only send name, email, password to backend for now)
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     code: "",
//     joined_as: "",
//     how_did_you_hear: "",
//     password: "",
//     confirmPassword: "",
//     terms: false,
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (form.password !== form.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         // backend expects: name, email, password
//         body: JSON.stringify({
//           name: form.name,
//           email: form.email,
//           phone: form.phone,
//           code: form.code,
//           joined_as: form.joined_as,
//           how_did_you_hear: form.how_did_you_hear,
//           password: form.password,
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Registration successful!");
//         // you can redirect to login here if you want
//         // router.push("/login");
//       } else {
//         alert("❌ " + (data?.msg || "Registration failed"));
//       }
//     } catch (err) {
//       console.error(err);
//       alert("❌ Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//           {/* Form */}
//           <div>
//             <div className="mb-8">
//               <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">
//                 Join WABLP Today
//               </h2>
//               <p className="text-xl text-gray-600">
//                 Start your journey to business growth with our comprehensive platform.
//               </p>
//             </div>

//             <Card className="shadow-xl">
//               <CardHeader className="bg-gradient-to-r from-[#005A8C] to-[#0066a3] text-white rounded-t-lg">
//                 <CardTitle className="flex items-center">
//                   <UserPlus className="w-6 h-6 mr-2" />
//                   Input your data to register to our website.
//                 </CardTitle>
//                 {/* <p className="text-gray-200 text-sm">Join 560+ verified businesses across West Africa</p> */}
//               </CardHeader>
//               <CardContent className="p-8">
//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                   {/* Personal Information */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-[#005A8C] mb-4">Personal Information</h3>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Name *
//                       </label>
//                       <Input
//                         placeholder="Enter your name"
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                         value={form.name}
//                         onChange={(e) => setForm({ ...form, name: e.target.value })}
//                       />
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address *(Code will be sent here)
//                       </label>
//                       <Input
//                         type="email"
//                         placeholder="Enter your email"
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                         value={form.email}
//                         onChange={(e) => setForm({ ...form, email: e.target.value })}
//                       />
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Phone Number *
//                       </label>
//                       <Input
//                         type="tel"
//                         placeholder="+234 (123) 456-7890"
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                         value={form.phone}
//                         onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                       />
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Code *
//                       </label>
//                       <Input
//                         type="num"
//                         placeholder=""
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                         value={form.code}
//                         onChange={(e) => setForm({ ...form, code: e.target.value })}
//                       />
//                       <div className="flex justify-end">
//                         <a
//                           href="/forgot-password" // <-- replace with your route
//                           className="mt-1 text-xs text-[#005A8C] hover:underline"
//                         >
//                           Send Code
//                         </a>
//                       </div>
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Joining As: *
//                       </label>
//                       <Input
//                         placeholder=""
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                         value={form.joined_as}
//                         onChange={(e) => setForm({ ...form, joined_as: e.target.value })}
//                       />
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         How did you learn about WABLP? *
//                       </label>
//                       <Input
//                         placeholder=""
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                         value={form.how_did_you_hear}
//                         onChange={(e) => setForm({ ...form, how_did_you_hear: e.target.value })}
//                       />
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Password *
//                       </label>
//                       <Input
//                         type="password"
//                         placeholder=""
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                         value={form.password}
//                         onChange={(e) => setForm({ ...form, password: e.target.value })}
//                       />
//                       <p className="mt-1 text-xs text-gray-500">
//                         (Minimum 5 characters, at least one letter, one number and one special character)
//                       </p>
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Confirm Password *
//                       </label>
//                       <Input
//                         type="password"
//                         placeholder=""
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                         value={form.confirmPassword}
//                         onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
//                       />
//                     </div>
//                   </div>

//                   {/* Terms and Conditions */}
//                   <div className="border-t pt-6">
//                     <div className="flex items-start space-x-3">
//                       <input
//                         type="checkbox"
//                         id="terms"
//                         className="mt-1 text-[#C9A74B] focus:ring-[#C9A74B]"
//                         checked={form.terms}
//                         onChange={(e) => setForm({ ...form, terms: e.target.checked })}
//                       />
//                       <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
//                         I agree to the <a href="#" className="text-[#005A8C] hover:underline">Terms and Condition</a>
//                       </label>
//                     </div>
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full bg-[#C9A74B] text-white hover:bg-[#b8964a] py-4 text-lg"
//                   >
//                     Submit
//                     <CheckCircle className="w-5 h-5 ml-2" />
//                   </Button>

//                   <p className="text-center text-sm text-gray-600">
//                     Already have an account?
//                     <a href="#" className="text-[#005A8C] hover:underline ml-1">Login here</a>
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

















// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { UserPlus, Shield, CheckCircle, Users } from "lucide-react";

// const benefits = [
//   "14-day free trial",
//   "No setup fees",
//   "Cancel anytime",
//   "Dedicated support"
// ];

// export function SignupFormSection() {
//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//           {/* Form */}
//           <div>
//             <div className="mb-8">
//               <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">
//                 Join WABLP Today
//               </h2>
//               <p className="text-xl text-gray-600">
//                 Start your journey to business growth with our comprehensive platform.
//               </p>
//             </div>

//             <Card className="shadow-xl">
//               <CardHeader className="bg-gradient-to-r from-[#005A8C] to-[#0066a3] text-white rounded-t-lg">
//                 <CardTitle className="flex items-center">
//                   <UserPlus className="w-6 h-6 mr-2" />
//                   Input your data to register to our website.
//                 </CardTitle>
//                 {/* <p className="text-gray-200 text-sm">Join 560+ verified businesses across West Africa</p> */}
//               </CardHeader>
//               <CardContent className="p-8">
//                 <form className="space-y-6">
//                   {/* Personal Information */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-[#005A8C] mb-4">Personal Information</h3>
//                     {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Name *
//                       </label>
//                       <Input
//                         placeholder="Enter your name"
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                       />
//                     </div>
//                     {/* <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Last Name *
//                         </label>
//                         <Input 
//                           placeholder="Enter your last name"
//                           className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                         />
//                       </div> */}
//                     {/* </div> */}

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address *(Code will be sent here)
//                       </label>
//                       <Input
//                         type="email"
//                         placeholder="Enter your email"
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                       />
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Phone Number *
//                       </label>
//                       <Input
//                         type="tel"
//                         placeholder="+234 (123) 456-7890"
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                       />
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Code *
//                       </label>
//                       <Input
//                         type="num"
//                         placeholder=""
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                       />
//                       <div className="flex justify-end">
//                         <a
//                           href="/forgot-password" // <-- replace with your route
//                           className="mt-1 text-xs text-[#005A8C] hover:underline"
//                         >
//                           Send Code
//                         </a>
//                       </div>
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Joining As: *
//                       </label>
//                       <Input
//                         placeholder=""
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                       />
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         How did you learn about WABLP? *
//                       </label>
//                       <Input
//                         placeholder=""
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                       />
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Password *
//                       </label>
//                       <Input
//                         type="password"
//                         placeholder=""
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                       />
//                       <p className="mt-1 text-xs text-gray-500">
//                         (Minimum 5 characters, at least one letter, one number and one special character)
//                       </p>
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Confirm Password *
//                       </label>
//                       <Input
//                         type="password"
//                         placeholder=""
//                         className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
//                       />
//                     </div>
//                   </div>

//                   {/* Terms and Conditions */}
//                   <div className="border-t pt-6">
//                     <div className="flex items-start space-x-3">
//                       <input
//                         type="checkbox"
//                         id="terms"
//                         className="mt-1 text-[#C9A74B] focus:ring-[#C9A74B]"
//                       />
//                       <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
//                         I agree to the <a href="#" className="text-[#005A8C] hover:underline">Terms and Condition</a>
//                       </label>
//                     </div>
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full bg-[#C9A74B] text-white hover:bg-[#b8964a] py-4 text-lg"
//                   >
//                     Submit
//                     <CheckCircle className="w-5 h-5 ml-2" />
//                   </Button>

//                   <p className="text-center text-sm text-gray-600">
//                     Already have an account?
//                     <a href="#" className="text-[#005A8C] hover:underline ml-1">Login here</a>
//                   </p>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>












//           {/* Benefits Sidebar */}
//           {/* <div>
//             <Card className="shadow-xl sticky top-8">
//               <CardHeader>
//                 <CardTitle className="text-[#005A8C] flex items-center">
//                   <Shield className="w-6 h-6 mr-2" />
//                   What You Get
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4 mb-6">
//                   {benefits.map((benefit, index) => (
//                     <div key={index} className="flex items-center space-x-3">
//                       <CheckCircle className="w-5 h-5 text-[#C9A74B]" />
//                       <span className="text-gray-700">{benefit}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="border-t pt-6">
//                   <h4 className="font-semibold text-[#005A8C] mb-4">Instant Access To:</h4>
//                   <ul className="space-y-3 text-sm text-gray-600">
//                     <li>• Enhanced business profile creation</li>
//                     <li>• Member directory with 560+ businesses</li>
//                     <li>• Opportunity marketplace</li>
//                     <li>• Secure messaging system</li>
//                     <li>• Business networking events</li>
//                     <li>• Industry reports and insights</li>
//                     <li>• Supplier diversity programs</li>
//                     <li>• 24/7 customer support</li>
//                   </ul>
//                 </div>

//                 <div className="mt-6 p-4 bg-[#C9A74B] bg-opacity-10 rounded-lg">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <Users className="w-5 h-5 text-[#C9A74B]" />
//                     <span className="font-semibold text-[#005A8C]">Join 560+ Businesses</span>
//                   </div>
//                   <p className="text-sm text-gray-600">
//                     Connect with verified companies across 15 West African countries and grow your network today.
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div> */}
//         </div>
//       </div>
//     </section>
//   );
// }