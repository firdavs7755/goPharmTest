import React from "react";
import {Button} from "react-bootstrap";
import {createStructuredSelector} from "reselect";
import {selectData, selectPersonalData} from "../../redux/actions/user_selector";
import {logOut, setData} from "../../redux/actions/userAction";
import {connect} from "react-redux";
const hStyle={
    background:'rgba(70,114,173,0.58)'
}
function Header({personal,signOut}) {
    function logOut() {
        signOut();
        localStorage.removeItem('token')
    }
    return(
        <>
            <div style={hStyle} className={'d-flex justify-content-between'}>
                <div>
                    {console.log('perso',personal)}
                </div>
                <div className={'d-flex justify-content-between'} style={{alignItems:'center',marginRight:'13px'}}>
                    <h5 style={{marginRight:'20px'}}>{personal?.first_name+' '+personal.last_name}</h5>
                    <Button onClick={()=>logOut()}>logout</Button>
                </div>
            </div>
        </>
    )
}
const mstp = createStructuredSelector({

})
const mdtp = dispatch =>({
    signOut:()=>dispatch(logOut())
})
export default connect(mstp,mdtp) (Header);