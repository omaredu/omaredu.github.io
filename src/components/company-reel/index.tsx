export interface CompanyReelProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CompanyReel(props: CompanyReelProps) {
  return (
    <section {...props} className={props.className}>
      <p className="text-secondary font-medium mb-6">
        Proud to have worked with
      </p>
      <div className="flex items-center gap-10">
        <a
          href="https://www.udem.edu.mx/"
          className="hover:opacity-60 transition"
          target="_blank"
        >
          <img src="/organizations/udem.png" className="h-[16px]" />
        </a>
        <a
          href="https://www.msgova.com.mx/"
          className="hover:opacity-60 transition"
          target="_blank"
        >
          <img src="/organizations/gova.png" className="h-[25px]" />
        </a>
        <a
          href="https://tecmilenio.mx/"
          className="hover:opacity-60 transition"
          target="_blank"
        >
          <img src="/organizations/tecmilenio.png" className="h-[25px]" />
        </a>
      </div>
    </section>
  );
}
