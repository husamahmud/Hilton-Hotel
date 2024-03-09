import {Aside} from './Aside'; 

export function ContactsDash () {
    return (
        <div className="dashboard">
        <Aside />
        <div className="dashboard__container">
            <div className="dashboard__container__header">
                <h1>Contacts</h1>
            </div>
        </div>
    </div>
    )
}