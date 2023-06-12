import UserDropdown from "components/dropdowns/UserDropdown/UserDropdown";
import {ReactNode} from "react";
import "./DashboardView.css";

interface Props {
    pageTitle?: string;
    children: ReactNode;
}

export default function DashboardView({pageTitle, children}: Props) {
    // const profile: ReactNode = React.Children.toArray(children).filter(child => {
    //     if(React.isValidElement(child)) {
    //         return (child.type as unknown as () => void).name === 'Profile';
    //     }
    //     return false;
    // });

    // const rest: ReactNode = React.Children.toArray(children).filter(child => child !== profile);

    return (
        <div id="dashboard" className="flex flex--column">
            <header>
                <div className="logo flex">
                    <i className="fa fa-gift"></i>
                    <h1 className="title">Gifter</h1>
                </div>
                <h1 className="name">{pageTitle}</h1>
                <UserDropdown />
            </header>
            <main className="flex--column">
                {children}
            </main>
            <div id="notifications"></div>
        </div>
    );
}
