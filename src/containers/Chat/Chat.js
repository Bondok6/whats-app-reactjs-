import { Avatar, Button, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon } from "@material-ui/icons";
import { connect } from "react-redux";
import { chatMessage } from "../../utils/shared";
import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import MicIcon from "@material-ui/icons/Mic";
import MicRecorder from "mic-recorder-to-mp3";
import StopIcon from "@material-ui/icons/Stop";
import * as actions from "../../store/index";
import Axios from "../../axios";
import WithErrorHanler from "../../components/withErrorHandler/withErrorHandler";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import Spiner from "../../components/Spiner/Spiner";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
function Chat({ socket, userId, id, room, loadRoom, roomName, friends }) {
  const chosenEmoji = useRef([]);
  const emoj = useRef();
  const ida = useRef();
  const isRecord = useRef();
  const [isBlocked, setIsBlocked] = useState(false);
  const photo = useRef(null);
  const audi = useRef(null);
  const emoji = useRef();
  const micStart = useRef();
  const micStop = useRef();
  const inImage = useRef();
  const send = useRef();
  const photoSender = useRef();
  const setId = useRef();
  const voiceSender = useRef();
  const setIdVoice = useRef();
  const smsId = useRef();

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        setIsBlocked(false);
      },
      () => {
        setIsBlocked(true);
      }
    );
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    var sms = document.querySelector("#sms");
    const formData = new FormData();

    if (audi.current) {
      formData.append("audio", audi.current);
      formData.append("setId", setIdVoice.current);
      let body = document.querySelector("#body");
      let p = chatMessage(
        voiceSender.current,
        true,
        "voice",
        setIdVoice.current
      );
      body.append(p);
      send.current.style.display = "none";
      inImage.current.style.display = "inline-block";
      emoji.current.style.display = "inline-block";
      ida.current.style.display = "inline-block";
    } else if (photo.current) {
      formData.append("photo", photo.current);
      formData.append("setId", setId.current);
      let body = document.querySelector("#body");
      let p = chatMessage(photoSender.current, true, "img", setId.current);
      body.append(p);
      send.current.style.display = "none";
      inImage.current.style.display = "none";
      micStart.current.style.display = "inline-block";
      emoji.current.style.display = "inline-block";
      ida.current.style.display = "inline-block";
    } else {
      formData.append("message", sms.value);
      formData.append("setId", smsId.current);
      let body = document.querySelector("#body");
      let p = chatMessage(sms.value, true, "sms", smsId.current);
      body.append(p);
      micStart.current.style.display = "inline-block";
      inImage.current.style.display = "inline-block";
    }
    formData.append("sender", userId);
    formData.append("room", id);
    console.log(sms.value,userId,id)
    sms.value ? socket.emit("message",sms.value, userId, id) : Axios.post("/message", formData);
  
    sms.value = "";
    var imgtag = document.getElementById("img");
    imgtag.setAttribute("class", "hidden");
    audi.current = null;
    photo.current = null;
    body.scrollTo({ top: 10000000000000, behavior: "smooth" });
  };

  useEffect(() => {
    if (socket) {
      socket.on("sent", (data, sender, r, id) => {
        if (
          data.endsWith("png") ||
          data.endsWith("jpg") ||
          data.endsWith("PNG") ||
          data.endsWith("JPG")
        ) {
          if (inImage.current) {
            inImage.current.style.display = "inline-block";
          }
          if (id && setId.current) {
            if (id.toString() === setId.current.toString()) {
              let im = document.querySelector(`.${id.toString()}`);

              return im.setAttribute("style", "background-color:#dcf8c6");
            }
          }
        } else if (data.endsWith("mp3") || data.endsWith("wav")) {
          if (micStart.current) {
            micStart.current.style.display = "inline-block";
          }
          if (id && setIdVoice.current) {
            if (id.toString() === setIdVoice.current.toString()) {
              let im = document.querySelector(`.${id.toString()}`);
              return im.setAttribute("style", "background-color:#dcf8c6");
            }
          }
        } else {
          /*  if (smsId.current) {
            if (id.toString() === smsId.current.toString()) {
              
              let im = document.querySelector(`.${id}`);
              return im.setAttribute("style", "background-color:#dcf8c6");
            }else{ */
         /*  let im = document.querySelector(`.${id}`);
          console.log(im);
          if (im) {
            im.setAttribute("style", "display:none");
          } */
          if(userId !== sender){
            let recieved = false;
          /*   recieved = userId === sender ? true : false; */
            var body = document.querySelector("#body");
            let p = chatMessage(data, recieved, "", id);
            body.append(p);
          }

          /*  } */
          /* } */
        }
      });
    }
  }, [socket, userId]);

  let rs = null;

  if (loadRoom) {
    console.log("hehe"); //lsaaaaaaaaaaaaaaa
    rs = <Spiner />;
  }

  if (room.length !== 0) {
    if (room.docs) {
      var b1 = document.querySelector("#body");
      var body = document.createElement("div");
      body.setAttribute("class", "chat__body");
      body.setAttribute("id", "body");
      if (b1) {
        b1.parentNode.replaceChild(body, b1);
        rs = room.docs.map((r) => {
          let recieved = false;
          recieved = parseInt(userId) === r.sender ? true : false;

          body.scrollTo({ top: 100000, behavior: "smooth" });

          return body.append(chatMessage(r.message, recieved, r.id));
        });
      }
    }
  }
  const start = () => {
    var voice = document.querySelector(".start"),
      end = document.querySelector(".end");
    voice.setAttribute("id", "hidden");
    end.setAttribute("id", "");
    inImage.current.style.display = "none";
    emoji.current.style.display = "none";
    ida.current.style.display = "none";
    micStart.current.style.display = "none";
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          /*  setIsRecording(true); */
          isRecord.current = true;
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    var voice = document.querySelector(".start"),
      end = document.querySelector(".end");
    voice.setAttribute("id", "");
    end.setAttribute("id", "hidden");
    send.current.style.display = "inline-block";

    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        isRecord.current = false;

        const blobURL = URL.createObjectURL(blob);
        voiceSender.current = blobURL;

        let s = new Date().getTime().toString();
        setIdVoice.current = `b${s}c`;
        const file = new File(buffer, "me-at-thevoice.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        audi.current = file;
      })
      .catch((e) => console.log(e));
  };

  const onEmojiClick = (event, emojiObject) => {
    chosenEmoji.current = [...chosenEmoji.current, emojiObject];
    ida.current.value +=
      chosenEmoji.current[chosenEmoji.current.length - 1].emoji;
    if (ida.current.value) {
      micStart.current.style.display = "none";
      inImage.current.style.display = "none";
    } else {
      micStart.current.style.display = "inline-block";
      inImage.current.style.display = "inline-block";
    }
  };

  const openEmoji = () => {
    const span = emoj.current;
    span.style.visibility = span.style.visibility === "hidden" ? "" : "hidden";
  };

  const inText = (e) => {
    if (e.target.value) {
      micStart.current.style.display = "none";
      inImage.current.style.display = "none";
    } else {
      micStart.current.style.display = "inline-block";
      inImage.current.style.display = "inline-block";
    }
  };

  let foot = null;
  if (id) {
    foot = (
      <div className="chat__footer">
        <form>
          <div ref={emoji}>
            <div className="emoji" ref={emoj} style={{ visibility: "hidden" }}>
              <Picker
                onEmojiClick={onEmojiClick}
                skinTone={SKIN_TONE_MEDIUM_DARK}
              />
            </div>
            {/*  <div ref={ida}></div> */}
            <IconButton onClick={openEmoji}>
              <InsertEmoticon />
            </IconButton>
          </div>
          <input
            placeholder="Type a message"
            type="text"
            id="sms"
            ref={ida}
            onChange={inText}
          />
          <button
            onClick={(event) => {
              event.preventDefault();
/*               let s = new Date().getTime().toString();
              smsId.current = `ma${s}`; */
              return sendMessage(event);
            }}
            type="submit"
          >
            Send a message
          </button>

          <button onClick={sendMessage} type="submit" ref={send}>
            Send
          </button>

          <MicIcon className="start" onClick={start} ref={micStart}></MicIcon>

          <StopIcon
            className="end"
            id="hidden"
            onClick={stop}
            ref={micStop}
          ></StopIcon>

          {photo ? (
            <>
              <img
                id="img"
                alt="ss"
                style={{ borderRadius: "50%", width: "62px", height: "55px" }}
                className="hidden"
              />
              <Button
                ref={inImage}
                variant="contained"
                component="label"
                style={{ borderRadius: "50%" }}
              >
                <AttachFile />
                <input
                  id="phoo"
                  type="file"
                  style={{ display: "none" }}
                  onInput={(event) => {
                    if (event.target.files[0]) {
                      photo.current = event.target.files[0];
                      var selectedFile = event.target.files[0];
                      var reader = new FileReader();
                      var imgtag = document.getElementById("img");
                      imgtag.classList.remove("hidden");

                      imgtag.title = selectedFile.name;
                      reader.onload = function (event) {
                        imgtag.src = event.target.result;
                        photoSender.current = event.target.result;
                        let s = new Date().getTime().toString();
                        setId.current = `a${s}`;
                      };
                      reader.readAsDataURL(selectedFile);
                    }
                    // console.log(event.target.files[0],photo.current)
                    if (event.target.files[0]) {
                      micStart.current.style.display = "none";
                      emoji.current.style.display = "none";
                      ida.current.style.display = "none";
                      send.current.style.display = "inline-block";
                    }
                  }}
                />
              </Button>
            </>
          ) : (
            <Button
              ref={inImage}
              variant="contained"
              component="label"
              style={{ borderRadius: "50%" }}
            >
              <AttachFile />
              <input
                type="file"
                style={{ display: "none" }}
                onInput={(event) => {
                  photo.current = event.target.files[0];
                  var selectedFile = event.target.files[0];
                  var reader = new FileReader();
                  var imgtag = document.getElementById("img");
                  imgtag.title = selectedFile.name;
                  console.log("geg");
                  reader.onload = function (event) {
                    imgtag.src = event.target.result;
                    photoSender.current = event.target.result;
                    setId.current = new Date().getTime();
                  };
                  reader.readAsDataURL(selectedFile);

                  if (event.target.files[0]) {
                    console.log("hereaaa");
                    micStart.current.style.display = "none";
                    emoji.current.style.display = "none";
                    ida.current.style.display = "none";
                    send.current.style.display = "inline-block";
                  }
                }}
              />
            </Button>
          )}
        </form>
      </div>
    );
  }

  let content = <Spiner />;
  if (!loadRoom) {
    content = (
      <div className="chat__body" id="body">
        {rs}
      </div>
    );
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3> {roomName ? roomName : "Welcome"} </h3>
          <p>
            {" "}
            {friends
              ? "Members : " + friends.map((friend) => friend.username + "  ")
              : ""}
          </p>
        </div>
        <div className="chat__headerRight"></div>
      </div>

      {content}

      {foot}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    userId: state.auth.userId,
    id: state.rooms.id,
    room: state.rooms.room,
    token: state.auth.token,
    loadRoom: state.rooms.loadRoom,
    roomName: state.rooms.roomName,
    friends: state.rooms.friends,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    message: (photo) => dispatch(actions.message(photo)),
  };
};

export default WithErrorHanler(
  connect(mapStateToProps, mapDispatchToProps)(Chat),
  Axios
);
