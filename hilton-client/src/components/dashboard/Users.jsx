import { Aside } from "./Aside"

export function UsersDash () {
    return (
        <div className="dashboard">
            <Aside />
            <div className="dashboard-container">
            <div className="dashboard_users_container">
                <div className="dashboard_container_header">
                    <h1>Users</h1>
                </div>
            </div>
            </div>
        </div>
    )
}