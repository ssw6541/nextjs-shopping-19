import Image from "next/image";
import type { ReactNode } from "react";

export function Photo({
  name,
  alt,
  className = "",
  sizes = "(min-width: 768px) 25vw, 50vw",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
      <Image
        src={`/images/${name}.jpg`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

const buttonBase =
  "inline-flex h-14 items-center justify-center rounded-lg px-8 text-base font-medium transition-opacity hover:opacity-80";
const buttonVariants = {
  primary: "bg-brand text-white",
  outline: "border border-line-strong text-ink",
  white: "bg-white text-brand",
};

export function Button({
  children,
  variant = "primary",
  href = "#",
  className = "",
}: {
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  href?: string;
  className?: string;
}) {
  return (
    <a href={href} className={`${buttonBase} ${buttonVariants[variant]} ${className}`}>
      {children}
    </a>
  );
}

export function CategoryTag({ children }: { children: ReactNode }) {
  return (
    <a
      href="#"
      className="rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-secondary"
    >
      {children}
    </a>
  );
}

export function Section({
  bg = "bg-white",
  children,
  id,
}: {
  bg?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={`${bg} py-12 md:py-24`}>
      <div className="mx-auto max-w-[1200px] px-4 xl:px-0">{children}</div>
    </section>
  );
}

export function SectionTitle({
  children,
  sub,
  tone = "dark",
}: {
  children: ReactNode;
  sub?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className="mb-6 text-center md:mb-12">
      <h2
        className={`whitespace-pre-line text-2xl font-bold leading-[34px] md:text-4xl md:leading-[48px] ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        {children}
      </h2>
      {sub && <p className="mt-2 text-base text-secondary md:text-lg">{sub}</p>}
    </div>
  );
}
