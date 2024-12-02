import "server-only";

// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";

// set your viewer token here
const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
  throw new Error("The environment variable SANITY_API_READ_TOKEN is missing");
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0,
  },
});