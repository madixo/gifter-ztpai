import {ReactNode} from "react";
import {Link} from "react-router-dom";

export interface BackChevronProps {
    to: string;
    children: ReactNode;
}

export default function BackChevron({to, children}: BackChevronProps) {
    return (
        <>
            <div className="back">
                <Link to={to}>
                    <i className="fa-solid fa-chevron-left"></i>
                </Link>
            </div>
            {children}
        </>
    );
}