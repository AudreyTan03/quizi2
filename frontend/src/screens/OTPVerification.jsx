import React, { useState, useRef } from 'react'; // Import useRef
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
    const inputRefs = useRef([]); // Define inputRefs using useRef

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

    const handleChange = (value, index) => {
        setOtp((prevOtp) => {
            const updatedOtp = prevOtp.substring(0, index) + value + prevOtp.substring(index + 1);
            if (value && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            } else if (!value && inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
            }
            return updatedOtp;
        });
    };

    return (
        <div>
            <h1>OTP Verification</h1>
            <p>Enter OTP</p>
            <form onSubmit={handleSubmit}>
                <div className="otp-container">
                    {[...Array(6)].map((_, index) => (
                        <input
                            key={index}
                            type="number"
                            value={otp[index] || ''}
                            onChange={(e) => handleChange(e.target.value, index)}
                            maxLength="1"
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="otp-input"
                        />
                    ))}
                </div>
                <button type="submit" disabled={otp.length !== 6}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default OTPVerification;
