const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:4000/api/v1';

async function sendOtp() {
    try {
        const response = await fetch(`${BASE_URL}/auth/sendotp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'test@example.com'
            })
        });

        const data = await response.json();
        console.log('Send OTP Response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

sendOtp();
