interface StatProps {
  value: string;
  label: string;
}

export default function Stat({ value, label }: StatProps) {
  return (
    <div className="flex flex-col items-center justify-center py-2 text-center">
      <span className="heading-font text-4xl font-semibold text-text">
        {value}
      </span>

      <span className="mt-2 text-sm tracking-wide text-text-muted">
        {label}
      </span>
    </div>
  );
}