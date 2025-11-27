const express = require("express");
const app = express();

const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const aiRoutes = require("./routes/AI");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// Security and Logging
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// Load environment variables
dotenv.config();

// Setting up port number
const PORT = process.env.PORT || 4000;

// Connecting to database
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Security Middleware
app.use(helmet());
app.use(morgan("dev"));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    tempFileDir: "/tmp/",
})
);

// Connecting to Cloudinary
cloudinaryConnect();

// API routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/ai", aiRoutes);

// Default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running...",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});