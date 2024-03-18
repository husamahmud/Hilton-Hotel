import React, { useEffect } from "react";
import "../dashboard.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function PromoVideoSettings() {
  const { register, handleSubmit } = useForm();

  const [promoVid, setPromoVid] = useState(null);
  const [promoVidId, setPromoVidId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    const adminId = JSON.parse(user).id;
    const getPromotionVid = async () => {
      const url = "http://localhost:3000/api/v1/promovid";
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
      const promoVid = await data.json();

      return promoVid;
    };
    const fetchData = async () => {
      const fetchedPromoVid = await getPromotionVid();

      setPromoVidId(fetchedPromoVid.promoVids[0].id);
      setPromoVid(fetchedPromoVid);
    };

    fetchData();
  }, []);

  const updatePromoVid = async (data) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    const adminId = JSON.parse(user).id;
    const url = `http://localhost:3000/api/v1/promovid/${promoVidId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        video: data.video,
        description: data.description,
        adminId,
      }),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    if (response.status === 200) {
      alert("Promo Video Updated Successfully");
    }
    if (response.status === 500) {
      alert(result.error);
    }
  };

  return (
    <div className="promoVidSettings">
      <h1>Promo Video Settings</h1>
      {promoVid && (
        <form className="promoVid" onSubmit={handleSubmit(updatePromoVid)}>
          <div className="formGroup">
            <label htmlFor="video">Video</label>
            {/* <div>{promoVid.promoVids[0].video}</div> */}
            <input
              type="photo"
              id="video"
              minLength={3}
              placeholder={promoVid.promoVids[0].video}
              {...register("video")}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder={promoVid.promoVids[0].description}
              id="description"
              minLength={20}
              {...register("description")}
            />
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
