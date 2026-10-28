/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // Old category URLs from the first version of the site
  async redirects() {
    return [
      { source: "/experiences/restaurants/:path*", destination: "/experiences/dining", permanent: true },
      { source: "/experiences/restaurants", destination: "/experiences/dining", permanent: true },
      { source: "/experiences/events/:path*", destination: "/experiences/sports?type=races", permanent: true },
      { source: "/experiences/events", destination: "/experiences/sports?type=races", permanent: true },
      // Race pages replaced by official events
      { source: "/experiences/sports/amsterdam-city-marathon", destination: "/experiences/sports/tcs-amsterdam-marathon", permanent: true },
      { source: "/experiences/sports/rotterdam-spring-marathon", destination: "/experiences/sports/nn-marathon-rotterdam", permanent: true },
      { source: "/experiences/sports/iron-distance-triathlon-almere", destination: "/experiences/sports/challenge-almere-amsterdam", permanent: true },
    ];
  },
};

export default nextConfig;
