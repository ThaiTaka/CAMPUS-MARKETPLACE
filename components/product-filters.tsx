import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, CITIES } from "@/lib/constants";
import type { ProductFilters } from "@/lib/types";

export function ProductFilters({ filters }: { filters: ProductFilters }) {
  return (
    <form
      className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-4"
      method="get"
      action="/"
    >
      <div className="md:col-span-2">
        <label className="text-xs font-medium text-muted-foreground">Tìm kiếm</label>
        <Input
          name="q"
          placeholder="Tìm theo tiêu đề hoặc đồ dùng"
          defaultValue={filters.query ?? ""}
        />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Chuyên ngành</label>
        <select
          name="major"
          defaultValue={filters.major ?? ""}
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Tất cả</option>
          {CATEGORIES.map((major) => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Địa điểm</label>
        <select
          name="city"
          defaultValue={filters.city ?? ""}
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Tất cả</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Mã học phần</label>
        <Input
          name="course"
          placeholder="VD: IT203"
          defaultValue={filters.course ?? ""}
        />
      </div>
      <div className="flex items-end gap-2">
        <Button type="submit" className="w-full">
          Lọc kết quả
        </Button>
      </div>
    </form>
  );
}
