-- Campus Marketplace schema
-- Enable extensions
create extension if not exists "uuid-ossp";

-- Profiles table linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  university_city text default 'Đà Lạt',
  major text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Products table
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  price numeric(12, 2) not null check (price >= 0),
  category text not null,
  status text not null check (status in ('available', 'reserved', 'sold')),
  university_city text not null,
  course_code text,
  description text,
  image_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_course_code_idx on public.products (course_code);
create index if not exists products_university_city_idx on public.products (university_city);
create index if not exists products_category_idx on public.products (category);
create index if not exists products_status_idx on public.products (status);

-- Messages table
create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists messages_product_idx on public.messages (product_id);
create index if not exists messages_sender_idx on public.messages (sender_id);
create index if not exists messages_receiver_idx on public.messages (receiver_id);

-- Auto-create profiles on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Optional: update updated_at on changes
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger products_set_updated_at
  before update on public.products
  for each row execute procedure public.set_updated_at();
