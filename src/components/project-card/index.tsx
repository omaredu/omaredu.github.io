import Card from "@components/card";
import Button from "@components/button";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  iconSize?: "md" | "lg" | "xl";
  name: string;
  description: string;
  url?: string;
  label?: string;
}

export default function ProjectCard({
  icon,
  iconSize = "md",
  name,
  description,
  url,
  label,
  ...props
}: ProjectCardProps) {
  const iconSizeClasses = {
    md: "h-[30px]",
    lg: "h-[50px]",
    xl: "h-[70px]",
  };

  return (
    <div>
      <Card className="flex flex-col justify-between items-start gap-[10px] h-[300px] w-[225px]">
        <img
          src={icon}
          className={`${iconSizeClasses[iconSize]} object-contain max-w-[300px]`}
          alt={`${name} icon`}
        />
        <div className="flex flex-col items-start gap-[20px]">
          <div className="flex flex-col gap-[3px]">
            <p className="font-semibold">{name}</p>
            <p className="text-secondary">{description}</p>
          </div>
          {url && label && (
            <a href={url} target="_blank">
              <Button className="shadow-none">{label || "See More"}</Button>
            </a>
          )}
        </div>
      </Card>
    </div>
  );
}
