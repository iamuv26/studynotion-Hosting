const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:4000/api/v1';

async function completeSignup() {
    try {
        const response = await fetch(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                password: 'password',
                confirmPassword: 'password',
                accountType: 'Student',
                otp: '542033' // OTP retrieved from logs
            })
        });

        const data = await response.json();
        console.log('Signup Response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

completeSignup();
