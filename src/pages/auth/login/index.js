import React, {useState} from "react";
import {Button, Form} from 'react-bootstrap'
import {connect} from "react-redux";
import {loginApi} from "../../../services/login";
import {Redirect, useHistory} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {selectToken} from "../../../redux/actions/user_selector";
import {setPersonalData, setUserToken} from "../../../redux/actions/userAction";
// import {setCurrentUser, setUsersData} from "../../../redux/actions/userAction";
const style={
    textAlign:'center',
    marginTop:'200px'
}
const Login = ({setTokenn,setpersonal}) =>{
    const history = useHistory();
    const [data,setData] = useState({login:"",password:""});
    const [succes,setSuccess] = useState(false)
    const login= (e)=>{
        e.preventDefault();
        loginApi.signin(data)
            .then(res=>{
                    setSuccess(true);
                    console.log("res",res)
                    setTokenn(res.data.token)
                    setpersonal(res.data.user);
                    localStorage.setItem('token',res.data.token);
            })
    }
    return(
        <div style={style}>
            <h1>login page</h1>
            <Form style={{display:'inline-grid'}} onSubmit={e=>login(e)}>
                <Form.Group>
                    <Form.Label>
                        <Form.Control
                            id="login"
                            type = 'text'
                            placeholder = "login"
                            onChange={e => setData({...data,login: e.target.value})}
                            required
                            style={{marginBottom:'2px'}}
                        />
                        <Form.Control
                            id="password"
                            type = 'text'
                            placeholder = "password"
                            onChange={e => setData({...data,password: e.target.value})}
                            required
                        />

                    </Form.Label>
                </Form.Group>
                    <Button className={'btn btn-info'} type={'submit'}>submit</Button>
                {succes?<Redirect to={"/product"}/>:""}
            </Form>
        </div>
    )
}
const mstp = createStructuredSelector({

})
const mdtp = dispatch =>({
    setTokenn:(token)=>dispatch(setUserToken(token)),
    setpersonal:data=>dispatch(setPersonalData(data))
})
export default connect(mstp,mdtp) (Login);




