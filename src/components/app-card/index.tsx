import Card from "@components/card";

export interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  name: string;
  description: string;
  url: string;
}

export default function AppCard(props: AppCardProps) {
  return (
    <a target="_blank" href={props.url}>
      <Card className="flex flex-col gap-[10px] w-[200px]">
        <img
          src={props.icon}
          className="rounded h-[60px] w-[60px] border border-border/10"
          alt={`${props.name} icon`}
        />
        <div className="flex flex-col gap-[3px]">
          <p className="font-semibold">{props.name}</p>
          <p className="text-secondary">{props.description}</p>
        </div>
      </Card>
    </a>
  );
}
