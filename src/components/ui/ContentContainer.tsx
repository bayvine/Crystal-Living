import type { HTMLAttributes, ReactNode } from "react";

const widthClasses = {
  standard: "max-w-[78rem]",
  wide: "max-w-[87rem]"
} as const;

type ContentContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: keyof typeof widthClasses;
};

export default function ContentContainer({
  children,
  className = "",
  size = "standard",
  ...props
}: ContentContainerProps) {
  return (
    <div
      className={`mx-auto w-[calc(100%-clamp(2.5rem,8vw,7rem))] max-sm:w-[calc(100%-2.5rem)] ${widthClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
