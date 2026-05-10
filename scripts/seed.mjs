import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const seedEmail = process.env.SEED_USER_EMAIL ?? "seed@campus.edu.vn";
const seedPassword = process.env.SEED_USER_PASSWORD ?? "Password123!";

const { data: userLookup, error: lookupError } =
  await supabase.auth.admin.getUserByEmail(seedEmail);

if (lookupError) {
  console.error("Failed to lookup seed user:", lookupError.message);
  process.exit(1);
}

let userId = userLookup?.user?.id ?? null;

if (!userId) {
  const { data: created, error: createError } =
    await supabase.auth.admin.createUser({
      email: seedEmail,
      password: seedPassword,
      email_confirm: true,
    });

  if (createError || !created.user) {
    console.error("Failed to create seed user:", createError?.message);
    process.exit(1);
  }

  userId = created.user.id;
}

const { error: profileError } = await supabase.from("profiles").upsert({
  id: userId,
  full_name: "Tài khoản demo",
  university_city: "Đà Lạt",
  major: "Công nghệ thông tin",
});

if (profileError) {
  console.error("Failed to upsert profile:", profileError.message);
  process.exit(1);
}

const { count } = await supabase
  .from("products")
  .select("id", { count: "exact", head: true });

if ((count ?? 0) > 0 && process.env.SEED_FORCE !== "1") {
  console.log(
    "Products already exist. Set SEED_FORCE=1 to insert sample data anyway."
  );
  process.exit(0);
}

const products = [
  {
    title: "Giáo trình Cấu trúc dữ liệu",
    price: 120000,
    category: "Công nghệ thông tin",
    status: "available",
    university_city: "Đà Lạt",
    course_code: "IT203",
    description: "Sách còn mới 90%, phù hợp cho IT203.",
  },
  {
    title: "Giáo trình Kỹ thuật lập trình",
    price: 140000,
    category: "Công nghệ thông tin",
    status: "available",
    university_city: "Đà Lạt",
    course_code: "IT202",
    description: "Có ghi chú và ví dụ thực hành.",
  },
  {
    title: "Bộ kit thực hành IoT",
    price: 490000,
    category: "Công nghệ thông tin",
    status: "available",
    university_city: "Đà Lạt",
    course_code: "IT450",
    description: "Có cảm biến, board, dây nối đầy đủ.",
  },
  {
    title: "Máy tính Casio FX-580VN X",
    price: 380000,
    category: "Hóa học",
    status: "available",
    university_city: "Đà Lạt",
    course_code: "CH102",
    description: "Dùng tốt, pin mới thay.",
  },
  {
    title: "Bộ mô hình phân tử hóa học",
    price: 180000,
    category: "Hóa học",
    status: "available",
    university_city: "Đà Lạt",
    course_code: "CH105",
    description: "Dùng cho thực hành hóa đại cương.",
  },
  {
    title: "Sách Hóa phân tích",
    price: 125000,
    category: "Hóa học",
    status: "available",
    university_city: "Đà Lạt",
    course_code: "CH220",
    description: "Có bài tập cuối chương.",
  },
  {
    title: "Sách Sinh học tế bào",
    price: 110000,
    category: "Sinh học",
    status: "available",
    university_city: "Đà Lạt",
    course_code: "BIO201",
    description: "Sách in màu, có ghi chú.",
  },
  {
    title: "Kính hiển vi mini",
    price: 290000,
    category: "Sinh học",
    status: "available",
    university_city: "Bảo Lộc",
    course_code: "BIO110",
    description: "Dùng cho thực hành quan sát tế bào.",
  },
  {
    title: "Sách Marketing căn bản",
    price: 95000,
    category: "Kinh tế",
    status: "available",
    university_city: "Đà Lạt",
    course_code: "MK101",
    description: "Bìa cứng, còn mới.",
  },
  {
    title: "Sách Quản trị học",
    price: 105000,
    category: "Kinh tế",
    status: "available",
    university_city: "Đà Lạt",
    course_code: "EC210",
    description: "Tóm tắt chương rõ ràng.",
  },
  {
    title: "Bàn học gấp gọn",
    price: 420000,
    category: "Khác",
    status: "available",
    university_city: "Bảo Lộc",
    course_code: null,
    description: "Nhẹ, dễ di chuyển, phù hợp phòng trọ.",
  },
  {
    title: "Balo laptop chống nước",
    price: 230000,
    category: "Khác",
    status: "available",
    university_city: "Bảo Lộc",
    course_code: null,
    description: "Màu xám, nhiều ngăn.",
  },
].map((product) => ({
  ...product,
  user_id: userId,
  image_urls: [],
}));

const { error: insertError } = await supabase
  .from("products")
  .insert(products);

if (insertError) {
  console.error("Failed to insert products:", insertError.message);
  process.exit(1);
}

console.log("Seed data inserted successfully.");
