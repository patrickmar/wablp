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
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/customers/${userId}`)
        .then((res) => setProfileData(res.data))
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [userId]);

  const handleSave = () => {
    if (!userId) return;
    axios
      .put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/customers/${userId}`, profileData)
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/customers/${userId}/upload-profile-photo`,
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
