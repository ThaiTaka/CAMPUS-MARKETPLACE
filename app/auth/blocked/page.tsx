import Link from "next/link";

export default function BlockedPage({
  searchParams,
}: {
  searchParams: { reason?: string };
}) {
  return (
    <div className="mx-auto max-w-md space-y-4 text-center">
      <h1 className="text-2xl font-semibold">Truy cập bị từ chối</h1>
      <p className="text-muted-foreground">
        {searchParams.reason === "domain"
          ? "Email của bạn không thuộc domain .edu.vn."
          : "Bạn không có quyền truy cập."}
      </p>
      <Link href="/auth/login" className="text-primary hover:underline">
        Thử lại với email khác
      </Link>
    </div>
  );
}
