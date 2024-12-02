import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (categorySlug: string) => {
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
    *[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)
  `);

  try {
    // use sanityFetch to send the query to the Sanity API
    const products = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: { categorySlug },
    });

    // return the products from the response data or an empty array if there are no products
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products by category", error);
    return [];
  }
};
