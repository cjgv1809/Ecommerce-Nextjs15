import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllCategories = async () => {
  const ALL_CATEGORIES_QUERY = defineQuery(`
    *[_type == "category"] | order(name asc)
  `);

  try {
    // use sanityFetch to send the query to the Sanity API
    const categories = await sanityFetch({
      query: ALL_CATEGORIES_QUERY,
    });

    // return the categories from the response data or an empty array if there are no categories
    return categories.data || [];
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
};
