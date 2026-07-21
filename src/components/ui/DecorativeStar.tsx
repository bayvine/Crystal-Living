const spokeClasses = ["rotate-0", "rotate-45", "rotate-90", "rotate-[135deg]"] as const;

export default function DecorativeStar({ className = "" }: { className?: string }) {
  return (
    <span className={`relative block text-highlight-lavender ${className}`} aria-hidden="true">
      {spokeClasses.map((rotation) => (
        <span
          className={`absolute top-[calc(50%-var(--star-stroke,0.18rem)/2)] left-0 h-[var(--star-stroke,0.18rem)] w-full rounded-full bg-current ${rotation}`}
          key={rotation}
        />
      ))}
    </span>
  );
}
