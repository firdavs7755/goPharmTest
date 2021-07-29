import React, {useEffect, useState} from "react";
// import './index.css'
import './App.scss'
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
            <Route exact={true} path={'/product'} render={()=><Product/>}/>
            <Route render={() => <Redirect to="/product" />}></Route>
        </>
    )
}


function App({user_list,setdata,token,personal,setOne}) {
    axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + token;
    return (
        <Switch>
            {
                token?<ForAuthenticatedUsers/>:<Auth/>
            }
        </Switch>
  );
}

const mstp = createStructuredSelector({
    token: selectToken,
})
const mdtp = dispatch =>({

})
export default connect(mstp,mdtp) (App);
