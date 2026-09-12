import Image from "next/image";

const LOGOS: Record<string, React.ReactNode> = {
  StampMyVisa: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="none"
      className="w-full h-full"
    >
      <path
        d="M44.3943 21.1148C44.3943 19.1235 42.1874 17.9447 40.5778 19.1172C18.4615 35.2275 3.20521 60.1882 0.015243 88.7931C-0.14695 90.2475 1.0063 91.5 2.46973 91.5H33.8943C39.6933 91.5 44.3943 86.799 44.3943 81V21.1148Z"
        fill="currentColor"
      />
      <path
        d="M2.46972 108.5C1.00629 108.5 -0.146487 109.757 0.015776 111.212C5.58864 161.163 47.956 200 99.3943 200C111.866 200 123.805 197.717 134.815 193.546C135.772 193.183 136.394 192.26 136.394 191.237V119C136.394 113.201 131.693 108.5 125.894 108.5L2.46972 108.5Z"
        fill="currentColor"
      />
      <path
        d="M153.394 179.602C153.394 181.58 155.575 182.762 157.189 181.618C179.856 165.537 195.534 140.251 198.773 111.207C198.936 109.753 197.782 108.5 196.319 108.5H163.894C158.095 108.5 153.394 113.201 153.394 119V179.602Z"
        fill="currentColor"
      />
      <path
        d="M196.319 91.5C197.782 91.5 198.935 90.2427 198.773 88.7883C193.2 38.8373 150.833 0 99.3943 0C86.5344 0 74.2415 2.42743 62.9488 6.84909C62.005 7.21863 61.3943 8.1346 61.3943 9.14816V81C61.3943 86.799 66.0953 91.5 71.8943 91.5L196.319 91.5Z"
        fill="currentColor"
      />
    </svg>
  ),
  LTM: (
    <Image
      src="/images/logos/ltm.png"
      alt="LTM"
      width={40}
      height={40}
      className="w-full h-full object-contain "
    />
  ),
  "Mindnerves Technologies": (
    <Image
      src="/images/logos/mindnerves.png"
      alt="Mindnerves Technologies"
      width={40}
      height={40}
      className="w-full h-full object-contain rounded-full"
    />
  ),
};

export default function CompanyLogo({ company }: { company: string }) {
  const logo = LOGOS[company];

  if (!logo) return null;

  return (
    <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-md border border-gray-200 dark:border-gray-800 bg-background text-foreground p-2">
      {logo}
    </div>
  );
}
