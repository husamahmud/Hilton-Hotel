import { Aside } from "./Aside"


export function NewsDash () {
    return (
        <div className="dashboard">
        <Aside />
        <div className="dashboard-container">
        <div className="dashboard_news_container">
            <div className="dashboard_container_header">
                <h1>News</h1>
            </div>
        </div>
        </div>
    </div>
    )
}