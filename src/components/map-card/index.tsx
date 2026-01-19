import Card from "@components/card";

export interface MapCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  url: string;
  flag: string;
}

export default function MapCard(props: MapCardProps) {
  return (
    <a target="_blank" href={props.url} className="flex-1">
      <Card
        {...props}
        className={`flex items-end justify-end flex-col gap-[10px] bg-cover bg-no-repeat bg-center p-[8px] pr-[8px] ${props.className}`}
        style={{ backgroundImage: `url(${props.image})` }}
      >
        <p className="text-xl h-[40px] w-[40px] flex items-center justify-center rounded bg-white border border-border/10">
          {props.flag}
        </p>
      </Card>
    </a>
  );
}
