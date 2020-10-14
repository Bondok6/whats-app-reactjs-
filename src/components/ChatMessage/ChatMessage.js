import React from 'react'
import './ChatMessage.css'
import {connect} from 'react-redux'

function ChatMessage(props) {
    return (
        <p key={props.id} className={props.sender===parseInt(props.userId) ? 'chat__message chat__reciever' : 'chat__message'}>
            <span className="chat__name">{props.message}</span>
            {props.message}
            <span className="chat__timestamp">{props.timestamp}</span>
        </p>
    )
}
const mapStateToProps=state=>{
    return{
        userId:state.auth.userId
    }
}

export default connect(mapStateToProps)(ChatMessage)
