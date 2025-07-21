import type { ComponentProps } from "react";

export interface MaterialSymbolProps extends Omit<ComponentProps<"span">, "children"> {
  icon: string;
}

export function MaterialSymbol({ icon, style, className, ...props }: Readonly<MaterialSymbolProps>) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontSize: "inherit", lineHeight: "inherit", ...style }}
      {...props}
    >
      {icon}
    </span>
  );
}
