-- ============================================================
-- 백향재 Supabase 추가 스키마
-- Supabase 대시보드 > SQL Editor에서 실행하세요.
-- ============================================================

-- ── 1. users 테이블 display_name 인덱스 (마이페이지 성능) ──
CREATE INDEX IF NOT EXISTS idx_users_id ON public.users (id);

-- ── 2. bio 테이블 (백향지기 소개 — 관리자 편집 가능) ──
CREATE TABLE IF NOT EXISTS public.bio (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL DEFAULT '조중현',
  title       TEXT        DEFAULT '교육학 박사 · 4MAT 전문 강사 · 진로·상담 교육 전문가',
  summary     TEXT,
  career      JSONB       DEFAULT '[]',
  expertise   TEXT[]      DEFAULT '{}',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 기본 데이터 삽입
INSERT INTO public.bio (name, title, summary, career, expertise) VALUES (
  '조중현',
  '교육학 박사 · 4MAT 전문 강사 · 진로·상담 교육 전문가',
  '교육학과 진로 상담, 뇌기반 학습을 바탕으로 학생·부모·교사·교수자와 함께 성장의 길을 걸어왔습니다. 강의실 안팎에서 만난 수많은 사람들의 이야기가 백향재의 씨앗이 되었습니다.',
  '[
    {"period": "現재", "role": "백향재 대표·운영자", "desc": "배움의 공간 백향재 설립 및 운영. 4MAT 기반 진로·부모·교수자 교육 프로그램 개발 및 진행."},
    {"period": "現재", "role": "대학 교수 (교육학)", "desc": "교육학·진로상담 관련 강의. 뇌기반 학습, 학습 스타일, 교수 설계 분야 연구."},
    {"period": "20년+", "role": "4MAT 전문 강사·컨설턴트", "desc": "4MAT Learning System 국내 전문 강사. 기업·교육기관·정부기관 대상 교수 설계 워크숍 진행."},
    {"period": "다수", "role": "저서·워크북 집필", "desc": "자기탐색 컬러링북 『나를 물들이는 시간』 외 진로·상담 관련 교재 집필."},
    {"period": "박사", "role": "교육학 박사", "desc": "교육학(진로상담·교수설계) 전공. 뇌기반 학습 및 4MAT 시스템 심층 연구."}
  ]'::jsonb,
  ARRAY['4MAT 러닝 시스템', '진로 탐색 교육', '부모교육', '뇌기반 상담', '강사·교수자 역량', '자기이해 워크북']
) ON CONFLICT DO NOTHING;

-- RLS 활성화
ALTER TABLE public.bio ENABLE ROW LEVEL SECURITY;

-- 공개 읽기
CREATE POLICY "bio_public_read" ON public.bio
  FOR SELECT USING (true);

-- 관리자 쓰기
CREATE POLICY "bio_admin_write" ON public.bio
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ── 3. site_settings 에 bio 관련 키 추가 ──
INSERT INTO public.site_settings (key, value) VALUES
  ('bio_photo_url', ''),
  ('brand_hero_image', 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1920&q=85')
ON CONFLICT (key) DO NOTHING;
