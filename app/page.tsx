import Link from "next/link";

import { ProductFilters } from "@/components/product-filters";
import { ProductResults } from "@/components/product-results";
import type { ProductFilters as Filters } from "@/lib/types";

type SearchParams = {
  q?: string;
  major?: string;
  city?: string;
  course?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filters: Filters = {
    query: searchParams.q,
    major: searchParams.major,
    city: searchParams.city,
    course: searchParams.course,
  };

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white via-white to-slate-100 p-6 md:p-10">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-sky-100/60 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
              Dành riêng cho sinh viên Đà Lạt
            </span>
            <h1 className="text-3xl font-semibold md:text-4xl">
              Chợ sinh viên Đà Lạt
            </h1>
            <p className="max-w-xl text-muted-foreground">
              Tìm đồ dùng học tập, thiết bị và tài liệu theo mã học phần ngay
              tại khu vực Đà Lạt. Lọc theo chuyên ngành, địa điểm và trạng thái.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/sell"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
            >
              Đăng tin miễn phí
            </Link>
            <Link
              href="/search"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-5 text-sm font-medium transition-colors hover:bg-accent"
            >
              Tìm kiếm nâng cao
            </Link>
          </div>
        </div>
      </section>

      <ProductFilters filters={filters} />

      <ProductResults filters={filters} />
    </div>
  );
}
