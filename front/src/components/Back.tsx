import {ReactNode} from "react";
import {Link} from "react-router-dom";

interface Props {
    to: string;
    children: ReactNode;
}

export default function Back({to, children}: Props) {

    return (
        <div>
            <div className="back">
                <Link to={to}>
                    <i className="fa-solid fa-chevron-left"></i>
                </Link>
            </div>
            {children}
        </div>
    );

}