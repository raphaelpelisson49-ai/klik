const SYMBOLS = [
  { left: "4%", top: "8%", size: "1.4rem", delay: "-1s", duration: "12s" },
  { left: "14%", top: "38%", size: "0.9rem", delay: "-6s", duration: "15s" },
  { left: "9%", top: "70%", size: "1.6rem", delay: "-3s", duration: "11s" },
  { left: "24%", top: "18%", size: "1rem", delay: "-9s", duration: "14s" },
  { left: "90%", top: "12%", size: "1.5rem", delay: "-4.5s", duration: "13s" },
  { left: "80%", top: "45%", size: "1.1rem", delay: "-11s", duration: "16s" },
  { left: "93%", top: "78%", size: "1.7rem", delay: "-7s", duration: "12s" },
  { left: "86%", top: "92%", size: "1rem", delay: "-2s", duration: "14s" },
  { left: "6%", top: "94%", size: "1.3rem", delay: "-8.5s", duration: "17s" },
  { left: "18%", top: "88%", size: "1.2rem", delay: "-5s", duration: "15s" },
];

export function MoneyBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="klik-aurora klik-aurora-a -left-24 -top-24 h-96 w-96" />
      <div className="klik-aurora klik-aurora-b -bottom-24 -right-16 h-[26rem] w-[26rem]" />
      {SYMBOLS.map((s, i) => (
        <span
          key={i}
          className="klik-float"
          style={{
            left: s.left,
            top: s.top,
            fontSize: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        >
          €
        </span>
      ))}
    </div>
  );
}
