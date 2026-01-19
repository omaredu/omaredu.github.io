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
          aria-label="Go to University of Monterrey's website"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/organizations/udem.png"
            alt="University of Monterrey"
            className="h-[16px]"
          />
        </a>
        <a
          href="https://www.msgova.com.mx/"
          className="hover:opacity-60 transition"
          aria-label="Go to Gova Multiservices' website"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="Gova Multiservices"
            src="/organizations/gova.png"
            className="h-[25px]"
          />
        </a>
        <a
          href="https://tecmilenio.mx/"
          className="hover:opacity-60 transition"
          aria-label="Go to Tecmilenio University's website"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="Tecmilenio University"
            src="/organizations/tecmilenio.png"
            className="h-[25px]"
          />
        </a>
      </div>
    </section>
  );
}
