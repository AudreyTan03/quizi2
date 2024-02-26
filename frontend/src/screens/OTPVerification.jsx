import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { VerifyOtp } from '../actions/userActions';
import { useLocation } from 'react-router-dom';

function OTPVerification() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Extract user_id and otp_id from the query string
            const queryParams = new URLSearchParams(window.location.search);
            const user_id = queryParams.get('user_id');
            const otp_id = queryParams.get('otp_id');
            
            // Dispatch OTP verification action
            const response = await dispatch(VerifyOtp(user_id, otp_id, otp)); 
            
            // Check if OTP verification was successful
            if (response.success) {
                console.log('OTP verified successfully'); // Log success message
                // Redirect to login page upon successful verification
                navigate('login/');
            } else {
                // Handle unsuccessful verification
                setError(response.error); // Assuming your response contains an error message
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };
    
    return (
        <div>
            <h1>OTP Verification</h1>
            <p>Enter OTP</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p>{error}</p>} {/* Display error message if there's any */}
        </div>
    );
}

export default OTPVerification;
