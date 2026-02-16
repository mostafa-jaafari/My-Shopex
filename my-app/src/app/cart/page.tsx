import { ProductsCardTable } from "./ProductsCartTable";
import { ProductsCartForm } from "./ProdyctsCartForm";




export const dynamic = 'force-static';

export default function CartPage() {
  return (
    <div
        className="p-6 md:p-12"
    >
        <h2 className="text-3xl primary-text font-semibold">
            صفحة السلة
        </h2>

      <div
            dir="ltr"
            className="w-full mt-6 flex lg:flex-row flex-col lg:items-start items-end gap-3 lg:gap-12"
      >
        <ProductsCardTable />
        <ProductsCartForm />
      </div>
    </div>
  );
}