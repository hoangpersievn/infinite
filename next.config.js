/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(__dirname, "/");
    // config.module.rules.push({
    //   test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
    //   use: {
    //     loader: "url-loader",
    //     options: {
    //       limit: 100000,
    //       name: "[name].[ext]",
    //     },
    //   },
    // });

    return config;
  },
  // Enable CSS modules for all files
  // Enable CSS modules for files in the `src` directory
  images: {
    domains: ["via.placeholder.com"],
  },
  server: {
    port: 4000,
  },
};

module.exports = nextConfig;
