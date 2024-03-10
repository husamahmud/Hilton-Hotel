import { Aside } from "./Aside"

export function ReviewsDash () {
    return (
        <div className="dashboard">
        <Aside />
        <div className="dashboard__container">
            <div className="dashboard__container__header">
                <h1>Reviews</h1>
            </div>
        </div>
    </div>
    )
}