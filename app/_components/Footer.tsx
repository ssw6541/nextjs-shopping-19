import Link from "next/link";
import { company, navItems } from "../_data/shop";

function Column({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-bold leading-[26px]">{title}</h3>
      {lines.map((l) => (
        <p key={l} className="text-xs leading-4 text-secondary">{l}</p>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-subtle py-8 md:py-16">
      <div className="mx-auto max-w-[1200px] px-4 xl:px-0">
        <div className="grid gap-6 md:grid-cols-[1fr_240px_240px] md:gap-16">
          <Column title={company.name} lines={company.info} />
          <Column title="고객지원" lines={company.support} />
          <div className="hidden md:block">
            <Column title="수산물·선물" lines={navItems.slice(0, 5)} />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4 md:mt-8 md:flex-row md:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-secondary">
            {company.policies.map((p) => (
              <a key={p} href="#">{p}</a>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-secondary">
            {company.sns.map((s) => (
              <a key={s} href="#">{s}</a>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs text-tertiary">
          Copyright © 바다곳간. All Rights Reserved. ·{" "}
          <Link href="/credits" className="underline">이미지 출처</Link>
        </p>
      </div>
    </footer>
  );
}
