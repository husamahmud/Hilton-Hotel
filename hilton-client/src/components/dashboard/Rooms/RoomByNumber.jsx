import "../../dashboard/dashboard.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function RoomByNumber(props) {
  const { room } = props;
  const { register, handleSubmit } = useForm();

  const [roomId, setRoomId] = useState(null);
  const [userData, setUserData] = useState(null);

  const updateRoomById = async (data) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const adminId = JSON.parse(user).id;
    const roomId = data.roomId;
    data.adminId = adminId;

    const url = `http://localhost:3000/api/v1/room/${roomId}`;

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.status === 200) {
      alert("Room Updated Successfully");
    }
    if (response.status === 500) {
      alert(result.error);
    }
  };

  const deleteRoomById = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      const token = localStorage.getItem("token");
      const url = `http://localhost:3000/api/v1/room/${roomId}`;

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);
      const result = await response.json();
      if (response.status === 200) {
        alert("Room Deleted Successfully");
      }
      if (response.status === 500) {
        alert(result.error);
      }
    }
  };

  const getUserName = async (userId) => {
    console.log("user id    ", userId);
    const token = localStorage.getItem("token");
    const url = `http://localhost:3000/api/v1/user/${userId}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(url, options);
    const user = await res.json();

    console.log("user from ", user);

    return user;
  };

  const fetchData = async () => {
    const fetchedRooms = await getUserName();
    setUserData(fetchedRooms.data);
  };

  fetchData();

  console.log("object", userData);

  room.images.map((image_, index) => console.log(image_));

  const [slideIndex, setSlideIndex] = useState(0);

  const moveSlide = (n) => {
    const newIndex = slideIndex + n;
    if (newIndex < 0 || newIndex >= (room.images || []).length) {
      return;
    }
    setSlideIndex(newIndex);
  };

  return (
    <div className="dashboard_room_body">
      {room && (
        <div className="room" key={room.id} onClick={() => setRoomId(roomId)}>
          <form onSubmit={handleSubmit(updateRoomById)}>
            <input
              type="hidden"
              id="roomId"
              value={room.id}
              {...register("roomId")}
            />
            <div className="slider-container">
              <div className="slider">
                {room.images.map((image_, index) => (
                  <div
                    className="slide"
                    key={index}
                    style={{
                      display: index === slideIndex ? "block" : "none",
                    }}
                  >
                    <img src={image_} alt="slider" />
                  </div>
                ))}
              </div>
              <div className="prev" onClick={() => moveSlide(-1)}>
                ❮
              </div>
              <div className="next" onClick={() => moveSlide(1)}>
                ❯
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: "60%",
                margin: "0 auto",
                gap: "2rem",
              }}
            >
              <div className="formGroup">
                <label htmlFor="images"> Change Slider </label>
                <input type="file" id="images" {...register("images")} />
              </div>

              <div className="formGroup">
                <label htmlFor="roomNum">Room Number</label>
                <input
                  type="text"
                  id="roomNum"
                  defaultValue={room.roomNum}
                  {...register("roomNum")}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: "60%",
                margin: "0 auto",
                gap: "2rem",
              }}
            >
              <div className="formGroup">
                <label htmlFor="types">Room Type</label>
                <select
                  id="types"
                  {...register("types")}
                  defaultValue={room.types}
                  className="custom-select"
                >
                  <option value="JUNIOR_SUITE">Junior Suit</option>
                  <option value="FAMILY_ROOM">Family Room</option>
                  <option value="DOUBLE_ROOM">Double Room</option>
                  <option value="DELAUX_ROOM">Deluex Room</option>
                  <option value="SUPERIOR_ROOM">Superior Room</option>
                </select>
              </div>
              <div className="formGroup">
                <label htmlFor="price">Room Price</label>
                <input
                  type="text"
                  id="price"
                  defaultValue={room.price}
                  {...register("price")}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: "60%",
                margin: "0 auto",
                gap: "2rem",
              }}
            >
              <div className="formGroup">
                <label htmlFor="description">Room Description</label>
                <input
                  type="text"
                  id="description"
                  defaultValue={room.description}
                  {...register("description")}
                />
              </div>
              <div className="formGroup">
                <label htmlFor="aminities">Room Aminities</label>
                {room.aminities.map((aminity, index) => (
                  <input
                    type="text"
                    id="aminities"
                    defaultValue={aminity}
                    {...register(`aminities[${index}]`)}
                  />
                ))}
              </div>
            </div>
            <div
              className="formGroup"
              style={{ width: "60%", margin: "0 auto" }}
            >
              <label htmlFor="view">Room View</label>
              <input
                type="text"
                id="view"
                defaultValue={room.view}
                {...register("view")}
              />
            </div>
            {room.user &&
              room.user.map((u) => (
                <div
                  style={{
                    width: "60%",
                    display: "flex",
                    margin: "0 auto",
                  }}
                >
                  {/* TODO */}
                  <div className="formGroup">
                    <label htmlFor="user">Booked By</label>
                    <input
                      type="text"
                      id="user"
                      defaultValue={u.userId}
                      {...register("user")}
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="user">From</label>
                    <input
                      type="text"
                      id="user"
                      defaultValue={u.checkIn}
                      {...register("user.checkIn")}
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="user">To</label>
                    <input
                      type="text"
                      id="user"
                      defaultValue={u.checkOut}
                      {...register("user.checkOut")}
                    />
                  </div>
                </div>
              ))}
            {room.extraServices &&
              room.extraServices.map((service, index) => (
                <div
                  style={{
                    width: "60%",
                    display: "flex",
                    margin: "0 auto",
                  }}
                >
                  <div className="formGroup">
                    <label htmlFor="name">Extra Service</label>
                    <input
                      type="text"
                      id="name"
                      defaultValue={service.name}
                      {...register(`extraServices[${index}].name`)}
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      id="price"
                      defaultValue={service.price}
                      {...register(`extraServices[${index}].price`)}
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="description">Facilities</label>
                    <input
                      type="text"
                      id="facilities"
                      defaultValue={service.facilities}
                      {...register(`extraServices[${index}].facilities`)}
                    />
                  </div>
                </div>
              ))}

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <button className="btn updateBtn" type="submit">
                Update Room
              </button>
              <button
                className="btn updateBtn"
                type="button"
                onClick={() => deleteRoomById(room.id)}
              >
                Delete Room
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
