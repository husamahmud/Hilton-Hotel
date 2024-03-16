import React, { useEffect } from "react";
import "../dashboard.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function GeneralSettings() {
  const { register, handleSubmit } = useForm();

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const adminId = JSON.parse(user).id;

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
      const data = await fetch(url, options);

      const settings = await data.json();

      return settings;
    };
    const fetchData = async () => {
      const fetchedSettings = await getAllSettings();

      setSettings(fetchedSettings);
    };

    fetchData();
  }, []);

  const updateSettings = async (data) => {
    console.log(data);
  };

  return (
    <div className="generalSettings">
      <h1>General Settings</h1>
      {settings && (
        <form className="settings" onSubmit={handleSubmit(updateSettings)}>
          <div>
            <label htmlFor="hotelName">Hotel Name</label>
            <input
              type="text"
              placeholder={settings.data.hotelName}
              id="hotelName"
              minLength={3}
              {...register("hotelName")}
            />
          </div>
          <div>
            <label htmlFor="logo">Logo</label>
            <div>{settings.data.logo}</div>
            <input type="photo" id="logo" minLength={3} {...register("logo")} />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              placeholder={settings.data.address}
              id="address"
              minLength={25}
              {...register("address")}
            />
          </div>
          <div>
            <label htmlFor="phoneNum">Phone Number</label>
            <input
              type="text"
              placeholder={settings.data.phoneNum}
              id="phoneNum"
              minLength={3}
              {...register("phoneNum")}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder={settings.data.email}
              id="email"
              minLength={3}
              {...register("email")}
            />
          </div>
          {/* a7eeeeeeeeeeeeeeeeeeeeeeeeeeeehhhhhh */}
          <div>
            <div>
              <label htmlFor="facebook">Facebook</label>
              <input
                type="text"
                placeholder={settings.data.socialMedia.facebook}
                id="facebook"
                minLength={3}
                {...register("socailMedia.facebook")}
              />
            </div>
            <div>
              <label htmlFor="instagram">Instagram</label>
              <input
                type="text"
                placeholder={settings.data.socialMedia.instagram}
                id="instagram"
                minLength={3}
                {...register("socailMedia.instagram")}
              />
            </div>
            <div>
              <label htmlFor="twitter">Twitter</label>
              <input
                type="text"
                placeholder={settings.data.socialMedia.twitter}
                id="twitter"
                minLength={3}
                {...register("socailMedia.twitter")}
              />
            </div>
            <div>
              <label htmlFor="youtube">Youtube</label>
              <input
                type="text"
                placeholder={settings.data.socialMedia.youtube}
                id="youtube"
                minLength={3}
                {...register("socailMedia.youtube")}
              />
            </div>
            <div>
              <label htmlFor="tiktok">Tiktok</label>
              <input
                type="text"
                placeholder={settings.data.socialMedia.tiktok}
                id="tiktok"
                minLength={3}
                {...register("socailMedia.tiktok")}
              />
            </div>
          </div>
          <div>
            <button type="submit">Update</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )}
    </div>
  );
}
