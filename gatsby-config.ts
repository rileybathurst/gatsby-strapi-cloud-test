import type { GatsbyConfig } from "gatsby";
import fetch from "node-fetch";

require("dotenv").config({
  path: ".env",
});

console.log("🦄");

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: ["post"],
};

if (!strapiConfig.apiURL || !strapiConfig.accessToken) {
  throw new Error(
    "Missing STRAPI_API_URL or STRAPI_TOKEN environment variables."
  );
}

// Simple check for 403 error by making a fetch request to the Strapi API

(async () => {
  try {
    const res = await fetch(`${strapiConfig.apiURL}/api/posts`, {
      headers: {
        Authorization: `Bearer ${strapiConfig.accessToken}`,
      },
    });
    if (res.status === 403) {
      throw new Error(
        "Received 403 Forbidden from Strapi API. Check your access token and permissions."
      );
    }
  } catch (err) {
    console.error("Error checking Strapi API:", err);
    process.exit(1);
  }
})();

console.log("Using Strapi API URL:", strapiConfig.apiURL);

const config: GatsbyConfig = {
  siteMetadata: {
    title: "gatsby-strapi-cloud-test",
    siteUrl: "https://www.yourdomain.tld",
  },

  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-source-strapi",
      options: strapiConfig,
    },
    "gatsby-transformer-remark",
  ],
};

export default config;
