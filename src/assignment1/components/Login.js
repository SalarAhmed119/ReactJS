// Import area
import React, { useEffect } from 'react';
import axios from 'axios';
import { FileUpload } from './FileUpload';

export const Login = () => {
    // State/hook variables
    const [user, setUser] = React.useState({
        identifier: '',
        password: ''
    }); 
    const [userLoggedIn, setUserLoggedIn] = React.useState(false);

    // useEffect hook
    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            setUserLoggedIn(true);
        }
    }, []);

    // Handle input data
    const handleData = (e) => {
        const { classList, value } = e.target;
        if (classList.contains("identifier")) {
            setUser({ ...user, identifier: value });
        } else if (classList.contains("password")) {
            setUser({ ...user, password: value });
        }
    };

    // Handle form submission
    const handleForm = async (e) => {
        e.preventDefault();
        try {
            // Send request to the server
            const res = await axios.post('http://localhost:1337/api/auth/local', user, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            // Check if JWT is available
            if (res.data.jwt) {
                localStorage.setItem("jwt", res.data.jwt);
                setUserLoggedIn(true); // Set userLoggedIn to true after successful login
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Return statement/JSX function
    return (
        userLoggedIn ? (
            <FileUpload />
        ) : (
            <div className='row m-0'>
                <div className='col-6 offset-3'>
                    <h1 className='text-center mt-2'>Login Page</h1>
                    <form onSubmit={handleForm}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input 
                                onChange={handleData} 
                                type="email" 
                                className="identifier form-control" 
                                id="email" 
                                name='identifier' 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                onChange={handleData} 
                                type="password" 
                                className="password form-control" 
                                id="password" 
                                name='password' 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
            </div>
        )
    );
};