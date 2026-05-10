"use client";

import { useState } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, CITIES } from "@/lib/constants";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SellPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const supabase = createSupabaseBrowserClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "");
    const price = Number(formData.get("price") ?? 0);
    const category = String(formData.get("category") ?? CATEGORIES[0]);
    const city = String(formData.get("city") ?? "Đà Lạt");
    const courseCode = String(formData.get("course_code") ?? "");
    const description = String(formData.get("description") ?? "");

    if (!supabase) {
      setMessage("Cần cấu hình Supabase trước khi đăng tin.");
      setLoading(false);
      return;
    }

    try {
      const imageUrls: string[] = [];
      if (files && files.length > 0) {
        const uploads = (Array.from(files) as File[]).map(async (file) => {
          const filePath = `${crypto.randomUUID()}-${file.name}`;
          const { data, error } = await supabase.storage
            .from("product-images")
            .upload(filePath, file, { cacheControl: "3600" });

          if (error) throw error;

          const { data: publicUrl } = supabase.storage
            .from("product-images")
            .getPublicUrl(data.path);

          imageUrls.push(publicUrl.publicUrl);
        });

        await Promise.all(uploads);
      }

      const { error } = await supabase.from("products").insert({
        title,
        price,
        category,
        status: "available",
        university_city: city,
        course_code: courseCode || null,
        description,
        image_urls: imageUrls,
      });

      if (error) throw error;

      setMessage("Đăng tin thành công! Sản phẩm của bạn đã hiển thị.");
      event.currentTarget.reset();
      setFiles(null);
    } catch (err) {
      setMessage("Có lỗi khi đăng tin. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Đăng tin sản phẩm</h1>
        <p className="text-muted-foreground">
          Upload nhiều ảnh lên Supabase Storage để tăng lượt xem.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input name="title" placeholder="Tiêu đề" required />
        <div className="grid gap-4 md:grid-cols-2">
          <Input name="price" type="number" placeholder="Giá (VND)" required />
          <select
            name="category"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            defaultValue={CATEGORIES[0]}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <select
          name="city"
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          defaultValue="Đà Lạt"
        >
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <Input name="course_code" placeholder="Mã học phần (VD: IT101)" />
        <Textarea name="description" placeholder="Mô tả chi tiết" />
        <Input
          name="images"
          type="file"
          multiple
          accept="image/*"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFiles(event.target.files)
          }
        />
        <Button disabled={loading} type="submit">
          {loading ? "Đang đăng..." : "Đăng tin"}
        </Button>
      </form>

      {message && (
        <div className="rounded-md border border-border bg-muted p-3 text-sm">
          {message}
        </div>
      )}
    </div>
  );
}
