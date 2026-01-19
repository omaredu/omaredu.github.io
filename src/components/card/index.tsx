export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Card(props: CardProps) {
  return (
    <div
      {...props}
      className={`border border-border/10 rounded p-[15px] pr-[20px] shadow ${props.className}`}
    >
      {props.children}
    </div>
  );
}
