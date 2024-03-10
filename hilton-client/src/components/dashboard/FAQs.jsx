import { Aside } from "./Aside"

export function FAQsDash () {
    return (
        <div className="dashboard">
            <Aside />
            <div className="dashboard__container">
                <div className="dashboard__container__header">
                    <h1>FAQs</h1>
                </div>
            </div>
        </div>
    )
}