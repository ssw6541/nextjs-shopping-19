import { authenticate, deleteNotice, saveNotice, signOut } from "./coast-actions";
import { coastalRequest, currentAccount, type Notice } from "./coast";

const feedback: Record<string, string> = {
  invalid: "입력 내용을 다시 확인해주세요.",
  failed: "요청을 처리할 수 없습니다. 입력 정보를 확인하고 다시 시도해주세요.",
  verify: "가입 인증 메일의 링크를 연 뒤 로그인해주세요.",
};

function NoticeForm({ notice }: { notice?: Notice }) {
  return (
    <form action={saveNotice.bind(null, notice?.id ?? null)}>
      <label>제목<input name="title" required maxLength={120} defaultValue={notice?.title} /></label>
      <label>본문<textarea name="body" required maxLength={8000} defaultValue={notice?.body} /></label>
      <button type="submit">{notice ? "수정 저장" : "공지 등록"}</button>
    </form>
  );
}

function AccountForm({ mode }: { mode: "signin" | "signup" }) {
  return (
    <form action={authenticate.bind(null, mode)}>
      <label>이메일<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      <label>비밀번호<input name="password" type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={mode === "signup" ? 8 : 1} required /></label>
      <button type="submit">{mode === "signup" ? "회원가입" : "로그인"}</button>
    </form>
  );
}

export default async function Desk({ accountStatus, noticeStatus }: { accountStatus?: string; noticeStatus?: string }) {
  const [account, notices] = await Promise.all([
    currentAccount(),
    coastalRequest<Notice[]>("/rest/v1/coastal_notices?select=id,title,body,created_at&order=created_at.desc,id.desc").catch(() => null),
  ]);
  const date = new Intl.DateTimeFormat("ko-KR", { dateStyle: "long", timeZone: "Asia/Seoul" });
  return (
    <div className="desk wrap">
      <section id="notices">
        <h2>공지사항</h2>
        {noticeStatus && feedback[noticeStatus] && <p className="feedback" role="status">{feedback[noticeStatus]}</p>}
        {notices === null && <p>공지를 불러오지 못했습니다. 잠시 후 다시 확인해주세요.</p>}
        {notices?.length === 0 && <p>등록된 공지가 없습니다.</p>}
        {account?.admin && <details className="notice"><summary>새 공지 작성</summary><NoticeForm /></details>}
        {notices?.map((notice) => (
          <article className="notice" key={notice.id}>
            <details><summary>{notice.title}</summary><p>{notice.body}</p></details>
            <time dateTime={notice.created_at}>{date.format(new Date(notice.created_at))}</time>
            {account?.admin && <>
              <details><summary>수정</summary><NoticeForm notice={notice} /></details>
              <details><summary>삭제</summary><form action={deleteNotice.bind(null, notice.id)}><button className="danger">이 공지 삭제</button></form></details>
            </>}
          </article>
        ))}
      </section>
      <aside className="panel" id="account">
        <h2>계정</h2>
        {accountStatus && feedback[accountStatus] && <p role="status">{feedback[accountStatus]}</p>}
        {account ? <>
          <p>{account.user.email}</p>
          {account.admin && <p>공지 관리자</p>}
          <form action={signOut}><button className="secondary">로그아웃</button></form>
        </> : <>
          <AccountForm mode="signin" />
          <details open={accountStatus === "verify"}><summary>회원가입</summary><AccountForm mode="signup" /></details>
        </>}
      </aside>
    </div>
  );
}