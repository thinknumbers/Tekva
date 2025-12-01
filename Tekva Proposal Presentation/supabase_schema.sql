-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Financial Applications Table
create table financial_applications (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  family_size integer not null,
  support_type text not null,
  status text not null default 'pending',
  amount text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Work Applications Table
create table work_applications (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  skills text[] not null,
  experience text not null,
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Venture Applications Table
create table venture_applications (
  id uuid default uuid_generate_v4() primary key,
  founder_name text not null,
  venture_name text not null,
  stage text not null,
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table financial_applications enable row level security;
alter table work_applications enable row level security;
alter table venture_applications enable row level security;

-- Create policies to allow public access (for now, as per request for simple setup)
-- In a production app, you would restrict this to authenticated users.
create policy "Allow public read access" on financial_applications for select using (true);
create policy "Allow public insert access" on financial_applications for insert with check (true);
create policy "Allow public update access" on financial_applications for update using (true);

create policy "Allow public read access" on work_applications for select using (true);
create policy "Allow public insert access" on work_applications for insert with check (true);
create policy "Allow public update access" on work_applications for update using (true);

create policy "Allow public read access" on venture_applications for select using (true);
create policy "Allow public insert access" on venture_applications for insert with check (true);
create policy "Allow public update access" on venture_applications for update using (true);
