import { BadgeCheck, ArrowRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import { companyInfo } from "@/lib/company";

interface AboutHeroProps {
  badge?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function AboutHero({ badge, title, description, children }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(0,107,179,0.18),_transparent_28%),linear-gradient(135deg,_#f8fbfd_0%,_#edf3f8_48%,_#ffffff_100%)]">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-16 right-[-8rem] h-72 w-72 rounded-full bg-brand-darkBlue/10 blur-3xl" />
        <div className="absolute bottom-0 left-[-6rem] h-64 w-64 rounded-full bg-brand-orange/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
        <div>
          {badge && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-darkBlue/10 bg-white/75 px-4 py-2 text-sm font-semibold text-brand-darkBlue shadow-sm backdrop-blur">
              <BadgeCheck className="h-4 w-4" />
              {badge}
            </div>
          )}

          <h1 className="max-w-4xl font-candara text-5xl font-bold leading-tight text-brand-darkBlue sm:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-brand-gray">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-darkBlue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-darkBlue/20 transition hover:bg-brand-darkBlue/90"
            >
              Explore Machines
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={companyInfo.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-darkBlue/15 bg-white px-6 py-3 text-sm font-semibold text-brand-darkBlue transition hover:border-brand-darkBlue/30 hover:bg-brand-lightGray"
            >
              <PhoneCall className="h-4 w-4" />
              Talk to Our Team
            </a>
          </div>
        </div>

        <div className="relative">
          {children}
        </div>
      </div>
    </section>
  );
}
