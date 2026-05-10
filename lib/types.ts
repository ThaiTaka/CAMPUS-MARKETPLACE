export type ProductStatus = "available" | "reserved" | "sold";

export type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  status: ProductStatus;
  university_city: string;
  course_code: string | null;
  description?: string | null;
  image_urls: string[];
  created_at: string;
};

export type ProductFilters = {
  query?: string;
  major?: string;
  city?: string;
  course?: string;
};
