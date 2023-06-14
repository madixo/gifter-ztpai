import cn from "classnames";
import styles from "./UserAvatar.module.scss";

export interface UserAvatarProps {
    name: string;
    className?: string;
}

export default function UserAvatar({name, className}: UserAvatarProps) {
    return (
        <div className={cn(styles["user-avatar"], className)}>
            <img src="https://placehold.co/35x35" alt={`${name} user avatar`} />
        </div>
    );
}
