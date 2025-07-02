import { RESUME_LINK } from "@/constant";
import clsx from "clsx";
import Link from "next/link";

const MENUS = [
  {
    title: "About",
    href: "/",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Resume",
    href: RESUME_LINK,
    target: "_blank",
  },
];

const HeaderLink = ({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      href={href}
      className={clsx(
        "navigation relative",
        "before:content-[''] before:text-inherit before:rounded-md before:h-px before:bottom-0.5 before:bg-current before:transition-[scale] before:ease-in  before:absolute before:left-0 before:origin-center before:right-0 before:scale-0",
        "hover:before:scale-100"
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  return (
    <header className="flex items-center justify-between col-span-full w-full">
      <div>
        <Link href="/" className="font-dm-sans font-bold text-3xl">
          gs.
        </Link>
      </div>
      <div className="flex items-center justify-end gap-5 md:gap-8">
        {MENUS.map((nav) => (
          <HeaderLink key={nav.title} href={nav.href} target={nav.target}>
            {nav.title}
          </HeaderLink>
        ))}
      </div>
    </header>
  );
};

export default Header;
