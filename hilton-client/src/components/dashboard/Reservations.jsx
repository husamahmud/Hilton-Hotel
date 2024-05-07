import { Aside } from "./Aside"

export function ReservationsDash () {
    return (
        <div className="dashboard">
        <Aside />
        <div className="dashboard-container">
        <div className="dashboard_reservations_container">
            <div className="dashboard_container_header">
                <h1>Reservations</h1>
            </div>
        </div>
        </div>
    </div>
        )
}