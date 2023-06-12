import {routes} from "constants/routes";
import Cookies from "js-cookie";
import {ReactElement} from "react";
import {Navigate} from "react-router-dom";

export interface TheBarrierProps {
    children: ReactElement;
}

export default function TheBarrier({children}: TheBarrierProps) {
    const token = Cookies.get('token');

    return token ? children : <Navigate to={routes.LOGIN} />;
}