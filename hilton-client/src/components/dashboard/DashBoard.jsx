import {Aside} from './Aside';
import "./dashboard.css";


export function DashBoard() {

    return (
        <div className="dashboard">
            <Aside />
            <div className="dashboard__container">
                <div className="dashboard__container__header">
                    <h1>Settings</h1>
                </div>
            </div>
        </div>
    )

}