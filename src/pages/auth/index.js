import React from "react";
import {Redirect, Route,Switch} from "react-router-dom";
import Login from "./login";

const Auth=()=>{
    return (
        <>
                <Route path = '/login'><Login/></Route>
                <Route render={() => <Redirect to="/login" />}></Route>
        </>
    )
}

export default Auth;



