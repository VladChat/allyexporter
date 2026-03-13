import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
};

const BrandMark = ({ className }: BrandMarkProps) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    className={cn("h-5 w-5", className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.5 19.5 11.8 4.5a.8.8 0 0 1 1.4 0l8.3 15a.8.8 0 0 1-.7 1.2H3.2a.8.8 0 0 1-.7-1.2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M9.2 15.8h5.6L12 10.4l-2.8 5.4Z" fill="currentColor" />
  </svg>
);

export default BrandMark;
