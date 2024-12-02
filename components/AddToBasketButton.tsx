"use client";

import { Product } from "@/sanity.types";
import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState(false);

  // This ensures that the component is only rendered on the client side preventing hydration errors due to server/client mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex items-center justify-center space-x-2 bg-gray-100 w-fit mx-auto rounded-full">
      <button
        type="button"
        onClick={() => removeItem(product._id)}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
          itemCount === 0
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        disabled={itemCount === 0 || disabled}
      >
        <span
          className={`
          text-xl font-bold ${
            itemCount === 0
              ? "text-gray-400 opacity-50"
              : "text-gray-600 opacity-100"
          }`}
          aria-hidden="true"
        >
          -
        </span>
      </button>
      <span className="w-8 text-center font-semibold">{itemCount}</span>
      <button
        type="button"
        onClick={() => addItem(product)}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
          disabled
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        }`}
        disabled={disabled}
      >
        <span className="text-xl font-bold text-white" aria-hidden="true">
          +
        </span>
      </button>
    </div>
  );
}

export default AddToBasketButton;
