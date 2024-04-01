//import area
import React, { useState } from 'react'
import swal from 'sweetalert';

//react functional component
export default function Register() {
    //1. state/variables
    const [username, SetUsername] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    //2. functions/methods

    let savedData=()=>{
        var data = {
            "data": {
              "username": username,
              "email": email,
              "password": password
            }
          }
        fetch('http://localhost:1337/api/friends',{
            method:"POST",
            headers:{
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((data)=>{
            swal("Good job!", "You Data is Saved!", "success");
        })
        .catch((error)=>{
            swal("Error", "Something Went Wrong", "error");
        })
        .finally();
    }

    //3. return statement
  return (
        <div className='row'>
            <div className='col-6 offset-3 mt-5'>
            <h1 className='text-center'>Registration Form</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input autoFocus value={username} onChange={(e)=>{ SetUsername(e.target.value) }} type="text" className="form-control" id="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input value={email} onChange={(e)=>{ SetEmail(e.target.value) }} type="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input value={password} onChange={(e)=>{ SetPassword(e.target.value) }} type="password" className="form-control" id="password" />
                    </div>
                    <button onClick={()=>{ savedData(); }} type="button" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    )
}
