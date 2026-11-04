import Aurora from "@components/aurora";

export interface HighlightedProjectProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function HighlightedProject(props: HighlightedProjectProps) {
  return (
    <section
      {...props}
      className={`flex flex-col overflow-hidden items-center relative bg-white h-[620px] min-[600px]:max-lg:h-auto min-[600px]:max-lg:pb-10 lg:h-[680px] ${props.className}`}
    >
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#FFB459", "#FE7743", "#FFB459"]}
          direction="bottom"
          height={0.12}
          curve={0.65}
          lightMode
        />
      </div>
      <div className="flex flex-col shrink-0 items-start md:items-center md:max-w-[350px] z-20 px-10 md:px-0 pt-[50px] md:pt-[60px] w-full">
        <img
          className="h-[30px] mb-[40px]"
          src="/halley-dark.svg"
          alt="Halley logo"
        />
        <label className="text-sm px-[8px] py-[3px] text-foreground bg-foreground/5 rounded-full font-semibold mb-[10px] backdrop-blur-sm">
          Coming soon
        </label>
        <h1 className="text-left md:text-center md:px-0">
          Halley. Email, for the rest of us.
        </h1>
        <p className="text-left md:text-center text-foreground/70">
          Email apps got built for productivity experts. Halley is built for
          everyone else. Open it, read, and get on with your day.
        </p>
      </div>
      <img
        className="z-20 shrink-0 mt-[40px] self-start ml-10 w-[max(560px,calc(100%+140px))] min-[600px]:self-center min-[600px]:ml-0 min-[600px]:max-lg:w-[calc(100%-70px)] lg:w-[720px] max-w-none [filter:drop-shadow(0_0_1px_rgba(11,19,36,0.25))_drop-shadow(0_24px_48px_rgba(11,19,36,0.18))]"
        src="/app/halley.webp"
        alt="Halley showing the GitHub sender view"
      />
    </section>
  );
}
