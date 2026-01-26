import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow dev server access from local network IPs (192.168.x.x range)
  allowedDevOrigins: ["http://192.168.*"],
  // Redirect portal to under-development until portal is built
  async redirects() {
    return [
      {
        source: "/portal",
        destination: "/under-development",
        permanent: false,
      },
      // WordPress migration redirects (SEO preservation)
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-us/",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact-us/",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/metrosure-insurance",
        destination: "/",
        permanent: true,
      },
      {
        source: "/metrosure-insurance/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/metrosure-consult",
        destination: "/corporate",
        permanent: true,
      },
      {
        source: "/metrosure-consult/",
        destination: "/corporate",
        permanent: true,
      },
      {
        source: "/blog-grid-2-columns-right-sidebar",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog-grid-2-columns-right-sidebar/",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        port: "",
        pathname: "/maps/api/staticmap/**",
      },
    ],
    // Allow unoptimized images for development
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
