import { useRef, useEffect, useState } from "react";

import Header from "@components/header";
import AppCard from "./components/app-card";
import Button from "./components/button";
import LatestProject from "./components/latest-project";
import HighlightedProject from "./components/highlighted-project";
import ProjectCard from "./components/project-card";
import SocialCard from "./components/social-card";
import CompanyReel from "./components/company-reel";
import Title from "./components/title";
import AskTerminal from "./components/ask-terminal";

function App() {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [portfolioCanScrollLeft, setPortfolioCanScrollLeft] = useState(false);
  const [portfolioCanScrollRight, setPortfolioCanScrollRight] = useState(false);
  const portfolioScrollStep = 320;

  const checkScroll = (element: HTMLElement) => {
    const { scrollLeft, scrollWidth, clientWidth } = element;
    const hasLeft = scrollLeft > 0;
    const hasRight = scrollLeft + clientWidth < scrollWidth - 1;

    setPortfolioCanScrollLeft((previous) =>
      previous !== hasLeft ? hasLeft : previous,
    );
    setPortfolioCanScrollRight((previous) =>
      previous !== hasRight ? hasRight : previous,
    );
  };

  const scrollPortfolio = (direction: "left" | "right") => {
    const portfolio = portfolioRef.current;
    if (!portfolio) {
      return;
    }

    const offset =
      direction === "left" ? -portfolioScrollStep : portfolioScrollStep;
    portfolio.scrollBy({ left: offset, behavior: "smooth" });
  };

  useEffect(() => {
    const portfolio = portfolioRef.current;
    if (!portfolio) {
      return;
    }

    let animationFrame: number | null = null;
    let resizeTimeout: number | null = null;

    const scheduleScrollState = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        checkScroll(portfolio);
      });
    };

    scheduleScrollState();
    portfolio.addEventListener("scroll", scheduleScrollState, {
      passive: true,
    });
    window.addEventListener("resize", scheduleScrollState);

    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimeout !== null) {
        window.clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(scheduleScrollState, 0);
    });
    resizeObserver.observe(portfolio);

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      if (resizeTimeout !== null) {
        window.clearTimeout(resizeTimeout);
      }
      resizeObserver.disconnect();
      portfolio.removeEventListener("scroll", scheduleScrollState);
      window.removeEventListener("resize", scheduleScrollState);
    };
  }, []);

  return (
    <>
      <Header />
      <section className="flex flex-col gap-[30px] my-[120px] mb-[60px] md:w-[640px] md:max-w-[640px]">
        <Title
          animated
          className="max-w-[335px]"
          title="Hi 👋 I'm Omar Sánchez. A product engineer based in Monterrey, NL."
          subtitle="I strive to create the most delightful and innovative digital experiences with attention to detail."
        />

        <div className="scrollable flex gap-[15px] overflow-x-auto md:overflow-x-hidden -mx-[20px] px-[20px] py-[10px]">
          <SocialCard
            alt="Github"
            icon="/social/github.svg"
            title="/omaredu"
            domain="github.com"
            url="https://github.com/omaredu"
          />
          <SocialCard
            alt="LinkedIn"
            icon="/social/linkedin.svg"
            title="/in/omaredu"
            domain="linkedin.com"
            url="https://www.linkedin.com/in/omaredu"
          />
          <SocialCard
            alt="X"
            icon="/social/x.svg"
            title="@omaredumx"
            domain="x.com"
            url="https://x.com/@omaredumx"
          />
          <SocialCard
            alt="Dribbble"
            icon="/social/dribbble.svg"
            title="@omaredu"
            domain="dribbble.com"
            url="https://dribbble.com/omaredu"
          />
        </div>

        <CompanyReel className="mt-3" />
      </section>

      <section className="-mx-[20px] md:mx-0 md:w-full">
        <HighlightedProject />
      </section>

      <section
        id="portfolio"
        className="mt-[50px] flex flex-col gap-[30px] md:w-[640px] md:max-w-[640px]"
      >
        <Title
          className="max-w-[335px]"
          title="👀 Wanna Take a Look at My Recent Work?"
          subtitle="Sure! I've worked on many projects, but here are some of my favorite ones and the ones I'm most proud of."
        />
        <div className="relative">
          {portfolioCanScrollLeft ? (
            <button
              type="button"
              aria-label="Scroll portfolio left"
              onClick={() => scrollPortfolio("left")}
              className="hidden md:flex items-center justify-center absolute -left-[70px] top-1/2 -translate-y-1/2 h-[36px] w-[36px] text-secondary hover:text-foreground transition z-10"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-[18px] w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          ) : null}
          {portfolioCanScrollRight ? (
            <button
              type="button"
              aria-label="Scroll portfolio right"
              onClick={() => scrollPortfolio("right")}
              className="hidden md:flex items-center justify-center absolute -right-[70px] top-1/2 -translate-y-1/2 h-[36px] w-[36px] text-secondary hover:text-foreground transition z-10"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-[18px] w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          ) : null}
          <div
            className={`scrollable flex gap-[15px] overflow-x-auto -mx-[20px] px-[20px] py-[10px] md:border-l md:border-r ${
              portfolioCanScrollLeft
                ? "border-l-border/10"
                : "border-l-transparent"
            } ${
              portfolioCanScrollRight
                ? "border-r-border/10"
                : "border-r-transparent"
            } transition duration-300`}
            ref={portfolioRef}
          >
            <ProjectCard
              icon="/projects/proyecta.svg"
              name="Proyecta"
              iconSize="lg"
              description="A fully-featured service management system. Made in collaboration with the University of Monterrey (UDEM)."
            />
            <ProjectCard
              icon="/projects/ingenia.svg"
              name="Ingenia"
              description="An experimental group chat experience powered by AI agents, designed to inspire and support women pursuing STEM."
              url="https://github.com/omaredu/ingenia-hackathon"
              label="View on Github"
            />
            <ProjectCard
              icon="/projects/payway.svg"
              name="Payway"
              description="At Payway, we're building the next generation of digital corporate banking."
              url="https://www.payway.mx"
              label="Go to Webpage"
            />
            <ProjectCard
              icon="/projects/together.svg"
              name="Together"
              description="We developed it in just a couple of days for a hackathon to make the fight against COVID-19 easier."
              url="https://devpost.com/software/together-a1e8t2"
              label="View on Devpost"
            />
            <ProjectCard
              icon="/projects/tempo.svg"
              name="Tempo"
              description="Check current weather in your location with a smooth and open source experience."
              label="Go to Webpage"
              url="/Tempo"
            />
            <ProjectCard
              icon="/projects/pew.svg"
              name="PEW"
              description="A Space Invaders like game made in 3 days for simple game jam 4."
              label="View on Itch.io"
              url="https://omaredu.itch.io/pew-by-omaredu"
            />
          </div>
        </div>
      </section>
      <section className="-mx-[20px] md:mx-0 md:w-full mt-[50px]">
        <LatestProject />
      </section>
      <section
        id="open-source"
        className="mt-[50px] flex flex-col gap-[30px] md:w-[640px] md:max-w-[640px]"
      >
        <Title
          className="max-w-[335px]"
          title="🐙 Open Source? I've got some"
          subtitle="Open-source projects where my contributions shipped, shipped again, and made things better."
        />
        <div className="scrollable flex gap-[15px] overflow-x-auto -mx-[20px] px-[20px] py-[10px]">
          <AppCard
            icon="/app/ora.png"
            name="Ora Browser"
            description="An open-source, native macOS browser built with Swift and WebKit."
            url="https://www.orabrowser.com"
          />
        </div>
      </section>
      <section
        id="faq"
        className="mt-[50px] flex flex-col gap-[30px] md:w-[640px] md:max-w-[640px]"
      >
        <Title
          className="max-w-[335px]"
          title="🧑‍💻 Any more questions? Ask the terminal!"
          subtitle="Explore my case studies and ask any questions you have about my work."
        />
        <AskTerminal />
      </section>
      <section className="my-[50px] flex flex-col gap-[30px] md:w-[640px] md:max-w-[640px]">
        <Title
          className="max-w-[335px]"
          title="📧 Let's build something great together"
          subtitle="Have an idea, a question, or just want to say hi? Drop me an email and I’ll get back to you ASAP."
        />
        <a href="mailto:me@omaredu.com">
          <Button kind="primary" className="py-[12px]">
            Send an email
          </Button>
        </a>
      </section>
      <footer className="flex flex-col py-[50px] items-center border-t border-border/10 gap-[20px] md:w-[640px] md:max-w-[640px] md:justify-between md:flex-row">
        <img src="/logo_gray.svg" alt="Omaredu logo gray" />
        <p className="text-sm text-secondary">
          &copy; 2026 All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

export default App;
