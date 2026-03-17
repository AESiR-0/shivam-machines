import AboutSection from "@/components/sections/about-section";
import { companyInfo } from "@/lib/company";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  PhoneCall,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    value: "1997",
    label: "Serving Indian industry since",
  },
  {
    value: "25+",
    label: "Years of machine tool experience",
  },
  {
    value: "Pan India",
    label: "Customer support and supply network",
  },
];

const strengths = [
  {
    title: "Curated machine sourcing",
    description:
      "We source dependable used machine tools with a practical focus on performance, condition, and long-term value.",
    icon: Globe2,
  },
  {
    title: "Inspection-led quality",
    description:
      "Every machine is reviewed with a quality-first mindset so buyers get clarity before making a decision.",
    icon: ShieldCheck,
  },
  {
    title: "Application guidance",
    description:
      "We help customers match machine capability to production needs, floor reality, and budget constraints.",
    icon: Settings2,
  },
];

const timeline = [
  {
    title: "Started with trust",
    body:
      "Shivam Enterprise was built around a simple promise: offer reliable used industrial machinery with honest guidance and fair pricing.",
  },
  {
    title: "Expanded through relationships",
    body:
      "Over the years, repeat buyers, referrals, and long-term partnerships helped us grow into a trusted name in machine tools.",
  },
  {
    title: "Focused on practical value",
    body:
      "Today we continue to support manufacturers looking for capable machines, transparent advice, and responsive service.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#f5f7fa]">

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(0,107,179,0.18),_transparent_28%),linear-gradient(135deg,_#f8fbfd_0%,_#edf3f8_48%,_#ffffff_100%)]">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-16 right-[-8rem] h-72 w-72 rounded-full bg-brand-darkBlue/10 blur-3xl" />
          <div className="absolute bottom-0 left-[-6rem] h-64 w-64 rounded-full bg-brand-orange/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-darkBlue/10 bg-white/75 px-4 py-2 text-sm font-semibold text-brand-darkBlue shadow-sm backdrop-blur">
              <BadgeCheck className="h-4 w-4" />
              Trusted industrial machinery partner
            </div>

            <h1 className="max-w-4xl font-candara text-5xl font-bold leading-tight text-brand-darkBlue sm:text-6xl">
              Built on machine knowledge, long-term trust, and practical industrial support.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-brand-gray">
              {companyInfo.name} has been serving Indian manufacturers since 1997 with dependable
              used machine tools, direct advice, and a clear focus on value. We help businesses
              buy with confidence, whether they need a listed machine or want us to source one
              specifically for their production needs.
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
            <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(0,43,79,0.12)] backdrop-blur">
              <div className="rounded-[1.5rem] bg-brand-darkBlue px-6 py-6 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-white/65">Why Clients Return</p>
                <div className="mt-6 grid gap-4">
                  {highlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4"
                    >
                      <div className="text-3xl font-bold font-candara">{item.value}</div>
                      <div className="mt-1 text-sm text-white/80">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-brand-darkBlue/10 bg-[#f8fbff] p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
                  Industrial Focus
                </div>
                <p className="mt-3 text-sm leading-7 text-brand-gray">
                  Horizontal borers, vertical lathes, grinders, milling machines, radial drills,
                  gear machinery, roll grinders, and other industrial equipment selected for
                  practical production use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-orange">
              Our Journey
            </p>
            <h2 className="mt-4 font-candara text-4xl font-bold text-brand-darkBlue">
              A business shaped by continuity, expertise, and customer confidence.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {timeline.map((item, index) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-[2rem] border border-brand-darkBlue/10 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fbfd_100%)] p-7 shadow-sm"
              >
                <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-darkBlue text-sm font-bold text-white">
                  0{index + 1}
                </div>
                <h3 className="font-candara text-2xl font-bold text-brand-darkBlue">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-brand-gray">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutSection />
    </main>
  );
}
