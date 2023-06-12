import { useEffect } from "react";

export default function DashboardPanel() {
    useEffect(() => {
        fetch("http://localhost:3001/api/user/1/lists/")
            .then(r => r.json())
            .then(json => json.lists);
        // fetch("http://localhost:3001/api/user/1/contributions/")
        //     .then(r => r.json())
        //     .then(json => setOtherListItems(json.lists));
    }, []);
    return (
        <div>
            test
        </div>
    );
}
