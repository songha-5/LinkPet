import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
     {
        protocol: 'https',
        hostname: 'mtvgmaymdnljmhbfedfw.supabase.co',
        port: '',
        pathname: '/**',
      },
      new URL('http://k.kakaocdn.net/**')
    ],
  },
};

export default nextConfig;
