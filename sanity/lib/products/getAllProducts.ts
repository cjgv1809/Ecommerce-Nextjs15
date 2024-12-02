import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(`
    *[_type == "product"] | order(name asc)
  `);

  try {
    // use sanityFetch to send the query to the Sanity API
    const products = await sanityFetch({
      query: ALL_PRODUCTS_QUERY,
    });

    // return the products from the response data or an empty array if there are no products
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
};
