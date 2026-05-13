-- Migration 018: Gamified profile identity and tarot archetype avatars
-- Depends on: 004_app_user_profiles.sql, 014_gamification.sql

alter table public.app_user_profiles
  add column if not exists avatar_key text,
  add column if not exists archetype_key text,
  add column if not exists archetype_name text,
  add column if not exists archetype_title text,
  add column if not exists personal_mission text,
  add column if not exists profile_title text,
  add column if not exists identity_color text,
  add column if not exists identity_motto text;

alter table public.app_user_profiles
  drop constraint if exists app_user_profiles_avatar_key_check,
  add constraint app_user_profiles_avatar_key_check
    check (avatar_key is null or avatar_key in (
      'fool','magician','priestess','empress','emperor','hierophant','lovers','chariot',
      'strength','hermit','wheel','justice','hanged','death','temperance','star'
    ));

alter table public.app_user_profiles
  drop constraint if exists app_user_profiles_archetype_key_check,
  add constraint app_user_profiles_archetype_key_check
    check (archetype_key is null or archetype_key in (
      'fool','magician','priestess','empress','emperor','hierophant','lovers','chariot',
      'strength','hermit','wheel','justice','hanged','death','temperance','star'
    ));

create index if not exists app_user_profiles_archetype_idx
  on public.app_user_profiles(archetype_key);

create or replace view public.v_profile_identity_summary as
select
  p.user_id,
  p.email,
  p.full_name,
  p.nickname,
  p.phone,
  p.avatar_url,
  p.avatar_key,
  p.archetype_key,
  p.archetype_name,
  p.archetype_title,
  p.profile_title,
  p.personal_mission,
  p.identity_color,
  p.identity_motto,
  p.onboarded,
  p.onboarding_step,
  coalesce(sum(las.total_xp), 0) as total_xp,
  coalesce(max(las.level), 1) as highest_level,
  coalesce(avg(las.score), 0) as average_life_score,
  count(ua.id) filter (where ua.unlocked_at is not null) as achievements_unlocked
from public.app_user_profiles p
left join public.life_area_scores las on las.user_id = p.user_id
left join public.user_achievements ua on ua.user_id = p.user_id
group by p.user_id;
