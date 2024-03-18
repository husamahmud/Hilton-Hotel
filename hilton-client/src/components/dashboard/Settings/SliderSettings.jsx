import React, { useEffect } from "react";
import "../dashboard.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function SliderSettings() {
  const { register, handleSubmit } = useForm();

  const [slider, setSlider] = useState(null);
  const [sliderId, setSliderId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    const adminId = JSON.parse(user).id;
    const getAllSliders = async () => {
      const url = "http://localhost:3000/api/v1/sliders";
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
      const sliders = await data.json();

      return sliders;
    };
    const fetchData = async () => {
      const fetchedSlider = await getAllSliders();
      setSliderId(fetchedSlider.sliders[0].id);

      setSlider(fetchedSlider);
    };

    fetchData();
  }, []);

  const updateSlider = async (data) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const adminId = JSON.parse(user).id;

    console.log("object from frontend", data);

    const url = `http://localhost:3000/api/v1/sliders/${sliderId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        photo: data.photo?.length > 0 ? data.photo : slider.sliders[0].photo,
        header: data.header?.length > 0 ? data.header : slider.sliders[0].header,
        paragraph: data.paragraph?.length > 0? data.paragraph : slider.sliders[0].paragraph,
        adminId,
      }),
    };

    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    if (response.status === 200) {
      alert("Sliders Updated Successfully");
    }
    if (response.status === 500) {
      alert(result.error);
    }
  };

  return (
    <div className="sliderSettings">
      <h1>Slider Settings</h1>
      {slider && (
        <form className="slider" onSubmit={handleSubmit(updateSlider)}>
          <div className="formGroup">
            <label htmlFor="photo">Photo</label>
            {/* <div>{slider.sliders[0].photo}</div> */}
            <input
              type="photo"
              id="photo"
              minLength={3}
              placeholder={slider.sliders[0].photo}
              {...register("photo")}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="header">Header</label>
            <input
              type="text"
              placeholder={slider.sliders[0].header}
              id="header"
              minLength={3}
              {...register("header")}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="paragraph">Paragraph</label>
            <input
              type="text"
              placeholder={slider.sliders[0].paragraph}
              id="paragraph"
              minLength={3}
              {...register("paragraph")}
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
