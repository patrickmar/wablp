import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during build
  },
  output: "export", // enables static HTML export
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
