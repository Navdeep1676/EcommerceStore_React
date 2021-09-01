import React, { useEffect } from 'react';

function Alert({type,msg,removeAlert,list}) {
    useEffect(()=>{
        const timeout=setTimeout(()=>{
            removeAlert()
        },3000)
        return ()=>{
            clearTimeout(timeout)
        }
    },[list])
    return (
        <div className='d-block'>
            <p className={` bg-${type} text-center text-white fw-bold rounded-3`}>{msg}</p>
        </div>
    );
}

export default Alert;<h1>Alert Component</h1>