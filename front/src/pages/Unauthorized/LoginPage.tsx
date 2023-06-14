import LoginPanel from "../../panels/Unauthorized/LoginPanel";
import SplitView from "../../views/SplitView";

export default function LoginPage() {
    return (
        <SplitView>
            <LoginPanel />
        </SplitView>
    );
}