import Button from "@components/button";
import ColorBends from "@components/color-bends";

export interface HighlightedProjectProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function HighlightedProject(props: HighlightedProjectProps) {
  return (
    <section
      {...props}
      className={`flex flex-col overflow-hidden items-center outline outline-1 outline-border/10 md:flex-row md:justify-center relative bg-black h-[650px] md:h-[450px] ${props.className}`}
    >
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute z-0 md:rotate-0 h-full md:h-auto">
        <ColorBends noise={0.7} rotation={1} />
      </div>
      <div className="flex flex-col items-start md:items-center md:justify-center md:max-w-[350px] z-20 px-10 md:px-0 py-10 h-full">
        <img
          className="h-[30px] mb-auto md:mb-[50px]"
          src="/unicodic.svg"
          alt="Unicodic logo white"
        />
        <div className="flex flex-col items-start md:items-center w-full">
          <label className="text-sm px-[8px] py-[3px] text-white bg-white/20 rounded-full font-semibold mb-[10px] backdrop-blur-sm">
            Waitlist now open
          </label>
          <h1 className="text-white text-left md:text-center md:px-0">
            Unicodic. Building the Future of Recruitment.
          </h1>
          <p className="text-left md:text-center text-white/70">
            Say goodbye to traditional recruitment. Say hi to cutting edge
            technologies in your recruitment methods.
          </p>
          <a href="https://unicodic.com/" target="_blank">
            <Button className="mt-[25px]">Join the Waitlist</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
