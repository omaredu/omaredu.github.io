import { useEffect, useRef } from "react";

import Logo from "./logo";
import Button from "@components/button";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    window.onscroll = () => {

      if (headerRef.current!.offsetTop + 50 < window.pageYOffset) {
        menuRef.current!.style.transform = "translateY(-200%)"
      } else {
        menuRef.current!.style.transform = "translateY(0)"
      }
    };
  }, [headerRef, menuRef])

  return (
    <>
      <div ref={headerRef} />
      <header className="sticky top-0 flex z-50 md:w-[640px] justify-between items-end">
        <Logo />
        <ul ref={menuRef} className="hidden md:flex items-center font-semibold gap-[30px] transition duration-500">
          <a href="#portfolio"><li className="text-secondary hover:text-primary cursor-pointer hover:underline">Portfolio</li></a>
          <a href="#apps"><li className="text-secondary hover:text-primary cursor-pointer hover:underline">Favorite Apps</li></a>
          <a href="#places"><li className="text-secondary hover:text-primary cursor-pointer hover:underline">Places</li></a>
          <a href="mailto:me@omaredu.com"><li>
            <Button>Contact Me</Button>
          </li></a>
        </ul>
      </header>
    </>
  )
}