interface DividerProps {
  className?: string;
}

export default function Divider({ className = "" }: DividerProps) {
  return <hr className={`border-t border-border ${className}`} />;
}
