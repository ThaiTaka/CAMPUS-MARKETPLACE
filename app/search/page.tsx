import Link from "next/link";
import type { Metadata } from "next";

import { ProductResults } from "@/components/product-results";
import { Input } from "@/components/ui/input";
import type { ProductFilters } from "@/lib/types";

type SearchParams = { q?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const keyword = searchParams.q ?? "mã học phần";
  return {
    title: `Tìm kiếm ${keyword} | Campus Marketplace Đà Lạt`,
    description: `Tìm sản phẩm theo ${keyword} dành cho sinh viên Đà Lạt. Ưu tiên mã học phần và chuyên ngành địa phương.`,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const keyword = searchParams.q ?? "";
  const filters: ProductFilters = {
    course: keyword,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Tìm kiếm theo mã học phần</h1>
        <p className="text-muted-foreground">
          Tối ưu SEO local cho khu vực Đà Lạt, ưu tiên mã học phần.
        </p>
      </div>
      <form className="flex flex-col gap-3 md:flex-row" action="/search" method="get">
        <Input name="q" defaultValue={keyword} placeholder="Nhập mã học phần" />
        <button className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
          Tìm kiếm
        </button>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium"
        >
          Về trang chủ
        </Link>
      </form>
      <ProductResults filters={filters} />
    </div>
  );
}
