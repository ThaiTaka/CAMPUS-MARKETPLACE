import { ProductCard } from "@/components/product-card";
import { EmptyState } from "@/components/empty-state";
import { getProducts } from "@/lib/products";
import type { ProductFilters } from "@/lib/types";

export async function ProductResults({ filters }: { filters: ProductFilters }) {
  const products = await getProducts(filters);

  if (!products.length) {
    return (
      <EmptyState
        title="Chưa có sản phẩm phù hợp"
        description="Hãy thử thay đổi bộ lọc hoặc đăng tin mới."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
