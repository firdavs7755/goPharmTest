import React, {useEffect, useState} from "react";
import {data} from './data/users.json'
import {connect, useDispatch, useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectPersonalData, selectToken} from "./redux/actions/user_selector";
import {Redirect, Route, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from "./pages/auth";
import Product from "./pages/simpleData";
import {store} from "./redux/store";
import {setPersonalData, setUserToken} from "./redux/actions/userAction";
import {axiosInstance} from "./services/api";

const ForAuthenticatedUsers=()=>{
    return(
        <>
            {/*<Switch>*/}
                <Route exact={true} path={'/product'} render={()=><Product/>}/>
                <Route render={() => <Redirect to="/product" />}></Route>
                {/*<Route path={'/product'} render={()=><Product/>}/>*/}
                {/*<Route path={'/data'} render={()=><News/>}/>*/}
            {/*</Switch>*/}
        </>
    )
}


function App({user_list,setdata,token,personal,setOne}) {
    // const[isToken,setIsToken] = useState('');
    axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + token;
    // const checkToken = () =>{
    //     let TOKEN = localStorage.getItem('token');
    //     if (TOKEN){
    //         setIsToken(TOKEN)
    //     }
    // }
    // useEffect(()=>{
    //    checkToken();
    // },[]);
    return (
        <Switch>
            {
                // localStorage.getItem('token')?<ForAuthenticatedUsers/>:<Auth/>
                token?<ForAuthenticatedUsers/>:<Auth/>
                // (localStorage.getItem('token')||token)?<ForAuthenticatedUsers/>:<Auth/>
            }
        </Switch>
  );
}

const mstp = createStructuredSelector({
    token: selectToken,
})
const mdtp = dispatch =>({
    // setTokenn:(token)=>dispatch(setUserToken(token)),
    // setpersonal:data=>dispatch(setPersonalData(data))
})
export default connect(mstp,mdtp) (App);
