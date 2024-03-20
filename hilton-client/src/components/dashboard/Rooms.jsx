import React, { useEffect } from "react";
import "../dashboard/dashboard.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Aside } from "./Aside";
import { RoomByNumber } from "./Rooms/RoomByNumber";
import { CreateRoom } from "./Rooms/RoomCreation";
import { AllRooms } from "./Rooms/AllRooms";

export function RoomsDash() {
  const { register, handleSubmit } = useForm();
  const [room, setRoom] = useState(null);

  const [openRoomNumber, setOpenRoomNumber] = useState(false);
  const [openAllRooms, setOpenAllRooms] = useState(false);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);


  const getRoomByNumber = async (data) => {
    console.log("data from get room", data);
    const token = localStorage.getItem("token");
    const roomNum = data.roomNum;

    const url = `http://localhost:3000/api/v1/room/room/${roomNum}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);

    console.log(response);
    const result = await response.json();
    setRoom(result.data);
    console.log("room innnnnnnnnnnnnnnn", result);
    return result;
  };

  console.log("room outttttttt", room);

  return (
    <div className="dashboard">
      <Aside />
      <div className="dashboard-container">
        <div className="dashboard_rooms_container">
          <div className="dashboard_rooms_header">
            <h1>Rooms DashBoard</h1>
            <div className="dashboard_container_header_buttons">
              <form onSubmit={handleSubmit(getRoomByNumber)}>
                <button
                  className="btn"
                  onClick={() => {
                    setOpenAllRooms(true);
                    setOpenCreateRoom(false);
                    setOpenRoomNumber(false);
                  }}
                >
                  All Rooms
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    setOpenCreateRoom(true);
                    setOpenAllRooms(false);
                    setOpenRoomNumber(false);
                  }}
                >
                  Create Room
                </button>

                <div className="search">
                  <input
                    type="text"
                    placeholder="Search Rooms"
                    {...register("roomNum")}
                  />
                  <button
                    className="btn"
                    type="submit"
                    onClick={() => {
                      setOpenRoomNumber(true);
                      setOpenAllRooms(false);
                      setOpenCreateRoom(false);
                    }}
                  >
                    Search Rooms
                  </button>
                </div>
              </form>
            </div>
          </div>
          {openRoomNumber && room && <RoomByNumber room={room} />}
          {openCreateRoom && <CreateRoom />}
          {openAllRooms && <AllRooms />}
        </div>
      </div>
    </div>
  );
}
