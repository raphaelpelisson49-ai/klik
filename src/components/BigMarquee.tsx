/** Cinta gigante en tipografía serif: una palabra rellena, la siguiente en contorno. */
export function BigMarquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items];

  return (
    <div className="klik-defer klik-big-marquee overflow-hidden py-6 sm:py-10" aria-hidden>
      <div className={`klik-big-marquee-track flex w-max items-center gap-10 ${reverse ? "klik-reverse" : ""}`}>
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span
              className={`font-serif text-5xl italic leading-none sm:text-7xl lg:text-8xl ${
                i % 2 === 0 ? "text-ivoire/90" : "klik-outline-text"
              }`}
            >
              {item}
            </span>
            <span className="h-3 w-3 rounded-full bg-champagne sm:h-4 sm:w-4" />
          </span>
        ))}
      </div>
    </div>
  );
}
