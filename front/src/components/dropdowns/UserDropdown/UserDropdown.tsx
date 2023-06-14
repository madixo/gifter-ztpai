import {useCallback, useContext, useState} from "react";

import cn from "classnames";
import Cookies from "js-cookie";
import {FaChevronDown} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";

import Button from "components/common/Button/Button";
import Dropdown, {DropdownItem, DropdownToggle} from "components/common/Dropdown/Dropdown";
import UserAvatar from "components/common/UserAvatar/UserAvatar";
import {routes} from "constants/routes";

import {UserContext} from "views/DashboardView";
import styles from "./UserDropdown.module.scss";

export default function UserDropdown() {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [isButtonActive, setButtonActive] = useState<boolean>(false);

    const items: DropdownItem[] = [
        {
            label: "Profil użytkownika",
            children: <Link to={routes.USER_PROFILE}>Profil użytkownika</Link>
        },
        {
            label: "Ustawienia",
            children: <Link to={routes.SETTINGS}>Ustawienia</Link>
        },
        {
            label: "Wyloguj się",
            children: <>Wyloguj się</>,
            onClick: () => {
                Cookies.remove("token");
                navigate(routes.LOGIN);
            }
        }
    ];

    const onDropdownToggle: DropdownToggle = useCallback((isDropdownActive, setDropdownActive) => {
        setButtonActive((prevState) => !prevState);
    }, []);

    return (
        <Dropdown
            className={styles["user-dropdown"]}
            items={items}
            onToggle={onDropdownToggle}
        >
            <Button
                className={styles["user-dropdown-btn"]}
                inline
                label="Przycisk profilu użytkownika"
                title="Pokaż lub ukryj menu użytkownika"
            >
                <UserAvatar name="madix" />
                <span>{user?.email}</span>
                <FaChevronDown
                    size={10}
                    className={cn(styles["user-dropdown-arrow"], {
                        [styles.active]: isButtonActive,
                    })}
                />
            </Button>
        </Dropdown>
    );
}
