import React, { useEffect } from "react";
import "../dashboard/dashboard.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Aside } from "./Aside";

export function RoomsDash() {
  const { register, handleSubmit } = useForm();

  const [rooms, setRooms] = useState(null);
    const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const adminId = JSON.parse(user).id;

    const getAllRooms = async () => {
      const url = "http://localhost:3000/api/v1/room";
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

      const rooms = await res.json();

      return rooms;
    };
    const fetchData = async () => {
      const fetchedRooms = await getAllRooms();
      console.log(fetchedRooms)
      setRooms(fetchedRooms);
    };

    fetchData();
  }, []);


  const updateRooms = async (data) => {
    console.log(data);
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const adminId = JSON.parse(user).id;

    console.log(data.socialMedia);
    const url = `http://localhost:3000/api/v1/rooms/`;

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    if (response.status === 200) {
      alert("Rooms Updated Successfully");
    }
    if (response.status === 500) {
      alert(result.error);
    }
  };

  return (
    <div className="dashboard">
      <Aside />
      <div className="dashboard-container">
        <div className="dashboard_rooms_container">
          <div className="dashboard_container_header">
            {rooms &&
              rooms.data.map((room) => {
                return (
                  <div className="room" key={room.id} onClick={()=>setRoomId(roomId)}>
                    {" "}
                    <p>room number: {room.roomNum}</p>
                    <p>room type: {room.types}</p>
                    <p>room price: {room.price}</p>
                    <p>room description: {room.description}</p>
                    <p>room aminities: {room.aminities}</p>
                    <p>room.images: {room.images}</p>
                    <p>room.view: {room.view}</p>
                    <p>{roomId? "room Id: roomId? roomId" : ""}</p>
                    <hr />
                    <br />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
