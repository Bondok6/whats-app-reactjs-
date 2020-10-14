import React, { useEffect, useState } from "react";
import Chat from "../Chat/Chat";
import Sidebar from "../Sidebar/Sidebar";
import io from "socket.io-client";
import * as actions from "../../store/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
function Whatsapp({ userId, fetchContacts, contacts, fetchRooms, token }) {
  const [socket, setRes] = useState();

  useEffect(() => {
    fetchContacts(token);
  }, [fetchContacts, token]);

  useEffect(() => {
    fetchRooms(token);
  }, [token, fetchRooms]);

  useEffect(() => {
    var s = io.connect(`${process.env.REACT_APP_BASE_URL}`);
    setRes(s);
    s.emit("join", userId); //update the sicket id in db  && join to my rooms
    s.on("sending", (msg) => {});
  }, [userId]);

  return (
    <>
      <div style={{ backgroundColor: "#dadbd3", textAlign: "right" }}>
        <Link to="/logout" style={{ color: "black", marginRight: "5%" }}>
          {" "}
          Logout{" "}
        </Link>
      </div>
      <div className="app">
        <div className="app__body">
          <Sidebar contacts={contacts} socket={socket} />
          <Chat socket={socket} />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.contacts,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContacts: (userId) => dispatch(actions.fetchContacts(userId)),
    fetchRooms: (token) => dispatch(actions.fetchRooms(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Whatsapp);
