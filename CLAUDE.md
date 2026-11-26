# homeshopping-19

Figma를 이용한 홈쇼핑 디자인 프로젝트.

## 리브랜딩 (코드 반영 완료, Figma 미반영)
- 브랜드명: **바다곳간** (참조 사이트의 "킹콩농수산"에서 변경)
- 색상: brand `#0b2f4a`(딥 네이비, 버튼·배너), accent `#e8553f`(코랄), ink `#10222f`, secondary `#4b5f6e`, tertiary `#8a9aa6`, subtle `#f1f6f9`, muted `#e9f0f4`, line `#dce6ec`, line-strong `#c4d3dd`, accent-light `#ffc9bd` (`app/globals.css`)
- 푸터 사업자 정보(상호, 사업자번호, 주소, 전화)는 참조 회사의 실제 정보라 임시값으로 교체함 → 실제 값으로 채울 것 (`app/_data/shop.ts`)
- **Figma 파일은 아직 옛 브랜드(킹콩농수산, 레드/블랙)**: MCP 한도가 풀리면 Color 변수 값과 텍스트를 위 값으로 교체해야 함
- 아래 "참조 사이트 분석"의 색상·이름은 원본 사이트 기준이며 현재 디자인과 다르다

## 작업 방침 (확정)
- 참조: https://xn--980b200a34at34a8qb.com/ (킹콩농수산, Cafe24 갑각류 쇼핑몰)
- 참조 사이트의 구조·색상·섹션 순서를 **그대로** 따라 Figma에서 UI 제작
- 대상 화면: **PC + 모바일 둘 다** (메인 페이지부터)
- 세부 조정은 사용자가 차후 직접 한다. 임의로 재해석·창작하지 말 것.

## Figma 연동
- `.mcp.json`에 Figma MCP 서버 2종 등록
  - `figma`: 원격 서버 (https://mcp.figma.com/mcp), 최초 사용 시 `/mcp`에서 OAuth 로그인 필요
  - `figma-desktop`: 데스크톱 앱 로컬 서버 (http://127.0.0.1:3845/mcp), 앱 Dev Mode에서 MCP 서버를 켜야 동작
- Figma 파일 URL 또는 새 파일을 만들 team 정보가 필요하다.

## Figma 작업 현황
- 파일: https://www.figma.com/design/f4AWORVZG4Y5IgctLRmxTf (homeshopping-19, 페이지 "홈쇼핑 메인")
- 변수: Color / Spacing / Radius 컬렉션, 텍스트 스타일 14종 (Noto Sans KR — Pretendard는 Figma에 없어 대체, 추후 교체)
- 컴포넌트(Components 보드): Button/Primary, Button/Outline, Tag/Category, Card/Product, Card/Product Mobile
- 프레임: `PC / 메인 (1440)` (노드 4:2), `Mobile / 메인 (390)` (노드 5:84)
- 이미지는 회색 자리표시자, 상품 가격 중 `00,000원`과 `상품명`은 임시값
- 미확인: 모바일 상품 카드를 Card/Product Mobile(이미지 164px)로 교체한 결과 (MCP 호출 한도에 걸려 검증 못 함)
- Figma MCP는 Starter 플랜 호출 한도가 있음 (한도 도달 시 대기 또는 플랜 업그레이드)

## Next.js 구현 (Figma 디자인 → 코드)
- `app/page.tsx`가 섹션 컴포넌트(`app/_components/`)를 조합, 데이터는 `app/_data/shop.ts`
- 색상 토큰은 `app/globals.css`의 `@theme`에 Figma 변수와 같은 값으로 정의 (`text-ink`, `bg-subtle`, `text-accent` 등)
- PC/모바일은 하나의 반응형 구현 (`md:` 768px 기준), 폰트는 `next/font/google`의 Noto Sans KR
- 이 Next.js(16.4)는 기존 지식과 다르므로 코드 작성 전 `node_modules/next/dist/docs/` 확인 (AGENTS.md)
- 확인: `npm run lint`, `npm run build` 통과, Edge 헤드리스로 PC/모바일 화면 확인
- 이미지: `public/images/*.jpg` 26장 (Wikimedia Commons, CC0/퍼블릭 도메인/CC BY/CC BY-SA). 출처·작가·라이선스는 `app/_data/credits.ts`, 공개 표기는 `/credits` 페이지와 푸터 링크. CC BY(-SA) 이미지를 쓰는 한 이 표기를 지우지 말 것
- 이미지 교체는 `app/_data/shop.ts`의 `image` 필드/`categoryImages`와 `Sections.tsx`의 파일명만 바꾸면 됨 (`<Photo name="파일명(확장자 제외)">`)
- Figma 파일의 이미지는 아직 회색 자리표시자 (코드에만 사진 적용됨)

## 참조 사이트 분석 (요약 기반이라 치수는 미확인)
**헤더**: 상단 카카오톡 특가 알림 띠배너("특가 뜨면 카톡이 울려요· 갑각류 비밀창고로 모십니다") / 로고 킹콩농수산 / 메뉴: 대게·킹크랩·게, 랍스터·새우, 수산물, 농산물, 선물세트, 후기 / 유틸: 로그인, 회원가입, 장바구니(0), 주문·배송 조회, 관심상품, 최근 본 상품, 공지사항, 카카오톡 상담, 마일리지

**섹션 순서**
1. 히어로: 헤드라인 `대게 킹크랩은 "킹콩."`, 서브카피(러시아 직송 활대게·킹크랩, 점장이 매일 아침 선별), 버튼 [대게 구매하기] [전체 품목 보기], 이미지(자숙 대게)
2. 상품 라인업(#r2-lineup): 카테고리 태그(러시아 활대게 / 레드 킹크랩 / 박달홍게 / 캐나다 활 랍스터 / 제철 활꽃게 / 새우) + 상품 카드 그리드(약 21개)
3. 콘텐츠 섹션(제목): 게부터 랍스터까지. / 골라만 주세요. / 활로 받을까, 쪄서 받을까. / 고르는 사람이 다릅니다. / 고르는 사람들(아침마다 게부터 고르는 점장님들.) / 먼저 받아본 분들.(후기) / 갑각류 말고도. / 명단만 주시면, 여러 곳에 나눠 보내요. / 대게 킹크랩은 킹콩.
4. 푸터

**상품 카드**: 이미지 / 상품명 / 정가(취소선) / 판매가 / 보조 숫자(후기수 추정)
예: [킹콩농수산] 러시아 자숙대게 특A급 수율보장 선어 꼬물이 50,000 → 33,800원 / 활 자숙 레드 킹크랩 3KG 350,000 → 215,800원 / 국산 포항 대게 3미 5미 48,050 → 37,500원 / 진도 프리미엄 활 전복 1kg 30,900 → 25,100원

**푸터**: 주식회사 킹콩에프앤비, 대표 권종철, 사업자등록번호 437-86-02558, 통신판매업 2025-화성동탄-0386, 주소 경기 화성시 동탄기흥로 594-7 1214·1215호, 개인정보보호책임자 김연수, 호스팅 Cafe24, 고객센터 031-8043-2244(평일 10:30~17:30), 링크: 회사소개/이용약관/개인정보처리방침/이용안내, SNS: 인스타그램/블로그/카카오톡, Copyright © 킹콩농수산

**색상**: #000000, #1d1d1f(본문) / #555555, #999999(보조) / #f5f5f7, #f2f2f4, #e8e8ed, #d2d2d7(배경·라인) / #C23422(포인트 레드) / #ffb4a8
**폰트**: Pretendard(Variable), DM Sans, Noto Sans KR
