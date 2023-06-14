import DashboardPanel from "panels/DashboardPanel";
import DashboardView from "views/DashboardView";

export default function DashboardPage() {

    return (
        <DashboardView pageTitle="Dashboard">
            <DashboardPanel />
        </DashboardView>
    );
}