import { Aside } from "./Aside"

export function ClubHouseDash () {
    return (
        <div className="dashboard">
            <Aside />
            <div className="dashboard__container">
                <div className="dashboard__container__header">
                    <h1>Club House</h1>
                </div>
            </div>
        </div>
    )
}