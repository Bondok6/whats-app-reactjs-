import React ,{Component} from 'react';
import * as actions from '../../store/index'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Logout extends Component {
    componentDidMount(){
        this.props.onLogout();
    }
   
    render(){
        return <Redirect to="/auth" />
    }
}

const mapDispatchToProps=dispatch=>{
    return{
       onLogout:()=>dispatch(actions.logout())    
    }
}
export default connect(null,mapDispatchToProps)(Logout)
 