"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast"; // ✅ import toast hook
import { Toaster } from "@/components/ui/toaster";   // ✅ toaster provider

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { toast } = useToast(); // ✅ initialize toast

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/routes/customers/${userId}`)
        .then((res) => setProfileData(res.data))
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [userId]);

  const handleSave = () => {
    if (!userId) return;
    axios
      .put(`http://localhost:5000/routes/customers/${userId}`, profileData)
      .then(() => {
        setIsEditing(false);
        toast({
          title: "✅ Profile Updated",
          description: "Your profile has been saved successfully.",
          duration: 3000, // 3s auto close
        });
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    // Preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to backend
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await axios.post(
        `http://localhost:5000/routes/customers/${userId}/upload-profile-photo`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProfileData({
        ...profileData,
        photo: res.data.photoUrl,
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast({
        title: "❌ Upload Failed",
        description: "Could not upload your photo. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!profileData) {
    return <p className="text-center">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow p-8 grid md:grid-cols-3 gap-10">
        {/* Left side - Profile Picture */}
        <div className="flex flex-col items-center border-r md:pr-6">
          <div className="w-32 h-32 rounded-full border-4 border-gray-200 flex items-center justify-center overflow-hidden">
            <img
              src={previewImage || profileData.photo || "/placeholder.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-blue-600 text-sm mt-3"
          >
            Change Photo
          </button>
          <p className="mt-4 font-semibold">{profileData.name}</p>
          <p className="text-gray-500 text-sm">{profileData.email}</p>
        </div>

        {/* Right side - Account Details */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            My Account Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <Input
                value={profileData.name || ""}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile Number
              </label>
              <Input
                value={profileData.phone || ""}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={profileData.email || ""}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <Input
                value={profileData.country || ""}
                onChange={(e) =>
                  setProfileData({ ...profileData, country: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* About Me */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">About Me</label>
            <Textarea
              rows={4}
              value={profileData.about_me || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, about_me: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8">
            {isEditing ? (
              <Button onClick={handleSave}>Save Profile</Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Toast container (needed once in your app layout) */}
      <Toaster />
    </div>
  );
}










// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function ProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState<any>(null);

//   // ✅ Get logged in userId from localStorage
//   const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

//   // ✅ Fetch profile from backend
//   useEffect(() => {
//     if (userId) {
//       axios
//         .get(`http://localhost:5000/routes/customers/${userId}`)
//         .then((res) => setProfileData(res.data))
//         .catch((err) => console.error("Error fetching profile:", err));
//     }
//   }, [userId]);

//   // ✅ Handle save
//   const handleSave = () => {
//     if (!userId) return;
//     axios
//       .put(`http://localhost:5000/routes/customers/${userId}`, profileData)
//       .then(() => {
//         setIsEditing(false);
//         alert("Profile updated successfully!");
//       })
//       .catch((err) => console.error("Error updating profile:", err));
//   };

//   if (!profileData) {
//     return <p className="text-center">Loading profile...</p>;
//   }

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Profile Information</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium">Full Name</label>
//             <Input
//               value={profileData.name || ""}
//               onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
//               disabled={!isEditing}
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <Input
//               type="email"
//               value={profileData.email || ""}
//               onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
//               disabled={!isEditing}
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium">Phone</label>
//             <Input
//               value={profileData.phone || ""}
//               onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
//               disabled={!isEditing}
//             />
//           </div>

//           {/* Country */}
//           <div>
//             <label className="block text-sm font-medium">Country</label>
//             <Input
//               value={profileData.country || ""}
//               onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
//               disabled={!isEditing}
//             />
//           </div>

//           {/* Specialties */}
//           <div>
//             <label className="block text-sm font-medium">Specialties</label>
//             <Input
//               value={profileData.specialties || ""}
//               onChange={(e) => setProfileData({ ...profileData, specialties: e.target.value })}
//               disabled={!isEditing}
//             />
//           </div>

//           {/* Language */}
//           <div>
//             <label className="block text-sm font-medium">Language</label>
//             <Input
//               value={profileData.language || ""}
//               onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
//               disabled={!isEditing}
//             />
//           </div>

//           {/* Joined As */}
//           <div>
//             <label className="block text-sm font-medium">Joined As</label>
//             <Input
//               value={profileData.joined_as || ""}
//               onChange={(e) => setProfileData({ ...profileData, joined_as: e.target.value })}
//               disabled={!isEditing}
//             />
//           </div>

//           {/* Company Name */}
//           <div>
//             <label className="block text-sm font-medium">Company Name</label>
//             <Input
//               value={profileData.company_name || ""}
//               onChange={(e) => setProfileData({ ...profileData, company_name: e.target.value })}
//               disabled={!isEditing}
//             />
//           </div>

//           {/* Business Description */}
//           <div>
//             <label className="block text-sm font-medium">Business Description</label>
//             <Input
//               value={profileData.business_description || ""}
//               onChange={(e) => setProfileData({ ...profileData, business_description: e.target.value })}
//               disabled={!isEditing}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-4">
//             {isEditing ? (
//               <>
//                 <Button onClick={handleSave}>Save Changes</Button>
//                 <Button variant="outline" onClick={() => setIsEditing(false)}>
//                   Cancel
//                 </Button>
//               </>
//             ) : (
//               <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }













// import { useState } from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Switch } from "../ui/switch";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import { ImageWithFallback } from "../figma/ImageWithFallback";
// import { 
//   Upload, 
//   Eye, 
//   Edit3, 
//   Save, 
//   X, 
//   Plus, 
//   Trash2,
//   Camera,
//   Globe,
//   MapPin,
//   Phone,
//   Mail,
//   Building,
//   Users,
//   Award,
//   ExternalLink
// } from "lucide-react";

// export function ProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     companyName: "TechNova Solutions",
//     sector: "Technology",
//     description: "Leading IT solutions provider specializing in enterprise software development, digital transformation, and cloud services for businesses across West Africa. We help companies modernize their operations and achieve sustainable growth.",
//     founded: "2015",
//     employees: "150-500",
//     location: "Lagos, Nigeria",
//     phone: "+234 (0) 123 456 7890",
//     email: "info@technova.ng",
//     website: "https://www.technova.ng",
//     services: ["Software Development", "Cloud Services", "Digital Transformation", "IT Consulting", "System Integration"],
//     certifications: ["ISO 27001", "Microsoft Gold Partner", "AWS Advanced Partner"],
//     languages: ["English", "French", "Hausa"],
//     profileVisibility: true,
//     showContactInfo: true,
//     allowDirectMessages: true
//   });

//   const [gallery, setGallery] = useState([
//     "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//     "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//     "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
//   ]);

//   const handleSave = () => {
//     // In a real app, this would save to backend
//     setIsEditing(false);
//     console.log("Saving profile data:", profileData);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     // Reset any changes
//   };

//   const addService = () => {
//     setProfileData({
//       ...profileData,
//       services: [...profileData.services, ""]
//     });
//   };

//   const removeService = (index: number) => {
//     setProfileData({
//       ...profileData,
//       services: profileData.services.filter((_, i) => i !== index)
//     });
//   };

//   const updateService = (index: number, value: string) => {
//     const newServices = [...profileData.services];
//     newServices[index] = value;
//     setProfileData({
//       ...profileData,
//       services: newServices
//     });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold text-[#333333] mb-2">Profile Management</h1>
//           <p className="text-[#6B7280]">Manage your business profile and visibility settings</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Button 
//             variant="outline" 
//             className="border-[#004C97] text-[#004C97] hover:bg-[#004C97] hover:text-white"
//           >
//             <Eye className="w-4 h-4 mr-2" />
//             Preview Profile
//           </Button>
//           {!isEditing ? (
//             <Button 
//               onClick={() => setIsEditing(true)}
//               className="bg-[#004C97] text-white hover:bg-[#003a75]"
//             >
//               <Edit3 className="w-4 h-4 mr-2" />
//               Edit Profile
//             </Button>
//           ) : (
//             <div className="flex gap-2">
//               <Button variant="outline" onClick={handleCancel}>
//                 <X className="w-4 h-4 mr-2" />
//                 Cancel
//               </Button>
//               <Button 
//                 onClick={handleSave}
//                 className="bg-[#D4AF37] text-white hover:bg-[#c19b2b]"
//               >
//                 <Save className="w-4 h-4 mr-2" />
//                 Save Changes
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>

//       <Tabs defaultValue="basic" className="space-y-6">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="basic">Basic Information</TabsTrigger>
//           <TabsTrigger value="services">Services & Skills</TabsTrigger>
//           <TabsTrigger value="media">Logo & Gallery</TabsTrigger>
//           <TabsTrigger value="settings">Privacy Settings</TabsTrigger>
//         </TabsList>

//         <TabsContent value="basic">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Company Logo */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-[#333333]">Company Logo</CardTitle>
//               </CardHeader>
//               <CardContent className="text-center">
//                 <div className="relative inline-block mb-4">
//                   <Avatar className="w-32 h-32">
//                     <AvatarImage src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" />
//                     <AvatarFallback className="bg-[#004C97] text-white text-3xl">TN</AvatarFallback>
//                   </Avatar>
//                   {isEditing && (
//                     <Button 
//                       size="sm" 
//                       className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 bg-[#D4AF37] hover:bg-[#c19b2b]"
//                     >
//                       <Camera className="w-4 h-4" />
//                     </Button>
//                   )}
//                 </div>
//                 {isEditing && (
//                   <div className="space-y-2">
//                     <Button variant="outline" className="w-full">
//                       <Upload className="w-4 h-4 mr-2" />
//                       Upload New Logo
//                     </Button>
//                     <p className="text-xs text-[#6B7280]">
//                       Recommended: 400x400px, max 2MB
//                     </p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Basic Information */}
//             <div className="lg:col-span-2 space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-[#333333]">Company Details</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-[#333333] mb-2">
//                         Company Name *
//                       </label>
//                       <Input
//                         value={profileData.companyName}
//                         onChange={(e) => setProfileData({...profileData, companyName: e.target.value})}
//                         disabled={!isEditing}
//                         className="focus:ring-2 focus:ring-[#004C97]"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-[#333333] mb-2">
//                         Industry Sector *
//                       </label>
//                       <Select 
//                         value={profileData.sector} 
//                         onValueChange={(value) => setProfileData({...profileData, sector: value})}
//                         disabled={!isEditing}
//                       >
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Technology">Technology</SelectItem>
//                           <SelectItem value="Agriculture">Agriculture</SelectItem>
//                           <SelectItem value="Construction">Construction</SelectItem>
//                           <SelectItem value="Fintech">Fintech</SelectItem>
//                           <SelectItem value="Energy">Energy</SelectItem>
//                           <SelectItem value="Manufacturing">Manufacturing</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-[#333333] mb-2">
//                       Company Description *
//                     </label>
//                     <Textarea
//                       value={profileData.description}
//                       onChange={(e) => setProfileData({...profileData, description: e.target.value})}
//                       disabled={!isEditing}
//                       rows={4}
//                       className="focus:ring-2 focus:ring-[#004C97]"
//                       placeholder="Describe your company, services, and expertise..."
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-[#333333] mb-2">
//                         Founded
//                       </label>
//                       <Input
//                         value={profileData.founded}
//                         onChange={(e) => setProfileData({...profileData, founded: e.target.value})}
//                         disabled={!isEditing}
//                         className="focus:ring-2 focus:ring-[#004C97]"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-[#333333] mb-2">
//                         Company Size
//                       </label>
//                       <Select 
//                         value={profileData.employees} 
//                         onValueChange={(value) => setProfileData({...profileData, employees: value})}
//                         disabled={!isEditing}
//                       >
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="1-10">1-10 employees</SelectItem>
//                           <SelectItem value="11-50">11-50 employees</SelectItem>
//                           <SelectItem value="51-200">51-200 employees</SelectItem>
//                           <SelectItem value="201-1000">201-1000 employees</SelectItem>
//                           <SelectItem value="1000+">1000+ employees</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-[#333333] mb-2">
//                         Location *
//                       </label>
//                       <Input
//                         value={profileData.location}
//                         onChange={(e) => setProfileData({...profileData, location: e.target.value})}
//                         disabled={!isEditing}
//                         className="focus:ring-2 focus:ring-[#004C97]"
//                       />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-[#333333]">Contact Information</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-[#333333] mb-2">
//                         <Phone className="w-4 h-4 inline mr-1" />
//                         Phone Number
//                       </label>
//                       <Input
//                         value={profileData.phone}
//                         onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
//                         disabled={!isEditing}
//                         className="focus:ring-2 focus:ring-[#004C97]"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-[#333333] mb-2">
//                         <Mail className="w-4 h-4 inline mr-1" />
//                         Email Address *
//                       </label>
//                       <Input
//                         value={profileData.email}
//                         onChange={(e) => setProfileData({...profileData, email: e.target.value})}
//                         disabled={!isEditing}
//                         className="focus:ring-2 focus:ring-[#004C97]"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-[#333333] mb-2">
//                       <Globe className="w-4 h-4 inline mr-1" />
//                       Website
//                     </label>
//                     <Input
//                       value={profileData.website}
//                       onChange={(e) => setProfileData({...profileData, website: e.target.value})}
//                       disabled={!isEditing}
//                       className="focus:ring-2 focus:ring-[#004C97]"
//                       placeholder="https://www.yourcompany.com"
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </TabsContent>

//         <TabsContent value="services">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="text-[#333333]">Services Offered</CardTitle>
//                   {isEditing && (
//                     <Button size="sm" onClick={addService} variant="outline">
//                       <Plus className="w-4 h-4 mr-1" />
//                       Add Service
//                     </Button>
//                   )}
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   {profileData.services.map((service, index) => (
//                     <div key={index} className="flex items-center gap-2">
//                       {isEditing ? (
//                         <>
//                           <Input
//                             value={service}
//                             onChange={(e) => updateService(index, e.target.value)}
//                             className="flex-1 focus:ring-2 focus:ring-[#004C97]"
//                             placeholder="Enter service name"
//                           />
//                           <Button 
//                             size="sm" 
//                             variant="ghost" 
//                             onClick={() => removeService(index)}
//                             className="text-red-600 hover:text-red-700"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         </>
//                       ) : (
//                         <Badge variant="outline" className="text-[#004C97] border-[#004C97]">
//                           {service}
//                         </Badge>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-[#333333]">Certifications & Awards</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   {profileData.certifications.map((cert, index) => (
//                     <div key={index} className="flex items-center gap-3">
//                       <Award className="w-5 h-5 text-[#D4AF37]" />
//                       <span className="text-[#333333]">{cert}</span>
//                     </div>
//                   ))}
//                   {isEditing && (
//                     <Button variant="outline" size="sm" className="w-full">
//                       <Plus className="w-4 h-4 mr-2" />
//                       Add Certification
//                     </Button>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="media">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-[#333333]">Company Gallery</CardTitle>
//                 {isEditing && (
//                   <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
//                     <Upload className="w-4 h-4 mr-2" />
//                     Upload Images
//                   </Button>
//                 )}
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {gallery.map((image, index) => (
//                   <div key={index} className="relative group">
//                     <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
//                       <ImageWithFallback
//                         src={image}
//                         alt={`Gallery image ${index + 1}`}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                     {isEditing && (
//                       <Button 
//                         size="sm"
//                         variant="destructive"
//                         className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <Trash2 className="w-3 h-3" />
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//                 {isEditing && (
//                   <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#004C97] transition-colors">
//                     <div className="text-center">
//                       <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                       <p className="text-sm text-gray-500">Add Image</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="settings">
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-[#333333]">Privacy & Visibility Settings</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="font-medium text-[#333333]">Profile Visibility</h4>
//                   <p className="text-sm text-[#6B7280]">Make your profile visible to other members</p>
//                 </div>
//                 <Switch 
//                   checked={profileData.profileVisibility}
//                   onCheckedChange={(checked) => setProfileData({...profileData, profileVisibility: checked})}
//                 />
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="font-medium text-[#333333]">Show Contact Information</h4>
//                   <p className="text-sm text-[#6B7280]">Display your contact details to verified members</p>
//                 </div>
//                 <Switch 
//                   checked={profileData.showContactInfo}
//                   onCheckedChange={(checked) => setProfileData({...profileData, showContactInfo: checked})}
//                 />
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="font-medium text-[#333333]">Allow Direct Messages</h4>
//                   <p className="text-sm text-[#6B7280]">Let other members send you direct messages</p>
//                 </div>
//                 <Switch 
//                   checked={profileData.allowDirectMessages}
//                   onCheckedChange={(checked) => setProfileData({...profileData, allowDirectMessages: checked})}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }