import Card from "@components/card";

export interface SocialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string
  title: string
  domain: string
  url: string
  alt?: string
}

export default function SocialCard(props: SocialCardProps) {
  return (
    <a target="_blank" href={props.url}>
      <Card className="flex flex-col gap-[10px] w-[150px]">
        <img src={props.icon} className="rounded h-[40px] w-[40px]" alt={props.alt} />
        <div className="flex flex-col gap-[3px]">
          <p className="font-semibold">{props.title}</p>
          <p className="text-sm text-secondary">{props.domain}</p>
        </div>
      </Card>
    </a>
  )
}