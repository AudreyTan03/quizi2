import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { verifyOtp } from '../actions/userActions';
// import verifyOTP from '../actions/userActions'
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
            const queryParams = new URLSearchParams(window.location.search);
            const user_id = queryParams.get('user_id');
            const otp_id = queryParams.get('otp_id');
            console.log(user_id, otp_id, otp);
            const response = await dispatch(verifyOtp(user_id, otp_id, otp));
            console.log(response);
            if (response) {
                console.log('redirect');
                navigate('/login');
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
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default OTPVerification;
