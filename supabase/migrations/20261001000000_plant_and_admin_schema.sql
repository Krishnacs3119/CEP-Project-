-- ====================================================================
-- PLANTPEDIA / PLANTINFO v2: DYNAMIC PLANT PROFILE & ADMIN SCHEMA
-- PostgreSQL / Supabase Migration
-- ====================================================================

-- 1. Enable Required Extensions
create extension if not exists "pg_trgm";
create extension if not exists "uuid-ossp";

-- 2. Categories Table
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  description text,
  created_at timestamptz default now()
);

-- 3. Plants Table (Includes all dynamic profile fields: type, region, oxygen_level, height, lifespan)
create table if not exists plants (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  common_name text not null,
  scientific_name text not null,
  type text not null default 'Tree',                      -- e.g. 'Tree', 'Shrub', 'Climber', 'Herb', 'Succulent'
  category_id uuid references categories(id) on delete set null,
  height text,                                            -- e.g. '15-20 m', '1-2 m'
  lifespan text,                                          -- e.g. '100-200 years', '10-20 years'
  oxygen_level text default 'High',                       -- 'High', 'Medium', 'Low'
  region text,                                            -- e.g. 'West Bengal, India / Tropical Asia'
  description text,                                       -- Detailed botanical description
  care_instructions text,                                 -- Care, soil, and watering advice
  image_url text,                                         -- Stored in Supabase Storage or CDN
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigram Indexes for Instant Fuzzy Search on Common & Scientific Names
create index if not exists plants_common_trgm on plants using gin (common_name gin_trgm_ops);
create index if not exists plants_sci_trgm on plants using gin (scientific_name gin_trgm_ops);
create index if not exists plants_slug_idx on plants (slug);
create index if not exists plants_category_idx on plants (category_id);
create index if not exists plants_published_idx on plants (is_published);

-- Auto-update updated_at timestamp trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_plants_updated_at on plants;
create trigger set_plants_updated_at
  before update on plants
  for each row
  execute function update_updated_at_column();

-- 4. Quotes Table (v1 feature parity)
create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  author text not null,
  created_at timestamptz default now()
);

-- 5. Site Settings Table (Singleton row id = 1 for dynamic contact & config)
create table if not exists site_settings (
  id int primary key default 1,
  contact_person text default 'Garden Administrator',
  phone text default '+91 98765 43210',
  address text default 'Botanical Research Garden, Campus Green Avenue',
  working_hours text default 'Mon - Sat: 8:00 AM - 6:00 PM',
  map_query text default 'Botanical Garden',
  footer_credit text default '© 2026 PlantInfo. All botanical rights reserved.',
  target_plant_count int default 150,
  constraint single_row_check check (id = 1)
);

-- Seed initial default settings if missing
insert into site_settings (id, contact_person, phone, address, working_hours, map_query, footer_credit, target_plant_count)
values (1, 'Campus Botanical Curator', '+91 98765 43210', 'Botanical Research Garden, Campus Green Avenue', 'Mon - Sat: 8:00 AM - 6:00 PM', 'Botanical Garden', '© 2026 PlantInfo. All botanical rights reserved.', 150)
on conflict (id) do nothing;

-- 6. Admins Table (references auth.users)
create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text default 'admin',
  created_at timestamptz default now()
);

-- 7. Row Level Security (RLS)
alter table categories enable row level security;
alter table plants enable row level security;
alter table quotes enable row level security;
alter table site_settings enable row level security;
alter table admins enable row level security;

-- Public Read Policies
create policy "Allow public read access to categories"
  on categories for select
  using (true);

create policy "Allow public read access to published plants"
  on plants for select
  using (is_published = true or auth.uid() in (select user_id from admins));

create policy "Allow public read access to quotes"
  on quotes for select
  using (true);

create policy "Allow public read access to site_settings"
  on site_settings for select
  using (true);

-- Admin Write Policies
create policy "Allow admins full access to categories"
  on categories for all
  using (auth.uid() in (select user_id from admins));

create policy "Allow admins full access to plants"
  on plants for all
  using (auth.uid() in (select user_id from admins));

create policy "Allow admins full access to quotes"
  on quotes for all
  using (auth.uid() in (select user_id from admins));

create policy "Allow admins full access to site_settings"
  on site_settings for all
  using (auth.uid() in (select user_id from admins));

create policy "Allow admins to view admin list"
  on admins for select
  using (auth.uid() in (select user_id from admins));
