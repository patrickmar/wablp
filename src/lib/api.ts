// src/lib/api.ts
export const isNetlify = process.env.NODE_ENV === "production";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
