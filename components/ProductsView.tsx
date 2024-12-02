import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import CategorySelectorComponent from "./CategorySelectorComponent";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

function ProductsView({ products, categories }: ProductsViewProps) {
  return (
    <div className="flex flex-col w-full">
      {/* categories */}
      <div className="w-full sm:w-[200px] mb-4">
        <CategorySelectorComponent categories={categories} />
      </div>

      {/* products */}
      <div className="flex-1">
        {/* <div> */}
          <ProductGrid products={products} />
          <hr className="w-full mt-3" />
        {/* </div> */}
      </div>
    </div>
  );
}

export default ProductsView;
