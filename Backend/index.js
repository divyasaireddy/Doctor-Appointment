import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import bookingRoutes from './Routes/booking.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

// Updated CORS options to include deployed frontend URLs
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173", 
      "http://localhost:5174",
      "https://your-netlify-app.netlify.app",
      "https://your-vercel-app.vercel.app"
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked origin:", origin);
      callback(null, true); // Changed to allow all origins in production for now
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Simple health check route
app.get("/api/health", (req, res) => res.json({ status: "API is working" }));

// MongoDB connect function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

// API routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoutes);
app.use('/uploads', express.static('uploads'));

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Only serve frontend in production from backend if not using separate deployments
// In your case, since you're using Netlify/Vercel for frontend, this part might be optional
if (process.env.NODE_ENV === 'production' && process.env.SERVE_FRONTEND === 'true') {
  // Serve static files from dist folder
  app.use(express.static(path.join(__dirname, 'dist')));

  // For any other route, serve index.html from dist
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  // When using separate deployments, we don't need to handle frontend routes
  // Just have an API root response
  app.get("/", (req, res) => res.send("Doctor Appointment API is running"));
}

// Start the server
connectDB().then(() =>
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  })
);