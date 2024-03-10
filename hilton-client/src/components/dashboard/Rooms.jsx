import { Aside } from "./Aside"
export function RoomsDash () {
    return (
        <div className="dashboard">
        <Aside />
        <div className="dashboard__container">
            <div className="dashboard__container__header">
                <h1>Rooms</h1>
            </div>
        </div>
    </div>
    )
}