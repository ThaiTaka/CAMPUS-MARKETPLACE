import Link from "next/link";
import { MapPin } from "lucide-react";

import { AuthActions } from "@/components/auth-actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function SiteHeader() {
  const supabase = createSupabaseServerClient();
  const { data } = supabase ? await supabase.auth.getSession() : { data: null };
  const userEmail = data?.session?.user?.email ?? null;

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
            Campus
          </span>
          <span>Marketplace Đà Lạt</span>
        </Link>
        <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
          <MapPin className="h-4 w-4" />
          Đà Lạt, Lâm Đồng
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/sell"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent"
          >
            Đăng tin
          </Link>
          <AuthActions userEmail={userEmail} />
        </div>
      </div>
    </header>
  );
}
