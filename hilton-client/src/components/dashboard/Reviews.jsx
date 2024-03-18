import { Aside } from "./Aside"

export function ReviewsDash () {
    return (
        <div className="dashboard">
        <Aside />
        <div className="dashboard-container">
        <div className="dashboard_reviews_container">
            <div className="dashboard_container_header">
                <h1>Reviews</h1>
            </div>
        </div>
        </div>
    </div>
    )
}