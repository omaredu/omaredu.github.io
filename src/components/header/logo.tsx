interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Logo(props: LogoProps) {
  return (
    <div {...props} className={`p-[15px] bg-primary rounded-b-sm ${props.className}`}>
      <img src="/logo.svg" alt="Omaredu logo" />
    </div>
  )
}