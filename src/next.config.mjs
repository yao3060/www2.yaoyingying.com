/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yaoyingying-media.oss-cn-hongkong.aliyuncs.com",
      },
    ],
  },
};

export default nextConfig;
