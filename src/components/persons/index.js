import React, {useEffect} from "react";
import {connect} from "react-redux";
import {store} from '../../redux/store'
function Person({get}) {
    useEffect(()=>{
        get();
    },[]);
    return(
        <>
            {/*{console.log('userrrrrs',users)}*/}
            person
        </>
    )
}
const mstp=(state)=>{
    return ({
        get:()=>console.log('person',store.getState())
    })
}
export default connect(mstp,null)(Person);