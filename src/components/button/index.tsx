type ButtonKind = "primary" | "default"

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string
  kind?: ButtonKind
}

export default function Button(props: ButtonProps) {
  const { kind = "default" } = props

  const styles: Record<ButtonKind, string> = {
    primary: "border-primary bg-primary/10 text-primary",
    default: "bg-white py-[9px]",
  }

  return (
    <div {...props} className={`px-[20px] rounded border border-border/10 cursor-pointer shadow ${styles[kind]} ${props.className}`}>
      <p className="font-semibold">{props.children}</p>
    </div>
  )
}