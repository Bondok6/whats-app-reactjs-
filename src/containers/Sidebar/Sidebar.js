import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import { IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "../../components/SidebarChat/SidebarChat";
import SidebarContact from "../../components/SidebarContact/SidebarContact";
import { connect } from "react-redux";
import * as actions from "../../store/index";
import Spiner from "../../components/Spiner/Spiner";

function Sidebar({
  contacts,
  checkedContacts,
  socket,
  userId,
  rooms,
  fetchRooms,
  token,
  clearContacts,
  photo,
  loading,
  searchRoom,
  serached
}) {
  useEffect(() => {
    if (socket) {
      socket.on("join-success", (r) => {
        //2
        socket.emit("join-room", r);
        fetchRooms(token);
      });
    }
  }, [socket, fetchRooms, token]);
  

  const [show, setShow] = useState(false);
  function addRoom() {
    var room = document.querySelector("#room__name");

    const friends = checkedContacts.concat(parseInt(userId));
    socket.emit("new-room", room.value, friends); //1
    setShow(false);
    clearContacts();
  }

  let cons = (
    <div className="sidebar__chats">
      {serached.length>0 ? serached.map((room) => {
        return <SidebarChat recieved={room.name} key={room.id} id={room.id} />;
      }):rooms.map((room) => {
        return <SidebarChat recieved={room.name} key={room.id} id={room.id} />;
      })}
    </div>
  );

  if (loading) {
     cons = <Spiner />;
  }

  if (show) {
    cons = (
      <div className="sidebar__contacts">
        {contacts.map((element) => {
          return (
            <SidebarContact
              name={element.username}
              id={element.id}
              photo={element.photo}
              key={element.id}
            />
          );
        })}
      </div>
    );
  }
  let sub = null;
  if (show) {
    sub = (
      <>
        <div id="name"> Chat Name: </div> <input type="text" id="room__name" />
        <button onClick={addRoom} id="submit__room">
          {" "}
          Submit{" "}
        </button>
      </>
    );
  }


  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={photo} alt="s" />
        <div className="sidebar__headerRight">
         
          <IconButton onClick={() => setShow(!show)}>
            <ChatIcon />
          </IconButton>
        
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" onChange={e=>{
             searchRoom(e.target.value,rooms)
          }} />
        </div>
      </div>

      {cons}
      {sub}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    checkedContacts: state.contacts.checkedContacts,
    userId: state.auth.userId,
    rooms: state.rooms.rooms,
    token: state.auth.token,
    photo: state.auth.photo,
    loading: state.rooms.loading,
    serached:state.rooms.serached
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRooms: (token) => dispatch(actions.fetchRooms(token)),
    clearContacts: () => dispatch(actions.clearContact()),
    searchRoom:(begain,rooms)=>dispatch(actions.searchRoom(begain,rooms))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
