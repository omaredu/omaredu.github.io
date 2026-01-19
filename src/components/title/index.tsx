import { useEffect, useRef } from "react";

export interface TitleProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
  title: string;
  subtitle: string;
}

export default function Title(props: TitleProps) {
  const { animated } = props;

  const title = useRef<HTMLHeadingElement>(null);
  const subtitle = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (animated) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-2");
            entry.target.classList.add(
              "opacity-1",
              "translate-y-0",
              "transition",
              "duration-500",
            );
          } else {
            entry.target.classList.add("opacity-0", "translate-y-2");
            entry.target.classList.remove(
              "opacity-1",
              "translate-y-0",
              "transition",
              "duration-500",
            );
          }
        });
      });

      observer.observe(title.current as HTMLHeadingElement);
      observer.observe(subtitle.current as HTMLParagraphElement);
    }
  }, [animated, title, subtitle]);

  return (
    <div {...props}>
      <h1
        ref={title}
        className={animated ? "translate-y-2 opacity-0 duration-500" : ""}
      >
        {props.title}
      </h1>
      <p
        ref={subtitle}
        className={`text-secondary ${animated && "translate-y-2 delay-300 opacity-0 duration-500"}`}
      >
        {props.subtitle}
      </p>
    </div>
  );
}
