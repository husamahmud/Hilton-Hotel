import React, { useEffect } from "react";
import "../../dashboard/dashboard.css";
import { useState } from "react";
import { RoomByNumber } from "./RoomByNumber";

export function AllRooms() {

  const [rooms, setRooms] = useState(null);
  const [room, setRoom] = useState(null);
  const [roomView, setRoomView] = useState(false);

  const getRoomById = async (roomId) => {
    const token = localStorage.getItem("token");

    const url = `http://localhost:3000/api/v1/room/${roomId}`;

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
    return result;
  };

  console.log("from id ", room);
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
      setRooms(fetchedRooms.data);
    };

    fetchData();
  }, []);

  console.log(rooms);

  return (
    <div className="dashboard_room_body">
      <div style={{ width: "100%", display: "flex", gap: "3rem" }}>
        {rooms && (
          <div style={{ width: roomView ? "25%" : "100%" }}>
            <div style={{marginBottom:"2rem"}}>
              {rooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => {
                    setRoomView(true);
                    getRoomById(room.id);
                  }}
                  style={{ cursor: "pointer", display: "inline-flex", marginBottom:"2rem", border:roomView? "1px solid #ccc": "none", padding: "1rem"}}
                >
                  <div style={{ display: "flex", gap: "1rem", width: roomView ?"90%": "100%" }}>
                    <img
                      src={room.images[0]}
                      alt="room"
                      style={{
                        width: roomView ? "220px":"300px",
                        height: roomView ?"150px":"210px",
                        marginRight: "1rem",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap:roomView? "1.5rem" : "unset",
                        justifyContent:"space-evenly"
                      }}
                    >
                      {roomView?
                      (
                      <h4>Nu. {room.roomNum}</h4>
                      )
                      :
                      (
                      <h2>Room Nu. {room.roomNum}</h2>
                      )}
                      <p> Price: {room.price}$</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr />
          </div>
        )}
        {room && roomView && (
         <div style={{ position: "relative", width: roomView ? "70%" : "0", margin:"1rem" }}>
         <span
           style={{
             position: "absolute",
             top: "0",
             right: "0",
             padding: "0.5rem",
             cursor: "pointer",
             fontSize: "1.5rem",
             borderRadius: "50%",
             zIndex: "1",
           }}
           onClick={() => setRoomView(false)}
         >
           &times;
         </span>
         {/* RoomByNumber component */}
         <RoomByNumber room={room} />
       </div>
        )}
      </div>
    </div>
  );
}
