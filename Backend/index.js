import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import bookingRoutes from './Routes/booking.js'; // ✅ Import added

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};



app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.get("/", (req, res) => res.send("API is working"));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoutes); // ✅ Booking route added
app.use('/uploads', express.static('uploads'));

connectDB().then(() => app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
}));
