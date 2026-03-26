interface TimelineItem {
  title: string;
  body: string;
}

interface AboutJourneyProps {
  title?: string;
  subtitle?: string;
  timeline?: TimelineItem[];
}

export default function AboutJourney({ title, subtitle, timeline }: AboutJourneyProps) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-orange">
            {title}
          </p>
          <h2 className="mt-4 font-candara text-4xl font-bold text-brand-darkBlue">
            {subtitle}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {timeline?.map((item, index) => (
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
              <p className="mt-4 text-sm leading-7 text-brand-gray">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
