import type { Product } from "@/lib/types";

export function getProductCover(product: Product) {
  const cover = product.image_urls?.[0] ?? "";
  if (cover && isTrustedCover(cover)) {
    return { url: cover, isData: false };
  }

  const key =
    keywordMap.find((item) => item.keyword.test(product.title))?.key ??
    categoryToKey(product.category);

  const seed = hashString(`${product.title}-${product.id ?? ""}`);
  const picked = pickCuratedPhoto(key, seed);
  return { url: picked, isData: false };
}

  function categoryToKey(category: string): keyof typeof curatedPhotos {
    switch (category) {
      case "Công nghệ thông tin":
        return "laptop";
      case "Hóa học":
        return "chemistry";
      case "Kinh tế":
        return "business";
      case "Sinh học":
        return "biology";
      default:
        return "general";
    }
  }

  function hashString(value: string) {
    return value.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }

  function isTrustedCover(url: string) {
    if (url.startsWith("data:")) return true;
    return url.includes("supabase.co");
  }
  const curatedPhotos: Record<string, string[]> = {
    calculator: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517868163143-6eb6c78c3cb6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    ],
    chemistry: [
      "https://images.unsplash.com/photo-1581092334445-1f96d2b0cebe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1200&q=80",
    ],
    book: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    ],
    laptop: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    ],
    arduino: [
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    ],
    backpack: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    ],
    desk: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    ],
    headphones: [
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80",
    ],
    printer: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    ],
    business: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=80",
    ],
    biology: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?auto=format&fit=crop&w=1200&q=80",
    ],
    general: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    ],
  };

  function pickCuratedPhoto(key: keyof typeof curatedPhotos, seed: number) {
    const photos = curatedPhotos[key] ?? curatedPhotos.general;
    const index = Math.abs(seed) % photos.length;
    return photos[index];
  }

  const keywordMap: Array<{ keyword: RegExp; key: keyof typeof curatedPhotos }> = [
    { keyword: /casio|calculator|máy tính/i, key: "calculator" },
    { keyword: /laptop|macbook|thinkpad/i, key: "laptop" },
    { keyword: /ssd|ổ cứng/i, key: "laptop" },
    { keyword: /sách|giáo trình|tài liệu/i, key: "book" },
    { keyword: /hóa|thí nghiệm|dụng cụ|lab/i, key: "chemistry" },
    { keyword: /kit|arduino|iot/i, key: "arduino" },
    { keyword: /balo|áo|giày|đồng phục/i, key: "backpack" },
    { keyword: /bàn|ghế/i, key: "desk" },
    { keyword: /tai nghe|headphone/i, key: "headphones" },
    { keyword: /máy in/i, key: "printer" },
  ];
