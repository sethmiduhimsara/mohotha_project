interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </p>
      )}

      <h2 className="heading-font text-4xl font-semibold leading-tight text-text md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-text-muted">
          {description}
        </p>
      )}
    </div>
  );
}