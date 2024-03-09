import { Aside } from "./Aside"

export function UsersDash () {
    return (
        <div className="dashboard">
            <Aside />
            <div className="dashboard__container">
                <div className="dashboard__container__header">
                    <h1>Users</h1>
                </div>
            </div>
        </div>
    )
}