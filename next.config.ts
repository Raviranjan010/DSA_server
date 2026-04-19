import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore - bypassing Strict Types for newly introduced features
  allowedDevOrigins: ['192.168.56.1', 'localhost'],
};

export default nextConfig;
