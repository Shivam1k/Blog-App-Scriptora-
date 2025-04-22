import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  productionBrowserSourceMaps: false
  ,
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        
      },

      {
        protocol: "https",
        hostname: "images.unsplash.com",
        
      },
      
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
    ]
   
  }
};

export default nextConfig;
