import React, { useEffect } from "react";
import "../dashboard.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function GeneralSettings() {
  const { register, handleSubmit } = useForm();

  const [settings, setSettings] = useState(null);
  const [settingsId, setSettingsId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const adminId = user && JSON.parse(user).id;
    console.log(adminId)

    const getAllSettings = async () => {
      const url = "http://localhost:3000/api/v1/settings";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          adminId,
        },
      };
      const res = await fetch(url, options);

      const settings = await res.json();

      return settings;
    };
    const fetchData = async () => {
      const fetchedSettings = await getAllSettings();
      setSettingsId(fetchedSettings.data.id);

      setSettings(fetchedSettings);
    };

    fetchData();
  }, []);

  const [logo, setLogo] = useState(settings ? settings.data.logo : null);

  const updateSettings = async (data) => {
    console.log(data);
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const adminId = user && JSON.parse(user).id;
    console.log(adminId)
    
    console.log(data.socialMedia)
    const url = `http://localhost:3000/api/v1/settings/`;

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: settingsId,
        adminId: adminId,
        hotelName: data.hotelName?.length > 0 ? data.hotelName : settings.data.hotelName,
        logo: data.logo?.length > 0 ? data.logo : settings.data.logo,
        address: data.address?.length > 0 ? data.address : settings.data.address,
        phoneNum: data.phoneNum?.length > 0 ? data.phoneNum : settings.data.phoneNum,
        email: data.email?.length > 0 ? data.email : settings.data.email,
        socialMedia: {
          facebook: data.socialMedia.facebook?.length > 0 ? data.socialMedia.facebook : settings.data.socialMedia.facebook,
          instagram: data.socialMedia.instagram?.length > 0 ? data.socialMedia.instagram : settings.data.socialMedia.instagram,
          twitter: data.socialMedia.twitter?.length > 0 ? data.socialMedia.twitter : settings.data.socialMedia.twitter,
          youtube: data.socialMedia.youtube?.length > 0 ? data.socialMedia.youtube : settings.data.socialMedia.youtube,
          tiktok: data.socialMedia.tiktok?.length > 0 ? data.socialMedia.tiktok : settings.data.socialMedia.tiktok,
        },
      }),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    if (response.status === 200) {
      alert("Settings Updated Successfully");
    }
    if (response.status === 500) {
      alert(result.error);
    }
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  return (
    <div className="generalSettings">
      <h1>General Settings</h1>
      {settings && (
        <form className="settings" onSubmit={handleSubmit(updateSettings)}>
          <div style={{ display: "flex", gap: "2rem" }}>
            <div className="formGroup">
              <label htmlFor="logo">Logo</label>
              {settings && (
                <div>
                  {/* <img src={require(`../../../../../hilton-server/${logo}`)} alt="logo" /> */}
                </div>
              )}
              <input
                type="file"
                id="logo"
                minLength={3}
                onChange={handleLogoChange}
                {...register("logo")}
                placeholder={logo}
              />
            </div>

            <div className="formGroup hotel">
              <label htmlFor="hotelName">Hotel Name</label>
              <input
                type="text"
                placeholder={settings.data.hotelName}
                id="hotelName"
                minLength={3}
                {...register("hotelName")}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "2rem" }}>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder={settings.data.email}
                id="email"
                minLength={3}
                {...register("email")}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                placeholder={settings.data.address}
                id="address"
                minLength={25}
                {...register("address")}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="phoneNum">Phone Number</label>
              <input
                type="text"
                placeholder={settings.data.phoneNum}
                id="phoneNum"
                minLength={3}
                {...register("phoneNum")}
              />
            </div>
          </div>

          {/* a7eeeeeeeeeeeeeeeeeeeeeeeeeeeehhhhhh */}
          <div style={{ display: "flex", gap: "2rem" }}>
            <div className="formGroup">
              <label htmlFor="facebook">Facebook</label>
              <input
                type="text"
                placeholder={settings.data.socialMedia.facebook}
                id="facebook"
                minLength={3}
                {...register("socialMedia.facebook")}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="instagram">Instagram</label>
              <input
                type="text"
                placeholder={settings.data.socialMedia.instagram}
                id="instagram"
                minLength={3}
                {...register("socialMedia.instagram")}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="twitter">Twitter</label>
              <input
                type="text"
                placeholder={settings.data.socialMedia.twitter}
                id="twitter"
                minLength={3}
                {...register("socialMedia.twitter")}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "2rem" }}>
            <div className="formGroup">
              <label htmlFor="youtube">Youtube</label>
              <input
                type="text"
                placeholder={settings.data.socialMedia.youtube}
                id="youtube"
                minLength={3}
                {...register("socialMedia.youtube")}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="tiktok">TikTok</label>
              <input
                type="text"
                placeholder={settings.data.socialMedia.tiktok}
                id="tiktok"
                minLength={3}
                {...register("socialMedia.tiktok")}
              />
            </div>
          </div>
          <div className="settingsBtns">
            <button type="submit">Update</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )}
    </div>
  );
}
