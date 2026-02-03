interface SectionTransitionProps {
  from: string;
  to: string;
  height?: string;
}

export function SectionTransition({ from, to, height = "h-16 md:h-24" }: SectionTransitionProps) {
  return (
    <div 
      className={`w-full ${height} pointer-events-none`}
      style={{
        background: `linear-gradient(to bottom, ${from}, ${to})`
      }}
    />
  );
}
