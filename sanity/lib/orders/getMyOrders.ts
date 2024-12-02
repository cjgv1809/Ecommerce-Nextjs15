import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error("No user ID provided");
  }

  // Define the query to get orders based on user ID, sorted by order date descending
  const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {...,
      products[] {
        ...,
        product->
      }
    }
  `);

  try {
    // use sanityFetch to send the query to Sanity
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });

    // return the list of orders, or an empty array if there are none
    return orders.data || [];
  } catch (error) {
    console.error("Error fetching orders", error);
    throw new Error("Error fetching orders");
  }
}
