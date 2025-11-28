# 🎓 StudyNotion - EdTech Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://studynotion-hosting-pi.vercel.app/)
[![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=react)](https://github.com/topics/mern-stack)

StudyNotion is a fully functional EdTech platform that enables users to create, consume, and rate educational content. The platform is built using the **MERN stack** (MongoDB, Express, React, Node.js) and aims to provide a seamless interactive learning experience for students while offering a platform for instructors to showcase their expertise.

## 🚀 Key Features

### 👤 For Students
* **Course Discovery:** Browse courses by category, rating, or popularity.
* **Cart & Checkout:** Secure payment integration via **Razorpay** for course purchase.
* **Learning Dashboard:** Track progress, watch video lectures, and mark sections as completed.
* **Ratings & Reviews:** Rate courses and provide feedback to instructors.

### 👨‍🏫 For Instructors
* **Course Creation:** Create courses with a rich media interface (thumbnail, price, tags).
* **Content Management:** Organize content into Sections and Sub-sections (videos).
* **Instructor Dashboard:** Visual analytics on total students, income, and course stats.
* **Profile Management:** Update bio and professional details.

### 🔐 Authentication & Security
* **Secure Auth:** JWT-based authentication with Access and Refresh tokens.
* **OTP Verification:** Email verification via OTP during signup using **Nodemailer**.
* **Password Management:** Secure "Forgot Password" flow with reset links.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | ReactJS, Redux Toolkit, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Media** | Cloudinary (Image & Video hosting) |
| **Payments** | Razorpay Payment Gateway |
| **DevOps** | Vercel (Frontend), Render/Railway (Backend) |

---


## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/studynotion.git](https://github.com/your-username/studynotion.git)
   cd studynotion
