import { Aside } from "./Aside"

export function ReservationsDash () {
    return (
        <div className="dashboard">
        <Aside />
        <div className="dashboard__container">
            <div className="dashboard__container__header">
                <h1>Reservations</h1>
            </div>
        </div>
    </div>
        )
}