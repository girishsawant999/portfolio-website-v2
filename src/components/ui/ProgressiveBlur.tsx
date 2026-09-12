/**
 * A single backdrop-blur layer faded out via a mask gradient (strong at the
 * top, none at the bottom) plus a matching background-color gradient — a
 * "frosted glass" effect for sticky bars sitting over scrolling content.
 */
export default function ProgressiveBlur({ className = "" }: { className?: string }) {
  const mask = "linear-gradient(to top, transparent, black 55%)";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
    >
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-background/50 to-background/90" />
    </div>
  );
}
