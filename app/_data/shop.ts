export type Product = { name: string; original: string; sale: string; image: string };

export const navItems = [
  "대게·킹크랩·게",
  "랍스터·새우",
  "수산물",
  "농산물",
  "선물세트",
  "후기",
];

export const utilityLinks = [
  "로그인",
  "회원가입",
  "장바구니 0",
  "주문·배송 조회",
  "관심상품",
  "최근 본 상품",
  "공지사항",
  "카카오톡 상담",
  "마일리지",
];

export const categories = [
  "러시아 활대게",
  "레드 킹크랩",
  "박달홍게",
  "캐나다 활 랍스터",
  "제철 활꽃게",
  "새우",
];

// 카테고리 타일 이미지 (categories와 같은 순서)
export const categoryImages = ["crab-platter", "king-crab", "red-crab", "lobster-live", "blue-crab", "shrimp-raw"];

const TBD = "00,000원";

export const products: Product[] = [
  { name: "[바다곳간] 러시아 자숙대게 특A급 수율보장 선어 꼬물이", original: "50,000원", sale: "33,800원", image: "crab-ice" },
  { name: "[바다곳간] 활 자숙 레드 킹크랩 3KG 내외 특A급 프리미엄 수율보장 사계절 러시아 킹크랩", original: "350,000원", sale: "215,800원", image: "king-crab" },
  { name: "바다곳간 국산 포항 대게 3미 5미", original: "48,050원", sale: "37,500원", image: "crab-plate" },
  { name: "[바다곳간 pick's] 진도 프리미엄 활 전복 1kg", original: "30,900원", sale: "25,100원", image: "abalone" },
  { name: "노바시 새우", original: TBD, sale: TBD, image: "shrimp-cooked" },
  { name: "손질 칵테일새우", original: TBD, sale: TBD, image: "shrimp-cocktail" },
  { name: "제주 고등어 순살필렛", original: TBD, sale: TBD, image: "mackerel" },
  { name: "영광법성포 참굴비", original: TBD, sale: TBD, image: "croaker" },
  { name: "흑산도 홍어", original: TBD, sale: TBD, image: "skate" },
  { name: "냉동 해물모듬 5종", original: TBD, sale: TBD, image: "seafood" },
  { name: "상품명", original: TBD, sale: TBD, image: "blue-crab" },
  { name: "상품명", original: TBD, sale: TBD, image: "lobster-claws" },
];

export const company = {
  name: "바다곳간",
  // 사업자 정보는 실제 값으로 교체 필요 (임시값)
  info: [
    "상호명  |  대표자명",
    "사업자등록번호 000-00-00000  |  통신판매업 신고번호 0000-지역-0000",
    "주소 (사업장 주소 입력)",
    "개인정보보호책임자 (이름)  |  호스팅 (업체명)",
  ],
  support: ["고객센터 000-0000-0000", "평일 00:00 ~ 00:00", "공지사항", "카카오톡 상담"],
  policies: ["회사소개", "이용약관", "개인정보처리방침", "이용안내"],
  sns: ["인스타그램", "블로그", "카카오톡"],
};
