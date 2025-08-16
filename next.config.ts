import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during build
  },
  output: "export", // enables static HTML export
  images: {
    unoptimized: true, // disable Next.js Image Optimization (needed for static export)
  },
  /* other config options here */
};

export default nextConfig;






// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   // eslint: {
//   //   ignoreDuringBuilds: true, // 🚀 Skip ESLint errors during build
//   // },
//   // /* config options here */
// };

// export default nextConfig;
