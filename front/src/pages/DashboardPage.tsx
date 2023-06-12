import TheBarrier from "hocs/TheBarrier";
import DashboardPanel from "panels/DashboardPanel";
import DashboardView from "views/DashboardView";

export default function DashboardPage() {

    return (
        <TheBarrier>
            <DashboardView pageTitle="Dashboard">
                <DashboardPanel />
            </DashboardView>
        </TheBarrier>
    );
}