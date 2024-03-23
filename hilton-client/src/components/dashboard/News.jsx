import { Aside } from "./Aside"


export function NewsDash () {
    return (
        <div className="dashboard">
        <Aside />
        <div className="dashboard__container">
            <div className="dashboard__container__header">
                <h1>News</h1>
            </div>
        </div>
    </div>
    )
}