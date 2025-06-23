import { RESUME_LINK } from "@/constant";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between col-span-full w-full">
      <div>
        <Link href="/" className="font-dm-sans font-bold text-3xl">
          gs.
        </Link>
      </div>
      <div className="flex items-center justify-end gap-8">
        <Link href="/" className="navigation">
          About
        </Link>
        <Link href="/projects" className="navigation">
          Projects
        </Link>
        <Link href={RESUME_LINK} target="_blank" className="navigation">
          Resume
        </Link>
      </div>
    </header>
  );
};

export default Header;
