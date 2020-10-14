import { Avatar } from '@material-ui/core'
import React from 'react'
import * as actions from '../../store/index'
import {connect} from 'react-redux'
import './SidebarChat.css'

function SidebarChat({image,recieved,token,fetchRoom,id}) {
  const  fetcher=(token,id)=>{
    fetchRoom(token,id);
    }
    return (
        <div onClick={()=>{fetcher(token,id)}} className="sidebarChat">
            <Avatar src={image ? image :""} />
            <div className="sidebarChat__info">
                <h2>{recieved ? recieved :"name"}</h2>
                <p>This is the last message</p>
            </div>
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        token:state.auth.token
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        fetchRoom:(token,id)=>dispatch(actions.fetchRoom(token,id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SidebarChat) ;
