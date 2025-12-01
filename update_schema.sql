-- Add missing columns to financial_applications
alter table financial_applications 
add column if not exists email text,
add column if not exists phone text,
add column if not exists urgency text,
add column if not exists monthly_income text,
add column if not exists expenses text,
add column if not exists situation text,
add column if not exists document_url text;

-- Add missing columns to work_applications
alter table work_applications 
add column if not exists email text,
add column if not exists phone text,
add column if not exists availability text,
add column if not exists work_type text,
add column if not exists education text,
add column if not exists goals text,
add column if not exists cv_url text;

-- Add missing columns to venture_applications
alter table venture_applications 
add column if not exists email text,
add column if not exists phone text,
add column if not exists industry text,
add column if not exists problem text,
add column if not exists solution text,
add column if not exists target_market text,
add column if not exists business_model text,
add column if not exists team_size text,
add column if not exists funding text,
add column if not exists timeline text,
add column if not exists support_needed text[];

-- Create a storage bucket for application files
insert into storage.buckets (id, name, public) 
values ('application-files', 'application-files', true)
on conflict (id) do nothing;

-- Set up storage policies
create policy "Public Access" 
on storage.objects for select 
using ( bucket_id = 'application-files' );

create policy "Public Upload" 
on storage.objects for insert 
with check ( bucket_id = 'application-files' );
