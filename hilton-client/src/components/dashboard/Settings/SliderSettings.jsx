import React, { useEffect } from "react";
import "../dashboard.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function SliderSettings() {
  const { register, handleSubmit } = useForm();

  const [slider, setSlider] = useState(null);

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

      setSlider(fetchedSlider);
    };

    fetchData();
  }, []);

  const updateSlider = async (data) => {
    console.log(data);
  };

  return (
    <div className="sliderSettings">
      <h1>Slider Settings</h1>
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
          <div>
            <button type="submit">Update</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )}
    </div>
  );
}
