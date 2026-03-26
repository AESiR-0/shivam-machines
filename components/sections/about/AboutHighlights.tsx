interface Highlight {
  value: string;
  label: string;
}

interface AboutHighlightsProps {
  highlights?: Highlight[];
  industrialFocus?: string;
}

export default function AboutHighlights({ highlights, industrialFocus }: AboutHighlightsProps) {
  return (
    <div className="relative">
      <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(0,43,79,0.12)] backdrop-blur">
        <div className="rounded-[1.5rem] bg-brand-darkBlue px-6 py-6 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-white/65">
            Why Clients Return
          </p>
          <div className="mt-6 grid gap-4">
            {highlights?.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4"
              >
                <div className="text-3xl font-bold font-candara">
                  {item.value}
                </div>
                <div className="mt-1 text-sm text-white/80">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {industrialFocus && (
          <div className="mt-5 rounded-[1.5rem] border border-brand-darkBlue/10 bg-[#f8fbff] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
              Industrial Focus
            </div>
            <p className="mt-3 text-sm leading-7 text-brand-gray">
              {industrialFocus}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
