# Campus Marketplace Đà Lạt

Marketplace cho sinh viên Đà Lạt: tìm theo mã học phần, lọc chuyên ngành, đăng tin nhiều ảnh.

## Yêu cầu
- Node.js 18+
- Supabase project (Auth + Database + Storage)

## Cài đặt
```powershell
npm install
```

Tạo file `.env.local` từ `.env.example`:
```powershell
Copy-Item .env.example .env.local
```

Cập nhật giá trị:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Thiết lập Supabase
1. Chạy `schema.sql` trong SQL Editor.
2. Tạo bucket `product-images` và bật public access.
3. Bật Auth OTP email (hoặc provider bạn muốn dùng).

## Chạy ứng dụng
```powershell
npm run dev
```

Mở http://localhost:3000

## Ghi chú
- Middleware chặn đăng nhập nếu email không có domain `.edu.vn`.
- Form đăng tin hỗ trợ upload nhiều ảnh lên Supabase Storage.
