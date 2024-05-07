import { Aside } from "./Aside"

export function RestaurantDash () {
    return (
        <div className="dashboard">
            <Aside />
            <div className="dashboard-container">
            <div className="dashboard_restaurant_container">
                <div className="dashboard_container_header">
                    <h1>Restaurant</h1>
                </div>
            </div>
            </div>
        </div>
    )
}