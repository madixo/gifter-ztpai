import cn from "classnames";
import {MouseEvent, ReactNode} from "react";
import styles from "./Badge.module.scss";

export interface BadgeProps {
    children: ReactNode;
    className?: string;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    label?: string;
    title?: string;
}

export default function Badge({children, className, onClick, label, title}: BadgeProps) {
    return (
        <div
            onClick={onClick}
            aria-label={label}
            title={title}
            className={cn(styles.badge, className)}
        >
            {children}
        </div>
    );
}
