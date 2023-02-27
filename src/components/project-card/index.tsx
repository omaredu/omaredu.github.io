import Card from "@components/card";
import Button from "@components/button";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string
  name: string
  description: string
  url: string
  label?: string
}

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <div>
      <Card className="flex flex-col justify-between items-start gap-[10px] px-[20px] h-[300px] w-[225px]">
        <img src={props.icon} className="h-[30px] object-contain max-w-[100px]" alt={`${props.name} icon`} />
        <div className="flex flex-col items-start gap-[20px]">
          <div className="flex flex-col gap-[3px]">
            <p className="font-semibold">{props.name}</p>
            <p className="text-secondary">{props.description}</p>
          </div>
          <a href={props.url} target="_blank"><Button className="shadow-none">{props.label || 'See More'}</Button></a>
        </div>
      </Card>
    </div>
  )
}