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
                if (res.status!==200){
                    console.log('xxxx.......')
                }else {
                    setSuccess(true);
                    console.log("res",res)
                    setTokenn(res.data.token)
                    setpersonal(res.data.user);
                    localStorage.setItem('token',res.data.token);
                }
                    // history.push('/product')
                // <Redirect to={'/product'}/>
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
                            // value={data.serial_number}
                            required
                            style={{marginBottom:'2px'}}
                        />
                        <Form.Control
                            id="password"
                            type = 'text'
                            placeholder = "password"
                            onChange={e => setData({...data,password: e.target.value})}
                            // value={data.serial_number}
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
    // token: selectToken
})
const mdtp = dispatch =>({
    setTokenn:(token)=>dispatch(setUserToken(token)),
    setpersonal:data=>dispatch(setPersonalData(data))
})
export default connect(mstp,mdtp) (Login);




