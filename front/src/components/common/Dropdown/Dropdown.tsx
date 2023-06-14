import cn from "classnames";
import {
    cloneElement,
    Dispatch,
    MouseEvent,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";
import {useOnClickOutside} from "usehooks-ts";
import styles from "./Dropdown.module.scss";

export interface DropdownItem {
    label: string;
    children: ReactElement;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
    href?: string;
}

export type DropdownToggle = (
    isActive: boolean,
    setDropdownActive?: Dispatch<boolean>,
) => void;

export interface DropdownProps {
    items: DropdownItem[];
    children: ReactElement;
    className?: string;
    onToggle?: DropdownToggle;
}

export default function Dropdown({items, children, className, onToggle}: DropdownProps) {
    const [isDropdownActive, setDropdownActive] = useState<boolean>(false);
    const ref = useRef(null);

    useOnClickOutside(ref, () => {
        setDropdownActive(false);
    });

    const toggleDropdownList = () => {
        setDropdownActive((prevState) => !prevState);
    };

    const childrenWithOnclick = cloneElement(children, {
        onClick: toggleDropdownList,
    });

    useEffect(() => {
        onToggle && onToggle(isDropdownActive, setDropdownActive);
    }, [isDropdownActive, onToggle]);

    return (
        <div ref={ref} className={cn(styles.dropdown, className)}>
            {childrenWithOnclick}
            {isDropdownActive && (
                <nav
                    aria-label="dropdown nav"
                    className={styles["dropdown-nav"]}
                >
                    <ul className={styles["dropdown-list"]}>
                        {items.map((item, index) => (
                            <li
                                key={index}
                                aria-label="dropdown list item"
                                className={styles["dropdown-list-item"]}
                            >
                                <DropdownItemChildren item={item} />
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}

export interface DropdownItemChildrenProps {
    item: DropdownItem;
}

export function DropdownItemChildren({item}: DropdownItemChildrenProps) {
    if(item.children.props?.to) {

        const childrenWithClassName = cloneElement(item.children, {
            className: styles["dropdown-link"],
        });

        return childrenWithClassName;
    }

    return (
        <a
            className={styles["dropdown-link"]}
            aria-label="dropdown item link"
            href={item.href ?? "#"}
            onClick={item.onClick}
        >
            {item.children}
        </a>
    );
}
