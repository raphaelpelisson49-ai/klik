"use client";

export function Spotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const node = e.currentTarget;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div onMouseMove={handleMove} className={`klik-spotlight ${className ?? ""}`}>
      {children}
    </div>
  );
}
