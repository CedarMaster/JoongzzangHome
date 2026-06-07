-- ============================================================
-- 백향재 (柏香齋) Supabase 스키마 v2
-- Supabase 대시보드 > SQL Editor에서 전체 실행하세요.
-- ============================================================

-- ============================================================
-- 1. 테이블 생성
-- ============================================================

-- users: auth.users와 1:1 연동되는 프로필 테이블
CREATE TABLE IF NOT EXISTS public.users (
  id            UUID        REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email         TEXT        NOT NULL,
  display_name  TEXT,
  role          TEXT        NOT NULL DEFAULT 'subscriber'
                            CHECK (role IN ('visitor', 'subscriber', 'participant', 'member', 'admin')),
  is_approved   BOOLEAN     NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- contents: 듣다 / 읽다 콘텐츠
CREATE TABLE IF NOT EXISTS public.contents (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  menu_type     TEXT        NOT NULL CHECK (menu_type IN ('듣다', '읽다')),
  title         TEXT        NOT NULL,
  text_body     TEXT,
  media_url     TEXT,
  tags          TEXT[],
  access_level  TEXT        NOT NULL DEFAULT 'public'
                            CHECK (access_level IN ('public', 'subscriber', 'participant', 'member')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- programs: 배우다 — 프로그램/강의
CREATE TABLE IF NOT EXISTS public.programs (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT        NOT NULL,
  type          TEXT        NOT NULL
                            CHECK (type IN ('온라인', '오프라인', '부모교육', '진로상담', '강사교수자', '기관의뢰')),
  price         INTEGER     NOT NULL DEFAULT 0,
  status        TEXT        NOT NULL DEFAULT 'upcoming'
                            CHECK (status IN ('open', 'closed', 'upcoming')),
  description   TEXT,
  thumbnail_url TEXT,
  duration      TEXT,
  participants  TEXT,
  location      TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- books_outlinks: 알아가다 — 백향재의 서재
CREATE TABLE IF NOT EXISTS public.books_outlinks (
  id                   UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  book_title           TEXT        NOT NULL,
  subtitle             TEXT,
  cover_image_url      TEXT,
  purchase_url_kyobo   TEXT,
  purchase_url_yes24   TEXT,
  quote_text           TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- inquiries: 문의하기
CREATE TABLE IF NOT EXISTS public.inquiries (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  type          TEXT        NOT NULL DEFAULT 'general',
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  organization  TEXT,
  message       TEXT        NOT NULL,
  is_read       BOOLEAN     NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- site_settings: 관리자 편집 가능한 사이트 설정
CREATE TABLE IF NOT EXISTS public.site_settings (
  key         TEXT        PRIMARY KEY,
  value       TEXT        NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 기본 설정값 삽입
INSERT INTO public.site_settings (key, value) VALUES
  ('hero_copy',      '천천히, 그러나 방향은 정확하게.'),
  ('today_sentence', '배움은 목적지가 아니라 걷는 방식입니다.')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- 2. 신규 가입 자동 프로필 생성 트리거
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role, is_approved)
  VALUES (NEW.id, NEW.email, 'subscriber', false)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 3. RLS 활성화
-- ============================================================

ALTER TABLE public.users           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contents        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books_outlinks  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings   ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 4. RLS 정책
-- ============================================================

-- ── users ──────────────────────────────────────────────────
-- 본인 프로필 읽기
CREATE POLICY "users_self_read" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- 본인 display_name 수정
CREATE POLICY "users_self_update" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- 관리자 전체 접근
CREATE POLICY "users_admin_all" ON public.users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ── contents ───────────────────────────────────────────────
-- 비로그인도 public 콘텐츠 읽기 가능
CREATE POLICY "contents_public_read" ON public.contents
  FOR SELECT USING (access_level = 'public');

-- 로그인 사용자는 subscriber 콘텐츠까지 읽기 가능
CREATE POLICY "contents_subscriber_read" ON public.contents
  FOR SELECT USING (
    auth.uid() IS NOT NULL
    AND access_level IN ('public', 'subscriber')
  );

-- 승인된 participant/member/admin은 participant 콘텐츠까지
CREATE POLICY "contents_participant_read" ON public.contents
  FOR SELECT USING (
    access_level IN ('public', 'subscriber', 'participant')
    AND EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid()
        AND u.role IN ('participant', 'member', 'admin')
        AND u.is_approved = true
    )
  );

-- 관리자 쓰기
CREATE POLICY "contents_admin_write" ON public.contents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ── programs ───────────────────────────────────────────────
CREATE POLICY "programs_public_read" ON public.programs
  FOR SELECT USING (true);

CREATE POLICY "programs_admin_write" ON public.programs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ── books_outlinks ─────────────────────────────────────────
CREATE POLICY "books_public_read" ON public.books_outlinks
  FOR SELECT USING (true);

CREATE POLICY "books_admin_write" ON public.books_outlinks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ── inquiries ──────────────────────────────────────────────
-- 누구나 문의 등록 가능
CREATE POLICY "inquiries_public_insert" ON public.inquiries
  FOR INSERT WITH CHECK (true);

-- 관리자만 조회/수정
CREATE POLICY "inquiries_admin_read" ON public.inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

CREATE POLICY "inquiries_admin_update" ON public.inquiries
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ── site_settings ──────────────────────────────────────────
CREATE POLICY "settings_public_read" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "settings_admin_write" ON public.site_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );
