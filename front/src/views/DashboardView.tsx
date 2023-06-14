import UserDropdown from "components/dropdowns/UserDropdown/UserDropdown";
import useToken from "hooks/useToken";
import Cookies from "js-cookie";
import {ReactNode, createContext} from "react";
import "./DashboardView.css";

interface DashboardViewProps {
    pageTitle?: string;
    children: ReactNode;
}

interface Token {
    sub: number;
    email: string;
    role: string;
}

export interface User {
    id: number;
    email: string;
    role: string;
}

export const UserContext = createContext<User>({} as User);

export default function DashboardView({pageTitle, children}: DashboardViewProps) {
    // const [data, setData] = useState<User>({} as User);
    const token = Cookies.get('token') as string;
    const data = useToken<Token>(token);
    return (
        <UserContext.Provider value={{id: data.sub, email: data.email, role: data.role} as User}>
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
        </UserContext.Provider>
    );
}
