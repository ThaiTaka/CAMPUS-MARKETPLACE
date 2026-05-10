import Image from "next/image";
import Link from "next/link";
import { MapPin, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { STATUS_LABELS } from "@/lib/constants";
import { getProductCover } from "@/lib/cover";
import type { Product } from "@/lib/types";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);

export function ProductCard({ product }: { product: Product }) {
  const cover = getProductCover(product);
  return (
    <Card className="card-hover flex h-full flex-col">
      {cover.url ? (
        <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
          <Image
            src={cover.url}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge>{product.category}</Badge>
          <Badge className="bg-emerald-100 text-emerald-800">
            {STATUS_LABELS[product.status]}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2 text-base">
          <Link href={`/products/${product.id}`} className="hover:underline">
            {product.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        <div className="text-lg font-semibold text-primary">
          {formatPrice(product.price)}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {product.university_city}
        </div>
        {product.course_code && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Tag className="h-4 w-4" />
            {product.course_code}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link
          href={`/products/${product.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Xem chi tiết
        </Link>
      </CardFooter>
    </Card>
  );
}
