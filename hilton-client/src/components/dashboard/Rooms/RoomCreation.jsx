import "../../dashboard/dashboard.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RoomByNumber } from "./RoomByNumber";

export function CreateRoom() {
  const { register, handleSubmit } = useForm();

  const [room, setRoom] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const [createdRoom, setCreatedRoom] = useState(false);

  const createRoom = async (data) => {
    console.log("from create", data);
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const adminId = JSON.parse(user).id;
    data.adminId = adminId;

    data.images = data.images.split(",").map((url) => url.trim());

    data.aminities = data.aminities.split(",");

    console.log(data.socialMedia);
    const url = `http://localhost:3000/api/v1/room/`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    if (response.status === 200) {
      alert("Room Created Successfully");
      setRoom(result.data);
      setCreatedRoom(true);
    }
    if (response.status === 500) {
      alert(result.error);
    }
  };

  return (
    <div className="dashboard_room_body">
      {createdRoom ? (
        <RoomByNumber room={room} />
      ) : (
        <div className="room" onClick={() => setRoomId(roomId)}>
          <form onSubmit={handleSubmit(createRoom)}>
            <div
              style={{
                display: "flex",
                width: "60%",
                margin: "0 auto",
                gap: "2rem",
              }}
            >
              <div className="formGroup">
                <label htmlFor="images"> Change Room Photo </label>
                {/* <input type="file" id="sliders" {...register("sliders")} /> */}
                <input
                  type="text"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  {...register("images")}
                />
              </div>

              <div className="formGroup">
                <label htmlFor="roomNum">Room Number</label>
                <input type="text" id="roomNum" {...register("roomNum")} />
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
                <input type="text" id="price" {...register("price")} />
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
                  {...register("description")}
                />
              </div>
              <div className="formGroup">
                <label htmlFor="aminities">Room Amenities </label>
                <input
                  type="text"
                  id="aminities"
                  placeholder="please seperate amenities with comma"
                  {...register(`aminities`)}
                />
              </div>
            </div>
            <div
              className="formGroup"
              style={{ width: "60%", margin: "0 auto" }}
            >
              <label htmlFor="view">Room View</label>
              <input type="text" id="view" {...register("view")} />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <button className="btn updateBtn" type="submit">
                Create Room
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

