import {ReactNode} from "react";
import './SplitView.css';
interface SplitViewProps {
    children: ReactNode
}

export default function SplitView({children}: SplitViewProps) {

    return (
        <main id="split">
            <div className="side-panel">
                <div className="icons">
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    <i className="fa-solid fa-gift"></i>
                </div>
                <h1 className="title">Gifter</h1>
            </div>
            <div className="main-panel flex flex--center">
                {children}
            </div>
        </main>
    );
}