import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STATUS_LABELS } from "@/lib/constants";
import { getProductCover } from "@/lib/cover";
import { getProductById } from "@/lib/products";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="space-y-6">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          ← Quay lại danh sách
        </Link>
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          Không tìm thấy sản phẩm.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm text-muted-foreground hover:underline">
        ← Quay lại danh sách
      </Link>
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge>{product.category}</Badge>
            <Badge className="bg-emerald-100 text-emerald-800">
              {STATUS_LABELS[product.status]}
            </Badge>
          </div>
          <CardTitle className="text-2xl">{product.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(() => {
            const cover = getProductCover(product);
            if (!cover.url) return null;
            return (
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <Image
                  src={cover.url}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 70vw"
                  className="object-cover"
                />
              </div>
            );
          })()}
          <div className="text-2xl font-semibold text-primary">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
              maximumFractionDigits: 0,
            }).format(product.price)}
          </div>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <div>Địa điểm: {product.university_city}</div>
            {product.course_code && <div>Mã học phần: {product.course_code}</div>}
          </div>
          <p>{product.description ?? "Chưa có mô tả"}</p>
          <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
            Kết nối người bán qua chat để thương lượng thêm.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
