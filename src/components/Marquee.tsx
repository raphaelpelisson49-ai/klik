export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-champagne/10 bg-grafito/50 py-3" aria-hidden>
      <div className="klik-marquee-track flex w-max gap-10">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-sans text-xs font-medium uppercase tracking-[0.2em] text-piedra"
          >
            {item}
            <span className="text-champagne">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
