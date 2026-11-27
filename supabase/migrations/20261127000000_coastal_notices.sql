begin;

create table public.coastal_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.coastal_admins enable row level security;
revoke all on public.coastal_admins from anon, authenticated;

create function public.coastal_is_admin()
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select exists (select 1 from public.coastal_admins where user_id = (select auth.uid()));
$$;

revoke all on function public.coastal_is_admin() from public;
grant execute on function public.coastal_is_admin() to authenticated;

create table public.coastal_notices (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(btrim(title)) between 1 and 120),
  body text not null check (char_length(btrim(body)) between 1 and 8000),
  created_at timestamptz not null default now()
);

alter table public.coastal_notices enable row level security;
revoke all on public.coastal_notices from anon, authenticated;
grant select on public.coastal_notices to anon, authenticated;
grant insert (title, body), update (title, body), delete on public.coastal_notices to authenticated;

create policy "Read public notices" on public.coastal_notices
  for select to anon, authenticated using (true);
create policy "Admins insert notices" on public.coastal_notices
  for insert to authenticated with check ((select public.coastal_is_admin()));
create policy "Admins update notices" on public.coastal_notices
  for update to authenticated using ((select public.coastal_is_admin()))
  with check ((select public.coastal_is_admin()));
create policy "Admins delete notices" on public.coastal_notices
  for delete to authenticated using ((select public.coastal_is_admin()));

commit;