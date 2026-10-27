"use client";

export function Spotlight({
  children,
  className,
  tilt = 6,
}: {
  children: React.ReactNode;
  className?: string;
  /** Grados máximos de inclinación 3D al pasar el ratón (0 la desactiva). */
  tilt?: number;
}) {
  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const node = e.currentTarget;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    node.style.setProperty("--spot-x", `${x}px`);
    node.style.setProperty("--spot-y", `${y}px`);
    node.style.setProperty("--tilt-x", `${(0.5 - y / rect.height) * tilt}deg`);
    node.style.setProperty("--tilt-y", `${(x / rect.width - 0.5) * tilt}deg`);
  }

  function handleLeave(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.setProperty("--tilt-x", "0deg");
    e.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div onMouseMove={handleMove} onMouseLeave={handleLeave} className={`klik-spotlight klik-tilt ${className ?? ""}`}>
      {children}
    </div>
  );
}
