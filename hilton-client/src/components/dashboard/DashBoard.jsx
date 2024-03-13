import { Aside } from "./Aside";
import "./dashboard.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function DashBoard() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const adminId = JSON.parse(user).id;

  const { register, handleSubmit } = useForm();

  const [settings, setSettings] = useState(null);
  const [slider, setSlider] = useState(null);
  const [promoVid, setPromoVid] = useState(null);

  useEffect(() => {
    const getAllSettings = async () => {
      const url = "http://localhost:3000/api/v1/settings";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Barear ${token}`,
        },
        data: {
          adminId,
        },
      };
      const data = await fetch(url, options);

      const settings = await data.json();

      return settings;
    };

    const getAllSliders = async () => {
      const url = "http://localhost:3000/api/v1/sliders";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Barear ${token}`,
        },
        data: {
          adminId,
        },
      };
      const data = await fetch(url, options);
      const sliders = await data.json();

      return sliders;
    };

    const getPromotionVid = async () => {
      const url = "http://localhost:3000/api/v1/promovid";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Barear ${token}`,
        },
        data: {
          adminId,
        },
      };
      const data = await fetch(url, options);
      const promoVid = await data.json();

      return promoVid;
    };
    const fetchData = async () => {
      const fetchedSettings = await getAllSettings();
      const fetchedSliders = await getAllSliders();
      const fetchedPromoVid = await getPromotionVid();

      console.log(fetchedSliders);

      setSettings(fetchedSettings);
      setSlider(fetchedSliders.sliders[0]);
      setPromoVid(fetchedPromoVid);
    };

    fetchData();
  });

  const updateSettings = async (data) => {
    console.log(data);
  };

  const updateSlider = async (data) => {
    console.log(data);
  };

  const updatePromoVid = async (data) => {
    console.log(data);
  };

  console.log(settings);
  console.log(slider);

  return (
    <div className="dashboard">
      <Aside />
      <div className="dashboard__container">
        <div className="dashboard__container__header">
          <h1>Settings</h1>
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
                <input
                  type="photo"
                  id="logo"
                  minLength={3}
                  {...register("logo")}
                />
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
            </form>
          )}

          <hr />

          {slider && (
            <form className="slider" onSubmit={handleSubmit(updateSlider)}>
              <div>
                <label htmlFor="photo">Photo</label>
                <div>{slider.photo}</div>
                <input
                  type="photo"
                  id="photo"
                  minLength={3}
                  {...register("photo")}
                />
              </div>
              <div>
                <label htmlFor="header">Header</label>
                <input
                  type="text"
                  placeholder={slider.header}
                  id="header"
                  minLength={3}
                  {...register("header")}
                />
              </div>
              <div>
                <label htmlFor="paragraph">Paragraph</label>
                <input
                  type="text"
                  placeholder={slider.paragraph}
                  id="paragraph"
                  minLength={3}
                  {...register("paragraph")}
                />
              </div>
            </form>
          )}

          <hr />

          {promoVid && (
            <form className="promoVid" onSubmit={handleSubmit(updatePromoVid)}>
              <div>
                <label htmlFor="video">Video</label>
                <div>{promoVid.video}</div>
                <input
                  type="photo"
                  id="video"
                  minLength={3}
                  {...register("video")}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  placeholder={promoVid.description}
                  id="description"
                  minLength={20}
                  {...register("description")}
                />
              </div>
            </form>
          )}
          {/* <div>
            <h1>Get All Settings</h1>
            <div>
              <h1>Get All Settings</h1>
              {settings && (
                <div>
                  <p>Hotel Name: {settings.data.hotelName}</p>
                  <p>Logo: {settings.data.logo}</p>
                  <p>Address: {settings.data.address}</p>
                  <p>Phone Number: {settings.data.phoneNum}</p>
                  <p>Email: {settings.data.email}</p>
                  <p>Social Media:</p>
                  <ul>
                    <li>Twitter: {settings.data.socialMedia.twitter}</li>
                    <li>Facebook: {settings.data.socialMedia.facebook}</li>
                    <li>Instagram: {settings.data.socialMedia.instagram}</li>
                  </ul>
                </div>
              )}
            </div>
            <div>
              <h1>Sliders</h1>
              {slider && (
                <div>
                  <p>photo: {slider.photo}</p>
                  <p>header: {slider.header}</p>
                  <p>paragraph: {slider.paragraph}</p>
                </div>
              )}
            </div>
            <div>
              <h1>PromoVideo</h1>
              {promoVid && (
                <div>
                  <p>video: {promoVid.video}</p>
                  <p>description: {promoVid.description}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h1> Update All Settings </h1>
          </div> */}
        </div>
      </div>
    </div>
  );
}
