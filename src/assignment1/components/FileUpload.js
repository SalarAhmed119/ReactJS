// import area
import React, { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './Login';

export const FileUpload = () => {
    // 1. states/hook variables
    const [file, setFile] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [user, setUser] = React.useState({
        isLoggedIn: false,
    });

    const progressStyle = {
        width: progress ? `${progress}%` : '0%',
        opacity: 1 // Ensure opacity is set correctly
      };

    // useEffect
    useEffect(() => {
        let jwt = localStorage.getItem("jwt");
        if (jwt)
           setUser({ ...user, isLoggedIn: true, "jwt": jwt});
    }, []);

    // 2. methods/functions

    // handle form data
    const handleFormData = async (e) => {
        e.preventDefault();
        // create an object
        const data = new FormData();
        data.append('files', file); // Ensure this matches backend key
        // try catch block
        try {
            // show progress bar
            // send the request
            const res = await axios.post('http://localhost:1337/api/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json',
                    'Authorization': `Bearer ${user.jwt}`
                },
                onUploadProgress: (progressEvent) => {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                }
            });
            toast("Image Uploaded");
        } catch (error) {
            toast.error("Error uploading image");
        }
    };

    const logout = () => {
        localStorage.removeItem("jwt");
        setUser({...user, isLoggedIn: false});
        toast("Logged out successfully");
    };

    // 3. return statement/JSX function
    return (
        <>
            {user.isLoggedIn ? (
                <div className='row m-0'>
                    <div className='col-6 offset-3'>
                        <h1>File Upload using axios</h1>
                        <form onSubmit={handleFormData}>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Upload only images:</label>
                                <input 
                                    onChange={(e) => setFile(e.target.files[0])} 
                                    className="form-control" 
                                    type="file" 
                                    name='file' // Ensure this matches backend key
                                    accept='image/*' 
                                    id="formFile" 
                                />
                            </div>
                            <button type='submit' className='btn btn-success w-100'>Submit</button>
                        </form>
                        <div className="progress mt-3" style={progressStyle} role="progressbar" aria-label="Example with label" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                            <div className="progress-bar" style={{width: progress + '%'}}>{`${progress}%`}</div>
                        </div>
                        <button onClick={logout} className='btn btn-primary w-100 mt-5'>Logout</button>
                    </div>
                </div>
            ): (<Login />)}
            <ToastContainer />
        </>
    );
};