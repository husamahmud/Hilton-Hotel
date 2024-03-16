import React, { useEffect } from "react";
import "../dashboard.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function PromoVideoSettings() {
  const { register, handleSubmit } = useForm();

  const [promoVid, setPromoVid] = useState(null);

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

      setPromoVid(fetchedPromoVid);
    };

    fetchData();
  }, []);
  const updatePromoVid = async (data) => {
    console.log(data);
  };

  return (
    <div className="promoVidSettings">
      <h1>Promo Video Settings</h1>
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
          <div>
            <button type="submit">Update</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )}
    </div>
  );
}
