"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/";

  const supabase = createSupabaseBrowserClient();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!email.toLowerCase().endsWith(".edu.vn")) {
      setMessage("Chỉ chấp nhận email .edu.vn.");
      setLoading(false);
      return;
    }

    if (!supabase) {
      setMessage("Cần cấu hình Supabase trước khi đăng nhập.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(
          nextPath
        )}`,
      },
    });

    if (error) {
      setMessage("Không thể gửi email đăng nhập. Vui lòng thử lại.");
    } else {
      setMessage("Đã gửi link đăng nhập tới email của bạn.");
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Đăng nhập</h1>
        <p className="text-muted-foreground">
          Sử dụng email sinh viên .edu.vn để truy cập.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="ten@truong.edu.vn"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
          required
        />
        <Button disabled={loading} type="submit">
          {loading ? "Đang gửi..." : "Gửi link đăng nhập"}
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
