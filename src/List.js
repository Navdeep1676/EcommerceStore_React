import React from 'react';

function List(props) {
    return (
        <div>
            {
                props.item.map(i=>{
                    return<div className='bg-warning ps-1  py-1 my-2 rounded-3 d-flex justify-content-between' key={i.id}>
                        <p className='fw-bold text-white pt-2 ps-1'>{i.title}</p>
                       <div className='mt-1'>
                       <button className='mx-1 btn btn-danger fw-bold' onClick={()=>{props.editItem(i.id)}}>Edit</button>
                        <button className='mx-1 btn btn-danger fw-bold' onClick={()=>props.remItem(i.id)}>Delete</button>
                       </div>
                    </div>
                })
            }
        </div>
    );
}

export default List;