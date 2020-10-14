import { Avatar } from '@material-ui/core'
import React,{useState} from 'react'
import * as actions from '../../store/index';
import {connect} from 'react-redux'
import './SidebarContact.css'

function SidebarChat({pushCons,popCons,name,photo,id}) {

 
     const [checked,setChecked]=useState(false);
     function add(){
         setChecked(!checked)
         if(!checked){
            pushCons(id)
         }else{
            popCons(id)
         }
     };

    var classes=["fa fa-check-circle none"];
    var classes2=["sidebarContact" ]
    if(checked){
         classes=["fa fa-check-circle dis"];
         classes2=["sidebarContact active" ]
    }
    return (
        <div className={classes2} onClick={()=>add()}>
            <Avatar src={photo} />
            <div className="sidebarContact__info">
            <i className={classes}></i>
                <h2>{name}</h2>
            </div>
        </div>
    )
}
const mapStateToProps=state=>{
    return{
        checkedContacts:state.contacts.checkedContacts
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        popCons:(contact)=>dispatch(actions.popContact(contact)),
        pushCons:(contact)=>dispatch(actions.pushContact(contact))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SidebarChat)
