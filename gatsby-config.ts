import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: ".env",
});

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: ["post"],
};

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
