import React, { useState } from 'react'
import swal from 'sweetalert';

export default function App() {
  //1. state/variable
  const [studentName, setStudentName] = useState('');
  //2. functions/methods
  let savedStudent = ()=>{
    console.log(studentName);

    var data = {
      "data": {
        "name": studentName,
        "strapi_stage": "string or id",
        "strapi_assignee": "string or id"
      }
    }

    fetch('https://successful-authority-993a867ae8.strapiapp.com/api/students',{
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    })
    .then((d)=>{
      if(d.status == 200){
        swal("Good job!", "Student Created Successfully", "success");
      }
    })
    .catch((e)=>{
      alert(e);
    });
  }
  //3. return statement
  return (
    <div>
      <form>
        <label>Enter your name:</label> <br/>
        <input type='text' onChange={(e)=>{ setStudentName(e.target.value) }} value={studentName}/> <br/>
        <input type='button' onClick={savedStudent} name='studentName' value='Saved Student' />
      </form>
    </div>
  )
}
