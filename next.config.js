/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "links.papareact.com",
      "logodownload.org",
      "api.dicebear.com",
      "cdn.pixabay.com",
      "media.istockphoto.com",
    ],
  },
};

module.exports = nextConfig
