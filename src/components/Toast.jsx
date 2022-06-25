import React, { useEffect, useRef } from 'react';

const Toast = ({ text, dispatch }) => {

    const toastRef = useRef(null)

    useEffect(()=>{
        if(text!==""){
            toastRef.current?.classList.add("visible");
            setTimeout(()=>{
                toastRef.current?.classList.remove("visible");
                dispatch({type:"set_toast_text", payload:""})
            },5000)
        }
    },[text])

    return <h4 ref={toastRef} className='toast'>{text}</h4>
}

export default Toast;