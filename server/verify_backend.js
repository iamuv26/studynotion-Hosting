const fetch = require('node-fetch'); // Assuming node-fetch is available or using built-in fetch in newer node
// If node-fetch is not available, we might need to install it or use http
// checking if global fetch exists
const fetchAPI = global.fetch || require('node-fetch');

require("dotenv").config();
const BASE_URL = process.env.BASE_URL || 'http://localhost:4000/api/v1';

async function verifyBackend() {
    console.log('Starting Backend Verification...');

    // 1. Test Health Check
    try {
        const baseUrlRoot = process.env.BASE_URL?.replace('/api/v1', '') || 'http://localhost:4000';
        const res = await fetchAPI(`${baseUrlRoot}/`);
        const data = await res.json();
        console.log('Health Check:', data.success ? 'PASS' : 'FAIL', data.message);
    } catch (e) {
        console.error('Health Check: FAIL', e.message);
    }

    // 2. Test Login (assuming a test user exists or we fail gracefully)
    // We'll try to login with a known test account or just check if the endpoint responds
    try {
        const res = await fetchAPI(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'test@example.com', password: 'password' })
        });
        const data = await res.json();
        console.log('Login Endpoint:', res.status !== 404 ? 'PASS' : 'FAIL', `Status: ${res.status}`);
        // We expect 401 or 200, but not 404
    } catch (e) {
        console.error('Login Endpoint: FAIL', e.message);
    }

    // 3. Test Get All Courses
    try {
        const res = await fetchAPI(`${BASE_URL}/course/getAllCourses`);
        const data = await res.json();
        console.log('Get All Courses:', data.success ? 'PASS' : 'FAIL', `Count: ${data.data ? data.data.length : 0}`);
    } catch (e) {
        console.error('Get All Courses: FAIL', e.message);
    }

    // 4. Test AI Course Generator (Mock)
    // Note: This requires authentication (auth, isInstructor). 
    // Since we don't have a valid token in this script, we expect 401.
    // However, if we get 401, it means the route exists and middleware is working.
    // If we got 404, it would mean the route is missing.
    try {
        const res = await fetchAPI(`${BASE_URL}/course/generateCourse`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic: 'Python' })
        });
        console.log('AI Course Generator Route:', res.status !== 404 ? 'PASS' : 'FAIL', `Status: ${res.status}`);
    } catch (e) {
        console.error('AI Course Generator Route: FAIL', e.message);
    }

    // 5. Test AI Chat Endpoint
    try {
        const res = await fetchAPI(`${BASE_URL}/ai/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: '1+2' })
        });
        const data = await res.json();
        console.log('AI Chat Route (Math):', data.success ? 'PASS' : 'FAIL', `Message: ${data.data}`);
    } catch (e) {
        console.error('AI Chat Route: FAIL', e.message);
    }

    console.log('Verification Complete.');
}

verifyBackend();
