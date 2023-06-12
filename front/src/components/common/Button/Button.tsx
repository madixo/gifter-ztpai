import cn from "classnames";
import {MouseEvent, ReactNode} from "react";
import styles from "./Button.module.scss";

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  inline?: boolean;
  label: string;
  title?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  info?: boolean;
  warning?: boolean;
  danger?: boolean;
  iconPlacement?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  disabled?: boolean;
}

export default function Button(
  {
    children,
    className,
    inline,
    label,
    title,
    onClick,
    primary,
    secondary,
    success,
    info,
    warning,
    danger,
    disabled,
    icon,
    iconPlacement = "left",
    size = "md",
  }: ButtonProps,
) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={title}
      className={cn(styles.button, className, {
        [styles.inline]: inline,
        [styles.primary]: primary,
        [styles.secondary]: secondary,
        [styles.success]: success,
        [styles.info]: info,
        [styles.warning]: warning,
        [styles.danger]: danger,
        [styles.disabled]: disabled,
        [styles.icon]: icon,
        [styles["icon-right"]]: iconPlacement === "right",
        [styles["small"]]: size === "sm",
        [styles["regular"]]: size === "md",
        [styles["large"]]: size === "lg",
      })}
      disabled={disabled}
    >
      {icon && icon}
      {children}
    </button>
  );
}
