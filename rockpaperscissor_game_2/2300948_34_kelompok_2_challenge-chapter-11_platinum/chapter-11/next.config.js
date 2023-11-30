/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)", // Adjust this source pattern as needed
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value:
  //           "default-src 'self' https://identitytoolkit.googleapis.com; script-src 'self' 'unsafe-eval' https://apis.google.com; cross-origin-embedder-policy none;"
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
