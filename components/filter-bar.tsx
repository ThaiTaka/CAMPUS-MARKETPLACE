"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";

import { Input } from "@/components/ui/input";

const majors = [
  { value: "", label: "Tất cả chuyên ngành" },
  { value: "IT", label: "Công nghệ thông tin" },
  { value: "CHEM", label: "Hóa học" },
];

const cities = [
  { value: "", label: "Tất cả địa điểm" },
  { value: "Da Lat", label: "Đà Lạt" },
];

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-4">
      <Input
        placeholder="Tìm theo mã học phần (VD: IT101)"
        defaultValue={searchParams?.get("q") ?? ""}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            updateParam("q", (event.target as HTMLInputElement).value);
          }
        }}
      />
      <select
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
        defaultValue={searchParams?.get("major") ?? ""}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          updateParam("major", event.target.value)
        }
      >
        {majors.map((major) => (
          <option key={major.value} value={major.value}>
            {major.label}
          </option>
        ))}
      </select>
      <select
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
        defaultValue={searchParams?.get("city") ?? ""}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          updateParam("city", event.target.value)
        }
      >
        {cities.map((city) => (
          <option key={city.value} value={city.value}>
            {city.label}
          </option>
        ))}
      </select>
      <button
        className="h-10 rounded-md bg-secondary text-sm font-medium text-secondary-foreground"
        onClick={() => router.push("/")}
      >
        Xóa bộ lọc
      </button>
    </div>
  );
}
