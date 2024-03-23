import { Aside } from "./Aside"

export function RestaurantDash () {
    return (
        <div className="dashboard">
            <Aside />
            <div className="dashboard__container">
                <div className="dashboard__container__header">
                    <h1>Restaurant</h1>
                </div>
            </div>
        </div>
    )
}