import { Aside } from "./Aside";
import React from "react";
import { GeneralSettings } from "./Settings/GeneralSettings";
import "./dashboard.css";
import { SliderSettings } from "./Settings/SliderSettings";
import { PromoVideoSettings } from "./Settings/PromoVideoSettings";

export function DashBoard() {
  return (
    <div className="dashboard">
      <Aside />
      <div className="dashboard-container">
      <div className="dashboard_settings_container">
        <div className="dashboard_Settings_body">
          <GeneralSettings />
          <hr />

          <div className="viewSettings">
            <SliderSettings />
            <hr />
            <PromoVideoSettings />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
