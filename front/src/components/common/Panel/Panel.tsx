import {Children, cloneElement, ReactElement, ReactNode} from "react";

import cn from "classnames";

import styles from "./Panel.module.scss";

export interface PanelProps {
  children?: ReactNode;
  className?: string;
  actions?: ReactElement[];
  title: string;
}

export default function Panel(
  {
    children,
    className,
    actions,
    title,
  }: PanelProps,
) {

  const childWithClassName = (child: ReactElement) =>
    cloneElement(child, {
      className: cn(styles["panel-action"], child?.props?.className),
    });

  return (
    <div className={cn(styles.panel, className)}>
      <div className={styles["panel-header"]}>
        <div className={styles["panel-title"]}>
          <h1>{title}</h1>
        </div>
        <div className={styles["panel-actions"]}>
          <nav>
            <ul>
              {Children.map(
                actions,
                (child) => child && <li>{childWithClassName(child)}</li>,
              )}
            </ul>
          </nav>
        </div>
      </div>
      <div className={styles['panel-main']}>
        {children}
      </div>
    </div>
  );
}
