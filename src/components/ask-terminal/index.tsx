import Button from "@components/button";

export interface AskTerminalProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AskTerminal(props: AskTerminalProps) {
  return (
    <section
      {...props}
      style={{ background: "linear-gradient(0deg, #71A726, #86BD36)" }}
      className={`flex flex-col overflow-hidden items-center outline outline-1 outline-border/10 md:flex-row md:justify-center ${props.className}`}
    >
      <div className="flex flex-col items-center md:items-start md:gap-[60px] md:w-[350px] md:mr-[45px]">
        <img
          className="h-[30px] my-[30px]"
          src="/payway.svg"
          alt="Payway logo white"
        />
        <div className="flex flex-col items-center md:items-start">
          <label className="text-sm px-[8px] py-[3px] text-white bg-white/20 rounded-full font-semibold mb-[10px]">
            Shipped
          </label>
          <h1 className="text-white text-center md:text-left px-[20%] md:px-0">
            Payway. Corporate cards and payroll, finally in one place.
          </h1>
          <p className="hidden md:block text-white/70">
            We are bringing corporate cards and payroll together in a simple,
            intuitive experience.
          </p>
          <a
            href="https://apps.apple.com/mx/app/payway/id6749019341"
            target="_blank"
          >
            <Button className="my-[25px]">View on the App Store</Button>
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center w-[240px] relative border border-border/10 rounded-[30px] p-[6px] bg-white -mb-[85px] md:translate-y-10">
        <div className="absolute top-[21px] h-[20px] w-[60px] rounded-full bg-white border border-border/10" />
        <img
          className="rounded-[24px]"
          src="/payway-ss.png"
          alt="Payway app screenshot"
        />
        <div className="absolute bottom-[11px] h-[5px] w-[70px] opacity-20 rounded-full bg-white border-border/10" />
      </div>
    </section>
  );
}
